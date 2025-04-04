import React from "react";
import HeroSection from "../componets/layouts/Hero-section";
import GenderCollectionSection from "../componets/products/GenderCollectionSection";
import NewArrivals from "../componets/products/NewArrivals";
import ProductsDetails from "../componets/products/ProductsDetails";
import ProductGrid from "../componets/products/ProductGrid";
import FeatureCollection from "../componets/products/FeatureCollection";
import FeatucreSection from "../componets/products/FeatucreSection";

const placeholderProducts = [
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

const Home = () => {
  return (
    <div>
      <HeroSection />
      <GenderCollectionSection />
      <NewArrivals />
      {/* best seller componets */}
      <h2 className="text-3xl text-center font-bold mb-4 uppercase">
        best seller
      </h2>
      <ProductsDetails />

      <div className=" container mx-auto">
        <h2 className="text-3xl text-center font-bold mb-4 uppercase">
          top wears for women
        </h2>
        <ProductGrid products={placeholderProducts} />
      </div>
      <FeatureCollection />
      <FeatucreSection />
    </div>
  );
};

export default Home;
