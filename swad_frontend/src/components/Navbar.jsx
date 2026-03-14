import React, { useEffect, useState } from "react";
import { NavLink, useNavigate, useLocation } from "react-router-dom";
import "../assets/css/Navbar.css";
import Swal from "sweetalert2";

const Navbar = () => {

  const navigate = useNavigate();
  const location = useLocation();

  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [showDropdown, setShowDropdown] = useState(false);
  const [user, setUser] = useState(null);

  useEffect(() => {

    const token = localStorage.getItem("token");
    const storedUser = localStorage.getItem("user");

    // 🔥 Set login state properly
    setIsLoggedIn(!!token);

    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }

  }, [location]);

  const handleLogout = () => {

    Swal.fire({
      icon: "success",
      title: "Logged Out 👋",
      text: "See you again at Swad!",
      confirmButtonColor: "#ff9800",
      timer: 1500,
      showConfirmButton: false
    });

    setTimeout(() => {
      localStorage.removeItem("token");
      localStorage.removeItem("user");   // 🔥 remove user also
      setIsLoggedIn(false);
      setShowDropdown(false);
      navigate("/login");
    }, 1500);
  };

  return (
    <div className="custom-navbar">

      <NavLink to="/" className="logo" style={{ textDecoration: "none" }}>
        Swad
      </NavLink>

      <div className="navbar-right">

        <div className="navbar-center">
          <ul>
            <li><NavLink to="/">Home</NavLink></li>
            <li><NavLink to="/about">About</NavLink></li>
            <li><NavLink to="/menu">Menu</NavLink></li>
            <li><NavLink to="/restaurant">Restaurant</NavLink></li>
            <li><NavLink to="/Cart">Cart</NavLink></li>
            <li><NavLink to="/contact">Contact</NavLink></li>
            <li><NavLink to="/history">History</NavLink></li>
          </ul>
        </div>

        {!isLoggedIn ? (

          <button
            className="login-btn"
            onClick={() => navigate("/login")}
          >
            Log in
          </button>

        ) : (

          <div className="profile-wrapper">

            <button
              className="profile-btn"
              onClick={() => setShowDropdown(prev => !prev)}
            >
              👤
            </button>

           {showDropdown && (
  <div className="profile-dropdown">

    {user && (
      <div className="profile-card">

        <h3 className="profile-title">👤 Profile Details</h3>

        <div className="profile-row">
          <span className="label">Name:</span>
          <span>{user.name}</span>
        </div>

        <div className="profile-row">
          <span className="label">Phone No:</span>
          <span>{user.mobile}</span>
        </div>

        <div className="profile-row">
          <span className="label">Date of Birth:</span>
          <span>{new Date(user.dob).toLocaleDateString()}</span>
        </div>

        <div className="profile-row">
          <span className="label">Email:</span>
          <span>{user.email}</span>
        </div>

        <button 
          className="logout-btn" 
          onClick={handleLogout}
        >
          Logout
        </button>

      </div>
    )}

  </div>
)}
          </div>

        )}

      </div>
    </div>
  );
};

export default Navbar;