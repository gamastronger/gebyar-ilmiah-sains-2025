import { motion } from "framer-motion";
import { useState } from "react";

const FAQ = () => {
  const faqs = [
    {
      question: "Apakah mahasiswa dari luar Universitas Negeri Surabaya dapat mengikuti lomba?",
      answer: "Ya, seluruh mahasiswa aktif dari berbagai perguruan tinggi di Indonesia dapat mengikuti lomba GIS Unesa 2025."
    },
    {
      question: "Berapa biaya pendaftaran untuk mengikuti lomba?",
      answer: "Biaya pendaftaran untuk lomba KTI adalah Rp 150.000/tim dan untuk Olimpiade CBT adalah Rp 100.000/orang."
    },
    {
      question: "Bagaimana cara mendaftar lomba GIS Unesa 2025?",
      answer: "Pendaftaran dapat dilakukan secara online melalui website resmi GIS Unesa 2025 dengan mengisi formulir yang tersedia."
    },
    {
      question: "Apakah ada hadiah untuk pemenang lomba?",
      answer: "Tentu saja! Setiap kategori lomba menyediakan hadiah berupa uang tunai, sertifikat, dan berbagai hadiah menarik lainnya."
    },
    {
      question: "Kapan pengumuman pemenang lomba?",
      answer: "Pengumuman pemenang akan dilaksanakan pada tanggal 30 Juni 2025 melalui website dan media sosial resmi GIS Unesa."
    },
    {
      question: "Siapa yang dapat saya hubungi jika ada pertanyaan lebih lanjut?",
      answer: "Anda dapat menghubungi contact person yang tertera pada website atau melalui email di gisunesa2025@unesa.ac.id"
    }
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
        <h5 className="text-purple-300 font-medium tracking-wider uppercase mb-3">
          Pertanyaan yang sering ditanyakan seputar GIS Unesa 2025
        </h5>
        <h2 className="text-4xl md:text-5xl font-bold text-white mb-6 bg-clip-text text-transparent bg-gradient-to-r from-purple-200 to-purple-400">
          Frequently Asked Questions
        </h2>
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
        className="mt-12 text-center"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ delay: 0.5 }}
      >
        <p className="text-purple-300">
          Tidak menemukan jawaban yang Anda cari?
        </p>
        <a 
          href="#contact" 
          className="inline-flex items-center text-white font-medium mt-2 hover:text-purple-300 transition-colors"
        >
          Hubungi kami untuk informasi lebih lanjut
          <svg 
            className="ml-2 w-5 h-5" 
            fill="none" 
            stroke="currentColor" 
            viewBox="0 0 24 24" 
            xmlns="http://www.w3.org/2000/svg"
          >
            <path 
              strokeLinecap="round" 
              strokeLinejoin="round" 
              strokeWidth="2" 
              d="M14 5l7 7m0 0l-7 7m7-7H3"
            />
          </svg>
        </a>
      </motion.div>
    </motion.div>
  );
};

export default FAQ;