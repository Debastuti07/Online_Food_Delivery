import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import "../assets/css/Menu.css";
import bgImage from "../assets/image/menu.png";
import Swal from "sweetalert2";
import chow from "../assets/image/chow.jpeg";
import panner from "../assets/image/panner.jpeg";
import bp from "../assets/image/bp.jpeg";
import cb from "../assets/image/cb.jpeg";
import cc from "../assets/image/cc.jpeg";
import mbv from "../assets/image/mbv.jpeg";
import gcc from "../assets/image/gcc.jpeg";
import vc from "../assets/image/vc.jpeg";

import { CartContext } from "../components/CartContext";

const Menu = () => {

  const navigate = useNavigate();

  //  Getting global cart from context
  const { cart, addToCart } = useContext(CartContext);

  const foodItems = [
    { id: 1, name: "Paneer Butter Masala", category: "Indian", type: "Veg", price: 220, image: panner },
    { id: 2, name: "Veg Noodles", category: "Chinese", type: "Veg", price: 79, image: chow },
    { id: 3, name: "Basanti Pulao", category: "Indian", type: "Veg", price: 89, image: bp },
    { id: 4, name: "Chicken Biryani", category: "Indian", type: "Non-Veg", price: 99, image: cb },
    { id: 5, name: "Chinese Combo", category: "Chinese", type: "Non-Veg", price: 199, image: cc },
    { id: 6, name: "Mini Burger Combo", category: "Continental", type: "Non-Veg", price: 149, image: mbv },
    { id: 7, name: "Grilled Chicken Steak", category: "Continental", type: "Non-Veg", price: 249, image: gcc },
    { id: 8, name: "Maharaja Thali", category: "Indian", type: "Non-Veg", price: 499, image: vc },
  ];

  const [filterType, setFilterType] = useState("All");
  const [filterCategory, setFilterCategory] = useState("All");

  const filteredItems = foodItems.filter((item) =>
    (filterType === "All" || item.type === filterType) &&
    (filterCategory === "All" || item.category === filterCategory)
  );

 
//  Protected Add To Cart
const handleAddToCart = (item) => {
  const token = localStorage.getItem("token");

  if (!token) {
    Swal.fire({
      icon: "warning",
      title: "Login Required 🔐",
      text: "Please login to add items to cart",
      confirmButtonColor: "#ff9800"
    }).then(() => {
      navigate("/login");
    });

    return;
  }

  addToCart(item);
};

  return (
    <div
      className="menu-wrapper"
      style={{ backgroundImage: `url(${bgImage})` }}
    >
      <div className="menu-container">

        <h1 className="menu-title">Our Premium Menu 🍴</h1>

        <div className="filters">
          <select value={filterType} onChange={(e) => setFilterType(e.target.value)}>
            <option value="All">All Type</option>
            <option value="Veg">Veg</option>
            <option value="Non-Veg">Non Veg</option>
          </select>

          <select value={filterCategory} onChange={(e) => setFilterCategory(e.target.value)}>
            <option value="All">All Cuisine</option>
            <option value="Indian">Indian</option>
            <option value="Chinese">Chinese</option>
            <option value="Continental">Continental</option>
          </select>

          <div className="cart-count">
            🛒 Cart: {cart.length}
          </div>
        </div>

        <div className="menu-grid">
          {filteredItems.map((item) => (
            <div className="menu-card" key={item.id}>
              <img src={item.image} alt={item.name} />
              <h3>{item.name}</h3>
              <p className="category">
                {item.category} | {item.type}
              </p>
              <p className="price">₹ {item.price}</p>

              <button onClick={() => handleAddToCart(item)}>
                Add To Cart
              </button>
            </div>
          ))}
        </div>

      </div>
    </div>
  );
};

export default Menu;