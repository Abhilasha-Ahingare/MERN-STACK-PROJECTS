import React from "react";
import { NavLink } from "react-router-dom";
import "./error-page.css";

const ErrorPage = () => {
  return (
    <section className="page_404">
      <div className="container">
        <div className="row">
          <div className="col-sm-12">
            <div className="error-content text-center">
              <h1>404</h1>
              <h2>Page Not Found</h2>
              <p>
                The page you are looking for does not exist or has been moved.
              </p>
              <NavLink to="/" className="home-btn">
                Return Home
              </NavLink>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ErrorPage;
