import foto1 from "../../assets/gimage.jpeg";
import foto2 from "../../assets/gimage.jpeg";
import foto3 from "../../assets/gimage.jpeg";

const DeskripsiLomba = () => {
  return (
    <div className="w-full bg-[#210034] py-16">
      <div className="max-w-screen-xl mx-auto px-4 text-center">
        {/* Judul */}
        <h1 className="mt-5 text-white text-4xl font-bold mb-10">Twibbon KTI</h1>

        {/* Gambar-gambar */}
        <div className="flex flex-col items-center gap-6 md:flex-row md:justify-center md:gap-10 mb-8">
          {[foto1, foto2, foto3].map((foto, index) => (
            <img
              key={index}
              src={foto}
              alt={`Twibbon ${index + 1}`}
              className="w-60 h-60 object-cover rounded-2xl shadow-lg hover:scale-105 transition"
            />
          ))}
        </div>

        {/* Tombol Download */}
        <button className="bg-purple-700 hover:bg-purple-600 text-white px-6 py-3 rounded-lg font-semibold transition">
          Download Twibbon
        </button>

        {/* Judul */}
        <h1 className="mt-10 text-white text-4xl font-bold mb-10">Twibbon CBT</h1>

        {/* Gambar-gambar */}
        <div className="flex flex-col items-center gap-6 md:flex-row md:justify-center md:gap-10 mb-8">
          {[foto1, foto2, foto3].map((foto, index) => (
            <img
              key={index}
              src={foto}
              alt={`Twibbon ${index + 1}`}
              className="w-60 h-60 object-cover rounded-2xl shadow-lg hover:scale-105 transition"
            />
          ))}
        </div>

        {/* Tombol Download */}
        <button className="bg-purple-700 hover:bg-purple-600 text-white px-6 py-3 rounded-lg font-semibold transition">
          Download Twibbon
        </button>
      </div>
    </div>
  );
};

export default DeskripsiLomba;
