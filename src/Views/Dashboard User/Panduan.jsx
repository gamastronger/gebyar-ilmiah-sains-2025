import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

function Panduan() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-purple-100">
      {/* Navigation Bar */}
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
              <Link to="/dashboard/user/panduan" className="text-purple-800 hover:text-purple-600 font-medium transition duration-300 ease-in-out border-b-2 border-purple-600">Panduan</Link>
              <Link to="/dashboard/user/bantuan" className="text-purple-800 hover:text-purple-600 font-medium transition duration-300 ease-in-out">Bantuan</Link>
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
      <div className="p-8 pt-24 flex items-center justify-center">
        <motion.div
          className="p-8 max-w-4xl w-full bg-white rounded-2xl shadow-lg flex flex-col"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
          whileHover={{ scale: 1.02 }}
        >
          <h1 className="text-3xl font-bold mb-6 text-purple-800 text-center">
            Panduan Penggunaan Aplikasi
          </h1>
          
          {/* Video */}
          <motion.div
            className="overflow-hidden rounded-lg shadow-md mb-6 bg-purple-50 border border-purple-100"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
          >
            <div className="aspect-w-16 aspect-h-9">
              <video
                className="w-full h-full object-cover"
                controls
                poster="/src/assets/bgsementara.jpg"
              >
                <source src="video-panduan.mp4" type="video/mp4" />
                Browser Anda tidak mendukung video.
              </video>
            </div>
          </motion.div>

          {/* Caption */}
          <motion.div
            className="text-center"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
          >
            <p className="text-lg font-medium text-purple-700 mb-4">
              Silahkan tonton video di atas untuk panduan penggunaan aplikasi Gebyar Ilmiah.
            </p>
            <div className="bg-purple-50 p-4 rounded-lg border border-purple-100">
              <h3 className="font-semibold text-purple-800 mb-2">Catatan Penting:</h3>
              <ul className="text-purple-700 text-sm list-disc list-inside space-y-1">
                <li>Pastikan koneksi internet stabil untuk menonton video</li>
                <li>Video dapat di-pause untuk melihat detail lebih jelas</li>
                <li>Jika ada pertanyaan, hubungi tim bantuan kami</li>
              </ul>
            </div>
          </motion.div>
        </motion.div>
      </div>
      {/* Footer */}
      <footer className="bg-gray-800 text-white py-4 text-center text-sm">
            © {new Date().getFullYear()} Universitas Negeri Surabaya. All Rights Reserved.
          </footer>
    </div>
  );
}

export default Panduan;