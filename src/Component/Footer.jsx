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
    <footer className="relative bg-gradient-to-b from-[#290040] to-[#1a0028] text-white overflow-hidden">
      {/* Decorative elements */}
      <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-purple-800/0 via-purple-500 to-purple-800/0"></div>
      <div className="absolute top-0 inset-0">
        <div className="absolute top-10 left-10 w-64 h-64 rounded-full bg-purple-600/5 blur-3xl"></div>
        <div className="absolute bottom-10 right-10 w-80 h-80 rounded-full bg-purple-800/10 blur-3xl"></div>
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
              <div className="h-1 w-12 bg-purple-600 rounded-full mb-4"></div>
            </div>
            <p className="text-purple-100/90 leading-relaxed">
              GIS Unesa adalah event nasional yang menyelenggarakan kompetisi untuk mahasiswa seluruh Indonesia. Diselenggarakan oleh Universitas Negeri Surabaya, event ini bertujuan menjadi wadah kreativitas dan inovasi mahasiswa di berbagai bidang.
            </p>
          </div>

          {/* Competitions Column */}
          <div className="space-y-6">
            <div>
              <h3 className="text-2xl font-bold mb-2 bg-clip-text text-transparent bg-gradient-to-r from-purple-200 to-purple-400">
                GIS Competition
              </h3>
              <div className="h-1 w-12 bg-purple-600 rounded-full mb-4"></div>
            </div>
            <ul className="space-y-4">
              {[
                { name: "Karya Tulis Ilmiah", icon: "📄", url: "/competition/kti" },
                { name: "Olimpiade CBT", icon: "🏆", url: "/competition/cbt" },
              ].map((competition, index) => (
                <li key={index}>
                  <Link
                    to={competition.url}
                    className="flex items-center group transition-all duration-300"
                  >
                    <div className="w-10 h-10 bg-purple-800/50 rounded-lg flex items-center justify-center group-hover:bg-purple-700 transition-colors">
                      <span className="text-lg">{competition.icon}</span>
                    </div>
                    <span className="ml-3 text-purple-100 group-hover:text-white group-hover:translate-x-1 transition-all duration-300">
                      {competition.name}
                    </span>
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
              <div className="h-1 w-12 bg-purple-600 rounded-full mb-4"></div>
            </div>
            <ul className="space-y-4">
              <li>
                <a
                  href="mailto:gisunesa2025@unesa.ac.id"
                  className="flex items-center group transition-all duration-300"
                >
                  <div className="w-10 h-10 bg-purple-800/50 rounded-lg flex items-center justify-center group-hover:bg-purple-700 transition-colors">
                    <svg className="w-5 h-5 text-purple-300 group-hover:text-white transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                  </div>
                  <span className="ml-3 text-purple-100 group-hover:text-white group-hover:translate-x-1 transition-all duration-300">
                    gisunesa2025@unesa.ac.id
                  </span>
                </a>
              </li>
              <li>
                <a
                  href="tel:+6281234567890"
                  className="flex items-center group transition-all duration-300"
                >
                  <div className="w-10 h-10 bg-purple-800/50 rounded-lg flex items-center justify-center group-hover:bg-purple-700 transition-colors">
                    <svg className="w-5 h-5 text-purple-300 group-hover:text-white transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                    </svg>
                  </div>
                  <span className="ml-3 text-purple-100 group-hover:text-white group-hover:translate-x-1 transition-all duration-300">
                    +62 812 3456 7890
                  </span>
                </a>
              </li>
              <li className="flex items-center group">
                <div className="w-10 h-10 bg-purple-800/50 rounded-lg flex items-center justify-center">
                  <svg className="w-5 h-5 text-purple-300" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                </div>
                <span className="ml-3 text-purple-100">
                  Gedung J2 Fakultas Teknik<br />Universitas Negeri Surabaya
                </span>
              </li>
            </ul>
          </div>

          {/* Get in Touch Column */}
          <div className="space-y-6">
            <div>
              <h3 className="text-2xl font-bold mb-2 bg-clip-text text-transparent bg-gradient-to-r from-purple-200 to-purple-400">
                Get in Touch
              </h3>
              <div className="h-1 w-12 bg-purple-600 rounded-full mb-4"></div>
            </div>
            <p className="text-purple-100/90 leading-relaxed">
              Tertarik untuk berpartisipasi atau menjadi sponsor? Hubungi kami untuk informasi lebih lanjut tentang GIS Unesa 2025.
            </p>
            <div className="pt-2">
              <Link to="/contact">
                <button className="relative overflow-hidden group bg-gradient-to-r from-purple-600 to-purple-800 text-white font-medium py-3 px-8 rounded-full transition-all duration-300 hover:shadow-lg hover:shadow-purple-900/40">
                  <span className="relative z-10 flex items-center">
                    Get in Touch
                    <svg className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                    </svg>
                  </span>
                  <div className="absolute inset-0 bg-gradient-to-r from-purple-500 to-purple-700 translate-y-full group-hover:translate-y-0 transition-transform duration-300"></div>
                </button>
              </Link>
            </div>
          </div>
        </motion.div>

        {/* Divider */}
        <motion.div 
          variants={itemAnimation}
          className="my-12 h-px bg-gradient-to-r from-transparent via-purple-500/30 to-transparent"
        ></motion.div>

        {/* Footer Bottom */}
        <motion.div variants={itemAnimation} className="flex flex-col md:flex-row items-center justify-between gap-6">
          {/* Copyright */}
          <div className="text-purple-200/70 text-sm">
            © 2025 GIS Unesa. All rights reserved.
          </div>

          {/* Social Media */}
          <div className="flex gap-6 items-center">
            {[
              { name: "Facebook", icon: socialIcons.facebook, url: "https://facebook.com/gisunesa" },
              { name: "Instagram", icon: socialIcons.instagram, url: "https://instagram.com/gisunesa" },
              { name: "LinkedIn", icon: socialIcons.linkedin, url: "https://linkedin.com/company/gisunesa" },
            ].map((social, index) => (
              <a
                key={index}
                href={social.url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-purple-300 hover:text-white transform hover:scale-110 transition-all duration-300"
                aria-label={`Visit our ${social.name}`}
              >
                {social.icon}
              </a>
            ))}
          </div>

          {/* Quick Links */}
          <div className="flex gap-5 text-purple-200/70 text-sm">
            <Link to="/privacy" className="hover:text-white transition-colors">Privacy Policy</Link>
            <Link to="/terms" className="hover:text-white transition-colors">Terms of Service</Link>
          </div>
        </motion.div>
      </motion.div>
    </footer>
  );
};

export default Footer;