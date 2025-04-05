import React from "react";
import { HiOutlineCreditCard, HiShoppingBag } from "react-icons/hi";
import { HiArrowPathRoundedSquare } from "react-icons/hi2";

const FeatucreSection = () => {
  return (
    <section className="py-16 px-4 bg-white">
      <div className=" container mx-auto grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
        {/* feature 1 */}
        <div className=" flex flex-col items-center">
          <div className="p-4 rounded-full mb-4">
            <HiShoppingBag className="text-xl" />
          </div>
          <h4 className="tracking-tighter mb-2 uppercase">
            free international shiping
          </h4>
          <p className="text-gray-600 text-sm tracking-tighter">
            on all order over $100.0
          </p>
        </div>

        {/* feacture 2 */}
        <div className=" flex flex-col items-center">
          <div className="p-4 rounded-full mb-4">
            <HiArrowPathRoundedSquare className="text-xl" />
          </div>
          <h4 className="tracking-tighter mb-2 uppercase">45 Days return</h4>
          <p className="text-gray-600 text-sm tracking-tighter">
            money back guarantee
          </p>
        </div>

        {/* feacture 3 */}
        <div className=" flex flex-col items-center">
          <div className="p-4 rounded-full mb-4">
            <HiOutlineCreditCard className="text-xl" />
          </div>
          <h4 className="tracking-tighter mb-2 uppercase">SECURE CHECKOUT</h4>
          <p className="text-gray-600 text-sm tracking-tighter">
            100% secure checkout procress
          </p>
        </div>
      </div>
    </section>
  );
};

export default FeatucreSection;
