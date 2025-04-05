import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import PayPalButton from "./PayPalButton";
const Cart = {
  products: [
    {
      name: "stylish jacket",
      size: "M",
      color: "black",
      price: 120,
      image: "https://picsum.photos/500/500?random=1",
    },
    {
      name: "stylish jacket",
      size: "M",
      color: "black",
      price: 120,
      image: "https://picsum.photos/500/500?random=2",
    },
  ],
  totalPrice: 194,
};

const CheckOut = () => {
  const navigate = useNavigate();
  const [checkoutId, setCheckoutId] = useState(null);
  const [shippingAddress, setShippingAdress] = useState({
    firstName: "",
    lastName: "",
    address: "",
    city: "",
    postalCode: "",
    county: "",
    phone: "",
  });

  const handleCreateCheckout = (e) => {
    e.preventDefault();
    setCheckoutId(123);
  };

  const handlePaymentSuccess = (details) => {
    alert("payment succesfully");
    navigate("/order-comformation");
  };

  return (
    <div className="min-h-screen bg-gray-100 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* left section */}
          <div className="lg:col-span-8">
            <div className="bg-white rounded-lg shadow-md p-6">
              <h2 className="text-2xl font-semibold uppercase mb-6">
                checkout
              </h2>
              <form onSubmit={handleCreateCheckout}>
                <h3 className="text-lg mb-4">contact details</h3>
                <div className="mb-4">
                  <label className="block text-gray-700 uppercase">email</label>
                  <input
                    type="email"
                    value="sb-vkyiu39709849@business.example.com"
                    placeholder="enter your email"
                    className="w-full p-2 border rounded"
                    disabled
                  />
                </div>
                <h3 className="text-lg mb-4 uppercase">Delivery</h3>
                <div className="mb-4 grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-gray-700 uppercase">
                      fisrt Name
                    </label>
                    <input
                      type="text"
                      required
                      className=" w-full p-2 border rounded"
                      value={shippingAddress.firstName}
                      onChange={(e) =>
                        setShippingAdress({
                          ...shippingAddress,
                          firstName: e.target.value,
                        })
                      }
                    />
                  </div>

                  <div>
                    <label className="block text-gray-700 uppercase">
                      last Name
                    </label>
                    <input
                      type="text"
                      required
                      className=" w-full p-2 border rounded"
                      value={shippingAddress.lastName}
                      onChange={(e) =>
                        setShippingAdress({
                          ...shippingAddress,
                          lastName: e.target.value,
                        })
                      }
                    />
                  </div>
                  <div className="mb-4">
                    <label className="block text-gray-700 uppercase">
                      address
                    </label>
                    <input
                      type="text"
                      value={shippingAddress.address}
                      onChange={(e) =>
                        setShippingAdress({
                          ...shippingAddress,
                          address: e.target.value,
                        })
                      }
                      required
                      className=" w-full p-2 border rounded"
                    />
                  </div>

                  <div className="mb-4 grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-gray-700 uppercase">
                        City
                      </label>
                      <input
                        type="text"
                        required
                        className=" w-full p-2 border rounded"
                        value={shippingAddress.city}
                        onChange={(e) =>
                          setShippingAdress({
                            ...shippingAddress,
                            city: e.target.value,
                          })
                        }
                      />
                    </div>

                    <div>
                      <label className="block text-gray-700 uppercase">
                        postal code
                      </label>
                      <input
                        type="text"
                        required
                        className=" w-full p-2 border rounded"
                        value={shippingAddress.postalCode}
                        onChange={(e) =>
                          setShippingAdress({
                            ...shippingAddress,
                            postalCode: e.target.value,
                          })
                        }
                      />
                    </div>

                    <div className="mb-4">
                      <label className="block text-gray-700 uppercase">
                        county
                      </label>
                      <input
                        type="text"
                        value={shippingAddress.county}
                        onChange={(e) =>
                          setShippingAdress({
                            ...shippingAddress,
                            county: e.target.value,
                          })
                        }
                        required
                        className=" w-full p-2 border rounded"
                      />
                    </div>

                    <div className="mb-4">
                      <label className="block text-gray-700 uppercase">
                        phone
                      </label>
                      <input
                        type="number"
                        value={shippingAddress.phone}
                        onChange={(e) =>
                          setShippingAdress({
                            ...shippingAddress,
                            phone: e.target.value,
                          })
                        }
                        required
                        className=" w-full p-2 border rounded"
                      />
                    </div>
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
                      <h3 className="text-lg mb-4 uppercase">
                        {" "}
                        pay with paypal
                      </h3>
                      {/* paypal components */}
                      <PayPalButton
                        amount={100}
                        onSuccess={handlePaymentSuccess}
                        onError={(err) => alert("payment failed try again")}
                      />
                    </div>
                  )}
                </div>
              </form>
            </div>
          </div>

          {/* right section */}
          <div className="lg:col-span-4">
            <div className="bg-white rounded-lg shadow-md p-6 sticky top-6">
              <h3 className="text-lg font-semibold mb-4 uppercase">
                order summary
              </h3>
              <div className="space-y-4">
                {Cart.products.map((product, index) => (
                  <div className="flex space-x-4 border-b pb-4" key={index}>
                    <img
                      src={product.image}
                      alt={product.name}
                      className="w-24 h-24 object-cover rounded"
                    />
                    <div className="flex-1">
                      <h3 className="font-medium">{product.name}</h3>
                      <p className="text-gray-500">Size: {product.size}</p>
                      <p className="text-gray-500">Color: {product.color}</p>
                    </div>
                    <p className="font-semibold">$ {product.price?.toLocaleString()}</p>
                  </div>
                ))}
              </div>
              <div className="mt-4 pt-4 border-t">
                <div className="flex justify-between">
                  <span>Total:</span>
                  <span className="font-semibold">$ {Cart.totalPrice}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CheckOut;
