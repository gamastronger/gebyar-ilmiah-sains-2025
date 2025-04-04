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
      <motion.section
        style={{
          backgroundImage: `url(${bgwelcome})`,
          backgroundSize: "cover",
          backgroundPosition: `center ${scrollY * 0.5}px`,
          backgroundRepeat: "no-repeat",
          height: "100vh",
        }}
        className="px-6 py-16 lg:py-24 flex flex-col items-center justify-center overflow-hidden relative"
      >
        {/* Konten */}
        <motion.div
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          className="mt-8 container mx-auto flex flex-col items-center justify-center text-center relative z-10"
        >
          <motion.h1
            className="text-5xl lg:text-8xl text-white font-bold mb-8 leading-tight"
            initial={{ opacity: 0, y: -30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.2, delay: 0.5 }}
          >
            Gebyar Ilmiah Sains
          </motion.h1>
          <motion.p
            className="text-lg lg:text-xl mb-4 lg:mb-8 text-justify text-white px-4 lg:px-8 max-w-3xl"
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
          className="relative z-10"
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

        {/* Efek Animasi Real-Time */}
        <div className="absolute inset-0 z-0 pointer-events-none">
          {/* Lingkaran Cahaya Bergerak */}
          <motion.div
            className="absolute w-48 h-48 bg-purple-500 rounded-full opacity-50 blur-2xl"
            animate={{
              x: [0, 200, -200, 0],
              y: [0, -100, 100, 0],
            }}
            transition={{
              duration: 10,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
          <motion.div
            className="absolute w-32 h-32 bg-blue-500 rounded-full opacity-40 blur-2xl"
            animate={{
              x: [100, -150, 150, -100],
              y: [-50, 100, -100, 50],
            }}
            transition={{
              duration: 8,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
          <motion.div
            className="absolute w-64 h-64 bg-indigo-500 rounded-full opacity-30 blur-3xl"
            animate={{
              x: [-200, 200, -200],
              y: [100, -100, 100],
            }}
            transition={{
              duration: 12,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
        </div>
      </motion.section>
    </div>
  );
};

export default Welcome;
