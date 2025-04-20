import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { UserAuth } from "../../store/auth";
import "./EditAdmin.css";

const EditAdmin = () => {
  const { id } = useParams();
  const [user, setUser] = useState({
    username: "",
    email: "",
    phone: "",
  });
  const { authorization } = UserAuth();

  // ✅ Fetch user by ID
  const getUserData = async () => {
    try {
      const response = await fetch(
        `http://localhost:5000/api/admin/users/${id}`,
        {
          method: "GET",
          headers: {
            Authorization: authorization,
            "Content-Type": "application/json",
          },
        }
      );

      const data = await response.json();

      if (response.ok) {
        setUser(data);
      } else {
        toast.error(data.message || "User not found");
      }
    } catch (error) {
      toast.error("Failed to fetch user data");
    }
  };

  useEffect(() => {
    getUserData();
  }, []);

  const handleInput = (e) => {
    let name = e.target.name;
    let value = e.target.value;

    setUser({ ...user, [name]: value });
  };

  //update data
  const handleUpdateData = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(
        `http://localhost:5000/api/admin/users/update/${id}`,
        {
          method: "PATCH",
          headers: {
            Authorization: authorization,
            "Content-Type": "application/json",
          },
          body: JSON.stringify(user),
        }
      );
      if (response.ok) {
        toast.success("updated sucessfully");
      }
    } catch (error) {
      toast.error("Failed to delete user data");
    }
  };

  return (
    <form
      onSubmit={handleUpdateData}
      className="container"
    >
      <h2>Edit User</h2>

      <div className="form-group">
        <label htmlFor="username">username: </label>

        <input
          type="text"
          name="username"
          value={user.username}
          onChange={handleInput}
          placeholder="Username"
        />
      </div>

      <div className="form-group">
        <label htmlFor="email">email: </label>

        <input
          type="email"
          name="email"
          value={user.email}
          onChange={handleInput}
          placeholder="Email"
        />
      </div>

      <div className="form-group">
        <label htmlFor="phone">phone: </label>
        <input
          type="tel"
          name="phone"
          value={user.phone}
          onChange={handleInput}
          placeholder="Phone"
        />
      </div>
      <button
        type="submit"
        style={{
          padding: "12px 50px",
          backgroundColor: "#0288D1",
          margin: "5px",
        }}
      >
        submit
      </button>
    </form>
  );
};

export default EditAdmin;
