import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

function User() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <div className="h-screen w-screen overflow-hidden bg-gradient-to-r from-purple-300 via-purple-500 to-purple-700">
      {/* Navigation Bar */}
      <nav className="fixed top-0 left-0 right-0 bg-white shadow-lg z-50">
        <div className="max-w-6xl mx-auto px-4">
          <div className="flex justify-between items-center py-4">
            <div className="flex items-center space-x-2">
              <Link to="/" className="font-bold text-xl text-slate-800 flex items-center">
                <img src="/src/assets/hmpti.png" alt="Logo GIS" className="w-10 h-10 mr-2" />
                <span className='text-purple-900'>Gebyar Ilmiah Sains</span>
              </Link>
            </div>
            <div className="hidden md:flex items-center space-x-8">
              <Link to="/dashboard/user/invoice" className="text-purple-900 hover:text-purple-600 font-medium transition duration-300 ease-in-out">Invoice</Link>
              <Link to="/dashboard/user/panduan" className="text-purple-900 hover:text-purple-600 font-medium transition duration-300 ease-in-out">Panduan</Link>
              <Link to="/dashboard/user/bantuan" className="text-purple-900 hover:text-purple-600 font-medium transition duration-300 ease-in-out">Bantuan</Link>
              <Link to="/dashboard/user/cbt" className="text-purple-900 hover:text-purple-600 font-medium py-2 border-b border-gray-100">CBT</Link>
            </div>
            <div className="md:hidden flex items-center">
              <button 
                className="outline-none mobile-menu-button"
                onClick={toggleMenu}
              >
                <svg className="w-6 h-6 text-slate-700" fill="none" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24" stroke="currentColor">
                  <path d={isMenuOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"}></path>
                </svg>
              </button>
            </div>
          </div>
        </div>
        
        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden bg-white pb-4 shadow-inner">
            <div className="flex flex-col space-y-4 px-4">
              <Link to="/dashboard/user/invoice" className="text-purple-900 hover:text-purple-600 font-medium py-2 border-b border-gray-100">Invoice</Link>
              <Link to="/dashboard/user/panduan" className="text-purple-900 hover:text-purple-600 font-medium py-2 border-b border-gray-100">Panduan</Link>
              <Link to="/dashboard/user/bantuan" className="text-purple-900 hover:text-purple-600 font-medium py-2 border-b border-gray-100">Bantuan</Link>
              <Link to="/dashboard/user/cbt" className="text-purple-900 hover:text-purple-600 font-medium py-2 border-b border-gray-100">CBT</Link>
            </div>
          </div>
        )}
      </nav>

      {/* Main Content - Positioned absolute to fill entire screen below navbar */}
      <div className="absolute inset-x-0 top-16 bottom-0 flex items-center justify-center">
        <motion.div 
          className="flex flex-col md:flex-row items-center w-11/12 max-w-6xl h-5/6 bg-white rounded-2xl shadow-2xl overflow-hidden"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          {/* Left side with background pattern */}
          <motion.div 
            className="md:w-1/3 bg-slate-50 p-8 flex flex-col items-center justify-center relative h-full"
            whileHover={{ scale: 1.02 }}
            transition={{ type: 'spring', stiffness: 300 }}
          >
            <div className="absolute top-0 left-0 w-full h-full opacity-10">
              <div className="w-full h-full bg-purple-400 pattern-grid-lg"></div>
            </div>
            
            {/* Logo GIS */}
            <motion.div 
              className="flex-shrink-0 border-4 border-white p-6 rounded-full bg-slate-50 shadow-lg z-10 mb-6"
              initial={{ scale: 0.8, rotate: -10 }}
              animate={{ scale: 1, rotate: 0 }}
              transition={{ delay: 0.2, type: 'spring' }}
              whileHover={{ rotate: 5, scale: 1.05 }}
            >
              <motion.img 
                src="/src/assets/hmpti.png" 
                alt="Logo GIS" 
                className="w-32 h-32 rounded-full shadow-lg"
                whileHover={{ scale: 1.1 }}
                transition={{ type: 'spring', stiffness: 400 }}
              />
            </motion.div>
            
            <motion.h3 
              className="text-2xl font-bold text-purple-800 text-center z-10"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4 }}
            >
              Gebyar Ilmiah Sains
            </motion.h3>
            
            {/* Floating particles animation */}
            <div className="absolute inset-0 overflow-hidden z-0">
              {[...Array(15)].map((_, i) => (
                <motion.div
                  key={i}
                  className="absolute rounded-full bg-purple-200"
                  style={{
                    width: Math.random() * 10 + 5 + 'px',
                    height: Math.random() * 10 + 5 + 'px',
                    left: Math.random() * 100 + '%',
                    top: Math.random() * 100 + '%',
                  }}
                  animate={{
                    y: [0, Math.random() * 40 - 20],
                    x: [0, Math.random() * 40 - 20],
                    opacity: [0.3, 0.7, 0.3],
                  }}
                  transition={{
                    duration: Math.random() * 10 + 10,
                    repeat: Infinity,
                    repeatType: 'reverse',
                    ease: 'easeInOut',
                  }}
                />
              ))}
            </div>
          </motion.div>

          {/* Right side content */}
          <motion.div 
            className="md:w-2/3 p-8 flex-grow h-full overflow-y-auto"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
          >
            <motion.h2 
              className="text-4xl font-bold mb-6 text-slate-800 border-b-4 border-purple-200 pb-2 inline-block"
              initial={{ x: -20 }}
              animate={{ x: 0 }}
              transition={{ delay: 0.4 }}
            >
              About GIS
            </motion.h2>
            
            <motion.p 
              className="text-lg leading-relaxed text-slate-700 mb-6"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
            >
              Geographic Information System (GIS) adalah sistem yang dirancang untuk menangkap, menyimpan, memanipulasi, menganalisis, mengelola, dan menyajikan semua jenis data geografis. GIS memungkinkan pengguna untuk memahami pola, hubungan, dan tren dalam data geografis.
            </motion.p>
            
            <motion.p 
              className="text-lg leading-relaxed text-slate-700 mb-6"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
            >
              Dengan GIS, Anda dapat membuat peta interaktif, melakukan analisis spasial, dan mengelola data lokasi untuk berbagai kebutuhan, mulai dari perencanaan kota hingga pelacakan lingkungan.
            </motion.p>
            
            <motion.p 
              className="text-lg leading-relaxed text-slate-700 mb-6"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.7 }}
            >
              Sistem ini banyak digunakan dalam berbagai bidang seperti pemerintahan, bisnis, pendidikan, dan penelitian untuk membantu pengambilan keputusan berbasis lokasi.
            </motion.p>
            
            <motion.p 
              className="text-lg leading-relaxed text-slate-700 mb-6"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8 }}
            >
              GIS menggabungkan data spasial dengan data atribut untuk memberikan pemahaman yang lebih komprehensif tentang berbagai fenomena geografis.
              lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
              lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
              lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
              lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
            </motion.p>
          </motion.div>
        </motion.div>
      </div>
      
      {/* Background animated elements - contained within viewport */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute rounded-full bg-white opacity-10"
            style={{
              width: Math.random() * 100 + 50 + 'px',
              height: Math.random() * 100 + 50 + 'px',
              left: Math.random() * 100 + '%',
              top: Math.random() * 100 + '%',
            }}
            animate={{
              y: [0, Math.random() * 100 - 50],
              x: [0, Math.random() * 100 - 50],
              opacity: [0.1, 0.2, 0.1],
            }}
            transition={{
              duration: Math.random() * 20 + 10,
              repeat: Infinity,
              repeatType: 'reverse',
              ease: 'easeInOut',
            }}
          />
        ))}
      </div>
    </div>
  );
}

export default User;