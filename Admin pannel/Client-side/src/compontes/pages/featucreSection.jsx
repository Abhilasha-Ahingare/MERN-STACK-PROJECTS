import React from "react";
import { HiOutlineCreditCard, HiShoppingBag } from "react-icons/hi";
import { HiArrowPathRoundedSquare } from "react-icons/hi2";
import "./products.css"; 

const FeatucreSection = () => {
  return (
    <section className="feature-section">
      <div className="feature-container">
        {/* feature 1 */}
        <div className="feature-item">
          <div className="feature-icon">
            <HiShoppingBag className="icon" />
          </div>
          <h4 className="feature-title">free international shiping</h4>
          <p className="feature-description">on all order over $100.0</p>
        </div>

        {/* feature 2 */}
        <div className="feature-item">
          <div className="feature-icon">
            <HiArrowPathRoundedSquare className="icon" />
          </div>
          <h4 className="feature-title">45 Days return</h4>
          <p className="feature-description">money back guarantee</p>
        </div>

        {/* feature 3 */}
        <div className="feature-item">
          <div className="feature-icon">
            <HiOutlineCreditCard className="icon" />
          </div>
          <h4 className="feature-title">SECURE CHECKOUT</h4>
          <p className="feature-description">100% secure checkout procress</p>
        </div>
      </div>
    </section>
  );
};

export default FeatucreSection;
