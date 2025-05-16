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
  const res = await fetch(`${api.URL_API}/api/users/${id}`, {
    method: "GET",
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  });
  if (!res.ok) throw new Error("Gagal mengambil data peserta");
  return res.json();
}

async function updateParticipant(id, data) {
  const res = await fetch(`${api.URL_API}/api/users/${id}`, {
    method: "PUT",
    credentials: "include",
    headers: { 
      "Content-Type": "application/json",
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
    body: JSON.stringify(data),
  });
  if (!res.ok) throw new Error("Gagal update data peserta");
  return res.json();
}

export default function ParticipantDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({});
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const [activeSection, setActiveSection] = useState("participant");
  const [fileUploads, setFileUploads] = useState([]);
  const [invoice, setInvoice] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        // Fetch data peserta
        const data = await getParticipantById(id);
        if (data) {
          setFormData({
            name: data.name || "",
            email: data.email || "",
            nomor_wa: data.nomor_wa || "",
            alamat: data.alamat || "",
            asal_sekolah: data.asal_sekolah || "",
            nisn: data.nisn || "",
            kelas: data.kelas || "",
            jenjang: data.jenjang || "",
            jenis_lomba: data.jenis_lomba || "",
            guru: data.guru || "",
            wa_guru: data.wa_guru || "",
            email_guru: data.email_guru || "",
            link_twibbon: data.link_twibbon || "",
            status: data.status || "",
          });
        }
        // Fetch dokumen peserta
        const res = await fetch(`${api.URL_API}/participants/${id}/files`, {
          headers: {
            "Authorization": `Bearer ${localStorage.getItem("token")}`,
          },
        });
        if (res.ok) {
          const files = await res.json();
          setFileUploads(files);
        } else {
          setFileUploads([]);
        }

        // Fetch invoice peserta
        const invoiceRes = await fetch(`${api.URL_API}/api/invoices/${id}`, {
          headers: {
            "Authorization": `Bearer ${localStorage.getItem("token")}`,
          },
        });
        if (invoiceRes.ok) {
          const invoiceData = await invoiceRes.json();
          setInvoice(invoiceData && invoiceData.length > 0 ? invoiceData[0] : null);
        } else {
          setInvoice(null);
        }
      } catch (error) {
        Swal.fire("Gagal", "Gagal mengambil data peserta atau dokumen.", "error");
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
      "name", "email", "nomor_wa", 
      "alamat", "asal_sekolah", "nisn"
    ];
    
    requiredFields.forEach(field => {
      if (!formData[field]) newErrors[field] = "Wajib diisi";
    });
    
    if (formData.email && !/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Email tidak valid";
    }
    
    if (formData.nomor_wa && !/^\d+$/.test(formData.nomor_wa)) {
      newErrors.nomor_wa = "Nomor WhatsApp harus berupa angka";
    } else if (formData.nomor_wa && !/^[+]?[\d\s-]{10,15}$/.test(formData.nomor_wa)) {
      newErrors.nomor_wa = "Nomor telepon tidak valid";
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
          navigate("/admin");
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

  const FileUploadCard = ({ file }) => (
    <div className="bg-white border border-gray-200 rounded-lg p-4 mb-3">
      <div className="flex items-center justify-between mb-2">
        <div className="flex items-center">
          <div className="p-2 rounded-full bg-green-100">
            <FiCheckCircle className="text-green-500" />
          </div>
          <div className="ml-3">
            <p className="font-medium text-gray-800 text-sm">{file.name}</p>
            <p className="text-xs text-gray-500">
              {file.url ? "Berkas telah diunggah" : "Berkas belum diunggah"}
            </p>
          </div>
        </div>
        {file.url && (
          <a
            href={file.url}
            download
            target="_blank"
            rel="noopener noreferrer"
            className="p-2 bg-purple-50 hover:bg-purple-100 text-purple-600 rounded-full transition-colors"
          >
            <FiDownload size={16} />
          </a>
        )}
      </div>
      {file.url && file.type && file.type.startsWith("image") && (
        <div className="mt-2">
          <img
            src={file.url}
            alt={file.name}
            className="max-h-40 rounded-lg border border-gray-100 object-contain"
          />
        </div>
      )}
    </div>
  );

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
                            name="nomor_wa" 
                            value={formData.nomor_wa}
                            placeholder="08xxxxxxxxxx"
                            error={errors.nomor_wa}
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
                            name="asal_sekolah" 
                            value={formData.asal_sekolah}
                            placeholder="Masukkan nama sekolah"
                            error={errors.asal_sekolah}
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
                              name="jenis_lomba" 
                              value={formData.jenis_lomba}
                              placeholder="Masukkan jenis lomba"
                              error={errors.jenis_lomba}
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
                          {/* Baris 6 */}
                          <FormInput 
                            label="Guru Pembimbing" 
                            name="guru" 
                            value={formData.guru}
                            placeholder="Nama guru pembimbing"
                            error={errors.guru}
                          />
                          <FormInput 
                            label="WA Guru" 
                            name="wa_guru" 
                            value={formData.wa_guru}
                            placeholder="Nomor WA guru"
                            error={errors.wa_guru}
                          />
                          <FormInput 
                            label="Email Guru" 
                            name="email_guru" 
                            value={formData.email_guru}
                            placeholder="Email guru"
                            error={errors.email_guru}
                          />
                          <FormInput 
                            label="Status" 
                            name="status" 
                            value={formData.status}
                            placeholder="Status peserta"
                            error={errors.status}
                          />
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
                        {/* Tampilkan gambar/link twibbon dan bukti pembayaran */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                        {formData.link_twibbon ? (
                          <div className="flex flex-col items-center bg-white border border-gray-200 rounded-lg p-4">
                            <span className="font-semibold mb-2">Twibbon</span>
                            <a
                              href={api.URL_API + "/storage/" + formData.link_twibbon}
                              target="_blank"
                              rel="noopener noreferrer"
                            >
                              <img
                                src={api.URL_API + "/storage/" + formData.link_twibbon}
                                alt="Twibbon"
                                className="max-h-40 rounded-lg border border-gray-100 object-contain"
                                onError={(e) => {
                                  e.target.style.display = "none";
                                }}
                              />
                            </a>
                          </div>
                        ) : (
                          <div className="flex flex-col items-center bg-white border border-gray-200 rounded-lg p-4">
                            <span className="font-semibold mb-2">Twibbon</span>
                            <p className="text-gray-500">Belum ada twibbon yang diunggah.</p>
                          </div>
                        )}

                        {invoice && invoice.upload_bukti ? (
                          <div className="flex flex-col items-center bg-white border border-gray-200 rounded-lg p-4">
                            <span className="font-semibold mb-2">Bukti Pembayaran</span>
                            <a
                              href={api.URL_API + "/storage/" + invoice.upload_bukti}
                              target="_blank"
                              rel="noopener noreferrer"
                            >
                              <img
                                src={api.URL_API + "/storage/" + invoice.upload_bukti}
                                alt="Bukti Pembayaran"
                                className="max-h-40 rounded-lg border border-gray-100 object-contain"
                                onError={(e) => {
                                  e.target.style.display = "none";
                                }}
                              />
                            </a>
                          </div>
                        ) : (
                          <div className="flex flex-col items-center bg-white border border-gray-200 rounded-lg p-4">
                            <span className="font-semibold mb-2">Bukti Pembayaran</span>
                            <p className="text-gray-500">Belum ada bukti pembayaran yang diunggah.</p>
                          </div>
                        )}
                        </div>
                      </div>
                    </div>

                    {/* Tombol aksi di bawah form */}
                    <div className="flex justify-end gap-3 px-6 py-4 border-t border-gray-100 bg-gray-50">
                      <Button
                        color="green"
                        className="flex items-center gap-2 px-6 py-2.5 bg-gradient-to-r from-green-600 to-green-400 text-white font-medium rounded-lg shadow-lg hover:shadow-xl transition-all duration-200"
                        onClick={async () => {
                          Swal.fire({
                            title: "Verifikasi Peserta?",
                            text: "Pastikan semua berkas sudah lengkap sebelum verifikasi.",
                            icon: "question",
                            showCancelButton: true,
                            confirmButtonText: "Verifikasi",
                            cancelButtonText: "Batal",
                            confirmButtonColor: "#22c55e",
                            cancelButtonColor: "#9333EA",
                          }).then(async (result) => {
                            if (result.isConfirmed) {
                              Swal.fire({
                                title: "Memverifikasi...",
                                allowOutsideClick: false,
                                didOpen: () => {
                                  Swal.showLoading();
                                },
                              });
                              try {
                                const res = await fetch(`${api.URL_API}/api/users/verifSuccess/${id}`, {
                                  method: "PUT",
                                  credentials: "include",
                                  headers: {
                                    "Content-Type": "application/json",
                                    Authorization: `Bearer ${localStorage.getItem("token")}`,
                                  },
                                });
                                if (!res.ok) throw new Error("Gagal verifikasi peserta");
                                await res.json();
                                Swal.fire({
                                  title: "Terverifikasi!",
                                  text: "Peserta telah berhasil diverifikasi.",
                                  icon: "success",
                                  confirmButtonColor: "#9333EA",
                                }).then(() => {
                                  window.location.reload();
                                });
                              } catch (error) {
                                Swal.fire({
                                  title: "Gagal",
                                  text: "Gagal memverifikasi peserta.",
                                  icon: "error",
                                  confirmButtonColor: "#9333EA",
                                });
                              }
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