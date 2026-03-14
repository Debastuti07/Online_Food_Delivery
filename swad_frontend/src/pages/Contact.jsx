import React from "react";
import "../assets/css/Contact.css";
import conbg from "../assets/image/conbg.jpeg";

const Contact = () => {
  return (
    <div
      className="contact-wrapper"
      style={{ backgroundImage: `url(${conbg})` }}
    >
      <div className="contact-container">

        <h1>Contact Swad 🍽️</h1>

        <div className="contact-info">

          <div className="info-item">
            <h3>📧 Email</h3>
            <p>support@swadfood.com</p>
            <p>care@swadfood.com</p>
          </div>

          <div className="info-item">
            <h3>☎ Customer Care</h3>
            <p>+91 98765 43210</p>
            <p>+91 98300 11223</p>
          </div>

          <div className="info-item">
            <h3>📍 Head Office</h3>
            <p>Swad Food Pvt. Ltd.</p>
            <p>Salt Lake Sector V</p>
            <p>Kolkata, West Bengal – 700091</p>
            <p>India</p>
          </div>

          <div className="info-item">
            <h3>🕒 Support Hours</h3>
            <p>Monday – Sunday</p>
            <p>10:00 AM – 11:00 PM</p>
          </div>

          <div className="info-item">
            <h3>🌐 Website</h3>
            <p>www.swadfood.com</p>
          </div>

        </div>

      </div>
    </div>
  );
};

export default Contact;