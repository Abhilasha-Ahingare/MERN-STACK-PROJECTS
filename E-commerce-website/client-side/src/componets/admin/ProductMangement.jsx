import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import {
  deleteProduct,
  fetchAdminProducts,
} from "../../redux/slices/adminProductSlice";

const ProductMangement = () => {
  const dispatch = useDispatch();
  const [products, loading, error] = useSelector(
    (state) => state.adminProducts
  );

  useEffect(() => {
    dispatch(fetchAdminProducts());
  }, [dispatch]);

  const handleDeleteProduct = (userId) => {
    if (window.confirm("are you sure you want to delete the product?")) {
      dispatch(deleteProduct(userId));
    }
  };

  if (loading) return <p>loading...</p>;
  if (error) return <p>Error:{error}</p>;
  
  return (
    <div className="max-w-7xl mx-auto p-6">
      <h2 className="text-xl font-bold mb-6"> Product Management</h2>
      <div className="overflow-x-auto shadow-md sm:rounded-lg">
        <table className="min-w-full text-left text-gray-500">
          <thead className=" bg-gray-100 text-xs uppercase text-gray-700">
            <tr>
              <td className="py-3 px-4">Name</td>
              <td className="py-3 px-4">Price</td>
              <td className="py-3 px-4">SKU</td>
              <td className="py-3 px-4">Actions</td>
            </tr>
          </thead>
          <tbody>
            {products.length > 0 ? (
              products.map((products) => (
                <tr
                  key={products._id}
                  className="border-b hover:bg-gray-50 cursor-pointer"
                >
                  <td className="p-4 font-medium text-gray-900 whitespace-nowrap">
                    {products.name}
                  </td>
                  <td className="p-4">{products.price}</td>
                  <td className="p-4">{products.sku}</td>
                  <td className="p-4">
                    <Link
                      to={`/admin/products/${products._id}/edit`}
                      className="bg-yellow-500 text-white px-2 py-1 rounded mr-2 hover:bg-yellow-700"
                    >
                      Edit
                    </Link>
                    <button
                      onClick={() => handleDeleteProduct(products._id)}
                      className="bg-red-500 text-white px-2 py-1 rounded hover:bg-red-800"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={4} className="p-4 text-center text-gray-500">
                  no products found..
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ProductMangement;
