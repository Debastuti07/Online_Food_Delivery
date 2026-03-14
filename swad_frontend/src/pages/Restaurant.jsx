import React from "react";
import "../assets/css/Restaurant.css";

import Alana from "../assets/image/Alana.jpeg";
import alana2 from "../assets/image/alana2.jpeg";
import Alana3 from "../assets/image/Alana3.jpeg";

import Abar1 from "../assets/image/Abar1.jpeg";
import Abar2 from "../assets/image/Abar2.jpeg";
import Abar3 from "../assets/image/Abar3.jpeg";

import Sm1 from "../assets/image/Sm1.webp";
import Sm2 from "../assets/image/Sm2.webp";
import Sm3 from "../assets/image/Sm3.webp";

import Fd1 from "../assets/image/Fd1.webp";
import Fd2 from "../assets/image/Fd2.webp";
import Fd3 from "../assets/image/Fd3.webp";

import res from "../assets/image/res.jpeg";

const Restaurant = () => {

  const restaurants = [
    {
      id: 1,
      name: "Alana King",
      cuisine: "Indian",
      rating: 5.0,
      status: "Open",
      images: [Alana, alana2, Alana3]
    },
    {
      id: 2,
      name: "Abar Khabo",
      cuisine: "Chinese",
      rating: 4.6,
      status: "Open",
      images: [Abar1, Abar2, Abar3]
    },
    {
      id: 3,
      name: "Sm18",
      cuisine: "Chinese",
      rating: 4.6,
      status: "Open",
      images: [Sm1, Sm2, Sm3]
    },
    {
      id: 4,
      name: "Food Delight",
      cuisine: "Chinese",
      rating: 4.6,
      status: "Closed",
      images: [Fd1, Fd2, Fd3]
    }
  ];

  // 🎲 Generate random distance between 0–20 km
  const generateRandomDistance = () => {
    return (Math.random() * 20).toFixed(2);
  };

  return (
    <div
      className="restaurant-container"
      style={{
        backgroundImage: `url(${res})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        minHeight: "100vh"
      }}
    >
      <h1 className="restaurant-title">Restaurants in Kolkata</h1>

      {restaurants.map((resItem) => {

        const distance = generateRandomDistance();
        const time = Math.round(distance * 3);

        return (
          <div className="restaurant-card" key={resItem.id}>

            <div className="image-row">
              {resItem.images.map((img, index) => (
                <img src={img} alt="restaurant" key={index} />
              ))}
            </div>

            <div className="restaurant-details">
              <h2>{resItem.id}. {resItem.name}</h2>
              <p className="rating">⭐ {resItem.rating}</p>
              <p className="cuisine">{resItem.cuisine}</p>

              <p className="distance">
                📍 {distance} km • {time} mins
              </p>

              <p className={resItem.status === "Open" ? "open" : "closed"}>
                {resItem.status === "Open" ? "🟢 Open Now" : "🔴 Closed"}
              </p>
            </div>

          </div>
        );
      })}

    </div>
  );
};

export default Restaurant;