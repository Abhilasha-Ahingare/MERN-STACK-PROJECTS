import React, { useState } from "react";
import { FaBars } from "react-icons/fa";
import AdminSideBar from "./AdminSideBar";
import { Outlet } from "react-router-dom";

const AdminPannel = () => {
  const [isSideBarOpen, setIsSideBarOpen] = useState(false);

  const toggleSidebar = () => {
    setIsSideBarOpen(!isSideBarOpen);
  };

  return (
    <div className="min-h-screen flex flex-col md:flex-row relative">
      {/* mobile toggle button */}

      <div className=" flex md:hidden p-4 bg-gray-900 text-white z-20 ">
        <button onClick={toggleSidebar}>
          <FaBars size={24} />
        </button>
        <h1 className="ml-4 text-xl font-medium">Admin Dashbord</h1>
      </div>

      {/* overlay for mobile sidebar */}
      {isSideBarOpen && (
        <div
          className="fixed inset-0 z-20 bg-black bg-opacity-50 md:hidden backdrop-blur-sm"
          onClick={toggleSidebar}
        ></div>
      )}

      {/* sidebar */}

      <div
        className={`bg-gray-900 w-64 min-h-screen text-white fixed md:relative transform 
        ${isSideBarOpen ? "translate-x-0" : "-translate-x-full"} 
        transition-transform duration-200 ease-in-out md:translate-x-0 z-30 
        shadow-lg md:shadow-xl border-r border-gray-800`}
      >
        <AdminSideBar />
      </div>

      {/* Main content area */}
      <div className="flex-1 p-4 md:p-6 overflow-hidden">
        <Outlet />
      </div>
    </div>
  );
};

export default AdminPannel;
