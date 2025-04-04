import React, { useState } from "react";
import { Link } from "react-router-dom";
import {
  HiOutlineUser,
  HiOutlineShoppingBag,
  HiBars3BottomRight,
} from "react-icons/hi2";
import SearchBar from "./SearchBar";
import CartDrawer from "../layouts/CartDrawer";
import { IoMdClose } from "react-icons/io";

const Navbar = () => {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [navDrawerOpen, setNavDrawerOpen] = useState(false);

  const toggleNavDrawer = () => {
    setNavDrawerOpen(!navDrawerOpen);
  };

  const toggleCartDrawer = () => {
    setDrawerOpen(!drawerOpen);
  };

  return (
    <>
      <nav className="container mx-auto flex items-center justify-between py-4 px-6">
        <div className="navigation">
          <Link to="/" className="text-2xl font-medium">
            Rabbit
          </Link>
        </div>

        {/* left -nav bars */}
        <div className="hidden md:flex space-x-6">
          <Link
            to="/collection/all"
            className="text-gray-700 hover:text-black text-sm font-medium uppercase"
          >
            men's
          </Link>
          <Link
            to="#"
            className="text-gray-700 hover:text-black text-sm font-medium uppercase"
          >
            women's
          </Link>
          <Link
            to="#"
            className="text-gray-700 hover:text-black text-sm font-medium uppercase"
          >
            kids
          </Link>
          <Link
            to="#"
            className="text-gray-700 hover:text-black text-sm font-medium uppercase"
          >
            top wear
          </Link>
          <Link
            to="#"
            className="text-gray-700 hover:text-black text-sm font-medium uppercase"
          >
            bottom wear
          </Link>
        </div>

        {/* right-icons */}
        <div className="flex items-center space-x-4">
          <Link to="/profile" className="hover:text-black">
            <HiOutlineUser className="h-6 w-6 text-gray-700" />{" "}
          </Link>
          <button
            onClick={toggleCartDrawer}
            className="relative hover:text-black"
          >
            <HiOutlineShoppingBag className="h-6 w-6 text-gray-700" />
          </button>
          <span className=" absolute bg-red-800 text-white rounded-full px-2 text-center ">
            4
          </span>

          {/* search */}
          <div className=" overflow-hidden">
            <SearchBar />
          </div>
          <button onClick={toggleNavDrawer} className="md:hover:">
            <HiBars3BottomRight className="h-6 w-6 text-gray-700" />
          </button>
        </div>
      </nav>
      <CartDrawer drawerOpen={drawerOpen} toggleCartDrawer={toggleCartDrawer} />

      {/* mobile navigation */}
      <div
        className={`fixed top-0 right-0 w-3/4 sm:w-1/2 md:w-1/3 h-full bg-white shadow-lg transform transition-transform duration-300 z-50 ${
          navDrawerOpen ? "translate-x-0" : "translate-x-full"
        } `}
      >
        <div className=" flex justify-end p-4">
          <button onClick={toggleNavDrawer}>
            {" "}
            <IoMdClose className="h-6 w-6 text-gray-600" />{" "}
          </button>
        </div>
        {/* nav */}
        <div className="p-4">
          <h2 className="text-xl font-semibold mb-4 uppercase">menu</h2>
          <nav className=" space-y-4">
            <Link
              to="/collection/all"
              onClick={toggleNavDrawer}
              className="block text-gray-600 hover:text-black uppercase"
            >
              men's
            </Link>
            <Link
              to="#"
              onClick={toggleNavDrawer}
              className="block text-gray-600 hover:text-black uppercase"
            >
              women's
            </Link>
            <Link
              to="#"
              onClick={toggleNavDrawer}
              className="block text-gray-600 hover:text-black uppercase"
            >
              kids's
            </Link>
            <Link
              to="#"
              onClick={toggleNavDrawer}
              className="block text-gray-600 hover:text-black uppercase"
            >
              top wear
            </Link>
          </nav>
        </div>
      </div>
    </>
  );
};

export default Navbar;
