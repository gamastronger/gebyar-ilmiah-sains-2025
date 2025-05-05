import { motion, useMotionValue, useMotionTemplate} from "framer-motion";
import { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
// import foto4 from "../../assets/sc.jpg";
// import facebookLogo from "../../assets/facebooklogo.png";
// import instagramLogo from "../../assets/instagramlogo.png";
// import twitterLogo from "../../assets/linkedlogo.png";
import kegiatan1 from "../../assets/doc2.jpg";
import kegiatan2 from "../../assets/doc1.jpg";
import kegiatan3 from "../../assets/docfotbar1.jpg";
import kegiatan4 from "../../assets/doc3.jpg";
import kegiatan5 from "../../assets/doc5.jpg";
import kegiatan6 from "../../assets/docfotbar3.jpg";
import backgroundImage from "../../assets/bgsementara2.jpg";
import sponsor1 from "../../assets/gimage.jpeg";
import sponsor2 from "../../assets/gimage.jpeg";
import sponsor3 from "../../assets/gimage.jpeg";
import sponsor4 from "../../assets/gimage.jpeg";
import sponsor5 from "../../assets/gimage.jpeg";
import poster from "../../assets/Pamflet GIS 2024.png";
import FAQ from '../FAQ/FAQ';
import MediaPartner from "../FAQ/MediaPartner";
import scienceCompetitionImg from "../../assets/sc.jpg"; // Image for Science Competition
import scienceWritingImg from "../../assets/swc.jpg"; // Image for Science Writing Competition

const ROTATION_RANGE = 32.5;
const HALF_ROTATION_RANGE = ROTATION_RANGE / 2;

const TiltCard = ({ children }) => {
  const ref = useRef(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const transform = useMotionTemplate`rotateX(${y}deg) rotateY(${x}deg)`;

  const handleMouseMove = (e) => {
    if (!ref.current) return;

    const rect = ref.current.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;

    const mouseX = (e.clientX -rect.left) * ROTATION_RANGE;
    const mouseY = (e.clientY - rect.top) * ROTATION_RANGE;

    const rX = (mouseY / height - HALF_ROTATION_RANGE) * -1;
    const rY = mouseX / width - HALF_ROTATION_RANGE;

    x.set(rY);
    y.set(rX);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        transformStyle: "preserve-3d",
        transform,
      }}
      className="relative h-[550px] w-[400px] rounded-xl bg-gradient-to-br from-[#31004d] to-[#A78BFA]"
    >
      <div
        style={{
          transform: "translateZ(75px)",
          transformStyle: "preserve-3d",
        }}
        className="absolute inset-4 grid place-content-center rounded-xl bg-white shadow-lg"
      >
        {children || <p>No content provided</p>}
      </div>
    </motion.div>
  );
};

// Custom button component
const GradientButton = ({ children, onClick, primary = true }) => {
  return (
    <button
      onClick={onClick}
      className={`group relative px-8 py-3 rounded-lg font-semibold transition-all duration-300 transform hover:scale-105 overflow-hidden ${
        primary ? "text-white" : "text-[#31004d] bg-white border border-[#31004d]"
      }`}
    >
      <span className={`absolute inset-0 w-full h-full transition-all duration-300 ${
        primary 
          ? "bg-gradient-to-r from-[#31004d] to-[#A78BFA] group-hover:from-[#A78BFA] group-hover:to-[#31004d]" 
          : "bg-gradient-to-r from-white to-white group-hover:from-[#f9f5ff] group-hover:to-[#f0e6ff]"
      }`}></span>
      <span className="relative z-10">{children}</span>
    </button>
  );
};

// Section title component
const SectionTitle = ({ children, subtitle }) => {
  return (
    <div className="text-center mb-10">
      <h2 className="text-4xl font-bold text-white mb-4 relative inline-block">
        {children}
        <span className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-[#A78BFA] to-[#31004d] transform scale-x-0 transition-transform duration-300 group-hover:scale-x-100"></span>
      </h2>
      {subtitle && (
        <p className="text-white/70 text-lg max-w-2xl mx-auto">
          {subtitle}
        </p>
      )}
    </div>
  );
};

// Image display component with hover effect
const ImageDisplay = ({ src, alt, className }) => {
  return (
    <div className={`overflow-hidden rounded-lg shadow-xl ${className}`}>
      <img
        src={src}
        alt={alt}
        className="w-full h-full object-cover transition-transform duration-500 hover:scale-110"
      />
    </div>
  );
};

// Tambahkan komponen EnhancedPosterSection di sini
const EnhancedPosterSection = () => {
  return (
    <motion.div
      className="mt-12 md:mt-16 relative"
      initial={{ opacity: 0, y: 30, filter: "blur(4px)" }}
      whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.8, delay: 0.4, ease: "easeOut" }}
    >
      <div className="flex flex-col md:flex-row items-center md:items-stretch justify-center gap-8 md:gap-16">
        {/* Left side info */}
        <motion.div 
          className="md:w-64 space-y-6 md:self-center text-center md:text-right"
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.6 }}
        >
          <div className="p-4 bg-white/10 backdrop-blur-sm rounded-xl border border-white/10">
            <h3 className="text-lg font-bold text-white mb-2">Kompetisi Nasional</h3>
            <p className="text-white/80 text-sm">Diikuti oleh lebih dari 500 peserta dari seluruh Indonesia</p>
          </div>
          <motion.div 
            className="p-4 bg-white/10 backdrop-blur-sm rounded-xl border border-white/10"
            whileHover={{ scale: 1.05 }}
          >
            <h3 className="text-lg font-bold text-white mb-2">Total Hadiah</h3>
            <p className="text-[#A78BFA] text-xl font-bold">Rp 23.000.0000</p>
          </motion.div>
        </motion.div>
        
        {/* Center poster */}
        <TiltCard>
          <img
            src={poster}
            alt="GIS Unesa Poster"
            className="w-full h-[500px] object-contain rounded-lg"
          />
        </TiltCard>

        
        
        {/* Right side info */}
        <motion.div 
          className="md:w-64 space-y-6 md:self-center text-center md:text-left"
          initial={{ opacity: 0, x: 30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.6 }}
        >
          <div className="p-4 bg-white/10 backdrop-blur-sm rounded-xl border border-white/10">
            <h3 className="text-lg font-bold text-white mb-2">Tanggal Penting</h3>
            <div className="space-y-2">
              <p className="text-white/80 text-sm flex items-center justify-center md:justify-start gap-2">
                <span className="w-3 h-3 rounded-full bg-[#A78BFA]"></span>
                <span>Gelombang 1: 17 Mei - 12 Juli 2025</span>
              </p>
              <p className="text-white/80 text-sm flex items-center justify-center md:justify-start gap-2">
                <span className="w-3 h-3 rounded-full bg-[#A78BFA]"></span>
                <span>Gelombang 2: 13 Juli - 24 Agustus 2025</span>
              </p>
            </div>
          </div>
          <motion.div 
            className="p-4 bg-white/10 backdrop-blur-sm rounded-xl border border-white/10"
            whileHover={{ scale: 1.05 }}
          >
            <h3 className="text-lg font-bold text-white mb-2">Kategori</h3>
            <div className="space-y-1">
              <p className="text-white/80 text-sm">Science Competition </p>
              <p className="text-white/80 text-sm">Science Writing Competition</p>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </motion.div>
  );
};

// Ganti bagian Poster Section di dalam Deskripsi dengan EnhancedPosterSection
const Deskripsi = () => {
  const [activeTab, setActiveTab] = useState('kti'); // 'kti' or 'cbt'
  const navigate = useNavigate(); // Tambahkan ini

  return (
    <div
      id="deskripsi"
      style={{
        backgroundImage: `linear-gradient(to bottom, rgba(15, 23, 42, 0.9), rgba(49, 0, 77, 0.85)), url(${backgroundImage})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundAttachment: "fixed",
      }}
      className="text-white py-20 px-4 md:px-8 lg:px-16"
    >
      {/* POSTER */}
      <motion.div
        className="max-w-screen-xl mx-auto mb-32"
        initial={{ opacity: 0, y: 30, filter: "blur(4px)" }}
        whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
      >
        <div className="mt-8 flex flex-col items-center gap-8">
          {/* Judul */}
          <motion.div
            className="text-center"
            initial={{ opacity: 0, y: 30, filter: "blur(4px)" }}
            whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
          >
            <h1 className="font-bold text-4xl lg:text-6xl leading-tight mb-3 text-white font-[Arial Sans]">
            <span className="text-purple-300">13th</span> Gebyar Ilmiah Sains 2025
            </h1>
            <p className="text-lg text-white/80 max-w-2xl mx-auto">
            Diselenggarakan Oleh HMP Pendidikan IPA FMIPA Unesa
            </p>
          </motion.div>

          {/* Enhanced Poster Section */}
          <EnhancedPosterSection />
        </div>
      </motion.div>

      {/* Competition Tabs */}
      <div className="max-w-screen-xl mx-auto mb-32">
        <SectionTitle subtitle="Ikuti kompetisi bergengsi dari GIS Unesa dan menangkan berbagai hadiah menarik">
          Kompetisi Kami
        </SectionTitle>

        {/* Tab Navigation */}
        <div className="flex justify-center mb-12">
          <div className="inline-flex bg-white/10 backdrop-blur-sm rounded-full p-1 shadow-lg">
            <button
              onClick={() => setActiveTab('kti')}
              className={`px-6 py-3 rounded-full font-medium transition-all duration-300 ${
                activeTab === 'kti' 
                  ? 'bg-gradient-to-r from-[#31004d] to-[#A78BFA] text-white shadow-lg' 
                  : 'text-white/80 hover:text-white'
              }`}
            >
              Science Writing Competition
            </button>
            <button
              onClick={() => setActiveTab('cbt')}
              className={`px-6 py-3 rounded-full font-medium transition-all duration-300 ${
                activeTab === 'cbt' 
                  ? 'bg-gradient-to-r from-[#31004d] to-[#A78BFA] text-white shadow-lg' 
                  : 'text-white/80 hover:text-white'
              }`}
            >
              Science Competition
            </button>
          </div>
        </div>

        {/* Tab Content Container */}
        <div>
          {/* KTI Tab Content */}
          <div className={`${activeTab === 'kti' ? 'block' : 'hidden'}`}>
            <div className="grid grid-cols-1 lg:grid-cols-2 items-center gap-12 lg:gap-20">
              {/* Gambar KTI */}
              <div className="relative rounded-xl overflow-hidden group shadow-2xl">
                <div className="absolute inset-0 bg-gradient-to-t from-[#31004d]/80 to-transparent opacity-60"></div>
                <img
                  src={scienceWritingImg} // Changed this line
                  alt="Science Writing Competition"
                  className="w-full h-[300px] object-cover rounded-xl"
                />
                {/* <div className="absolute bottom-0 left-0 right-0 p-6">
                  <div className="flex items-center space-x-2 mb-2">
                    <div className="w-2 h-2 rounded-full bg-[#A78BFA]"></div>
                    <span className="text-sm font-medium text-[#eeccff]">Pendaftaran Dibuka</span>
                  </div>
                </div> */}
              </div>

              {/* Teks KTI */}
              <div className="order-2">
                <h1 className="font-bold text-4xl md:text-5xl leading-tight mb-4 text-white">
                Science <span className="text-[#A78BFA]">Writing</span> Competition
                </h1>
                <p className="text-lg mb-8 text-white/90 leading-relaxed">
                Merupakan Lomba Karya Tulis Ilmiah yang dapat diikuti oleh tingkat SMA/SMK/Sederajat dan Mahasiswa/i. Yang bertujuan untuk untuk meningkatkan kemampuan bersaing siswa dan mahasiswa dalam Ilmu Pengetahuan dan Teknologi (IPTEK) dan melatih siswa dan mahasiswa  dalam bersaing inovasi di bidang Pendidikan, Bioteknologi, Energi Terbarukan, dan Lingkungan.

                </p>
                
                <div className="flex flex-col sm:flex-row gap-6 mb-8">
                  {/* <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full flex items-center justify-center bg-[#A78BFA]/20">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-[#A78BFA]" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z" clipRule="evenodd" />
                      </svg>
                    </div>
                    <div>
                    </div>
                  </div> */}
                  
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full flex items-center justify-center bg-[#A78BFA]/20">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-[#A78BFA]" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clipRule="evenodd" />
                      </svg>
                    </div>
                    <div>
                      <p className="text-sm text-white/60">Jenjang</p>
                      <p className="font-medium">SMA/MA/SMK Sederajat & Mahasiswa/i</p>
                    </div>
                  </div>
                </div>
                
                <div className="flex flex-wrap gap-4">
                  <GradientButton primary={true} onClick={() => navigate('/kti')}>
                    Selengkapnya
                  </GradientButton>
                  
                </div>
              </div>
            </div>
          </div>

          {/* CBT Tab Content */}
          <div className={`${activeTab === 'cbt' ? 'block' : 'hidden'}`}>
            <div className="grid grid-cols-1 lg:grid-cols-2 items-center gap-12 lg:gap-20">
              {/* Gambar CBT */}
              <div className="relative rounded-xl overflow-hidden group shadow-2xl order-1">
                <div className="absolute inset-0 bg-gradient-to-t from-[#31004d]/80 to-transparent opacity-60"></div>
                <img
                  src={scienceCompetitionImg} // Changed this line
                  alt="Science Competition"
                  className="w-full h-[300px] object-cover rounded-xl"
                />
                {/* <div className="absolute bottom-0 left-0 right-0 p-6">
                  <div className="flex items-center space-x-2 mb-2">
                    <div className="w-2 h-2 rounded-full bg-[#A78BFA]"></div>
                    <span className="text-sm font-medium text-[#A78BFA]">Pendaftaran Dibuka</span>
                  </div>
                </div> */}
              </div>

              {/* Teks CBT */}
              <div className="order-2">
                <h1 className="font-bold text-4xl md:text-5xl leading-tight mb-4 text-white">
                  Science Competition
                </h1>
                <p className="text-lg mb-8 text-white/90 leading-relaxed">
                  -
                </p>
                
                <div className="flex flex-col sm:flex-row gap-6 mb-8">
                  {/* <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full flex items-center justify-center bg-[#A78BFA]/20">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-[#A78BFA]" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z" clipRule="evenodd" />
                      </svg>
                    </div>
                    <div>
                      <p className="text-sm text-white/60">Tanggal Pelaksanaan</p>
                      <p className="font-medium">10 Juni 2025</p>
                    </div>
                  </div> */}
                  
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full flex items-center justify-center bg-[#A78BFA]/20">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-[#A78BFA]" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
                      </svg>
                    </div>
                    <div>
                      <p className="text-sm text-white/60">Jenjang</p>
                      <p className="font-medium">SMA/MA/SMK Sederajat & Mahasiswa/i</p>
                    </div>
                  </div>
                </div>
                
                <div className="flex flex-wrap gap-4">
                <GradientButton primary={true} onClick={() => navigate('/cbt')}>
                    Selengkapnya
                  </GradientButton>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Timeline */}
      <motion.div
        id="timeline"
        className="max-w-screen-xl mx-auto mb-32"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
      >
        <SectionTitle subtitle="Jadwal kegiatan GIS Unesa 2025 dari awal hingga akhir">
          Timeline Kegiatan
        </SectionTitle>

        <div className="relative">
          {/* Vertical line */}
          <div className="absolute left-1/2 transform -translate-x-1/2 h-full w-1 bg-gradient-to-b from-[#31004d] to-[#A78BFA]"></div>

          {/* Timeline items */}
          {[
            {
              date: "17 Mei – 12 Juli 2025",
              title: "Pendaftaran Gelombang 1 (SC & SWC)",
              description: "Pendaftaran peserta SC dan pengumpulan karya SWC dimulai"
            },
            {
              date: "13 Juli – 24 Agustus 2025",
              title: "Pendaftaran Gelombang 2 (SC)",
              description: "Pendaftaran SC gelombang 2 dan pengumpulan karya SWC masih dibuka"
            },
            {
              date: "25 – 31 Agustus 2025",
              title: "Perpanjangan Pendaftaran (SC & SWC)",
              description: "Periode perpanjangan pendaftaran SC dan pengumpulan karya SWC"
            },
            {
              date: "06 September 2025",
              title: "Technical Meeting Penyisihan SC",
              description: "Penjelasan teknis babak penyisihan SC kepada peserta"
            },
            {
              date: "14 September 2025",
              title: "Simulasi SC",
              description: "Simulasi pelaksanaan SC bagi peserta"
            },
            {
              date: "20 September 2025",
              title: "Penyisihan SC",
              description: "Babak penyisihan SC dilaksanakan secara online"
            },
            {
              date: "01 – 14 September 2025",
              title: "Penilaian Karya SWC",
              description: "Karya peserta SWC dinilai oleh dewan juri"
            },
            {
              date: "23 September 2025",
              title: "Pengumuman 5 Besar (SC & SWC)",
              description: "Pengumuman peserta yang lolos ke babak semi final SC dan 5 besar SWC"
            },
            {
              date: "25 September 2025",
              title: "Technical Meeting Semi Final & Final",
              description: "Penjelasan teknis pelaksanaan semi final dan final untuk SC dan SWC"
            },
            {
              date: "04 Oktober 2025",
              title: "Final SC & SWC",
              description: "Babak final SC dan presentasi karya terbaik SWC"
            }
          ].map((item, index) => (
            <motion.div 
              key={index}
              className={`relative flex items-center mb-12 ${
                index % 2 === 0 ? "flex-row-reverse" : ""
              }`}
              initial={{ opacity: 0, x: index % 2 === 0 ? 50 : -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.2 }}
            >
              <div className="w-1/2"></div>
          
              <div className="absolute left-1/2 transform -translate-x-1/2 w-6 h-6 rounded-full bg-gradient-to-r from-[#31004d] to-[#A78BFA] border-4 border-[#31004d] z-10"></div>
          
              <div className={`w-1/2 ${index % 2 === 0 ? "pr-12" : "pl-12"}`}>
                <motion.div
                  className="bg-white/10 backdrop-blur-sm p-6 rounded-xl border border-white/10 hover:bg-white/20 transition-all duration-300"
                  whileHover={{ y: -5 }}
                >
                  <div className="flex items-center gap-3 mb-3">
                    <div className="bg-[#A78BFA]/20 px-3 py-1 rounded-full">
                      <p className="text-[#A78BFA] font-medium text-sm">{item.date}</p>
                    </div>
                  </div>
                  <h3 className="text-xl font-bold text-white mb-2">{item.title}</h3>
                  <p className="text-white/70">{item.description}</p>
                </motion.div>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* Contact Person Section */}
      <motion.div
        id="contact-person"
        className="max-w-screen-xl mx-auto mb-32"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
      >
        <SectionTitle subtitle="Hubungi narahubung berikut untuk informasi lebih lanjut seputar lomba.">
          Contact Person
        </SectionTitle>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {[
            {
              title: "Science Writing Competition ",
              icon: (
                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m2.25 0H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z" />
                </svg>
              ),
              contacts: [
                { name: "Faudhotul", role: "Koordinator", phone: "+6285850817023" },
                { name: "Gita", role: "Wakil Koordinator", phone: "+628887060380" },
              ],
            },
            {
              title: "Science Competition",
              icon: (
                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M4.26 10.147a60.436 60.436 0 00-.491 6.347A48.627 48.627 0 0112 20.904a48.627 48.627 0 018.232-4.41 60.46 60.46 0 00-.491-6.347m-15.482 0a50.57 50.57 0 00-2.658-.813A59.905 59.905 0 0112 3.493a59.902 59.902 0 0110.399 5.84c-.896.248-1.783.52-2.658.814m-15.482 0A50.697 50.697 0 0112 13.489a50.702 50.702 0 017.74-3.342M6.75 15a.75.75 0 100-1.5.75.75 0 000 1.5zm0 0v-3.675A55.378 55.378 0 0112 8.443m-7.007 11.55A5.981 5.981 0 006.75 15.75v-1.5" />
                </svg>
              ),
              contacts: [
                { name: "Nisa", role: "Koordinator", phone: "+6287876440866" },
                { name: "Farid", role: "Wakil Koordinator", phone: "+62087758375435" },
              ],
            },
          ].map((section, index) => (
            <motion.div
              key={index}
              className="bg-white/10 backdrop-blur-sm p-8 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 border border-white/10"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.2 }}
            >
              <div className="flex items-center gap-4 mb-6">
                <div className="w-14 h-14 rounded-full bg-gradient-to-br from-[#31004d] to-[#A78BFA] flex items-center justify-center text-white">
                  {section.icon}
                </div>
                <h3 className="text-2xl font-bold text-white">
                  {section.title}
                </h3>
              </div>
              
              <div className="space-y-5">
                {section.contacts.map((contact, idx) => (
                  <div
                    key={idx}
                    className="bg-white/5 rounded-xl p-4 border border-white/10 hover:bg-white/10 transition-colors duration-300"
                  >
                    <div className="flex justify-between items-center">
                      <div>
                        <p className="text-lg font-semibold text-white">{contact.name}</p>
                        <p className="text-sm text-white/60">{contact.role}</p>
                      </div>
                      <a
                        href={`https://wa.me/${contact.phone.replace(/\+/g, "")}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-2 bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-lg font-medium transition-all duration-300 hover:scale-105"
                      >
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 24 24" fill="currentColor">
                          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.458a11.825 11.825 0 00-3.455-8.468" />
                        </svg>
                        WhatsApp
                      </a>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* Event Gallery */}
<motion.div
  id="gallery"
  className="max-w-screen-xl mx-auto mb-32"
  initial={{ opacity: 0, y: 30 }}
  whileInView={{ opacity: 1, y: 0 }}
  viewport={{ once: true, amount: 0.2 }}
  transition={{ duration: 0.8, ease: "easeOut" }}
>
  <SectionTitle subtitle="Dokumentasi kegiatan GIS Unesa dari tahun-tahun sebelumnya">
    Galeri Kegiatan
  </SectionTitle>

  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
    <div className="grid gap-6">
      <motion.div 
        className="relative h-80 overflow-hidden rounded-lg shadow-xl group cursor-pointer"
        whileHover={{ y: -5 }}
        transition={{ duration: 0.3 }}
      >
        <div className="absolute inset-0 bg-gradient-to-t from-[#31004d]/80 to-transparent opacity-0 group-hover:opacity-80 transition-opacity duration-300 z-10 flex items-end">
          <div className="p-6 w-full">
            <h3 className="text-xl font-bold text-white mb-2 translate-y-4 group-hover:translate-y-0 transition-transform duration-300">GIS Unesa 2024</h3>
            <p className="text-white/80 opacity-0 group-hover:opacity-100 transition-all duration-300 delay-100">dokumentasi kegiatan GIS Unesa 2024</p>
          </div>
        </div>
        <img
          src={kegiatan1}
          alt="GIS Unesa Event 1"
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
        />
      </motion.div>
      
      <motion.div 
        className="relative h-64 overflow-hidden rounded-lg shadow-xl group cursor-pointer"
        whileHover={{ y: -5 }}
        transition={{ duration: 0.3 }}
      >
        <div className="absolute inset-0 bg-gradient-to-t from-[#31004d]/80 to-transparent opacity-0 group-hover:opacity-80 transition-opacity duration-300 z-10 flex items-end">
          <div className="p-6 w-full">
            <h3 className="text-xl font-bold text-white mb-2 translate-y-4 group-hover:translate-y-0 transition-transform duration-300">Persentasi Finalis</h3>
            <p className="text-white/80 opacity-0 group-hover:opacity-100 transition-all duration-300 delay-100">Persentasi Finalis GIS Unesa 2024</p>
          </div>
        </div>
        <img
          src={kegiatan2}
          alt="GIS Unesa Event 2"
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
        />
      </motion.div>
    </div>
    
    <div className="grid gap-6">
      <motion.div 
        className="relative h-64 overflow-hidden rounded-lg shadow-xl group cursor-pointer"
        whileHover={{ y: -5 }}
        transition={{ duration: 0.3 }}
      >
        <div className="absolute inset-0 bg-gradient-to-t from-[#31004d]/80 to-transparent opacity-0 group-hover:opacity-80 transition-opacity duration-300 z-10 flex items-end">
          <div className="p-6 w-full">
            <h3 className="text-xl font-bold text-white mb-2 translate-y-4 group-hover:translate-y-0 transition-transform duration-300">The Winner</h3>
            <p className="text-white/80 opacity-0 group-hover:opacity-100 transition-all duration-300 delay-100">Juara dan finalis GIS Unesa 2024</p>
          </div>
        </div>
        <img
          src={kegiatan3}
          alt="GIS Unesa Event 3"
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
        />
      </motion.div>
      
      <motion.div 
        className="relative h-80 overflow-hidden rounded-lg shadow-xl group cursor-pointer"
        whileHover={{ y: -5 }}
        transition={{ duration: 0.3 }}
      >
        <div className="absolute inset-0 bg-gradient-to-t from-[#31004d]/80 to-transparent opacity-0 group-hover:opacity-80 transition-opacity duration-300 z-10 flex items-end">
          <div className="p-6 w-full">
            <h3 className="text-xl font-bold text-white mb-2 translate-y-4 group-hover:translate-y-0 transition-transform duration-300">Teamwork</h3>
            <p className="text-white/80 opacity-0 group-hover:opacity-100 transition-all duration-300 delay-100">Kerja TIM Finalis GIS Unesa 2024</p>
          </div>
        </div>
        <img
          src={kegiatan4}
          alt="GIS Unesa Event 4"
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
        />
      </motion.div>
    </div>
    
    <div className="grid gap-6">
      <motion.div 
        className="relative h-80 overflow-hidden rounded-lg shadow-xl group cursor-pointer"
        whileHover={{ y: -5 }}
        transition={{ duration: 0.3 }}
      >
        <div className="absolute inset-0 bg-gradient-to-t from-[#31004d]/80 to-transparent opacity-0 group-hover:opacity-80 transition-opacity duration-300 z-10 flex items-end">
          <div className="p-6 w-full">
            <h3 className="text-xl font-bold text-white mb-2 translate-y-4 group-hover:translate-y-0 transition-transform duration-300">Thinking</h3>
            <p className="text-white/80 opacity-0 group-hover:opacity-100 transition-all duration-300 delay-100">Pengerjaan Finalis GIS Unesa 2024</p>
          </div>
        </div>
        <img
          src={kegiatan5}
          alt="GIS Unesa Event 5"
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
        />
      </motion.div>
      
      <motion.div 
        className="relative h-64 overflow-hidden rounded-lg shadow-xl group cursor-pointer"
        whileHover={{ y: -5 }}
        transition={{ duration: 0.3 }}
      >
        <div className="absolute inset-0 bg-gradient-to-t from-[#31004d]/80 to-transparent opacity-0 group-hover:opacity-80 transition-opacity duration-300 z-10 flex items-end">
          <div className="p-6 w-full">
            <h3 className="text-xl font-bold text-white mb-2 translate-y-4 group-hover:translate-y-0 transition-transform duration-300">The Winner</h3>
            <p className="text-white/80 opacity-0 group-hover:opacity-100 transition-all duration-300 delay-100">Juara lomba KTI tingkat Mahasiswa</p>
          </div>
        </div>
        <img
          src={kegiatan6}
          alt="GIS Unesa Event 6"
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
        />
      </motion.div>
    </div>
  </div>
</motion.div>

      {/* Sponsors */}
      <motion.div
        id="sponsors"
        className="max-w-screen-xl mx-auto"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
      >
        <SectionTitle subtitle="Terima kasih kepada sponsor dan media partner yang telah mendukung acara GIS Unesa 2025">
          Sponsor & Media Partner
        </SectionTitle>

        <div className="mb-3">
          <h3 className="text-3xl font-bold text-white mb-8 text-center">Sponsor</h3>
          <div className="grid grid-cols-2 md:grid-cols-5 gap-8">
            {[sponsor1, sponsor2, sponsor3, sponsor4, sponsor5].map((logo, index) => (
              <motion.div
                key={index}
                className="bg-white rounded-xl p-4 flex items-center justify-center shadow-lg hover:shadow-xl transition-all duration-300"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                whileHover={{ y: -5 }}
              >
                <img src={logo} alt={`Sponsor ${index + 1}`} className="max-h-20" />
              </motion.div>
            ))}
          </div>
        </div>
      </motion.div>

      <MediaPartner />

      {/* FAQ Section */}
      <FAQ />

      {/* CTA Section */}
      <motion.div
        className="max-w-screen-xl mx-auto text-center mb-20"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
      >
        <div className="bg-gradient-to-r from-[#31004d]/50 to-[#A78BFA]/50 p-10 md:p-16 rounded-3xl backdrop-blur-sm border border-white/10">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
            Siap Untuk Bergabung di GIS Unesa 2025?
          </h2>
          <p className="text-lg text-white/80 mb-8 max-w-xl mx-auto">
            Jangan lewatkan kesempatan untuk menunjukkan potensimu dan menjadi bagian dari kompetisi bergengsi tingkat nasional ini!
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <GradientButton primary={true}>
              Daftar Sekarang
            </GradientButton>
            <GradientButton primary={false}>
              Pelajari Selengkapnya
            </GradientButton>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default Deskripsi;