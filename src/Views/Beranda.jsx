import Welcome from "../Component/Beranda/Welcome";
import Navbar from "../Component/Navbar";
import Deskripsi from "../Component/Beranda/Deskripsi";
import Footer from "../Component/Footer";

function Beranda() {
  return (
    <div className="bg-[#0F172A] min-h-screen w-full">
      <div className="text-slate-200 flex flex-col min-h-screen w-full">
        <Navbar />
        <main className="flex-1 flex flex-col w-full">
          <Welcome />
          <Deskripsi />
        </main>
        <Footer />
      </div>
    </div>
  );
}

export default Beranda;