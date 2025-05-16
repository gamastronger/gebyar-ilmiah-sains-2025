import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import {
  Input,
  Button,
  Typography,
  Tabs,
  TabsHeader,
  TabsBody,
  Tab,
  TabPanel,
  Chip,
  Progress,
} from "@material-tailwind/react";
import Sidenav from "../../widgets/layout/sidenav";
import routes from "../../routes";
import { 
  FiUser, 
  FiEdit2,
  FiBookOpen,
  FiCheck,
  FiFile,
  FiMapPin,
  FiPhone,
  FiMail,
  FiSave, 
  FiArrowLeft,
  FiDownload,
  FiUpload,
  FiClock,
  FiAward,
  FiAlertCircle,
  FiCalendar,
  FiFileText,
  FiCheckCircle,
  FiTrash2,
  FiMoreVertical
} from "react-icons/fi";
import { motion } from "framer-motion";
import { participantsData } from "../../data/participantsData";
import api from "../../configs/api";

async function getParticipantById(id) {
  const res = await fetch(`${api.URL_API}/participants/${id}`);
  if (!res.ok) throw new Error("Gagal mengambil data peserta");
  return res.json();
}

async function updateParticipant(id, data) {
  const res = await fetch(`${api.URL_API}/participants/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  if (!res.ok) throw new Error("Gagal update data peserta");
  return res.json();
}

export default function ParticipantDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "Budi",
    email: "budi@email.com",
    whatsapp: "08123456789",
    alamat: "Jl. Mawar",
    sekolah: "SMA 1",
    nisn: "1234567890",
    kelas: "12",
    jenjang: "sma",
    jenisLomba: "KTI",
  });
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const [activeSection, setActiveSection] = useState("participant");
  const [fileUploads, setFileUploads] = useState([
    { id: 1, name: "Kartu Pelajar", status: "completed", progress: 100, link: "#" },
    { id: 2, name: "Form Pendaftaran", status: "completed", progress: 100, link: "#" },
    { id: 3, name: "Abstract KTI", status: "pending", progress: 0, link: null },
    { id: 4, name: "Bukti Pembayaran", status: "progress", progress: 65, link: null },
    { id: 5, name: "Bukti Upload Twibbon", status: "pending", progress: 0, link: null },
    { id: 6, name: "Bukti Transaksi", status: "pending", progress: 0, link: null },
  ]);
  const [scoreData, setScoreData] = useState({
    originalitas: 85,
    metodologi: 78,
    penyajian: 90,
    relevansi: 82,
    total: 84,
  });
  const [activities, setActivities] = useState([
    { 
      id: 1, 
      action: "Pendaftaran Berhasil", 
      date: "2 hari yang lalu", 
      status: "new", 
      icon: <FiEdit2 className="text-white" />, 
      colorClass: "from-purple-600 to-pink-500" 
    },
    { 
      id: 2, 
      action: "Berkas Diunggah", 
      date: "4 hari yang lalu", 
      status: "", 
      icon: <FiFile className="text-gray-500" />, 
      colorClass: "bg-gray-100" 
    },
    { 
      id: 3, 
      action: "Pembayaran Diverifikasi", 
      date: "5 hari yang lalu", 
      status: "", 
      icon: <FiCheckCircle className="text-gray-500" />, 
      colorClass: "bg-gray-100" 
    },
    { 
      id: 4, 
      action: "Akun Dibuat", 
      date: "1 minggu yang lalu", 
      status: "", 
      icon: <FiUser className="text-gray-500" />, 
      colorClass: "bg-gray-100" 
    },
  ]);
  const [scheduleItems, setScheduleItems] = useState([
    {
      id: 1,
      title: "Presentasi KTI",
      date: "28 Mei 2025",
      time: "09:00 - 11:00 WIB",
      location: "Ruang Seminar Lt. 3",
      status: "upcoming",
    },
    {
      id: 2,
      title: "Technical Meeting",
      date: "20 Mei 2025",
      time: "13:00 - 15:00 WIB",
      location: "Zoom Meeting",
      status: "upcoming",
    }
  ]);
  const [documentsTab, setDocumentsTab] = useState("submissions");

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        const data = await getParticipantById(id);
        if (data) {
          setFormData({
            ...data,
            name: data.name || data.nama || "",
            whatsapp: data.whatsapp || "",
            alamat: data.alamat || "",
            sekolah: data.sekolah || "",
            nisn: data.nisn || "",
            kelas: data.kelas || "",
            jenjang: data.jenjang || "",
            jenisLomba: data.jenisLomba || "",
          });
        }
      } catch (error) {
        Swal.fire("Gagal", "Gagal mengambil data peserta.", "error");
      }
      setIsLoading(false);
    };
    fetchData();
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    
    if (errors[name]) {
      setErrors({
        ...errors,
        [name]: null
      });
    }
  };

  const validateForm = () => {
    const newErrors = {};
    const requiredFields = [
      "name", "email", "whatsapp", 
      "alamat", "sekolah", "nisn", "kelas"
    ];
    
    requiredFields.forEach(field => {
      if (!formData[field]) newErrors[field] = "Wajib diisi";
    });
    
    if (formData.email && !/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Email tidak valid";
    }
    
    if (formData.whatsapp && !/^\d+$/.test(formData.whatsapp)) {
      newErrors.whatsapp = "Nomor WhatsApp harus berupa angka";
    } else if (formData.whatsapp && !/^[+]?[\d\s-]{10,15}$/.test(formData.whatsapp)) {
      newErrors.whatsapp = "Nomor telepon tidak valid";
    }
    
    if (formData.nisn && !/^\d+$/.test(formData.nisn)) {
      newErrors.nisn = "NISN harus berupa angka";
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (validateForm()) {
      Swal.fire({
        title: "Sedang menyimpan...",
        allowOutsideClick: false,
        didOpen: () => {
          Swal.showLoading();
        },
      });

      try {
        await updateParticipant(id, {
          ...formData,
          nama: formData.name,
        });
        Swal.fire({
          title: "Berhasil!",
          text: "Perubahan profil telah disimpan.",
          icon: "success",
          confirmButtonText: "Kembali ke Dashboard",
          confirmButtonColor: "#9333EA",
        }).then(() => {
          navigate("/admin/kti-admin");
        });
      } catch (error) {
        Swal.fire({
          title: "Gagal",
          text: "Gagal menyimpan perubahan.",
          icon: "error",
          confirmButtonColor: "#9333EA",
        });
      }
    } else {
      Swal.fire({
        title: "Perhatian",
        text: "Harap periksa kembali form yang Anda isi.",
        icon: "warning",
        confirmButtonText: "Baik",
        confirmButtonColor: "#9333EA",
      });
    }
  };

  const handleDeleteParticipant = () => {
    Swal.fire({
      title: "Hapus Peserta?",
      text: "Data peserta akan dihapus secara permanen. Tindakan ini tidak dapat dibatalkan.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Ya, Hapus",
      cancelButtonText: "Batal",
      confirmButtonColor: "#f43f5e",
      cancelButtonColor: "#9333EA",
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire({
          title: "Sedang menghapus...",
          allowOutsideClick: false,
          didOpen: () => {
            Swal.showLoading();
          },
        });
        
        setTimeout(() => {
          // Simulate deletion
          const index = participantsData.findIndex((item) => item.id === parseInt(id));
          if (index !== -1) {
            participantsData.splice(index, 1);
          }
          
          Swal.fire({
            title: "Berhasil Dihapus!",
            text: "Data peserta telah dihapus dari sistem.",
            icon: "success",
            confirmButtonText: "Kembali ke Dashboard",
            confirmButtonColor: "#9333EA",
          }).then(() => {
            navigate("/admin/kti-admin");
          });
        }, 1000);
      }
    });
  };

  const handleFileUpload = (fileId) => {
    // Simulate file upload process
    const updatedFiles = fileUploads.map(file => {
      if (file.id === fileId && file.status !== "completed") {
        return { ...file, status: "progress", progress: 1 };
      }
      return file;
    });
    
    setFileUploads(updatedFiles);
    
    // Simulate upload progress
    const fileToUpdate = updatedFiles.find(file => file.id === fileId);
    if (fileToUpdate && fileToUpdate.status === "progress") {
      const interval = setInterval(() => {
        setFileUploads(prevFiles => {
          const newFiles = prevFiles.map(file => {
            if (file.id === fileId) {
              const newProgress = file.progress + 5;
              if (newProgress >= 100) {
                clearInterval(interval);
                return { ...file, progress: 100, status: "completed", link: "#" };
              }
              return { ...file, progress: newProgress };
            }
            return file;
          });
          return newFiles;
        });
      }, 150);
    }
  };

  const SectionButton = ({ icon, title, active, onClick }) => (
    <button
      onClick={onClick}
      className={`flex items-center w-full px-4 py-3 rounded-lg transition-all ${
        active 
          ? "bg-gradient-to-r from-purple-600 to-pink-500 text-white shadow-md" 
          : "bg-white text-gray-700 hover:bg-purple-50"
      }`}
    >
      <div className={`p-2 mr-3 rounded-full ${active ? "bg-white bg-opacity-20" : "bg-purple-100"}`}>
        {icon}
      </div>
      <span className="font-medium">{title}</span>
      {active && <FiCheck className="ml-auto" />}
    </button>
  );

  const FormInput = ({ label, name, type = "text", value, placeholder, error }) => (
    <div className="mb-4">
      <label className="text-sm font-medium text-gray-700 mb-1 block">
        {label}
      </label>
      <Input
        type={type}
        name={name}
        value={value || ""}
        onChange={handleChange}
        placeholder={placeholder}
        className={`border ${error ? "border-red-500" : "border-gray-300"} rounded-lg px-3 py-2 focus:ring-purple-500 focus:border-purple-500`}
        containerProps={{ className: "min-w-full" }}
        error={!!error}
        success={value && !error}
      />
      {error && (
        <p className="text-red-500 text-xs mt-1">{error}</p>
      )}
    </div>
  );

  const FileUploadCard = ({ file, onUpload }) => (
    <div className="bg-white border border-gray-200 rounded-lg p-4 mb-3">
      <div className="flex items-center justify-between mb-2">
        <div className="flex items-center">
          <div className={`p-2 rounded-full ${file.status === "completed" ? "bg-green-100" : file.status === "progress" ? "bg-blue-100" : "bg-gray-100"}`}>
            {file.status === "completed" ? (
              <FiCheckCircle className="text-green-500" />
            ) : file.status === "progress" ? (
              <FiClock className="text-blue-500" />
            ) : (
              <FiFile className="text-gray-500" />
            )}
          </div>
          <div className="ml-3">
            <p className="font-medium text-gray-800 text-sm">{file.name}</p>
            <p className="text-xs text-gray-500">
              {file.status === "completed" 
                ? "Berkas telah diunggah" 
                : file.status === "progress" 
                ? `Mengunggah (${file.progress}%)` 
                : "Berkas belum diunggah"}
            </p>
          </div>
        </div>
        
        {file.status === "completed" ? (
          <a 
            href={file.link} 
            className="p-2 bg-purple-50 hover:bg-purple-100 text-purple-600 rounded-full transition-colors"
          >
            <FiDownload size={16} />
          </a>
        ) : (
          <button 
            className="p-2 bg-purple-50 hover:bg-purple-100 text-purple-600 rounded-full transition-colors"
            onClick={() => onUpload(file.id)}
          >
            <FiUpload size={16} />
          </button>
        )}
      </div>
      
      {file.status === "progress" && (
        <div className="w-full bg-gray-200 rounded-full h-1.5 mt-2">
          <div 
            className="bg-gradient-to-r from-purple-600 to-pink-500 h-1.5 rounded-full transition-all duration-300" 
            style={{ width: `${file.progress}%` }}
          ></div>
        </div>
      )}
    </div>
  );

  const ScoreCard = ({ title, score }) => (
    <div className="bg-white border border-gray-200 rounded-lg p-4">
      <div className="flex items-center justify-between mb-3">
        <p className="font-medium text-gray-800">{title}</p>
        <span className={`text-sm font-bold ${
          score >= 90 ? "text-green-500" : 
          score >= 75 ? "text-blue-500" : 
          score >= 60 ? "text-yellow-500" : 
          "text-red-500"
        }`}>{score}/100</span>
      </div>
      <div className="w-full bg-gray-200 rounded-full h-2">
        <div 
          className={`h-2 rounded-full ${
            score >= 90 ? "bg-green-500" : 
            score >= 75 ? "bg-blue-500" : 
            score >= 60 ? "bg-yellow-500" : 
            "bg-red-500"
          }`}
          style={{ width: `${score}%` }}
        ></div>
      </div>
    </div>
  );

  const ActivityCard = ({ activity }) => (
    <div className="flex items-start p-3 bg-white rounded-lg border border-gray-100 hover:bg-purple-50 transition-colors">
      <div className={`p-2 rounded-lg mr-3 ${activity.status === "new" ? `bg-gradient-to-r ${activity.colorClass}` : activity.colorClass}`}>
        {activity.icon}
      </div>
      <div>
        <div className="flex items-center gap-2">
          <p className="font-medium text-gray-800">{activity.action}</p>
          {activity.status === "new" && (
            <span className="text-xs bg-green-100 text-green-600 py-0.5 px-2 rounded">Baru</span>
          )}
        </div>
        <p className="text-xs text-gray-500 mt-1">{activity.date}</p>
      </div>
    </div>
  );

  const ScheduleCard = ({ item }) => (
    <div className="bg-white border border-gray-200 rounded-lg p-4 mb-3 hover:border-purple-300 transition-colors">
      <div className="flex items-start">
        <div className="bg-purple-100 text-purple-600 p-3 rounded-lg mr-4">
          <FiCalendar />
        </div>
        <div className="flex-1">
          <div className="flex justify-between items-start mb-2">
            <h4 className="font-medium text-gray-800">{item.title}</h4>
            <Chip
              size="sm"
              variant="ghost"
              value={item.status === "upcoming" ? "Akan Datang" : "Selesai"}
              color={item.status === "upcoming" ? "blue" : "green"}
              className="rounded-full text-xs"
            />
          </div>
          <div className="grid grid-cols-2 gap-2 text-sm">
            <div>
              <p className="text-xs text-gray-500">Tanggal</p>
              <p className="text-gray-800">{item.date}</p>
            </div>
            <div>
              <p className="text-xs text-gray-500">Waktu</p>
              <p className="text-gray-800">{item.time}</p>
            </div>
            <div className="col-span-2">
              <p className="text-xs text-gray-500">Lokasi</p>
              <p className="text-gray-800">{item.location}</p>
            </div>
          </div>
          <div className="mt-3 flex justify-end">
            <button className="text-xs font-medium text-purple-600 hover:text-purple-800">
              Lihat Detail
            </button>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-pink-50">
      <div className="hidden md:block">
        <Sidenav brandName="Admin Dashboard" routes={routes} />
      </div>

      <div className="w-full md:pl-10">
        {isLoading ? (
          <div className="flex justify-center items-center h-screen">
            <div className="animate-spin rounded-full h-12 w-12 border-t-4 border-b-4 border-purple-600"></div>
          </div>
        ) : (
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="max-w-7xl mx-auto px-4 py-6 md:px-6 lg:px-8"
          >
            


            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
              {/* Sidebar Navigation */}
              <div className="lg:col-span-3">
                <div className="bg-white rounded-xl shadow-sm p-5 sticky top-6">
                  <div className="mb-6">
                    <h3 className="text-lg font-bold text-gray-800 mb-4">Menu Navigasi</h3>
                    <div className="space-y-2">
                      <SectionButton 
                        icon={<FiUser className="text-purple-600" />} 
                        title="Data Peserta" 
                        active={activeSection === "participant"}
                        onClick={() => setActiveSection("participant")}
                      />
                      <SectionButton 
                        icon={<FiFileText className="text-purple-600" />} 
                        title="Dokumen & Berkas" 
                        active={activeSection === "documents"}
                        onClick={() => setActiveSection("documents")}
                      />
                    </div>
                  </div>
                </div>
              </div>

              {/* Form Content */}
              <div className="lg:col-span-9">
                <div className="bg-white rounded-xl shadow-sm overflow-hidden">
                  <form onSubmit={handleSubmit}>
                    {/* Data Peserta (Gabungan Data Pribadi, Akademik, Lomba) */}
                    <div className={`${activeSection === "participant" ? "block" : "hidden"}`}>
                      <div className="border-b border-gray-100">
                        <div className="px-6 py-4 bg-gradient-to-r from-purple-600 to-pink-500">
                          <h2 className="text-xl font-bold text-white flex items-center">
                            <FiUser className="mr-2" /> Detail Data Peserta
                          </h2>
                        </div>
                      </div>
                      <div className="p-2">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                          {/* Baris 1 */}
                          <FormInput 
                            label="Nama Lengkap" 
                            name="name" 
                            value={formData.name}
                            placeholder="Masukkan nama lengkap peserta"
                            error={errors.name}
                          />
                          <FormInput 
                            label="Email" 
                            name="email" 
                            type="email"
                            value={formData.email}
                            placeholder="contoh@email.com"
                            error={errors.email}
                          />
                          {/* Baris 2 */}
                          <FormInput 
                            label="Nomor WhatsApp" 
                            name="whatsapp" 
                            value={formData.whatsapp}
                            placeholder="08xxxxxxxxxx"
                            error={errors.whatsapp}
                          />
                          <FormInput 
                            label="Alamat Lengkap" 
                            name="alamat" 
                            value={formData.alamat}
                            placeholder="Masukkan alamat lengkap"
                            error={errors.alamat}
                          />
                          {/* Baris 3 */}
                          <FormInput 
                            label="Asal Sekolah" 
                            name="sekolah" 
                            value={formData.sekolah}
                            placeholder="Masukkan nama sekolah"
                            error={errors.sekolah}
                          />
                          <FormInput 
                            label="NISN" 
                            name="nisn" 
                            value={formData.nisn}
                            placeholder="Masukkan NISN"
                            error={errors.nisn}
                          />
                          {/* Baris 4: Jenis Lomba (full width) */}
                          <div className="md:col-span-2">
                            <FormInput 
                              label="Jenis Lomba" 
                              name="jenisLomba" 
                              value={formData.jenisLomba}
                              placeholder="Masukkan jenis lomba"
                              error={errors.jenisLomba}
                            />
                          </div>
                          {/* Baris 5 */}
                          <FormInput 
                            label="Kelas" 
                            name="kelas" 
                            value={formData.kelas}
                            placeholder="Contoh: 10, 11, 12"
                            error={errors.kelas}
                          />
                          <div>
                            <label className="text-sm font-medium text-gray-700 mb-1 block">
                              Jenjang Pendidikan
                            </label>
                            <select
                              name="jenjang"
                              value={formData.jenjang || ""}
                              onChange={handleChange}
                              className={`w-full px-3 py-2.5 border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-purple-500 ${
                                errors.jenjang ? "border-red-500" : "border-gray-300"
                              }`}
                            >
                              <option value="">Pilih jenjang</option>
                              <option value="sd">SD</option>
                              <option value="smp">SMP</option>
                              <option value="sma">SMA/SMK</option>
                            </select>
                            {errors.jenjang && (
                              <p className="text-red-500 text-xs mt-1">{errors.jenjang}</p>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Documents & Files */}
                    <div className={`${activeSection === "documents" ? "block" : "hidden"}`}>
                      <div className="border-b border-gray-100">
                        <div className="px-6 py-4 bg-gradient-to-r from-purple-600 to-pink-500">
                          <h2 className="text-xl font-bold text-white flex items-center">
                            <FiFileText className="mr-2" /> Dokumen & Berkas
                          </h2>
                        </div>
                      </div>
                      <div className="p-6">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                          {fileUploads.map((file) => (
                            <FileUploadCard key={file.id} file={file} onUpload={handleFileUpload} />
                          ))}
                        </div>
                      </div>
                    </div>

                    {/* Tombol aksi di bawah form */}
                    <div className="flex justify-end gap-3 px-6 py-4 border-t border-gray-100 bg-gray-50">
                      <Button
                        color="green"
                        className="flex items-center gap-2 px-6 py-2.5 bg-gradient-to-r from-green-600 to-green-400 text-white font-medium rounded-lg shadow-lg hover:shadow-xl transition-all duration-200"
                        onClick={() => {
                          Swal.fire({
                            title: "Verifikasi Peserta?",
                            text: "Pastikan semua berkas sudah lengkap sebelum verifikasi.",
                            icon: "question",
                            showCancelButton: true,
                            confirmButtonText: "Verifikasi",
                            cancelButtonText: "Batal",
                            confirmButtonColor: "#22c55e",
                            cancelButtonColor: "#9333EA",
                          }).then((result) => {
                            if (result.isConfirmed) {
                              Swal.fire({
                                title: "Terverifikasi!",
                                text: "Peserta telah berhasil diverifikasi.",
                                icon: "success",
                                confirmButtonColor: "#9333EA",
                              });
                            }
                          });
                        }}
                        type="button"
                      >
                        <FiCheckCircle className="text-lg" /> Verifikasi
                      </Button>
                      <Button
                        type="submit"
                        className="flex items-center gap-2 px-6 py-2.5 bg-gradient-to-r from-purple-600 to-pink-500 text-white font-medium rounded-lg shadow-lg hover:shadow-xl transition-all duration-200"
                      >
                        <FiSave className="text-lg" /> Simpan Perubahan
                      </Button>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </div>
    </div>
  );
}