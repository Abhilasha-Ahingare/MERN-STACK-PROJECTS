import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { RemoveCartItem } from "../redux/slices/cartSlice";

const calculateEstimatedDelivery = (createAt) => {
  const orderDate = new Date(createAt);
  orderDate.setDate(orderDate.getDate() + 10);
  return orderDate.toLocaleDateString();
};

const OderConformationPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { checkout } = useSelector((state) => state.checkout);

  //clear the cart order is confrom
  useEffect(() => {
    if (checkout && checkout?._id) {
      dispatch(RemoveCartItem());
      localStorage.removeItem("cart");
    } else {
      navigate("/my-order");
    }
  }, [checkout, dispatch, navigate]);

  if (!checkout) {
    return (
      <div className="max-w-5xl mx-auto p-4 bg-white">
        <h1 className="text-4xl font-bold text-center text-emerald-700 mb-8 uppercase">
          Order Not Found
        </h1>
      </div>
    );
  }

  return (
    <div className="max-w-5xl mx-auto p-4 bg-white">
      <h1 className="text-4xl font-bold text-center text-emerald-700 mb-8 uppercase">
        thank you for your order
      </h1>
      <div className="p-6 rounded-lg border mb-4">
        <div className="flex justify-between mb-10">
          {/* order id */}
          <div>
            <h2 className="text-xl font-semibold uppercase">
              order ID: {checkout._id}
            </h2>
            <p className="text-gray-500 uppercase">
              order date: {new Date(checkout.createdAt).toLocaleDateString()}
            </p>
          </div>
          {/* estimated delivery*/}
          <div>
            <p className="text-emerald-700 text-sm">
              Estimated delivery: {calculateEstimatedDelivery(checkout.createdAt)}
            </p>
          </div>
        </div>
        <div className="mb-7">
          {checkout.items.map((item) => (
            <div className="flex items-center mb-4" key={item.productId}>
              <img
                src={item.images}
                alt={item.name}
                className="w-16 h-16 object-cover rounded mr-4"
              />
              <div>
                <h4 className="text-md font-semibold">{item.name}</h4>
                <p className="text-sm text-gray-500">
                  {item.color} | {item.sizes}
                </p>
              </div>
              <div className="ml-auto text-right">
                <p className="text-md">${item.price}</p>
                <p className="text-sm text-gray-500">Qty: {item.quantity}</p>
              </div>
            </div>
          ))}
        </div>
        {/* payment and delivery */}
        <div className="grid grid-cols-2 gap-8">
          <div>
            <h4 className="text-lg font-semibold mb-2">Payment</h4>
            <p className="text-gray-600">{checkout.paymentMethod}</p>
          </div>
          {/* delivery */}
          <div>
            <h4 className="text-lg font-semibold mb-2">Delivery</h4>
            <p className="text-gray-600">{checkout.shippingAddress?.address}</p>
            <p className="text-gray-600">
              {checkout.shippingAddress?.city}, {checkout.shippingAddress?.county}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OderConformationPage;
