import {
  Card,
  CardBody,
  Typography,
} from "@material-tailwind/react";
import React, { useEffect, useState } from "react";
import {
  LineChart,
  Line,
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
    skorTertinggi: 0,
    pendapatan: 0,
  });

  const [karyaData, setKaryaData] = useState([]);
  const [skorData, setSkorData] = useState([]);
  const [isLoaded, setIsLoaded] = useState(false);
  const [animatedValues, setAnimatedValues] = useState({
    peserta: 0,
    karyaMasuk: 0,
    terverifikasi: 0,
    skorTertinggi: 0,
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
      skorTertinggi: 97,
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
          skorTertinggi: Math.round(finalData.skorTertinggi * progress),
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

    setSkorData([
      { name: "SMP", skor: 87 },
      { name: "SMA", skor: 93 },
      { name: "Mahasiswa", skor: 97 },
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
          <Typography variant="h3" className="text-purple-900 font-bold">
            Dashboard Overview
          </Typography>
          <Typography variant="paragraph" className="text-gray-600">
            Monitoring data kompetisi dan statistik peserta
          </Typography>
        </div>

        {/* Ringkasan Statistik dengan Animasi */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6 mb-8">
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
              title: "Skor Tertinggi",
              value: animatedValues.skorTertinggi,
              color: "amber",
              icon: <i className="fas fa-trophy text-xl"></i>,
              delay: "0.5s",
              suffix: "%"
            },
            {
              title: "Total Pendapatan",
              value: `Rp${animatedValues.pendapatan.toLocaleString()}`,
              color: "amber",
              icon: <i className="fas fa-coins text-xl"></i>,
              delay: "0.6s"
            }
          ].map((item, index) => (
            <div 
              key={index}
              className={`opacity-0 animate-slide-up`} 
              style={{ animationDelay: item.delay, animationFillMode: "forwards" }}
            >
              <Card className={`bg-${item.color}-50 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 overflow-hidden relative`}>
                <div className={`absolute top-0 left-0 h-full w-1 bg-${item.color}-500`}></div>
                <CardBody className="flex items-center justify-between">
                  <div>
                    <Typography variant="small" className={`text-${item.color}-700 font-medium mb-1`}>
                      {item.title}
                    </Typography>
                    <Typography variant="h3" className={`text-${item.color}-900 font-bold`}>
                      {item.value}{item.suffix || ""}
                    </Typography>
                  </div>
                  <div className={`p-3 rounded-full bg-${item.color}-100 text-${item.color}-600`}>
                    {item.icon}
                  </div>
                </CardBody>
              </Card>
            </div>
          ))}
        </div>

        {/* Row 1: Grafik */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          {/* Grafik Pengumpulan Karya */}
          <div className="opacity-0 animate-slide-left" style={{ animationDelay: "0.6s", animationFillMode: "forwards" }}>
            <Card className="shadow-lg hover:shadow-xl transition-all duration-300">
              <CardBody>
                <div className="flex justify-between items-center mb-4">
                  <Typography variant="h6" className="text-purple-800 font-semibold">
                    Perkembangan Pengumpulan Karya
                  </Typography>
                  <div className="text-purple-500">
                    <i className="fas fa-chart-line"></i>
                  </div>
                </div>
                <div className="h-64">
                  {isLoaded && (
                    <ResponsiveContainer width="100%" height="100%">
                      <AreaChart data={karyaData} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
                        <defs>
                          <linearGradient id="colorKarya" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="5%" stopColor="#8B5CF6" stopOpacity={0.8}/>
                            <stop offset="95%" stopColor="#8B5CF6" stopOpacity={0}/>
                          </linearGradient>
                        </defs>
                        <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" />
                        <XAxis dataKey="name" stroke="#6B7280" />
                        <YAxis stroke="#6B7280" />
                        <Tooltip content={<CustomTooltip />} />
                        <Area 
                          type="monotone" 
                          dataKey="karya" 
                          stroke="#8B5CF6" 
                          fillOpacity={1} 
                          fill="url(#colorKarya)" 
                          strokeWidth={3} 
                          activeDot={{ r: 6, stroke: '#8B5CF6', strokeWidth: 2, fill: '#ffffff' }}
                        />
                      </AreaChart>
                    </ResponsiveContainer>
                  )}
                </div>
              </CardBody>
            </Card>
          </div>

          {/* Grafik Skor Tertinggi per Jenjang */}
          <div className="opacity-0 animate-slide-right" style={{ animationDelay: "0.7s", animationFillMode: "forwards" }}>
            <Card className="shadow-lg hover:shadow-xl transition-all duration-300">
              <CardBody>
                <div className="flex justify-between items-center mb-4">
                  <Typography variant="h6" className="text-indigo-800 font-semibold">
                    Skor Tertinggi per Jenjang
                  </Typography>
                  <div className="text-indigo-500">
                    <i className="fas fa-chart-bar"></i>
                  </div>
                </div>
                <div className="h-64">
                  {isLoaded && (
                    <ResponsiveContainer width="100%" height="100%">
                      <BarChart data={skorData} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
                        <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" />
                        <XAxis dataKey="name" stroke="#6B7280" />
                        <YAxis domain={[0, 100]} stroke="#6B7280" />
                        <Tooltip content={<CustomTooltip />} />
                        <defs>
                          <linearGradient id="barGradient" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="0%" stopColor="#6366F1" stopOpacity={1} />
                            <stop offset="100%" stopColor="#8B5CF6" stopOpacity={1} />
                          </linearGradient>
                        </defs>
                        <Bar 
                          dataKey="skor" 
                          fill="url(#barGradient)" 
                          barSize={40} 
                          radius={[5, 5, 0, 0]} 
                          animationDuration={1500}
                        />
                      </BarChart>
                    </ResponsiveContainer>
                  )}
                </div>
              </CardBody>
            </Card>
          </div>
        </div>

        {/* Progress Verifikasi */}
        <div className="opacity-0 animate-slide-up" style={{ animationDelay: "0.8s", animationFillMode: "forwards" }}>
          <Card className="mb-8 shadow-lg hover:shadow-xl transition-all duration-300">
            <CardBody>
              <div className="flex justify-between items-center mb-4">
                <Typography variant="h6" className="text-green-800 font-semibold">
                  Progress Verifikasi Karya
                </Typography>
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
                  <Typography variant="small" className="text-gray-600">
                    {animatedValues.terverifikasi} dari {summary.karyaMasuk} karya telah diverifikasi
                  </Typography>
                  <Typography variant="small" className="text-green-600 font-medium">
                    Target: 100%
                  </Typography>
                </div>
              </div>
            </CardBody>
          </Card>
        </div>

        {/* Tabel Pendapatan per Kategori dan Gelombang */}
        <div className="opacity-0 animate-slide-up" style={{ animationDelay: "0.7s", animationFillMode: "forwards" }}>
          <Card className="shadow-lg hover:shadow-xl transition-all duration-300 mb-8">
            <CardBody>
              <Typography variant="h6" className="text-amber-800 font-semibold mb-4">
                Pendapatan per Kategori & Gelombang
              </Typography>
              <div className="overflow-x-auto rounded-lg border border-gray-200">
                <table className="w-full text-left table-auto border-collapse">
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
                        <td className="px-4 py-3 text-amber-800">Rp{row.gelombang1.toLocaleString()}</td>
                        <td className="px-4 py-3 text-amber-800">Rp{row.gelombang2.toLocaleString()}</td>
                        <td className="px-4 py-3 font-bold text-amber-900">Rp{row.total.toLocaleString()}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </CardBody>
          </Card>
        </div>

        {/* Tabel Aktivitas Terakhir */}
        <div className="opacity-0 animate-slide-up" style={{ animationDelay: "0.9s", animationFillMode: "forwards" }}>
          <Card className="shadow-lg hover:shadow-xl transition-all duration-300">
            <CardBody>
              <div className="flex justify-between items-center mb-4">
                <Typography variant="h6" className="text-purple-800 font-semibold">
                  Aktivitas Terakhir
                </Typography>
                <div className="text-purple-500">
                  <i className="fas fa-history"></i>
                </div>
              </div>
              <div className="overflow-x-auto rounded-lg border border-gray-200">
                <table className="w-full text-left table-auto border-collapse">
                  <thead>
                    <tr className="bg-purple-50">
                      <th className="px-4 py-3 font-medium text-purple-900 border-b">Tanggal</th>
                      <th className="px-4 py-3 font-medium text-purple-900 border-b">Nama Peserta</th>
                      <th className="px-4 py-3 font-medium text-purple-900 border-b">Aksi</th>
                      <th className="px-4 py-3 font-medium text-purple-900 border-b">Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {[
                      { date: "20 Apr 2025", name: "Ahmad Zaki", action: "Mengirim Karya", status: "success" },
                      { date: "20 Apr 2025", name: "Nadia Salma", action: "Edit Biodata", status: "info" },
                      { date: "19 Apr 2025", name: "Doni Wijaya", action: "Submit Jawaban CBT", status: "warning" },
                      { date: "19 Apr 2025", name: "Sinta Dewi", action: "Verifikasi Email", status: "success" },
                    ].map((item, idx) => (
                      <tr key={idx} className="border-b hover:bg-gray-50 transition-colors duration-200 animate-fade-in" style={{ animationDelay: `${1 + idx * 0.1}s` }}>
                        <td className="px-4 py-3 text-gray-700">{item.date}</td>
                        <td className="px-4 py-3 font-medium text-gray-900">{item.name}</td>
                        <td className="px-4 py-3 text-gray-700">{item.action}</td>
                        <td className="px-4 py-3">
                          <span className={`inline-block px-2 py-1 text-xs font-medium rounded-full ${
                            item.status === 'success' ? 'bg-green-100 text-green-800' : 
                            item.status === 'info' ? 'bg-blue-100 text-blue-800' : 
                            'bg-amber-100 text-amber-800'
                          }`}>
                            {item.status === 'success' ? 'Selesai' : 
                             item.status === 'info' ? 'Diproses' : 'Menunggu'}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </CardBody>
          </Card>
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