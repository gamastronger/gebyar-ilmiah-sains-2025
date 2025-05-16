import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import NavDashUser from '../../Component/NavDashUser';

function Invoice() {
  const [showUploadForm, setShowUploadForm] = useState(false);
  const [showConfirmationPage, setShowConfirmationPage] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);
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

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoaded(true);
    }, 100);
    return () => clearTimeout(timer);
  }, []);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const handleShowUploadForm = () => {
    setShowUploadForm(true);
  };

  const handleBackToInvoice = () => {
    setShowUploadForm(false);
  };

  const handleUpload = () => {
    setShowUploadForm(false);
    setShowConfirmationPage(true);
  };

  const handleCloseConfirmation = () => {
    setShowConfirmationPage(false);
  };

  const handleBackToHome = () => {
    setShowConfirmationPage(false);
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        when: "beforeChildren",
        staggerChildren: 0.05 
      }
    }
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 10 }, 
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        type: "spring",
        damping: 20, 
        stiffness: 300 
      }
    }
  };
  
  const bgAnimation = {
    scale: [1, 1.05, 1],
    opacity: [0.2, 0.22, 0.2]
  };
  
  const bgTransition = {
    duration: 12,
    repeat: Infinity,
    repeatType: "reverse"
  };

  // Function to get bank logo based on bank name
  const getBankLogo = (bankName) => {
    switch(bankName.toLowerCase()) {
      case 'seabank':
        return (
          <div className="p-1 rounded-md flex items-center justify-center w-full h-full">
            <img src="/src/assets/seabank.png" alt="SeaBank Logo" className="w-8 h-8"></img>
          </div>
        );
      case 'bca':
        return (
          <div className="p-1 rounded-md flex items-center justify-center w-full h-full">
            <img src="/src/assets/bca.png" alt="BCA Logo" className="w-11 h-8"></img>
          </div>
        );
      case 'mandiri':
        return (
          <div className="p-1 rounded-md flex items-center justify-center w-full h-full">
            <img src="/src/assets/mandiri.png" alt="Mandiri Logo" className="w-8 h-8"></img>
          </div>
        );
      default:
        return (
          <div className="bg-purple-50 p-1 rounded-md flex items-center justify-center w-full h-full">
            <div className="text-purple-600 font-bold text-sm">{bankName}</div>
          </div>
        );
    }
  };
  
  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-900 via-purple-900 to-gray-900 overflow-x-hidden">
      <NavDashUser />
      {/* Decorative Elements - Responsive */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        <motion.div 
          className="absolute top-1/3 right-0 sm:right-10 w-40 sm:w-60 md:w-80 h-40 sm:h-60 md:h-80 rounded-full bg-purple-300 mix-blend-multiply filter blur-3xl opacity-20"
          animate={bgAnimation}
          transition={bgTransition}
        />
        <motion.div 
          className="absolute bottom-1/4 left-0 sm:left-10 w-32 sm:w-48 md:w-64 h-32 sm:h-48 md:h-64 rounded-full bg-indigo-400 mix-blend-multiply filter blur-3xl opacity-20"
          animate={bgAnimation}
          transition={{...bgTransition, delay: 2}}
        />
      </div>

      {/* Main Content - Responsive padding */}
      <motion.div 
        className="px-3 sm:px-6 md:px-8 pt-20 sm:pt-24 pb-6 sm:pb-8 flex items-center justify-center min-h-screen"
        variants={containerVariants}
        initial="hidden"
        animate={isLoaded ? "visible" : "hidden"}
      >
        <motion.div 
          className="bg-white rounded-lg sm:rounded-xl md:rounded-2xl shadow-lg p-4 sm:p-6 max-w-4xl w-full"
          variants={cardVariants}
        >
          <AnimatePresence mode="wait">
            {showConfirmationPage ? (
              // Confirmation Page - Responsive
              <motion.div
                key="confirmation"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.2 }}
                className="space-y-4 sm:space-y-6"
              >
                <div className="bg-green-100 border border-green-400 text-green-700 px-3 sm:px-4 py-2 sm:py-3 rounded relative mb-4 sm:mb-6 flex justify-between items-center">
                  <span className="font-bold text-sm sm:text-base">Berhasil Mengupload Bukti Pembayaran</span>
                  <button
                    onClick={handleCloseConfirmation}
                    className="text-green-700 font-bold hover:text-green-900"
                  >
                    &times;
                  </button>
                </div>
                
                {/* Responsive Table */}
                <div className="overflow-x-auto bg-white rounded-lg shadow">
                  <table className="w-full border-collapse rounded-lg overflow-hidden">
                    <thead className="bg-purple-700 text-white">
                      <tr>
                        <th className="border p-2 sm:p-3 text-xs sm:text-sm">No</th>
                        <th className="border p-2 sm:p-3 text-xs sm:text-sm">Kode Bayar</th>
                        <th className="border p-2 sm:p-3 text-xs sm:text-sm">Status</th>
                        <th className="border p-2 sm:p-3 text-xs sm:text-sm">Tanggal Upload</th>
                        <th className="border p-2 sm:p-3 text-xs sm:text-sm">Opsi</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr className="hover:bg-purple-50 transition-colors">
                        <td className="border p-2 sm:p-3 text-center text-xs sm:text-sm">1</td>
                        <td className="border p-2 sm:p-3 text-center text-xs sm:text-sm">INV001</td>
                        <td className="border p-2 sm:p-3 text-center text-xs sm:text-sm">
                          <span className="text-green-600 font-semibold">Terupload</span>
                        </td>
                        <td className="border p-2 sm:p-3 text-center text-xs sm:text-sm">20/04/2025</td>
                        <td className="border p-2 sm:p-3 text-center">
                          <button className="bg-purple-600 text-white px-2 py-1 sm:px-4 sm:py-2 rounded text-xs sm:text-sm hover:bg-purple-700 transition-colors">
                            Hubungi Admin
                          </button>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
                
                {/* Info Card - Improved styling */}
                <div className="bg-purple-50 p-4 sm:p-6 rounded-lg shadow-md border border-purple-100">
                  <h3 className="font-bold text-base sm:text-lg mb-3 sm:mb-4 text-purple-800">Konfirmasi</h3>
                  <p className="text-purple-700 mb-2 text-sm sm:text-base">
                    Peserta yang telah melakukan pembayaran dapat melakukan konfirmasi peserta melalui WhatsApp ke:
                  </p>
                  <ul className="list-disc pl-5 sm:pl-6 text-purple-700 text-sm sm:text-base">
                    <li className="mb-1">Contact Person Science Competition pada nomor 087876440866 (Nisa) atau 087758375435 (Zaky)</li>
                    <li className='mb-1'>Contact Person Science Writing Competition pada nomor 085850817023 (Faudhotul) atau 08887060380 (Gita)</li>
                    <li className="mb-1">Mengirimkan foto bukti pembayaran</li>
                    <li>Mengirimkan foto bukti screenshot upload bukti pembayaran di aplikasi</li>
                  </ul>
                </div>
                
                <div className="flex justify-center mt-4 sm:mt-6">
                  <motion.button
                    onClick={handleBackToHome}
                    className="bg-purple-600 text-white px-5 py-2 rounded-lg hover:bg-purple-700 transition-colors text-sm sm:text-base"
                    whileHover={{ scale: windowWidth > 768 ? 1.03 : 1 }}
                    whileTap={{ scale: 0.97 }}
                    transition={{ type: "spring", stiffness: 400 }}
                  >
                    Kembali ke Halaman Utama
                  </motion.button>
                </div>
              </motion.div>
            ) : showUploadForm ? (
              // Upload Form - Responsive
              <motion.div
                key="uploadForm"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.2 }}
                className="space-y-4"
              >
                <h2 className="text-xl sm:text-2xl font-bold mb-4 sm:mb-6 text-purple-800 text-center">
                  Upload Bukti Pembayaran
                </h2>
                <div className="space-y-3 sm:space-y-4">
                  {[
                    {
                      label: "Total Pembayaran",
                      component: (
                        <input
                          type="text"
                          className="w-full border border-purple-200 p-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                          placeholder="Masukkan total pembayaran"
                        />
                      )
                    },
                    {
                      label: "Metode Pembayaran",
                      component: (
                        <select
                          className="w-full border border-purple-200 p-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                        >
                          <option value="">Pilih metode pembayaran</option>
                          <option value="Bank ABC">SeaBank</option>
                          <option value="Bank XYZ">BCA</option>
                          <option value="Bank DEF">Mandiri</option>
                        </select>
                      )
                    },
                    {
                      label: "Tanggal Pembayaran",
                      component: (
                        <input
                          type="datetime-local"
                          className="w-full border border-purple-200 p-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                        />
                      )
                    },
                    {
                      label: "Bukti Pembayaran",
                      component: (
                        <div className="border-2 border-dashed border-purple-200 rounded-lg p-4 text-center hover:border-purple-300 transition-colors">
                          <input
                            type="file"
                            className="w-full text-sm text-gray-500"
                          />
                          <p className="text-xs text-gray-500 mt-2">Upload file dalam format JPG, PNG, atau PDF (max 2MB)</p>
                        </div>
                      )
                    }
                  ].map((field, index) => (
                    <div key={index}>
                      <label className="block font-semibold text-purple-700 mb-1 sm:mb-2 text-sm sm:text-base">
                        {field.label}
                      </label>
                      {field.component}
                    </div>
                  ))}
                </div>
                <div className="flex justify-between mt-6 gap-3">
                  <motion.button
                    onClick={handleBackToInvoice}
                    className="bg-gray-200 text-gray-700 px-3 py-2 rounded-lg hover:bg-gray-300 transition-colors text-sm sm:text-base flex-grow sm:flex-grow-0"
                    whileHover={{ scale: windowWidth > 768 ? 1.03 : 1 }}
                    whileTap={{ scale: 0.97 }}
                    transition={{ type: "spring", stiffness: 400 }}
                  >
                    Kembali
                  </motion.button>
                  <motion.button
                    onClick={handleUpload}
                    className="bg-purple-600 text-white px-4 py-2 rounded-lg hover:bg-purple-700 transition-colors text-sm sm:text-base flex-grow sm:flex-grow-0"
                    whileHover={{ scale: windowWidth > 768 ? 1.03 : 1 }}
                    whileTap={{ scale: 0.97 }}
                    transition={{ type: "spring", stiffness: 400 }}
                  >
                    Upload
                  </motion.button>
                </div>
              </motion.div>
            ) : (
              // Invoice Table - Responsive
              <motion.div
                key="invoiceTable"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.2 }}
                className="space-y-4 sm:space-y-6"
              >
                <h2 className="text-xl sm:text-2xl font-bold mb-4 sm:mb-6 text-purple-800 text-center">
                  Invoice / Menunggu Pembayaran
                </h2>

                {/* Search - Improved responsiveness */}
                <div className="mb-4 sm:mb-6 flex items-center justify-center">
                  <div className="relative w-full max-w-xs">
                    <input
                      type="text"
                      className="w-full border border-purple-200 p-2 pl-8 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                      placeholder="Cari kode bayar..."
                    />
                    <svg 
                      className="w-4 h-4 absolute left-2 top-3 text-purple-500"
                      fill="none" 
                      stroke="currentColor" 
                      viewBox="0 0 24 24" 
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
                    </svg>
                  </div>
                </div>

                {/* Table - Responsive with scroll for small screens */}
                <div className="overflow-x-auto bg-white rounded-lg shadow">
                  <table className="w-full border-collapse rounded-lg overflow-hidden">
                    <thead className="bg-purple-700 text-white">
                      <tr>
                        <th className="border p-2 sm:p-3 text-xs sm:text-sm">No</th>
                        <th className="border p-2 sm:p-3 text-xs sm:text-sm">Kode Bayar</th>
                        <th className="border p-2 sm:p-3 text-xs sm:text-sm">Status</th>
                        <th className="border p-2 sm:p-3 text-xs sm:text-sm">Total Pembayaran</th>
                        <th className="border p-2 sm:p-3 text-xs sm:text-sm">Upload Bukti</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr className="hover:bg-purple-50 transition-colors">
                        <td className="border p-2 sm:p-3 text-center text-xs sm:text-sm">1</td>
                        <td className="border p-2 sm:p-3 text-center text-xs sm:text-sm">INV001</td>
                        <td className="border p-2 sm:p-3 text-center text-xs sm:text-sm">
                          <span className="text-amber-500 font-semibold">
                            Menunggu
                          </span>
                        </td>
                        <td className="border p-2 sm:p-3 text-center text-xs sm:text-sm">Rp 500.000</td>
                        <td className="border p-2 sm:p-3 text-center">
                          <motion.button
                            onClick={handleShowUploadForm}
                            className="bg-purple-600 text-white px-3 py-1 sm:px-4 sm:py-2 rounded text-xs sm:text-sm hover:bg-purple-700 transition-colors"
                            whileHover={{ scale: windowWidth > 768 ? 1.03 : 1 }}
                            whileTap={{ scale: 0.97 }}
                            transition={{ type: "spring", stiffness: 400 }}
                          >
                            Upload Bukti
                          </motion.button>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>

                {/* Updated Payment Methods with Bank Logos */}
                <div className="mt-6 sm:mt-8">
                  <h3 className="font-bold text-base sm:text-lg mb-3 sm:mb-4 text-purple-800 text-center">
                    Metode Pembayaran
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {[
                      {
                        rekening: "901360509500",
                        bank: "SeaBank",
                        nama: "ANANDA RIZKA CIPTA FAUZIA"
                      },
                      {
                        rekening: "4720414983",
                        bank: "BCA",
                        nama: "ANANDA RIZKA CIPTA FAUZIA"
                      },
                      {
                        rekening: "1780006887547",
                        bank: "Mandiri",
                        nama: "WILDA NAYLATUZ ZAHRO"
                      }
                    ].map((payment, index) => (
                      <motion.div 
                        key={index}
                        className="flex items-center bg-purple-50 p-3 rounded-lg border border-purple-100 hover:shadow-md transition-shadow"
                        whileHover={{ scale: windowWidth > 768 ? 1.01 : 1 }}
                      >
                        <div className="min-w-12 h-12 sm:min-w-16 sm:h-16 bg-white mr-3 sm:mr-4 flex items-center justify-center rounded-lg shadow-sm">
                          {getBankLogo(payment.bank)}
                        </div>
                        <div className="overflow-hidden">
                          <p className="text-purple-700 font-semibold text-xs sm:text-sm truncate">
                            No. Rekening: {payment.rekening}
                          </p>
                          <p className="text-purple-700 text-xs sm:text-sm truncate">
                            Nama Bank: {payment.bank}
                          </p>
                          <p className="text-purple-700 text-xs sm:text-sm truncate">
                            Atas Nama: {payment.nama}
                          </p>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      </motion.div>
    </div>
  );
}

export default Invoice;