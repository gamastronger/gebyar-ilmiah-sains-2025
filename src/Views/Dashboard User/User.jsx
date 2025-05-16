import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

function User() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  // Handle window resize
  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
      if (window.innerWidth >= 768) {
        setIsMenuOpen(false);
      }
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <div className="min-h-screen w-full overflow-x-hidden bg-gradient-to-br from-indigo-900 via-purple-900 to-gray-900">
      {/* Navigation Bar */}
      <nav className="fixed top-0 left-0 right-0 bg-white shadow-lg z-50">
        <div className="max-w-6xl mx-auto px-4">
          <div className="flex justify-between items-center py-3 md:py-4">
            <div className="flex items-center">
              <Link to="/" className="font-bold text-lg sm:text-xl text-slate-800 flex items-center">
                <img src="/src/assets/logomascot.png" alt="Logo GIS" className="w-8 h-8 sm:w-10 sm:h-10 mr-2" />
                <span className="text-purple-900 hidden xs:inline">Gebyar Ilmiah Sains</span>
                <span className="text-purple-900 xs:hidden">Gebyar Ilmiah Sains</span>
              </Link>
            </div>
            <div className="hidden md:flex items-center space-x-3 lg:space-x-8">
              <Link to="/dashboard/user/invoice" className="text-purple-900 hover:text-purple-600 font-medium transition duration-300 ease-in-out text-sm lg:text-base">Invoice</Link>
              <Link to="/dashboard/user/jurnal" className="text-purple-900 hover:text-purple-600 font-medium transition duration-300 ease-in-out text-sm lg:text-base">Upload Jurnal</Link>
              <Link to="/dashboard/user/bantuan" className="text-purple-900 hover:text-purple-600 font-medium transition duration-300 ease-in-out text-sm lg:text-base">Bantuan</Link>
              <Link to="/dashboard/user/cbt" className="text-purple-900 hover:text-purple-600 font-medium text-sm lg:text-base">CBT</Link>
              <Link onClick={() => {localStorage.clear(); window.location.href = "/"}} className="bg-purple-900 text-white px-3 py-1 lg:px-4 lg:py-2 rounded-md hover:bg-purple-700 transition duration-300 ease-in-out text-sm lg:text-base">Logout</Link>
            </div>
            <div className="md:hidden flex items-center">
              <button 
                className="outline-none mobile-menu-button"
                onClick={toggleMenu}
                aria-label="Toggle menu"
              >
                <svg className="w-6 h-6 text-slate-700" fill="none" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24" stroke="currentColor">
                  <path d={isMenuOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"}></path>
                </svg>
              </button>
            </div>
          </div>
        </div>
        
        {/* Mobile Menu with smooth animation */}
        <motion.div 
          className="md:hidden bg-white shadow-inner overflow-hidden"
          initial={false}
          animate={{ height: isMenuOpen ? 'auto' : 0, opacity: isMenuOpen ? 1 : 0 }}
          transition={{ duration: 0.3 }}
        >
          <div className="flex flex-col space-y-2 px-4 py-2">
            <Link to="/dashboard/user/invoice" className="text-purple-900 hover:text-purple-600 font-medium py-2 border-b border-gray-100">Invoice</Link>
            <Link to="/dashboard/user/jurnal" className="text-purple-900 hover:text-purple-600 font-medium py-2 border-b border-gray-100">Upload Jurnal</Link>
            <Link to="/dashboard/user/bantuan" className="text-purple-900 hover:text-purple-600 font-medium py-2 border-b border-gray-100">Bantuan</Link>
            <Link to="/dashboard/user/cbt" className="text-purple-900 hover:text-purple-600 font-medium py-2 border-b border-gray-100">CBT</Link>
            <Link to="/" className="bg-purple-900 text-white px-4 py-2 rounded-md hover:bg-purple-700 transition duration-300 ease-in-out my-2 text-center">Logout</Link>
          </div>
        </motion.div>
      </nav>

      {/* Main Content - Responsive padding based on screen size */}
      <div className="pt-16 sm:pt-20 px-3 sm:px-6 py-6 min-h-screen flex items-center justify-center">
        <motion.div 
          className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6 w-full max-w-6xl bg-white rounded-lg sm:rounded-2xl shadow-xl p-4 sm:p-6"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          {/* Left Card */}
          <motion.div 
            className="bg-slate-50 p-4 sm:p-6 flex flex-col items-center justify-center rounded-lg shadow-md"
            whileHover={{ scale: windowWidth > 768 ? 1.02 : 1 }}
            transition={{ type: 'spring', stiffness: 300 }}
          >
            <motion.img 
              src="/src/assets/logomascot.png" 
              alt="Logo GIS" 
              className="w-24 h-24 sm:w-32 sm:h-32 rounded-full shadow-lg mb-4"
              whileHover={{ scale: 1.1 }}
              transition={{ type: 'spring', stiffness: 400 }}
            />
            <h3 className="text-xl sm:text-2xl font-bold text-purple-800 text-center">Gebyar Ilmiah Sains</h3>
          </motion.div>

          {/* Right Card */}
          <motion.div 
            className="bg-slate-50 p-4 sm:p-6 rounded-lg shadow-md overflow-y-auto max-h-80 sm:max-h-96"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
          >
            <h2 className="text-2xl sm:text-3xl font-bold mb-3 sm:mb-4 text-slate-800 border-b-2 border-purple-200 pb-2">About GIS</h2>
            <p className="text-base sm:text-lg leading-relaxed text-slate-700">
              13th Gebyar Ilmiah Sains Tingkat Nasional 2025 Jenjang SD/Sederajat, SMP/Sederajat, SMA/SMK/Sederajat, dan 
              Mahasiswa/i yang terdiri dari Science Competition dan Science Writing Competition yang merupakan salah satu 
              kegiatan dari HMP Pendidikan IPA FMIPA Unesa yang bertujuan sebagai Ajang kompetisi tingkat nasional untuk 
              meningkatkan kemampuan bersaing siswa dan mahasiswa dalam Ilmu Pengetahuan dan Teknologi (IPTEK) dan melatih 
              siswa dan mahasiswa dalam bersaing inovasi di bidang Pendidikan, Bioteknologi, Energi Terbarukan, dan Lingkungan.
            </p>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
}

export default User;