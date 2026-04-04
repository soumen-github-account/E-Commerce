import React, { useEffect, useState } from 'react'
import { MdKeyboardArrowLeft, MdKeyboardArrowRight } from "react-icons/md";
import img1 from '../assets/img1.jpg'
import img2 from '../assets/img2.jpg'
import img3 from '../assets/img3.jpg'
import img4 from '../assets/img4.jpg'
import img5 from '../assets/img5.jpg'
import img6 from '../assets/img6.jpg'

const images = [
  img1,
  img2,
  img3,
  img4,
  img5,
  img6
];

const HeaderBanner = ()=>{

      const [currentIndex, setCurrentIndex] = useState(0);
  const [slideDirection, setSlideDirection] = useState("right");

  const nextSlide = () => {
    setSlideDirection("right");
    setCurrentIndex((prev) => (prev + 1) % images.length);
  };

  const prevSlide = () => {
    setSlideDirection("left");
    setCurrentIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1));
  };

  useEffect(() => {
    const interval = setInterval(nextSlide, 4000);
    return () => clearInterval(interval);
  }, []);


  return (
    <div className="w-full mx-auto md:px-9 px-4 relative">

      <div className="relative md:h-[25vw] h-[100px] overflow-hidden md:rounded-2xl rounded-lg shadow-lg">
        {images.map((img, index) => (
          <img
            key={index}
            src={img}
            alt={`Slide ${index + 1}`}
            className={`absolute top-0 left-0 w-full h-full object-cover transition-all duration-700 ease-in-out ${
              index === currentIndex
                ? "opacity-100 translate-x-0 z-10"
                : slideDirection === "right"
                ? "-translate-x-full opacity-0"
                : "translate-x-full opacity-0"
            }`}
          />
        ))}
      </div>
      <button
        onClick={prevSlide}
        className="absolute hidden md:block text-2xl z-10 left-15 top-1/2 -translate-y-1/2 bg-gray-800 text-white p-2 rounded-full hover:bg-gray-700"
      >
        <MdKeyboardArrowLeft />
      </button>

      <button
        onClick={nextSlide}
        className="absolute hidden md:block text-2xl z-10 right-15 top-1/2 -translate-y-1/2 bg-gray-800 text-white p-2 rounded-full hover:bg-gray-700"
      >
        <MdKeyboardArrowRight />
      </button>

      <div className="flex justify-center z-10 items-center gap-2 mt-4 absolute bottom-[10%] left-[50%]">
      {images.map((_, index) => (
        <span
        key={index}
        className={`h-3 w-3 hidden md:block rounded-full cursor-pointer transition-all duration-300 ${
            currentIndex === index
            ? "bg-green-500 scale-110"
            : "bg-gray-400"
        }`}
        onClick={() => {
            setSlideDirection(index > currentIndex ? "right" : "left");
            setCurrentIndex(index);
        }}
        />
    ))}
    </div>

    </div>
  )
}

export default HeaderBanner

