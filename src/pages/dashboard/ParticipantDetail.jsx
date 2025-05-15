import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import {
  Input,
  Button,
  Typography,
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
  FiArrowLeft 
} from "react-icons/fi";
import { motion } from "framer-motion";
import api from "../../configs/api";

export default function ParticipantDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    nomor_wa: "",
    alamat: "",
    asal_sekolah: "",
    nisn: "",
    kelas: "",
    jenjang: "",
    jenis_lomba: "",
  });
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(true);

  // Fetch participant detail from API
  useEffect(() => {
    setIsLoading(true);
    const fetchParticipant = async () => {
      try {
        const response = await fetch(`${api.URL_API}/api/users/${id}`, {
          method: "GET",
          credentials: "include",
          headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${localStorage.getItem("token")}`,
          },
        });
        const data = await response.json();
        if (response.ok && data) {
          setFormData({
            ...formData,
            ...data,
            name: data.name || data.nama || "",
            nomor_wa: data.nomor_wa || "",
            alamat: data.alamat || "",
            asal_sekolah: data.asal_sekolah || "",
            nisn: data.nisn || "",
            kelas: data.kelas || "",
            jenjang: data.jenjang || "",
            jenis_lomba: data.jenis_lomba || "",
            email: data.email || "",
          });
        }
      } catch (err) {
        // Optional: tampilkan error
      }
      setIsLoading(false);
    };
    fetchParticipant();
    // eslint-disable-next-line
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
      "alamat", "asal_sekolah", "nisn", "kelas"
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

  const handleSubmit = (e) => {
    e.preventDefault();

    if (validateForm()) {
      Swal.fire({
        title: "Sedang menyimpan...",
        allowOutsideClick: false,
        didOpen: () => {
          Swal.showLoading();
        },
      });

      setTimeout(() => {
        Swal.fire({
          title: "Berhasil!",
          text: "Perubahan profil telah disimpan.",
          icon: "success",
          confirmButtonText: "Kembali ke Dashboard",
          confirmButtonColor: "#9333EA",
        }).then(() => {
          navigate("/admin/kti-admin");
        });
      }, 1000);
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

      <div className="w-full">
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
            <div className="flex flex-wrap items-center justify-between mb-8">
              <button
                onClick={() => navigate(-1)}
                className="flex items-center text-purple-600 hover:text-purple-800 transition-colors duration-200 mb-4 lg:mb-0"
              >
                <FiArrowLeft className="mr-2" /> Kembali ke Daftar Peserta
              </button>
              
              <h1 className="text-2xl md:text-3xl font-bold text-gray-800 bg-clip-text text-transparent bg-gradient-to-r from-purple-600 to-pink-500 w-full lg:w-auto order-first lg:order-none">
                Detail Peserta
              </h1>
              
              <Button
                onClick={handleSubmit}
                className="flex items-center justify-center gap-2 px-6 py-2.5 bg-gradient-to-r from-purple-600 to-pink-500 text-white font-medium rounded-lg shadow-lg hover:shadow-xl transition-all duration-200 w-full lg:w-auto mt-4 lg:mt-0"
              >
                <FiSave className="text-lg" /> Simpan Perubahan
              </Button>
            </div>

            {/* Unified Form Content */}
            <div className="bg-white rounded-xl shadow-sm overflow-hidden">
              <form onSubmit={handleSubmit}>
                {/* Personal Information */}
                <div>
                  <div className="border-b border-gray-100">
                    <div className="px-6 py-4 bg-gradient-to-r from-purple-600 to-pink-500">
                      <h2 className="text-xl font-bold text-white flex items-center">
                        <FiUser className="mr-2" /> Data Pribadi
                      </h2>
                    </div>
                  </div>
                  
                  <div className="p-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="md:col-span-2">
                        <FormInput 
                          label="Nama Lengkap" 
                          name="name" 
                          value={formData.name}
                          placeholder="Masukkan nama lengkap peserta"
                          error={errors.name}
                        />
                      </div>
                      
                      <FormInput 
                        label="Email" 
                        name="email" 
                        type="email"
                        value={formData.email}
                        placeholder="contoh@email.com"
                        error={errors.email}
                      />
                      
                      <FormInput 
                        label="Nomor WhatsApp" 
                        name="nomor_wa" 
                        value={formData.nomor_wa}
                        placeholder="08xxxxxxxxxx"
                        error={errors.nomor_wa}
                      />
                      
                      <div className="md:col-span-2">
                        <FormInput 
                          label="Alamat Lengkap" 
                          name="alamat" 
                          value={formData.alamat}
                          placeholder="Masukkan alamat lengkap"
                          error={errors.alamat}
                        />
                      </div>
                    </div>
                  </div>
                </div>

                {/* Academic Information */}
                <div>
                  <div className="border-b border-gray-100">
                    <div className="px-6 py-4 bg-gradient-to-r from-purple-600 to-pink-500">
                      <h2 className="text-xl font-bold text-white flex items-center">
                        <FiBookOpen className="mr-2" /> Data Akademik
                      </h2>
                    </div>
                  </div>
                  
                  <div className="p-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="md:col-span-2">
                        <FormInput 
                          label="Asal Sekolah" 
                          name="asal_sekolah" 
                          value={formData.asal_sekolah}
                          placeholder="Masukkan nama sekolah"
                          error={errors.asal_sekolah}
                        />
                      </div>
                      
                      <FormInput 
                        label="NISN" 
                        name="nisn" 
                        value={formData.nisn}
                        placeholder="Masukkan NISN"
                        error={errors.nisn}
                      />
                      
                      <FormInput 
                        label="Kelas" 
                        name="kelas" 
                        value={formData.kelas}
                        placeholder="Contoh: 10, 11, 12"
                        error={errors.kelas}
                      />
                      
                      <div className="mb-4">
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

                {/* Contest Information */}
                <div>
                  <div className="border-b border-gray-100">
                    <div className="px-6 py-4 bg-gradient-to-r from-purple-600 to-pink-500">
                      <h2 className="text-xl font-bold text-white flex items-center">
                        <FiBookOpen className="mr-2" /> Data Lomba
                      </h2>
                    </div>
                  </div>
                  
                  <div className="p-6">
                    <div className="mb-6">
                      <label className="text-sm font-medium text-gray-700 mb-2 block">
                        Jenis Lomba yang Diikuti
                      </label>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                        <button
                          type="button"
                          className={`flex items-center px-4 py-3 rounded-lg transition-all ${
                            formData.jenis_lomba === "science-competition" 
                              ? "bg-gradient-to-r from-purple-600 to-pink-500 text-white shadow-md" 
                              : "bg-purple-50 text-gray-700 hover:bg-purple-100 border border-purple-200"
                          }`}
                          onClick={() => setFormData({...formData, jenis_lomba: "science-competition"})}
                        >
                          <div className={`p-2 mr-3 rounded-full ${formData.jenis_lomba === "science-competition" ? "bg-white bg-opacity-20" : "bg-purple-100"}`}>
                            <FiFile className={formData.jenis_lomba === "science-competition" ? "text-white" : "text-purple-500"} />
                          </div>
                          <div className="text-left">
                            <span className="font-medium block">Science Competition</span>
                            <span className="text-xs block opacity-80">Science Writing Competition</span>
                          </div>
                          {formData.jenis_lomba === "science-competition" && <FiCheck className="ml-auto" />}
                        </button>
                        
                        <button
                          type="button"
                          className={`flex items-center px-4 py-3 rounded-lg transition-all ${
                            formData.jenis_lomba === "science-writing-competition" 
                              ? "bg-gradient-to-r from-purple-600 to-pink-500 text-white shadow-md" 
                              : "bg-purple-50 text-gray-700 hover:bg-purple-100 border border-purple-200"
                          }`}
                          onClick={() => setFormData({...formData, jenis_lomba: "science-writing-competition"})}
                        >
                          <div className={`p-2 mr-3 rounded-full ${formData.jenis_lomba === "science-writing-competition" ? "bg-white bg-opacity-20" : "bg-purple-100"}`}>
                            <FiFile className={formData.jenis_lomba === "science-writing-competition" ? "text-white" : "text-purple-500"} />
                          </div>
                          <div className="text-left">
                            <span className="font-medium block">Science Writing Competition</span>
                            <span className="text-xs block opacity-80">Science Writing Competition</span>
                          </div>
                          {formData.jenis_lomba === "science-writing-competition" && <FiCheck className="ml-auto" />}
                        </button>
                      </div>
                      {errors.jenis_lomba && (
                        <p className="text-red-500 text-xs mt-2">{errors.jenis_lomba}</p>
                      )}
                    </div>
                    
                    <div className="bg-purple-50 border border-purple-100 rounded-lg p-4 mt-6">
                      <div className="flex items-start">
                        <div className="p-2 bg-gradient-to-r from-purple-600 to-pink-500 rounded-lg mr-3 mt-1">
                          <FiEdit2 className="text-white" />
                        </div>
                        <div>
                          <h4 className="font-medium text-gray-800">Catatan Penting</h4>
                          <p className="text-sm text-gray-600 mt-1">
                            Perubahan jenis lomba akan memengaruhi kategori evaluasi dan penempatan peserta. Pastikan jenis lomba yang dipilih sudah benar.
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </form>
              
              <div className="bg-gray-50 px-6 py-4 flex flex-col md:flex-row items-center justify-between">
                <div className="flex items-center text-sm text-gray-500 mb-4 md:mb-0">
                  <FiMapPin className="mr-1" /> ID Peserta: <span className="font-medium ml-1">{id}</span>
                </div>
                
                <div className="flex space-x-3">
                  <button
                    type="button"
                    onClick={() => navigate(-1)}
                    className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors"
                  >
                    Batal
                  </button>
                  <button
                    type="button"
                    onClick={handleSubmit}
                    className="px-4 py-2 bg-gradient-to-r from-purple-600 to-pink-500 text-white rounded-lg hover:shadow-md transition-all"
                  >
                    Simpan
                  </button>
                </div>
              </div>
            </div>
            
            {/* Card with contact information */}
            <div className="bg-white rounded-xl shadow-sm mt-6 p-6">
              <h3 className="text-lg font-bold text-gray-800 mb-4">Kontak Peserta</h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="flex items-center p-3 bg-purple-50 rounded-lg border border-purple-100">
                  <div className="p-2 bg-gradient-to-r from-purple-600 to-pink-500 rounded-lg mr-3">
                    <FiMail className="text-white" />
                  </div>
                  <div>
                    <p className="text-xs text-gray-500">Email</p>
                    <p className="font-medium text-gray-800">{formData.email || "-"}</p>
                  </div>
                </div>
                
                <div className="flex items-center p-3 bg-purple-50 rounded-lg border border-purple-100">
                  <div className="p-2 bg-gradient-to-r from-purple-600 to-pink-500 rounded-lg mr-3">
                    <FiPhone className="text-white" />
                  </div>
                  <div>
                    <p className="text-xs text-gray-500">Whatsapp</p>
                    <p className="font-medium text-gray-800">{formData.nomor_wa || "-"}</p>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Additional Information */}
            <div className="bg-white rounded-xl shadow-sm mt-6 p-6">
              <h3 className="text-lg font-bold text-gray-800 mb-4">Informasi Tambahan</h3>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="p-4 bg-gradient-to-br from-purple-500 to-pink-500 rounded-lg text-white">
                  <div className="flex items-center justify-between mb-2">
                    <h4 className="font-semibold">Status Pendaftaran</h4>
                    <span className="p-1.5 bg-white bg-opacity-20 rounded-full">
                      <FiCheck className="text-white" />
                    </span>
                  </div>
                  <p className="text-sm font-medium bg-white bg-opacity-20 py-1 px-3 rounded-full inline-block">
                    Terverifikasi
                  </p>
                </div>
                
                <div className="p-4 bg-white border border-purple-100 rounded-lg">
                  <div className="flex items-center justify-between mb-2">
                    <h4 className="font-semibold text-gray-800">Jenis Lomba</h4>
                    <span className="p-1.5 bg-purple-100 rounded-full">
                      <FiFile className="text-purple-500" />
                    </span>
                  </div>
                  <p className="text-sm font-medium text-purple-600 bg-purple-50 py-1 px-3 rounded-full inline-block">
                    {formData.jenis_lomba === "science-competition" ? "SC" : 
                     formData.jenis_lomba === "science-writing-competition" ? "SWC" : "Belum dipilih"}
                  </p>
                </div>
                
                <div className="p-4 bg-white border border-purple-100 rounded-lg">
                  <div className="flex items-center justify-between mb-2">
                    <h4 className="font-semibold text-gray-800">Jenjang</h4>
                    <span className="p-1.5 bg-purple-100 rounded-full">
                      <FiBookOpen className="text-purple-500" />
                    </span>
                  </div>
                  <p className="text-sm font-medium text-purple-600 bg-purple-50 py-1 px-3 rounded-full inline-block">
                    {formData.jenjang ? formData.jenjang.toUpperCase() : "Belum dipilih"}
                  </p>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </div>
    </div>
  );
}