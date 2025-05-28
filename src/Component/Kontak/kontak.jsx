import React, { useState } from "react";
import { motion } from 'framer-motion';
import { FiPhone, FiMail, FiMapPin, FiMessageCircle, FiUsers, FiArrowRight, FiLink } from 'react-icons/fi';

const Kontak = () => {
  const [activeTab, setActiveTab] = useState('contact');

  const fadeUp = {
    initial: { opacity: 0, y: 30 },
    animate: { opacity: 1, y: 0, transition: { duration: 0.7, ease: 'easeOut' } },
    exit: { opacity: 0, y: 30, transition: { duration: 0.5 } },
  };

  const staggerContainer = {
    animate: {
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const contactData = [
    {
      title: "Science Writing Competition",
      contacts: [
        { name: "Faudhotul", role: "Koordinator", phone: "+6285850817023" },
        { name: "Gita", role: "Wakil Koordinator", phone: "+628887060380" }
      ]
    },
    {
      title: "Science Competition",
      contacts: [
        { name: "Nisa", role: "Koordinator", phone: "+6287876440866" },
        { name: "Zaky", role: "Wakil Koordinator", phone: "+62087758375435" }
      ]
    }
  ];

  const openWhatsapp = (phone) => {
    const url = `https://wa.me/${phone.replace(/\+/g, "")}`;
    window.open(url, "_blank");
  };

  return (
    <div className="bg-gradient-to-b from-[#210034] via-[#3a0061] to-[#1a002b] min-h-screen relative overflow-hidden">
      {/* Decorative Elements */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden opacity-30 z-0">
        <div className="absolute top-0 right-0 w-96 h-96 bg-purple-600 rounded-full filter blur-3xl opacity-20"></div>
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-purple-500 rounded-full filter blur-3xl opacity-20"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-indigo-500 rounded-full filter blur-3xl opacity-10"></div>
        
        <svg className="absolute top-0 left-0 w-full h-full" width="100%" height="100%" viewBox="0 0 100 100" preserveAspectRatio="none">
          <defs>
            <radialGradient id="dots" cx="50%" cy="50%" r="50%" gradientUnits="userSpaceOnUse">
              <stop offset="0%" stopColor="#fff" stopOpacity="0.1" />
              <stop offset="100%" stopColor="#fff" stopOpacity="0" />
            </radialGradient>
          </defs>
          {Array.from({ length: 50 }).map((_, i) => (
            <circle
              key={i}
              cx={Math.random() * 100}
              cy={Math.random() * 100}
              r="0.2"
              fill="#fff"
              opacity={Math.random() * 0.4 + 0.1}
            />
          ))}
        </svg>
      </div>

      <div className="relative z-10">
        {/* Hero Section */}
        <motion.div
          className="w-full pt-16 pb-12 sm:pt-24 sm:pb-16"
          variants={fadeUp}
          initial="initial"
          animate="animate"
          exit="exit"
        >
          <div className="container max-w-6xl mx-auto px-4 sm:px-6">
            {/* Header */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.5 }}
              className="text-center mb-10 sm:mb-16"
            >
              
              <h1 className="font-bold text-4xl sm:text-5xl lg:text-6xl leading-tight mb-4 sm:mb-6 text-white">
                Hubungi <span className="bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-pink-400">Kami</span>
              </h1>
              <motion.p 
                className="text-base sm:text-lg max-w-2xl mx-auto text-purple-100 leading-relaxed opacity-90 px-4"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5, duration: 0.8 }}
              >
                Jangan ragu untuk menghubungi tim kami untuk informasi lebih lanjut terkait kompetisi dan pendaftaran
              </motion.p>
            </motion.div>

            {/* Tabs - More Mobile Friendly */}
            <div className="max-w-sm sm:max-w-md rounded-full mx-auto mb-8 sm:mb-12 px-4">
              <div className="bg-purple-900 bg-opacity-40 backdrop-blur-sm p-1 rounded-full flex shadow-lg">
                <button 
                  onClick={() => setActiveTab('contact')} 
                  className={`flex-1 py-2 sm:py-3 px-2 sm:px-4 rounded-full text-center transition-all duration-300 text-sm sm:text-base ${activeTab === 'contact' ? 'bg-gradient-to-r from-purple-600 to-indigo-600 text-white shadow-md' : 'text-purple-200 hover:text-white'}`}
                >
                  Info Kontak
                </button>
                <button 
                  onClick={() => setActiveTab('person')} 
                  className={`flex-1 py-2 sm:py-3 px-2 sm:px-4 rounded-full text-center transition-all duration-300 text-sm sm:text-base ${activeTab === 'person' ? 'bg-gradient-to-r from-purple-600 to-indigo-600 text-white shadow-md' : 'text-purple-200 hover:text-white'}`}
                >
                  Kontak Person
                </button>
              </div>
            </div>

            {/* Main Content */}
            <div className="flex flex-col gap-8 px-4">
              {/* Contact Info Tab */}
              {activeTab === 'contact' && (
                <motion.div
                  className="w-full"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6 }}
                >
                  <div className="bg-purple-900 bg-opacity-40 backdrop-blur-sm p-5 sm:p-8 rounded-2xl shadow-xl border border-purple-700/50 h-full relative overflow-hidden">
                    <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-br from-purple-500/20 to-indigo-500/10 rounded-full filter blur-3xl transform translate-x-1/2 -translate-y-1/2"></div>
                    
                    <h3 className="text-2xl sm:text-3xl font-bold text-white mb-6 sm:mb-8 relative">Informasi Kontak</h3>
                    
                    <div className="space-y-6 sm:space-y-8 relative z-10">
                      <motion.div 
                        className="flex items-start sm:items-center transform hover:translate-x-2 duration-300"
                        whileHover={{ scale: 1.02 }}
                      >
                        <div className="w-12 h-12 sm:w-14 sm:h-14 flex-shrink-0 flex items-center justify-center bg-gradient-to-br from-purple-600 to-indigo-600 rounded-xl mr-4 sm:mr-5 shadow-lg">
                          <FiMapPin className="text-white text-xl sm:text-2xl" />
                        </div>
                        <div>
                          <h3 className="text-base sm:text-lg font-semibold text-white">Lokasi</h3>
                          <p className="text-purple-200 hover:text-white transition-colors duration-300 text-sm sm:text-base">Sekretariat Ormawa Himpunan Mahasiswa Prodi Pendidikan IPA FMIPA Unesa</p>
                        </div>
                      </motion.div>
                      
                      <motion.div 
                        className="flex items-start sm:items-center transform hover:translate-x-2 duration-300"
                        whileHover={{ scale: 1.02 }}
                      >
                        <div className="w-12 h-12 sm:w-14 sm:h-14 flex-shrink-0 flex items-center justify-center bg-gradient-to-br from-purple-600 to-indigo-600 rounded-xl mr-4 sm:mr-5 shadow-lg">
                          <FiUsers className="text-white text-xl sm:text-2xl" />
                        </div>
                        <div className="w-full">
                          <h3 className="text-base sm:text-lg font-semibold text-white">Sosial Media</h3>
                          <div className="flex flex-wrap gap-2 sm:gap-4 mt-2">
                            <a href="https://www.instagram.com/gisfmipaunesa/" className="flex items-center text-purple-300 hover:text-white transition-colors duration-300 text-sm sm:text-base">
                              <span className="bg-purple-700/40 p-1 sm:p-2 rounded-full mr-1 sm:mr-2">
                                <FiLink className="w-3 h-3 sm:w-4 sm:h-4" />
                              </span>
                              Instagram
                            </a>
                            <a href="https://www.instagram.com/hmppipaunesa/" className="flex items-center text-purple-300 hover:text-white transition-colors duration-300 text-sm sm:text-base">
                              <span className="bg-purple-700/40 p-1 sm:p-2 rounded-full mr-1 sm:mr-2">
                                <FiLink className="w-3 h-3 sm:w-4 sm:h-4" />
                              </span>
                              Instagram
                            </a>
                            <a href="https://www.tiktok.com/@gisfmipaunesa" className="flex items-center text-purple-300 hover:text-white transition-colors duration-300 text-sm sm:text-base">
                              <span className="bg-purple-700/40 p-1 sm:p-2 rounded-full mr-1 sm:mr-2">
                                <FiLink className="w-3 h-3 sm:w-4 sm:h-4" />
                              </span>
                              Tiktok
                            </a>
                          </div>
                        </div>
                      </motion.div>
                    </div>
                    
                    <div className="mt-8 sm:mt-12 pt-6 sm:pt-8 border-t border-purple-700/30">
                      <div className="bg-gradient-to-r from-purple-800/60 to-indigo-800/60 rounded-xl p-4 sm:p-6 backdrop-blur-sm">
                        <h4 className="text-lg sm:text-xl font-semibold text-white mb-3">Jam Operasional</h4>
                        <div className="grid grid-cols-2 gap-2 text-sm sm:text-base">
                          <div className="text-purple-200">Senin - Minggu</div>
                          <div className="text-white">08:00 - 17:00 WIB</div>
                        </div>
                      </div>
                    </div>
                  </div>
                </motion.div>
              )}
              
              {/* Contact Person Tab */}
              {activeTab === 'person' && (
                <motion.div
                  className="w-full"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6 }}
                >
                  <div className="bg-purple-900 bg-opacity-40 backdrop-blur-sm p-5 sm:p-8 rounded-2xl shadow-xl border border-purple-700/50 h-full">
                    <h3 className="text-2xl sm:text-3xl font-bold text-white mb-6 sm:mb-8">Kontak Person</h3>
                    <div className="space-y-6 sm:space-y-8">
                      {contactData.map((section, sectionIndex) => (
                        <motion.div 
                          key={sectionIndex}
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: 0.2 * sectionIndex, duration: 0.5 }}
                        >
                          <div className="inline-block px-3 py-1 sm:px-4 sm:py-2 rounded-lg bg-gradient-to-r from-purple-600 to-indigo-600 text-white font-semibold mb-3 sm:mb-4 shadow-md text-sm sm:text-base">
                            {section.title}
                          </div>
                          <div className="grid grid-cols-1 gap-4">
                            {section.contacts.map((contact, contactIndex) => (
                              <motion.div 
                                key={contactIndex} 
                                className="bg-purple-800/40 backdrop-blur-sm rounded-xl shadow-lg overflow-hidden border border-purple-700/50"
                                whileHover={{ 
                                  scale: 1.02,
                                  boxShadow: "0 10px 25px -5px rgba(66, 30, 118, 0.5)" 
                                }}
                                transition={{ duration: 0.3 }}
                              >
                                <div className="p-4 sm:p-6">
                                  <div className="flex items-center mb-4">
                                    <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-gradient-to-br from-purple-500 to-indigo-500 flex items-center justify-center text-white font-bold text-lg sm:text-xl shadow-lg">
                                      {contact.name.charAt(0)}
                                    </div>
                                    <div className="ml-3 sm:ml-4">
                                      <div className="text-white font-semibold text-base sm:text-lg">{contact.name}</div>
                                      <div className="text-purple-300 text-sm sm:text-base">{contact.role}</div>
                                    </div>
                                  </div>
                                  <div className="bg-purple-700/30 rounded-lg p-3 mb-4">
                                    <div className="text-purple-200 text-xs sm:text-sm mb-1">Nomor Telepon:</div>
                                    <div className="text-white font-medium text-sm sm:text-base">{contact.phone}</div>
                                  </div>
                                  <button
                                    onClick={() => openWhatsapp(contact.phone)}
                                    className="w-full flex items-center justify-center bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 text-white py-2 sm:py-3 px-4 sm:px-6 rounded-lg transition-all duration-300 shadow-lg hover:shadow-xl text-sm sm:text-base"
                                  >
                                    <FiMessageCircle size={16} className="mr-2" />
                                    Hubungi via WhatsApp
                                    <FiArrowRight className="ml-2" />
                                  </button>
                                </div>
                              </motion.div>
                            ))}
                          </div>
                        </motion.div>
                      ))}
                    </div>
                  </div>
                </motion.div>
              )}
            </div>
          </div>
        </motion.div>

        {/* Call to Action */}
        <motion.section 
          className="py-10 sm:py-16"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <div className="max-w-4xl mx-auto px-4 sm:px-6">
            <div className="bg-gradient-to-r from-purple-600/20 to-indigo-600/20 backdrop-blur-md rounded-2xl p-6 sm:p-8 shadow-xl border border-purple-500/30 text-center">
              <h3 className="text-xl sm:text-2xl md:text-3xl font-bold text-white mb-3 sm:mb-4">Siap Untuk Berpartisipasi?</h3>
              <p className="text-purple-200 mb-6 sm:mb-8 max-w-2xl mx-auto text-sm sm:text-base">Daftarkan diri Anda sekarang dan jadi bagian dari kompetisi sains nasional terbesar tahun ini!</p>
              <a
                href="../../auth/daftar"
                className="inline-flex items-center px-6 sm:px-8 py-3 sm:py-4 bg-gradient-to-r from-purple-500 to-indigo-500 hover:from-purple-600 hover:to-indigo-600 text-white font-semibold rounded-lg shadow-lg transition-all duration-300 transform hover:-translate-y-1 text-sm sm:text-base"
              >
                Daftar Sekarang
                <FiArrowRight className="ml-2" />
              </a>
            </div>
          </div>
        </motion.section>

        {/* Footer - More Mobile Friendly */}
        <div className="bg-[#1a002b]/80 backdrop-blur-md text-purple-300 py-8 sm:py-10 border-t border-purple-800/30">
          <div className="container mx-auto px-4 sm:px-6">
            <div className="flex flex-col md:flex-row justify-between items-center">
              <div className="mb-6 md:mb-0 text-center md:text-left">
                <div className="font-bold text-xl sm:text-2xl text-white mb-2">Science Competition</div>
                <p className="text-purple-300 max-w-md text-sm sm:text-base">Mendorong inovasi dan kecintaan terhadap sains di kalangan generasi muda Indonesia.</p>
              </div>
              <div className="text-center md:text-right">
                <p className="text-sm sm:text-base">&copy; {new Date().getFullYear()} Science Competition. All rights reserved.</p>
                <div className="flex justify-center md:justify-end space-x-4 mt-3 text-xs sm:text-sm">
                  <a href="#" className="text-purple-300 hover:text-white transition-colors duration-300">Kebijakan Privasi</a>
                  <a href="#" className="text-purple-300 hover:text-white transition-colors duration-300">Syarat & Ketentuan</a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Kontak;