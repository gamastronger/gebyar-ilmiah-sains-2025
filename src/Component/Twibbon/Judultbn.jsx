import { motion } from "framer-motion";
import { useState } from "react";
import foto1 from "../../assets/twibbon peserta.png";
import foto2 from "../../assets/twibbon peserta.png";
import foto3 from "../../assets/twibbon peserta.png";
import foto4 from "../../assets/twibbon peserta.png";
import foto5 from "../../assets/twibbon peserta.png";
import foto6 from "../../assets/twibbon peserta.png";

const TwibbonGallery = () => {
  const [previewImage, setPreviewImage] = useState(null);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.3,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30, filter: "blur(5px)" },
    visible: {
      opacity: 1,
      y: 0,
      filter: "blur(0px)",
      transition: { duration: 0.7, ease: [0.25, 0.1, 0.25, 1.0] },
    },
  };

  const headingVariants = {
    hidden: { opacity: 0, y: -20, filter: "blur(5px)" },
    visible: {
      opacity: 1,
      y: 0,
      filter: "blur(0px)",
      transition: { duration: 0.8, ease: [0.25, 0.1, 0.25, 1.0] },
    },
  };

  const buttonVariants = {
    hover: {
      scale: 1.05,
      boxShadow: "0 10px 15px -3px rgba(109, 40, 217, 0.3)",
      transition: { duration: 0.2 },
    },
    tap: { scale: 0.98 },
  };

  const twibbonData = [
    {
      id: "kti",
      title: "Karya Tulis Ilmiah",
      description: "Gunakan twibbon resmi untuk kompetisi Karya Tulis Ilmiah dan bagikan ke sosial media Anda.",
      images: [foto1, foto2, foto3],
      downloadUrl: "/download/twibbon-kti.zip",
    },
    {
      id: "cbt",
      title: "Tryout CBT",
      description: "Gunakan twibbon resmi untuk Tryout CBT dan bagikan ke sosial media Anda.",
      images: [foto4, foto5, foto6],
      downloadUrl: "/download/twibbon-cbt.zip",
    },
  ];

  const handlePreview = (image) => {
    setPreviewImage(image);
  };

  const closePreview = () => {
    setPreviewImage(null);
  };

  const handleDownload = (url) => {
    const link = document.createElement("a");
    link.href = url;
    link.download = url.split("/").pop();
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const downloadImage = (image, twibbonId) => {
    const link = document.createElement("a");
    link.href = image;
    link.download = `twibbon-${twibbonId}-${Date.now()}.jpeg`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <motion.div
      className="w-full min-h-screen bg-gradient-to-b from-[#210034] to-[#400066] py-20 overflow-hidden"
      initial="hidden"
      animate="visible"
      variants={containerVariants}
    >
      <div className="max-w-screen-xl mx-auto px-6">
        {/* Heading */}
        {/* <motion.div className="text-center mb-16" variants={headingVariants}>
          <h5 className="text-purple-300 font-medium tracking-wider uppercase mb-3">Galeri Twibbon</h5>
          <h2 className="text-5xl font-bold text-white mb-6 bg-clip-text text-transparent bg-gradient-to-r from-purple-200 to-purple-400">
            Twibbon Resmi Kompetisi
          </h2>
          <p className="text-purple-100 max-w-2xl mx-auto text-lg">
            Unduh twibbon resmi untuk menunjukkan dukungan dan partisipasi Anda dalam kompetisi kami.
          </p>
        </motion.div> */}

        {/* Both Twibbon Sections */}
        {twibbonData.map((twibbon, sectionIndex) => (
          <motion.div
            key={twibbon.id}
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: sectionIndex * 0.2, duration: 0.5 }}
            className="mb-24"
          >
            {/* Section Divider - except for first section */}
            {sectionIndex > 0 && (
              <motion.div 
                className="max-w-4xl mx-auto mb-16"
                initial={{ opacity: 0, scaleX: 0 }}
                animate={{ opacity: 1, scaleX: 1 }}
                transition={{ duration: 0.8 }}
              >
                <div className="h-px bg-gradient-to-r from-transparent via-purple-500/50 to-transparent"></div>
              </motion.div>
            )}

            {/* Section Content */}
            <motion.div className="space-y-12">
              {/* Description */}
              <motion.div 
                className="text-center mb-10"
                variants={itemVariants}
                initial="hidden"
                animate="visible"
                transition={{ delay: 0.1 }}
              >
                <h3 className="text-3xl font-bold text-white mb-4">{twibbon.title}</h3>
                <p className="text-purple-200 max-w-2xl mx-auto">{twibbon.description}</p>
              </motion.div>

              {/* Gallery */}
              <motion.div 
                className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto" 
                variants={itemVariants}
              >
                {twibbon.images.map((image, index) => (
                  <motion.div
                    key={`${twibbon.id}-image-${index}`}
                    className="relative group"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0, transition: { delay: index * 0.1 + 0.2, duration: 0.4 } }}
                    whileHover={{ scale: 1.02, transition: { duration: 0.3 } }}
                  >
                    <motion.div className="absolute -inset-0.5 bg-gradient-to-r from-purple-600 to-pink-500 rounded-2xl opacity-75 group-hover:opacity-100 blur-sm group-hover:blur-md transition-all duration-300" />
                    <motion.div className="relative bg-[#300049] p-1.5 rounded-2xl overflow-hidden">
                      <motion.img
                        src={image}
                        alt={`Twibbon ${twibbon.title} ${index + 1}`}
                        className="w-full aspect-square object-cover rounded-xl transition-all"
                        onError={(e) => {
                          e.target.onerror = null;
                          e.target.src = "https://via.placeholder.com/400?text=Twibbon+Image";
                        }}
                      />
                      <motion.div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end justify-center p-5 rounded-xl">
                        <motion.button
                          className="bg-white/90 backdrop-blur-sm text-purple-900 px-4 py-2 rounded-lg font-medium text-sm"
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.98 }}
                          onClick={() => handlePreview(image)}
                        >
                          Pratinjau
                        </motion.button>
                      </motion.div>
                    </motion.div>
                  </motion.div>
                ))}
              </motion.div>

              {/* Download Button */}
              <motion.div className="flex justify-center pt-10" variants={itemVariants}>
                <motion.button
                  className="bg-gradient-to-r from-purple-600 to-purple-800 text-white px-8 py-4 rounded-xl font-semibold shadow-lg shadow-purple-900/30 flex items-center space-x-2 hover:shadow-purple-900/50"
                  variants={buttonVariants}
                  whileHover="hover"
                  whileTap="tap"
                  onClick={() => handleDownload(twibbon.downloadUrl)}
                >
                  <span>Download Twibbon {twibbon.title}</span>
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                  </svg>
                </motion.button>
              </motion.div>
            </motion.div>
          </motion.div>
        ))}

        {/* Single How To Use Section */}
        <motion.div 
          className="max-w-3xl mx-auto mt-16 mb-20 bg-[#300049]/30 backdrop-blur-sm p-8 rounded-xl border border-purple-500/20 shadow-lg shadow-purple-900/20" 
          variants={itemVariants}
        >
          <h4 className="text-2xl font-semibold text-white mb-6 flex items-center">
            <svg className="w-6 h-6 mr-2 text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            Cara Menggunakan Twibbon
          </h4>
          <div className="space-y-4 text-purple-100">
            <p>Twibbon merupakan bingkai foto profil untuk menunjukkan dukungan Anda dalam kompetisi.</p>
            <ol className="list-decimal list-inside space-y-2 ml-4">
              <li>Unduh twibbon yang Anda inginkan dari galeri di atas</li>
              <li>Siapkan foto Anda dengan format persegi (1:1)</li>
              <li>Gunakan aplikasi edit foto seperti Canva, Photoshop, atau PicsArt</li>
              <li>Masukkan foto Anda sebagai lapisan dasar</li>
              <li>Tambahkan twibbon sebagai lapisan atas</li>
              <li>Sesuaikan ukuran dan posisi jika diperlukan</li>
              <li>Simpan dan bagikan ke media sosial Anda</li>
            </ol>
            <p className="mt-6 text-purple-300 font-medium flex items-center">
              <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 8h10M7 12h4m1 8l-4-4H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-3l-4 4z" />
              </svg>
              Jangan lupa untuk tag akun resmi kami dan gunakan hashtag #KTI2025 #CBT2025 saat membagikan postingan Anda!
            </p>
          </div>
        </motion.div>

        {/* Footer */}
        <motion.div className="mt-20 text-center" variants={itemVariants}>
          <p className="text-purple-300 text-sm">
            Unduh, gunakan, dan bagikan twibbon di platform sosial media Anda
          </p>
          <p className="text-purple-400/70 text-sm mt-2">
            © 2025 Panitia Kompetisi Nasional | Hak Cipta Dilindungi
          </p>
        </motion.div>
      </div>

      {/* Modal Preview */}
      {previewImage && (
        <motion.div
          className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={closePreview}
        >
          <motion.div
            className="relative max-w-4xl w-full bg-[#300049]/90 p-4 rounded-2xl shadow-2xl border border-purple-500/30"
            initial={{ scale: 0.9, y: 20 }}
            animate={{ scale: 1, y: 0 }}
            exit={{ scale: 0.9, y: 20 }}
            transition={{ type: "spring", damping: 25 }}
            onClick={(e) => e.stopPropagation()}
          >
            <img
              src={previewImage}
              alt="Preview Twibbon"
              className="w-full rounded-xl"
              onError={(e) => {
                e.target.onerror = null;
                e.target.src = "https://via.placeholder.com/800?text=Twibbon+Preview";
              }}
            />
            <motion.div
              className="absolute top-0 left-0 right-0 bg-gradient-to-b from-black/50 to-transparent p-6 rounded-t-xl"
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
            >
              <h3 className="text-white text-xl font-medium">
                Twibbon Preview
              </h3>
            </motion.div>
            <div className="flex justify-center gap-4 mt-6">
              <button
                className="bg-white text-purple-900 px-6 py-3 rounded-lg font-medium hover:bg-gray-100 transition flex items-center"
                onClick={closePreview}
              >
                <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
                Tutup
              </button>
              <button
                className="bg-gradient-to-r from-purple-600 to-purple-800 text-white px-6 py-3 rounded-lg font-medium flex items-center gap-2 hover:opacity-90 transition"
                onClick={() => downloadImage(previewImage, "download")}
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                </svg>
                Download
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </motion.div>
  );
};

export default TwibbonGallery;
