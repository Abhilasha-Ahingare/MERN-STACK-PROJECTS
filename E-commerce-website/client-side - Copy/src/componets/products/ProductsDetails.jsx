import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import ProductGrid from "./ProductGrid";

const selectedProudct = {
  name: "stylish jacket",
  price: 120,
  originalPrice: 150,
  description: "this is a style jackect perfect for any occasion",
  brand: "fashinoBrand",
  material: "leather",
  sizes: ["S", "M", "L", "XL"],
  color: ["red", "black"],
  image: [
    {
      url: "https://picsum.photos/500/500?random=1",
      altText: "stylish 1",
    },
    {
      url: "https://picsum.photos/500/500?random=2",
      altText: "stylish 2",
    },
  ],
};

const similarProducts = [
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
    _id: 1,
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
];

const ProductsDetails = () => {
  const [mainImage, setMainImage] = useState("");
  const [selectedSize, setSelectedSize] = useState("");
  const [selectedColor, setSelectedColor] = useState("");
  const [Quantity, setQuantity] = useState(1);
  const [isButtonDisabled, setIsButtonDisabled] = useState(false);

  const handlerQuantityChnage = (action) => {
    if (action === "plus") setQuantity((prev) => prev + 1);
    if (action === "minus" && Quantity > 1) setQuantity((prev) => prev - 1);
  };
  const handleAddToCart = () => {
    if (!selectedSize || !selectedColor) {
      toast.error("please select a size and color before adding to cart.. ", {
        duration: 1000,
      });
      return;
    }
    setIsButtonDisabled(true);
    setTimeout(() => {
      toast.success("product added to cart", { duration: 1000 });
      setIsButtonDisabled(false);
    }, 500);
  };
  useEffect(() => {
    if (selectedProudct?.image?.length > 0) {
      setMainImage(selectedProudct.image[0].url);
    }
  }, [selectedProudct]);

  return (
    <div className="p-6">
      <div className="max-w-6xl mx-auto bg-white p-8 rounded-lg  ">
        <div className="flex flex-col md:flex-row">
          {/* left thumbnails */}
          <div className="hidden md:flex flex-col space-y-4 mr-6">
            {selectedProudct.image.map((image, index) => (
              <img
                key={index}
                src={image.url}
                alt={image.altText || `thumbnail ${index}`}
                className={`w-20 h-20 object-cover rounded-lg cursor-pointer border ${
                  mainImage === image.url ? "border-black" : "border-gray-300"
                }`}
                onClick={() => setMainImage(image.url)}
              />
            ))}
          </div>
          {/* main image */}
          <div className=" md:w-1/2">
            <div className="mb-4">
              <img
                src={mainImage}
                alt={selectedProudct.image[0]?.altText}
                className=" w-full h-auto object-cover rounded-lg"
              />
            </div>
          </div>
          {/* mobile thumbnail */}
          <div className="md:hidden flex overflow-x-scroll space-x-4 mb-4">
            {selectedProudct.image.map((image, index) => (
              <img
                key={index}
                src={image.url}
                alt={image.altText || `thumbnail ${index}`}
                className={`w-20 h-20 object-cover rounded-lg cursor-pointer border ${
                  mainImage === image.url ? "border-black" : "border-gray-300"
                }`}
                onClick={() => setMainImage(image.url)}
              />
            ))}
          </div>
          {/* right section */}

          <div className="md:w-1/2 md:ml-10">
            <h1 className="text-2xl md:text-3xl font-semibold mb-2">
              {selectedProudct.name}
            </h1>
            <p className="text-lg text-gray-600 line-through">
              {selectedProudct.originalPrice &&
                ` $ ${selectedProudct.originalPrice}`}
            </p>
            <p className="text-xl text-gray-500 mb-2">
              ${selectedProudct.price}
            </p>
            <p className="text-gray-600 mb-4">{selectedProudct.description}</p>

            <div className="mb-4">
              <p className="text-gray-700">color:</p>
              <div className="flex gap-2 mt-2">
                {selectedProudct.color.map((color) => (
                  <button
                    key={color}
                    onClick={() => setSelectedColor(color)}
                    className={`w-8 h-8 rounded-full border ${
                      selectedColor === color
                        ? "border-4 border-black"
                        : "border-gray-300"
                    }`}
                    style={{
                      backgroundColor: color.toLocaleLowerCase(),
                      filter: "brightness(0.5)",
                    }}
                  ></button>
                ))}
              </div>
            </div>
            <div className="mb-4">
              <p className="text-gray-700">size:</p>
              <div className="flex gap-2 mt-2">
                {selectedProudct.sizes.map((size) => (
                  <button
                    onClick={() => setSelectedSize(size)}
                    key={size}
                    className={`px-4 py-2 rounded border ${
                      selectedSize === size ? "bg-black text-white" : ""
                    }`}
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>
            <div className="mb-6">
              <p className="text-gray-700">Quantity:</p>
              <div className="flex items-center space-x-4 mt-2">
                <button
                  onClick={() => handlerQuantityChnage("minus")}
                  className="px-2 bg-gray-200 rounded text-lg"
                >
                  -
                </button>
                <span className="text-lg ">{Quantity}</span>
                <button
                  onClick={() => handlerQuantityChnage("plus")}
                  className="px-2 bg-gray-200 rounded text-lg"
                >
                  +
                </button>
              </div>
            </div>
            <button
              onClick={handleAddToCart}
              disabled={isButtonDisabled}
              className={` uppercase bg-black text-white py-2 px-6 rounded w-full mb-4 ${
                isButtonDisabled
                  ? "cursor-not-allowed opacity-50"
                  : "hover:bg-gray-900"
              }`}
            >
              {isButtonDisabled ? "adding.." : "add to cart"}
            </button>

            <div className="mt-10 text-gray-700">
              <h3 className="text-xl font-bold mb-4">Characterstics:</h3>
              <table className="w-full text-left text-sm text-gray-600">
                <tbody>
                  <tr>
                    <td className="py-1">Brand</td>
                    <td className="py-1">{selectedProudct.brand}</td>
                  </tr>
                  <tr>
                    <td className="py-1">Material</td>
                    <td className="py-1">{selectedProudct.material}</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
        <div className="mt-20">
          <h2 className="text-3xl text-center font-bold mb-4 uppercase">
            {" "}
            you my also like
          </h2>
          <ProductGrid products={similarProducts} />
        </div>
      </div>
    </div>
  );
};

export default ProductsDetails;
