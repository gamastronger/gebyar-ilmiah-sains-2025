"use client";
import { useState } from "react";
import { Link } from "react-router-dom";
import illustrationImg from "../../assets/imgdaftar.jpg"; // Gambar bisa disesuaikan
import { motion } from "framer-motion";
import Navbar from "../../Component/Navbar";
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import api from "@/configs/api";
import { MdVisibility, MdVisibilityOff } from "react-icons/md";

// Input Component
const Input = ({
  label,
  type = "text",
  name,
  value,
  onChange,
  error,
  showPassword,
  toggleShowPassword,
}) => (
  <div className="relative">
    <label className="block font-medium text-gray-700 mb-2">{label}</label>
    <input
      type={type === "password" && showPassword ? "text" : type}
      name={name}
      placeholder={label}
      value={value}
      onChange={onChange}
      className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-purple-600 text-sm ${
        error ? "border-red-500" : "border-gray-300"
      }`}
      autoComplete={type === "password" ? "new-password" : undefined}
    />
    {type === "password" && (
      <span
        className="absolute right-3 top-10 cursor-pointer text-xl text-gray-500"
        onClick={toggleShowPassword}
        tabIndex={0}
        role="button"
        aria-label={showPassword ? "Sembunyikan password" : "Tampilkan password"}
      >
        {showPassword ? <MdVisibilityOff /> : <MdVisibility />}
      </span>
    )}
    {error && <p className="text-red-500 text-xs mt-1">{error}</p>}
  </div>
);

const Daftar = () => {
  const [jenisLomba, setJenisLomba] = useState("");
  const [formData, setFormData] = useState({
    nama: "",
    email: "",
    jenjang: "",
    password: "",
    konfirmasi: "",
  });
  const [errors, setErrors] = useState({});
  const [showPassword, setShowPassword] = useState(false);
  const [showKonfirmasi, setShowKonfirmasi] = useState(false);

  const fadeIn = {
    initial: { opacity: 0, y: 30, filter: "blur(8px)" },
    animate: {
      opacity: 1,
      y: 0,
      filter: "blur(0px)",
      transition: { duration: 0.7, ease: "easeOut" },
    },
    exit: { opacity: 0, y: 30, filter: "blur(8px)", transition: { duration: 0.5 } },
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value,
    }));
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: "",
      }));
    }
  };

  const handleLombaChange = (type) => {
    setJenisLomba(type);
    setFormData(prev => ({
      ...prev,
      jenjang: ""
    }));
    if (errors.jenisLomba) {
      setErrors(prev => ({
        ...prev,
        jenisLomba: "",
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newErrors = {};

    ["nama", "email", "password", "konfirmasi"].forEach((key) => {
      if (!formData[key]) {
        newErrors[key] = `${key.charAt(0).toUpperCase() + key.slice(1)} harus diisi`;
      }
    });

    if (formData.email && !/^\S+@\S+\.\S+$/.test(formData.email)) {
      newErrors.email = "Format email tidak valid";
    }

    if (!jenisLomba) {
      newErrors.jenisLomba = "Pilih jenis lomba";
    }

    if (!formData.jenjang) {
      newErrors.jenjang = "Pilih jenjang";
    }

    if (formData.password !== formData.konfirmasi) {
      newErrors.konfirmasi = "Konfirmasi password tidak cocok";
    }

    setErrors(newErrors);

    if (Object.keys(newErrors).length === 0) {
      try {
        const response = await fetch(`${api.URL_API}/api/register`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          credentials: 'include',
          body: JSON.stringify({
            name: formData.nama,
            email: formData.email,
            jenjang: formData.jenjang,
            password: formData.password,
            jenis_lomba: jenisLomba,
          }),
        });

        if (response.ok) {
          toast.success('Pendaftaran berhasil! Anda akan diarahkan ke login.', {
            position: "top-center",
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "colored",
          });

          setTimeout(() => {
            window.location.href = "/auth/masuk";
          }, 5000);
        } else {
          const errorData = await response.json();
          toast.error(errorData.message || 'Terjadi kesalahan. Silakan coba lagi.', {
            position: "top-center",
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "colored",
          });
        }
      } catch (error) {
        toast.error('Terjadi kesalahan. Silakan coba lagi.', {
          position: "top-center",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "colored",
        });
      }
    } else {
      toast.error('Mohon periksa kembali form pendaftaran Anda.', {
        position: "top-center",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
      });
    }
  };

  return (
    <div className="min-h-screen bg-[#210034] flex flex-col">
      <ToastContainer 
        position="top-center"
        autoClose={3000}
        limit={1}
        hideProgressBar={false}
        newestOnTop
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="colored"
      />
      
      <div className="bg-[#210034] text-white py-4 shadow-md fixed w-full z-50">
        <Navbar darkMode={true} />
      </div>

      <motion.div
        className="flex-grow flex items-center justify-center px-4 py-12 mt-16"
        variants={fadeIn}
        initial="initial"
        animate="animate"
        exit="exit"
      >
        <div className="w-full max-w-6xl bg-white rounded-2xl shadow-xl grid grid-cols-1 lg:grid-cols-2 overflow-hidden">
          <div className="hidden lg:flex items-center justify-center bg-gradient-to-br from-[#ddd6f3] to-[#f3e7e9]">
            <img src={illustrationImg} alt="Illustration" className="w-full h-full object-cover" />
          </div>

          <div className="p-6 sm:p-10 flex flex-col justify-center">
            <div>
              <h1 className="text-2xl font-bold text-center text-gray-900 mb-1">Daftar Akun</h1>
              <p className="text-sm text-center text-gray-600 mb-6">Silakan isi data lengkap di bawah ini</p>
            </div>

            <form onSubmit={handleSubmit} className="w-full max-w-xl mx-auto space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Input 
                  label="Nama Lengkap" 
                  name="nama" 
                  value={formData.nama} 
                  onChange={handleChange} 
                  error={errors.nama} 
                />
                <Input 
                  label="Email" 
                  type="email" 
                  name="email" 
                  value={formData.email} 
                  onChange={handleChange} 
                  error={errors.email} 
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block font-medium text-gray-700 mb-2">Jenis Lomba</label>
                  <div className="flex flex-col gap-2">
                    <button
                      type="button"
                      className={`px-3 py-2 rounded-md font-medium text-sm shadow-sm transition ${
                        jenisLomba === "science-competition" 
                          ? "bg-purple-600 text-white" 
                          : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                      }`}
                      onClick={() => handleLombaChange("science-competition")}
                    >
                      Science Competition
                    </button>
                    <button
                      type="button"
                      className={`px-3 py-2 rounded-md font-medium text-sm shadow-sm transition ${
                        jenisLomba === "science-writing" 
                          ? "bg-purple-600 text-white" 
                          : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                      }`}
                      onClick={() => handleLombaChange("science-writing")}
                    >
                      Science Writing Competition
                    </button>
                  </div>
                  {errors.jenisLomba && (
                    <p className="text-red-500 text-xs mt-1">{errors.jenisLomba}</p>
                  )}
                </div>

                <div>
                  <label className="block font-medium text-gray-700 mb-2">Jenjang</label>
                  <select
                    name="jenjang"
                    value={formData.jenjang}
                    onChange={handleChange}
                    className={`w-full px-3 py-2 border rounded-md text-sm ${
                      !jenisLomba 
                        ? "bg-gray-100 text-gray-400 cursor-not-allowed" 
                        : "bg-white text-gray-800"
                    } focus:outline-none focus:ring-2 focus:ring-purple-600`}
                    disabled={!jenisLomba}
                  >
                    <option value="">Pilih jenjang</option>
                    {jenisLomba === "science-competition" ? (
                      <>
                        <option value="sd">SD/MI</option>
                        <option value="smp">SMP/MTS</option>
                      </>
                    ) : jenisLomba === "science-writing" ? (
                      <>
                        <option value="sma">SMA/SMK/MA Sederajat</option>
                        <option value="mahasiswa">Mahasiswa/i</option>
                      </>
                    ) : null}
                  </select>
                  {errors.jenjang && (
                    <p className="text-red-500 text-xs mt-1">{errors.jenjang}</p>
                  )}
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Input 
                  label="Password" 
                  type="password" 
                  name="password" 
                  value={formData.password} 
                  onChange={handleChange} 
                  error={errors.password} 
                  showPassword={showPassword}
                  toggleShowPassword={() => setShowPassword((prev) => !prev)}
                />
                <Input 
                  label="Konfirmasi Password" 
                  type="password" 
                  name="konfirmasi" 
                  value={formData.konfirmasi} 
                  onChange={handleChange} 
                  error={errors.konfirmasi} 
                  showPassword={showKonfirmasi}
                  toggleShowPassword={() => setShowKonfirmasi((prev) => !prev)}
                />
              </div>

              <div className="flex items-start gap-2 text-xs">
                <input type="checkbox" className="mt-1" required />
                <span className="text-gray-600">
                  Saya setuju dengan{" "}
                  <Link to="/kebijakan" className="text-purple-600 hover:underline">
                    kebijakan privasi dan ketentuan layanan
                  </Link>
                </span>
              </div>

              <button
                type="submit"
                className="w-full bg-purple-600 hover:bg-purple-700 text-white py-3 rounded-lg font-semibold text-sm shadow-md transition duration-300 transform hover:-translate-y-0.5"
              >
                Daftar
              </button>

              <div className="text-center text-sm text-gray-600">
                Sudah punya akun?{" "}
                <Link to="/masuk" className="text-purple-600 font-medium hover:underline">
                  Masuk
                </Link>
              </div>
            </form>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default Daftar;