import { Link } from "react-scroll";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import bgwelcome from "../../assets/bgsementara.jpg";


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
      <section
        className="px-6 py-16 lg:py-24 flex flex-col items-center justify-center overflow-hidden"
        style={{
          backgroundImage: `url(${bgwelcome})`,
          backgroundSize: "cover",
          backgroundPosition: `center ${scrollY * 0.5}px`,
          backgroundRepeat: "no-repeat",
          height: "100vh",
        }}
      >
        <motion.div 
          initial={{ opacity: 0, y: -50 }} 
          animate={{ opacity: 1, y: 0 }} 
          transition={{ duration: 1 }}
          className="container mx-auto flex flex-col items-center justify-center text-center"
        >
          <motion.h1
            className="text-5xl lg:text-7xl text-white font-bold mb-8 leading-tight"
            initial={{ opacity: 0, y: -30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.2, delay: 0.5 }}
          >
            Gebyar Ilmiah Sains
          </motion.h1>
          <motion.p
            className="text-lg lg:text-l mb-4 lg:mb-8 text-justify text-white" // Kurangi margin bawah menjadi mb-4"
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1.2, delay: 0.8 }}
          >
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolorum odio ex quo dolore sunt labore eligendi repellendus ducimus accusamus?
          </motion.p>
        </motion.div>

        {/* Scroll Down Button */}
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ repeat: Infinity, duration: 1.5, ease: "easeInOut" }}
        >
          <Link
            to="deskripsi"
            smooth={true}
            duration={800}
            className="cursor-pointer flex flex-col items-center"
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
        </motion.div>
      </section>
    </div>
  );
};

export default Welcome;
