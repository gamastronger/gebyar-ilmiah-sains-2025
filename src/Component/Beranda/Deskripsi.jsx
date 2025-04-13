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
        initial={{ opacity: 0, y: 30, filter: "blur(4px)" }}
        whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
        viewport={{ once: true, amount: 0.2 }} // muncul saat 20% elemennya terlihat
        transition={{ duration: 0.8, ease: "easeOut" }}
      >
        <div className="flex flex-col items-center gap-8">

          {/* Judul */}
          <motion.h1
            className="font-bold text-4xl lg:text-5xl leading-tight mb-2 text-white font-[Arial Sans]"
            initial={{ opacity: 0, y: 30, filter: "blur(4px)" }}
            whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
          >
            Poster
          </motion.h1>

          {/* Gambar Poster */}
          <motion.div
            className="bg-whitelg:w-[290px]"
            initial={{ opacity: 0, y: 30, filter: "blur(4px)" }}
            whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.8, delay: 0.4, ease: "easeOut" }}
          >
            <TiltCard>
              <img
                src={jajal}
                alt="Grafistix Hero"
                className="w-full h-auto rounded-lg shadow-xl"
              />
            </TiltCard>
          </motion.div>

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
                initial={{ opacity: 0, y: 30, filter: "blur(4px)" }}
                whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{
                  duration: 0.8,
                  delay: 0.6 + index * 0.2,
                  ease: "easeOut",
                }}
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

      {/* Deskripsi Lomba KTI */}
      <motion.div
        className="max-w-screen-xl mt-20 mx-auto px-6"
        initial={{ opacity: 0, y: 30, filter: "blur(4px)" }}
        whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
      >
        <div className="grid grid-cols-1 lg:grid-cols-2 items-center gap-20-lg">
          {/* Gambar KTI */}
          <motion.div
            className="hover:scale-105 transition-transform lg:w-[400px] w-full lg:mr-9 md:ml-5"
            initial={{ opacity: 0, y: 30, filter: "blur(4px)" }}
            whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            <img
              src={foto4}
              alt="Grafistix Hero"
              className="w-full h-auto rounded-lg shadow-xl transition-transform duration-300 hover:scale-105 hover:rotate-3"
            />
          </motion.div>

          {/* Teks KTI */}
          <div className="md:pl-2 w-full lg:pr-9">
            <h1 className="font-bold text-5xl leading-tight mb-4 text-white">
              Karya Tulis Ilmiah
            </h1>
            <p className="text-lg mb-5 text-justify text-white">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam
              eget felis eget nunc lacinia lacinia. Nullam nec nunc nec
              nunceget felis eget nunc lacinia lacinia. Nullam nec nunc nec.
            </p>
            <div className="flex flex-row gap-4 w-full">
              <button className="bg-[#480079] text-white px-8 py-3 rounded-lg font-semibold hover:scale-105 hover:bg-[#9800ff] hover:text-[#FFFFFF] transition text-center">
                Daftar
              </button>
              <button className="bg-[#480079] text-white px-8 py-3 rounded-lg font-semibold hover:scale-105 hover:bg-[#9800ff] hover:text-[#FFFFFF] transition text-center">
                Login
              </button>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Deskripsi Lomba CBT */}
      <motion.div
        className="max-w-screen-xl mt-20 mx-auto px-10"
        initial={{ opacity: 0, y: 30, filter: "blur(4px)" }}
        whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
      >
        <div className="grid grid-cols-1 lg:grid-cols-2 items-center gap-20">
          {/* Teks CBT */}
          <div className="md:pl-2 w-full lg:pr-9">
            <h1 className="font-bold text-5xl lg:text-5xl leading-tight mb-4 lg:mb-6 text-white">
              Olimpiade CBT
            </h1>
            <p className="text-lg lg:text-l mb-5 lg:mb-8 text-justify text-white">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam
              eget felis eget nunc lacinia lacinia. Nullam nec nunc nec
              nunceget felis eget nunc lacinia lacinia. Nullam nec nunc nec.
            </p>
            <div className="flex flex-row gap-4 w-full">
              <button className="bg-[#480079] text-white px-8 py-3 rounded-lg font-semibold hover:scale-105 hover:bg-[#9800ff] hover:text-[#FFFFFF] transition text-center">
                Daftar
              </button>
              <button className="bg-[#480079] text-white px-8 py-3 rounded-lg font-semibold hover:scale-105 hover:bg-[#9800ff] hover:text-[#FFFFFF] transition text-center">
                Login
              </button>
            </div>
          </div>

          {/* Gambar CBT */}
          <motion.div
            className="hover:scale-105 transition-transform lg:w-[400px] w-full lg:ml-9"
            initial={{ opacity: 0, y: 30, filter: "blur(4px)" }}
            whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            <img
              src={foto4}
              alt="Grafistix Hero"
              className="w-full h-auto rounded-lg shadow-xl transition-transform duration-300 hover:scale-105 hover:rotate-3"
            />
          </motion.div>
        </div>
      </motion.div>


      {/* Contact Person Section */}
<motion.div
  id="contact-person"
  className="mt-20 max-w-screen-xl mx-auto px-6"
  initial={{ opacity: 0, y: 30, filter: "blur(4px)" }}
  whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
  viewport={{ once: true, amount: 0.2 }}
  transition={{ duration: 0.8, ease: "easeOut" }}
>
  <div className="text-center mb-16">
    <h2 className="text-4xl font-bold text-white mb-4">
      Contact Person
    </h2>
    <p className="text-gray-500 text-lg">
      Hubungi narahubung berikut untuk informasi lebih lanjut seputar lomba.
    </p>
  </div>

  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
    {[
      {
        title: "Karya Tulis Ilmiah (KTI)",
        contacts: [
          { name: "Gama", role: "CP1", phone: "+6281234567890" },
          { name: "Angel", role: "CP2", phone: "+6281345678901" },
        ],
      },
      {
        title: "Olimpiade CBT",
        contacts: [
          { name: "Raka", role: "CP1", phone: "+6281298765432" },
          { name: "Nina", role: "CP2", phone: "+6281387654321" },
        ],
      },
    ].map((section, index) => (
      <motion.div
        key={index}
        className="bg-white border-l-4 border-[#480079] p-6 rounded-xl shadow-md hover:shadow-lg transition"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: index * 0.2 }}
      >
        <h3 className="text-2xl font-bold text-[#480079] mb-4">
          {section.title}
        </h3>
        <div className="space-y-4">
          {section.contacts.map((contact, idx) => (
            <div
              key={idx}
              className="flex items-center justify-between bg-gray-100 px-4 py-3 rounded-lg"
            >
              <div>
                <p className="text-md font-semibold text-gray-800">{contact.name}</p>
                <p className="text-sm text-gray-500">{contact.role}</p>
              </div>
              <a
                href={`https://wa.me/${contact.phone.replace(/\+/g, "")}`}
                target="_blank"
                rel="noopener noreferrer"
                className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-md font-medium transition"
              >
                WhatsApp
              </a>
            </div>
          ))}
        </div>
      </motion.div>
    ))}
  </div>
</motion.div>



      {/* Dokumentasi Kegiatan */}
      <motion.div
        className="mt-20 max-w-screen-xl mx-auto px-6"
        initial={{ opacity: 0, y: 30, filter: "blur(4px)" }}
        whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
      >
        <h2 className="text-4xl font-bold text-center mb-8 text-white">Dokumentasi Kegiatan</h2>

        {/* Scroll Container Ref */}
        {(() => {
          const scrollRef = useRef(null);
          const itemWidth = 295 + 16; // Gambar (295px) + gap (16px)

          return (
            <div className="relative">
              {/* Tombol Navigasi Kiri */}
              <button
                className="absolute left-2 top-1/2 transform -translate-y-1/2 bg-[#31004d] text-white px-1 py-6 rounded-l-lg rounded-r-lg shadow-lg hover:scale-105 hover:bg-[#5a0098] hover:shadow-xl transition-all duration-300 z-10"
                onClick={() => {
                  if (scrollRef.current) {
                    scrollRef.current.scrollBy({ left: -itemWidth, behavior: "smooth" });
                  }
                }}
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
                </svg>
              </button>

              {/* Tombol Navigasi Kanan */}
              <button
                className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-[#31004d] text-white px-1 py-6 rounded-l-lg rounded-r-lg shadow-lg hover:scale-105 hover:bg-[#5a0098] hover:shadow-xl transition-all duration-300 z-10"
                onClick={() => {
                  if (scrollRef.current) {
                    scrollRef.current.scrollBy({ left: itemWidth, behavior: "smooth" });
                  }
                }}
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                </svg>
              </button>

              {/* Kontainer Scroll */}
              <div
                ref={scrollRef}
                className="mx-auto w-[920px] max-w-full flex space-x-4 py-4 overflow-x-auto scrollbar-hide scroll-smooth"
                style={{
                  scrollbarWidth: "none",
                  msOverflowStyle: "none",
                }}
              >
                {[kegiatan1, kegiatan2, kegiatan3, kegiatan4, kegiatan5].map((imgSrc, index) => (
                  <motion.div
                    key={index}
                    className="flex-shrink-0 w-[295px] h-[200px] relative group transition-transform duration-300"
                    initial={{ opacity: 0, scale: 1 }}
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
          );
        })()}
      </motion.div>

      {/* Sponsor Section */}
      <motion.div
        className="mt-20 max-w-screen-xl mx-auto px-6"
        initial={{ opacity: 0, y: 30, filter: "blur(4px)" }}
        whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
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
                initial={{ opacity: 0, scale: 0.9 }}
                whileHover={{ scale: 1.1, opacity: 1 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true, amount: 0.2 }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = "scale(1.1)";
                  e.currentTarget.style.boxShadow = "0px 10px 20px rgba(0, 0, 0, 0.2)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = "scale(1)";
                  e.currentTarget.style.boxShadow = "0px 4px 10px rgba(0, 0, 0, 0.1)";
                }}
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
      <div className="mt-20 max-w-screen-xl mx-auto px-6 overflow-hidden">
        <h2 className="text-4xl font-bold text-center mb-8 text-white">Media Partner</h2>

        <div className="relative w-full overflow-hidden">
          <motion.div
            className="flex gap-14 w-max"
            animate={{ x: ["0%", "-50%"] }}
            transition={{
              repeat: Infinity,
              duration: 20, // Ubah durasi sesuai kecepatan yang diinginkan
              ease: "linear",
            }}
          >
            {/* Duplikasi isi agar bisa seamless */}
            {[...Array(2)].flatMap((_, i) =>
              [
                mediaPartner1, mediaPartner2, mediaPartner3, mediaPartner4, mediaPartner5,
                mediaPartner6, mediaPartner7, mediaPartner8, mediaPartner9, mediaPartner10
              ].map((partner, index) => (
                <div
                  key={`${i}-${index}`}
                  className="flex items-center justify-center bg-white rounded-lg shadow-lg w-[130px] h-[90px] md:w-[150px] md:h-[110px] transition-transform duration-300 hover:scale-110 hover:shadow-xl shrink-0"
                >
                  <img
                    src={partner}
                    alt={`Media Partner ${index + 1}`}
                    className="max-w-[70px] md:max-w-[90px] w-auto h-auto object-contain"
                  />
                </div>
              ))
            )}
          </motion.div>
        </div>
      </div>

    </div>
  );
};

export default Deskripsi;