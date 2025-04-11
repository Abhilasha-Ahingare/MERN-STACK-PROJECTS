import React from "react";
import { useSearchParams } from "react-router-dom";

const SortOpention = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  const handleSortChange = (e) => {
    const sortBy = e.target.value;
    if (sortBy === "Default") {
      searchParams.delete("sortBy");
    } else {
      searchParams.set("sortBy", sortBy);
    }
    setSearchParams(searchParams);
  };

  return (
    <div className="mb-4 flex items-center justify-end px-4">
      <select
        name="sort"
        id="sort"
        value={searchParams.get("sortBy") || "Default"}
        className="border border-gray-300 p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 cursor-pointer hover:border-gray-400 transition-colors"
        onChange={handleSortChange}
      >
        <option value="Default">Sort By</option>
        <option value="PriceAsc">Price: Low to High</option>
        <option value="PriceDsc">Price: High to Low</option>
        <option value="popularity">Popularity</option>
        <option value="newest">Newest First</option>
        <option value="nameAsc">Name: A to Z</option>
        <option value="nameDsc">Name: Z to A</option>
      </select>
    </div>
  );
};

export default SortOpention;
