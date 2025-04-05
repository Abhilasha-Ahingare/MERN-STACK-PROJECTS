import React, { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";

const FilterSideBar = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const navigate = useNavigate();
  const [filters, setFilters] = useState({
    category: "",
    gender: "",
    color: "",
    size: [],
    material: [],
    brand: [],
    minPrice: 0,
    maxPrice: 100,
  });

  const [priceRange, setPriceRange] = useState(0, 100);

  const categories = ["top wear", "bottom wear"];
  const color = [
    "red",
    "blue",
    "yellow",
    "white",
    "green",
    "navy",
    "black",
    "pink",
  ];
  const size = ["XS", "S", "M", "L", "XL", "XXL"];
  const material = [
    "cotton",
    "wool",
    "denim",
    "polyester",
    "silk",
    "linen",
    "viscose",
  ];
  const brands = ["bvhj", "hbbvj", "jhfjh", "jhgjhg", "qwygeu", "jhfjh"];

  const gender = ["Men", "Women", "Other"];

  useEffect(() => {
    const params = Object.fromEntries([...searchParams]);

    setFilters({
      category: params.category || "",
      gender: params.gender || "",
      color: params.color || "",
      size: params.size ? params.size.split(",") : [],
      material: params.material ? params.material.split(",") : [],
      brand: params.brand ? params.brand.split(",") : [],
      minPrice: params.minPrice || 0,
      maxPrice: params.maxPrice || 100,
    });
    setPriceRange([0, params.maxPrice || 100]);
  }, [searchParams]);

  const handlerFilterChnage = (e) => {
    const { name, value, checked, type } = e.target;
    let newFilter = { ...filters };

    if (type === "checkbox") {
      if (checked) {
        newFilter[name] = [...(newFilter[name] || []), value];
      } else {
        newFilter[name] = newFilter[name].filter((item) => item !== value);
      }
    } else {
      newFilter[name] = value;
    }
    setFilters(newFilter);
    updateURLParams(newFilter);
  };

  // change url
  const updateURLParams = (newFilter) => {
    const params = new URLSearchParams();
    Object.keys(newFilter).forEach((key) => {
      if (Array.isArray(newFilter[key]) && newFilter[key].length > 0) {
        params.append(key, newFilter[key].join(","));
      } else if (newFilter[key]) {
        params.append(key, newFilter[key]);
      }
    });
    setSearchParams(params);
    navigate(`?${params.toString()}`);
  };

  const handlePriceChnage = (e) => {
    const newPrice = e.target.value;
    setPriceRange([0, newPrice]);
    const newFilters = { ...filters, minPrice: 0, maxPrice: newPrice };
    setFilters(filters);
    updateURLParams(newFilters);
  };

  return (
    <div className="p-4">
      <h3 className="text-xl font-medium text-gray-800 uppercase">filter</h3>

      {/* category  */}
      <div className="mb-6">
        <label className="block text-gray-800 font-medium mb-2 uppercase">
          Category
        </label>
        {categories.map((categories) => (
          <div className="flex items-center mb-1" key={categories}>
            <input
              type="radio"
              name="category"
              value={categories}
              onChange={handlerFilterChnage}
              checked={filters.category === categories}
              className="mr-2 h-4 w-4 text-blue-600 focus:ring-blue-500 cursor-pointer accent-blue-500"
            />
            <span className="text-gray-700">{categories}</span>
          </div>
        ))}
      </div>

      {/* gender  */}
      <div className="mb-6">
        <label className="block text-gray-800 font-medium mb-2 uppercase">
          Gender
        </label>
        {gender.map((gender) => (
          <div className="flex items-center mb-1" key={gender}>
            <input
              type="radio"
              name="gender"
              value={gender}
              onChange={handlerFilterChnage}
              checked={filters.gender === gender}
              className="mr-2 h-4 w-4 cursor-pointer text-blue-600 focus:ring-blue-500 accent-blue-500"
            />
            <span className="text-gray-700">{gender}</span>
          </div>
        ))}
      </div>

      {/* color */}
      <div className="mb-6">
        <label className="block text-gray-600 font-medium mb-2 uppercase">
          color
        </label>
        <div className="flex flex-wrap gap-2">
          {color.map((color) => (
            <button
              key={color}
              name="color"
              value={color}
              onClick={handlerFilterChnage}
              className={`w-8 h-8 rounded-full border border-gray-300 cursor-pointer transition hover:scale-105 ${
                filters.color === color ? "ring-2 ring-blue-500" : ""
              }`}
              style={{ backgroundColor: color.toLowerCase() }}
            ></button>
          ))}
        </div>
      </div>
      {/* size */}
      <div className="mb-6">
        <label className="block text-gray-600 font-medium mb-2 uppercase">
          size
        </label>
        {size.map((size) => (
          <div className="flex items-center mb-1">
            <input
              type="checkbox"
              name="size"
              value={size}
              onChange={handlerFilterChnage}
              checked={filters.size.includes(size)}
              className="mr-2 h-4 w-4 cursor-pointer text-blue-600 focus:ring-blue-500 accent-blue-500 rounded"
            />
            <span className="text-gray-700">{size}</span>
          </div>
        ))}
      </div>
      {/* material */}
      <div className="mb-6">
        <label className="block text-gray-600 font-medium mb-2 uppercase">
          material
        </label>
        {material.map((material) => (
          <div className="flex items-center mb-1">
            <input
              type="checkbox"
              name="material"
              value={material}
              onChange={handlerFilterChnage}
              checked={filters.material.includes(material)}
              className="mr-2 h-4 w-4 cursor-pointer text-blue-500 focus:ring-blue-400 border-gray-300"
            />
            <span className="text-gray-700">{material}</span>
          </div>
        ))}
      </div>
      {/* brand */}
      <div className="mb-6">
        <label className="block text-gray-600 font-medium mb-2 uppercase">
          brands
        </label>
        {brands.map((brands) => (
          <div className="flex items-center mb-1">
            <input
              type="checkbox"
              name="brands"
              value={brands}
              onChange={handlerFilterChnage}
              checked={filters.brand.includes(brands)}
              className="mr-2 h-4 w-4 cursor-pointer text-blue-500 focus:ring-blue-400 border-gray-300"
            />
            <span className="text-gray-700">{brands}</span>
          </div>
        ))}
      </div>

      {/* price range */}
      <div className="mb-8">
        <label className="block text-gray-600 font-medium mb-2 uppercase">
          price range
        </label>

        <input
          type="range"
          name="priceRange"
          min={0}
          max={100}
          value={priceRange[1]}
          onChange={handlePriceChnage}
          className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-blue-500"
        />
        <div className="flex justify-between text-gray-600 mt-2">
          <span>$0</span>
          <span>${priceRange[1]}</span>
        </div>
      </div>
    </div>
  );
};

export default FilterSideBar;
