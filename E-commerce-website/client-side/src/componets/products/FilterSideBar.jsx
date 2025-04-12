import React, { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  FetchProductByFilters,
  setFilters,
} from "../../redux/slices/product-Slice";

const FilterSideBar = () => {
  const dispatch = useDispatch();
  const [searchParams, setSearchParams] = useSearchParams();
  const navigate = useNavigate();
  const [localFilters, setLocalFilters] = useState({
    category: "",
    gender: "",
    color: "",
    sizes: [],
    material: [],
    brand: [],
    minPrice: 0,
    maxPrice: 100,
  });

  const [priceRange, setPriceRange] = useState([0, 100]);

  // Categories and other static data...
  const categories = ["Top Wear", "Bottom Wear"];
  const colors = [
    "Red",
    "Blue",
    "Yellow",
    "White",
    "Green",
    "Navy",
    "Black",
    "Pink",
  ];
  const sizes = ["S", "M", "L", "XL", "XXL"];
  const materials = [
    "Cotton",
    "Wool",
    "Denim",
    "Polyester",
    "Silk",
    "Linen",
    "Viscose",
  ];
  const brands = [
    "Nike",
    "Adidas",
    "Puma",
    "Reebok",
    "Under Armour",
    "New Balance",
  ];
  const genders = ["Men", "Women", "Other"];

  useEffect(() => {
    const params = Object.fromEntries([...searchParams]);
    const newFilters = {
      category: params.category || "",
      gender: params.gender || "",
      color: params.color || "",
      sizes: params.sizes ? params.sizes.split(",") : [],
      material: params.material ? params.material.split(",") : [],
      brand: params.brand ? params.brand.split(",") : [],
      minPrice: parseFloat(params.minPrice) || 0,
      maxPrice: parseFloat(params.maxPrice) || 100,
    };
    setLocalFilters(newFilters);
    setPriceRange([newFilters.minPrice, newFilters.maxPrice]);

    // Dispatch both actions
    dispatch(setFilters(newFilters));
    dispatch(FetchProductByFilters(newFilters));
  }, [searchParams, dispatch]);

  const handlerFilterChange = (e) => {
    const { name, value, checked, type } = e.target;
    let newFilters = { ...localFilters };

    if (type === "checkbox") {
      if (checked) {
        newFilters[name] = [...(newFilters[name] || []), value];
      } else {
        newFilters[name] = newFilters[name].filter((item) => item !== value);
      }
    } else if (type === "radio") {
      newFilters[name] = value;
    }

    setLocalFilters(newFilters);
    updateURLAndDispatch(newFilters);
  };

  const handlePriceChange = (e) => {
    const newPrice = parseFloat(e.target.value);
    setPriceRange([0, newPrice]);
    const newFilters = { ...localFilters, minPrice: 0, maxPrice: newPrice };
    setLocalFilters(newFilters);
    updateURLAndDispatch(newFilters);
  };

  const updateURLAndDispatch = (newFilters) => {
    const params = new URLSearchParams();
    Object.entries(newFilters).forEach(([key, value]) => {
      if (Array.isArray(value) && value.length > 0) {
        params.set(key, value.join(","));
      } else if (value && !Array.isArray(value)) {
        params.set(key, value.toString());
      }
    });

    setSearchParams(params);
    dispatch(setFilters(newFilters));
    dispatch(FetchProductByFilters(newFilters));
  };

  return (
    <div className="p-4">
      <h3 className="text-xl font-medium text-gray-800 uppercase">filter</h3>

      {/* Category */}
      <div className="mb-6">
        <label className="block text-gray-800 font-medium mb-2 uppercase">
          Category
        </label>
        {categories.map((category) => (
          <div className="flex items-center mb-1" key={category}>
            <input
              type="radio"
              name="category"
              value={category}
              onChange={handlerFilterChange}
              checked={localFilters.category === category}
              className="mr-2 h-4 w-4 text-blue-600 focus:ring-blue-500 cursor-pointer accent-blue-500"
            />
            <span className="text-gray-700">{category}</span>
          </div>
        ))}
      </div>

      {/* Gender */}
      <div className="mb-6">
        <label className="block text-gray-800 font-medium mb-2 uppercase">
          Gender
        </label>
        {genders.map((gender) => (
          <div className="flex items-center mb-1" key={gender}>
            <input
              type="radio"
              name="gender"
              value={gender}
              onChange={handlerFilterChange}
              checked={localFilters.gender === gender}
              className="mr-2 h-4 w-4 text-blue-600 focus:ring-blue-500 cursor-pointer accent-blue-500"
            />
            <span className="text-gray-700">{gender}</span>
          </div>
        ))}
      </div>

      {/* Color */}
      <div className="mb-6">
        <label className="block text-gray-600 font-medium mb-2 uppercase">
          Color
        </label>
        <div className="grid grid-cols-4 gap-2">
          {colors.map((color) => (
            <button
              key={color}
              type="button"
              name="color"
              value={color}
              onClick={() => {
                const newFilters = { ...localFilters, color };
                setLocalFilters(newFilters);
                updateURLAndDispatch(newFilters);
              }}
              className={`w-8 h-8 rounded-full border border-gray-300 cursor-pointer transition hover:scale-105 ${
                localFilters.color === color ? "ring-2 ring-blue-500" : ""
              }`}
              style={{ backgroundColor: color.toLowerCase() }}
            />
          ))}
        </div>
      </div>

      {/* Size */}
      <div className="mb-6">
        <label className="block text-gray-600 font-medium mb-2 uppercase">
          Size
        </label>
        {sizes.map((size) => (
          <div className="flex items-center mb-1" key={size}>
            <input
              type="checkbox"
              name="sizes"
              value={size}
              onChange={handlerFilterChange}
              checked={localFilters.sizes.includes(size)}
              className="mr-2 h-4 w-4 cursor-pointer text-blue-600 focus:ring-blue-500 accent-blue-500 rounded"
            />
            <span className="text-gray-700">{size}</span>
          </div>
        ))}
      </div>

      {/* Material */}
      <div className="mb-6">
        <label className="block text-gray-600 font-medium mb-2 uppercase">
          Material
        </label>
        {materials.map((material) => (
          <div className="flex items-center mb-1" key={material}>
            <input
              type="checkbox"
              name="material"
              value={material}
              onChange={handlerFilterChange}
              checked={localFilters.material.includes(material)}
              className="mr-2 h-4 w-4 cursor-pointer text-blue-500 focus:ring-blue-400 border-gray-300"
            />
            <span className="text-gray-700">{material}</span>
          </div>
        ))}
      </div>

      {/* Brand */}
      <div className="mb-6">
        <label className="block text-gray-600 font-medium mb-2 uppercase">
          Brands
        </label>
        {brands.map((brand) => (
          <div className="flex items-center mb-1" key={brand}>
            <input
              type="checkbox"
              name="brand"
              value={brand}
              onChange={handlerFilterChange}
              checked={localFilters.brand.includes(brand)}
              className="mr-2 h-4 w-4 cursor-pointer text-blue-500 focus:ring-blue-400 border-gray-300"
            />
            <span className="text-gray-700">{brand}</span>
          </div>
        ))}
      </div>

      {/* Price Range */}
      <div className="mb-8">
        <label className="block text-gray-600 font-medium mb-2 uppercase">
          Price Range
        </label>
        <input
          type="range"
          min={0}
          max={1000}
          value={priceRange[1]}
          onChange={handlePriceChange}
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
