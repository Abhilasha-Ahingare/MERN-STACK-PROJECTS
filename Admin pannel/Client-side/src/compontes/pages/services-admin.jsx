import React, { useEffect, useState } from "react";
import { UserAuth } from "../../store/auth";
import "./adminServer.css";


const ServiceAdmin = () => {
  const { authorization } = UserAuth();

  const [users, setUsers] = useState([]);

  const getAllServiceData = async () => {
    try {
      const response = await fetch(`http://localhost:5000/api/admin/service`, {
        method: "GET",
        headers: {
          Authorization: authorization,
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        throw new Error(`Error: ${response.status}`);
      }

      const data = await response.json();

      setUsers(data);
    } catch (error) {
      // console.error("Error fetching users:", error);
      setError("Failed to fetch user data");
    }
  };

  useEffect(() => {
    getAllServiceData();
  }, []);

  return (
    <div className="admin-users-container">
      <h1 className="admin-users-title">services List</h1>
      {users && users.length > 0 ? (
        <div className="user-grid">
          {users.map((user) => (
            <div className="user-card" key={user._id}>
              <img src={user.image} alt={user.title} />
              <p>
                <span className="label">{user.title}</span>
              </p>
              <p>
                <span className="label">{user.price}</span>
              </p>
            </div>
          ))}
        </div>
      ) : (
        <p>No users found</p>
      )}
    </div>
  );
};

export default ServiceAdmin;
