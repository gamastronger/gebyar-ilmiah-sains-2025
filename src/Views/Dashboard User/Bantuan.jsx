import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

function Bantuan() {
  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-purple-50 to-purple-100">
      {/* Navigation Bar - Konsisten dengan komponen lain */}
      <nav className="fixed top-0 left-0 right-0 bg-white shadow-md z-50">
        <div className="max-w-6xl mx-auto px-4">
          <div className="flex justify-between items-center py-4">
            <div className="flex items-center space-x-2">
              <Link to="/" className="font-bold text-xl text-purple-800 flex items-center">
                <img src="/src/assets/hmpti.png" alt="Logo GIS" className="w-10 h-10 mr-2" />
                <span>Gebyar Ilmiah Sains</span>
              </Link>
            </div>
            <div className="hidden md:flex items-center space-x-8">
              <Link to="/dashboard/user/invoice" className="text-purple-800 hover:text-purple-600 font-medium transition duration-300 ease-in-out">Invoice</Link>
              <Link to="/dashboard/user/panduan" className="text-purple-800 hover:text-purple-600 font-medium transition duration-300 ease-in-out">Panduan</Link>
              <Link to="/dashboard/user/bantuan" className="text-purple-800 hover:text-purple-600 font-medium transition duration-300 ease-in-out border-b-2 border-purple-600">Bantuan</Link>
              <Link to="/dashboard/user/cbt" className="text-purple-800 hover:text-purple-600 font-medium transition duration-300 ease-in-out">CBT</Link>
            </div>
            <div className="md:hidden flex items-center">
              <button className="outline-none mobile-menu-button">
                <svg className="w-6 h-6 text-purple-800" fill="none" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24" stroke="currentColor">
                  <path d="M4 6h16M4 12h16M4 18h16"></path>
                </svg>
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <div className=" flex-grow p-8 pt-24 flex items-center justify-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.8, y: 50 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
          className="max-w-2xl w-full mx-auto p-8 bg-white rounded-2xl shadow-lg text-center space-y-8"
        >
          <motion.h2
            initial={{ y: -20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.6, ease: 'easeOut' }}
            className="text-3xl font-bold text-purple-800"
          >
            Butuh Bantuan Lebih Lanjut?
          </motion.h2>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5, duration: 0.6 }}
            className="text-lg text-purple-700"
          >
            Silahkan hubungi tim kami melalui WhatsApp di bawah ini
          </motion.p>

          <motion.a
            href="https://wa.me/6281585616615"
            target="_blank"
            rel="noopener noreferrer"
            whileHover={{ 
              scale: 1.05, 
              backgroundColor: '#7e22ce',
              boxShadow: '0 10px 15px -3px rgba(126, 34, 206, 0.3)'
            }}
            whileTap={{ scale: 0.98 }}
            className="inline-flex items-center px-8 py-4 bg-purple-600 text-white font-semibold rounded-full shadow-md transition-all duration-300"
          >
            <motion.svg
              className="w-6 h-6 mr-3"
              fill="currentColor"
              viewBox="0 0 24 24"
              animate={{ rotate: [0, 10, -10, 0] }}
              transition={{ repeat: Infinity, duration: 2, ease: 'easeInOut' }}
            >
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
            </motion.svg>
            Hubungi Tim Bantuan
          </motion.a>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7, duration: 0.6 }}
            className="bg-purple-50 p-4 rounded-lg border border-purple-100"
          >
            <p className="text-purple-700">
              <span className="font-semibold">Jam Operasional:</span> Senin - Jumat, 08:00 - 17:00 WIB
            </p>
            <p className="text-purple-700 mt-2">
              Kami akan membalas pesan Anda secepat mungkin.
            </p>
          </motion.div>
        </motion.div>
      </div>
      {/* Footer */}
      <footer className="bg-gray-800 text-white py-4 text-center text-sm mt-auto">
            © {new Date().getFullYear()} Universitas Negeri Surabaya. All Rights Reserved.
          </footer>
    </div>
  );
}

export default Bantuan;