import React, { useState } from "react";

const UserMangement = () => {
  const users = [
    {
      _id: 123,
      name: "john doe",
      email: "john@emaple.com",
      role: "admin",
    },
  ];

  const defaultData = {
    name: "",
    email: "",
    password: "",
    role: "customer", //default role
  };

  const [FormData, setFormData] = useState(defaultData);

  const handleChange = (e) => {
    setFormData({ ...FormData, [e.target.name]: e.target.value });
    console.log(FormData);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // reset the form after submission
    setFormData(defaultData);
  };

  const handleRoleChange = (userId, newRole) => {
    console.log({ id: userId, role: newRole });
  };
  const handleDeleteUser = (userId) => {
    if (window.confirm("are you sure you want to delete this user?")) {
      console.log("deleting user id", userId);
    }
  };

  return (
    <div className="max-w-7xl mx-auto p-6">
      <h2 className="text-2xl font-bold mb-4 uppercase"> user management</h2>
      {/* add new user form */}
      <div className="p-6 rounded-lg mb-6">
        <h3 className="text-lg font-bold mb-4">Add New User</h3>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="Name" className=" block text-gray-700 uppercase">
              {" "}
              name
            </label>
            <input
              type="text"
              name="name"
              id="name"
              placeholder="Enter Your Name"
              value={FormData.name}
              onChange={handleChange}
              className="w-full p-2 border rounded"
            />
          </div>

          <div className="mb-4">
            <label htmlFor="email" className=" block text-gray-700 uppercase">
              {" "}
              email
            </label>
            <input
              type="email"
              name="email"
              id="email"
              placeholder="Enter Your Email"
              value={FormData.email}
              onChange={handleChange}
              className="w-full p-2 border rounded"
            />
          </div>

          <div className="mb-4">
            <label
              htmlFor="password"
              className=" block text-gray-700 uppercase"
            >
              {" "}
              password
            </label>
            <input
              type="password"
              name="password"
              id="password"
              placeholder="Enter Your password"
              value={FormData.password}
              onChange={handleChange}
              className="w-full p-2 border rounded"
            />
          </div>

          <div className="mb-4">
            <label htmlFor="role" className=" block text-gray-700 uppercase">
              {" "}
              role
            </label>
            <select
              name="role"
              id="role"
              value={FormData.role}
              onChange={handleChange}
              className="w-full p-2 border rounded"
            >
              <option value="customer">customer</option>
              <option value="admin">admin</option>
            </select>
          </div>
          <button
            type="submit"
            className="bg-green-500 text-white py-2 px-4 rounded hover:bg-green-700"
          >
            Add User
          </button>
        </form>
      </div>

      {/* user list management */}

      <div className="overflow-x-auto shadow-md sm:rounded-lg">
        <table className="min-w-full text-left text-gray-500">
          <thead className="bg-gray-100 text-xs uppercase text-gray-700">
            <tr>
              <th className="py-3 px-4">Name</th>
              <th className="py-3 px-4">Email</th>
              <th className="py-3 px-4">Role</th>
              <th className="py-3 px-4">Action</th>
            </tr>
          </thead>
          <tbody className="">
            {users.map((users) => (
              <tr key={users._id} className="border-b hover:bg-gray-50">
                <td className="p-4 font-medium text-gray-900 whitespace-nowrap">
                  {users.name}
                </td>
                <td className="p-4">{users.email}</td>
                <td className="p-4">
                  <select
                    name="role"
                    value={users.role}
                    onChange={(e) =>
                      handleRoleChange(users._id, e.target.value)
                    }
                    className="border p-2 rounded"
                  >
                    <option value="Customer">Customer</option>
                    <option value="Admin">Admin</option>
                  </select>
                </td>

                <td className="p-4">
                  <button
                    onClick={() => handleDeleteUser(users._id)}
                    className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
                  >
                    Delete User
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default UserMangement;
