import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import {
  Card,
  CardHeader,
  CardBody,
  Typography,
  Button,
  Input,
  Tabs,
  TabsHeader,
  Tab,
  Avatar,
} from "@material-tailwind/react";
import Sidenav from "../../widgets/layout/sidenav";
import routes from "../../routes";
import { FiUser, FiLock, FiShield, FiDatabase, FiUpload, FiSave, FiArrowLeft } from "react-icons/fi";
import { motion } from "framer-motion";
import { participantsData } from "../../data/participantsData";

export default function ParticipantDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    whatsapp: "",
    alamat: "",
    sekolah: "",
    nisn: "",
    kelas: "",
    jenjang: "",
    jenisLomba: "",
    profileImage: "",
  });
  const [errors, setErrors] = useState({});
  const [activeTab, setActiveTab] = useState("edit-profile");
  const [previewImage, setPreviewImage] = useState("");
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setIsLoading(true);
    setTimeout(() => {
      const data = participantsData.find((item) => item.id === parseInt(id));
      if (data) {
        // Combine firstName and lastName into a single name field if they exist
        const fullName = data.firstName && data.lastName 
          ? `${data.firstName} ${data.lastName}`
          : data.nama || data.name || "";

        setFormData({
          ...data,
          name: fullName,
          // Make sure all the fields from Daftar component are properly mapped
          whatsapp: data.whatsapp || "",
          alamat: data.alamat || "",
          sekolah: data.sekolah || "",
          nisn: data.nisn || "",
          kelas: data.kelas || "",
          jenjang: data.jenjang || "",
          jenisLomba: data.jenisLomba || "",
          profileImage: data.profileImage || "",
        });
        setPreviewImage(data.profileImage);
      }
      setIsLoading(false);
    }, 800);
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    
    // Clear error for this field when user types
    if (errors[name]) {
      setErrors({
        ...errors,
        [name]: false
      });
    }
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewImage(reader.result);
        setFormData({ ...formData, profileImage: reader.result });
      };
      reader.readAsDataURL(file);
    }
  };

  const validateForm = () => {
    const newErrors = {};
    const requiredFields = [
      "name", "email", "whatsapp", 
      "alamat", "sekolah", "nisn", "kelas"
    ];
    
    requiredFields.forEach(field => {
      if (!formData[field]) newErrors[field] = true;
    });
    
    // Email validation
    if (formData.email && !/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Email tidak valid";
    }
    
    // WhatsApp/phone validation - ensuring it's a number
    if (formData.whatsapp && !/^\d+$/.test(formData.whatsapp)) {
      newErrors.whatsapp = "Nomor WhatsApp harus berupa angka";
    } else if (formData.whatsapp && !/^[+]?[\d\s-]{10,15}$/.test(formData.whatsapp)) {
      newErrors.whatsapp = "Nomor telepon tidak valid";
    }
    
    // NISN validation - ensuring it's a number
    if (formData.nisn && !/^\d+$/.test(formData.nisn)) {
      newErrors.nisn = "NISN harus berupa angka";
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (validateForm()) {
      // Find participant by ID
      const index = participantsData.findIndex((item) => item.id === parseInt(id));
      if (index !== -1) {
        // Update participant data
        participantsData[index] = {
          ...participantsData[index],
          ...formData,
          nama: formData.name, // For compatibility with Daftar component
        };
      }

      // Show loading notification
      Swal.fire({
        title: "Sedang menyimpan...",
        allowOutsideClick: false,
        didOpen: () => {
          Swal.showLoading();
        },
      });

      // Simulate API call
      setTimeout(() => {
        Swal.fire({
          title: "Berhasil!",
          text: "Perubahan profil telah disimpan.",
          icon: "success",
          confirmButtonText: "Kembali ke Dashboard",
          confirmButtonColor: "#6366F1",
        }).then(() => {
          navigate("/admin/kti-admin"); // Back to KTI-Admin page
        });
      }, 1500);
    } else {
      // Show error notification
      Swal.fire({
        title: "Perhatian",
        text: "Harap periksa kembali form yang Anda isi.",
        icon: "warning",
        confirmButtonText: "Baik",
        confirmButtonColor: "#6366F1",
      });
    }
  };

  return (
    <div className="flex min-h-screen bg-gray-50">
      {/* Sidebar */}
      <Sidenav brandName="Admin Dashboard" routes={routes} />

      {/* Main Content */}
      <main className="flex-1 xl:ml-80 ml-64 p-6">
        {isLoading ? (
          <div className="flex justify-center items-center h-screen">
            <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-indigo-500"></div>
          </div>
        ) : (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="max-w-6xl mx-auto"
          >
            {/* Back Button */}
            <button
              onClick={() => navigate(-1)}
              className="mb-6 flex items-center text-indigo-600 hover:text-indigo-800 transition-colors duration-300"
            >
              <FiArrowLeft className="mr-2" /> Kembali ke Daftar Peserta
            </button>

            {/* Header */}
            <div className="mb-8">
              <Typography variant="h3" className="font-bold text-gray-800">
                Pengaturan
              </Typography>
              <Typography variant="paragraph" className="text-gray-600 mt-1">
                Kelola informasi profil peserta dan preferensi akun
              </Typography>
            </div>

            {/* Tabs */}
            <Card className="mb-8 shadow-md rounded-xl overflow-hidden">
              <CardHeader
                color="transparent"
                floated={false}
                shadow={false}
                className="m-0 p-0"
              >
                <Tabs value={activeTab} className="overflow-visible">
                  <TabsHeader
                    className="bg-gray-100 p-1"
                  >
                    <Tab
                      value="edit-profile"
                      onClick={() => setActiveTab("edit-profile")}
                      className={`flex items-center gap-2 px-6 py-3 ${
                        activeTab === "edit-profile"
                          ? "text-indigo-500"
                          : "text-gray-600"
                      }`}
                    >
                      <FiUser className={activeTab === "edit-profile" ? "text-indigo-500" : "text-gray-500"} />
                      Edit Profile
                    </Tab>
                    <Tab
                      value="preferences"
                      onClick={() => setActiveTab("preferences")}
                      className={`flex items-center gap-2 px-6 py-3 ${
                        activeTab === "preferences"
                          ? "text-indigo-500"
                          : "text-gray-600"
                      }`}
                    >
                      <FiDatabase className={activeTab === "preferences" ? "text-indigo-500" : "text-gray-500"} />
                      Preferences
                    </Tab>
                    <Tab
                      value="security"
                      onClick={() => setActiveTab("security")}
                      className={`flex items-center gap-2 px-6 py-3 ${
                        activeTab === "security"
                          ? "text-indigo-500"
                          : "text-gray-600"
                      }`}
                    >
                      <FiLock className={activeTab === "security" ? "text-indigo-500" : "text-gray-500"} />
                      Security
                    </Tab>
                    <Tab
                      value="data-privacy"
                      onClick={() => setActiveTab("data-privacy")}
                      className={`flex items-center gap-2 px-6 py-3 ${
                        activeTab === "data-privacy"
                          ? "text-indigo-500"
                          : "text-gray-600"
                      }`}
                    >
                      <FiShield className={activeTab === "data-privacy" ? "text-indigo-500" : "text-gray-500"} />
                      Data Privacy
                    </Tab>
                  </TabsHeader>
                </Tabs>
              </CardHeader>
            </Card>

            {activeTab === "edit-profile" && (
              <form onSubmit={handleSubmit}>
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                  {/* Profile Picture Card */}
                  <Card className="shadow-md rounded-xl overflow-hidden h-fit">
                    <CardBody>
                      <div className="flex flex-col items-center justify-center py-4">
                        <div className="relative group">
                          <Avatar
                            src={previewImage || "/img/default-avatar.png"}
                            alt="Profile"
                            variant="circular"
                            size="xxl"
                            className="mb-3 h-32 w-32 border-4 border-white shadow-lg"
                          />
                          <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                            <label className="cursor-pointer flex flex-col items-center justify-center text-white p-2">
                              <FiUpload className="text-2xl mb-1" />
                              <span className="text-xs">Ubah Foto</span>
                              <input
                                type="file"
                                accept="image/*"
                                className="hidden"
                                onChange={handleImageChange}
                              />
                            </label>
                          </div>
                        </div>

                        <Typography variant="h6" className="font-bold text-gray-800 mt-2">
                          {formData.name}
                        </Typography>
                        <Typography variant="small" className="text-gray-600">
                          {formData.email}
                        </Typography>
                        <Typography variant="small" className="text-gray-500 mt-1">
                          {formData.sekolah}
                        </Typography>

                        <div className="mt-6 w-full">
                          <Typography variant="small" className="font-semibold text-gray-700 mb-2">
                            Informasi Akademik
                          </Typography>
                          <div className="bg-gray-50 rounded-lg p-4">
                            <div className="flex justify-between py-1">
                              <span className="text-gray-600 text-sm">NISN</span>
                              <span className="text-gray-800 text-sm font-medium">{formData.nisn || "-"}</span>
                            </div>
                            <div className="flex justify-between py-1">
                              <span className="text-gray-600 text-sm">Kelas</span>
                              <span className="text-gray-800 text-sm font-medium">{formData.kelas || "-"}</span>
                            </div>
                            <div className="flex justify-between py-1">
                              <span className="text-gray-600 text-sm">Jenjang</span>
                              <span className="text-gray-800 text-sm font-medium">{formData.jenjang || "-"}</span>
                            </div>
                            <div className="flex justify-between py-1">
                              <span className="text-gray-600 text-sm">Jenis Lomba</span>
                              <span className="text-gray-800 text-sm font-medium">
                                {formData.jenisLomba === "kti" ? "Lomba KTI" : 
                                 formData.jenisLomba === "cbt" ? "Lomba CBT" : "-"}
                              </span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </CardBody>
                  </Card>

                  {/* Edit Form */}
                  <Card className="shadow-md rounded-xl overflow-hidden lg:col-span-2">
                    <CardBody className="p-6">
                      <Typography variant="h6" className="font-bold text-gray-800 mb-6">
                        Informasi Pribadi
                      </Typography>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-4">
                        {/* Full Name */}
                        <div className="md:col-span-2">
                          <Typography variant="small" className="font-medium text-gray-700 mb-1 block">
                            Nama Lengkap
                          </Typography>
                          <Input
                            type="text"
                            name="name"
                            value={formData.name || ""}
                            onChange={handleChange}
                            placeholder="Masukkan Nama Lengkap"
                            className={`rounded-lg ${errors.name ? "border-red-500" : ""}`}
                            containerProps={{ className: "min-w-full" }}
                            error={errors.name}
                            success={formData.name && !errors.name}
                          />
                          {errors.name && (
                            <p className="text-red-500 text-xs mt-1">Nama lengkap wajib diisi</p>
                          )}
                        </div>

                        {/* Email */}
                        <div>
                          <Typography variant="small" className="font-medium text-gray-700 mb-1 block">
                            Email Address
                          </Typography>
                          <Input
                            type="email"
                            name="email"
                            value={formData.email || ""}
                            onChange={handleChange}
                            placeholder="contoh@email.com"
                            className={`rounded-lg ${errors.email ? "border-red-500" : ""}`}
                            containerProps={{ className: "min-w-full" }}
                            error={errors.email}
                            success={formData.email && !errors.email}
                          />
                          {errors.email && (
                            <p className="text-red-500 text-xs mt-1">Email tidak valid</p>
                          )}
                        </div>

                        {/* WhatsApp Number */}
                        <div>
                          <Typography variant="small" className="font-medium text-gray-700 mb-1 block">
                            Nomor WhatsApp
                          </Typography>
                          <Input
                            type="text"
                            name="whatsapp"
                            value={formData.whatsapp || ""}
                            onChange={handleChange}
                            placeholder="+62 xxx xxxx xxxx"
                            className={`rounded-lg ${errors.whatsapp ? "border-red-500" : ""}`}
                            containerProps={{ className: "min-w-full" }}
                            error={errors.whatsapp}
                            success={formData.whatsapp && !errors.whatsapp}
                          />
                          {errors.whatsapp && (
                            <p className="text-red-500 text-xs mt-1">{errors.whatsapp}</p>
                          )}
                        </div>

                        {/* Sekolah */}
                        <div>
                          <Typography variant="small" className="font-medium text-gray-700 mb-1 block">
                            Asal Sekolah
                          </Typography>
                          <Input
                            type="text"
                            name="sekolah"
                            value={formData.sekolah || ""}
                            onChange={handleChange}
                            placeholder="Masukkan Asal Sekolah"
                            className={`rounded-lg ${errors.sekolah ? "border-red-500" : ""}`}
                            containerProps={{ className: "min-w-full" }}
                            error={errors.sekolah}
                            success={formData.sekolah && !errors.sekolah}
                          />
                          {errors.sekolah && (
                            <p className="text-red-500 text-xs mt-1">Asal sekolah wajib diisi</p>
                          )}
                        </div>

                        {/* NISN */}
                        <div>
                          <Typography variant="small" className="font-medium text-gray-700 mb-1 block">
                            NISN
                          </Typography>
                          <Input
                            type="text"
                            name="nisn"
                            value={formData.nisn || ""}
                            onChange={handleChange}
                            placeholder="Masukkan NISN"
                            className={`rounded-lg ${errors.nisn ? "border-red-500" : ""}`}
                            containerProps={{ className: "min-w-full" }}
                            error={errors.nisn}
                            success={formData.nisn && !errors.nisn}
                          />
                          {errors.nisn && (
                            <p className="text-red-500 text-xs mt-1">{errors.nisn}</p>
                          )}
                        </div>

                        {/* Kelas */}
                        <div>
                          <Typography variant="small" className="font-medium text-gray-700 mb-1 block">
                            Kelas
                          </Typography>
                          <Input
                            type="text"
                            name="kelas"
                            value={formData.kelas || ""}
                            onChange={handleChange}
                            placeholder="Masukkan Kelas"
                            className={`rounded-lg ${errors.kelas ? "border-red-500" : ""}`}
                            containerProps={{ className: "min-w-full" }}
                            error={errors.kelas}
                            success={formData.kelas && !errors.kelas}
                          />
                          {errors.kelas && (
                            <p className="text-red-500 text-xs mt-1">Kelas wajib diisi</p>
                          )}
                        </div>

                        {/* Jenjang */}
                        <div>
                          <Typography variant="small" className="font-medium text-gray-700 mb-1 block">
                            Jenjang
                          </Typography>
                          <select
                            name="jenjang"
                            value={formData.jenjang || ""}
                            onChange={handleChange}
                            className={`w-full px-3 py-2 border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 ${
                              errors.jenjang ? "border-red-500" : ""
                            }`}
                          >
                            <option value="">Pilih jenjang</option>
                            <option value="sd">SD</option>
                            <option value="smp">SMP</option>
                          </select>
                          {errors.jenjang && (
                            <p className="text-red-500 text-xs mt-1">Jenjang wajib diisi</p>
                          )}
                        </div>

                        {/* Jenis Lomba */}
                        <div>
                          <Typography variant="small" className="font-medium text-gray-700 mb-1 block">
                            Jenis Lomba
                          </Typography>
                          <div className="flex gap-2">
                            <button
                              type="button"
                              className={`px-3 py-1.5 rounded-md font-medium text-sm shadow-sm transition ${
                                formData.jenisLomba === "kti" ? "bg-indigo-600 text-white" : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                              }`}
                              onClick={() => setFormData({...formData, jenisLomba: "kti"})}
                            >
                              Lomba KTI
                            </button>
                            <button
                              type="button"
                              className={`px-3 py-1.5 rounded-md font-medium text-sm shadow-sm transition ${
                                formData.jenisLomba === "cbt" ? "bg-indigo-600 text-white" : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                              }`}
                              onClick={() => setFormData({...formData, jenisLomba: "cbt"})}
                            >
                              Lomba CBT
                            </button>
                          </div>
                          {errors.jenisLomba && (
                            <p className="text-red-500 text-xs mt-1">Jenis lomba wajib diisi</p>
                          )}
                        </div>

                        {/* Address */}
                        <div className="md:col-span-2">
                          <Typography variant="small" className="font-medium text-gray-700 mb-1 block">
                            Alamat Lengkap
                          </Typography>
                          <Input
                            type="text"
                            name="alamat"
                            value={formData.alamat || ""}
                            onChange={handleChange}
                            placeholder="Masukkan Alamat Lengkap"
                            className={`rounded-lg ${errors.alamat ? "border-red-500" : ""}`}
                            containerProps={{ className: "min-w-full" }}
                            error={errors.alamat}
                            success={formData.alamat && !errors.alamat}
                          />
                          {errors.alamat && (
                            <p className="text-red-500 text-xs mt-1">Alamat wajib diisi</p>
                          )}
                        </div>
                      </div>
                    </CardBody>
                  </Card>
                </div>

                {/* Save Button */}
                <div className="flex justify-end mt-6">
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    type="submit"
                    className="flex items-center justify-center gap-2 px-8 py-3 bg-gradient-to-r from-indigo-500 to-purple-600 text-white font-medium rounded-lg shadow-md hover:shadow-lg transition-all duration-300"
                  >
                    <FiSave /> Simpan Perubahan
                  </motion.button>
                </div>
              </form>
            )}

            {activeTab !== "edit-profile" && (
              <Card className="shadow-md rounded-xl overflow-hidden">
                <CardBody className="p-8">
                  <div className="flex flex-col items-center justify-center py-8">
                    <div className="bg-indigo-100 rounded-full p-4 mb-4">
                      {activeTab === "preferences" && <FiDatabase className="text-3xl text-indigo-500" />}
                      {activeTab === "security" && <FiLock className="text-3xl text-indigo-500" />}
                      {activeTab === "data-privacy" && <FiShield className="text-3xl text-indigo-500" />}
                    </div>
                    <Typography variant="h5" className="font-bold text-gray-800 mb-2">
                      {activeTab === "preferences" && "Preferences"}
                      {activeTab === "security" && "Security Settings"}
                      {activeTab === "data-privacy" && "Data Privacy"}
                    </Typography>
                    <Typography variant="paragraph" className="text-gray-600 text-center max-w-lg">
                      Fitur ini sedang dalam pengembangan dan akan segera tersedia. Silakan kembali ke tab Edit Profile untuk mengelola informasi profil peserta.
                    </Typography>
                  </div>
                </CardBody>
              </Card>
            )}
          </motion.div>
        )}
      </main>
    </div>
  );
} 