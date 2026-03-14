import React from "react";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer
      style={{
        background: "linear-gradient(135deg, #111, #1c1c1c)",
        color: "#fff",
        padding: "70px 0 20px",
        fontFamily: "Poppins, sans-serif",
        borderTop: "2px solid #ff7a00",
      }}
    >
      <div className="container">
        <div className="row">

          {/* Brand Section */}
          <div className="col-md-4 mb-4">
            <h3
              style={{
                fontFamily: "'Playfair Display', serif",
                fontWeight: "700",
                color: "#ff7a00",
                letterSpacing: "1px"
              }}
            >
              Swad
            </h3>
            <p style={{ color: "#ccc", lineHeight: "1.8" }}>
              Experience the Real Tastes of Bengal delivered fresh to your
              doorstep. Authentic flavors, unforgettable moments.
            </p>

            {/* Social Icons */}
            <div style={{ marginTop: "15px" }}>
              <i className="bi bi-facebook me-3" style={{ cursor: "pointer" }}></i>
              <i className="bi bi-instagram me-3" style={{ cursor: "pointer" }}></i>
              <i className="bi bi-twitter" style={{ cursor: "pointer" }}></i>
            </div>
          </div>

          {/* Quick Links */}
          <div className="col-md-4 mb-4">
            <h5 className="fw-bold" style={{ color: "#ff7a00" }}>
              Quick Links
            </h5>
            <ul className="list-unstyled" style={{ lineHeight: "2" }}>
              <li>
                <Link to="/" className="text-decoration-none text-light footer-link">
                  Home
                </Link>
              </li>
              <li>
                <Link to="/menu" className="text-decoration-none text-light footer-link">
                  Menu
                </Link>
              </li>
              <li>
                <Link to="/about" className="text-decoration-none text-light footer-link">
                  About
                </Link>
              </li>
              <li>
                <Link to="/contact" className="text-decoration-none text-light footer-link">
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div className="col-md-4 mb-4">
            <h5 className="fw-bold" style={{ color: "#ff7a00" }}>
              Contact Us
            </h5>
            <p style={{ color: "#ccc" }}>📧 support@swadfood.com</p>
            <p style={{ color: "#ccc" }}>📞 +91 98765 43210</p>
            <p style={{ color: "#ccc" }}>📍 Kolkata, West Bengal, India</p>
          </div>

        </div>

        <hr style={{ borderColor: "#444", marginTop: "30px" }} />

        <div className="text-center">
          <p style={{ fontSize: "14px", color: "#aaa" }}>
            © {new Date().getFullYear()} Swad - Real Tastes of Bengal. All Rights Reserved.
          </p>
        </div>
      </div>

      {/* Extra CSS */}
      <style>
        {`
          .footer-link:hover {
            color: #ff7a00 !important;
            transition: 0.3s;
            padding-left: 5px;
          }
          .bi:hover {
            color: #ff7a00;
            transition: 0.3s;
          }
        `}
      </style>
    </footer>
  );
};

export default Footer;