import React from "react";
import { NavLink } from "react-router-dom";
import "../assets/css/About.css";
import aboutImg from "../assets/image/slide4.png";

const About = () => {
  return (
    <div className="about-section" id="about">
      <div className="about-content">

        <div className="about-text">
          <h1>About Swad</h1>

          <p>
            Swad is your ultimate destination for delicious food delivered
            fresh and fast. From authentic Indian curries to sizzling Chinese
            delicacies and rich Continental flavors, we bring the world of
            taste straight to your doorstep.
          </p>

          <p>
            Our mission is simple — to make every meal memorable. With trusted
            restaurant partners and lightning-fast delivery, we ensure that
            every bite feels special.
          </p>

          <NavLink to="/menu" className="about-btn">
            Explore Menu
          </NavLink>

        </div>

        <div className="about-image">
          <div className="circle">
            <img src={aboutImg} alt="Food" className="srk-img" />
          </div>
        </div>

      </div>
    </div>
  );
};

export default About;