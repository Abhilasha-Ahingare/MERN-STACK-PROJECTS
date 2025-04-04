import React from "react";
import womenImg from "../../assets/iamges/women.jpg";
import MenImg from "../../assets/iamges/mens.jpg";
import { Link } from "react-router-dom";

const GenderCollectionSection = () => {
  return (
    <section className=" py-16 px-4 lg:px-0">
      <div className="container mx-auto flex flex-col md:flex-row gap-8">
        {/* women's collection */}
        <div className=" relative flex-1">
          <img
            src={womenImg}
            alt="women's collection"
            className="w-full h-[700px] object-cover"
          />
          <div className=" absolute bottom-8 left-8 bg-white bg-opacity-90 p-4">
            <h2 className=" text-2xl font-bold text-gray-900 mb-3 uppercase">
              women's collection
            </h2>
            <Link
              to="/collection/all?gender=women"
              className=" text-gray-900 underline"
            >
              shop now
            </Link>
          </div>
        </div>
        {/* mens collceton */}
        <div className=" relative flex-1">
          <img
            src={MenImg}
            alt="men's collection"
            className="w-full h-[700px] object-cover"
          />
          <div className=" absolute bottom-8 left-8 bg-white bg-opacity-90 p-4">
            <h2 className=" text-2xl font-bold text-gray-900 mb-3 uppercase">
              men's collection
            </h2>
            <Link
              to="/collection/all?gender=men"
              className=" text-gray-900 underline"
            >
              shop now
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default GenderCollectionSection;
