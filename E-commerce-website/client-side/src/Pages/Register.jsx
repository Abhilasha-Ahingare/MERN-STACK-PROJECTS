import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { register } from "../redux/slices/authSlice";
import { useDispatch } from "react-redux";

const Register = () => {
  const [name, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(register({ name, email, password }));
    navigate("/login");
  };

  return (
    <div className="w-full h-screen flex justify-center items-center bg-gray-50">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-md bg-white p-8 rounded-lg border shadow-sm m-4"
      >
        <div className="flex flex-col items-center mb-6">
          <h2 className="text-xl font-medium mb-2">rabbit</h2>
          <h2 className="text-2xl font-bold mb-4">hey there! 🙋🏻‍♀️</h2>
          <p className="text-center text-gray-600 mb-6 uppercase">
            enter your username and password
          </p>
        </div>

        <div className="space-y-4">
          <div className="mb-4">
            <label htmlFor="name" className="block text-sm font-semibold mb-2">
              Username
            </label>
            <input
              type="text"
              value={name}
              name="name"
              id="name"
              placeholder="Enter Your name"
              autoComplete="new-password"
              onChange={(e) => setUsername(e.target.value)}
              className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div className="mb-4">
            <label htmlFor="email" className="block text-sm font-semibold mb-2">
              Email
            </label>
            <input
              type="email"
              value={email}
              name="email"
              id="email"
              placeholder="Enter Your Email Address"
              autoComplete="new-password"
              onChange={(e) => setEmail(e.target.value)}
              className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div className="mb-4">
            <label
              htmlFor="password"
              className="block text-sm font-semibold mb-2"
            >
              Password
            </label>
            <input
              type="password"
              value={password}
              name="password"
              id="password"
              placeholder="Enter Your Password"
              autoComplete="new-password"
              onChange={(e) => setPassword(e.target.value)}
              className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-blue-600 text-white p-2 rounded-lg hover:bg-blue-700 transition-colors font-semibold "
          >
            Registration
          </button>
          <p className="mt-6 text-center text-sm uppercase">
            {" "}
            DO You have an account ?
            <Link to="/login" className="text-blue-500 uppercase">
              Login
            </Link>
          </p>
        </div>
      </form>
    </div>
  );
};

export default Register;
