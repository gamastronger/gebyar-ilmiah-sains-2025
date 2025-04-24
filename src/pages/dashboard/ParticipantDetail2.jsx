import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import Sidenav from "../../widgets/layout/sidenav";
import routes from "../../routes";

const participantsData = [
  {
    id: 1,
    name: "Peserta 1",
    email: "peserta1@example.com",
    whatsapp: "081234567890",
    alamat: "Jl. Mawar No. 123, Jakarta",
    sekolah: "SMA Negeri 1 Jakarta",
    nisn: "1234567890",
    kelas: "12 IPA 1",
  },
  {
    id: 2,
    name: "Peserta 2",
    email: "peserta2@example.com",
    whatsapp: "082345678901",
    alamat: "Jl. Melati No. 45, Bandung",
    sekolah: "SMA Negeri 2 Bandung",
    nisn: "0987654321",
    kelas: "12 IPS 2",
  },
];

export default function ParticipantDetail2() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({});
  const [errors, setErrors] = useState({});

  useEffect(() => {
    const data = participantsData.find((item) => item.id === parseInt(id));
    if (data) setFormData(data);
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const newErrors = {};
    Object.keys(formData).forEach((key) => {
      if (!formData[key]) newErrors[key] = true;
    });
    setErrors(newErrors);
    if (Object.keys(newErrors).length === 0) {
      Swal.fire({
        title: "Berhasil!",
        text: "Data peserta berhasil disimpan.",
        icon: "success",
        confirmButtonText: "Kembali ke Dashboard",
        confirmButtonColor: "#6B46C1",
      }).then(() => {
        navigate("/cbt-admin");
      });
    }
  };

  return (
    <div className="flex min-h-screen bg-gradient-to-br from-blue-500 via-purple-500 to-pink-500">
      {/* Sidebar */}
      <Sidenav brandName="Admin Dashboard" routes={routes} />

      {/* Main Content */}
      <main className="flex-1 xl:ml-80 ml-64 p-6">
        <div className="max-w-5xl mx-auto bg-white rounded-lg shadow-lg p-8">
          <h2 className="text-3xl font-bold text-gray-800 mb-4">Edit Data Peserta CBT</h2>
          <p className="text-gray-600 mb-6">
            Lengkapi data peserta di bawah ini. Pastikan semua informasi sudah benar sebelum menyimpan.
          </p>

          <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Name */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Nama Lengkap</label>
              <input
                type="text"
                name="name"
                value={formData.name || ""}
                onChange={handleChange}
                placeholder="Masukkan Nama Lengkap"
                className={`w-full px-4 py-2 border ${
                  errors.name ? "border-red-500" : "border-gray-300"
                } rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500`}
              />
            </div>

            {/* Email */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
              <input
                type="email"
                name="email"
                value={formData.email || ""}
                onChange={handleChange}
                placeholder="Masukkan Email"
                className={`w-full px-4 py-2 border ${
                  errors.email ? "border-red-500" : "border-gray-300"
                } rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500`}
              />
            </div>

            {/* Sekolah */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Sekolah</label>
              <input
                type="text"
                name="sekolah"
                value={formData.sekolah || ""}
                onChange={handleChange}
                placeholder="Masukkan Nama Sekolah"
                className={`w-full px-4 py-2 border ${
                  errors.sekolah ? "border-red-500" : "border-gray-300"
                } rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500`}
              />
            </div>

            {/* WhatsApp */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Nomor WhatsApp</label>
              <input
                type="text"
                name="whatsapp"
                value={formData.whatsapp || ""}
                onChange={handleChange}
                placeholder="Masukkan Nomor WhatsApp"
                className={`w-full px-4 py-2 border ${
                  errors.whatsapp ? "border-red-500" : "border-gray-300"
                } rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500`}
              />
            </div>

            {/* Kelas */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Kelas</label>
              <input
                type="text"
                name="kelas"
                value={formData.kelas || ""}
                onChange={handleChange}
                placeholder="Masukkan Kelas"
                className={`w-full px-4 py-2 border ${
                  errors.kelas ? "border-red-500" : "border-gray-300"
                } rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500`}
              />
            </div>

            {/* NISN */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">NISN</label>
              <input
                type="text"
                name="nisn"
                value={formData.nisn || ""}
                onChange={handleChange}
                placeholder="Masukkan NISN"
                className={`w-full px-4 py-2 border ${
                  errors.nisn ? "border-red-500" : "border-gray-300"
                } rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500`}
              />
            </div>

            {/* Alamat */}
            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-1">Alamat</label>
              <input
                type="text"
                name="alamat"
                value={formData.alamat || ""}
                onChange={handleChange}
                placeholder="Masukkan Alamat Lengkap"
                className={`w-full px-4 py-2 border ${
                  errors.alamat ? "border-red-500" : "border-gray-300"
                } rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500`}
              />
            </div>

            {/* Buttons */}
            <div className="md:col-span-2 flex justify-end gap-4 pt-4">
              <button
                type="button"
                onClick={() => navigate(-1)}
                className="px-6 py-2 border rounded-md text-gray-700 border-gray-300 hover:bg-gray-100"
              >
                Batal
              </button>
              <button
                type="submit"
                className="px-6 py-2 bg-purple-500 text-white rounded-md hover:bg-purple-600 transition"
              >
                Simpan
              </button>
            </div>
          </form>
        </div>
      </main>
    </div>
  );
}