import { Link } from "react-router-dom";
import { motion } from "framer-motion";

const Footer = () => {
  // Using SVG icons instead of image imports for better quality and consistency
  const socialIcons = {
instagram: (
<svg className="w-6 h-6 fill-current" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" >
<path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" />
</svg>
),
tiktok: (
<svg className="w-6 h-6 fill-current" viewBox="0 0 48 48" xmlns="http://www.w3.org/2000/svg" >
<path d="M41,16.2c-3.8,0-7-2.5-8-6v-2h-6v26.7c0,3.5-2.9,6.3-6.4,6.3s-6.4-2.8-6.4-6.3s2.9-6.3,6.4-6.3c0.5,0,1,0.1,1.5,0.2v-6.2 c-0.5-0.1-1-0.1-1.5-0.1c-6.9,0-12.5,5.6-12.5,12.4s5.6,12.4,12.5,12.4S35,39.3,35,32.5V19.4c2.3,1.1,4.8,1.7,7.4,1.7H43v-5 C42.4,16.2,41.7,16.2,41,16.2z" />
</svg>
),
};

  const containerAnimation = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  };

  const itemAnimation = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5 },
    },
  };

  return (
    <footer className="relative bg-gradient-to-b from-[#290040] to-[#0c0011] text-white overflow-hidden">
      {/* Stylized top border */}
      <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-purple-800/0 via-purple-400 to-purple-800/0"></div>
      
      {/* Decorative elements - improved glow effects */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-0 left-0 w-96 h-96 rounded-full bg-purple-500/10 blur-3xl animate-pulse"></div>
        <div className="absolute bottom-0 right-20 w-80 h-80 rounded-full bg-purple-700/10 blur-3xl"></div>
        <div className="absolute top-40 right-10 w-60 h-60 rounded-full bg-indigo-500/5 blur-3xl animate-pulse" style={{ animationDuration: '8s', animationDelay: '1s' }}></div>
        <div className="absolute bottom-40 left-20 w-72 h-72 rounded-full bg-pink-600/5 blur-3xl animate-pulse" style={{ animationDuration: '10s' }}></div>
        
        {/* Particle effect - subtle dots */}
        <div className="absolute inset-0 opacity-30">
          {[...Array(20)].map((_, i) => (
            <div 
              key={i}
              className="absolute w-1 h-1 bg-purple-300 rounded-full"
              style={{
                top: `${Math.random() * 100}%`,
                left: `${Math.random() * 100}%`,
                opacity: Math.random() * 0.5 + 0.25
              }}
            ></div>
          ))}
        </div>
      </div>

      

      <motion.div 
        className="max-w-screen-xl mx-auto py-16 px-6 lg:px-8 relative z-10"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={containerAnimation}
      >
        
        <motion.div variants={itemAnimation} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-x-12 gap-y-16">
          {/* About Column */}
          <div className="space-y-6">
            <div>
              <h3 className="text-2xl font-bold mb-2 bg-clip-text text-transparent bg-gradient-to-r from-purple-200 to-purple-400">
                About GIS
              </h3>
              <div className="h-1 w-20 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full mb-4"></div>
            </div>
            <p className="text-purple-100/80 leading-relaxed">
              GIS Unesa adalah event nasional yang menyelenggarakan kompetisi untuk untuk seluruh pelajar dan mahasiswa di Indonesia. Diselenggarakan oleh Himpunan Mahasiswa Prodi Pendidikan IPA Unesa, event ini bertujuan menjadi wadah kreativitas dan inovasi mahasiswa di berbagai bidang.
            </p>
          </div>

          {/* Competitions Column */}
          <div className="space-y-6">
            <div>
              <h3 className="text-2xl font-bold mb-2 bg-clip-text text-transparent bg-gradient-to-r from-purple-200 to-purple-400">
                GIS Competition
              </h3>
              <div className="h-1 w-20 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full mb-4"></div>
            </div>
            <ul className="space-y-4">
              {[
                { name: "Science Writing Competition", icon: "📄", url: "/competition/kti", desc: "Menulis karya ilmiah" },
                { name: "Science Competition", icon: "🏆", url: "/competition/cbt", desc: "Uji pengetahuan sains" },
                
              ].map((competition, index) => (
                <li key={index} className="group">
                  <Link
                    to={competition.url}
                    className="flex items-center transition-all duration-300"
                  >
                    <div className="w-12 h-12 bg-purple-800/50 rounded-lg flex items-center justify-center group-hover:bg-purple-700 group-hover:scale-110 transition-all duration-300 shadow-lg shadow-purple-900/20">
                      <span className="text-lg">{competition.icon}</span>
                    </div>
                    <div className="ml-3">
                      <span className="text-purple-100 group-hover:text-white block group-hover:translate-x-1 transition-all duration-300 font-medium">
                        {competition.name}
                      </span>
                      <span className="text-purple-300/60 text-xs">{competition.desc}</span>
                    </div>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Column */}
          <div className="space-y-6">
            <div>
              <h3 className="text-2xl font-bold mb-2 bg-clip-text text-transparent bg-gradient-to-r from-purple-200 to-purple-400">
                Contact
              </h3>
              <div className="h-1 w-20 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full mb-4"></div>
            </div>
            <ul className="space-y-4">
              
              <li>
                <a
                  href="mailto:gisunesa2025@unesa.ac.id"
                  className="flex items-center group transition-all duration-300"
                >
                  <div className="w-12 h-12 bg-purple-800/50 rounded-lg flex items-center justify-center group-hover:bg-purple-600 group-hover:scale-110 transition-all duration-300 shadow-lg shadow-purple-900/20">
                  <svg className="w-5 h-5 text-purple-300 group-hover:text-white transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                </div>
                  <div className="ml-3 group-hover:translate-x-1 transition-all duration-300">
                    <span className="text-purple-100 group-hover:text-white block">
                      Visit Us
                    </span>
                    <span className="text-purple-300/70 text-sm">Sekretariat Ormawa<br/>Himpunan Mahasiswa<br/>Prodi Pendidikan IPA FMIPA Unesa</span>
                  </div>
                </a>
              </li>
              
            </ul>
          </div>

          {/* Get in Touch Column */}
          <div className="space-y-6">
            <div>
              <h3 className="text-2xl font-bold mb-2 bg-clip-text text-transparent bg-gradient-to-r from-purple-200 to-purple-400">
                Get in Touch
              </h3>
              <div className=" h-1 w-20 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full mb-4"></div>
            </div>
            <p className="text-purple-100/80 leading-relaxed">
              Tertarik untuk berpartisipasi atau menjadi sponsor? Hubungi kami untuk informasi lebih lanjut tentang GIS Unesa 2025.
            </p>
            <div className="space-y-4 pt-2">
              <Link to="wa.me/6283112080715" target="_blank" rel="noopener noreferrer">
                <button className="w-full relative overflow-hidden group bg-gradient-to-r from-purple-600 to-purple-800 text-white font-medium py-3 px-8 rounded-xl transition-all duration-300 hover:shadow-lg hover:shadow-purple-900/40">
                  <span className="relative z-10 flex items-center justify-center">
                    Get in Touch
                    <svg className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                    </svg>
                  </span>
                  <div className="absolute inset-0 bg-gradient-to-r from-purple-500 to-pink-500 translate-y-full group-hover:translate-y-0 transition-transform duration-300"></div>
                </button>
              </Link>
              
              
            </div>
          </div>
        </motion.div>

        {/* Divider with improved styling */}
        <motion.div 
          variants={itemAnimation}
          className="my-12 h-px bg-gradient-to-r from-transparent via-purple-500/40 to-transparent"
        ></motion.div>

        {/* Footer Bottom */}
        <motion.div variants={itemAnimation} className="text-sm flex md:flex-row items-center gap-80">
          {/* Copyright */}
          <div className="text-purple-200/70 text-sm">
            © 2025 GIS Unesa. All rights reserved.
          </div>

          {/* Social Media with improved hover effects */}
          <div className="flex gap-4 items-center">
            {[
              { name: "Instagram", icon: socialIcons.instagram, url: "https://instagram.com/gisunesa" },
              { name: "Instagram", icon: socialIcons.instagram, url: "https://instagram.com/hmpipaunesa" },
              { name: "Tiktok", icon: socialIcons.tiktok, url: "https://www.tiktok.com/@gisunesa" },
            ].map((social, index) => (
              <a
                key={index}
                href={social.url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-purple-300 hover:text-white transform hover:scale-110 hover:drop-shadow-[0_0_8px_rgba(168,85,247,0.5)] transition-all duration-300"
                aria-label={`Visit our ${social.name}`}
              >
                {social.icon}
              </a>
            ))}
          </div>

          
        </motion.div>
      </motion.div>
      
      {/* Wave decorative element at bottom */}
      <div className="relative w-full overflow-hidden h-8">
        <div className="absolute bottom-0 left-0 right-h-16 bg-[#0c0011] rounded-t-full blur-sm"></div>
      </div>
    </footer>
  );
};

export default Footer;