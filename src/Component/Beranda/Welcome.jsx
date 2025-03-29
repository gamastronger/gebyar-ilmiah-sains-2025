import { Link } from "react-scroll";
import bgwelcome from "../../assets/bgsementara.jpg";
import { useEffect, useState } from "react";

const Welcome = () => {
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <div>
      {/* Welcome Section */}
      <section
        className="px-6 py-16 lg:py-24 flex flex-col items-center justify-center"
        style={{
          backgroundImage: `url(${bgwelcome})`,
          backgroundSize: "cover",
          backgroundPosition: `center ${scrollY * 0.5}px`, // Parallax effect
          backgroundRepeat: "no-repeat",
          height: "100vh",
        }}
      >
        <div className="container mx-auto flex flex-col items-center justify-center text-center">
          {/* Text Section */}
          <div className="mt-16 lg:w-2/3">
            <h1 className="text-5xl lg:text-7xl text-white font-bold mb-8 leading-tight">
              Gebyar Ilmiah Sains
            </h1>
            <p className="text-base lg:text-xl text-slate-300 mb-8 leading-relaxed">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolorum
              odio ex quo dolore sunt labore eligendi repellendus ducimus
              accusamus? Omnis qui mollitia placeat beatae ipsam ea suscipit
              porro rem minima.
            </p>
          </div>

          {/* Scroll Down Button */}
          <Link
            to="deskripsi" // Mengarah ke ID "deskripsi" di komponen Deskripsi
            smooth={true}
            duration={800}
            className="cursor-pointer flex flex-col items-center animate-bounce"
          >
            <span className="text-white text-lg font-semibold">Scroll Down</span>
            <svg
              className="w-8 h-8 text-white mt-2"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M19 9l-7 7-7-7"
              ></path>
            </svg>
          </Link>
        </div>
      </section>
    </div>
  );
};

export default Welcome;