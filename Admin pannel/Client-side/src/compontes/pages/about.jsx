import React from "react";
import "./about.css"; // lowercase rakha filename bhi

const About = () => {
  return (
    <div className="about-container">
      <div className="about-header">
        <h1>About Us</h1>
        <p>We're a passionate team dedicated to innovation and creativity.</p>
      </div>
      <div className="about-flex-section">
        {/* Left Text */}
        <div className="about-text">
          <h2>Our Vision</h2>
          <p>
            We aim to build a culture of creativity, collaboration, and
            innovation. Every product we deliver is a reflection of our
            commitment to excellence and customer satisfaction. From start to
            finish, we ensure every step adds value and joy.
          </p>
        </div>

        {/* Right Reviews */}
        <div className="customer-reviews">
          <div className="review-card">
            <h4>Riya Kapoor</h4>
            <p>"Absolutely loved the experience. The team truly cares!"</p>
          </div>
          <div className="review-card">
            <h4>Aman Mehra</h4>
            <p>"Professional, creative, and timely – highly recommended!"</p>
          </div>
          <div className="review-card">
            <h4>Sneha Shah</h4>
            <p>"Feels like family. I'm proud to be a customer."</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;
