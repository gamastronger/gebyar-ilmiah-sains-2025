import { Link } from "react-scroll";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import bgwelcome from "../../assets/bgsementara.jpg";

// Efek Glitch
const GlitchEffect = () => (
  <motion.div
    className="absolute inset-0 z-0 pointer-events-none overflow-hidden"
    animate={{ y: ["-10%", "10%"] }}
    transition={{
      duration: 2,
      repeat: Infinity,
      ease: "easeInOut",
    }}
  >
    <motion.div
      className="absolute top-0 left-0 w-full h-full bg-gradient-to-b from-black/30 to-transparent"
      animate={{ opacity: [0.1, 0.3, 0.1] }}
      transition={{
        duration: 1.5,
        repeat: Infinity,
        ease: "easeInOut",
      }}
    />
  </motion.div>
);

// Variants animasi teks
const wordContainer = {
  hidden: { opacity: 0 },
  visible: (i = 1) => ({
    opacity: 1,
    transition: { staggerChildren: 0.15, delayChildren: 0.5 * i },
  }),
};

const wordItem = {
  hidden: { opacity: 0, y: 20, filter: "blur(4px)" },
  visible: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: {
      ease: "easeOut",
      duration: 0.4,
    },
  },
};

const Welcome = () => {
  const [scrollY, setScrollY] = useState(0);
  const [textAnimFinished, setTextAnimFinished] = useState(false);
  const [shineActive, setShineActive] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Trigger shine setelah animasi teks selesai
  useEffect(() => {
    if (textAnimFinished) {
      setTimeout(() => {
        setShineActive(true);
      }, 300); // jeda kecil setelah animasi selesai
    }
  }, [textAnimFinished]);

  const title = "Gebyar Ilmiah Sains";
  const paragraph =
    "Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolorum odio ex quo dolore sunt labore eligendi repellendus ducimus accusamus?";

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
        className="relative px-6 py-16 lg:py-24 flex flex-col items-center justify-center overflow-hidden"
      >
        <GlitchEffect />

        {/* Angin Keunguan Tipis */}
        <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden">
          <motion.div
            className="absolute top-[-50%] left-0 w-full h-full bg-gradient-to-b from-purple-400/10 via-purple-300/10 to-purple-400/10 blur-2xl"
            animate={{ y: ["-100%", "100%"] }}
            transition={{
              duration: 12,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
        </div>

        {/* Konten Teks */}
        <motion.div className="mt-8 container mx-auto flex flex-col items-center justify-center text-center relative z-10">
          <motion.h1
            className="text-5xl lg:text-8xl text-white font-bold mb-8 leading-tight flex flex-wrap justify-center"
            variants={wordContainer}
            initial="hidden"
            animate="visible"
            onAnimationComplete={() => setTextAnimFinished(true)}
          >
            {title.split(" ").map((word, index) => (
              <motion.span
                key={index}
                variants={wordItem}
                className="relative mx-1 inline-block"
              >
                {word}

                {/* Shine hanya setelah animasi selesai & hanya di kata pertama */}
                {shineActive && index === 0 && (
  <motion.span
    initial={{ 
      left: "-20%", 
      opacity: 0, 
      filter: "blur(6px)" 
    }}
    animate={{ 
      left: "150%", 
      opacity: [0, 1, 0], 
      filter: ["blur(6px)", "blur(0px)", "blur(6px)"] 
    }}
    transition={{
      delay: 1.8, // 🔥 delay sebelum animasi mulai
      duration: 1.8,
      ease: "easeInOut",
    }}
    className="absolute top-0 left-0 w-[180%] h-full bg-gradient-to-r from-transparent via-white/20 to-transparent skew-x-[-20deg] pointer-events-none"
    style={{ zIndex: 10 }}
  />
)}


              </motion.span>
            ))}
          </motion.h1>

          {/* Animasi paragraf per kata */}
          <motion.p
            className="text-lg lg:text-xl mb-4 lg:mb-8 text-justify text-white px-4 lg:px-8 max-w-3xl flex flex-wrap justify-center"
            variants={wordContainer}
            initial="hidden"
            animate="visible"
            custom={2}
          >
            {paragraph.split(" ").map((word, index) => (
              <motion.span
                key={index}
                variants={wordItem}
                className="mx-[2px] inline-block"
              >
                {word}
              </motion.span>
            ))}
          </motion.p>
        </motion.div>

        {/* Scroll Down Button */}
        <motion.div
          initial={{ y: -30, opacity: 0, filter: "blur(4px)" }}
          animate={{ y: 0, opacity: 1, filter: "blur(0px)" }}
          transition={{ duration: 1, delay: 3.5, ease: "easeOut" }}
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
      </motion.section>
    </div>
  );
};

export default Welcome;
