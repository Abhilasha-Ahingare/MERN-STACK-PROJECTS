import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { UserAuth } from "../../store/auth";
import { toast } from "react-toastify";
import "./registration.css";

const Registration = () => {
  const [user, setUser] = useState({
    username: "",
    email: "",
    phone: "",
    password: "",
  });

  const navigate = useNavigate();
  const { StoreToken } = UserAuth();

  const InputHnadler = (e) => {
    let name = e.target.name;
    let value = e.target.value;
    setUser({ ...user, [name]: value });
  };

  // handle form submit
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`http://localhost:5000/api/auth/register`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(user),
      });

      const res_data = await response.json();
      
      if (response.ok) {
        StoreToken(res_data.token);
        setUser({ username: "", email: "", phone: "", password: "" });
        toast.success("registration successfull");
        navigate("/login");
      } else {
        toast.error(
          res_data.extraDetails ? res_data.extraDetails : res_data.message
        );
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="register-container">
      <form className="register-form">
        <h2>Create Account</h2>

        <div className="form-group">
          <input
            type="text"
            name="username"
            value={user.username}
            placeholder="Username"
            onChange={InputHnadler}
            autoComplete="off"
            required
          />
        </div>

        <div className="form-group">
          <input
            type="email"
            name="email"
            value={user.email}
            placeholder="Email Address"
            onChange={InputHnadler}
            autoComplete="off"
            required
          />
        </div>

        <div className="form-group">
          <input
            type="tel"
            name="phone"
            value={user.phone}
            placeholder="Phone Number"
            pattern="[0-9]{10}"
            onChange={InputHnadler}
            autoComplete="off"
            required
          />
        </div>

        <div className="form-group">
          <input
            type="password"
            name="password"
            value={user.password}
            placeholder="Password"
            onChange={InputHnadler}
            autoComplete="off"
            required
          />
        </div>

        <button
          type="submit"
          className="register-button"
          onClick={handleSubmit}
        >
          Register
        </button>
      </form>
    </div>
  );
};

export default Registration;
