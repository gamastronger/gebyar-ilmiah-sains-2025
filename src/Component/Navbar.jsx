import logo from "../assets/unesaputih.png";
import { useState } from "react";
import { Link } from "react-scroll";

const Navbar = () => {
  const [sidebarVisible, setSidebarVisible] = useState(false);

  const handleSidebar = () => {
    setSidebarVisible(!sidebarVisible);
  };

  return (
    <div>
      {/* Navbar */}
      <nav className="fixed top-0 left-0 w-full py-2 px-8 flex items-center justify-between text-white shadow-md bg-transparent backdrop-blur-md z-50">
        {/* Logo Section */}
        <div className="flex items-center">
          <img className="w-[40px]" src={logo} alt="Logo" />
          <span className="ml-3 text-2l font-semibold font-[Poppins]">GIS</span>
        </div>

        {/* Desktop Links */}
        <div className="hidden md:flex items-center gap-8 text-sm font-medium font-[Arial Sans]">
          <a href="/" className="hover:text-[#4FA3D1] transition duration-300">Home</a>
          <a href="layanan" className="hover:text-[#4FA3D1] transition duration-300">Tentang KTI</a>
          <a href="layanan2" className="hover:text-[#4FA3D1] transition duration-300">Tentang CBT</a>
          <Link
            to="contact-person" // ID yang ditargetkan
            smooth={true} // Animasi scroll halus
            duration={800} // Durasi scroll dalam milidetik
            className="hover:text-[#4FA3D1] transition duration-300 cursor-pointer"
          >
            Contact
          </Link>
          <a href="twibbon" className="hover:text-[#4FA3D1] transition duration-300">Twibbon</a>
          <a href="#" className="hover:text-[#4FA3D1] transition duration-300">Buku Panduan</a>
        </div>

        {/* Hamburger Icon for Mobile */}
        <button className="block md:hidden" onClick={handleSidebar}>
          <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16m-7 6h7"></path>
          </svg>
        </button>
      </nav>

      {/* Sidebar for Mobile */}
      {sidebarVisible && (
        <aside className="fixed inset-0 bg-black bg-opacity-50 z-50 transition-opacity duration-300 ease-in-out" onClick={handleSidebar}>
          <div className="absolute top-0 right-0 w-72 h-full bg-[#1E293B] bg-opacity-90 shadow-lg p-6 rounded-l-2xl backdrop-blur-lg transition-transform duration-300 ease-in-out">
            {/* Close Button */}
            <button className="flex justify-end mb-4" onClick={handleSidebar}>
              <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
              </svg>
            </button>

            {/* Mobile Links */}
            <ul className="flex flex-col text-white gap-6 font-[Poppins] text-lg">
              <li><a href="/" onClick={handleSidebar} className="hover:text-[#4FA3D1] transition duration-300">Beranda</a></li>
              <li><a href="/klien" onClick={handleSidebar} className="hover:text-[#4FA3D1] transition duration-300">Klien</a></li>
              <li><a href="/layanan" onClick={handleSidebar} className="hover:text-[#4FA3D1] transition duration-300">Layanan</a></li>
              <li><a href="/pemesanan" onClick={handleSidebar} className="hover:text-[#4FA3D1] transition duration-300">Pemesanan</a></li>
            </ul>
          </div>
        </aside>
      )}
    </div>
  );
};

export default Navbar;
