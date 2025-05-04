import { Link } from "react-router-dom";
import { motion } from "framer-motion";

const Footer = () => {
  // Using SVG icons instead of image imports for better quality and consistency
  const socialIcons = {
    facebook: (
      <svg className="w-6 h-6 fill-current" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
        <path d="M22.675 0H1.325C.593 0 0 .593 0 1.325v21.351C0 23.407.593 24 1.325 24H12.82v-9.294H9.692v-3.622h3.128V8.413c0-3.1 1.893-4.788 4.659-4.788 1.325 0 2.463.099 2.795.143v3.24l-1.918.001c-1.504 0-1.795.715-1.795 1.763v2.313h3.587l-.467 3.622h-3.12V24h6.116c.73 0 1.323-.593 1.323-1.325V1.325C24 .593 23.407 0 22.675 0z" />
      </svg>
    ),
    instagram: (
      <svg className="w-6 h-6 fill-current" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
        <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" />
      </svg>
    ),
    linkedin: (
      <svg className="w-6 h-6 fill-current" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
        <path d="M19.7 3H4.3A1.3 1.3 0 003 4.3v15.4A1.3 1.3 0 004.3 21h15.4a1.3 1.3 0 001.3-1.3V4.3A1.3 1.3 0 0019.7 3zM8.339 18.338H5.667v-8.59h2.672v8.59zM7.004 8.574a1.548 1.548 0 11-.002-3.096 1.548 1.548 0 01.002 3.096zm11.335 9.764H15.67v-4.177c0-.996-.017-2.278-1.387-2.278-1.389 0-1.601 1.086-1.601 2.206v4.249h-2.667v-8.59h2.559v1.174h.037c.356-.675 1.227-1.387 2.526-1.387 2.703 0 3.203 1.779 3.203 4.092v4.711z" />
      </svg>
    ),
    twitter: (
      <svg className="w-6 h-6 fill-current" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
        <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z" />
      </svg>
    ),
    youtube: (
      <svg className="w-6 h-6 fill-current" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
        <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
      </svg>
    )
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

      {/* Newsletter subscription section - New addition
      <div className="relative z-10 bg-gradient-to-r from-purple-900/40 via-purple-800/40 to-purple-900/40 backdrop-blur-lg">
        <div className="max-w-screen-xl mx-auto py-10 px-6 lg:px-8">
          <motion.div 
            className="flex flex-col md:flex-row items-center justify-between gap-6"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <div className="md:w-1/2">
              <h3 className="text-2xl font-bold text-white mb-2">
                Stay Updated About <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-300 to-pink-300">GIS Unesa 2025</span>
              </h3>
              <p className="text-purple-200/80">
                Subscribe to our newsletter for event updates, competition deadlines, and exclusive insights.
              </p>
            </div>
            <div className="w-full md:w-1/2 max-w-md">
              <form className="flex flex-col sm:flex-row gap-3">
                <input 
                  type="email" 
                  placeholder="Enter your email address" 
                  className="flex-grow px-4 py-3 rounded-lg bg-purple-900/30 border border-purple-700/50 focus:outline-none focus:ring-2 focus:ring-purple-400 text-white placeholder-purple-300/60"
                  required
                />
                <button 
                  type="submit" 
                  className="px-6 py-3 bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 rounded-lg font-medium text-white shadow-lg shadow-purple-900/30 transition-all duration-300 hover:shadow-xl hover:shadow-purple-900/40"
                >
                  Subscribe
                </button>
              </form>
            </div>
          </motion.div>
        </div>
      </div> */}

      <motion.div 
        className="max-w-screen-xl mx-auto py-16 px-6 lg:px-8 relative z-10"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={containerAnimation}
      >
        {/* Logo section - new addition */}
        {/* <motion.div 
          variants={itemAnimation}
          className="flex justify-center mb-12"
        >
          <div className="text-center">
            <h2 className="text-3xl md:text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-300 to-pink-300 mb-3">
              GIS UNESA 2025
            </h2>
            <p className="text-purple-200/70 max-w-lg mx-auto">
              Gebyar Ilmiah Science - National Science Competition
            </p>
          </div>
        </motion.div> */}

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
              GIS Unesa adalah event nasional yang menyelenggarakan kompetisi untuk mahasiswa seluruh Indonesia. Diselenggarakan oleh Universitas Negeri Surabaya, event ini bertujuan menjadi wadah kreativitas dan inovasi mahasiswa di berbagai bidang.
            </p>
            <a 
              href="/about" 
              className="inline-flex items-center text-purple-300 hover:text-white transition-colors group"
            >
              Learn more about us
              <svg className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </a>
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
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                  </div>
                  <div className="ml-3 group-hover:translate-x-1 transition-all duration-300">
                    <span className="text-purple-100 group-hover:text-white block">
                      Email Us
                    </span>
                    <span className="text-purple-300/70 text-sm">gisunesa2025@unesa.ac.id</span>
                  </div>
                </a>
              </li>
              <li>
                <a
                  href="tel:+6281234567890"
                  className="flex items-center group transition-all duration-300"
                >
                  <div className="w-12 h-12 bg-purple-800/50 rounded-lg flex items-center justify-center group-hover:bg-purple-600 group-hover:scale-110 transition-all duration-300 shadow-lg shadow-purple-900/20">
                    <svg className="w-5 h-5 text-purple-300 group-hover:text-white transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                    </svg>
                  </div>
                  <div className="ml-3 group-hover:translate-x-1 transition-all duration-300">
                    <span className="text-purple-100 group-hover:text-white block">
                      Call Us
                    </span>
                    <span className="text-purple-300/70 text-sm">+62 812 3456 7890</span>
                  </div>
                </a>
              </li>
              <li className="flex items-center group">
                <div className="w-12 h-12 bg-purple-800/50 rounded-lg flex items-center justify-center group-hover:bg-purple-600 group-hover:scale-110 transition-all duration-300 shadow-lg shadow-purple-900/20">
                  <svg className="w-5 h-5 text-purple-300 group-hover:text-white transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                </div>
                <div className="ml-3">
                  <span className="text-purple-100 block">
                    Visit Us
                  </span>
                  <span className="text-purple-300/70 text-sm">
                    Sekretariat Ormawa Himpunan Mahasiswa<br />Prodi Pendidikan IPA FMIPA Unesa
                  </span>
                </div>
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
              <Link to="/contact">
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
              
              <Link to="/register">
                <button className="mt-2 w-full relative overflow-hidden group bg-transparent border border-purple-500 text-purple-200 font-medium py-3 px-8 rounded-xl transition-all duration-300 hover:shadow-lg hover:shadow-purple-900/20">
                  <span className="relative z-10 flex items-center justify-center">
                    Register Now
                    <svg className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                    </svg>
                  </span>
                  <div className="absolute inset-0 bg-purple-700/30 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
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
        <motion.div variants={itemAnimation} className="flex flex-col md:flex-row items-center justify-between gap-6">
          {/* Copyright */}
          <div className="text-purple-200/70 text-sm">
            © 2025 GIS Unesa. All rights reserved.
          </div>

          {/* Social Media with improved hover effects */}
          <div className="flex gap-4 items-center">
            {[
              { name: "Facebook", icon: socialIcons.facebook, url: "https://facebook.com/gisunesa" },
              { name: "Instagram", icon: socialIcons.instagram, url: "https://instagram.com/gisunesa" },
              { name: "Twitter", icon: socialIcons.twitter, url: "https://twitter.com/gisunesa" },
              { name: "LinkedIn", icon: socialIcons.linkedin, url: "https://linkedin.com/company/gisunesa" },
              { name: "YouTube", icon: socialIcons.youtube, url: "https://youtube.com/channel/gisunesa" },
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

          {/* Quick Links with improved styling */}
          <div className="flex gap-5 text-purple-200/70 text-sm">
            <Link to="/privacy" className="hover:text-white transition-colors hover:underline">Privacy Policy</Link>
            <Link to="/terms" className="hover:text-white transition-colors hover:underline">Terms of Service</Link>
            <Link to="/faq" className="hover:text-white transition-colors hover:underline">FAQ</Link>
          </div>
        </motion.div>
      </motion.div>
      
      {/* Wave decorative element at bottom */}
      <div className="relative w-full overflow-hidden h-8">
        <div className="absolute bottom-0 left-0 right-0 h-16 bg-[#0c0011] rounded-t-full blur-sm"></div>
      </div>
    </footer>
  );
};

export default Footer;