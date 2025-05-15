import { motion } from "framer-motion";
import { useState } from "react";

const FAQ = () => {
  const faqs = [
    // {
    //   question: "Apakah mahasiswa dari luar Universitas Negeri Surabaya dapat mengikuti lomba?",
    //   answer: "Ya, seluruh mahasiswa aktif dari berbagai perguruan tinggi di Indonesia dapat mengikuti lomba GIS Unesa 2025."
    // },
    // {
    //   question: "Berapa biaya pendaftaran untuk mengikuti lomba?",
    //   answer: "Biaya pendaftaran untuk lomba KTI adalah Rp 150.000/tim dan untuk Olimpiade CBT adalah Rp 100.000/orang."
    // },
    // {
    //   question: "Bagaimana cara mendaftar lomba GIS Unesa 2025?",
    //   answer: "Pendaftaran dapat dilakukan secara online melalui website resmi GIS Unesa 2025 dengan mengisi formulir yang tersedia."
    // },
    // {
    //   question: "Apakah ada hadiah untuk pemenang lomba?",
    //   answer: "Tentu saja! Setiap kategori lomba menyediakan hadiah berupa uang tunai, sertifikat, dan berbagai hadiah menarik lainnya."
    // },
    // {
    //   question: "Kapan pengumuman pemenang lomba?",
    //   answer: "Pengumuman pemenang akan dilaksanakan pada tanggal 30 Juni 2025 melalui website dan media sosial resmi GIS Unesa."
    // },
    // {
    //   question: "Siapa yang dapat saya hubungi jika ada pertanyaan lebih lanjut?",
    //   answer: "Anda dapat menghubungi contact person yang tertera pada website atau melalui email di gisunesa2025@unesa.ac.id"
    // }
  ];

  const [openIndex, setOpenIndex] = useState(null);

  const toggleFAQ = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <motion.div
      id="faq"
      className="max-w-screen-xl mx-auto px-6 mb-32"
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
    >
      <div className="text-center mb-16">
        
        <h2 className="mt-12 text-4xl md:text-5xl font-bold text-white mb-6 bg-clip-text text-transparent bg-gradient-to-r from-purple-200 to-purple-400">
          Buku Panduan
        </h2>
        <h5 className="md-4 text-purple-300 font-medium tracking-wider uppercase mb-3">
          Lihat buku panduan untuk informasi lebih lanjut
        </h5>
        <div className="h-1 w-24 bg-gradient-to-r from-purple-500 to-pink-500 mx-auto rounded-full"></div>
      </div>

      <div className="max-w-3xl mx-auto">
        {faqs.map((faq, index) => (
          <motion.div
            key={index}
            className={`mb-4 bg-[#300049]/40 backdrop-blur-md rounded-xl border border-purple-500/20 overflow-hidden ${
              openIndex === index ? "shadow-lg shadow-purple-900/20" : ""
            }`}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
          >
            <motion.button
              className="w-full text-left p-6 flex justify-between items-center transition-all duration-300 hover:bg-purple-800/10"
              onClick={() => toggleFAQ(index)}
              whileHover={{ backgroundColor: "rgba(107, 33, 168, 0.1)" }}
              whileTap={{ scale: 0.995 }}
            >
              <h3 className="text-xl font-bold text-white pr-8">{faq.question}</h3>
              <motion.div
                className="text-purple-300 flex-shrink-0"
                animate={{ rotate: openIndex === index ? 180 : 0 }}
                transition={{ duration: 0.3 }}
              >
                <svg 
                  width="24" 
                  height="24" 
                  viewBox="0 0 24 24" 
                  fill="none" 
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path 
                    d="M19 9L12 16L5 9" 
                    stroke="currentColor" 
                    strokeWidth="2" 
                    strokeLinecap="round" 
                    strokeLinejoin="round" 
                  />
                </svg>
              </motion.div>
            </motion.button>
            <motion.div
              className="overflow-hidden"
              initial={false}
              animate={{ 
                height: openIndex === index ? "auto" : 0,
                opacity: openIndex === index ? 1 : 0
              }}
              transition={{ duration: 0.3, ease: "easeInOut" }}
            >
              <div className="p-6 pt-0 border-t border-purple-500/10">
                <p className="text-purple-200">{faq.answer}</p>
              </div>
            </motion.div>
          </motion.div>
        ))}
      </div>

      <motion.div 
        className="mt-16 text-center" // Changed from mt-12 and removed space-y-6
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ delay: 0.5 }}
      >
        <div className="flex flex-col items-center space-y-6"> {/* Changed from gap-4 to space-y-6 */}
          {/* Download Button */}
          <a 
            href="https://unesa.me/BukuPanduan13thGIS"  
            target="_blank" 
            rel="noopener noreferrer"
            className="inline-flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-[#31004d] to-[#A78BFA] text-white rounded-full font-medium hover:shadow-lg hover:-translate-y-0.5 transition-all duration-300"
          >
            {/* Google Drive Icon */}
            <svg 
              className="w-5 h-5" 
              viewBox="0 0 87.3 78"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fill="currentColor"
                d="m6.6 66.85 3.85 6.65c.8 1.4 1.95 2.5 3.3 3.3l13.75-23.8h-27.5c0 1.55.4 3.1 1.2 4.5z"
              />
              <path
                fill="currentColor"
                d="m43.65 25-13.75-23.8c-1.35.8-2.5 1.9-3.3 3.3l-25.4 44a9.06 9.06 0 0 0 -1.2 4.5h27.5z"
              />
              <path
                fill="currentColor"
                d="m73.55 76.8c1.35-.8 2.5-1.9 3.3-3.3l1.6-2.75 7.65-13.25c.8-1.4 1.2-2.95 1.2-4.5h-27.502l5.852 11.5z"
              />
              <path
                fill="currentColor"
                d="m43.65 25 13.75-23.8c-1.35-.8-2.9-1.2-4.5-1.2h-18.5c-1.6 0-3.15.45-4.5 1.2z"
              />
              <path
                fill="currentColor"
                d="m59.8 53h27.5c0-1.55-.4-3.1-1.2-4.5l-25.4-44c-.8-1.4-1.95-2.5-3.3-3.3l-13.75 23.8z"
              />
            </svg>
            <span className="text-base">Download Guidebook</span>
          </a>


        </div>
      </motion.div>
    </motion.div>
  );
};

export default FAQ;