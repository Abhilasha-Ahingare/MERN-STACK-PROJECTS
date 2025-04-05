import React, { useState } from "react";
import { HiMagnifyingGlass, HiMiniXMark } from "react-icons/hi2";

const SearchBar = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [isOpen, setIsOpen] = useState(false);

  const handleSerachToggle = () => {
    setIsOpen(!isOpen);
  };

  const handleSearch = (e) => {
    e.preventDefault();
    setIsOpen(false);
  };

  return (
    <div
      className={`flex items-center justify-center w-full transition-all duration-300 ${
        isOpen ? "absolute top-0 left-0 w-full bg-white h-24 z-50" : "w-auto"
      }`}
    >
      {isOpen ? (
        <form
          onSubmit={handleSearch}
          className="relative flex items-center justify-center w-full"
        >
          <div className="relative w-1/2">
            <input
              type="text"
              placeholder="Search products..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full bg-gray-100 px-4 py-3 pr-16 rounded-lg focus:outline-none placeholder:text-gray-700"
            />
            {/* search button */}
            <button
              type="submit"
              className="absolute right-[3rem] top-1/2 -translate-y-1/2 p-2 hover:bg-gray-200 rounded-full transition-colors"
            >
              <HiMagnifyingGlass className="h-7 w-7 text-gray-700" />
            </button>

            {/* close button */}
            <button
              type="button"
              onClick={handleSerachToggle}
              className="absolute right-4 top-1/2 -translate-y-1/2 p-2 hover:bg-gray-200 rounded-full transition-colors"
            >
              <HiMiniXMark className="h-7 w-7 text-gray-700" />
            </button>
          </div>
        </form>
      ) : (
        <button
          onClick={handleSerachToggle}
          className="p-2 hover:bg-gray-100 rounded-full transition-colors"
        >
          <HiMagnifyingGlass className="h-7 w-7 text-gray-700" />
        </button>
      )}
    </div>
  );
};

export default SearchBar;
