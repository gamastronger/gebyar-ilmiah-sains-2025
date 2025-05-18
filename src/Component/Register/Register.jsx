import { useState } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import illustrationImg from '../../assets/bgsementararegister.jpg';

const RegisterPage = () => {
  const [jenisLomba, setJenisLomba] = useState('');
  const [formData, setFormData] = useState({
    nama: '',
    email: '',
    whatsapp: '',
    alamat: '',
    sekolah: '',
    nisn: '',
    kelas: '',
    jenjang: '',
    password: '',
    konfirmasi: '',
  });

  const [errors, setErrors] = useState({});

  const fadeIn = {
    initial: { opacity: 0, y: 30, filter: 'blur(8px)' },
    animate: {
      opacity: 1,
      y: 0,
      filter: 'blur(0px)',
      transition: { duration: 0.7, ease: 'easeOut' },
    },
    exit: { opacity: 0, y: 30, filter: 'blur(8px)', transition: { duration: 0.5 } },
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const newErrors = {};

    Object.keys(formData).forEach((key) => {
      if (!formData[key]) {
        newErrors[key] = `${key} harus diisi`;
      }
    });

    if (!/^\d+$/.test(formData.whatsapp)) {
      newErrors.whatsapp = 'Nomor WhatsApp harus berupa angka';
    }

    if (!/^\d+$/.test(formData.nisn)) {
      newErrors.nisn = 'NISN harus berupa angka';
    }

    if (formData.password !== formData.konfirmasi) {
      newErrors.konfirmasi = 'Konfirmasi password tidak cocok';
    }

    setErrors(newErrors);

    
  };

  return (
    <motion.div
      className="min-h-screen bg-[#210034] flex items-center justify-center px-4 py-12"
      variants={fadeIn}
      initial="initial"
      animate="animate"
      exit="exit"
    >
      <div className="w-full max-w-6xl h-full bg-white rounded-2xl shadow-xl grid grid-cols-1 lg:grid-cols-2 overflow-hidden">
        {/* Left Side Image */}
        <div className="hidden lg:flex items-center justify-center bg-gradient-to-br from-[#ddd6f3] to-[#f3e7e9]">
          <img src={illustrationImg} alt="Illustration" className="w-full h-full object-cover" />
        </div>

        {/* Right Side Form */}
        <div className="p-6 sm:p-10 flex flex-col justify-center">
          <div>
            <h1 className="text-2xl font-bold text-center text-gray-900 mb-1">Daftar Akun</h1>
            <p className="text-sm text-center text-gray-600 mb-6">Silakan isi data lengkap di bawah ini</p>
          </div>

          <form onSubmit={handleSubmit} className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm">
            <Input label="Nama Lengkap" name="nama" value={formData.nama} onChange={handleChange} error={errors.nama} />
            <Input label="Email" type="email" name="email" value={formData.email} onChange={handleChange} error={errors.email} />
            <Input label="Nomor WhatsApp" name="whatsapp" value={formData.whatsapp} onChange={handleChange} error={errors.whatsapp} />
            <Input label="Alamat" name="alamat" value={formData.alamat} onChange={handleChange} error={errors.alamat} />
            <Input label="Asal Sekolah" name="sekolah" value={formData.sekolah} onChange={handleChange} error={errors.sekolah} />
            <Input label="NISN" name="nisn" value={formData.nisn} onChange={handleChange} error={errors.nisn} />
            <Input label="Kelas" name="kelas" value={formData.kelas} onChange={handleChange} error={errors.kelas} />

            {/* Jenjang */}
            <div>
              <label className="block font-medium text-gray-700 mb-1">Jenjang</label>
              <select
                name="jenjang"
                value={formData.jenjang}
                onChange={handleChange}
                className={`w-full px-3 py-2 border rounded-md text-sm ${
                  jenisLomba === 'cbt' ? 'bg-white text-gray-800' : 'bg-gray-100 text-gray-400 cursor-not-allowed'
                } focus:outline-none focus:ring-2 focus:ring-purple-600`}
                disabled={jenisLomba !== 'cbt'}
              >
                <option value="">Pilih jenjang</option>
                <option value="sd">SD</option>
                <option value="smp">SMP</option>
              </select>
              {errors.jenjang && <p className="text-red-500 text-xs mt-1">{errors.jenjang}</p>}
            </div>

            {/* Jenis Lomba */}
            <div className="sm:col-span-2">
              <label className="block font-medium text-gray-700 mb-1">Jenis Lomba</label>
              <div className="flex gap-2 flex-wrap">
                <button
                  type="button"
                  className={`px-3 py-1.5 rounded-md font-medium text-sm shadow-sm transition ${
                    jenisLomba === 'kti' ? 'bg-purple-600 text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                  onClick={() => setJenisLomba('kti')}
                >
                  Lomba KTI
                </button>
                <button
                  type="button"
                  className={`px-3 py-1.5 rounded-md font-medium text-sm shadow-sm transition ${
                    jenisLomba === 'cbt' ? 'bg-purple-600 text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                  onClick={() => setJenisLomba('cbt')}
                >
                  Lomba CBT
                </button>
              </div>
            </div>

            <Input label="Password" type="password" name="password" value={formData.password} onChange={handleChange} error={errors.password} />
            <Input label="Konfirmasi Password" type="password" name="konfirmasi" value={formData.konfirmasi} onChange={handleChange} error={errors.konfirmasi} />

            {/* Persetujuan */}
            <div className="sm:col-span-2 flex items-start gap-2 text-xs">
              <input type="checkbox" className="mt-1" required />
              <span className="text-gray-600">
                Saya setuju dengan{' '}
                <Link to="/kebijakan" className="text-purple-600 hover:underline">
                  kebijakan privasi dan ketentuan layanan
                </Link>
              </span>
            </div>

            {/* Tombol daftar */}
            <div className="sm:col-span-2">
              <button
                type="submit"
                className="w-full bg-purple-600 hover:bg-purple-700 text-white py-2 rounded-lg font-semibold text-sm shadow-md transition"
              >
                Daftar
              </button>
            </div>

            {/* Link login */}
            <div className="sm:col-span-2 text-center text-sm text-gray-600">
              Sudah punya akun?{' '}
              <Link to="/login" className="text-purple-600 font-medium hover:underline">
                Masuk
              </Link>
            </div>
          </form>
        </div>
      </div>
    </motion.div>
  );
};

const Input = ({ label, type = 'text', name, value, onChange, error }) => (
  <div>
    <label className="block font-medium text-gray-700">{label}</label>
    <input
      type={type}
      name={name}
      placeholder={label}
      value={value}
      onChange={onChange}
      className={`w-full px-3 py-2 mt-1 border rounded-md focus:outline-none focus:ring-2 focus:ring-purple-600 text-sm ${
        error ? 'border-red-500' : ''
      }`}
    />
    {error && <p className="text-red-500 text-xs mt-1">{error}</p>}
  </div>
);

export default RegisterPage;
