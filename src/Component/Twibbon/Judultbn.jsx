import { motion } from "framer-motion";
import { useState } from "react";
import foto1 from "../../assets/twibbon peserta.png";
import foto2 from "../../assets/twibbon peserta.png";
import foto3 from "../../assets/twibbon peserta.png";

const TwibbonGallery = () => {
  const [previewImage, setPreviewImage] = useState(null);

  const twibbonData = [
    {
      id: "twibbon",
      title: "Twibbon GIS 2025",
      description: "Gunakan twibbon resmi untuk kompetisi Karya Tulis Ilmiah dan bagikan ke sosial media Anda.",
      images: [foto1, foto2, foto3],
    },
  ];

  return (
    <motion.div
      className="w-full min-h-screen bg-gradient-to-b from-[#210034] to-[#400066] py-20 overflow-hidden"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.7 }}
    >
      <div className="max-w-screen-xl mx-auto px-6">
        {twibbonData.map((twibbon, sectionIndex) => (
          <motion.div
            key={twibbon.id}
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: sectionIndex * 0.2, duration: 0.5 }}
            className="mb-24"
          >
            <div className="text-center mb-10">
              <h3 className="text-3xl font-bold text-white mb-4">{twibbon.title}</h3>
              <p className="text-purple-200 max-w-2xl mx-auto">{twibbon.description}</p>
            </div>
            {/* Gallery */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-8 max-w-4xl mx-auto">
              {twibbon.images.map((image, index) => (
                <div
                  key={`${twibbon.id}-image-${index}`}
                  className="relative group"
                >
                  <div className="absolute -inset-0.5 bg-gradient-to-r from-purple-600 to-pink-500 rounded-2xl opacity-75 group-hover:opacity-100 blur-sm group-hover:blur-md transition-all duration-300" />
                  <div className="relative bg-[#300049] p-1.5 rounded-2xl overflow-hidden">
                    <img
                      src={image}
                      alt={`Twibbon ${twibbon.title} ${index + 1}`}
                      className="w-full aspect-square object-cover rounded-xl transition-all"
                      onError={(e) => {
                        e.target.onerror = null;
                        e.target.src = "https://via.placeholder.com/400?text=Twibbon+Image";
                      }}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end justify-center p-2 sm:p-5 rounded-xl">
                      <button
                        className="bg-white/90 backdrop-blur-sm text-purple-900 px-3 py-2 sm:px-4 sm:py-2 rounded-lg font-medium text-xs sm:text-sm"
                        onClick={() => setPreviewImage(image)}
                      >
                        Pratinjau
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            {/* Download Button */}
            <div className="flex justify-center pt-10">
              <a
                href="https://twibbo.nz/gisfmipaunesa"
                target="_blank"
                rel="noopener noreferrer"
                className="ml-4 bg-white text-purple-800 px-6 py-4 rounded-xl font-semibold shadow-lg shadow-purple-900/20 flex items-center space-x-2 hover:bg-purple-100 transition"
              >
                <span>Download Twibbonize</span>
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 3h7v7m0 0L10 21l-7-7 11-11z" />
                </svg>
              </a>
            </div>
          </motion.div>
        ))}

        {/* How To Use Section */}
        <div className="max-w-3xl mx-auto mt-16 mb-20 bg-[#300049]/30 backdrop-blur-sm p-8 rounded-xl border border-purple-500/20 shadow-lg shadow-purple-900/20">
          <h4 className="text-2xl font-semibold text-white mb-6 flex items-center">
            <svg className="w-6 h-6 mr-2 text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            Cara Menggunakan Twibbon
          </h4>
          <div className="space-y-4 text-purple-100">
            <p>Twibbon merupakan bingkai foto profil untuk menunjukkan dukungan Anda dalam kompetisi.</p>
            <ol className="list-decimal list-inside space-y-2 ml-4">
              <li>Kunjungi halaman kampanye twibbon di <strong>twibbonize.com</strong></li>
              <li>Klik tombol <strong>"Pilih Foto"</strong> atau <strong>"Upload Photo"</strong></li>
              <li>Sesuaikan posisi dan ukuran foto Anda jika diperlukan</li>
              <li>Klik tombol <strong>"Next" / "Selanjutnya"</strong> dan tunggu proses selesai</li>
              <li>Unduh twibbon hasil edit dan salin caption</li>
              <li>Bagikan ke media sosial anda</li>
            </ol>
            <p className="mt-6 text-purple-300 font-medium flex items-center">
              <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 8h10M7 12h4m1 8l-4-4H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-3l-4 4z" />
              </svg>
              Jangan lupa untuk tag akun resmi kami dan gunakan hashtag #GIS2025 #SWC2025 #SC2025 saat membagikan postingan Anda!
            </p>
          </div>
        </div>

        {/* Footer */}
        <div className="mt-20 text-center">
          <p className="text-purple-300 text-sm">
            Unduh, gunakan, dan bagikan twibbon di platform sosial media Anda
          </p>
          <p className="text-purple-400/70 text-sm mt-2">
            © 2025 Panitia Kompetisi Nasional | Hak Cipta Dilindungi
          </p>
        </div>
      </div>

      {/* Modal Preview */}
      {previewImage && (
        <motion.div
          className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={() => setPreviewImage(null)}
        >
          <motion.div
            className="relative w-full max-w-sm md:max-w-md bg-[#300049]/90 p-3 rounded-2xl shadow-2xl border border-purple-500/30"
            initial={{ scale: 0.9, y: 20 }}
            animate={{ scale: 1, y: 0 }}
            exit={{ scale: 0.9, y: 20 }}
            transition={{ type: "spring", damping: 25 }}
            onClick={e => e.stopPropagation()}
          >
            <img
              src={previewImage}
              alt="Preview Twibbon"
              className="w-full rounded-xl"
              onError={e => {
                e.target.onerror = null;
                e.target.src = "https://via.placeholder.com/800?text=Twibbon+Preview";
              }}
            />
            <div className="flex justify-center gap-4 mt-6">
              <button
                className="bg-white text-purple-900 px-6 py-3 rounded-lg font-medium hover:bg-gray-100 transition flex items-center"
                onClick={() => setPreviewImage(null)}
              >
                <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
                Tutup
              </button>
              <a
                href="https://twibbo.nz/gisfmipaunesa"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-gradient-to-r from-purple-600 to-purple-800 text-white px-6 py-3 rounded-lg font-medium flex items-center gap-2 hover:opacity-90 transition"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                </svg>
                Twibbonize
              </a>
            </div>
          </motion.div>
        </motion.div>
      )}
    </motion.div>
  );
};

export default TwibbonGallery;
