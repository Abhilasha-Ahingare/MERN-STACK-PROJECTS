import React, { useEffect, useState } from "react";
import { UserAuth } from "../../store/auth";
import { toast } from "react-toastify";
import "./admincontact.css";

const ContactAdmin = () => {
  const { authorization } = UserAuth();
  const [users, setUsers] = useState([]);

  const getAllContactAdmin = async () => {
    try {
      const response = await fetch(`http://localhost:5000/api/admin/contact`, {
        method: "GET",
        headers: {
          Authorization: authorization,
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) throw new Error(`Error: ${response.status}`);

      const data = await response.json();
      setUsers(data);
    } catch (error) {
      toast.error("Failed to fetch user data");
    }
  };

  const handleDeleteContact = async (id) => {
    try {
      const response = await fetch(
        `http://localhost:5000/api/admin/contact/delete/${id}`,
        {
          method: "DELETE",
          headers: {
            Authorization: authorization,
            "Content-Type": "application/json",
          },
        }
      );

      if (response.ok) {
        getAllContactAdmin();
        toast.success("Deleted successfully");
      }
    } catch (error) {
      toast.error("Failed to delete user");
    }
  };

  useEffect(() => {
    getAllContactAdmin();
  }, []);

  return (
    <div className="admin-contact-container">
      <h1 className="admin-contact-title">📬 Contact Submissions</h1>

      {users.length > 0 ? (
        <div className="table-wrapper">
          <table className="contact-table">
            <thead>
              <tr>
                <th>Username</th>
                <th>Email</th>
                <th>Message</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {users.map((user) => (
                <tr key={user._id}>
                  <td>{user.username}</td>
                  <td>{user.email}</td>
                  <td>{user.message}</td>
                  <td>
                    <button
                      className="delete-btn"
                      onClick={() => handleDeleteContact(user._id)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <p className="no-data">No contacts found.</p>
      )}
    </div>
  );
};

export default ContactAdmin;
