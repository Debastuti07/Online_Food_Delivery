import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import Swal from "sweetalert2";
import "../assets/css/Auth.css";

const Register = () => {

  const navigate = useNavigate();

 const [formData, setFormData] = useState({
  name: "",
  email: "",
  password: "",
  mobile: "",
  dob: ""
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
        "http://localhost:5000/api/auth/register",
        formData
      );

      Swal.fire({
        icon: "success",
        title: "Registration Successful 🎉",
        text: res.data.message,
        confirmButtonColor: "#ff9800"
      });

      // Clear form state
      setFormData({
        name: "",
        email: "",
        password: "",
        mobile: "",
        dob: ""

      });

      // Redirect after delay
      setTimeout(() => {
        navigate("/login");
      }, 1200);

    } catch (error) {

      Swal.fire({
        icon: "error",
        title: "Registration Failed ❌",
        text: error.response?.data?.message || "Something went wrong",
        confirmButtonColor: "#ff9800"
      });

    }
  };

  return (
    <div className="auth-container">
      <div className="auth-box">

        <h2>Create Account</h2>

        {/* 🔐 Prevent Browser Autofill */}
        <form onSubmit={handleSubmit} autoComplete="off">

          <input
            type="text"
            name="name"
            autoComplete="new-name"
            placeholder="Enter your name"
            value={formData.name}
            onChange={handleChange}
            required
          />

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
            placeholder="Create password"
            value={formData.password}
            onChange={handleChange}
            required
          />
          <input
  type="text"
  name="mobile"
  placeholder="Enter 10 digit mobile"
  value={formData.mobile}
  onChange={handleChange}
  required
/>

<input
  type="date"
  name="dob"
  value={formData.dob}
  onChange={handleChange}
  required
/>

          <button type="submit">Register</button>
        </form>

        <Link to="/login">Already have an account?</Link>

      </div>
    </div>
  );
};

export default Register;