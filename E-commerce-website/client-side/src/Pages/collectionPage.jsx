import React, { useEffect, useRef, useState } from "react";
import { FaFilter } from "react-icons/fa";
import FilterSideBar from "../componets/products/FilterSideBar";
import SortOpention from "../componets/products/SortOpention";
import ProductGrid from "../componets/products/ProductGrid";

const CollectionPage = () => {
  const [products, setProducts] = useState([]);
  const sidebarRef = useRef(null);
  const [isSideBarOpen, setIsSideBarOpen] = useState(false);

  const toggleSideBar = () => {
    setIsSideBarOpen(!isSideBarOpen);
  };

  const handleClickOutSide = (e) => {
    // close sidebar is clicked outside
    if (sidebarRef.current && !sidebarRef.current.contains(e.target)) {
      setIsSideBarOpen(false);
    }
  };

  useEffect(() => {
    // add event listner for click
    document.addEventListener("mousedown", handleClickOutSide);
    // remove event listner
    return () => {
      document.removeEventListener("mousedown", handleClickOutSide);
    };
  }, []);

  useEffect(() => {
    setTimeout(() => {
      const fetchProducts = [
        {
          _id: 1,
          name: "product 1",
          price: 100,
          image: [
            {
              url: "https://picsum.photos/500/500?random=1",
              altText: "products",
            },
          ],
        },
        {
          _id: 2,
          name: "product 1",
          price: 100,
          image: [
            {
              url: "https://picsum.photos/500/500?random=2",
              altText: "products",
            },
          ],
        },
        {
          _id: 3,
          name: "product 3",
          price: 100,
          image: [
            {
              url: "https://picsum.photos/500/500?random=3",
              altText: "products",
            },
          ],
        },
        {
          _id: 4,
          name: "product 1",
          price: 100,
          image: [
            {
              url: "https://picsum.photos/500/500?random=4",
              altText: "products",
            },
          ],
        },
        {
          _id: 5,
          name: "product 1",
          price: 100,
          image: [
            {
              url: "https://picsum.photos/500/500?random=5",
              altText: "products",
            },
          ],
        },
        {
          _id: 6,
          name: "product 1",
          price: 100,
          image: [
            {
              url: "https://picsum.photos/500/500?random=6",
              altText: "products",
            },
          ],
        },
        {
          _id: 7,
          name: "product 1",
          price: 100,
          image: [
            {
              url: "https://picsum.photos/500/500?random=7",
              altText: "products",
            },
          ],
        },
        {
          _id: 8,
          name: "product 1",
          price: 100,
          image: [
            {
              url: "https://picsum.photos/500/500?random=8",
              altText: "products",
            },
          ],
        },
      ];
      setProducts(fetchProducts);
    }, 1000);
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
        <h2 className="text-2xl uppercase mb-4">All collection</h2>

        {/* sort option */}
        <SortOpention />

        {/* product gird */}

        <ProductGrid products={products} />
      </div>
    </div>
  );
};

export default CollectionPage;
