import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import CartContext from "./components/CartContext";
import Home from "./pages/Home";
import About from "./pages/About";
import Menu from "./pages/Menu";
import Restaurant from "./pages/Restaurant";
import Cart from "./pages/Cart";
import Register from "./pages/Register";
import "./index.css";
import Contact from "./pages/Contact";
import Login from "./pages/Login";
import Footer from "./components/Footer";
import PrivateRoute from "./components/PrivateRoute";
import History from "./pages/History";


function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/menu" element={<Menu />} />
        <Route path="/restaurant" element={<Restaurant />} />
        <Route path="/Cart" element={<Cart />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/login" element={<Login />} />
        <Route path="/CartContext" element={<CartContext />} />
        <Route path="/Register" element={<Register />} />
        <Route path="/PrivateRoute" element={<PrivateRoute />} />
        <Route path="/history" element={<History />} />
        

      </Routes>
      <Footer/>
    </>
  );
}

export default App;