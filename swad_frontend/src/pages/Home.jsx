import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import slide1 from "../assets/image/slide1.jpeg";
import slide2 from "../assets/image/slide2.jpeg";
import slide3 from "../assets/image/slide3.jpeg";

const Home = () => {

  const navigate = useNavigate();

  //  Protect Route
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/login");
    }
  }, [navigate]);

  // Logout Function
  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  return (
    <div style={{ position: "relative" }}>

      {/*  Profile Icon Dropdown */}
      <div
        className="dropdown"
        style={{
          position: "absolute",
          top: "20px",
          right: "30px",
          zIndex: 1000
        }}
      >
       

        <ul className="dropdown-menu dropdown-menu-end">
          <li>
            <button className="dropdown-item" onClick={handleLogout}>
              Logout
            </button>
          </li>
        </ul>
      </div>

      {/*  Carousel */}
      <div
        id="heroCarousel"
        className="carousel slide"
        data-bs-ride="carousel"
        data-bs-interval="2000"
        data-bs-pause="false"
      >
        <div className="carousel-inner">

          <div className="carousel-item active">
            <img src={slide1} className="d-block w-100 vh-100" alt="Slide 1" />
          </div>

          <div className="carousel-item">
            <img src={slide2} className="d-block w-100 vh-100" alt="Slide 2" />
          </div>

          <div className="carousel-item">
            <img src={slide3} className="d-block w-100 vh-100" alt="Slide 3" />
          </div>

        </div>
      </div>

    </div>
  );
};

export default Home;