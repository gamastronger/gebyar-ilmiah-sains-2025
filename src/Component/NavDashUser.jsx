import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';


function NavDashUser() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();
   const navigate = useNavigate();
  const submitlogout = () => {
    if (window.confirm("Apakah Anda yakin untuk keluar sebagai admin?")) {
      localStorage.removeItem("token");
      localStorage.removeItem("role");
      localStorage.removeItem("status");
      navigate("/auth/masuk");
    }
  }

  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
      if (window.innerWidth >= 768) {
        setIsMenuOpen(false);
      }
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  const isActive = (path) => location.pathname === path;

  const navLinks = [
    { to: "/dashboard/user", label: "Home" },
    { to: "/dashboard/user/invoice", label: "Invoice" },
    { to: "/dashboard/user/jurnal", label: "Upload Jurnal" },
    { to: "/dashboard/user/cbt", label: "CBT" },
    { to: "/dashboard/user/bantuan", label: "Bantuan" },
  ];

  return (
    <nav 
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled ? 'bg-white/60 backdrop-blur-md border-b border-purple-100/30' : 'bg-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center py-3 md:py-4">
          {/* Logo */}
          <div className="flex items-center">
            <Link to="/" className="font-bold text-lg sm:text-xl text-slate-800 flex items-center">
              <div className="relative overflow-hidden rounded-lg">
                <motion.img 
                  src="/img/logomascot.png" 
                  alt="Logo GIS" 
                  className="w-12 h-12 sm:w-14 sm:h-14 object-contain"
                  whileHover={{ scale: 1.05 }}
                />
              </div>
              <div className="ml-2.5">
                <span className="text-[#cbcbcb] font-bold hidden xs:block text-base sm:text-lg">
                  Gebyar Ilmiah Sains
                </span>
                <span className="text-[#cbcbcb] font-bold xs:hidden">
                  GIS
                </span>
              </div>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-2 lg:space-x-6">
            {navLinks.map((link) => (
              <Link
                key={link.to}
                to={link.to}
                className={`relative px-3 py-2 transition-all duration-200 text-sm lg:text-base font-medium
                  ${isActive(link.to) 
                    ? 'text-[#cbcbcb]' 
                    : 'text-[#cbcbcb] hover:text-[#df9fff]'
                  }`}
              >
                {link.label}
                {isActive(link.to) && (
                  <motion.div 
                    layoutId="navbar-indicator"
                    className="absolute bottom-0 left-0 right-0 h-0.5 bg-purple-600"
                    initial={false}
                  />
                )}
              </Link>
            ))}
            <Link 
              to="/" 
              className="ml-2 bg-purple-700 text-white px-4 py-2 rounded-md hover:bg-purple-800 transition-all duration-200 text-sm lg:text-base"
            >
              Logout
            </Link>
          </div>

          {/* Mobile Menu Button */}
            <div className="md:hidden flex items-center">
            <button
                className="relative w-10 h-10 flex items-center justify-center bg-purple-600 rounded-md focus:outline-none"
                onClick={toggleMenu}
                aria-label="Toggle menu"
                aria-expanded={isMenuOpen}
            >
                {/* Garis 1 */}
                <motion.div
                className="absolute w-6 h-0.5 bg-white rounded-full"
                initial={false}
                animate={isMenuOpen ? { rotate: 45, y: 0 } : { rotate: 0, y: -8 }}
                transition={{ duration: 0.3 }}
                />
                {/* Garis 2 */}
                <motion.div
                className="absolute w-6 h-0.5 bg-white rounded-full"
                initial={false}
                animate={isMenuOpen ? { opacity: 0 } : { opacity: 1, y: 0 }}
                transition={{ duration: 0.2 }}
                />
                {/* Garis 3 */}
                <motion.div
                className="absolute w-6 h-0.5 bg-white rounded-full"
                initial={false}
                animate={isMenuOpen ? { rotate: -45, y: 0 } : { rotate: 0, y: 8 }}
                transition={{ duration: 0.3 }}
                />
            </button>
            </div>
        </div>
      </div>

      {/* Mobile Menu Items */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div 
            className="md:hidden bg-white/80 backdrop-blur-sm overflow-hidden border-t border-purple-100/30"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.2, ease: "easeInOut" }}
          >
            <div className="flex flex-col py-2 px-4 space-y-1">
              {navLinks.map((link) => (
                <Link
                  key={link.to}
                  to={link.to}
                  className={`py-3 px-3 ${
                    isActive(link.to)
                      ? 'text-purple-700 font-semibold'
                      : 'text-gray-700 hover:text-purple-600'
                  }`}
                  onClick={() => setIsMenuOpen(false)}
                >
                  {link.label}
                  {isActive(link.to) && (
                    <motion.div 
                      layoutId="mobile-navbar-indicator"
                      className="mt-1 h-0.5 bg-purple-600 w-12"
                    />
                  )}
                </Link>
              ))}
              <div className="pt-2 pb-1">
                <Link 
                  to="/" 
                  className="block text-center bg-purple-700 text-white px-4 py-2 rounded-md hover:bg-purple-800 transition-all duration-200"
                  onClick={submitlogout}
                >
                  Logout
                </Link>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}

function DashboardUserLayout({ children }) {
  return (
    <>
      <NavDashUser />
      <div>{children}</div>
    </>
  );
}

export default DashboardUserLayout;
