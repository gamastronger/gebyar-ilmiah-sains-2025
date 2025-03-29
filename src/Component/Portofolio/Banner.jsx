import React, { useRef, useState } from "react";
import bgwelcome from "../../assets/bgwelcome.png";

const Banner = () => {
  const portfolioItems = [
    {
      id: 1,
      image: "https://via.placeholder.com/300x400",
    },
    {
      id: 2,
      image: "https://via.placeholder.com/300x400",
    },
    {
      id: 3,
      image: "https://via.placeholder.com/300x400",
    },
    {
      id: 4,
      image: "https://via.placeholder.com/300x400",
    },
    {
      id: 5,
      image: "https://via.placeholder.com/300x400",
    },
    {
      id: 6,
      image: "https://via.placeholder.com/300x400",
    },
    {
      id: 7,
      image: "https://via.placeholder.com/300x400",
    },
  ];

  const scrollRef = useRef(null);
  const [hoveredId, setHoveredId] = useState(null); // Track hovered image

  const scrollLeft = () => {
    scrollRef.current.scrollBy({
      left: -300,
      behavior: "smooth",
    });
  };

  const scrollRight = () => {
    scrollRef.current.scrollBy({
      left: 300,
      behavior: "smooth",
    });
  };

  return (
    <section
          className="px-6 py-16 lg:py-10 h-87"
          style={{
            backgroundImage: `url(${bgwelcome})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
            backgroundRepeat: "no-repeat",
          }}
    >
      <h2 className="text-center text-4xl sm:text-5xl font-sans font-bold text-white mb-4 md:mb-8">
        Desain Banner
      </h2>

      <div className="relative">
        {/* Navigation Arrows */}
        <button onClick={scrollLeft} className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-[#03346e] text-white p-2 rounded-full hover:bg-[#021526] transition-all">
          &#10094;
        </button>

        <button onClick={scrollRight} className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-[#03346e] text-white p-2 rounded-full hover:bg-[#021526] transition-all">
          &#10095;
        </button>

        {/* Scrollable container for portfolio items */}
        <div
          ref={scrollRef}
          className="flex overflow-x-auto snap-x snap-mandatory scrollbar-hide space-x-6 p-4"
          style={{ scrollbarWidth: 'none' }} // Hide scrollbar for Firefox
        >
          {portfolioItems.map((item) => (
            <div
              key={item.id}
              className={`snap-center flex-none w-64 md:w-80 h-96 transition-transform duration-300 transform 
              ${hoveredId === item.id ? 'scale-125 z-10' : 'scale-95'} overflow-hidden relative`}
              onMouseEnter={() => setHoveredId(item.id)}
              onMouseLeave={() => setHoveredId(null)}
            >
              <img
                src={item.image}
                alt=""
                className={`w-full h-3/4 object-cover transition-opacity duration-300 ${
                  hoveredId && hoveredId !== item.id ? 'opacity-50' : 'opacity-100'
                }`}
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Banner;
