import { useEffect, useRef, useState } from "react";
import { FiChevronLeft, FiChevronRight } from "react-icons/fi";
import { Link } from "react-router-dom";
import api from "../../utils/api";

const NewArrivals = () => {
  const scrollRef = useRef(null);
  const [isDraggin, setIsDraggin] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollLeft, setScrollLeft] = useState(false);
  const [canScrollleft, setCanScrollleft] = useState(false);
  const [newArrivals, setNewArrivals] = useState([]);
  const [canScrollRight, setCanScrollRight] = useState(true);

  useEffect(() => {
    const fetchNewArrivals = async () => {
      try {
        const response = await api.get("/api/product/new-arrivals");
        // Check if response.data is array, if not wrap it in array
        const products = Array.isArray(response.data)
          ? response.data
          : [response.data];
        setNewArrivals(products);
      } catch (error) {
        console.error("Error fetching new arrivals:", error);
      }
    };

    fetchNewArrivals();
  }, []);

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
    scrollRef.current.scrollBy({ left: scrollAmount, behavior: "smooth" });
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
        {newArrivals.map((products) => (
          <div
            key={products?._id}
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
