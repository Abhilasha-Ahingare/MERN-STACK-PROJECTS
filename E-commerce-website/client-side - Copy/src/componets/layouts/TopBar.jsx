import React from "react";
import { TbMathGreater } from "react-icons/tb";
import { PiLessThan } from "react-icons/pi";

const TopBar = () => {
  return (
    <div className="bg-[#3f201a] text-white h-12">
      <div className="container mx-auto h-full flex items-center justify-center px-4">
        <div className="text-area text-fuchsia-100 flex items-center space-x-2">
          <PiLessThan/>
          <p className="text-center text-[1.25rem]">hello guys kaise ho</p>
          <TbMathGreater />
        </div>
      </div>
    </div>
  );
};

export default TopBar;
