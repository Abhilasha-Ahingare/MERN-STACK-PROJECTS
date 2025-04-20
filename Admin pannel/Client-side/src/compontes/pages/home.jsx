import React from "react";
import { UserAuth } from "../../store/auth";
import ProductPage from "./products";
import FeatucreSection from "./featucreSection";
import "./home.css";
import "./featcure.css";

const HomePage = () => {
  const { user } = UserAuth();

  return (
    <>
      <div className="home-container">
        {/* hero section */}
        <div className="hero-section">
          <div className="hero-image">
            <img src="https://picsum.photos/600/400" alt="Welcome" />
          </div>
          <div className="hero-text">
            <h1>
              Hey, {user?.username || "Guest"} 👋 <br />
              Welcome to Our Platform
            </h1>
            <p>
              Your complete solution provider. We help you explore the best
              products with seamless services and guaranteed satisfaction.
            </p>
          </div>
        </div>

        {/* products */}
        <ProductPage />

        <FeatucreSection />

        <section className="about-section">
          <h2>About Us</h2>
          <div className="about-content">
            <div className="about-text">
              <p>
                We are dedicated to providing the best services to our clients.
                With years of experience, our team ensures quality and
                excellence in every project.
              </p>
            </div>
          </div>
        </section>
      </div>
    </>
  );
};

export default HomePage;
