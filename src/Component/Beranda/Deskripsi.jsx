import { motion, useMotionValue, useMotionTemplate } from "framer-motion"; // Tambahkan impor yang hilang
import { useRef } from "react"; // Import useRef for tilt effect
import foto4 from "../../assets/gimage.jpeg";
import facebookLogo from "../../assets/facebooklogo.png";
import instagramLogo from "../../assets/instagramlogo.png";
import twitterLogo from "../../assets/linkedlogo.png";
import kegiatan1 from "../../assets/gimage.jpeg";
import kegiatan2 from "../../assets/gimage.jpeg";
import kegiatan3 from "../../assets/gimage.jpeg";
import kegiatan4 from "../../assets/gimage.jpeg";
import kegiatan5 from "../../assets/gimage.jpeg";
import backgroundImage from "../../assets/bgsementara2.jpg";
import sponsor1 from "../../assets/gimage.jpeg";
import sponsor2 from "../../assets/gimage.jpeg";
import sponsor3 from "../../assets/gimage.jpeg";
import sponsor4 from "../../assets/gimage.jpeg";
import sponsor5 from "../../assets/gimage.jpeg";
import mediaPartner1 from "../../assets/gimage.jpeg";
import mediaPartner2 from "../../assets/gimage.jpeg";
import mediaPartner3 from "../../assets/gimage.jpeg";
import mediaPartner4 from "../../assets/gimage.jpeg";
import mediaPartner5 from "../../assets/gimage.jpeg";
import mediaPartner6 from "../../assets/gimage.jpeg";
import mediaPartner7 from "../../assets/gimage.jpeg";
import mediaPartner8 from "../../assets/gimage.jpeg";
import mediaPartner9 from "../../assets/gimage.jpeg";
import mediaPartner10 from "../../assets/gimage.jpeg";
import jajal from "../../assets/poster.jpg";

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

    const mouseX = (e.clientX - rect.left) * ROTATION_RANGE;
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
      className="relative h-96 w-72 rounded-xl bg-[#31004d]"
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

const Deskripsi = () => {
  return (
    <div
      id="deskripsi"
      style={{
        backgroundImage: `url(${backgroundImage})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
      className="text-black py-16 px-8 lg:px-16"
    >
      {/* POSTER */}
      <motion.div
        className="max-w-screen-xl mx-auto"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="flex flex-col items-center gap-8">
          <h1 className="font-bold text-4xl lg:text-5xl leading-tight mb-2 text-white font-[Arial Sans]">
            Poster
          </h1>
          <div className="bg-whitelg:w-[290px]">
            <TiltCard>
              <img
                src={jajal}
                alt="Grafistix Hero"
                className="w-full h-auto rounded-lg shadow-xl"
              />
            </TiltCard>
          </div>

          {/* Sosial Media */}
          <div className="grid grid-cols-3 gap-8 justify-center mt-0">
            {[
              { logo: facebookLogo, name: "Facebook", color: "#4267B2" },
              { logo: twitterLogo, name: "Twitter", color: "#1DA1F2" },
              { logo: instagramLogo, name: "Instagram", color: "#E1306C" },
            ].map((social, index) => (
              <motion.div
                key={index}
                className="flex flex-col items-center"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.2 }}
              >
                <a
                  href="#"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:scale-110 hover:rotate-6 transition-transform"
                >
                  <img src={social.logo} alt={social.name} className="w-11 h-11" />
                </a>
                <span
                  className="mt-2 text-sm font-semibold"
                  style={{ color: social.color }}
                >
                  {social.name}
                </span>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.div>

      {/* Deskripsi Lomba */}
      <motion.div
        className="max-w-screen-xl mt-20 mx-auto"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="grid grid-cols-1 lg:grid-cols-2 items-center gap-12">
          {/* Teks di sebelah kiri */}
          <div className="w-full lg:pr-9 lg:ml-6">
            <h1 className="font-bold text-5xl leading-tight mb-4 text-white">
              Karya Tulis Ilmiah
            </h1>
            <p className="text-lg mb-5 text-justify text-white">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam
              eget felis eget nunc lacinia lacinia. Nullam nec nunc nec.
            </p>
            <div className="flex flex-row gap-4 w-full">
              <button className="bg-purple-700 text-white px-8 py-3 rounded-lg font-semibold hover:scale-105 hover:bg-[#18334F] hover:text-[#0089C4] transition text-center">
                Daftar
              </button>
              <button className="bg-[#4FA3D1] text-white px-8 py-3 rounded-lg font-semibold hover:scale-105 hover:bg-[#3A8BB5] hover:text-[#FFFFFF] transition text-center">
                Login
              </button>
            </div>
          </div>

          {/* Gambar di sebelah kanan */}
          <div className="hover:scale-105 transition-transform lg:w-[400px] w-full lg:ml-19">
            <motion.img
              src={foto4}
              alt="Grafistix Hero"
              className="w-full h-auto rounded-lg shadow-xl transition-transform duration-300 hover:scale-105 hover:rotate-3"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
            />
          </div>
        </div>
      </motion.div>

      {/* Deskripsi Lomba */}
      <motion.div
        className="max-w-screen-xl mt-20 mx-auto"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="grid grid-cols-1 lg:grid-cols-2 items-center gap-12">
          {/* Gambar di sebelah kanan */}
          <div className="hover:scale-105 transition-transform lg:w-[400px] w-full lg:ml-9">
            <motion.img
              src={foto4}
              alt="Grafistix Hero"
              className="w-full h-auto rounded-lg shadow-xl transition-transform duration-300 hover:scale-105 hover:rotate-3"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
            />
          </div>
          
          {/* Teks di sebelah kiri */}
          <div className="w-full lg:pr-9 lg:-ml-9">
            <h1 className="font-bold text-5xl lg:text-5xl leading-tight mb-4 lg:mb-6 text-white">
              Olimpiade CBT
            </ h1>
            <p className="text-lg lg:text-l mb-5 lg:mb-8 text-justify text-white">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam
              eget felis eget nunc lacinia lacinia. Nullam nec nunc nec
              nunceget felis eget nunc lacinia lacinia. Nullam nec nunc nec.
            </p>
            <div className="flex flex-row gap-4 w-full">
              <button className="bg-purple-700 text-white px-8 py-3 rounded-lg font-semibold hover:scale-105 hover:bg-[#18334F] hover:text-[#0089C4] transition text-center">
                Daftar
              </button>
              <button className="bg-[#4FA3D1] text-white px-8 py-3 rounded-lg font-semibold hover:scale-105 hover:bg-[#3A8BB5] hover:text-[#FFFFFF] transition text-center">
                Login
              </button>
            </div>
          </div>          
        </div>
      </motion.div>

      {/* Contact Person Section */}
      <motion.div
        id="contact-person" // Tambahkan ID di sini
        className="mt-20 max-w-screen-xl mx-auto"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h2 className="text-4xl font-bold text-center mb-12 text-white">
          Contact Person
        </h2>
        <div className="px-8 grid grid-cols-1 md:grid-cols-2 gap-9 text-white">
          {[
            {
              title: "KTI",
              contacts: [
                { name: "Gama", role: "CP1", phone: "+6281234567890" },
                { name: "Angel", role: "CP2", phone: "+6281345678901" },
              ],
            },
            {
              title: "CBT",
              contacts: [
                { name: "Raka", role: "CP1", phone: "+6281298765432" },
                { name: "Nina", role: "CP2", phone: "+6281387654321" },
              ],
            },
          ].map((section, index) => (
            <motion.div
              key={index}
              className="p-6 rounded-lg shadow-lg bg-[#31004d]"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.2 }}
            >
              <h3 className="text-2xl font-bold text-center mb-4 text-white">
                {section.title}
              </h3>
              <div className="space-y-4">
                {section.contacts.map((contact, idx) => (
                  contact.name && contact.role && contact.phone ? (
                    <div
                      key={idx}
                      className="flex items-center justify-between bg-[#420066] text-white p-4 rounded-lg shadow-md"
                    >
                      <div>
                        <p className="text-lg font-semibold">{contact.name}</p>
                        <p className="text-sm text-gray-500">{contact.role}</p>
                      </div>
                      <a
                        href={`https://wa.me/${contact.phone.replace(/\+/g, "")}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="bg-green-500 text-white px-2 py-2 rounded-lg font-semibold hover:bg-green-600 hover:scale-105 transition-transform transition"
                      >
                        WhatsApp
                      </a>
                    </div>
                  ) : null
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>
  
      {/* Dokumentasi Kegiatan */}
      <motion.div
        className="mt-20 max-w-screen-xl mx-auto px-6"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h2 className="text-4xl font-bold text-center mb-8 text-white">
          Dokumentasi Kegiatan
        </h2>
        <div className="relative">
          {/* Tombol Navigasi Kiri */}
          <button
            className="absolute left-2 top-1/2 transform -translate-y-1/2 bg-[#31004d] text-white px-1 py-6 rounded-l-lg rounded-r-lg shadow-lg hover:scale-105 hover:shadow-xl transition-all duration-300 z-10"
            onClick={() => {
              const container = document.getElementById("scroll-container");
              if (container) {
                container.scrollBy({ left: -300, behavior: "smooth" });
              }
            }}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="w-6 h-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
            </svg>
          </button>

          {/* Tombol Navigasi Kanan */}
          <button
            className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-[#31004d] text-white px-1 py-6 rounded-l-lg rounded-r-lg shadow-lg hover:scale-105 hover:shadow-xl transition-all duration-300 z-10"
            onClick={() => {
              const container = document.getElementById("scroll-container");
              if (container) {
                container.scrollBy({ left: 300, behavior: "smooth" });
              }
            }}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="w-6 h-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
            </svg>
          </button>

          {/* Kontainer Scroll */}
          <div
            id="scroll-container"
            className="flex flex-row space-x-4 py-4 overflow-x-auto scrollbar-hide"
            style={{
              scrollbarWidth: "none", // Untuk browser modern
              msOverflowStyle: "none", // Untuk Internet Explorer
              scrollBehavior: "smooth", // Transisi smooth
            }}
          >
            {[kegiatan1, kegiatan2, kegiatan3, kegiatan4, kegiatan5].map((imgSrc, index) => (
              <motion.div
                key={index}
                className="flex-shrink-0 w-[250px] h-[150px] sm:w-[300px] sm:h-[200px] relative group transition-transform duration-300"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: index * 0.2 }}
              >
                <img
                  src={imgSrc}
                  alt={`Kegiatan ${index + 1}`}
                  className="w-full h-full object-cover rounded-lg shadow-lg group-hover:scale-105 group-hover:shadow-2xl transition-all duration-300"
                />
              </motion.div>
            ))}
          </div>
        </div>
      </motion.div>

      {/* Sponsor Section */}
      <motion.div
        className="mt-20 max-w-screen-xl mx-auto px-6"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h2 className="text-4xl font-bold text-center mb-8 text-white">
          Sponsor
        </h2>
        <div className="flex justify-center">
          <div className="grid grid-cols-2 mt-4 sm:grid-cols-5 gap-14">
            {[sponsor1, sponsor2, sponsor3, sponsor4, sponsor5].map((sponsor, index) => (
              <motion.div 
                key={index} 
                className="flex items-center justify-center bg-white rounded-lg shadow-lg w-[130px] h-[90px] md:w-[150px] md:h-[110px] transition-transform duration-300 hover:scale-110 hover:shadow-xl"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.2 }}
              >
                <img 
                  src={sponsor} 
                  alt={`Sponsor ${index + 1}`} 
                  className="max-w-[70px] md:max-w-[90px] w-auto h-auto object-contain"
                />
              </motion.div>
            ))}
          </div>
        </div>
      </motion.div>

      {/* Media Partner Section */}
      <motion.div
        className="mt-20 max-w-screen-xl mx-auto px-6"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h2 className="text-4xl font-bold text-center mb-8 text-white">Media Partner</h2>
        <div className="flex justify-center">
          <div className="grid grid-cols-2 sm:grid-cols-5 gap-14 mt-4">
            {[mediaPartner1, mediaPartner2, mediaPartner3, mediaPartner4, mediaPartner5, mediaPartner6, mediaPartner7, mediaPartner8, mediaPartner9, mediaPartner10].map((partner, index) => (
              <motion.div 
                key={index} 
                className="flex items-center justify-center bg-white rounded-lg shadow-lg w-[130px] h-[90px] md:w-[150px] md:h-[110px] transition-transform duration-300 hover:scale-110 hover:shadow-xl"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.2 }}
              >
                <img 
                  src={partner} 
                  alt={`Media Partner ${index + 1}`} 
                  className="max-w-[70px] md:max-w-[90px] w-auto h-auto object-contain"
                />
              </motion.div>
            ))}
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default Deskripsi;