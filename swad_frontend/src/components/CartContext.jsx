import React, { createContext, useState } from "react";

export const CartContext = createContext();

const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([]);

  const addToCart = (item) => {
    setCart((prev) => [...prev, item]);
  };

  const clearCart = () => {
    setCart([]);   
  };
const removeFromCart = (indexToRemove) => {
  setCart((prevCart) =>
    prevCart.filter((_, index) => index !== indexToRemove)
  );
};
  return (
    <CartContext.Provider value={{ cart, addToCart, clearCart ,removeFromCart  }}>
      {children}
    </CartContext.Provider>
  );
};

export default CartProvider;