import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { fetchAdminProducts } from "../redux/slices/adminProductSlice";
import { fetchAllOrders } from "../redux/slices/adminOrderSlice";

const AdminHomePage = () => {
  const dispatch = useDispatch();
  const {
    products,
    loading: productsLoading,
    error: productsError,
  } = useSelector((state) => state.adminProducts);
  const {
    orders,
    totalOrders,
    totalSales,
    loading: orderLoading,
    error: orderError,
  } = useSelector((state) => state.adminOrders);

  useEffect(() => {
    dispatch(fetchAdminProducts());
    dispatch(fetchAllOrders());
  }, [dispatch]);

  return (
    <div className="max-w-7xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6"> Admin Dashbord</h1>
      {productsLoading || orderLoading ? (
        <p>loading..</p>
      ) : productsError ? (
        <p className="text-red-500">Error fecting products:{productsError} </p>
      ) : orderError ? (
        <p className="text-red-500">Error fecting orders:{productsError} </p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3  gap-6">
          <div className="p-4 shadow-md rounded-lg">
            <h2 className="text-xl font-semibold">Revenue</h2>
            <p className="text-2xl">${totalSales.toFixed(2)}</p>
          </div>

          <div className="p-4 shadow-md rounded-lg">
            <h2 className="text-xl font-semibold">Total Orders</h2>
            <p className="text-2xl">{totalOrders}</p>
            <Link to="/admin/orders" className="text-blue-500 hover:underline">
              Manage Orders
            </Link>
          </div>

          <div className="p-4 shadow-md rounded-lg">
            <h2 className="text-xl font-semibold">Total Product</h2>
            <p className="text-2xl">{products.length}</p>
            <Link
              to="/admin/Products"
              className="text-blue-500 hover:underline"
            >
              Manage products
            </Link>
          </div>
        </div>
      )}
      <div className="mt-6">
        <h2 className="text-2xl font-bold mb-4"> Recent Orders</h2>
        <div className="overflow-x-auto">
          <table className="min-w-full text-left text-gray-700">
            <thead className="bg-gray-100 text-xs uppercase text-gray-700">
              <tr>
                <td className="py-3 px-4">Order Id</td>
                <td className="py-3 px-4">User</td>
                <td className="py-3 px-4">Total Price</td>
                <td className="py-3 px-4">Status</td>
              </tr>
            </thead>
            <tbody>
              {orders.length > 0 ? (
                orders.map((orders) => (
                  <tr
                    key={orders._id}
                    className="border-b hover:bg-gray-50 cursor-pointer"
                  >
                    <td className="p-4">{orders._id}</td>
                    <td className="p-4">{orders.user.name}</td>
                    <td className="p-4">{orders.totalPrice.toFixed(2)}</td>
                    <td className="p-4">{orders.status}</td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td
                    colSpan={4}
                    className="p-4 text-center text-gray-500 uppercase"
                  >
                    no resent order found
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default AdminHomePage;
