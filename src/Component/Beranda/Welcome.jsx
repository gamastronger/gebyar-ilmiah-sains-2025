import { Link } from "react-scroll";
<<<<<<< HEAD
import { useEffect, useState, useRef } from "react";
import { motion, useAnimation } from "framer-motion";
import bgwelcome from "../../assets/bgsementara.jpg";

// Enhanced Glitch Effect
=======
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import bgwelcome from "../../assets/bgsementara.jpg";

// Efek Glitch
>>>>>>> origin/syita
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
<<<<<<< HEAD
    {/* Additional glitch line effects */}
    <motion.div 
      className="absolute h-px w-full bg-white/20 top-1/4 left-0"
      animate={{ 
        scaleX: [0, 1, 0],
        opacity: [0, 0.6, 0],
        x: ["-100%", "100%"]
      }}
      transition={{
        duration: 4,
        repeat: Infinity,
        ease: "easeInOut",
        repeatDelay: 3
      }}
    />
    <motion.div 
      className="absolute h-px w-full bg-purple-300/30 top-3/4 left-0"
      animate={{ 
        scaleX: [0, 1, 0],
        opacity: [0, 0.6, 0],
        x: ["100%", "-100%"]
      }}
      transition={{
        duration: 5,
        repeat: Infinity,
        ease: "easeInOut",
        repeatDelay: 2
      }}
    />
  </motion.div>
);

// Text animation variants
=======
  </motion.div>
);

// Variants animasi teks
>>>>>>> origin/syita
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

<<<<<<< HEAD
// Particle animation for background ambience
const Particles = () => {
  const count = 20;
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none z-1">
      {[...Array(count)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute w-1 h-1 bg-white rounded-full"
          style={{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
          }}
          animate={{
            y: [0, Math.random() * -100 - 50],
            opacity: [0, 0.8, 0],
            scale: [0, Math.random() * 0.5 + 0.5, 0],
          }}
          transition={{
            duration: Math.random() * 3 + 4,
            repeat: Infinity,
            delay: Math.random() * 5,
            ease: "easeInOut",
          }}
        />
      ))}
    </div>
  );
};

=======
>>>>>>> origin/syita
const Welcome = () => {
  const [scrollY, setScrollY] = useState(0);
  const [textAnimFinished, setTextAnimFinished] = useState(false);
  const [shineActive, setShineActive] = useState(false);
<<<<<<< HEAD
  const controls = useAnimation();
  const sectionRef = useRef(null);

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
      
      // Parallax effect for content based on scroll
      if (sectionRef.current) {
        const sectionTop = sectionRef.current.offsetTop;
        const sectionHeight = sectionRef.current.offsetHeight;
        const scrollPosition = window.scrollY;
        
        // Calculate scroll percentage within section
        if (scrollPosition > sectionTop - window.innerHeight && 
            scrollPosition < sectionTop + sectionHeight) {
          const scrollPercentage = (scrollPosition - (sectionTop - window.innerHeight)) / 
                                (sectionHeight + window.innerHeight);
          
          // Apply subtle content movement based on scroll
          controls.start({ 
            y: scrollPercentage * -30, 
            opacity: 1 - scrollPercentage * 0.3 
          });
        }
      }
    };
    
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [controls]);

  // Trigger shine after text animation completes
=======

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Trigger shine setelah animasi teks selesai
>>>>>>> origin/syita
  useEffect(() => {
    if (textAnimFinished) {
      setTimeout(() => {
        setShineActive(true);
<<<<<<< HEAD
      }, 300);
=======
      }, 300); // jeda kecil setelah animasi selesai
>>>>>>> origin/syita
    }
  }, [textAnimFinished]);

  const title = "Gebyar Ilmiah Sains";
<<<<<<< HEAD
  const subtitle = "2025";
  const paragraph =
    "Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolorum odio ex quo dolore sunt labore eligendi repellendus ducimus accusamus? Tempora ea voluptas cum veritatis dignissimos.";

  return (
    <div ref={sectionRef}>
      <motion.section
        style={{
          backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.7)), url(${bgwelcome})`,
=======
  const paragraph =
    "Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolorum odio ex quo dolore sunt labore eligendi repellendus ducimus accusamus?";

  return (
    <div>
      <motion.section
        style={{
          backgroundImage: `url(${bgwelcome})`,
>>>>>>> origin/syita
          backgroundSize: "cover",
          backgroundPosition: `center ${scrollY * 0.5}px`,
          backgroundRepeat: "no-repeat",
          height: "100vh",
        }}
        className="relative px-6 py-16 lg:py-24 flex flex-col items-center justify-center overflow-hidden"
      >
        <GlitchEffect />
<<<<<<< HEAD
        <Particles />

        {/* Purple Wind Effect */}
=======

        {/* Angin Keunguan Tipis */}
>>>>>>> origin/syita
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

<<<<<<< HEAD
        {/* Content */}
        <motion.div 
          className="mt-8 container mx-auto flex flex-col items-center justify-center text-center relative z-10"
          animate={controls}
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8 }}
            className="mb-6"
          >
            <div className="mt-14 w-16 h-1 bg-purple-500 mx-auto mb-2" />
          </motion.div>

          <motion.h1
            className="text-5xl lg:text-8xl text-white font-bold mb-2 leading-tight flex flex-wrap justify-center"
=======
        {/* Konten Teks */}
        <motion.div className="mt-8 container mx-auto flex flex-col items-center justify-center text-center relative z-10">
          <motion.h1
            className="text-5xl lg:text-8xl text-white font-bold mb-8 leading-tight flex flex-wrap justify-center"
>>>>>>> origin/syita
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

<<<<<<< HEAD
                {/* Shine effect */}
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
                      delay: 1.8,
                      duration: 1.8,
                      ease: "easeInOut",
                    }}
                    className="absolute top-0 left-0 w-[180%] h-full bg-gradient-to-r from-transparent via-white/20 to-transparent skew-x-[-20deg] pointer-events-none"
                    style={{ zIndex: 10 }}
                  />
                )}
=======
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


>>>>>>> origin/syita
              </motion.span>
            ))}
          </motion.h1>

<<<<<<< HEAD
          {/* Subtitle */}
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 2.5 }}
            className="mb-8"
          >
            <span className="text-3xl lg:text-5xl text-purple-300 font-bold tracking-widest">{subtitle}</span>
          </motion.div>

          {/* Animated paragraph */}
          <motion.div className="relative max-w-3xl mx-auto mb-12">
            <motion.div 
              className="absolute -left-4 top-0 w-1 h-full bg-gradient-to-b from-purple-500 to-transparent"
              initial={{ scaleY: 0 }}
              animate={{ scaleY: 1 }}
              transition={{ duration: 1, delay: 3 }}
            />
            
            <motion.p
              className="text-lg lg:text-xl text-gray-200 px-4 lg:px-8 leading-relaxed"
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
            
            <motion.div 
              className="absolute -right-4 top-0 w-1 h-full bg-gradient-to-b from-transparent to-purple-500"
              initial={{ scaleY: 0 }}
              animate={{ scaleY: 1 }}
              transition={{ duration: 1, delay: 3 }}
            />
          </motion.div>

          {/* CTA Button */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 3.8 }}
            className="mb-12"
          >
            
          </motion.div>
=======
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
>>>>>>> origin/syita
        </motion.div>

        {/* Scroll Down Button */}
        <motion.div
          initial={{ y: -30, opacity: 0, filter: "blur(4px)" }}
          animate={{ y: 0, opacity: 1, filter: "blur(0px)" }}
          transition={{ duration: 1, delay: 3.5, ease: "easeOut" }}
<<<<<<< HEAD
          className="relative z-10 absolute bottom-8"
=======
          className="relative z-10"
>>>>>>> origin/syita
        >
          <Link
            to="deskripsi"
            smooth={true}
            duration={800}
<<<<<<< HEAD
            className="cursor-pointer flex flex-col items-center group"
          >
            <span className="text-white text-sm font-medium uppercase tracking-widest mb-2">Scroll Down</span>
            <motion.div
              className="w-8 h-8 flex items-center justify-center border border-white/30 rounded-full"
              animate={{ y: [0, 5, 0] }}
              transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
            >
              <svg
                className="w-4 h-4 text-white group-hover:text-purple-300 transition-colors duration-300"
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
            </motion.div>
=======
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
>>>>>>> origin/syita
          </Link>
        </motion.div>
      </motion.section>
    </div>
  );
};

<<<<<<< HEAD
export default Welcome;
=======
export default Welcome;
>>>>>>> origin/syita
