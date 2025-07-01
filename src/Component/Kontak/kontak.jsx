import React, { useState } from "react";
import { motion, AnimatePresence } from 'framer-motion';
import { FiPhone, FiMail, FiMapPin, FiMessageCircle, FiUsers, FiArrowRight, FiLink, FiClock, FiInstagram } from 'react-icons/fi';

const Kontak = () => {
  const [activeTab, setActiveTab] = useState('contact');

  const fadeUp = {
    initial: { opacity: 0, y: 30 },
    animate: { opacity: 1, y: 0, transition: { duration: 0.6, ease: 'easeOut' } },
    exit: { opacity: 0, y: -20, transition: { duration: 0.4 } },
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

  const socialLinks = [
    { name: "GIS FMIPA Unesa", url: "https://www.instagram.com/gisfmipaunesa/", platform: "Instagram" },
    { name: "HMPPIPA Unesa", url: "https://www.instagram.com/hmppipaunesa/", platform: "Instagram" },
    { name: "GIS FMIPA Unesa", url: "https://www.tiktok.com/@gisfmipaunesa", platform: "TikTok" }
  ];

  const openWhatsapp = (phone) => {
    const cleanPhone = phone.replace(/\+/g, "").replace(/\s/g, "");
    const url = `https://wa.me/${cleanPhone}`;
    window.open(url, "_blank");
  };

  return (
    <div className="bg-[#210034] min-h-screen">
      {/* Background Elements */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-purple-500/20 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-indigo-500/20 rounded-full blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-purple-600/10 rounded-full blur-3xl"></div>
      </div>

      {/* Grid Pattern */}
      <div className="fixed inset-0 opacity-10 pointer-events-none">
        <div className="absolute inset-0" style={{
          backgroundImage: `radial-gradient(circle at 2px 2px, rgba(255,255,255,0.15) 1px, transparent 0)`,
          backgroundSize: '40px 40px'
        }}></div>
      </div>

      <div className="relative z-10">
        {/* Hero Section */}
        <motion.div
          className="pt-20 pb-12"
          variants={fadeUp}
          initial="initial"
          animate="animate"
        >
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            {/* Header */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.6 }}
              className="text-center mb-16"
            >
              
              
              <h1 className="font-bold text-4xl sm:text-5xl lg:text-6xl xl:text-7xl leading-tight mb-6 text-white">
                Hubungi{" "}
                <span className="bg-gradient-to-r from-purple-400 via-pink-400 to-indigo-400 bg-clip-text text-transparent">
                  Kami
                </span>
              </h1>
              
              <motion.p 
                className="text-lg sm:text-xl max-w-3xl mx-auto text-purple-200 leading-relaxed opacity-90"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.4, duration: 0.8 }}
              >
                Jangan ragu untuk menghubungi tim kami untuk informasi lebih lanjut terkait kompetisi dan pendaftaran
              </motion.p>
            </motion.div>

            {/* Enhanced Tabs */}
            <motion.div 
              className="max-w-md mx-auto mb-12"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.6 }}
            >
              <div className="bg-purple-900/40 backdrop-blur-md p-1.5 rounded-2xl border border-purple-700/50 shadow-2xl">
                <div className="flex">
                  <button 
                    onClick={() => setActiveTab('contact')} 
                    className={`flex-1 py-3 px-6 rounded-xl text-center transition-all duration-300 font-medium relative overflow-hidden ${
                      activeTab === 'contact' 
                        ? 'bg-gradient-to-r from-purple-600 to-indigo-600 text-white shadow-lg transform scale-105' 
                        : 'text-purple-300 hover:text-white hover:bg-purple-800/30'
                    }`}
                  >
                    <span className="relative z-10">Info Kontak</span>
                    {activeTab === 'contact' && (
                      <motion.div
                        className="absolute inset-0 bg-gradient-to-r from-purple-600 to-indigo-600 rounded-xl"
                        layoutId="activeTab"
                        transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                      />
                    )}
                  </button>
                  <button 
                    onClick={() => setActiveTab('person')} 
                    className={`flex-1 py-3 px-6 rounded-xl text-center transition-all duration-300 font-medium relative overflow-hidden ${
                      activeTab === 'person' 
                        ? 'bg-gradient-to-r from-purple-600 to-indigo-600 text-white shadow-lg transform scale-105' 
                        : 'text-purple-300 hover:text-white hover:bg-purple-800/30'
                    }`}
                  >
                    <span className="relative z-10">Narahubung</span>
                    {activeTab === 'person' && (
                      <motion.div
                        className="absolute inset-0 bg-gradient-to-r from-purple-600 to-indigo-600 rounded-xl"
                        layoutId="activeTab"
                        transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                      />
                    )}
                  </button>
                </div>
              </div>
            </motion.div>

            {/* Tab Content */}
            <AnimatePresence mode="wait">
              {activeTab === 'contact' && (
                <motion.div
                  key="contact"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.5 }}
                  className="max-w-4xl mx-auto"
                >
                  <div className="bg-white/5 backdrop-blur-xl rounded-3xl border border-purple-500/20 shadow-2xl overflow-hidden">
                    <div className="p-8 sm:p-12">
                      <h3 className="text-3xl sm:text-4xl font-bold text-white mb-10 text-center">
                        Informasi Kontak
                      </h3>
                      
                      <div className="grid md:grid-cols-2 gap-8 mb-10">
                        {/* Location */}
                        <motion.div 
                          className="group"
                          whileHover={{ y: -5 }}
                          transition={{ duration: 0.3 }}
                        >
                          <div className="bg-gradient-to-br from-purple-600/20 to-indigo-600/20 backdrop-blur-sm rounded-2xl p-6 border border-purple-500/30 h-full hover:border-purple-400/50 transition-all duration-300">
                            <div className="flex items-start space-x-4">
                              <div className="w-14 h-14 bg-gradient-to-br from-purple-500 to-indigo-500 rounded-xl flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300">
                                <FiMapPin className="text-white text-xl" />
                              </div>
                              <div className="flex-1">
                                <h4 className="text-xl font-semibold text-white mb-2">Lokasi</h4>
                                <p className="text-purple-200 leading-relaxed">
                                  Sekretariat Ormawa Himpunan Mahasiswa Prodi Pendidikan IPA FMIPA Unesa
                                </p>
                              </div>
                            </div>
                          </div>
                        </motion.div>

                        {/* Operating Hours */}
                        <motion.div 
                          className="group"
                          whileHover={{ y: -5 }}
                          transition={{ duration: 0.3 }}
                        >
                          <div className="bg-gradient-to-br from-purple-600/20 to-indigo-600/20 backdrop-blur-sm rounded-2xl p-6 border border-purple-500/30 h-full hover:border-purple-400/50 transition-all duration-300">
                            <div className="flex items-start space-x-4">
                              <div className="w-14 h-14 bg-gradient-to-br from-purple-500 to-indigo-500 rounded-xl flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300">
                                <FiClock className="text-white text-xl" />
                              </div>
                              <div className="flex-1">
                                <h4 className="text-xl font-semibold text-white mb-2">Jam Operasional</h4>
                                <div className="space-y-2">
                                  <div className="flex justify-between text-purple-200">
                                    <span>Senin - Minggu</span>
                                    <span className="text-white font-medium">08:00 - 17:00 WIB</span>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </motion.div>
                      </div>

                      {/* Social Media */}
                      <div className="bg-gradient-to-r from-purple-800/30 to-indigo-800/30 backdrop-blur-sm rounded-2xl p-6 border border-purple-500/30">
                        <div className="flex items-center space-x-4 mb-6">
                          <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-indigo-500 rounded-xl flex items-center justify-center shadow-lg">
                            <FiUsers className="text-white text-xl" />
                          </div>
                          <h4 className="text-xl font-semibold text-white">Sosial Media</h4>
                        </div>
                        <div className="grid sm:grid-cols-3 gap-4">
                          {socialLinks.map((social, index) => (
                            <motion.a
                              key={index}
                              href={social.url}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="flex items-center space-x-3 p-4 bg-purple-700/30 rounded-xl hover:bg-purple-600/40 transition-all duration-300 group"
                              whileHover={{ scale: 1.05 }}
                              whileTap={{ scale: 0.95 }}
                            >
                              <div className="w-10 h-10 bg-gradient-to-br from-purple-500 to-pink-500 rounded-lg flex items-center justify-center">
                                <FiInstagram className="text-white" />
                              </div>
                              <div className="flex-1 min-w-0">
                                <div className="text-white font-medium text-sm group-hover:text-purple-200 transition-colors">
                                  {social.name}
                                </div>
                                <div className="text-purple-300 text-xs">
                                  {social.platform}
                                </div>
                              </div>
                            </motion.a>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                </motion.div>
              )}

              {activeTab === 'person' && (
                <motion.div
                  key="person"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.5 }}
                  className="max-w-6xl mx-auto"
                >
                  <div className="bg-white/5 backdrop-blur-xl rounded-3xl border border-purple-500/20 shadow-2xl overflow-hidden">
                    <div className="p-8 sm:p-12">
                      <h3 className="text-3xl sm:text-4xl font-bold text-white mb-10 text-center">
                        Narahubung
                      </h3>
                      
                      <div className="space-y-10">
                        {contactData.map((section, sectionIndex) => (
                          <motion.div 
                            key={sectionIndex}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.1 * sectionIndex, duration: 0.6 }}
                          >
                            <div className="text-center mb-8">
                              <div className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-purple-600 to-indigo-600 rounded-full shadow-lg">
                                <span className="text-white font-semibold text-lg">{section.title}</span>
                              </div>
                            </div>
                            
                            <div className="grid md:grid-cols-2 gap-6">
                              {section.contacts.map((contact, contactIndex) => (
                                <motion.div 
                                  key={contactIndex} 
                                  className="group"
                                  whileHover={{ y: -5, scale: 1.02 }}
                                  transition={{ duration: 0.3 }}
                                >
                                  <div className="bg-gradient-to-br from-purple-800/40 to-indigo-800/40 backdrop-blur-sm rounded-2xl p-6 border border-purple-500/30 hover:border-purple-400/50 transition-all duration-300 shadow-xl">
                                    <div className="flex items-center space-x-4 mb-6">
                                      <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-purple-500 to-indigo-500 flex items-center justify-center text-white font-bold text-2xl shadow-lg group-hover:scale-110 transition-transform duration-300">
                                        {contact.name.charAt(0)}
                                      </div>
                                      <div>
                                        <div className="text-white font-bold text-xl">{contact.name}</div>
                                        <div className="text-purple-300 text-sm font-medium">{contact.role}</div>
                                      </div>
                                    </div>
                                    
                                    <div className="bg-purple-900/40 rounded-xl p-4 mb-6 border border-purple-600/20">
                                      <div className="text-purple-300 text-sm mb-1">Nomor Telepon:</div>
                                      <div className="text-white font-semibold text-lg">{contact.phone}</div>
                                    </div>
                                    
                                    <motion.button
                                      onClick={() => openWhatsapp(contact.phone)}
                                      className="w-full flex items-center justify-center space-x-3 bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 text-white py-4 px-6 rounded-xl font-semibold shadow-lg hover:shadow-xl transition-all duration-300"
                                      whileHover={{ scale: 1.05 }}
                                      whileTap={{ scale: 0.95 }}
                                    >
                                      <FiMessageCircle size={20} />
                                      <span>Hubungi via WhatsApp</span>
                                      <FiArrowRight />
                                    </motion.button>
                                  </div>
                                </motion.div>
                              ))}
                            </div>
                          </motion.div>
                        ))}
                      </div>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </motion.div>

        {/* CTA Section */}
        <motion.section 
          className="py-20"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="bg-gradient-to-r from-purple-600/20 via-indigo-600/20 to-purple-600/20 backdrop-blur-xl rounded-3xl p-8 sm:p-12 shadow-2xl border border-purple-500/30 text-center relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-r from-purple-600/10 to-indigo-600/10 rounded-3xl"></div>
              <div className="relative z-10">
                <motion.h3 
                  className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-6"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2, duration: 0.6 }}
                >
                  Siap Untuk Berpartisipasi?
                </motion.h3>
                <motion.p 
                  className="text-purple-200 mb-8 max-w-2xl mx-auto text-lg leading-relaxed"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4, duration: 0.6 }}
                >
                  Daftarkan diri Anda sekarang dan jadi bagian dari kompetisi sains nasional terbesar tahun ini!
                </motion.p>
                <motion.a
                  href="../../auth/daftar"
                  className="inline-flex items-center space-x-3 px-8 py-4 bg-gradient-to-r from-purple-500 to-indigo-500 hover:from-purple-600 hover:to-indigo-600 text-white font-bold rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 text-lg"
                  whileHover={{ scale: 1.05, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.6, duration: 0.6 }}
                >
                  <span>Daftar Sekarang</span>
                  <FiArrowRight />
                </motion.a>
              </div>
            </div>
          </div>
        </motion.section>

        {/* Footer */}
        <footer className="bg-purple-950/50 backdrop-blur-md border-t border-purple-800/30 py-12">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col lg:flex-row justify-between items-center space-y-6 lg:space-y-0">
              <div className="text-center lg:text-left">
                <div className="font-bold text-1xl sm:text-2xl text-white mb-3">
                  Gebyar Sains Unesa 2025
                </div>
                <p className="text-purple-300 max-w-md">
                  Himpunan Mahasiswa Prodi Pendidikan IPA FMIPA Unesa
                </p>
              </div>
              <div className="text-center lg:text-right">
                <p className="text-purple-300 mb-3">
                  &copy; {new Date().getFullYear()} Science Competition. All rights reserved.
                </p>
                <div className="flex justify-center lg:justify-end space-x-6 text-sm">
                  <a href="#" className="text-purple-300 hover:text-white transition-colors duration-300">
                    Kebijakan Privasi
                  </a>
                  <a href="#" className="text-purple-300 hover:text-white transition-colors duration-300">
                    Syarat & Ketentuan
                  </a>
                </div>
              </div>
            </div>
          </div>
        </footer>
      </div>
    </div>
  );
};

export default Kontak;