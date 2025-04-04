import React from "react";
import Header from "../common/Header";
import Footer from "../common/footer";
import { Outlet } from "react-router-dom";

const UserLayout = () => {
  return (
    <>
    {/* header */}
      <Header />
      {/* main content */}
      <main>
        <Outlet/>
      </main>
      {/* footer */}
      <Footer/>
    </>
  );
};

export default UserLayout;
