import React, { useEffect, useState } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import "../assets/css/History.css";
import history from "../assets/image/history.webp";  
const History = () => {

  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const token = localStorage.getItem("token");

       const res = await axios.get(
  "http://localhost:5000/api/order/history",
  {
    headers: {
      Authorization: `Bearer ${token}`
    }
  }
);
        setOrders(res.data);

      } catch (error) {
        Swal.fire("Error", "Unable to fetch order history", "error");
      }
    };

    fetchOrders();
  }, []);

  const getStatusColor = (status) => {
    if (status === "Success") return "success-badge";
    if (status === "Pending") return "pending-badge";
    return "failed-badge";
  };

  return (
    <div
  className="history-wrapper"
  style={{
    backgroundImage: `url(${history})`,
    backgroundSize: "cover",
    backgroundPosition: "center",
    backgroundRepeat: "no-repeat",
    minHeight: "100vh"
  }}
>
      <h1>📜 Order History</h1>

      {orders.length === 0 ? (
        <p className="no-orders">No orders yet</p>
      ) : (
        <div className="history-grid">
          {orders.map((order) => (
            <div className="history-card" key={order._id}>

              <div className="history-header">
                <span className={`status ${getStatusColor(order.status)}`}>
                  {order.status}
                </span>
                <span className="order-date">
                  {new Date(order.createdAt).toLocaleString()}
                </span>
              </div>

              <div className="order-items">
                {order.items.map((item, index) => (
                  <div key={index} className="item-row">
                    <span>{item.name}</span>
                    <span>₹ {item.price}</span>
                  </div>
                ))}
              </div>

              <div className="order-total">
                Total: ₹ {order.totalAmount}
              </div>

            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default History;