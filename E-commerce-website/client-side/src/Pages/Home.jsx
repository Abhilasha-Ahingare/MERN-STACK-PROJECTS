import React, { useEffect, useState } from "react";
import HeroSection from "../componets/layouts/Hero-section";
import GenderCollectionSection from "../componets/products/GenderCollectionSection";
import NewArrivals from "../componets/products/NewArrivals";
import ProductsDetails from "../componets/products/ProductsDetails";
import ProductGrid from "../componets/products/ProductGrid";
import FeatureCollection from "../componets/products/FeatureCollection";
import FeatucreSection from "../componets/products/FeatucreSection";


import { useDispatch, useSelector } from "react-redux";
import { FetchProductByFilters } from "../redux/slices/product-Slice";
import api from "../utils/api";

const Home = () => {
  const dispatch = useDispatch();
  const { product, loading, error } = useSelector((state) => state.product);
  const [bestSellerProduct, setBestSellerProduct] = useState({});
  const [bestSellerLoading, setBestSellerLoading] = useState(false);
  const [bestSellerError, setBestSellerError] = useState(null);

  useEffect(() => {
    // Fetch regular products
    dispatch(
      FetchProductByFilters({
        gender: "Women",
        category: "Top Wear",
        limit: 8,
      })
    );

    // Fetch a random product as best seller
    const fetchBestSeller = async () => {
      setBestSellerLoading(true);
      setBestSellerError(null);
      try {
        const response = await api.get(`/api/product/BestSeller`);
        const data = response.data?.bestSeller;
        setBestSellerProduct(data);
      } catch (error) {
        setBestSellerError("Failed to load featured product");
      } finally {
        setBestSellerLoading(false);
      }
    };
    fetchBestSeller();
  }, [dispatch]);

  return (
    <div className="min-h-screen">
      <HeroSection />
      <GenderCollectionSection />
      <NewArrivals />

      <h2 className="text-3xl text-center font-bold mb-4 uppercase">
        Best Seller
      </h2>
      {bestSellerLoading ? (
        <p className="text-center">Loading best seller product...</p>
      ) : bestSellerError ? (
        <p className="text-center text-red-500">{bestSellerError}</p>
      ) : bestSellerProduct ? (
        <ProductsDetails productId={bestSellerProduct._id} />
      ) : (
        <p className="text-center">No best seller product found</p>
      )}

      <div className="container mx-auto">
        <h2 className="text-3xl text-center font-bold mb-4 uppercase">
          Top wears for women
        </h2>
        <ProductGrid product={product} loading={loading} error={error} />
      </div>
      <FeatureCollection />
      <FeatucreSection />
    </div>
  );
};

export default Home;
