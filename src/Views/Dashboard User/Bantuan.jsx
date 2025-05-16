import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import NavDashUser from '../../Component/NavDashUser';

function Bantuan() {
  const [scrollPosition, setScrollPosition] = useState(0);

  // Handle scroll effect for navbar
  useEffect(() => {
    const handleScroll = () => {
      setScrollPosition(window.scrollY);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-indigo-900 via-purple-900 to-gray-900">
      <NavDashUser />
      <div className="flex-grow pt-16 md:pt-20">
        {/* Hero Section */}
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
          className="w-full py-8 md:py-12 lg:py-16 px-4 sm:px-6 lg:px-8 flex flex-col items-center justify-center text-center"
        >
          <motion.div
            initial={{ y: -50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.6 }}
          >
            <svg 
              className="w-12 h-12 md:w-16 md:h-16 mx-auto text-purple-300" 
              fill="currentColor" 
              viewBox="0 0 20 20"
            >
              <path 
                fillRule="evenodd" 
                d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-8-3a1 1 0 00-.867.5 1 1 0 11-1.731-1A3 3 0 0113 8a3.001 3.001 0 01-2 2.83V11a1 1 0 11-2 0v-1a1 1 0 011-1 1 1 0 100-2zm0 8a1 1 0 100-2 1 1 0 000 2z" 
                clipRule="evenodd" 
              />
            </svg>
          </motion.div>
          <motion.h1 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.8 }}
            className="mt-4 text-2xl md:text-3xl lg:text-4xl font-extrabold text-white"
          >
            Pusat Bantuan
          </motion.h1>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5, duration: 0.8 }}
            className="mt-3 max-w-md mx-auto text-sm md:text-base text-purple-200"
          >
            Kami siap membantu Anda untuk menjawab pertanyaan
          </motion.p>
        </motion.div>

        {/* Main Content Box */}
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pb-12 md:pb-16">
          {/* Contact Us Card */}
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: 'easeOut', delay: 0.2 }}
            className="bg-white rounded-xl md:rounded-2xl shadow-xl overflow-hidden"
          >
            <div className="bg-gradient-to-r from-purple-600 to-indigo-600 p-4 md:p-6">
              <h2 className="text-xl md:text-2xl font-bold text-white">Hubungi Kami</h2>
              <p className="text-purple-100 mt-1 md:mt-2 text-sm md:text-base">Tim kami siap membantu Anda</p>
            </div>
            
            <div className="p-4 md:p-6 lg:p-8 space-y-4 md:space-y-6">
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.6, duration: 0.6 }}
                className="flex items-center space-x-3 md:space-x-4"
              >
                <div className="bg-purple-100 p-2 md:p-3 rounded-full">
                  <svg className="w-5 h-5 md:w-6 md:h-6 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <div>
                  <p className="font-medium text-gray-800 text-sm md:text-base">Jam Operasional</p>
                  <p className="text-gray-600 text-xs md:text-sm">Senin - Minggu, 08:00 - 17:00 WIB</p>
                </div>
              </motion.div>
              
              <motion.a
                href="https://wa.me/6281585616615"
                target="_blank"
                rel="noopener noreferrer"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.8, duration: 0.6 }}
                whileHover={{ 
                  scale: 1.03, 
                  backgroundColor: '#7e22ce',
                  boxShadow: '0 10px 15px -3px rgba(126, 34, 206, 0.3)'
                }}
                whileTap={{ scale: 0.98 }}
                className="flex items-center justify-center w-full px-4 md:px-6 py-3 md:py-4 bg-purple-600 text-white font-medium rounded-lg md:rounded-xl shadow transition-all duration-300 space-x-2 text-sm md:text-base"
              >
                <motion.svg
                  className="w-5 h-5 md:w-6 md:h-6"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                  animate={{ rotate: [0, 10, -10, 0] }}
                  transition={{ repeat: Infinity, duration: 2, repeatDelay: 1, ease: 'easeInOut' }}
                >
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                </motion.svg>
                <span>Hubungi via WhatsApp</span>
              </motion.a>
              
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.9, duration: 0.6 }}
                className="text-center text-xs md:text-sm text-gray-500 mt-2 md:mt-4"
              >
                Kami akan merespon pesan Anda secepatnya
              </motion.p>
            </div>
          </motion.div>
          
          {/* Additional Resources */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
            className="mt-8 md:mt-12 bg-gradient-to-r from-purple-500 to-indigo-600 rounded-xl md:rounded-2xl shadow-xl p-4 md:p-6 lg:p-8"
          >
            <div className="max-w-3xl mx-auto text-center">
              <h2 className="text-lg md:text-xl lg:text-2xl font-bold text-white">Sumber Informasi Tambahan</h2>
              <p className="mt-2 text-purple-100 text-xs md:text-sm">
                Temukan panduan lengkap tentang kompetisi Gebyar Ilmiah Sains
              </p>
              
              <div className="mt-4 md:mt-6">
                <a 
                  href="https://unesa.me/BukuPanduan13thGIS" 
                  className="bg-white/10 backdrop-blur-sm hover:bg-white/20 transition duration-300 rounded-lg md:rounded-xl p-3 md:p-4 lg:p-5 text-white flex flex-col items-center mx-auto w-48 md:w-56"
                >
                  <svg className="w-6 h-6 md:w-8 md:h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                  </svg>
                  <span className="mt-2 md:mt-3 font-medium text-sm md:text-base">Buku Panduan</span>
                </a>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}

export default Bantuan;