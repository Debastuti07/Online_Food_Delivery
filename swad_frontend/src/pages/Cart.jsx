import React, { useContext, useState } from "react";
import { CartContext } from "../components/CartContext";
import "../assets/css/Cart.css";
import cart_img from "../assets/image/cart_img.jpeg";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
import { QRCodeCanvas } from "qrcode.react";
import axios from "axios";

const Cart = () => {

  const { cart, clearCart ,removeFromCart } = useContext(CartContext);
  
  const [showPaymentOptions, setShowPaymentOptions] = useState(false);
  const [showQR, setShowQR] = useState(false);
  const [paidAmount, setPaidAmount] = useState("");
  const [currentOrderId, setCurrentOrderId] = useState(null);

  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  const total = cart.reduce((sum, item) => sum + item.price, 0);

  // 🔥 Create Order (Pending)
  const createOrder = async () => {
    try {
      const res = await axios.post(
        "http://localhost:5000/api/order/create",
        {
          items: cart,
          totalAmount: total,
          status: "Pending"
        },
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      );

      setCurrentOrderId(res.data._id);
      console.log("Order Created:", res.data);

    } catch (error) {
      console.log("Create Order Error:", error.response?.data || error.message);
    }
  };

  // 🔥 Update Order Status
const updateOrderStatus = async (statusType) => {

  console.log("Updating ID:", currentOrderId);
  console.log("Updating to:", statusType);

  if (!currentOrderId) {
    console.log("No Order ID found");
    return;
  }

  const res = await axios.put(
    `http://localhost:5000/api/order/update/${currentOrderId}`,
    { status: statusType },
    {
      headers: {
        Authorization: `Bearer ${token}`
      }
    }
  );

  console.log("Updated Order:", res.data);
};
  const handleCOD = async () => {

  await updateOrderStatus("Success");

  Swal.fire({
    title: "🎉 Order Successful!",
    icon: "success"
  }).then(() => {
    clearCart();
    navigate("/menu");
  });
};

  const handleOnlinePayment = () => {
    setShowQR(true);
  };

const handlePaymentVerification = async () => {

  if (Number(paidAmount) === total) {

    await updateOrderStatus("Success");

    Swal.fire({
      title: "✅ Payment Successful!",
      icon: "success"
    }).then(() => {
      clearCart();
      navigate("/menu");
    });

  } else {

  await updateOrderStatus("Failed");   // MUST run

  Swal.fire({
    title: "❌ Payment Failed",
    text: "Paid amount does not match total amount.",
    icon: "error"
  });
}
};

  return (
    <div
      className="cart-wrapper"
      style={{ backgroundImage: `url(${cart_img})` }}
    >
      <div className="cart-container">

        <h1>Your Cart 🛒</h1>

        {cart.length === 0 ? (
          <p className="empty-cart">No items in cart</p>
        ) : (
          <>
            {cart.map((item, index) => (
  <div className="cart-item" key={index}>
    <div>
      <h3>{item.name}</h3>
      <p>₹ {item.price}</p>
    </div>

    <button
      className="delete-btn"
      onClick={() => removeFromCart(index)}
    >
      ❌
    </button>
  </div>
))}

          <div className="cart-summary">

  <button
    className="add-more-btn"
    onClick={() => navigate("/menu")}
  >
    ➕ Add More Items
  </button>
  <div className="cart-total">
    Total: ₹ {total}
  </div>
</div>
            {!showQR && (
              <>
                <button
  className="checkout-btn"
  onClick={async () => {

    if (currentOrderId) {
      console.log("Order already created");
      setShowPaymentOptions(true);
      return;
    }

    const res = await axios.post(
      "http://localhost:5000/api/order/create",
      {
        items: cart,
        totalAmount: total,
        status: "Pending"
      },
      {
        headers: {
          Authorization: `Bearer ${token}`
        }
      }
    );

    console.log("Created Order ID:", res.data._id);

    setCurrentOrderId(res.data._id);
    setShowPaymentOptions(true);
  }}
>
  Proceed to Checkout
</button>

                {showPaymentOptions && (
                  <div className="payment-options">
                    <button className="cod-btn" onClick={handleCOD}>
                      Cash on Delivery
                    </button>

                    <button className="online-btn" onClick={handleOnlinePayment}>
                      Pay via QR Code
                    </button>
                  </div>
                )}
              </>
            )}

            {showQR && (
              <div className="qr-section">
                <h3>Scan & Pay ₹ {total}</h3>

                <QRCodeCanvas
                  value={`upi://pay?pa=swad@upi&pn=Swad&am=${total}`}
                  size={200}
                />

                <input
                  type="number"
                  placeholder="Enter Paid Amount"
                  value={paidAmount}
                  onChange={(e) => setPaidAmount(e.target.value)}
                  className="amount-input"
                />

                <button
                  className="payment-done-btn"
                  onClick={handlePaymentVerification}
                >
                  Verify Payment
                </button>
              </div>
            )}
          </>
        )}

      </div>
    </div>
  );
};

export default Cart;