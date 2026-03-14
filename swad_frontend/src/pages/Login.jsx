import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import Swal from "sweetalert2";
import "../assets/css/Auth.css";

const Login = () => {

  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    email: "",
    password: ""
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.post(
        "http://localhost:5000/api/auth/login",
        formData
      );

      localStorage.setItem("token", res.data.token);
localStorage.setItem("user", JSON.stringify(res.data.user));

      Swal.fire({
        icon: "success",
        title: "Login Successful 🎉",
        text: "Welcome back to Swad!",
        confirmButtonColor: "#ff9800"
      });

      // Clear form
      setFormData({
        email: "",
        password: ""
      });

      setTimeout(() => {
        navigate("/");
      }, 1200);

    } catch (error) {

      Swal.fire({
        icon: "error",
        title: "Login Failed ❌",
        text: error.response?.data?.message || "Invalid Email or Password",
        confirmButtonColor: "#ff9800"
      });

    }
  };

  return (
    <div className="auth-container">
      <div className="auth-box">

        <h2>Login to Swad</h2>

        <form onSubmit={handleSubmit} autoComplete="off">

          <input
            type="email"
            name="email"
            autoComplete="new-email"
            placeholder="Enter your email"
            value={formData.email}
            onChange={handleChange}
            required
          />

          <input
            type="password"
            name="password"
            autoComplete="new-password"
            placeholder="Enter your password"
            value={formData.password}
            onChange={handleChange}
            required
          />

          <button type="submit">Login</button>

        </form>

        <Link to="/register">Create Account</Link>

      </div>
    </div>
  );
};

export default Login;