import ScrollToTop from "@/ScrollToTop";
import logo from "../assets/logomascot.png";
import { useState, useEffect } from "react";
import { useNavigate, useLocation, Link } from "react-router-dom";

const Navbar = () => {
  const [sidebarVisible, setSidebarVisible] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [user, setUser] = useState(null); // You'll need to manage this with your auth system
  const navigate = useNavigate();
  const location = useLocation();

  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleSidebar = () => {
    setSidebarVisible(!sidebarVisible);
    if (!sidebarVisible) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
  };

  const handleScrollToContact = () => {
    if (location.pathname === "/") {
      const element = document.getElementById("contact-person");
      if (element) {
        element.scrollIntoView({ behavior: "smooth" });
      }
    } else {
      navigate("/kontak");
    }
  };

  return (
    <div>
      {/* Navbar */}
      <nav 
        className={`fixed top-0 left-0 w-full py-3 px-6 md:px-8 flex items-center justify-between text-white z-50 transition-all duration-300 ${
          scrolled 
            ? "bg-[#A78BFA]/20 backdrop-blur-md" // Changed to purple transparent when scrolled
            : "bg-transparent backdrop-blur-md" // Transparent at initial position
        }`}
      >
        {/* Logo Section */}
        <div className="flex items-center">
          <div className="mt-1 w-15 h-10 flex items-center justify-center">
            <img className="w-15 h-20 drop-shadow-md" src={logo} alt="Logo" />
          </div>
          <span className="ml-3 text-xl font-bold font-[Poppins] tracking-wide text-white drop-shadow-sm">
            GIS
            <span className="text-[#A78BFA] ml-1">2025</span>
          </span>
        </div>

        {/* Desktop Links with Auth Buttons */}
        <div className="hidden md:flex items-center gap-8 text-sm font-medium">
          <a href="/" className="hover:text-[#A78BFA] transition duration-300 relative group">
            Beranda
            <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-[#A78BFA] transition-all duration-300 group-hover:w-full"></span>
          </a>
          <a href="/swc" className="hover:text-[#A78BFA] transition duration-300 relative group">
            Tentang SWC
            <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-[#A78BFA] transition-all duration-300 group-hover:w-full"></span>
          </a>
          <a href="/sc" className="hover:text-[#A78BFA] transition duration-300 relative group">
            Tentang SC
            <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-[#A78BFA] transition-all duration-300 group-hover:w-full"></span>
          </a>
          <a href="/kontak" className="hover:text-[#A78BFA] transition duration-300 relative group">
            Kontak
            <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-[#A78BFA] transition-all duration-300 group-hover:w-full"></span>
          </a>
          <a 
            href="/twibbon" 
            className="hover:text-[#A78BFA] transition duration-300 relative group"
          >
            Twibbon
            <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-[#A78BFA] transition-all duration-300 group-hover:w-full"></span>
          </a>

          {/* Add Auth Buttons/User Display */}
          <div className="flex items-center gap-4 ml-4 border-l border-white/20 pl-4">
            {user ? (
              <div className="flex items-center gap-3">
                <span className="text-white hover:text-[#A78BFA] transition duration-300">
                  {user.nama}
                </span>
                <button
                  onClick={() => {
                    setUser(null);
                    // Add your logout logic here
                  }}
                  className="px-4 py-2 bg-red-500/20 hover:bg-red-500/30 rounded-lg transition duration-300 text-white"
                >
                  Keluar
                </button>
              </div>
            ) : (
              <>
                <Link
                  to="/auth/masuk"
                  className="px-4 py-2 hover:bg-white/10 rounded-lg transition duration-300"
                >
                  Masuk
                </Link>
                <Link
                  to="/auth/daftar"
                  className="px-4 py-2 bg-[#A78BFA] hover:bg-[#9061F9] rounded-lg transition duration-300"
                >
                  Daftar
                </Link>
              </>
            )}
          </div>
        </div>

        {/* Hamburger Icon for Mobile */}
        <button 
          className="block md:hidden bg-[#A78BFA]/20 p-2 rounded-lg hover:bg-[#A78BFA]/30 transition duration-300" 
          onClick={handleSidebar}
          aria-label="Menu"
        >
          <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16m-7 6h7"></path>
          </svg>
        </button>
      </nav>

      {/* Mobile Sidebar Overlay */}
      {sidebarVisible && (
        <div 
          className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50"
          onClick={handleSidebar}
        >
          {/* Sidebar Content */}
          <div 
            className="absolute top-0 right-0 w-72 h-full bg-gradient-to-b from-[#A78BFA]/30 to-[#0f172a] shadow-2xl p-6 transform transition-transform duration-300 ease-out"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header with Logo and Close Button */}
            <div className="flex items-center justify-between mb-8">
              <div className="flex items-center">
                <img className="w-8 h-8 drop-shadow-md" src={logo} alt="Logo" />
                <span className="ml-2 text-lg font-bold text-white">
                  GIS<span className="text-[#A78BFA]">Unesa</span>
                </span>
              </div>
              
              <button 
                className="p-2 rounded-full bg-[#A78BFA]/10 hover:bg-[#A78BFA]/20 transition duration-300" 
                onClick={handleSidebar}
                aria-label="Close menu"
              >
                <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
                </svg>
              </button>
            </div>

            {/* Navigation Links */}
            <div className="space-y-6">
              <a 
                href="/" 
                onClick={handleSidebar} 
                className="flex items-center space-x-3 text-white hover:text-[#A78BFA] transition duration-300 py-2 px-4 rounded-lg hover:bg-white/5"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                </svg>
                <span>Home</span>
              </a>
              
              <a 
                href="/swc" 
                onClick={handleSidebar} 
                className="flex items-center space-x-3 text-white hover:text-[#A78BFA] transition duration-300 py-2 px-4 rounded-lg hover:bg-white/5"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z" />
                </svg>
                <span>Tentang SWC</span>
              </a>
              
              <a 
                href="/sc" 
                onClick={handleSidebar} 
                className="flex items-center space-x-3 text-white hover:text-[#A78BFA] transition duration-300 py-2 px-4 rounded-lg hover:bg-white/5"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
                <span>Tentang SC</span>
              </a>
              
              <a 
                href="/kontak"
                onClick={handleSidebar} 
                className="flex items-center space-x-3 text-white hover:text-[#A78BFA] transition duration-300 py-2 px-4 rounded-lg hover:bg-white/5 cursor-pointer"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
                <span>Contact</span>
              </a>
              
              <a 
                href="/twibbon" 
                onClick={handleSidebar} 
                className="flex items-center space-x-3 text-white hover:text-[#A78BFA] transition duration-300 py-2 px-4 rounded-lg hover:bg-white/5"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
                <span>Twibbon</span>
              </a>
            </div>

            {/* Add Auth Buttons/User Display to Mobile Menu */}
            <div className="mt-6 pt-6 border-t border-white/10">
              {user ? (
                <div className="space-y-3">
                  <div className="text-white text-sm">
                    Signed in as <span className="font-medium">{user.nama}</span>
                  </div>
                  <button
                    onClick={() => {
                      setUser(null);
                      handleSidebar();
                      // Add your logout logic here
                    }}
                    className="w-full px-4 py-2 bg-red-500/20 hover:bg-red-500/30 rounded-lg transition duration-300 text-white text-sm"
                  >
                    Keluar
                  </button>
                </div>
              ) : (
                <div className="flex flex-col gap-3">
                  <Link
                    to="/auth/masuk"
                    onClick={handleSidebar}
                    className="w-full px-4 py-2 bg-white/5 hover:bg-white/10 rounded-lg transition duration-300 text-white text-center text-sm"
                  >
                    Masuk
                  </Link>
                  <Link
                    to="/auth/daftar"
                    onClick={handleSidebar}
                    className="w-full px-4 py-2 bg-[#A78BFA] hover:bg-[#9061F9] rounded-lg transition duration-300 text-white text-center text-sm"
                  >
                    Daftar
                  </Link>
                </div>
              )}
            </div>
            
            {/* Footer */}
            <div className="absolute bottom-8 left-0 right-0 px-6">
              <div className="border-t border-white/10 pt-4 text-xs text-white/50 text-center">
                © 2025 GIS Unesa. All rights reserved.
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Navbar;
