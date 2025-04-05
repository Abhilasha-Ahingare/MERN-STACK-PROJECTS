import React from "react";

const orders = [
  {
    _id: "1234",
    createAt: new Date(),
    checkoutItems: [
      {
        productId: "1",
        name: "abhilasha",
        color: "black",
        size: "M",
        price: 150,
        quantity: 1,
        image: "https://picsum.photos/500/500?random=1",
      },
    ],
  },
  {
    _id: "1234",
    createAt: new Date(),
    checkoutItems: [
      {
        productId: "4",
        name: "abhilasha",
        color: "black",
        size: "M",
        price: 150,
        quantity: 1,
        image: "https://picsum.photos/500/500?random=2",
      },
    ],
  },
  {
    _id: "1234",
    createAt: new Date(),
    checkoutItems: [
      {
        productId: "4",
        name: "abhilasha",
        color: "black",
        size: "M",
        price: 150,
        quantity: 1,
        image: "https://picsum.photos/500/500?random=3",
      },
    ],
  },
  {
    _id: "1234",
    createAt: new Date(),
    checkoutItems: [
      {
        productId: "4",
        name: "abhilasha",
        color: "black",
        size: "M",
        price: 150,
        quantity: 1,
        image: "https://picsum.photos/500/500?random=4",
      },
    ],
    shippingAdress: {
      address: "123 hhjhjfkjd",
      city: "gd",
      county: "jhghjf",
    },
  },
];

const calculateEstimatedDelivery = (createAt) => {
  const orderDate = new Date(createAt);
  orderDate.setDate(orderDate.getDate() + 10);
  return orderDate.toLocaleDateString();
};

const OderConformationPage = () => {
  return (
    <div className="max-w-5xl mx-auto p-4 bg-white">
      <h1 className="text-4xl font-bold text-center text-emerald-700 mb-8 uppercase">
        thank you for your order
      </h1>
      {orders.map((order) => (
        <div key={order._id} className="p-6 rounded-lg border mb-4">
          <div className="flex justify-between mb-10">
            {/* order id */}
            <div>
              <h2 className="text-xl font-semibold uppercase">
                order ID: {order._id}
              </h2>
              <p className="text-gray-500 uppercase">
                order date: {new Date(order.createAt).toLocaleDateString()}
              </p>
            </div>
            {/* estimated  delivery*/}
            <div>
              <p className="text-emerald-700 text-sm">
                Estimated delivery: {calculateEstimatedDelivery(order.createAt)}
              </p>
            </div>
          </div>
          <div className="mb-7">
            {order.checkoutItems.map((item) => (
              <div className=" flex items-center mb-4" key={item.productId}>
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-16 h-16 object-cover rounded mr-4"
                />
                <div>
                  <h4 className="text-md font-semibold">{item.name}</h4>
                  <p className="text-sm text-gray-500">
                    {item.color} | {item.size}
                  </p>
                </div>
                <div className="ml-auto text-right ">
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
              <p className="text-gray-600">Paypal</p>
            </div>
            {/* delivery */}
            <div>
              <h4 className="text-lg font-semibold mb-2">Delivery</h4>
              <p className="text-gray-600">{order.shippingAdress?.address}</p>
              <p className="text-gray-600">
                {order.shippingAdress?.city}, {order.shippingAdress?.county}{" "}
              </p>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default OderConformationPage;
