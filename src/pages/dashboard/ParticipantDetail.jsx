"use client";

import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import {
  Button,
  Dialog,
  DialogHeader,
  DialogBody,
} from "@material-tailwind/react";
import Sidenav from "../../widgets/layout/sidenav";
import routes from "../../routes";
import {
  FiUser,
  FiEdit2,
  FiCheck,
  FiFile,
  FiSave,
  FiDownload,
  FiUpload,
  FiClock,
  FiFileText,
  FiCheckCircle,
  FiImage,
  FiX,
  FiArrowLeft,
} from "react-icons/fi";
import { motion } from "framer-motion";
import api from "../../configs/api";

// ===================== API HANDLER =====================
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

async function deleteParticipant(id) {
  const res = await fetch(`${api.URL_API}/participants/${id}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  });
  if (!res.ok) throw new Error("Gagal menghapus peserta");
  return res.json();
}

// ===================== FORM INPUT COMPONENT =====================
const FormInput = ({
  label,
  name,
  type = "text",
  value,
  placeholder,
  error,
  autoFocus,
  nextField,
  autocomplete,
  onChange,
}) => {
  const handleKeyDown = (e, nextField) => {
    if (e.key === "Enter" && nextField) {
      e.preventDefault();
      document.getElementsByName(nextField)[0]?.focus();
    }
  };

  return (
    <div className="mb-4">
      <label htmlFor={name} className="text-sm font-medium text-gray-700 mb-1 block">
        {label}
      </label>
      <input
        id={name}
        type={type}
        name={name}
        value={value || ""}
        onChange={onChange}
        placeholder={placeholder}
        className={`w-full px-4 py-3 border ${
          error ? "border-red-500" : "border-gray-300"
        } rounded-lg text-gray-800 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition-all`}
        autoFocus={autoFocus}
        onKeyDown={(e) => handleKeyDown(e, nextField)}
        autoComplete={autocomplete}
      />
      {error && <p className="text-red-500 text-xs mt-1">{error}</p>}
    </div>
  );
};

// ===================== MAIN COMPONENT =====================
export default function ParticipantDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({});
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const [activeSection, setActiveSection] = useState("participant");
  const [fileUploads, setFileUploads] = useState([]);
  const [invoice, setInvoice] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [previewImage, setPreviewImage] = useState(null);
  const [openImageDialog, setOpenImageDialog] = useState(false);

  // ===================== FORM HANDLER =====================


  // ===================== FETCH DATA =====================
  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        const data = await getParticipantById(id);
        let invoiceData = null;
        let invoiceRes = await fetch(`${api.URL_API}/api/invoices/${id}`, {
          headers: {
            "Authorization": `Bearer ${localStorage.getItem("token")}`,
          },
        });
        if (invoiceRes.ok) {
          const invoiceArr = await invoiceRes.json();
          invoiceData = invoiceArr && invoiceArr.length > 0 ? invoiceArr[0] : null;
          setInvoice(invoiceData);
        } else {
          setInvoice(null);
        }

        // Fetch karya peserta
        let karyaData = null;
        try {
          const karyaRes = await fetch(`${api.URL_API}/api/karya/${id}`, {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          });
          if (karyaRes.ok) {
            karyaData = await karyaRes.json();
          }
        } catch (e) {
          karyaData = null;
        }

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

        // Set fileUploads sesuai response
        const uploads = [];
        if (data.link_twibbon) {
          uploads.push({
            id: "twibbon",
            name: "Bukti Upload Twibbon",
            url: `${api.URL_API}/gis-backend-v2/storage/app/public/${data.link_twibbon}`,
            status: "completed",
            type: "image",
          });
        }
        if (invoiceData && invoiceData.upload_bukti) {
          uploads.push({
            id: "bukti_pembayaran",
            name: "Bukti Pembayaran",
            url: `${api.URL_API}/gis-backend-v2/storage/app/public/${invoiceData.upload_bukti}`,
            status: "completed",
            type: "image",
          });
        }
        // Tambahkan karya jika ada
        if (karyaData && karyaData.link_karya) {
          uploads.push({
            id: "karya",
            name: "File Karya/Jurnal",
            url: `${api.URL_API}/gis-backend-v2/storage/app/public/${karyaData.link_karya}`,
            status: "completed",
            type: "file",
          });
        }
        setFileUploads(uploads);

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
      setIsSubmitting(true);
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
          navigate("/admin/swc-admin");
        });
      } catch (error) {
        Swal.fire({
          title: "Gagal",
          text: "Gagal menyimpan perubahan.",
          icon: "error",
          confirmButtonColor: "#9333EA",
        });
      } finally {
        setIsSubmitting(false);
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

  // ===================== DELETE HANDLER =====================
  const handleDeleteParticipant = async () => {
    Swal.fire({
      title: "Hapus Peserta?",
      text: "Data peserta akan dihapus secara permanen. Tindakan ini tidak dapat dibatalkan.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Ya, Hapus",
      cancelButtonText: "Batal",
      confirmButtonColor: "#f43f5e",
      cancelButtonColor: "#9333EA",
    }).then(async (result) => {
      if (result.isConfirmed) {
        Swal.fire({
          title: "Sedang menghapus...",
          allowOutsideClick: false,
          didOpen: () => {
            Swal.showLoading();
          },
        });

        try {
          await deleteParticipant(id);
          Swal.fire({
            title: "Berhasil Dihapus!",
            text: "Data peserta telah dihapus dari sistem.",
            icon: "success",
            confirmButtonText: "Kembali ke Dashboard",
            confirmButtonColor: "#9333EA",
          }).then(() => {
            navigate("/admin/swc-admin");
          });
        } catch (error) {
          Swal.fire({
            title: "Gagal",
            text: "Gagal menghapus peserta.",
            icon: "error",
            confirmButtonColor: "#9333EA",
          });
        }
      }
    });
  };

  // ===================== FILE UPLOAD HANDLER (SIMULASI) =====================
  const handleFileUpload = (fileId) => {
    // Simulasi upload file
    const updatedFiles = fileUploads.map((file) => {
      if (file.id === fileId && file.status !== "completed") {
        return { ...file, status: "progress", progress: 1 };
      }
      return file;
    });
    setFileUploads(updatedFiles);

    // Simulasi progress
    const fileToUpdate = updatedFiles.find((file) => file.id === fileId);
    if (fileToUpdate && fileToUpdate.status === "progress") {
      const interval = setInterval(() => {
        setFileUploads((prevFiles) => {
          const newFiles = prevFiles.map((file) => {
            if (file.id === fileId) {
              const newProgress = (file.progress || 0) + 5;
              if (newProgress >= 100) {
                clearInterval(interval);
                return {
                  ...file,
                  progress: 100,
                  status: "completed",
                  link: "#",
                  url: file.name.includes("Twibbon")
                    ? "https://via.placeholder.com/500x300/6D28D9/FFFFFF?text=Bukti+Upload+Twibbon"
                    : "https://via.placeholder.com/500x300/EC4899/FFFFFF?text=Bukti+Transaksi",
                };
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

  // ===================== IMAGE PREVIEW =====================
  const handlePreviewImage = (imageUrl) => {
    setPreviewImage(imageUrl);
    setOpenImageDialog(true);
  };

  // ===================== SECTION BUTTON =====================
  const SectionButton = ({ icon, title, active, onClick }) => (
    <button
      onClick={onClick}
      className={`flex items-center w-full px-4 py-3 rounded-lg transition-all ${
        active
          ? "bg-gradient-to-r from-purple-600 to-pink-500 text-white shadow-md"
          : "bg-white text-gray-700 hover:bg-purple-50"
      }`}
    >
      <div className={`p-2 mr-3 rounded-full ${active ? "bg-white bg-opacity-20" : "bg-purple-100"}`}>{icon}</div>
      <span className="font-medium">{title}</span>
      {active && <FiCheck className="ml-auto" />}
    </button>
  );

  // ===================== FILE UPLOAD CARD =====================
  const FileUploadCard = ({ file, onUpload }) => {
    const isNoPreview =
      file.name.toLowerCase().includes("twibbon") ||
      file.name.toLowerCase().includes("transaksi");

    return (
      <div className="bg-white border border-gray-200 rounded-lg p-4 mb-3 hover:border-purple-300 transition-all">
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center">
            <div
              className={`p-2 rounded-full ${
                file.status === "completed"
                  ? "bg-green-100"
                  : file.status === "progress"
                  ? "bg-blue-100"
                  : "bg-gray-100"
              }`}
            >
              {file.status === "completed" ? (
                <FiCheckCircle className="text-green-500" />
              ) : file.status === "progress" ? (
                <FiClock className="text-blue-500" />
              ) : file.type && file.type.includes("image") ? (
                <FiImage className="text-gray-500" />
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
          <div className="flex space-x-2">
            {file.status === "completed" ? (
              <a
                href={file.link || file.url || "#"}
                className="p-2 bg-purple-50 hover:bg-purple-100 text-purple-600 rounded-full transition-colors"
                download
                target="_blank"
                rel="noopener noreferrer"
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
        </div>
        {file.status === "progress" && (
          <div className="w-full bg-gray-200 rounded-full h-1.5 mt-2">
            <div
              className="bg-gradient-to-r from-purple-600 to-pink-500 h-1.5 rounded-full transition-all duration-300"
              style={{ width: `${file.progress}%` }}
            ></div>
          </div>
        )}
        {file.status === "completed" && file.type && file.type.includes("image") && (
          <div
            className="mt-3 rounded-lg overflow-hidden border border-gray-200 hover:border-purple-300 transition-all"
            {...(!isNoPreview && {
              onClick: () => handlePreviewImage(file.url),
              style: { cursor: "pointer" },
            })}
          >
            <img
              src={file.url}
              alt={file.name}
              className="w-full max-h-96 object-contain bg-gray-50"
              style={isNoPreview ? { cursor: "default" } : { cursor: "pointer" }}
            />
          </div>
        )}
      </div>
    );
  };

  // ===================== TOOLTIP =====================
  const Tooltip = ({ children, text }) => (
    <div className="relative group">
      {children}
      <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-3 py-1 bg-gray-800 text-white text-xs rounded opacity-0 group-hover:opacity-100 transition-opacity duration-200 whitespace-nowrap pointer-events-none">
        {text}
      </div>
    </div>
  );

  // ===================== SHORTCUT SAVE =====================
  useEffect(() => {
    const handleKeyboardShortcut = (e) => {
      if ((e.ctrlKey || e.metaKey) && e.key === "s") {
        e.preventDefault();
        document.querySelector("form")?.dispatchEvent(new Event("submit", { cancelable: true, bubbles: true }));
      }
    };
    window.addEventListener("keydown", handleKeyboardShortcut);
    return () => {
      window.removeEventListener("keydown", handleKeyboardShortcut);
    };
  }, []);

  // ===================== RENDER =====================
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
                  {/* Tombol Back */}
                  <div className="px-6 pt-6 pb-2">
                    <button
                      type="button"
                      onClick={() => navigate(-1)}
                      className="flex items-center gap-2 text-purple-600 hover:text-purple-800 font-medium transition-colors"
                    >
                      <FiArrowLeft className="h-5 w-5" />
                      Kembali
                    </button>
                  </div>
                  <form onSubmit={handleSubmit}>
                    {/* Data Peserta */}
                    <div className={activeSection === "participant" ? "block" : "hidden"}>
                      <div className="border-b border-gray-100">
                        <div className="px-6 py-4 bg-gradient-to-r from-purple-600 to-pink-500">
                          <h2 className="text-xl font-bold text-white flex items-center">
                            <FiUser className="mr-2" /> Detail Data Peserta
                          </h2>
                        </div>
                      </div>
                      <div className="p-6">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                          <FormInput
                            label="Nama Lengkap"
                            name="name"
                            value={formData.name}
                            placeholder="Masukkan nama lengkap peserta"
                            error={errors.name}
                            autoFocus
                            nextField="email"
                            autocomplete="name"
                            onChange={(e) => handleChange(e.target.name, e.target.value)}
                          />
                          <FormInput
                            label="Email"
                            name="email"
                            type="email"
                            value={formData.email}
                            placeholder="contoh@email.com"
                            error={errors.email}
                            nextField="whatsapp"
                            autocomplete="email"
                            onChange={(e) => handleChange(e.target.name, e.target.value)}
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
                            nextField="sekolah"
                            autocomplete="street-address"
                            onChange={(e) => handleChange(e.target.name, e.target.value)}
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
                            nextField="kelas"
                            onChange={(e) => handleChange(e.target.name, e.target.value)}
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
                            nextField="jenjang"
                            onChange={(e) => handleChange(e.target.name, e.target.value)}
                          />
                          <div>
                            <label htmlFor="jenjang" className="text-sm font-medium text-gray-700 mb-1 block">
                              Jenjang Pendidikan
                            </label>
                            <select
                              id="jenjang"
                              name="jenjang"
                              value={formData.jenjang || ""}
                              onChange={(e) => handleChange("jenjang", e.target.value)}
                              className={`w-full px-4 py-3 border rounded-lg text-gray-800 ${
                                errors.jenjang ? "border-red-500" : "border-gray-300"
                              } focus:outline-none focus:ring-2 focus:ring-purple-500 transition-all`}
                            >
                              <option value="">Pilih jenjang</option>
                              <option value="sd">SD</option>
                              <option value="smp">SMP</option>
                              <option value="sma">SMA/SMK</option>
                            </select>
                            {errors.jenjang && <p className="text-red-500 text-xs mt-1">{errors.jenjang}</p>}
                          </div>
                          <div className="md:col-span-2">
                            <label htmlFor="jenisLomba" className="text-sm font-medium text-gray-700 mb-1 block">
                              Jenis Lomba
                            </label>
                            <select
                              id="jenisLomba"
                              name="jenisLomba"
                              value={formData.jenisLomba || ""}
                              onChange={(e) => handleChange("jenisLomba", e.target.value)}
                              className={`w-full px-4 py-3 border rounded-lg text-gray-800 ${
                                errors.jenisLomba ? "border-red-500" : "border-gray-300"
                              } focus:outline-none focus:ring-2 focus:ring-purple-500 transition-all`}
                              onKeyDown={(e) => {
                                if (e.key === "Enter") {
                                  e.preventDefault();
                                  document.querySelector('button[type="submit"]')?.focus();
                                }
                              }}
                            >
                              <option value="">Pilih jenis lomba</option>
                              <option value="KTI">Karya Tulis Ilmiah (KTI)</option>
                              <option value="CBT">Computer Based Test (CBT)</option>
                            </select>
                            {errors.jenisLomba && <p className="text-red-500 text-xs mt-1">{errors.jenisLomba}</p>}
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
                    <div className={activeSection === "documents" ? "block" : "hidden"}>
                      <div className="border-b border-gray-100">
                        <div className="px-6 py-4 bg-gradient-to-r from-purple-600 to-pink-500">
                          <h2 className="text-xl font-bold text-white flex items-center">
                            <FiFileText className="mr-2" /> Dokumen & Berkas
                          </h2>
                        </div>
                      </div>
                      <div className="p-6">
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                          {fileUploads.length > 0 ? (
                            fileUploads.map((file) => (
                              <FileUploadCard key={file.id} file={file} onUpload={handleFileUpload} />
                            ))
                          ) : (
                            <div className="col-span-2 text-center text-gray-400">
                              Belum ada dokumen yang diunggah.
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                    {/* Tombol aksi di bawah form */}
                    <div className="flex justify-end gap-3 px-6 py-4 border-t border-gray-100 bg-gray-50">
                      <Tooltip text="Verifikasi status peserta">
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
                                try {
                                  await fetch(`${api.URL_API}/api/users/verifSuccess/${id}`, {
                                    method: "PUT",
                                    headers: {
                                      "Content-Type": "application/json",
                                      Authorization: `Bearer ${localStorage.getItem("token")}`,
                                    },
                                  });
                                  Swal.fire({
                                    title: "Terverifikasi!",
                                    text: "Peserta telah berhasil diverifikasi.",
                                    icon: "success",
                                    showConfirmButton: false,
                                    timer: 1500,
                                  }).then(() => {
                                    navigate("/admin/swc-admin");
                                  });
                                } catch (error) {
                                  Swal.fire({
                                    title: "Gagal",
                                    text: "Gagal melakukan verifikasi.",
                                    icon: "error",
                                    confirmButtonColor: "#9333EA",
                                  });
                                }
                              }
                            });
                          }}
                        >
                          <FiCheckCircle className="h-4 w-4" /> Verifikasi
                        </Button>
                      </Tooltip>
                      <Tooltip text="Hapus data peserta">
                        <Button
                          color="red"
                          className="flex items-center gap-2 px-6 py-2.5 bg-gradient-to-r from-red-600 to-red-400 text-white font-medium rounded-lg shadow-lg hover:shadow-xl transition-all duration-200"
                          onClick={handleDeleteParticipant}
                        >
                          <FiX className="h-4 w-4" /> Hapus
                        </Button>
                      </Tooltip>
                      <Tooltip text="Simpan perubahan (Ctrl+S)">
                        <Button
                          type="submit"
                          color="purple"
                          className="flex items-center gap-2 px-6 py-2.5 bg-gradient-to-r from-purple-600 to-pink-500 text-white font-medium rounded-lg shadow-lg hover:shadow-xl transition-all duration-200"
                          disabled={isSubmitting}
                        >
                          <FiSave className="h-4 w-4" /> Simpan
                        </Button>
                      </Tooltip>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </div>
      {/* Image Preview Dialog */}
      <Dialog
        open={openImageDialog}
        handler={() => setOpenImageDialog(false)}
        size="lg"
        className="bg-transparent shadow-none"
      >
        <DialogHeader className="bg-white rounded-t-lg">
          <div className="flex items-center justify-between w-full">
            <h3 className="text-lg font-medium text-gray-900">Preview Berkas</h3>
            <button
              onClick={() => setOpenImageDialog(false)}
              className="text-gray-500 hover:text-gray-700 focus:outline-none"
            >
              <FiX size={24} />
            </button>
          </div>
        </DialogHeader>
        <DialogBody className="bg-white rounded-b-lg">
          {previewImage && (
            <div className="flex justify-center">
              <img src={previewImage} alt="Preview" className="max-h-[70vh] rounded-lg" />
            </div>
          )}
        </DialogBody>
      </Dialog>
    </div>
  );
}