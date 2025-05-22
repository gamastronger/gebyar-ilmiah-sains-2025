import React, { useEffect, useState } from "react";
import {
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  BarChart,
  Bar,
  ResponsiveContainer,
  AreaChart,
  Area,
} from "recharts";

export function Profil() {
  const [summary, setSummary] = useState({
    peserta: 0,
    karyaMasuk: 0,
    terverifikasi: 0,
    pendapatan: 0,
  });

  const [karyaData, setKaryaData] = useState([]);
  const [isLoaded, setIsLoaded] = useState(false);
  const [animatedValues, setAnimatedValues] = useState({
    peserta: 0,
    karyaMasuk: 0,
    terverifikasi: 0,
    pendapatan: 0,
  });

  // Data pendapatan per kategori dan gelombang
  const [pendapatanKategori, setPendapatanKategori] = useState([
    { kategori: "SMP", gelombang1: 1200000, gelombang2: 900000, total: 2100000 },
    { kategori: "SMA", gelombang1: 1800000, gelombang2: 1500000, total: 3300000 },
    { kategori: "Mahasiswa", gelombang1: 2000000, gelombang2: 1700000, total: 3700000 },
  ]);

  // Data untuk animasi counter
  useEffect(() => {
    // Mock data kompetisi
    const finalData = {
      peserta: 420,
      karyaMasuk: 385,
      terverifikasi: 310,
      pendapatan: 9100000, // total dari semua kategori dan gelombang
    };
    
    setSummary(finalData);

    // Animasi counter
    const duration = 2000; // 2 detik
    const steps = 50;
    const interval = duration / steps;
    
    let currentStep = 0;
    const timer = setInterval(() => {
      currentStep++;
      
      if (currentStep <= steps) {
        const progress = currentStep / steps;
        setAnimatedValues({
          peserta: Math.round(finalData.peserta * progress),
          karyaMasuk: Math.round(finalData.karyaMasuk * progress),
          terverifikasi: Math.round(finalData.terverifikasi * progress),
          pendapatan: Math.round(finalData.pendapatan * progress),
        });
      } else {
        clearInterval(timer);
      }
    }, interval);

    setKaryaData([
      { name: "Jan", karya: 30 },
      { name: "Feb", karya: 45 },
      { name: "Mar", karya: 65 },
      { name: "Apr", karya: 85 },
      { name: "Mei", karya: 160 },
    ]);

    // Delay rendering for animation
    setTimeout(() => {
      setIsLoaded(true);
    }, 300);

    return () => clearInterval(timer);
  }, []);

  // Custom Tooltip untuk grafik
  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-white p-3 shadow-lg rounded-md border border-purple-200">
          <p className="font-bold text-purple-800">{label}</p>
          <p className="text-purple-600">
            {payload[0].name}: {payload[0].value}
          </p>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="p-6 bg-gradient-to-br from-gray-50 to-gray-100 min-h-screen">
      <div className="max-w-7xl mx-auto">
        {/* Header dengan Animasi */}
        <div className="mb-8 opacity-0 animate-fade-in" style={{ animationDelay: "0.1s", animationFillMode: "forwards" }}>
          <h1 className="text-3xl font-bold text-purple-900">
            Dashboard Overview
          </h1>
          <p className="text-gray-600">
            Monitoring data kompetisi dan statistik peserta
          </p>
        </div>

        {/* Ringkasan Statistik dengan Animasi */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {[
            {
              title: "Total Peserta",
              value: animatedValues.peserta,
              color: "purple",
              icon: <i className="fas fa-users text-xl"></i>,
              delay: "0.2s"
            },
            {
              title: "Karya Masuk",
              value: animatedValues.karyaMasuk,
              color: "indigo",
              icon: <i className="fas fa-file-alt text-xl"></i>,
              delay: "0.3s"
            },
            {
              title: "Terverifikasi",
              value: animatedValues.terverifikasi,
              color: "green",
              icon: <i className="fas fa-check-circle text-xl"></i>,
              delay: "0.4s"
            },
            {
              title: "Total Pendapatan",
              value: `Rp${animatedValues.pendapatan.toLocaleString('id-ID')}`,
              color: "amber",
              icon: <i className="fas fa-coins text-xl"></i>,
              delay: "0.5s"
            }
          ].map((item, index) => (
            <div 
              key={index}
              className={`opacity-0 animate-slide-up`} 
              style={{ animationDelay: item.delay, animationFillMode: "forwards" }}
            >
              <div className={`bg-white shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 rounded-xl overflow-hidden border-l-4 border-${item.color}-500`}>
                <div className="p-5">
                  <div className="flex items-center justify-between mb-2">
                    <h3 className={`text-${item.color}-700 font-medium`}>
                      {item.title}
                    </h3>
                    <div className={`p-2 rounded-lg bg-${item.color}-100 text-${item.color}-600`}>
                      {item.icon}
                    </div>
                  </div>
                  <p className={`text-2xl font-bold text-${item.color}-900`}>
                    {item.value}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>

        

        {/* Progress Verifikasi
        <div className="opacity-0 animate-slide-up" style={{ animationDelay: "0.8s", animationFillMode: "forwards" }}>
          <div className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 mb-8">
            <div className="p-5">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg text-green-800 font-semibold">
                  Progress Verifikasi Karya
                </h3>
                <div className="text-green-500">
                  <i className="fas fa-tasks"></i>
                </div>
              </div>
              <div className="relative pt-1">
                <div className="overflow-hidden h-6 mb-1 text-xs flex rounded-xl bg-green-200">
                  <div
                    style={{ 
                      width: `${(animatedValues.terverifikasi / summary.karyaMasuk) * 100}%`,
                      transition: 'width 2s ease-in-out'
                    }}
                    className="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-gradient-to-r from-green-500 to-green-600 rounded-xl"
                  >
                    <span className="font-bold">
                      {((animatedValues.terverifikasi / summary.karyaMasuk) * 100).toFixed(1)}%
                    </span>
                  </div>
                </div>
                <div className="flex justify-between text-sm text-gray-600">
                  <p className="text-gray-600">
                    {animatedValues.terverifikasi} dari {summary.karyaMasuk} karya telah diverifikasi
                  </p>
                  <p className="text-green-600 font-medium">
                    Target: 100%
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div> */}

        {/* Tabel Pendapatan per Kategori dan Gelombang */}
        <div className="opacity-0 animate-slide-up" style={{ animationDelay: "0.7s", animationFillMode: "forwards" }}>
          <div className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 mb-8">
            <div className="p-5">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg text-amber-800 font-semibold">
                  Pendapatan per Kategori & Gelombang
                </h3>
                <div className="text-amber-500">
                  <i className="fas fa-money-bill-wave"></i>
                </div>
              </div>
              <div className="overflow-x-auto rounded-lg">
                <table className="w-full text-left table-auto">
                  <thead>
                    <tr className="bg-amber-50">
                      <th className="px-4 py-3 font-medium text-amber-900 border-b">Kategori</th>
                      <th className="px-4 py-3 font-medium text-amber-900 border-b">Gelombang 1</th>
                      <th className="px-4 py-3 font-medium text-amber-900 border-b">Gelombang 2</th>
                      <th className="px-4 py-3 font-medium text-amber-900 border-b">Total</th>
                    </tr>
                  </thead>
                  <tbody>
                    {pendapatanKategori.map((row, idx) => (
                      <tr key={idx} className="border-b hover:bg-amber-50 transition-colors duration-200">
                        <td className="px-4 py-3 font-medium text-amber-900">{row.kategori}</td>
                        <td className="px-4 py-3 text-amber-800">Rp{row.gelombang1.toLocaleString('id-ID')}</td>
                        <td className="px-4 py-3 text-amber-800">Rp{row.gelombang2.toLocaleString('id-ID')}</td>
                        <td className="px-4 py-3 font-bold text-amber-900">Rp{row.total.toLocaleString('id-ID')}</td>
                      </tr>
                    ))}
                    <tr className="bg-amber-50">
                      <td className="px-4 py-3 font-medium text-amber-900">Total Keseluruhan</td>
                      <td className="px-4 py-3 font-medium text-amber-900">Rp{pendapatanKategori.reduce((sum, item) => sum + item.gelombang1, 0).toLocaleString('id-ID')}</td>
                      <td className="px-4 py-3 font-medium text-amber-900">Rp{pendapatanKategori.reduce((sum, item) => sum + item.gelombang2, 0).toLocaleString('id-ID')}</td>
                      <td className="px-4 py-3 font-bold text-amber-900">Rp{pendapatanKategori.reduce((sum, item) => sum + item.total, 0).toLocaleString('id-ID')}</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>

        
      </div>
    </div>
  );
}

// Definisi animasi kustom
const style = document.createElement('style');
style.textContent = `
  @keyframes fade-in {
    from { opacity: 0; }
    to { opacity: 1; }
  }
  
  @keyframes slide-up {
    from { opacity: 0; transform: translateY(20px); }
    to { opacity: 1; transform: translateY(0); }
  }
  
  @keyframes slide-left {
    from { opacity: 0; transform: translateX(20px); }
    to { opacity: 1; transform: translateX(0); }
  }
  
  @keyframes slide-right {
    from { opacity: 0; transform: translateX(-20px); }
    to { opacity: 1; transform: translateX(0); }
  }
  
  .animate-fade-in {
    animation: fade-in 0.6s ease-out forwards;
  }
  
  .animate-slide-up {
    animation: slide-up 0.6s ease-out forwards;
  }
  
  .animate-slide-left {
    animation: slide-left 0.6s ease-out forwards;
  }
  
  .animate-slide-right {
    animation: slide-right 0.6s ease-out forwards;
  }
`;
document.head.appendChild(style);

export default Profil;