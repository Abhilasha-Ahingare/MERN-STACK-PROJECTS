import React, { useEffect, useRef, useState } from "react";
import { FaFilter } from "react-icons/fa";
import { BiRefresh } from "react-icons/bi";
import FilterSideBar from "../componets/products/FilterSideBar";
import SortOpention from "../componets/products/SortOpention";
import ProductGrid from "../componets/products/ProductGrid";
import { useParams, useSearchParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { FetchProductByFilters } from "../redux/slices/product-Slice";
import { toast } from "react-toastify";

const CollectionPage = () => {
  const { productCollection } = useParams();
  const [searchParams] = useSearchParams();
  const dispatch = useDispatch();

  const { product, loading, error } = useSelector((state) => state.product);

  const queryParams = Object.fromEntries([...searchParams]);

  const sidebarRef = useRef(null);
  const [isSideBarOpen, setIsSideBarOpen] = useState(false);
  const [isRefreshing, setIsRefreshing] = useState(false);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        dispatch(FetchProductByFilters({ productCollection, ...queryParams }));
      } catch (error) {
        toast.error(error.message || "Failed to fetch products");
      }
    };

    fetchProducts();
  }, [dispatch, productCollection, searchParams]);

  const handleRefresh = async () => {
    setIsRefreshing(true);
    await fetchProducts();
    setIsRefreshing(false);
  };

  const toggleSideBar = () => {
    setIsSideBarOpen(!isSideBarOpen);
  };

  const handleClickOutSide = (e) => {
    if (sidebarRef.current && !sidebarRef.current.contains(e.target)) {
      setIsSideBarOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutSide);
    return () => {
      document.removeEventListener("mousedown", handleClickOutSide);
    };
  }, []);

  return (
    <div className="flex flex-col lg:flex-row relative">
      {/* mobile filter button */}
      <button
        onClick={toggleSideBar}
        className="lg:hidden border p-2 flex justify-center items-center gap-2 mb-4 w-fit"
      >
        <FaFilter /> Filters
      </button>

      {/* overlay */}
      {isSideBarOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
          onClick={toggleSideBar}
        />
      )}

      {/* filter side bar */}
      <div
        ref={sidebarRef}
        className={`fixed inset-y-0 left-0 w-64 bg-white overflow-y-auto transition-transform duration-300 ease-in-out z-50 lg:static lg:translate-x-0 ${
          isSideBarOpen ? "translate-x-0" : "-translate-x-full"
        } lg:block`}
      >
        <FilterSideBar />
      </div>

      <div className="flex-grow p-4">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl uppercase">
            {productCollection || "All Products"}
          </h2>
          {(error || product?.length === 0) && (
            <button
              onClick={handleRefresh}
              disabled={isRefreshing}
              className="flex items-center gap-2 px-4 py-2 bg-black text-white rounded hover:bg-gray-800 disabled:opacity-50"
            >
              <BiRefresh className={`${isRefreshing ? "animate-spin" : ""}`} />
              Refresh
            </button>
          )}
        </div>

        <SortOpention />

        {error ? (
          <div className="text-center py-8">
            <p className="text-red-500 mb-4">{error}</p>
            <p className="text-gray-600">Please try refreshing the page</p>
          </div>
        ) : loading ? (
          <div className="flex justify-center items-center min-h-[400px]">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900"></div>
          </div>
        ) : product?.length === 0 ? (
          <div className="text-center py-8">
            <p className="text-lg text-gray-600">
              No products found matching your criteria
            </p>
          </div>
        ) : (
          <ProductGrid product={product} loading={loading} error={error} />
        )}
      </div>
    </div>
  );
};

export default CollectionPage;
