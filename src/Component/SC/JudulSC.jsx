import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { FiCalendar, FiUsers, FiAward, FiFileText, FiClipboard } from 'react-icons/fi';
import foto4 from '../../assets/postersc.jpg';

const DeskripsiLomba = () => {
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

  const benefits = [
  {
    icon: <FiAward className="text-yellow-300 text-2xl" />,
    title: 'Juara I',
    jenjang: 'SD/MI Sederajat dan SMP/MTs Sederajat',
    description: 'Piala Bergilir Gubernur Jatim + Trophy + Medali + Merchandise + Sertifikat Juara + Uang Pembinaan',
  },
  {
    icon: <FiAward className="text-yellow-300 text-2xl" />,
    title: 'Juara II',
    jenjang: 'SD/MI Sederajat dan SMP/MTs Sederajat',
    description: 'Trophy + Medali + Merchandise + Sertifikat Juara + Uang Pembinaan',
  },
  {
    icon: <FiAward className="text-gray-300 text-2xl" />,
    title: 'Juara III',
    jenjang: 'SD/MI Sederajat dan SMP/MTs Sederajat',
    description: 'Trophy + Medali + Merchandise + Sertifikat Juara + Uang Pembinaan',
  },
  
];


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
          <div className="mt-11 grid grid-cols-1 lg:grid-cols-2 items-center gap-8">
            
            {/* Text Content */}
            <motion.div
              className="w-full"
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2, duration: 0.8, ease: 'easeOut' }}
            >
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3, duration: 0.5 }}
                className="inline-block bg-purple-800 bg-opacity-70 px-4 py-1 rounded-full mb-4"
              >
                <p className="text-purple-200 font-medium text-sm">Kompetisi Nasional</p>
              </motion.div>
              
              <h1 className="font-bold text-4xl lg:text-5xl xl:text-6xl leading-tight mb-6 text-white">
                Science Competition <span className="text-purple-400">2025</span>
              </h1>
              
              <motion.p 
                className="text-lg lg:text-xl mb-8 text-purple-100 leading-relaxed opacity-90"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5, duration: 0.8 }}
              >
                Salah satu cabang lomba unggulan dalam rangkaian <span className="font-semibold text-purple-300">Gebyar Ilmiah Sains</span> yang diselenggarakan setiap tahun. Kompetisi ini berbentuk Olimpiade IPA yang ditujukan untuk siswa SD/MI dan SMP/MTs sederajat.
                
              </motion.p>
              
                <div className="flex flex-col sm:flex-row gap-4 mb-8">
                <Link
                  to="../../auth/daftar"
                  className="bg-gradient-to-r from-purple-600 to-purple-800 text-white px-8 py-3 rounded-lg font-semibold flex items-center justify-center gap-2 hover:shadow-lg hover:shadow-purple-900 hover:-translate-y-1 transition-all duration-300"
                >
                  <span>Daftar Sekarang</span>
                  <motion.span
                    animate={{ x: [0, 5, 0] }}
                    transition={{ repeat: Infinity, duration: 1.5 }}
                  >→</motion.span>
                </Link>
                <a
                  href="https://gis-backend.karyavisual.com/bukpansc.pdf"
                  target="_blank"
                  download
                  className="bg-gradient-to-r from-purple-600 to-purple-800 text-white px-8 py-3 rounded-lg font-semibold flex items-center justify-center gap-2 hover:shadow-lg hover:shadow-purple-900 hover:-translate-y-1 transition-all duration-300"
                >
                  <span>Download Guidebook</span>
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v12m0 0l-4-4m4 4l4-4m-4 4V4" />
                  </svg>
                </a>
              </div>              
              
              <div className="flex flex-wrap gap-6 text-purple-200">
                {/* <div className="flex items-center gap-2">
                  <FiCalendar className="text-purple-400" />
                  <span>Deadline: 20 Juni 2025</span>
                </div> */}
                <div className="flex items-center gap-2">
                  <FiUsers className="text-purple-400" />
                  <span>SD/MI dan SMP/MTs sederajat</span>
                </div>
                <div className="flex items-center gap-2">
                  <FiClipboard className="text-purple-400" />
                  <span>Sertifikat nasional</span>
                </div>
              </div>
            </motion.div>
            
            {/* Image Content */}
            <motion.div
              className="relative w-full flex justify-center lg:justify-end"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.4, duration: 0.8, ease: 'easeOut' }}
            >
              <div className="relative">
                {/* Background decorative elements */}
                <motion.div 
                  className="absolute -z-10 w-64 h-64 rounded-full bg-purple-700 blur-3xl opacity-20"
                  animate={{ 
                    scale: [1, 1.05, 1],
                    opacity: [0.2, 0.25, 0.2],
                  }}
                  transition={{ 
                    duration: 4,
                    repeat: Infinity,
                    repeatType: "reverse"
                  }}
                />
                
                <motion.div
                  className="relative z-10"
                  whileHover={{ rotate: 2, scale: 1.02 }}
                  transition={{ duration: 0.3 }}
                >
                  <img
                    src={foto4}
                    alt="Lomba Karya Tulis Ilmiah"
                    className="w-90 h-auto rounded-xl shadow-2xl border-2 border-purple-400 border-opacity-40"
                  />
                  
                  {/* Price tag */}
                  <motion.div 
                    className="absolute -bottom-23 right-0 bg-gradient-to-r from-purple-600 to-purple-800 px-6 py-3 rounded-lg shadow-xl"
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.8, duration: 0.5 }}
                    whileHover={{ scale: 1.05 }}
                  >
                    <p className="text-white text-lg font-bold">
                      Gel. 1: Rp 60.000<span className="text-sm font-normal"></span>
                    </p>
                    <p className="text-white text-lg font-bold">
                      Gel. 2: Rp 65.000<span className="text-sm font-normal"></span>
                    </p>
                  </motion.div>

                </motion.div>
              </div>
            </motion.div>
          </div>
        </div>
      </motion.div>
      
      {/* About Competition Section */}
      <motion.section 
        className="py-3"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
      >
        <div className="container max-w-6xl mx-auto px-6 sm:px-8">
          <motion.h2 
            className="text-3xl font-bold text-center text-white mb-12"
            initial={{ y: 20, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            Tentang Kompetisi
          </motion.h2>
          
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
            <div className="lg:col-span-3">
              <motion.div 
                className="bg-purple-900 bg-opacity-50 p-6 rounded-xl shadow-lg border border-purple-800"
                initial={{ x: -20, opacity: 0 }}
                whileInView={{ x: 0, opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
              >
                <h3 className="text-2xl font-bold text-purple-300 mb-4">Deskripsi</h3>
                <p className="text-purple-100 mb-4 leading-relaxed">
                  Salah satu cabang lomba unggulan dalam rangkaian <span className="font-semibold">Gebyar Ilmiah Sains</span> yang diselenggarakan setiap tahun. Kompetisi ini berbentuk Olimpiade IPA yang ditujukan untuk siswa SD/MI dan SMP/MTs sederajat. SC terdiri dari tiga babak menantang: Penyisihan, Semifinal, dan Final. Melalui ajang ini, peserta diajak untuk menunjukkan kemampuan terbaik mereka dalam bidang Ilmu Pengetahuan Alam, berpikir kritis, dan bersaing secara sportif dalam suasana yang edukatif dan menyenangkan. SC adalah panggung bagi calon ilmuwan muda untuk unjuk prestasi.
                </p>
                
              </motion.div>
            </div>
            
            <div className="lg:col-span-2">
              <motion.div 
                className="bg-purple-900 bg-opacity-50 p-6 rounded-xl shadow-lg border border-purple-800 h-full"
                initial={{ x: 20, opacity: 0 }}
                whileInView={{ x: 0, opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.2 }}
              >
                <h3 className="text-2xl font-bold text-purple-300 mb-4">Persyaratan</h3>
                <ul className="text-purple-100 space-y-3">
                  <li className="flex items-start gap-2">
                    <span className="text-purple-400 mt-1">•</span>
                    <span>Peserta tercatat sebagai siswa/I tingkat SD/MI sederajat kelas 4,5 dan 6 serta tingkat SMP/MTs sederajat kelas 7,8 dan 9.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-purple-400 mt-1">•</span>
                    <span>Lomba bersifat individu.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-purple-400 mt-1">•</span>
                    <span>Lomba dilakukan secara online pada tahap penyisihan, secara offline pada tahap semifinal dan final.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-purple-400 mt-1">•</span>
                    <span>Pedoman lomba dapat di unduh di web gisunesa.com</span>
                  </li>
                </ul>
              </motion.div>
            </div>
          </div>
        </div>
      </motion.section>
      
      {/* Benefits Section */}
      <motion.section 
        className="py-16 bg-purple-900 bg-opacity-20"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
      >
        <div className="container max-w-6xl mx-auto px-6 sm:px-8">
          <motion.h2 
            className="text-3xl font-bold text-center text-white mb-4"
            initial={{ y: 20, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            Hadiah & Penghargaan
          </motion.h2>
          
          <motion.p 
            className="text-center text-purple-200 mb-12 max-w-2xl mx-auto"
            initial={{ y: 20, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            Dapatkan hadiah menarik dan pengalaman berharga dalam kompetisi ini
          </motion.p>
          
          <motion.div 
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
            variants={staggerContainer}
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
            >
              {benefits.map((benefit, index) => (
                <motion.div
                  key={index}
                  className="bg-gradient-to-br from-purple-800 to-purple-900 rounded-xl p-6 shadow-lg border border-purple-700"
                  variants={fadeUp}
                  whileHover={{ y: -10, boxShadow: '0 20px 25px -5px rgba(124, 58, 237, 0.3)' }}
                  transition={{ duration: 0.3 }}
                >
                  <div className="flex flex-col items-center text-center">
                    <div className="w-16 h-16 flex items-center justify-center bg-purple-800 rounded-full mb-4 shadow-inner">
                      {benefit.icon}
                    </div>
                    <h3 className="text-xl font-bold text-white mb-1">{benefit.title}</h3>
                    <div className="text-purple-300 text-sm mb-2">{benefit.jenjang}</div>
                    <p className="text-purple-200">{benefit.description}</p>
                  </div>
                </motion.div>
              ))}
            </motion.div>
        </div>
      </motion.section>
      
      {/* Call to Action */}
      <motion.section 
        className="py-16"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
      >
        <div className="container max-w-6xl mx-auto px-6 sm:px-8">
          <motion.div 
            className="bg-gradient-to-r from-purple-800 to-purple-900 rounded-2xl p-8 lg:p-12 shadow-2xl border border-purple-700 text-center relative overflow-hidden"
            initial={{ y: 20, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            {/* Decorative elements */}
            <div className="absolute top-0 left-0 w-full h-full">
              <motion.div 
                className="absolute top-10 left-10 w-64 h-64 rounded-full bg-purple-600 blur-3xl opacity-20"
                animate={{ 
                  scale: [1, 1.2, 1],
                  opacity: [0.1, 0.2, 0.1],
                }}
                transition={{ 
                  duration: 5,
                  repeat: Infinity,
                  repeatType: "reverse"
                }}
              />
              <motion.div 
                className="absolute bottom-10 right-10 w-64 h-64 rounded-full bg-purple-800 blur-3xl opacity-20"
                animate={{ 
                  scale: [1, 1.3, 1],
                  opacity: [0.1, 0.3, 0.1],
                }}
                transition={{ 
                  duration: 7,
                  repeat: Infinity,
                  repeatType: "reverse"
                }}
              />
            </div>
            
            <div className="relative z-10">
              <h2 className="text-3xl lg:text-4xl font-bold text-white mb-4">
                Siap Menjadi Ilmuwan Muda Berprestasi?
              </h2>
              <p className="text-lg text-purple-200 mb-8 max-w-2xl mx-auto">
                Olimpiade IPA untuk SD/MI & SMP/MTs dengan tiga babak seru: Penyisihan, Semifinal, dan Final!
              </p>

              
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link
                  to="../../auth/daftar"
                  className="bg-white text-purple-900 px-8 py-3 rounded-lg font-semibold flex items-center justify-center gap-2 hover:bg-purple-100 transition-colors duration-300"
                >
                  <span>Daftar Sekarang</span>
                  <motion.span
                    animate={{ x: [0, 5, 0] }}
                    transition={{ repeat: Infinity, duration: 1.5 }}
                  >→</motion.span>
                </Link>
                <Link 
                  to="/masuk" 
                  className="bg-transparent border-2 border-white text-white px-8 py-3 rounded-lg font-semibold hover:bg-white hover:bg-opacity-10 transition-colors duration-300"
                >
                  Login
                </Link>
              </div>
            </div>
          </motion.div>
        </div>
      </motion.section>
    </div>
  );
};

export default DeskripsiLomba;
