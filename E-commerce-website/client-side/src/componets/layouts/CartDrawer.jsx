import React, { useEffect } from "react";
import { IoMdClose } from "react-icons/io";
import CartContent from "../cart/CartContent";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { fetchCart } from "../../redux/slices/cartSlice";

const CartDrawer = ({ drawerOpen, toggleCartDrawer }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { user, guestId } = useSelector((state) => state.auth);
  const { cart, loading, error } = useSelector((state) => state.cart);

  const userId = user ? user?._id : null;

  useEffect(() => {
    if (drawerOpen) {
      // Fetch cart when drawer opens and we have either userId or guestId
      if (userId || guestId) {
        dispatch(fetchCart({ userId, guestId }));
      }
    }
  }, [drawerOpen, userId, guestId, dispatch]);

  const handleCheckOut = () => {
    toggleCartDrawer();
    if (!user) {
      navigate("/login?redirect=checkout");
    } else {
      navigate("/checkout");
    }
  };

  return (
    <div
      className={`fixed top-0 right-0 w-3/4 sm:w-1/2 md:w-[30rem] h-full bg-white shadow-lg transform transition-transform duration-300 flex flex-col z-50 ${
        drawerOpen ? "translate-x-0" : "translate-x-full"
      }`}
    >
      {/* close button */}
      <div className="flex justify-end p-4">
        <button
          onClick={toggleCartDrawer}
          className="p-2 hover:bg-gray-100 rounded-full transition-colors"
        >
          <IoMdClose className="h-6 w-6 text-gray-600" />
        </button>
      </div>

      {/* cart content */}
      <div className="flex-grow p-4 overflow-y-auto">
        <h2 className="text-xl font-semibold mb-4 uppercase">your cart</h2>
        {loading ? (
          <div className="flex justify-center items-center h-40">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900"></div>
          </div>
        ) : error ? (
          <div className="text-red-500 text-center">
            <p>Error loading cart: {error}</p>
          </div>
        ) : cart && cart?.products?.length > 0 ? (
          <CartContent product={cart} userId={userId} guestId={guestId} />
        ) : (
          <p className="text-center text-gray-500">your cart is empty</p>
        )}
      </div>

      {/* checkout button */}
      <div className="p-4 bg-white sticky bottom-0">
        {cart && cart?.products?.length > 0 && (
          <>
            <div className="mb-4 flex justify-between">
              <span className="font-medium">Total:</span>
              <span className="font-semibold">
                ${cart.totalPrice?.toLocaleString()}
              </span>
            </div>
            <button
              onClick={handleCheckOut}
              className="w-full bg-black text-white py-3 rounded-lg font-semibold hover:bg-gray-800 transition"
            >
              check out
            </button>
            <p className="text-sm tracking-tight text-gray-500 mt-2 text-center">
              shipping, taxes and discount codes calculated at checkout
            </p>
          </>
        )}
      </div>
    </div>
  );
};

export default CartDrawer;
