import React from "react";
import { useSearchParams } from "react-router-dom";

const SortOpention = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  const handleSortChange = (e) => {
    const SortBy = e.target.value;
    searchParams.set("sortBy", SortBy);
    setSearchParams(searchParams);
  };

  return (
    <div className="mb-4 flex items-center justify-end px-4">
      <select
        name="sort"
        id="sort"
        value={searchParams.get("sortBy") || ""}
        className="border border-gray-300 p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 cursor-pointer hover:border-gray-400 transition-colors"
        onChange={handleSortChange}
      >
        <option value="Default">Sort By</option>
        <option value="PriceAsc">Price: Low to High</option>
        <option value="PriceDsc">Price: High to Low</option>
        <option value="populartity">Popularity</option>
      </select>
    </div>
  );
};

export default SortOpention;
