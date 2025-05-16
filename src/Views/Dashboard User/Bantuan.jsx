import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';

function Bantuan() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrollPosition, setScrollPosition] = useState(0);

  // Handle scroll effect for navbar
  useEffect(() => {
    const handleScroll = () => {
      setScrollPosition(window.scrollY);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // FAQ Data
  const faqItems = [
    {
      question: "Bagaimana cara mendaftar Gebyar Ilmiah Sains?",
      answer: "Anda dapat mendaftar melalui halaman pendaftaran dengan mengisi formulir dan melakukan pembayaran biaya pendaftaran."
    },
    {
      question: "Berapa biaya pendaftaran untuk mengikuti kompetisi?",
      answer: "Biaya pendaftaran bervariasi tergantung kategori kompetisi. Silakan lihat detail di halaman invoice."
    },
    {
      question: "Kapan batas waktu pendaftaran?",
      answer: "Batas waktu pendaftaran adalah 2 minggu sebelum pelaksanaan kompetisi. Pastikan Anda mendaftar sebelum tenggat waktu."
    }
  ];

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-indigo-900 via-purple-900 to-gray-900">
      {/* Navigation Bar - Improved with scroll effect */}
      <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrollPosition > 10 ? 'bg-white/95 backdrop-blur-sm shadow-lg' : 'bg-white shadow-md'}`}>
        <div className="max-w-6xl mx-auto px-4">
          <div className="flex justify-between items-center py-3 md:py-4">
            <div className="flex items-center space-x-2">
              <Link to="/" className="font-bold text-lg md:text-xl text-purple-800 flex items-center">
                <img src="/src/assets/logomascot.png" alt="Logo GIS" className="w-8 h-8 md:w-10 md:h-10 mr-2" />
                <span className="hidden sm:inline">Gebyar Ilmiah Sains</span>
                <span className="sm:hidden">Gebyar Ilmiah Sains</span>
              </Link>
            </div>
            
            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-8">
              <Link to="/dashboard/user/invoice" className="text-purple-800 hover:text-purple-600 font-medium transition duration-300 ease-in-out relative group">
                Invoice
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-purple-600 transition-all duration-300 group-hover:w-full"></span>
              </Link>
              <Link to="/dashboard/user/bantuan" className="text-purple-800 font-medium transition duration-300 ease-in-out border-b-2 border-purple-600">
                Bantuan
              </Link>
              <Link to="/dashboard/user/cbt" className="text-purple-800 hover:text-purple-600 font-medium transition duration-300 ease-in-out relative group">
                CBT
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-purple-600 transition-all duration-300 group-hover:w-full"></span>
              </Link>
            </div>
            
            {/* Mobile menu button */}
            <div className="md:hidden flex items-center">
              <button 
                className="outline-none" 
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                aria-label="Toggle menu"
              >
                <svg 
                  className="w-6 h-6 text-purple-800" 
                  fill="none" 
                  strokeLinecap="round" 
                  strokeLinejoin="round" 
                  strokeWidth="2" 
                  viewBox="0 0 24 24" 
                  stroke="currentColor"
                >
                  {isMenuOpen ? (
                    <path d="M6 18L18 6M6 6l12 12"></path>
                  ) : (
                    <path d="M4 6h16M4 12h16M4 18h16"></path>
                  )}
                </svg>
              </button>
            </div>
          </div>
          
          {/* Mobile Navigation Menu */}
          <AnimatePresence>
            {isMenuOpen && (
              <motion.div 
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.3 }}
                className="md:hidden"
              >
                <div className="flex flex-col py-4 space-y-4 border-t border-gray-200">
                  <Link 
                    to="/dashboard/user/invoice" 
                    className="text-purple-800 hover:text-purple-600 hover:bg-purple-50 px-4 py-2 rounded-lg transition duration-200"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    Invoice
                  </Link>
                  <Link 
                    to="/dashboard/user/bantuan" 
                    className="text-purple-800 bg-purple-100 px-4 py-2 rounded-lg font-medium"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    Bantuan
                  </Link>
                  <Link 
                    to="/dashboard/user/cbt" 
                    className="text-purple-800 hover:text-purple-600 hover:bg-purple-50 px-4 py-2 rounded-lg transition duration-200"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    CBT
                  </Link>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </nav>

      {/* Main Content */}
      <div className="flex-grow pt-16 md:pt-20">
        {/* Hero Section */}
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
          className="w-full py-12 md:py-20 px-4 sm:px-6 lg:px-8 flex flex-col items-center justify-center text-center"
        >
          <motion.div
            initial={{ y: -50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.6 }}
          >
            <svg 
              className="w-16 h-16 md:w-20 md:h-20 mx-auto text-purple-300" 
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
            className="mt-4 text-3xl md:text-4xl lg:text-5xl font-extrabold text-white"
          >
            Pusat Bantuan
          </motion.h1>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5, duration: 0.8 }}
            className="mt-3 max-w-md mx-auto text-base md:text-lg text-purple-200"
          >
            Kami siap membantu Anda untuk menjawab pertanyaan
          </motion.p>
        </motion.div>

        {/* Main Content Box */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-16">
          <div className="grid md:grid-cols-2 gap-8">
            {/* Contact Us Card */}
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: 'easeOut', delay: 0.2 }}
              className="bg-white rounded-2xl shadow-xl overflow-hidden"
            >
              <div className="bg-gradient-to-r from-purple-600 to-indigo-600 p-6">
                <h2 className="text-2xl font-bold text-white">Hubungi Kami</h2>
                <p className="text-purple-100 mt-2">Tim kami siap membantu Anda</p>
              </div>
              
              <div className="p-6 md:p-8 space-y-6">
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.6, duration: 0.6 }}
                  className="flex items-center space-x-4"
                >
                  <div className="bg-purple-100 p-3 rounded-full">
                    <svg className="w-6 h-6 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <div>
                    <p className="font-medium text-gray-800">Jam Operasional</p>
                    <p className="text-gray-600">Senin - Minggu, 08:00 - 17:00 WIB</p>
                  </div>
                </motion.div>
                
                <motion.a
                  href="https://wa.me/6285746300668"
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
                  className="flex items-center justify-center w-full px-6 py-4 bg-purple-600 text-white font-medium rounded-xl shadow transition-all duration-300 space-x-2"
                >
                  <motion.svg
                    className="w-6 h-6"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                    animate={{ rotate: [0, 10, -10, 0] }}
                    transition={{ repeat: Infinity, duration: 2, repeatDelay: 1, ease: 'easeInOut' }}
                  >
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                  </motion.svg>
                  <span>Hubungi via WhatsApp</span>
                </motion.a>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.6 }}
              className="bg-gradient-to-r from-purple-500 to-indigo-600 rounded-2xl shadow-xl p-6 md:p-8"
            >
              <div className="max-w-4xl mx-auto text-center h-full">
                <h2 className="text-xl md:text-2xl font-bold text-white">Sumber Informasi Tambahan</h2>
                <p className="mt-2 text-purple-100">
                  Temukan panduan lengkap tentang kompetisi Gebyar Ilmiah Sains
                </p>
                
                <div className="items-center justify-center mt-6 h-full">
                  <a 
                    href="https://unesa.me/BukuPanduan13thGIS" 
                    className="bg-white/10 backdrop-blur-sm hover:bg-white/20 transition duration-300 rounded-xl p-5 text-white flex flex-col items-center"
                  >
                    <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                    </svg>
                    <span className="mt-3 font-medium">Buku Panduan</span>
                  </a>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Bantuan;