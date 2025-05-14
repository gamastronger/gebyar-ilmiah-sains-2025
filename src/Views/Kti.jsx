import Navbar from "../Component/Navbar";
import Footer from "../Component/Footer";
import Judul from "../Component/Kti/Judul";
import ScrollToTop from "@/ScrollToTop";

function Beranda() {
  return (
    <div className="min-h-screen">
      <div className="bg-[#0F172A] text-slate-200">
        <ScrollToTop />
        <Navbar />
        <Judul />
        <Footer />
      </div>
    </div>
  );
};
export default Beranda;
