// import React, { useEffect, useState } from "react";
// import { useNavigate } from "react-router-dom";
// import PayPalButton from "./PayPalButton";
// import { useDispatch, useSelector } from "react-redux";
// import { createCheckout } from "../../redux/slices/checkoutSlice";
// import api from "../../utils/api";

// const CheckOut = () => {
//   const navigate = useNavigate();
//   const dispatch = useDispatch();
//   const { user } = useSelector((state) => state.auth);
//   const { cart, loading, error } = useSelector((state) => state.cart);

//   const [checkoutId, setCheckoutId] = useState(null);
//   const [shippingAddress, setShippingAddress] = useState({
//     firstName: "",
//     lastName: "",
//     address: "",
//     city: "",
//     postalCode: "",
//     county: "",
//     phone: "",
//   });

//   useEffect(() => {
//     if (!loading && (!cart || !cart.products || cart.products.length === 0)) {
//       navigate("/");
//     }
//   }, [cart, loading, navigate]);

//   const handleCreateCheckout = async (e) => {
//     e.preventDefault();
//     try {
//       const res = await dispatch(
//         createCheckout({
//           items: cart.products,
//           shippingAddress,
//           paymentMethod: "Paypal",
//           totalPrice: cart.totalPrice,
//         })
//       );

//       if (res.payload && res.payload._id) {
//         setCheckoutId(res.payload._id);
//       } else {
//         console.error("Checkout creation failed", res);
//         alert("Checkout creation failed. Please try again.");
//       }
//     } catch (error) {
//       console.error("Checkout error:", error);
//       alert("Something went wrong during checkout.");
//     }
//   };

//   const handlePaymentSuccess = async (details) => {
//     try {
//       const response = await api.put(
//         `/api/checkout/${checkoutId}/pay`,
//         { paymentStatus: "paid", paymentDetails: details },
//         {
//           headers: {
//             Authorization: `Bearer ${localStorage.getItem("userToken")}`,
//           },
//         }
//       );

//       if (response.status === 200) {
//         await finalizeOrder();
//       } else {
//         alert("Payment update failed.");
//       }
//     } catch (error) {
//       console.error("Payment error:", error);
//       alert("Payment processing failed.");
//     }
//   };

//   const finalizeOrder = async () => {
//     try {
//       await api.put(
//         `/api/checkout/${checkoutId}/finalize`,
//         {},
//         {
//           headers: {
//             Authorization: `Bearer ${localStorage.getItem("userToken")}`,
//           },
//         }
//       );
//       navigate("/order-conformation");
//     } catch (error) {
//       console.error("Finalize error:", error);
//       alert("Finalizing order failed.");
//     }
//   };

//   if (loading) return <p>Loading cart...</p>;
//   if (error) return <p>Error: {error}</p>;
//   if (!cart || !cart.products?.length) return <p>Your cart is empty</p>;

//   return (
//     <div className="min-h-screen bg-gray-100 py-12">
//       <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
//         <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
//           {/* Left Side */}
//           <div className="lg:col-span-8">
//             <div className="bg-white rounded-lg shadow-md p-6">
//               <h2 className="text-2xl font-semibold uppercase mb-6">Checkout</h2>
//               <form onSubmit={handleCreateCheckout}>
//                 <h3 className="text-lg mb-4">Contact Details</h3>
//                 <div className="mb-4">
//                   <label className="block text-gray-700 uppercase">Email</label>
//                   <input
//                     type="email"
//                     value={user?.user?.email || ""}
//                     className="w-full p-2 border rounded"
//                     disabled
//                   />
//                 </div>

//                 <h3 className="text-lg mb-4 uppercase">Delivery</h3>
//                 <div className="mb-4 grid grid-cols-2 gap-4">
//                   {[
//                     { label: "First Name", name: "firstName" },
//                     { label: "Last Name", name: "lastName" },
//                     { label: "Address", name: "address", full: true },
//                     { label: "City", name: "city" },
//                     { label: "Postal Code", name: "postalCode" },
//                     { label: "County", name: "county" },
//                     { label: "Phone", name: "phone" },
//                   ].map((field) => (
//                     <div
//                       key={field.name}
//                       className={field.full ? "col-span-2" : ""}
//                     >
//                       <label className="block text-gray-700 uppercase">
//                         {field.label}
//                       </label>
//                       <input
//                         type={field.name === "phone" ? "number" : "text"}
//                         value={shippingAddress[field.name]}
//                         required
//                         onChange={(e) =>
//                           setShippingAddress((prev) => ({
//                             ...prev,
//                             [field.name]: e.target.value,
//                           }))
//                         }
//                         className="w-full p-2 border rounded"
//                       />
//                     </div>
//                   ))}
//                 </div>

//                 <div className="mt-6">
//                   {!checkoutId ? (
//                     <button
//                       type="submit"
//                       className="w-full bg-black text-white py-3 rounded"
//                     >
//                       Continue to Payment
//                     </button>
//                   ) : (
//                     <div>
//                       <h3 className="text-lg mb-4 uppercase">Pay with PayPal</h3>
//                       <PayPalButton
//                         amount={cart.totalPrice}
//                         onSuccess={handlePaymentSuccess}
//                         onError={() => alert("Payment failed, try again")}
//                       />
//                     </div>
//                   )}
//                 </div>
//               </form>
//             </div>
//           </div>

//           {/* Right Side */}
//           <div className="lg:col-span-4">
//             <div className="bg-white rounded-lg shadow-md p-6 sticky top-6">
//               <h3 className="text-lg font-semibold mb-4 uppercase">Order Summary</h3>
//               <div className="space-y-4">
//                 {cart.products.map((product, index) => (
//                   <div className="flex space-x-4 border-b pb-4" key={index}>
//                     <img
//                       src={product.images}
//                       alt={product.name}
//                       className="w-24 h-24 object-cover rounded"
//                     />
//                     <div className="flex-1">
//                       <h3 className="font-medium">{product.name}</h3>
//                       <p className="text-gray-500">Size: {product.sizes}</p>
//                       <p className="text-gray-500">Color: {product.color}</p>
//                     </div>
//                     <p className="font-semibold">
//                       ₹ {product.price?.toLocaleString()}
//                     </p>
//                   </div>
//                 ))}
//               </div>
//               <div className="mt-4 pt-4 border-t">
//                 <div className="flex justify-between">
//                   <span>Total:</span>
//                   <span className="font-semibold">₹ {cart.totalPrice}</span>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default CheckOut;




import { useState , useEffect } from "react";
import { useNavigate } from "react-router-dom";
import PayPalButton from "./PayPalButton";
import { useDispatch, useSelector } from "react-redux";
useState;
// const cart = {
//   products: [
//     {
//       _id: "1",
//       name: "Stylish Jacket",
//       price: 120,
//       images: "https://picsum.photos/500/500?random=1",
//     },
//     {
//       _id: "1",
//       name: "Stylish Jacket",
//       price: 120,
//       images: "https://picsum.photos/500/500?random=1",
//     },
//   ],
//   totalPrice: 240,
// };

const CheckOut = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { cart, loading, error } = useSelector((state) => state.cart);
  const { user } = useSelector((state) => state.auth);
  const [checkoutId, setCheckoutId] = useState(null);
  const [shippingAddress, setShippingAddress] = useState({
    firstName: "",
    lastName: "",
    address: "",
    city: "",
    postalCode: "",
    country: "",
    phone: "",
  });

  //Ensure cart is loaded before proceeding

  useEffect(() => {
    if (!cart || !cart.products || cart.products.length === 0) {
      navigate("/");
    }
  }, [cart, navigate]);

  const handleCreateCheckout = async (e) => {
    e.preventDefault();
    if (cart && cart.products.length > 0) {
      const res = await dispatch(
        createCheckout({
          checkoutItems: cart.products,
          shippingAddress,
          paymentMethod: "paypal",
          totalPrice: cart.toatalPrice,
        })
      );
      if (res.payload && res.payload._id) {
        setCheckoutId(res.payload._id);
      }
    }
  };

  const handlePaymentSuccess = async (details) => {
    try {
      const response = await axios.put(
        `${import.meta.env.VITE_BACKEND_URL}/api/checkout/${checkoutId}/pay`,
        { paymentStatus: "paid", paymentDetails: details },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("userToken")}`,
          },
        }
      );

      await handleFinalizeCheckout(checkoutId);
      
    } catch (error) {
      console.error(error);
    }
  };

  const handleFinalizeCheckout = async (checkoutId) => {
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_BACKEND_URL
        }/api/checkout/$(chekoutId)/finalize`, {}, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("userToken")}`,
        },
      }
      );
        navigate("/order-confirmation")
      
    } catch (error) {
      console.error(error)
    }
  }

  if (loading) return <p>Loading cart...</p>;
  if (error) return <p>Error: {error}</p>
  if (!cart || !cart.products || cart.products.length === 0) {
    return <p>Your cart is empty</p>
  }

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-7xl mx-auto py-10 px-6 tracking-tighter">
      {/* Left Section */}
      <div className="bg-white rounded-lg p-6">
        <h2 className="text-2xl uppercase mb-6">Checkout</h2>
        <form onSubmit={handleCreateCheckout}>
          <h3 className="text-lg mb-4">Contat Details</h3>
          <div className="mb-4">
            <label className="block text-gray-700">Email</label>
            <input
              type="email"
              value={user? user.email: ""}
              className="w-full p-2 border rounded"
              disabled
            />
          </div>
          <h3 className="text-lg mb-4">Delivery</h3>
          <div className="mb-4 grid grid-cols-2 gap-4">
            <div>
              <label className="block text-gray-700">First Name</label>
              <input
                type="text"
                value={shippingAddress.firstName}
                onChange={(e) =>
                  setShippingAddress({
                    ...shippingAddress,
                    firstName: e.target.value,
                  })
                }
                className="w-full p-2 border rounded required"
              />
            </div>
            <div>
              <label className="block text-gray-700">Last Name</label>
              <input
                type="text"
                value={shippingAddress.lastName}
                onChange={(e) =>
                  setShippingAddress({
                    ...shippingAddress,
                    lastName: e.target.value,
                  })
                }
                className="w-full p-2 border rounded required"
              />
            </div>
          </div>
          <div className="mb-4 grid grid-cols-1 gap-4">
            <div className="mb-4">
              <label className="block text-gray-700">Address</label>
              <input
                type="text"
                value={shippingAddress.address}
                onChange={(e) =>
                  setShippingAddress({
                    ...shippingAddress,
                    address: e.target.value,
                  })
                }
                className="w-full p-2 border rounded required"
              />
            </div>
          </div>
          <div className="mb-4 grid grid-cols-2 gap-4">
            <div>
              <label className="block text-gray-700">City</label>
              <input
                type="text"
                value={shippingAddress.city}
                onChange={(e) =>
                  setShippingAddress({
                    ...shippingAddress,
                    city: e.target.value,
                  })
                }
                className="w-full p-2 border rounded required"
              />
            </div>
            <div>
              <label className="block text-gray-700">Postsl Code</label>
              <input
                type="text"
                value={shippingAddress.postalCode}
                onChange={(e) =>
                  setShippingAddress({
                    ...shippingAddress,
                    postalCode: e.target.value,
                  })
                }
                className="w-full p-2 border rounded required"
              />
            </div>
          </div>
          <div className="mb-4 grid grid-cols-1 gap-4">
            <div className="mb-4">
              <label className="block text-gray-700">Country</label>
              <input
                type="text"
                value={shippingAddress.country}
                onChange={(e) =>
                  setShippingAddress({
                    ...shippingAddress,
                    country: e.target.value,
                  })
                }
                className="w-full p-2 border rounded required"
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700">Phone</label>
              <input
                type="text"
                value={shippingAddress.phone}
                onChange={(e) =>
                  setShippingAddress({
                    ...shippingAddress,
                    phone: e.target.value,
                  })
                }
                className="w-full p-2 border rounded required"
              />
            </div>
          </div>
          <div className="mt-6 ">
            {!checkoutId ? (
              <button
                type="submit"
                className="w-full bg-black text-white py-3 rounded"
              >
                Continue to Payment
              </button>
            ) : (
              <div>
                <h3 className="text-lg mb-4">Pay with Paypal</h3>
                <PayPalButton
                  amount={cart.totalPrice}
                  onSuccess={handlePaymentSuccess}
                  onError={(err) => alert("payment failed. Try Again")}
                />
              </div>
            )}
          </div>
        </form>
      </div>
      {/* Right Section */}
      <div className="bg-gray-50 p-6 rounded-lg">
        <h3 className="text-lg mb-4">Order Summary</h3>
        <div className="border-t py-4 mb-4">
          {cart.products.map((product, index) => {
            <div
              key={index}
              className="flex item-start justify-between py-2 border-b"
            >
              <div className="flex items-start">
                <img
                  src={product.images}
                  alt={product.name}
                  className="w-20 h-24 object-cover mr-4"
                />
                <div>
                  <h3 className="text-md">{product.name}</h3>
                  <p className="text-gray-500">Size:{product.size}</p>
                  <p classxName="text-gray-500">Color:{product.color}</p>
                </div>
              </div>
              <p classxName="text-xl">${product.price?.toLocaleString()}</p>
            </div>;
          })}
        </div>
        <div className="flex justify-between items-center text-lg mb-4">
          <p>Subtotal</p>
          <p>${cart.totalPrice?.toLocaleString()}</p>
        </div>
        <div className="flex justify-between items-center text-lg">
          <p>Shipping</p>
          <p>Free</p>
        </div>
        <div className="flex justify-between items-center text-lg mt-4 border-t pt-4">
          <p>Total</p>
          <p>${cart.totalPrice?.toLocaleString()}</p>
        </div>
      </div>
    </div>
  );
};

export default CheckOut;