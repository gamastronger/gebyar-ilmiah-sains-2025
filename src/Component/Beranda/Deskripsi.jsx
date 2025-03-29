import foto4 from "../../assets/gimage.jpeg";
// import poster from "../../assets/poster bawah.png";
import facebookLogo from "../../assets/facebooklogo.png";
import instagramLogo from "../../assets/instagramlogo.png";
import twitterLogo from "../../assets/linkedlogo.png";
import kegiatan1 from "../../assets/gimage.jpeg";
import kegiatan2 from "../../assets/gimage.jpeg";
import kegiatan3 from "../../assets/gimage.jpeg";
import kegiatan4 from "../../assets/gimage.jpeg";
import kegiatan5 from "../../assets/gimage.jpeg";
import backgroundImage from "../../assets/bgsementara2.jpg";
import sponsor1 from "../../assets/corel.png";
import sponsor2 from "../../assets/corel.png";
import sponsor3 from "../../assets/corel.png";
import sponsor4 from "../../assets/corel.png";
import sponsor5 from "../../assets/corel.png";// Ganti dengan path gambar yang sesuai
import mediaPartner1 from "../../assets/corel.png";
import mediaPartner2 from "../../assets/corel.png"; // Ganti dengan path gambar yang sesuai
import mediaPartner3 from "../../assets/corel.png";
import mediaPartner4 from "../../assets/corel.png"; // Ganti dengan path gambar yang sesuai
import mediaPartner5 from "../../assets/corel.png";
import mediaPartner6 from "../../assets/corel.png";
import mediaPartner7 from "../../assets/corel.png";
import mediaPartner8 from "../../assets/corel.png";
import mediaPartner9 from "../../assets/corel.png";
import mediaPartner10 from "../../assets/corel.png"; // Ganti dengan path gambar yang sesuai


const Deskripsi = () => {
  return (
    <div
      id="deskripsi"
      style={{
        backgroundImage: `url(${backgroundImage})`,
        backgroundSize: 'cover', // Cover the entire area
        backgroundPosition: 'center', // Center the image
      }}
      className="text-black py-16 px-8 lg:px-16"
    >
      {/* Social Media Section */}
      <div className="max-w-screen-xl mx-auto">
        <div className="flex flex-col items-center gap-8">
          {/* Gambar di tengah */}
          <h1 className="font-bold text-4xl lg:text-5xl leading-tight mb-2 lg:mb-2 text-white font-[Arial Sans]">
            Poster
          </h1>
          <div className="lg:w-[350px]">
            <img
              src={foto4}
              alt="Grafistix Hero"
              className="w-full h-auto rounded-lg shadow-xl hover:scale-105 transition-transform"
            />
          </div>

          {/* Sosial Media */}
          <div className="grid grid-cols-3 gap-8 justify-center mt-0">
            {/* Facebook */}
            <div className="flex flex-col items-center">
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:scale-110 hover:rotate-6 transition-transform"
              >
                <img
                  src={facebookLogo}
                  alt="Facebook"
                  className="w-11 h-11"
                />
              </a>
              <span className="mt-2 text-s font-semibold text-[#4267B2]">
                Facebook
              </span>
            </div>

            {/* Twitter */}
            <div className="flex flex-col items-center">
              <a
                href="https://twitter.com"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:scale-110 hover:rotate-6 transition-transform"
              >
                <img
                  src={twitterLogo}
                  alt="Twitter"
                  className="w-11 h-11"
                />
              </a>
              <span className="mt-2 text-sm font-semibold text-[#1DA1F2]">
                Twitter
              </span>
            </div>

            {/* Instagram */}
            <div className="flex flex-col items-center">
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:scale-110 hover:rotate-6 transition-transform"
              >
                <img
                  src={instagramLogo}
                  alt="Instagram"
                  className="w-11 h-11"
                />
              </a>
              <span className="mt-2 text-sm font-semibold text-[#E1306C]">
                Instagram
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Deskripsi Lomba */}
      <div className="max-w-screen-xl mt-20 mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 items-center gap-12">
          {/* Teks di sebelah kiri */}
          <div className="w-full lg:pr-9 lg:ml-6">
          <h1 className="font-bold text-5xl lg:text-5xl leading-tight mb-4 lg:mb-6 text-white">
              Karya Tulis Ilmiah
            </h1>
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

          {/* Gambar di sebelah kanan */}
          <div className="lg:w-[400px] w-full lg:ml-19">
            <img
              src={foto4}
              alt="Grafistix Hero"
              className="w-full h-auto rounded-lg shadow-xl transition-transform duration-300 hover:scale-105 hover:rotate-3"
            />
          </div>
        </div>
      </div>

      {/* Deskripsi Lomba */}
      <div className="max-w-screen-xl mt-20 mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 items-center gap-12">
          {/* Gambar di sebelah kanan */}
          <div className="lg:w-[400px] w-full lg:ml-9">
            <img
              src={foto4}
              alt="Grafistix Hero"
              className="w-full h-auto rounded-lg shadow-xl transition-transform duration-300 hover:scale-105 hover:rotate-3"
            />
          </div>
          
          {/* Teks di sebelah kiri */}
          <div className="w-full lg:pr-9 lg:-ml-9">
          <h1 className="font-bold text-5xl lg:text-5xl leading-tight mb-4 lg:mb-6 text-white">
              Olimpiade CBT
            </h1>
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
      </div>

      {/* Contact Person Section */}
      <div className="mt-20 max-w-screen-xl mx-auto">
        <h2 className="text-4xl font-bold text-center mb-12 text-white">
          Contact Person
        </h2>
        <div className="px-8 grid grid-cols-1 md:grid-cols-2 gap-9">
          {[
            {
              title: "KTI",
              contacts: [
                { name: "Gama", role: "CP1", phone: "+6281234567890" },
                { name: "Angel", role: "CP2", phone: "+6281345678901" },
              ],
              color: "bg-purple-300",
              textColor: "text-[#1E0038]", // Warna teks untuk KTI
            },
            {
              title: "CBT",
              contacts: [
                { name: "Raka", role: "CP1", phone: "+6281298765432" },
                { name: "Nina", role: "CP2", phone: "+6281387654321" },
              ],
              color: "bg-purple-300",
              textColor: "text-[#1E0038]", // Warna teks untuk CBT
            },
          ].map((section, index) => (
            <div
              key={index}
              className={`p-6 rounded-lg shadow-lg ${section.color}`}
            >
              <h3
                className={`text-2xl font-bold text-center mb-4 ${section.textColor}`}
              >
                {section.title}
              </h3>
              <div className="space-y-4">
                {section.contacts.map((contact, idx) => (
                  <div
                    key={idx}
                    className="flex items-center justify-between bg-white text-black p-4 rounded-lg shadow-md"
                  >
                    <div>
                      <p className="text-lg font-semibold">{contact.name}</p>
                      <p className="text-sm text-gray-500">{contact.role}</p>
                    </div>
                    <a
                      href={`https://wa.me/${contact.phone.replace(/\+/g, "")}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="bg-green-500 text-white px-2 py-2 rounded-lg font-semibold hover:bg-green-600 transition"
                    >
                      WhatsApp
                    </a>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
  
      {/* Dokumentasi Kegiatan */}
      <div className="mt-20 max-w-screen-xl mx-auto px-6">
        <h2 className="text-4xl font-bold text-center mb-8 text-white">
          Dokumentasi Kegiatan
        </h2>
        <div className="relative">
          {/* Kontainer Scroll */}
          <div
            className="flex flex-row space-x-4 py-4 overflow-x-auto scrollbar-hide"
            style={{
              scrollbarWidth: "none", // Untuk browser modern
              msOverflowStyle: "none", // Untuk Internet Explorer
            }}
          >
            {[kegiatan1, kegiatan2, kegiatan3, kegiatan4, kegiatan5].map((imgSrc, index) => (
              <div
                key={index}
                className="flex-shrink-0 w-[250px] h-[150px] sm:w-[300px] sm:h-[200px] relative group transition-transform duration-300"
              >
                <img
                  src={imgSrc}
                  alt={`Kegiatan ${index + 1}`}
                  className="w-full h-full object-cover rounded-lg shadow-lg group-hover:scale-105 group-hover:shadow-2xl transition-all duration-300"
                />
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Sponsor Section */}
      <div className="mt-20 max-w-screen-xl mx-auto px-6">
        <h2 className="text-4xl font-bold text-center mb-8 text-white">
          Sponsor
        </h2>
        <div className="flex justify-center">
          <div className="grid grid-cols-2 mt-4 sm:grid-cols-5 gap-14">
            {[sponsor1, sponsor2, sponsor3, sponsor4, sponsor5].map((sponsor, index) => (
              <div 
                key={index} 
                className="flex items-center justify-center bg-white rounded-lg shadow-lg w-[130px] h-[90px] md:w-[150px] md:h-[110px] transition-transform duration-300 hover:scale-110 hover:shadow-xl"
              >
                <img 
                  src={sponsor} 
                  alt={`Sponsor ${index + 1}`} 
                  className="max-w-[70px] md:max-w-[90px] w-auto h-auto object-contain"
                />
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Media Partner Section */}
      <div className="mt-20 max-w-screen-xl mx-auto px-6">
        <h2 className="text-4xl font-bold text-center mb-8 text-white">Media Partner</h2>
        <div className="flex justify-center">
          <div className="grid grid-cols-2 sm:grid-cols-5 gap-14 mt-4">
            {[mediaPartner1, mediaPartner2, mediaPartner3, mediaPartner4, mediaPartner5, mediaPartner6, mediaPartner7, mediaPartner8, mediaPartner9, mediaPartner10].map((partner, index) => (
              <div 
                key={index} 
                className="flex items-center justify-center bg-white rounded-lg shadow-lg w-[130px] h-[90px] md:w-[150px] md:h-[110px] transition-transform duration-300 hover:scale-110 hover:shadow-xl"
              >
                <img 
                  src={partner} 
                  alt={`Media Partner ${index + 1}`} 
                  className="max-w-[70px] md:max-w-[90px] w-auto h-auto object-contain"
                />
              </div>
            ))}
          </div>
        </div>
      </div>



    </div>
  );
};

export default Deskripsi;