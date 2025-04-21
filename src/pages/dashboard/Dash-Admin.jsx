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
} from "recharts";

export function Profil() {
  const [summary, setSummary] = useState({
    peserta: 0,
    karyaMasuk: 0,
    terverifikasi: 0,
    skorTertinggi: 0,
  });

  const [karyaData, setKaryaData] = useState([]);
  const [skorData, setSkorData] = useState([]);

  useEffect(() => {
    // Mock data kompetisi
    setSummary({
      peserta: 420,
      karyaMasuk: 385,
      terverifikasi: 310,
      skorTertinggi: 97,
    });

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
  }, []);

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      {/* Ringkasan Statistik */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <Card className="bg-indigo-100 shadow-md border-l-4 border-indigo-500">
          <CardBody>
            <Typography variant="h6" className="text-indigo-700 font-semibold">
              Total Peserta
            </Typography>
            <Typography variant="h4" className="text-indigo-900 font-bold">
              {summary.peserta}
            </Typography>
          </CardBody>
        </Card>
        <Card className="bg-purple-100 shadow-md border-l-4 border-purple-500">
          <CardBody>
            <Typography variant="h6" className="text-purple-700 font-semibold">
              Karya Masuk
            </Typography>
            <Typography variant="h4" className="text-purple-900 font-bold">
              {summary.karyaMasuk}
            </Typography>
          </CardBody>
        </Card>
        <Card className="bg-green-100 shadow-md border-l-4 border-green-500">
          <CardBody>
            <Typography variant="h6" className="text-green-700 font-semibold">
              Terverifikasi
            </Typography>
            <Typography variant="h4" className="text-green-900 font-bold">
              {summary.terverifikasi}
            </Typography>
          </CardBody>
        </Card>
        <Card className="bg-yellow-100 shadow-md border-l-4 border-yellow-500">
          <CardBody>
            <Typography variant="h6" className="text-yellow-700 font-semibold">
              Skor Tertinggi
            </Typography>
            <Typography variant="h4" className="text-yellow-900 font-bold">
              {summary.skorTertinggi}%
            </Typography>
          </CardBody>
        </Card>
      </div>

      {/* Grafik Pengumpulan Karya */}
      <Card className="mb-8 shadow-md">
        <CardBody>
          <Typography variant="h6" className="mb-4 text-indigo-800 font-semibold">
            Perkembangan Pengumpulan Karya
          </Typography>
          <ResponsiveContainer width="100%" height={250}>
            <LineChart data={karyaData}>
              <Line type="monotone" dataKey="karya" stroke="#6366f1" strokeWidth={3} />
              <CartesianGrid stroke="#e5e7eb" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
            </LineChart>
          </ResponsiveContainer>
        </CardBody>
      </Card>

      {/* Grafik Skor Tertinggi per Jenjang */}
      <Card className="shadow-md">
        <CardBody>
          <Typography variant="h6" className="mb-4 text-purple-800 font-semibold">
            Skor Tertinggi per Jenjang
          </Typography>
          <ResponsiveContainer width="100%" height={250}>
            <BarChart data={skorData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis domain={[0, 100]} />
              <Tooltip />
              <Bar dataKey="skor" fill="#a855f7" />
            </BarChart>
          </ResponsiveContainer>
        </CardBody>
      </Card>

      {/* Progress Verifikasi */}
      <Card className="mt-8 shadow-md">
        <CardBody>
          <Typography variant="h6" className="mb-4 text-green-800 font-semibold">
            Progress Verifikasi Karya
          </Typography>
          <div className="w-full bg-gray-200 rounded-full h-4">
            <div
              className="bg-green-500 h-4 rounded-full"
              style={{ width: `${(summary.terverifikasi / summary.karyaMasuk) * 100}%` }}
            />
          </div>
          <Typography variant="small" className="mt-2 text-gray-600">
            {summary.terverifikasi} dari {summary.karyaMasuk} karya telah diverifikasi (
            {((summary.terverifikasi / summary.karyaMasuk) * 100).toFixed(1)}%)
          </Typography>
        </CardBody>
      </Card>

      {/* Tabel Aktivitas Terakhir */}
      <Card className="mt-8 shadow-md">
        <CardBody>
          <Typography variant="h6" className="mb-4 text-blue-800 font-semibold">
            Aktivitas Terakhir
          </Typography>
          <div className="overflow-x-auto">
            <table className="w-full text-left table-auto border-collapse">
              <thead>
                <tr className="bg-blue-50 text-blue-700">
                  <th className="p-2 font-medium">Tanggal</th>
                  <th className="p-2 font-medium">Nama Peserta</th>
                  <th className="p-2 font-medium">Aksi</th>
                </tr>
              </thead>
              <tbody>
                {[
                  { date: "20 Apr 2025", name: "Ahmad Zaki", action: "Mengirim Karya" },
                  { date: "20 Apr 2025", name: "Nadia Salma", action: "Edit Biodata" },
                  { date: "19 Apr 2025", name: "Doni Wijaya", action: "Submit Jawaban CBT" },
                ].map((item, idx) => (
                  <tr key={idx} className="border-b hover:bg-gray-50">
                    <td className="p-2">{item.date}</td>
                    <td className="p-2">{item.name}</td>
                    <td className="p-2">{item.action}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardBody>
      </Card>

    </div>
  );
}

export default Profil;
