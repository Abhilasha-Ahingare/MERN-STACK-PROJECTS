import React, { useState } from "react";

const defaultData = [
  {
    name: "",
    description: "",
    price: 0,
    countInStock: 0,
    sku: "",
    category: "",
    brand: "",
    sizes: [],
    colors: "", // Change this to empty string instead of array
    collection: "",
    material: "",
    gender: "",
    image: [
      { url: "https://picsum.photos/500/500?random=1" },
      { url: "https://picsum.photos/500/500?random=2" },
    ],
  },
];

const EditProductPage = () => {
  const [productData, setProductData] = useState(defaultData[0]);

  const handlChange = (e) => {
    const { name, value } = e.target;
    setProductData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleImageChange = (e) => {
    const files = e.target.files[0];

    // if (files && files.length > 0) {
    //   const newImages = Array.from(files).map((file) => ({
    //     url: URL.createObjectURL(file),
    //     file,
    //   }));
    //   setProductData((prevData) => ({
    //     ...prevData,
    //     image: [...prevData.image, ...newImages],
    //   }));
    // }

    // console.log("file", files);
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    console.log(productData);
  };
  return (
    <div className=" max-w-5xl mx-auto p-6 shadow-md rounded-md">
      <h2 className="text-3xl font-bold mb-6">Edit Products</h2>
      <form onSubmit={handleFormSubmit}>
        {/* names */}
        <div className="mb-6">
          <label htmlFor="name" className="block font-semibold mb-2">
            Name
          </label>
          <input
            type="text"
            name="name"
            value={productData.name}
            placeholder="Enter your Name"
            autoComplete="off"
            onChange={handlChange}
            className="w-full border border-gray-300 rounded-md p-2"
          />
        </div>

        {/*  Description */}
        <div className="mb-6">
          <label htmlFor=" Description" className="block font-semibold mb-2">
            Description
          </label>
          <textarea
            name=" Description"
            value={productData.description}
            onChange={handlChange}
            className="w-full border border-gray-300 rounded-md p-2"
            rows={4}
            required
          />
        </div>

        {/* price */}
        <div className="mb-6">
          <label htmlFor="name" className="block font-semibold mb-2">
            Price :
          </label>
          <input
            type="number"
            name="price"
            value={productData.price}
            placeholder="Enter your price"
            autoComplete="off"
            onChange={handlChange}
            className="w-full border border-gray-300 rounded-md p-2"
          />
        </div>

        {/* countInStock */}
        <div className="mb-6">
          <label htmlFor="name" className="block font-semibold mb-2">
            countInStock
          </label>
          <input
            type="number"
            name="countInStock"
            value={productData.countInStock}
            onChange={handlChange}
            className="w-full border border-gray-300 rounded-md p-2"
          />
        </div>
        {/* sku */}
        <div className="mb-6">
          <label htmlFor="name" className="block font-semibold mb-2">
            SKU
          </label>
          <input
            type="text"
            name="sku"
            value={productData.sku}
            onChange={handlChange}
            className="w-full border border-gray-300 rounded-md p-2"
          />
        </div>
        {/* sizes*/}
        <div className="mb-6">
          <label htmlFor="name" className="block font-semibold mb-2">
            Sizes
          </label>
          <input
            type="text"
            name="sizes"
            value={productData.sizes?.join(", ") || ""}
            onChange={(e) =>
              setProductData((prevData) => ({
                ...prevData,
                sizes: e.target.value
                  ? e.target.value.split(",").map((size) => size.trim())
                  : [],
              }))
            }
            className="w-full border border-gray-300 rounded-md p-2"
          />
        </div>

        {/* category */}
        <div className="mb-6">
          <label htmlFor="category" className="block font-semibold mb-2">
            Category
          </label>
          <input
            type="text"
            name="category"
            value={productData.category}
            onChange={handlChange}
            className="w-full border border-gray-300 rounded-md p-2"
          />
        </div>

        {/* brand */}
        <div className="mb-6">
          <label htmlFor="brand" className="block font-semibold mb-2">
            Brand
          </label>
          <input
            type="text"
            name="brand"
            value={productData.brand}
            onChange={handlChange}
            className="w-full border border-gray-300 rounded-md p-2"
          />
        </div>

        {/* color */}
        <div className="mb-6">
          <label htmlFor="colors" className="block font-semibold mb-2">
            Colors
          </label>
          <input
            type="text"
            name="colors"
            value={productData.colors}
            onChange={(e) =>
              setProductData({
                ...productData,
                colors: e.target.value,
              })
            }
            placeholder="Enter colors separated by commas"
            className="w-full border border-gray-300 rounded-md p-2"
          />
        </div>

        {/* material */}
        <div className="mb-6">
          <label htmlFor="material" className="block font-semibold mb-2">
            Material
          </label>
          <input
            type="text"
            name="material"
            value={productData.material}
            onChange={handlChange}
            placeholder="Enter material type"
            className="w-full border border-gray-300 rounded-md p-2"
          />
        </div>

        {/* gender */}
        <div className="mb-6">
          <label htmlFor="gender" className="block font-semibold mb-2">
            Gender
          </label>
          <select
            name="gender"
            value={productData.gender}
            onChange={handlChange}
            className="w-full border border-gray-300 rounded-md p-2"
          >
            <option value="">Select Gender</option>
            <option value="men">Men</option>
            <option value="women">Women</option>
            <option value="unisex">Unisex</option>
          </select>
        </div>

        {/* collection */}
        <div className="mb-6">
          <label htmlFor="collection" className="block font-semibold mb-2">
            Collection
          </label>
          <input
            type="text"
            name="collection"
            value={productData.collection}
            onChange={handlChange}
            placeholder="Enter collection name"
            className="w-full border border-gray-300 rounded-md p-2"
          />
        </div>

        {/* image upload */}
        <div className="mb-6">
          <label className="block font-semibold mb-2">Upload Image</label>
          <input type="file" multiple onChange={handleImageChange} />
          <div className="mt-4 flex gap-2">
            {productData.image.map((img, index) => (
              <img
                key={index}
                src={img.url}
                alt={`Product ${index + 1}`}
                className="w-24 h-24 object-cover rounded-md shadow-md"
              />
            ))}
          </div>
        </div>
        <button
          type="submit"
          className="w-full bg-green-500 text-white py-2 rounded-md hover:bg-green-600 transition-colors"
        >
          {" "}
          Update product
        </button>
      </form>
    </div>
  );
};

export default EditProductPage;
