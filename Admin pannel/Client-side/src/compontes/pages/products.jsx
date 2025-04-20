import React from "react";
import { UserAuth } from "../../store/auth";
import "./products.css";

const ProductPage = () => {
  const { services = [] } = UserAuth();
  return (
    <section className="section-services">
      <div className="product-container">
        <h1 className="main-heading">Our products</h1>
        {services.map((item, index) => {
          const { image, title, price = [] } = item;
          return (
            <React.Fragment key={index}>
              <div className="card">
                <div className="img-card">
                  <img src={image} alt={title} />
                  <span className="card-price">${price}</span>
                </div>
                <div className="text-area">
                  <div className="card-title">{title}</div>
                </div>
              </div>
            </React.Fragment>
          );
        })}
      </div>
    </section>
  );
};

export default ProductPage;
