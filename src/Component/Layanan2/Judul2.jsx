import React from 'react';
import foto4 from '../../assets/gimage.jpeg'; // Ganti dengan path gambar yang sesuai

const DeskripsiLomba = () => {
    return (
        <div className="w-full bg-[#18334F] py-16">
            <div className="max-w-screen-xl mx-auto px-2 lg:px-20"> {/* Kurangi padding di sini */}
                <div className="grid grid-cols-1 lg:grid-cols-2 items-center gap-2">

                  {/* Gambar di sebelah kanan */}
                  <div className="mt-14 w-full flex flex-col items-center lg:items-start lg:justify-start ml-16"> {/* Tambahkan margin kiri negatif */}
                      <img
                          src={foto4}
                          alt="Grafistix Hero"
                          className="w-80 h-auto rounded-lg shadow-xl transition-transform duration-300 hover:scale-105 hover:rotate-3"
                      />
                      <p className="text-white text-lg font-semibold mt-5 bg-[#512DA8] px-4 py-2 rounded-lg shadow-md">Rp.100.000/team</p>
                  </div>

                    {/* Teks di sebelah kiri */}
                    <div className="w-full lg:pr-6 lg-ml-8"> {/* Kurangi padding kanan dan tambahkan margin kiri lebih besar */}
                        <h1 className="font-bold text-4xl lg:text-5xl leading-tight mb-6 text-white">
                            Olimpiade CBT
                        </h1>
                        <p className="text-lg lg:text-xl mb-6 text-justify text-white">
                            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam
                            eget felis eget nunc lacinia lacinia. Nullam nec nunc nec
                            nunc eget felis eget nunc lacinia lacinia. Nullam nec nunc nec.
                        </p>
                        <div className="flex flex-row gap-6">
                            <button className="bg-purple-700 text-white px-6 py-3 rounded-lg font-semibold hover:scale-105 hover:bg-[#512DA8] transition">
                                Daftar
                            </button>
                            <button className="bg-[#4FA3D1] text-white px-6 py-3 rounded-lg font-semibold hover:scale-105 hover:bg-[#3A8BB5] transition">
                                Login
                            </button>
                        </div>
                    </div>  
                    
                </div>
            </div>
        </div>
    );
};

export default DeskripsiLomba;