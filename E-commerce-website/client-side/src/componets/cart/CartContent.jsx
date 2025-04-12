import React from "react";
import { RiDeleteBin5Line } from "react-icons/ri";
import { useDispatch } from "react-redux";
import {
  RemoveCartItem,
  updateCartItemQuantity,
} from "../../redux/slices/cartSlice";

const CartContent = ({ product, userId, guestId }) => {
  const dispatch = useDispatch();
  const products = product?.products || [];

  console.log("CartContent Products:", products);

  const handleAddToCart = (productId, delta, quantity, sizes, color) => {
    console.log("Updating quantity:", {
      productId,
      delta,
      quantity,
      sizes,
      color,
    });
    const newQuantity = quantity + delta;
    if (newQuantity >= 1) {
      dispatch(
        updateCartItemQuantity({
          productId,
          quantity: newQuantity,
          guestId,
          userId,
          sizes,
          color,
        })
      );
    }
  };

  const handleRemoveFromCart = (productId, sizes, color) => {
    dispatch(RemoveCartItem({ productId, guestId, userId, sizes, color }));
  };

  if (!products || products.length === 0) {
    return <p className="text-center text-gray-500">Your cart is empty</p>;
  }

  return (
    <div>
      {products.map((product, index) => (
        <div
          key={index}
          className="flex items-start justify-between py-4 border-b"
        >
          <div className="flex items-start">
            <img
              src={product.images}
              alt={product.name || "Product"}
              className="w-20 h-24 object-cover mr-4 rounded"
            />
            <div>
              <h3 className="font-medium">{product.name}</h3>
              <p className="text-sm text-gray-500">
                Size: {product.sizes} | Color: {product.color}
              </p>
              <div className="flex items-center mt-2">
                <button
                  onClick={() =>
                    handleAddToCart(
                      product.productId,
                      -1,
                      product.quantity,
                      product.sizes,
                      product.color
                    )
                  }
                  className="border rounded px-2 py-1 text-xl font-medium hover:bg-gray-100"
                >
                  -
                </button>
                <span className="mx-4">{product.quantity}</span>
                <button
                  onClick={() =>
                    handleAddToCart(
                      product.productId,
                      1,
                      product.quantity,
                      product.sizes,
                      product.color
                    )
                  }
                  className="border rounded px-2 py-1 text-xl font-medium hover:bg-gray-100"
                >
                  +
                </button>
              </div>
            </div>
          </div>
          <div className="flex flex-col items-end">
            <p className="font-medium">${product.price.toLocaleString()}</p>
            <button
              onClick={() =>
                handleRemoveFromCart(
                  product.productId,
                  product.sizes,
                  product.color
                )
              }
              className="mt-2 text-red-500 hover:text-red-700"
            >
              <RiDeleteBin5Line className="w-5 h-5" />
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default CartContent;
