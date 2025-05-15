import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import api from '../../configs/api'; // Import API configuration

function Invoice() {
  const [showUploadForm, setShowUploadForm] = useState(false);
  const [showConfirmationPage, setShowConfirmationPage] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);
  const [invoices, setInvoices] = useState([]);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoaded(true);
    }, 100);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    getInvoices();
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

  const getInvoices = async () => {
    try {
      const response = await fetch(`${api.URL_API}/api/invoices/byAuth`, {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`,
          'Content-Type': 'application/json',
        },
        credentials: 'include',
      });

      if (response.ok) {
        const data = await response.json();
        setInvoices(data); // Simpan data invoice ke state
      } else {
        console.error('Gagal mendapatkan data invoice:', response.statusText);
      }
    } catch (error) {
      console.error('Terjadi kesalahan saat memuat data invoice:', error);
    }
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

  const tableRowVariants = {
    hidden: { opacity: 0, x: -10 }, 
    visible: {
      opacity: 1,
      x: 0,
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
  
  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-purple-100 overflow-hidden">
      {/* Decorative Elements - Simplified */}
      <div className="fixed inset-0 pointer-events-none">
        <motion.div 
          className="absolute top-1/3 right-10 w-80 h-80 rounded-full bg-purple-300 mix-blend-multiply filter blur-3xl opacity-20"
          animate={bgAnimation}
          transition={bgTransition}
        />
        <motion.div 
          className="absolute bottom-1/4 left-10 w-64 h-64 rounded-full bg-indigo-400 mix-blend-multiply filter blur-3xl opacity-20"
          animate={bgAnimation}
          transition={{...bgTransition, delay: 2}}
        />
      </div>

      {/* Fixed Navigation Bar - Simplified animations */}
      <motion.nav 
        className="fixed top-0 left-0 right-0 bg-white shadow-md z-50"
        initial={{ y: -50 }} // Reduced from -100
        animate={{ y: 0 }}
        transition={{ type: "spring", stiffness: 300, damping: 20 }}
      >
        <div className="max-w-6xl mx-auto px-4">
          <div className="flex justify-between items-center py-4">
            <div className="flex items-center space-x-2">
              <Link to="/" className="font-bold text-xl text-purple-800 flex items-center">
                <img 
                  src="/src/assets/hmpti.png" 
                  alt="Logo GIS" 
                  className="w-10 h-10 mr-2"
                />
                <span>Gebyar Ilmiah Sains</span>
              </Link>
            </div>
            <div className="hidden md:flex items-center space-x-8">
              {["invoice", "panduan", "bantuan", "cbt"].map((item) => (
                <Link 
                  key={item}
                  to={`/dashboard/user/${item}`} 
                  className={`text-purple-800 hover:text-purple-600 font-medium transition duration-300 ease-in-out ${
                    item === "invoice" ? "border-b-2 border-purple-600" : ""
                  }`}
                >
                  {item.charAt(0).toUpperCase() + item.slice(1)}
                </Link>
              ))}
            </div>
            <div className="md:hidden flex items-center">
              <button 
                className="outline-none mobile-menu-button"
                onClick={toggleMenu}
              >
                <svg className="w-6 h-6 text-purple-800" fill="none" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24" stroke="currentColor">
                  <path d={isMenuOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"}></path>
                </svg>
              </button>
            </div>
          </div>
        </div>
        
        {/* Mobile Menu - Simplified animations */}
        <AnimatePresence>
          {isMenuOpen && (
            <motion.div 
              className="md:hidden bg-white pb-4 shadow-inner"
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.2 }} // Faster transition
            >
              <div className="flex flex-col space-y-4 px-4">
                {["invoice", "panduan", "bantuan", "cbt"].map((item) => (
                  <Link 
                    key={item}
                    to={`/dashboard/user/${item}`} 
                    className={`text-purple-800 hover:text-purple-600 font-medium py-2 border-b border-gray-100 ${
                      item === "invoice" ? "border-l-4 border-l-purple-600" : ""
                    }`}
                  >
                    {item.charAt(0).toUpperCase() + item.slice(1)}
                  </Link>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.nav>

      {/* Main Content */}
      <motion.div 
        className="p-8 pt-24 flex items-center justify-center min-h-screen"
        variants={containerVariants}
        initial="hidden"
        animate={isLoaded ? "visible" : "hidden"}
      >
        <motion.div 
          className="bg-white rounded-2xl shadow-lg p-6 max-w-4xl w-full"
          variants={cardVariants}
        >
          <AnimatePresence mode="wait">
            {showConfirmationPage ? (
              // Confirmation Page - Simplified animations
              <motion.div
                key="confirmation"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.2 }}
              >
                <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded relative mb-6 flex justify-between items-center">
                  <span className="font-bold">Berhasil Mengupload Bukti Pembayaran</span>
                  <button
                    onClick={handleCloseConfirmation}
                    className="text-green-700 font-bold hover:text-green-900"
                  >
                    &times;
                  </button>
                </div>
                <table className="w-full border-collapse border rounded-lg overflow-hidden shadow-md mb-6">
                  <thead className="bg-purple-700 text-white">
                    <tr>
                      <th className="border p-3">No</th>
                      <th className="border p-3">Kode Bayar</th>
                      <th className="border p-3">Status</th>
                      <th className="border p-3">Tanggal Upload</th>
                      <th className="border p-3">Opsi</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="hover:bg-purple-50 transition-colors">
                      <td className="border p-3 text-center">1</td>
                      <td className="border p-3 text-center">INV001</td>
                      <td className="border p-3 text-center">
                        <span className="text-green-600 font-semibold">Terupload</span>
                      </td>
                      <td className="border p-3 text-center">20/04/2025</td>
                      <td className="border p-3 text-center">
                        <button className="bg-purple-600 text-white px-4 py-2 rounded-lg hover:bg-purple-700 transition-colors">
                          Hubungi Admin
                        </button>
                      </td>
                    </tr>
                  </tbody>
                </table>
                <div className="bg-purple-50 p-6 rounded-lg shadow-md border border-purple-100">
                  <h3 className="font-bold text-lg mb-4 text-purple-800">Konfirmasi</h3>
                  <p className="text-purple-700 mb-2">
                    Peserta yang telah melakukan pembayaran dapat melakukan konfirmasi peserta melalui WhatsApp ke:
                  </p>
                  <ul className="list-disc pl-6 text-purple-700">
                    <li>Contact Person pada nomor 0XXXX (Dina) atau 0XXXX (Yuna)</li>
                    <li>Mengirimkan foto bukti pembayaran</li>
                    <li>Mengirimkan foto bukti screenshot upload bukti pembayaran di aplikasi</li>
                  </ul>
                </div>
                <div className="flex justify-center mt-6">
                  <motion.button
                    onClick={handleBackToHome}
                    className="bg-purple-600 text-white px-6 py-2 rounded-lg hover:bg-purple-700 transition-colors"
                    whileHover={{ scale: 1.03 }}
                    whileTap={{ scale: 0.97 }}
                    transition={{ type: "spring", stiffness: 400 }}
                  >
                    Kembali ke Halaman Utama
                  </motion.button>
                </div>
              </motion.div>
            ) : showUploadForm ? (
              // Upload Form - Simplified animations
              <motion.div
                key="uploadForm"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.2 }} 
              >
                <h2 className="text-2xl font-bold mb-6 text-purple-800 text-center">
                  Upload Bukti Pembayaran
                </h2>
                <div className="space-y-4">
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
                          <option value="Bank ABC">Bank ABC</option>
                          <option value="Bank XYZ">Bank XYZ</option>
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
                      <label className="block font-semibold text-purple-700 mb-2">
                        {field.label}
                      </label>
                      {field.component}
                    </div>
                  ))}
                </div>
                <div className="flex justify-between mt-6">
                  <motion.button
                    onClick={handleBackToInvoice}
                    className="bg-gray-200 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-300 transition-colors"
                    whileHover={{ scale: 1.03 }}
                    whileTap={{ scale: 0.97 }}
                    transition={{ type: "spring", stiffness: 400 }}
                  >
                    Kembali
                  </motion.button>
                  <motion.button
                    onClick={handleUpload}
                    className="bg-purple-600 text-white px-6 py-2 rounded-lg hover:bg-purple-700 transition-colors"
                    whileHover={{ scale: 1.03 }}
                    whileTap={{ scale: 0.97 }}
                    transition={{ type: "spring", stiffness: 400 }}
                  >
                    Upload
                  </motion.button>
                </div>
              </motion.div>
            ) : (
              // Invoice Table - Simplified animations
              <motion.div
                key="invoiceTable"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.2 }}
              >
                <h2 className="text-2xl font-bold mb-6 text-purple-800 text-center">
                  Invoice / Menunggu Pembayaran
                </h2>

                {/* Search */}
                <div className="mb-6 flex items-center justify-center">
                  <div className="relative w-64">
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

                {/* Table */}
                <table className="w-full border-collapse border rounded-lg overflow-hidden shadow-md">
                  <thead className="bg-purple-700 text-white">
                    <tr>
                      <th className="border p-3">No</th>
                      <th className="border p-3">Kode Bayar</th>
                      <th className="border p-3">Status</th>
                      <th className="border p-3">Total Pembayaran</th>
                      <th className="border p-3">Upload Bukti</th>
                    </tr>
                  </thead>
                  <tbody>
                    {invoices.length > 0 ? (
                      invoices.map((invoice, index) => (
                        <tr key={invoice.id} className="hover:bg-purple-50 transition-colors">
                          <td className="border p-3 text-center">{index + 1}</td>
                          <td className="border p-3 text-center">{invoice.kode_bayar}</td>
                          <td className="border p-3 text-center">
                            <span
                              className={`font-semibold ${
                                invoice.status === 'paid' ? 'text-green-600' : 'text-amber-500'
                              }`}
                            >
                              {invoice.status === 'paid' ? 'Lunas' : 'Menunggu'}
                            </span>
                          </td>
                          <td className="border p-3 text-center">
                            Rp {invoice.total_pembayaran.toLocaleString('id-ID', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                          </td>
                          <td className="border p-3 text-center">
                            {invoice.status !== 'paid' && (
                              <motion.button
                                onClick={handleShowUploadForm}
                                className="bg-purple-600 text-white px-4 py-2 rounded-lg hover:bg-purple-700 transition-colors"
                                whileHover={{ scale: 1.03 }}
                                whileTap={{ scale: 0.97 }}
                                transition={{ type: "spring", stiffness: 400 }}
                              >
                                Upload Bukti
                              </motion.button>
                            )}
                          </td>
                        </tr>
                      ))
                    ) : (
                      <tr>
                        <td colSpan="5" className="border p-3 text-center text-gray-500">
                          Tidak ada data invoice.
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>

                {/* Payment Methods - Simplified */}
                <div className="mt-8 bg-purple-50 p-6 rounded-lg shadow-md mx-auto max-w-lg border border-purple-100">
                  <h3 className="font-bold text-lg mb-4 text-purple-800 text-center">
                    Metode Pembayaran
                  </h3>
                  {[
                    {
                      rekening: "12345678",
                      bank: "Bank ABC",
                      nama: "MASYITA IKA SAHARA"
                    },
                    {
                      rekening: "0987654321",
                      bank: "Bank XYZ",
                      nama: "MASYITA IKA SAHARA"
                    }
                  ].map((payment, index) => (
                    <div 
                      key={index}
                      className={`flex items-center ${index === 0 ? "mb-4" : ""} bg-white p-3 rounded-lg border border-purple-100`}
                    >
                      <div className="w-16 h-16 bg-purple-100 mr-4 flex items-center justify-center rounded-lg">
                        <img 
                          src="/src/assets/hmpti.png" 
                          alt="Logo GIS" 
                          className="w-10 h-10"
                        />
                      </div>
                      <div>
                        <p className="text-purple-700 font-semibold">
                          No. Rekening: {payment.rekening}
                        </p>
                        <p className="text-purple-700">
                          Nama Bank: {payment.bank}
                        </p>
                        <p className="text-purple-700">
                          Atas Nama: {payment.nama}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      </motion.div>
      
      {/* Footer - Simplified */}
      <footer className="bg-gray-800 text-white py-4 text-center text-sm">
        <div>
          © {new Date().getFullYear()} Universitas Negeri Surabaya. All Rights Reserved.
        </div>
      </footer>
    </div>
  );
}

export default Invoice;