import React from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { UserAuth } from "../../store/auth";
import { toast } from "react-toastify";
import styles from "./login-page.module.css";

const LoginPage = () => {
  const [user, setUser] = useState({
    email: "",
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
      const response = await fetch(`http://localhost:5000/api/auth/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(user),
      });

      const res_data = await response.json();
      if (response.ok) {
        StoreToken(res_data.token);
        setUser({ email: "", password: "" });
        toast.success("login successfull");
        navigate("/");
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
    <div className={styles.loginContainer}>
      <div className={styles.loginBox}>
        <h2>Login</h2>
        <form>
          <div className={styles.inputGroup}>
            <input
              type="email"
              name="email"
              value={user.email}
              placeholder="Email"
              onChange={InputHnadler}
              autoComplete="off"
              required
            />
          </div>
          <div className={styles.inputGroup}>
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
            className={styles.loginButton}
            onClick={handleSubmit}
          >
            Login
          </button>
        </form>
      </div>
    </div>
  );
};

export default LoginPage;
