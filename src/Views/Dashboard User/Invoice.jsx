import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import api from '../../configs/api'; // Import API configuration

function Invoice() {
  const [showUploadForm, setShowUploadForm] = useState(false);
  const [showConfirmationPage, setShowConfirmationPage] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  const [invoices, setInvoices] = useState([]);
  const [selectedInvoice, setSelectedInvoice] = useState(null);
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState('');
  const [uploadFile, setUploadFile] = useState(null);

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

  useEffect(() => {
    getInvoices();
  }, []);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const handleShowUploadForm = (invoice) => {
    setSelectedInvoice(invoice);
    setShowUploadForm(true);
  };

  const handleBackToInvoice = () => {
    setShowUploadForm(false);
    setSelectedInvoice(null);
  };

  const handleUpload = async () => {
    if (!selectedInvoice || !selectedPaymentMethod || !uploadFile) {
      alert("Harap lengkapi metode pembayaran dan unggah bukti pembayaran.");
      return;
    }

    const formData = new FormData();
    formData.append("_method", "PUT"); // Spoofing method
    formData.append("user_id", selectedInvoice.user_id); // Tambahkan user_id jika diperlukan
    formData.append("kode_bayar", selectedInvoice.kode_bayar);
    formData.append("status", "pending"); // Status diubah menjadi "pending"
    formData.append("total_pembayaran", selectedInvoice.total_pembayaran);
    formData.append("upload_bukti", uploadFile);

    try {
      const response = await fetch(`${api.URL_API}/api/invoices/${selectedInvoice.id}`, {
        method: "POST", // Ganti dari PUT ke POST
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: formData,
      });

      if (response.ok) {
        const updatedInvoice = await response.json();
        alert("Bukti pembayaran berhasil diunggah!");
        setShowUploadForm(false);
        setShowConfirmationPage(true);

        // Perbarui data invoice di state
        setInvoices((prevInvoices) =>
          prevInvoices.map((invoice) =>
            invoice.id === updatedInvoice.id ? updatedInvoice : invoice
          )
        );
      } else {
        const errorData = await response.json();
        console.error("Gagal mengunggah bukti pembayaran:", errorData);
        alert("Gagal mengunggah bukti pembayaran. Silakan coba lagi.");
      }
    } catch (error) {
      console.error("Terjadi kesalahan saat mengunggah bukti pembayaran:", error);
      alert("Terjadi kesalahan. Silakan coba lagi.");
    }
  };

  const handleCloseConfirmation = () => {
    setShowConfirmationPage(false);
    window.location.href = '/dashboard/user/invoice';
  };

  const handleBackToHome = () => {
    setShowConfirmationPage(false);
    window.location.href = '/dashboard/user/invoice';
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
            <img src="/src/assets/bca.png" alt="BCA Logo" className="w-8 h-8"></img>
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

      {/* Fixed Navigation Bar - Responsive */}
      <motion.nav 
        className="fixed top-0 left-0 right-0 bg-white shadow-md z-50"
        initial={{ y: -20 }}
        animate={{ y: 0 }}
        transition={{ type: "spring", stiffness: 300, damping: 20 }}
      >
        <div className="max-w-6xl mx-auto px-4">
          <div className="flex justify-between items-center py-3 md:py-4">
            <div className="flex items-center">
              <Link to="/" className="font-bold text-lg sm:text-xl text-purple-800 flex items-center">
                <img 
                  src="/src/assets/logomascot.png" 
                  alt="Logo GIS" 
                  className="w-8 h-8 sm:w-10 sm:h-10 mr-2"
                />
                <span className="hidden xs:inline">Gebyar Ilmiah Sains</span>
                <span className="xs:hidden">Gebyar Ilmiah Sains</span>
              </Link>
            </div>
            <div className="hidden md:flex items-center space-x-3 lg:space-x-8">
              {["invoice", "bantuan", "cbt"].map((item) => (
                <Link 
                  key={item}
                  to={`/dashboard/user/${item}`} 
                  className={`text-sm lg:text-base text-purple-800 hover:text-purple-600 font-medium transition duration-300 ease-in-out ${
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
                aria-label="Toggle menu"
              >
                <svg className="w-6 h-6 text-purple-800" fill="none" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24" stroke="currentColor">
                  <path d={isMenuOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"}></path>
                </svg>
              </button>
            </div>
          </div>
        </div>
        
        {/* Mobile Menu - Improved animation */}
        <AnimatePresence>
          {isMenuOpen && (
            <motion.div 
              className="md:hidden bg-white shadow-inner"
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.2 }}
            >
              <div className="flex flex-col space-y-2 px-4 py-2">
                {["invoice", "bantuan", "cbt"].map((item) => (
                  <Link 
                    key={item}
                    to={`/dashboard/user/${item}`} 
                    className={`text-purple-800 hover:text-purple-600 font-medium py-2 border-b border-gray-100 ${
                      item === "invoice" ? "border-l-4 border-l-purple-600 pl-2" : ""
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
                {selectedInvoice && (
                <div className="overflow-x-auto bg-white rounded-lg shadow">
                  <table className="w-full border-collapse rounded-lg overflow-hidden">
                    <thead className="bg-purple-700 text-white">
                      <tr>
                        <th className="border p-2 sm:p-3 text-xs sm:text-sm">Kode Bayar</th>
                        <th className="border p-2 sm:p-3 text-xs sm:text-sm">Total Bayar</th>
                        <th className="border p-2 sm:p-3 text-xs sm:text-sm">Status</th>
                        <th className="border p-2 sm:p-3 text-xs sm:text-sm">Tanggal Upload</th>
                        <th className="border p-2 sm:p-3 text-xs sm:text-sm">Opsi</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr className="hover:bg-purple-50 transition-colors">
                        <td className="border p-2 sm:p-3 text-center text-xs sm:text-sm">{selectedInvoice.kode_bayar}</td>
                        <td className="border p-2 sm:p-3 text-center text-xs sm:text-sm">Rp {selectedInvoice.total_pembayaran.toLocaleString()}</td>
                        <td className="border p-2 sm:p-3 text-center text-xs sm:text-sm">
                          <span className="text-amber-500 font-semibold">{selectedInvoice.status || "Menunggu"}</span>
                        </td>
                        <td className="border p-2 sm:p-3 text-center text-xs sm:text-sm">{new Date(selectedInvoice.created_at).toLocaleDateString('id-ID')}</td>
                        <td className="border p-2 sm:p-3 text-center">
                          <button className="bg-purple-600 text-white px-2 py-1 sm:px-4 sm:py-2 rounded text-xs sm:text-sm hover:bg-purple-700 transition-colors">
                            Hubungi Admin
                          </button>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
                )}
                
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
            ) : showUploadForm && selectedInvoice ? (
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
                  {/* Informasi yang tidak dapat diubah */}
                  <div>
                    <label className="block font-semibold text-purple-700 mb-1 sm:mb-2 text-sm sm:text-base">
                      Kode Bayar
                    </label>
                    <input
                      type="text"
                      value={selectedInvoice.kode_bayar}
                      readOnly
                      className="w-full border border-purple-200 p-2 rounded-lg bg-gray-100 text-gray-700"
                    />
                  </div>
                  <div>
                    <label className="block font-semibold text-purple-700 mb-1 sm:mb-2 text-sm sm:text-base">
                      Total Pembayaran
                    </label>
                    <input
                      type="text"
                      value={`Rp ${selectedInvoice.total_pembayaran.toLocaleString()}`}
                      readOnly
                      className="w-full border border-purple-200 p-2 rounded-lg bg-gray-100 text-gray-700"
                    />
                  </div>
                  <div>
                    <label className="block font-semibold text-purple-700 mb-1 sm:mb-2 text-sm sm:text-base">
                      Tanggal Dibuat
                    </label>
                    <input
                      type="text"
                      value={new Date(selectedInvoice.created_at).toLocaleDateString('id-ID')}
                      readOnly
                      className="w-full border border-purple-200 p-2 rounded-lg bg-gray-100 text-gray-700"
                    />
                  </div>

                  {/* Input yang dapat diubah */}
                  <div>
                    <label className="block font-semibold text-purple-700 mb-1 sm:mb-2 text-sm sm:text-base">
                      Metode Pembayaran
                    </label>
                    <select
                      className="w-full border border-purple-200 p-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                      onChange={(e) => setSelectedPaymentMethod(e.target.value)}
                    >
                      <option value="">Pilih metode pembayaran</option>
                      <option value="Bank ABC">Bank ABC</option>
                      <option value="Bank XYZ">Bank XYZ</option>
                    </select>
                  </div>
                  <div>
                    <label className="block font-semibold text-purple-700 mb-1 sm:mb-2 text-sm sm:text-base">
                      Bukti Pembayaran
                    </label>
                    <div className="border-2 border-dashed border-purple-200 rounded-lg p-4 text-center hover:border-purple-300 transition-colors">
                      <input
                        type="file"
                        className="w-full text-sm text-gray-500"
                        onChange={(e) => setUploadFile(e.target.files[0])}
                      />
                      <p className="text-xs text-gray-500 mt-2">Upload file dalam format JPG, PNG, atau PDF (max 2MB)</p>
                    </div>
                  </div>
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
                        <th className="border p-2 sm:p-3 text-xs sm:text-sm">Tanggal Dibuat</th>
                        <th className="border p-2 sm:p-3 text-xs sm:text-sm">Opsi</th> {/* Tambahkan kolom untuk opsi */}
                      </tr>
                    </thead>
                    <tbody>
                      {invoices.length > 0 ? (
                        invoices.map((invoice, index) => (
                          <tr key={invoice.id} className="hover:bg-purple-50 transition-colors">
                            <td className="border p-2 sm:p-3 text-center text-xs sm:text-sm">{index + 1}</td>
                            <td className="border p-2 sm:p-3 text-center text-xs sm:text-sm">{invoice.kode_bayar}</td>
                            <td className="border p-2 sm:p-3 text-center text-xs sm:text-sm">
                              {invoice.status === null ? (
                                <span className="text-amber-500 font-semibold">Menunggu</span>
                              ) : invoice.status === "pending" ? (
                                <span className="text-amber-500 font-semibold">Segera Hubungi Admin</span>
                              ) : invoice.status === "approved" ? (
                                <span className="text-green-600 font-semibold">Diterima</span>
                              ) : (
                                <span className="text-gray-500 font-semibold">Status Tidak Diketahui</span>
                              )}
                            </td>
                            <td className="border p-2 sm:p-3 text-center text-xs sm:text-sm">Rp {invoice.total_pembayaran.toLocaleString()}</td>
                            <td className="border p-2 sm:p-3 text-center text-xs sm:text-sm">
                              {new Date(invoice.created_at).toLocaleDateString('id-ID')}
                            </td>
                            <td className="border p-2 sm:p-3 text-center text-xs sm:text-sm">
                              {invoice.status === null && (
                                <button
                                  onClick={() => handleShowUploadForm(invoice)} // Fungsi untuk membuka form upload
                                  className="bg-purple-600 text-white px-2 py-1 sm:px-4 sm:py-2 rounded text-xs sm:text-sm hover:bg-purple-700 transition-colors"
                                >
                                  Upload Bukti
                                </button>
                              )}
                              {invoice.status === "pending" && (
                                <button
                                  onClick={() => alert("Silakan hubungi admin untuk konfirmasi pembayaran.")}
                                  className="bg-amber-500 text-white px-2 py-1 sm:px-4 sm:py-2 rounded text-xs sm:text-sm hover:bg-amber-600 transition-colors"
                                >
                                  Hubungi Admin
                                </button>
                              )}
                            </td>
                          </tr>
                        ))
                      ) : (
                        <tr>
                          <td colSpan="6" className="border p-2 sm:p-3 text-center text-xs sm:text-sm">
                            Tidak ada data invoice.
                          </td>
                        </tr>
                      )}
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