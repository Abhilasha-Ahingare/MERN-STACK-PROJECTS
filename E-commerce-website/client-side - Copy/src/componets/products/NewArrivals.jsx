import React, { useEffect, useRef, useState } from "react";
import { FiChevronLeft, FiChevronRight } from "react-icons/fi";
import { Link } from "react-router-dom";

const products = [
  {
    _id: "1",
    name: "stylish jacket",
    price: 120,
    images: [
      {
        url: "https://picsum.photos/500/500?/random=1",
        altText: "stylish jacket",
      },
    ],
  },

  {
    _id: "2",
    name: "stylish jacket",
    price: 120,
    images: [
      {
        url: "https://picsum.photos/500/500?/random=2",
        altText: "stylish jacket",
      },
    ],
  },
  {
    _id: "3",
    name: "stylish jacket",
    price: 120,
    images: [
      {
        url: "https://picsum.photos/500/500?/random=3",
        altText: "stylish jacket",
      },
    ],
  },
  {
    _id: "4",
    name: "stylish jacket",
    price: 120,
    images: [
      {
        url: "https://picsum.photos/500/500?/random=4",
        altText: "stylish jacket",
      },
    ],
  },
  {
    _id: "5",
    name: "stylish jacket",
    price: 120,
    images: [
      {
        url: "https://picsum.photos/500/500?/random=5",
        altText: "stylish jacket",
      },
    ],
  },
  {
    _id: "6",
    name: "stylish jacket",
    price: 120,
    images: [
      {
        url: "https://picsum.photos/500/500?/random=6",
        altText: "stylish jacket",
      },
    ],
  },
  {
    _id: "7",
    name: "stylish jacket",
    price: 120,
    images: [
      {
        url: "https://picsum.photos/500/500?/random=7",
        altText: "stylish jacket",
      },
    ],
  },
  {
    _id: "8",
    name: "stylish jacket",
    price: 120,
    images: [
      {
        url: "https://picsum.photos/500/500?/random=8",
        altText: "stylish jacket",
      },
    ],
  },
];

const NewArrivals = () => {
  const scrollRef = useRef(null);
  const [isDraggin, setIsDraggin] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollLeft, setScrollLeft] = useState(false);
  const [canScrollleft, setCanScrollleft] = useState(false);

  const [canScrollRight, setCanScrollRight] = useState(true);

  const handlerMouseDown = (e) => {
    setIsDraggin(true);
    setStartX(e.pageX - scrollRef.current.offsetLeft);
    setScrollLeft(scrollRef.current.scrollLeft);
  };
  const handlerMouseMove = (e) => {
    if (!isDraggin) return;
    const x = e.pageX - scrollRef.current.offsetLeft;
    const walk = x - startX;
    scrollRef.current.scrollLeft = scrollLeft - walk;
  };

  const handlerMouseUpOrLeave = () => {
    setIsDraggin(false);
  };

  const scroll = (direction) => {
    const scrollAmount = direction === "left" ? -300 : 300;
    scrollRef.current.scrollBy({ left: scrollAmount, behaviour: "smooth" });
  };

  const updateScrollButton = () => {
    const container = scrollRef.current;

    if (container) {
      const leftScroll = container.scrollLeft;
      const rightScrollable =
        container.scrollWidth > leftScroll + container.clientWidth;
      setCanScrollleft(leftScroll > 0);
      setCanScrollRight(rightScrollable);
    }
  };

  useEffect(() => {
    const container = scrollRef.current;
    if (container) {
      container.addEventListener("scroll", updateScrollButton);
      updateScrollButton();
      return () => container.removeEventListener("scroll", updateScrollButton);
    }
  }, []);

  return (
    <section className=" py-16 px-4 lg:px-0">
      <div className=" container mx-auto text-center mb-10 relative">
        <h2 className=" text-3xl font-bold mb-4 uppercase">
          {" "}
          explore new arrivals
        </h2>
        <p className="text-lg text-gray-600 mb-8">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptatem
          veritatis, doloribus eligendi velit asperiores reprehenderit.
        </p>

        {/* scoll button */}
        <div className=" absolute right-0 bottom-[-30px] flex space-x-2">
          <button
            onClick={() => scroll("left")}
            disabled={!canScrollleft}
            className={`p-2 rounded border ${
              canScrollleft
                ? "bg-white text-black"
                : "bg-gray-200 text-gray-400 cursor-not-allowed"
            }`}
          >
            <FiChevronLeft className=" text-2xl " />
          </button>
          <button
            onClick={() => scroll("right")}
            className={`p-2 rounded border ${
              canScrollRight
                ? "bg-white text-black"
                : "bg-gray-200 text-gray-400 cursor-not-allowed"
            }`}
          >
            <FiChevronRight className=" text-2xl " />
          </button>
        </div>
      </div>
      {/* scrollable content */}
      <div
        ref={scrollRef}
        className={` container mx-auto overflow-x-scroll flex space-x-6 relative ${
          isDraggin ? "cursor-grabbing" : " cursor-grab"
        } `}
        onMouseDown={handlerMouseDown}
        onMouseMove={handlerMouseMove}
        onMouseUp={handlerMouseUpOrLeave}
        onMouseLeave={handlerMouseUpOrLeave}
      >
        {products.map((products) => (
          <div
            key={products._id}
            className=" min-w-[100%] sm:min-w-[50%] lg:min-w-[30%]  relative"
          >
            <img
              src={products.images[0]?.url}
              alt={products.images[0]?.altText || products.name}
              className=" w-full h-[500px] object-cover rounded-lg"
              draggable="false"
            />
            <div className=" absolute bottom-0 left-0 right-0 bg-opacity-60 backdrop-blur-md text-white p-4 rounded-b-lg">
              <Link to={`product/${products._id}`} className="block">
                <h4 className="font-medium">{products.name}</h4>
                <p className="mt-1">${products.price}</p>
              </Link>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default NewArrivals;
