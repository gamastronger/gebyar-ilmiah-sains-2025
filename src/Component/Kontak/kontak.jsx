import React from "react";
import { motion } from 'framer-motion';
import { FiPhone, FiMail, FiMapPin, FiMessageCircle, FiUsers } from 'react-icons/fi';

const Kontak = () => {
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
        { name: "Farid", role: "Wakil Koordinator", phone: "+62087758375435" }
      ]
    }
  ];

  const openWhatsapp = (phone) => {
    const url = `https://wa.me/${phone.replace(/\+/g, "")}`;
    window.open(url, "_blank");
  };

  return (
    <div className="bg-gradient-to-b from-[#210034] to-[#3a0061] min-h-screen">
      {/* Hero Section */}
      <motion.div
        className="w-full py-16"
        variants={fadeUp}
        initial="initial"
        animate="animate"
        exit="exit"
      >
        <div className="container max-w-6xl mx-auto px-6 sm:px-8">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.5 }}
            className="text-center mb-16"
          >
            <div className="mt-16 inline-block bg-purple-800 bg-opacity-70 px-4 py-1 rounded-full mb-4">
              <p className="text-purple-200 font-medium text-sm">Kompetisi Nasional</p>
            </div>
            <h1 className="font-bold text-4xl lg:text-5xl leading-tight mb-6 text-white">
              Hubungi <span className="text-purple-400">Kami</span>
            </h1>
            <motion.p 
              className="text-lg max-w-2xl mx-auto text-purple-100 leading-relaxed opacity-90"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5, duration: 0.8 }}
            >
              Jangan ragu untuk menghubungi tim kami untuk informasi lebih lanjut terkait kompetisi dan pendaftaran
            </motion.p>
          </motion.div>

          {/* Main Content */}
          <div className="flex flex-col md:flex-row gap-8">
            {/* Left Column - Contact Info */}
            <motion.div
              className="w-full md:w-1/2"
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2, duration: 0.8, ease: 'easeOut' }}
            >
              <div className="bg-purple-900 bg-opacity-50 p-6 rounded-xl shadow-lg border border-purple-800 h-full">
                <h3 className="text-2xl font-bold text-purple-300 mb-6">Informasi Kontak</h3>
                
                <div className="space-y-6">
                  <div className="flex items-center">
                    <div className="w-12 h-12 flex items-center justify-center bg-purple-800 rounded-full mr-4 shadow-inner">
                      <FiMail className="text-purple-200 text-xl" />
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-white">Email</h3>
                      <p className="text-purple-200">info@sciencecompetition.org</p>
                    </div>
                  </div>

                  <div className="flex items-center">
                    <div className="w-12 h-12 flex items-center justify-center bg-purple-800 rounded-full mr-4 shadow-inner">
                      <FiPhone className="text-purple-200 text-xl" />
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-white">Telepon</h3>
                      <p className="text-purple-200">+62 21 1234 5678</p>
                    </div>
                  </div>

                  <div className="flex items-center">
                    <div className="w-12 h-12 flex items-center justify-center bg-purple-800 rounded-full mr-4 shadow-inner">
                      <FiMapPin className="text-purple-200 text-xl" />
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-white">Lokasi</h3>
                      <p className="text-purple-200">Jl. Ilmu Pengetahuan No. 123, Jakarta</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center">
                    <div className="w-12 h-12 flex items-center justify-center bg-purple-800 rounded-full mr-4 shadow-inner">
                      <FiUsers className="text-purple-200 text-xl" />
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-white">Sosial Media</h3>
                      <div className="flex space-x-4 mt-2">
                        <a href="#" className="text-purple-300 hover:text-white transition-colors duration-300">
                          Instagram
                        </a>
                        <a href="#" className="text-purple-300 hover:text-white transition-colors duration-300">
                          Twitter
                        </a>
                        <a href="#" className="text-purple-300 hover:text-white transition-colors duration-300">
                          LinkedIn
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
            
            {/* Right Column - Contact Person Only (form removed) */}
            <motion.div
              className="w-full md:w-1/2 flex flex-col justify-center"
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.4, duration: 0.8, ease: 'easeOut' }}
            >
              <div className="bg-purple-900 bg-opacity-50 p-6 rounded-xl shadow-lg border border-purple-800 h-full">
                <h3 className="text-2xl font-bold text-purple-300 mb-6">Kontak Person</h3>
                <div className="space-y-6">
                  {contactData.map((section, sectionIndex) => (
                    <div key={sectionIndex}>
                      <div className="font-semibold text-white mb-2">{section.title}</div>
                      <div className="space-y-2">
                        {section.contacts.map((contact, contactIndex) => (
                          <div key={contactIndex} className="flex items-center justify-between bg-purple-800 bg-opacity-40 rounded-lg px-4 py-3">
                            <div>
                              <div className="text-white font-medium">{contact.name}</div>
                              <div className="text-purple-300 text-sm">{contact.role}</div>
                              <div className="text-purple-200 text-sm">{contact.phone}</div>
                            </div>
                            <button
                              onClick={() => openWhatsapp(contact.phone)}
                              className="flex items-center bg-green-600 hover:bg-green-700 text-white py-2 px-4 rounded-lg transition-colors duration-300 ml-4"
                            >
                              <FiMessageCircle size={18} className="mr-2" />
                              WhatsApp
                            </button>
                          </div>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </motion.div>

      {/* Call to Action */}
      <motion.section 
        className="py-16"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
      >
        
      </motion.section>

      {/* Footer */}
      <div className="bg-[#1a002b] text-purple-300 py-8">
        <div className="container mx-auto px-4 text-center">
          <p>&copy; {new Date().getFullYear()} Science Competition. All rights reserved.</p>
        </div>
      </div>
    </div>
  );
};

export default Kontak;