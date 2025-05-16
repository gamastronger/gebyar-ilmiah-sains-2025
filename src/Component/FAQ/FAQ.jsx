import { motion } from "framer-motion";
import { useState } from "react";
import panduanVideo from "../../assets/amelio.mp4"; // Adjust the path as necessary

const FAQ = () => {


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
      <div className="text-center mb-10">
        
        <h2 className="mt-12 text-4xl md:text-5xl font-bold text-white mb-6 bg-clip-text text-transparent bg-gradient-to-r from-purple-200 to-purple-400">
          Panduan
        </h2>
        <h5 className="md-4 text-purple-300 font-medium tracking-wider uppercase mb-3">
          Lihat Video Panduan dan Download Buku Panduan
        </h5>
        <div className="h-1 w-24 bg-gradient-to-r from-purple-500 to-pink-500 mx-auto rounded-full"></div>
      </div>

      <motion.div 
        className="mt-16 text-center" // Changed from mt-12 and removed space-y-6
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ delay: 0.5 }}
      >
        <div className="flex flex-col items-center space-y-12"> {/* Changed from gap-4 to space-y-6 */}
          {/* Download Button */}
          <video 
            src={panduanVideo}
            controls
            className="rounded-lg shadow-xl w-full max-w-2xl"
          >
            Your browser does not support the video tag.
          </video>
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