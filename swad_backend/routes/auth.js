const express = require("express");
const router = express.Router();
const User = require("../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const authMiddleware = require("../middleware/authMiddleware");

// REGISTER
router.post("/register", async (req, res) => {
  try {
    const { name, email, password , mobile, dob} = req.body;
 // DOB validation
    const today = new Date();
    if (new Date(dob) >= today) {
      return res.status(400).json({ message: "DOB must be before today" });
    }

    // Mobile validation
    if (!/^[0-9]{10}$/.test(mobile)) {
      return res.status(400).json({ message: "Mobile must be 10 digits" });
    }
    const userExists = await User.findOne({ email });
    if (userExists) {
      return res.status(400).json({ message: "User already exists" });
    }

    const Password = await bcrypt.hash(password, 10);

    const newUser = new User({
      name,
      email,
      password: Password,
       mobile,
      dob
    });

    await newUser.save();

    res.status(201).json({ message: "User Registered Successfully" });

  } catch (error) {
    res.status(500).json({ message: "Server Error" });
  }
});

// LOGIN
router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: "Invalid Credentials" });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid Credentials" });
    }

    const token = jwt.sign(
      { id: user._id },
      process.env.JWT_SECRET,
      { expiresIn: "1d" }
    );

    res.json({
  message: "Login Successful",
  token,
  user: {
    name: user.name,
    email: user.email,
    mobile: user.mobile,
    dob: user.dob
  }
});

  } catch (error) {
    res.status(500).json({ message: "Server Error" });
  }
});

// PROTECTED ROUTE
router.get("/profile", authMiddleware, (req, res) => {
  res.json({ message: "Protected Route Accessed" });
});

module.exports = router;