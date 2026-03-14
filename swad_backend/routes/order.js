const express = require("express");
const router = express.Router();
const Order = require("../models/Order");
const authMiddleware = require("../middleware/authMiddleware");

// 🛒 Create Order
router.post("/create", authMiddleware, async (req, res) => {
  const newOrder = new Order({
    userId: req.user,
    items: req.body.items,
    totalAmount: req.body.totalAmount,
    status: req.body.status
  });

  await newOrder.save();

  res.json(newOrder);   // 🔥 NOT message
});

// 📜 Get Order History
router.get("/history", authMiddleware, async (req, res) => {
  try {
    const orders = await Order.find({ userId: req.user }).sort({ createdAt: -1 });
    res.json(orders);
  } catch (error) {
    res.status(500).json({ message: "Server Error" });
  }
});
// Update Order Status
router.put("/update/:id", authMiddleware, async (req, res) => {
  try {
    const { status } = req.body;

    const updatedOrder = await Order.findOneAndUpdate(
      { _id: req.params.id, userId: req.user },
      { $set: { status: status } },
      { new: true }
    );

    if (!updatedOrder) {
      return res.status(404).json({ message: "Order not found" });
    }

    res.json(updatedOrder);

  } catch (error) {
    console.log("Update Error:", error);
    res.status(500).json({ message: "Server Error" });
  }
});

module.exports = router;