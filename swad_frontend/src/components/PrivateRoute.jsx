import React, { useEffect } from "react";
import { Navigate } from "react-router-dom";
import Swal from "sweetalert2";

const PrivateRoute = ({ children }) => {

  const token = localStorage.getItem("token");

  useEffect(() => {
    if (!token) {
      Swal.fire({
        icon: "warning",
        title: "Login Required 🔐",
        text: "Please login to access your cart",
        confirmButtonColor: "#ff9800"
      });
    }
  }, [token]);

  if (!token) {
    return <Navigate to="/login" replace />;
  }

  return children;
};

export default PrivateRoute;