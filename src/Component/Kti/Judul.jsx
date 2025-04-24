import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import foto4 from '../../assets/gimage.jpeg'; // Ganti dengan path gambar yang sesuai

const DeskripsiLomba = () => {
  const fadeBlur = {
    initial: { opacity: 0, y: 30, filter: 'blur(8px)' },
    animate: { opacity: 1, y: 0, filter: 'blur(0px)', transition: { duration: 0.7, ease: 'easeOut' } },
    exit: { opacity: 0, y: 30, filter: 'blur(8px)', transition: { duration: 0.5 } },
  };

  return (
    <motion.div
      className="w-full bg-[#210034] py-16"
      variants={fadeBlur}
      initial="initial"
      animate="animate"
      exit="exit"
    >
      <div className="max-w-screen-xl mx-auto px-2 lg:px-20">
        <div className="grid grid-cols-1 lg:grid-cols-2 items-center gap-2">
          
          {/* Gambar di sebelah kanan */}
          <motion.div
            className="mt-14 w-full flex flex-col items-center lg:items-start lg:justify-start ml-16"
            initial={{ opacity: 0, scale: 0.95, filter: 'blur(8px)' }}
            animate={{ opacity: 1, scale: 1, filter: 'blur(0px)' }}
            exit={{ opacity: 0, scale: 0.95, filter: 'blur(8px)' }}
            transition={{ duration: 0.7, ease: 'easeOut' }}
          >
            <img
              src={foto4}
              alt="Grafistix Hero"
              className="w-80 h-auto rounded-lg shadow-xl transition-transform duration-300 hover:scale-105 hover:rotate-3"
            />
            <p className="text-white text-lg font-semibold mt-5 bg-[#512DA8] px-4 py-2 rounded-lg shadow-md">
              Rp.100.000/team
            </p>
          </motion.div>

          {/* Teks di sebelah kiri */}
          <motion.div
            className="w-full lg:pr-6 lg-ml-8"
            initial={{ opacity: 0, y: 20, filter: 'blur(8px)' }}
            animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
            exit={{ opacity: 0, y: 20, filter: 'blur(8px)' }}
            transition={{ delay: 0.3, duration: 0.7, ease: 'easeOut' }}
          >
            <h1 className="font-bold text-4xl lg:text-5xl leading-tight mb-6 text-white">
              Karya Tulis Ilmiah
            </h1>
            <p className="text-lg lg:text-xl mb-6 text-justify text-white">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam
              eget felis eget nunc lacinia lacinia. Nullam nec nunc nec
              nunc eget felis eget nunc lacinia lacinia. Nullam nec nunc nec.
            </p>
            <div className="flex flex-row gap-6">
              <Link
                to="/daftar"
                className="bg-purple-700 text-white px-6 py-3 rounded-lg font-semibold hover:scale-105 hover:bg-[#512DA8] transition"
              >
                Daftar
              </Link>
              <Link to="/masuk" className="bg-purple-700 text-white px-6 py-3 rounded-lg font-semibold hover:scale-105 hover:bg-[#512DA8] transition">
                Login
              </Link>
            </div>
          </motion.div>

        </div>
      </div>
    </motion.div>
  );
};

export default DeskripsiLomba;