import React from "react";
import { IoMdClose } from "react-icons/io";
import CartContent from "../cart/CartContent";
import { useNavigate } from "react-router-dom";

const CartDrawer = ({ drawerOpen, toggleCartDrawer }) => {
  const navigate = useNavigate();
  const handleCheckOut = () => {
    toggleCartDrawer();
    navigate("/checkout");
  };
  return (
    <div
      className={`fixed top-0 right-0 w-3/4 sm:w-1/2  md:w-[30rem] h-full bg-white shadow-lg transform transition-transform duration-300 flex flex-col z-50 ${
        drawerOpen ? "translate-x-0" : "translate-x-full"
      }`}
    >
      {/* close button  */}
      <div className="flex justify-end p-4">
        <button
          onClick={toggleCartDrawer}
          className="p-2 hover:bg-gray-100 rounded-full transition-colors"
        >
          <IoMdClose className="h-6 w-6 text-gray-600" />
        </button>
      </div>
      {/* cart content with scrollable area */}
      <div className=" flex-grow p-4 overflow-y-auto ">
        <h2 className="text-xl font-semibold mb-4  uppercase">your cart</h2>

        <CartContent />
      </div>
      {/* componet for cart contents */}

      <div className=" p-4 bg-white sticky bottom-0">
        <button
          onClick={handleCheckOut}
          className=" w-full bg-black text-white py-3 rounded-lg font-semibold hover:bg-gray-800 transition"
        >
          check out
        </button>
        <p className=" text-sm tracking-tight text-gray-500 mt-2 text-center">
          shipping,taxes and discount codea calculated at checkout
        </p>
      </div>
    </div>
  );
};

export default CartDrawer;
