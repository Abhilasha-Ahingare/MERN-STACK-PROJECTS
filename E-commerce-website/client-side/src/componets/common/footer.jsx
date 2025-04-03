import React from "react";
import { Link } from "react-router-dom";
import { TbBrandMeta } from "react-icons/tb";
import { IoLogoInstagram } from "react-icons/io";
import { RiTwitterXFill } from "react-icons/ri";
import { FiPhoneCall } from "react-icons/fi";
const Footer = () => {
  return (
    <footer className="border-t py-12">
      <div className=" container mx-auto grid grid-cols-1 md:grid-cols-4 gap-8 px-4 lg:px-0">
        <div>
          <h3 className=" text-lg text-gray-800 mb-4"> news letter</h3>
          <p className="text-gray-500 mb-4">
            be the first to hear about new products , exclusive events ,and
            online offers.
          </p>
          <p className="font-medium text-sm text-gray-600 mb-6">
            sing up and get 10% off your fisrt order.
          </p>

          {/* news letter from */}
          <form className=" flex">
            <input
              type="email"
              placeholder="enter your email"
              className="p-3 w-full text-sm border-t border-l border-b border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-500 transition-all"
            />

            <button
              type="submit"
              className="bg-black text-white px-6 py-3 text-sm rounded-r-md hover:bg-slate-800 transition-all"
            >
              subscribe
            </button>
          </form>
        </div>
        {/* shop links */}
        <div>
          <h3 className="text-lg text-gray-800 mb-4 uppercase ">shop</h3>
          <ul className="space-y-2 text-gray-600">
            <li>
              <Link
                to="#"
                className=" hover:text-gray-500 transition-colors uppercase"
              >
                men's
              </Link>
            </li>
            <li>
              <Link
                to="#"
                className=" hover:text-gray-500 transition-colors uppercase"
              >
                women's
              </Link>
            </li>
            <li>
              <Link
                to="#"
                className=" hover:text-gray-500 transition-colors uppercase"
              >
                top wear
              </Link>
            </li>
            <li>
              <Link
                to="#"
                className=" hover:text-gray-500 transition-colors uppercase"
              >
                bottom waer
              </Link>
            </li>
          </ul>
        </div>
        {/* support links */}
        <div>
          <h3 className="text-lg text-gray-800 mb-4 uppercase">support</h3>
          <ul className="space-y-2 text-gray-600">
            <li>
              <Link
                to="#"
                className=" hover:text-gray-500 transition-colors uppercase"
              >
                contact us
              </Link>
            </li>
            <li>
              <Link
                to="#"
                className=" hover:text-gray-500 transition-colors uppercase"
              >
                about us
              </Link>
            </li>
            <li>
              <Link
                to="#"
                className=" hover:text-gray-500 transition-colors uppercase"
              >
                FAQ
              </Link>
            </li>
            <li>
              <Link
                to="#"
                className=" hover:text-gray-500 transition-colors uppercase"
              >
                features
              </Link>
            </li>
          </ul>
        </div>
        {/* follo us */}
        <div>
          <h3 className=" text-lg text-gray-800 mb-4 uppercase">follow us</h3>
          <div className="flex items-center space-x-4 md-6">
            <a
              href="https:/www.facebook.com"
              target="_black"
              rel="noopener noreferrer"
              className="hover:text-gray-300"
            >
              <TbBrandMeta className="h-6 w-6" />
            </a>
            <a
              href="https:/www.facebook.com"
              target="_black"
              rel="noopener noreferrer"
              className="hover:text-gray-300"
            >
              <IoLogoInstagram className="h-6 w-6" />
            </a>
            <a
              href="https:/www.facebook.com"
              target="_black"
              rel="noopener noreferrer"
              className="hover:text-gray-300"
            >
              <RiTwitterXFill className="h-4 w-4" />
            </a>
          </div>
          <p className=" text-gray-500 ">call us</p>
          <p>
            <FiPhoneCall className=" inline-block mr-2" />
            0123-456-789
          </p>
        </div>
      </div>
      {/* footer bottom */}
      <div className=" container mx-auto mt-12 px-4 lg:px-0 border-t border-gray-200 pt-6">
        <p className="text-gray-500 text-sm tracking-tighter text-center">
          {" "}
          2020, comiletab. all right reserved
        </p>
      </div>
    </footer>
  );
};

export default Footer;
