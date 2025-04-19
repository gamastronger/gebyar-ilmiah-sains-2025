import { motion } from "framer-motion";
import foto1 from "../../assets/gimage.jpeg";
import foto2 from "../../assets/gimage.jpeg";
import foto3 from "../../assets/gimage.jpeg";
import foto4 from "../../assets/gimage.jpeg";
import foto5 from "../../assets/gimage.jpeg";
import foto6 from "../../assets/gimage.jpeg";

const DeskripsiLomba = () => {
  const fadeBlurUp = {
    hidden: { opacity: 0, y: 30, filter: "blur(8px)" },
    visible: (i = 0) => ({
      opacity: 1,
      y: 0,
      filter: "blur(0px)",
      transition: {
        delay: i * 0.2,
        duration: 0.6,
        ease: "easeOut",
      },
    }),
    exit: { opacity: 0, y: 30, filter: "blur(8px)", transition: { duration: 0.5 } },
  };

  return (
    <motion.div
      className="w-full bg-[#210034] py-16"
      initial="hidden"
      animate="visible"
      exit="exit"
      variants={fadeBlurUp}
    >
      <div className="max-w-screen-xl mx-auto px-4 text-center">

        {/* Judul Twibbon KTI */}
        <motion.h1
          className="mt-5 text-white text-4xl font-bold mb-10"
          variants={fadeBlurUp}
          custom={0}
        >
          Twibbon KTI
        </motion.h1>

        {/* Gambar-gambar Twibbon KTI */}
        <motion.div
          className="flex flex-col items-center gap-6 md:flex-row md:justify-center md:gap-10 mb-8"
          variants={fadeBlurUp}
          custom={0.2}
        >
          {[foto1, foto2, foto3].map((foto, index) => (
            <motion.img
              key={index}
              src={foto}
              alt={`Twibbon ${index + 1}`}
              className={`object-cover rounded-2xl shadow-lg hover:scale-105 transition
                ${index === 1 ? 'w-72 h-72' : 'w-60 h-60'}`}
              initial={{ opacity: 0, scale: 0.95, filter: "blur(8px)" }}
              animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
              exit={{ opacity: 0, scale: 0.95, filter: "blur(8px)" }}
              transition={{ delay: 0.4 + index * 0.2, duration: 0.5, ease: "easeOut" }}
            />
          ))}
        </motion.div>

        {/* Tombol Download Twibbon KTI */}
        <motion.button
          className="bg-purple-700 hover:bg-purple-600 text-white px-6 py-3 rounded-lg font-semibold transition"
          variants={fadeBlurUp}
          custom={0.8}
        >
          Download Twibbon
        </motion.button>

        {/* Judul Twibbon CBT */}
        <motion.h1
          className="mt-10 text-white text-4xl font-bold mb-10"
          variants={fadeBlurUp}
          custom={1}
        >
          Twibbon CBT
        </motion.h1>

        {/* Gambar-gambar Twibbon CBT */}
        <motion.div
          className="flex flex-col items-center gap-6 md:flex-row md:justify-center md:gap-10 mb-8"
          variants={fadeBlurUp}
          custom={1.2}
        >
          {[foto4, foto5, foto6].map((foto, index) => (
            <motion.img
              key={index}
              src={foto}
              alt={`Twibbon ${index + 1}`}
              className={`object-cover rounded-2xl shadow-lg hover:scale-105 transition
                ${index === 1 ? 'w-72 h-72' : 'w-60 h-60'}`}
              initial={{ opacity: 0, scale: 0.95, filter: "blur(8px)" }}
              animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
              exit={{ opacity: 0, scale: 0.95, filter: "blur(8px)" }}
              transition={{ delay: 1.3 + index * 0.2, duration: 0.5, ease: "easeOut" }}
            />
          ))}
        </motion.div>

        {/* Tombol Download Twibbon CBT */}
        <motion.button
          className="bg-purple-700 hover:bg-purple-600 text-white px-6 py-3 rounded-lg font-semibold transition"
          variants={fadeBlurUp}
          custom={1.8}
        >
          Download Twibbon
        </motion.button>
      </div>
    </motion.div>
  );
};

export default DeskripsiLomba;
