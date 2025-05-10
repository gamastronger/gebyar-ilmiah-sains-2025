import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { data } from 'autoprefixer';
import api from '../../configs/api';
import Footer from '@/Component/Footer';

function Onboarding() {
  const navigate = useNavigate();
  const [step, setStep] = useState(1);

  const [provinsi, setProvinsi] = useState([]);
  const [kota, setKota] = useState([]);
  const [data, setData] = useState({});

  const [dataPribadi, setDataPribadi] = useState({
    nama: '',
    email: '',
    nisn: '',
    alamat: '',
    provinsi: '',
    kota: '',
    jenisLomba: ''
  });

  const [dataSekolah, setDataSekolah] = useState({
    jenjang: '',
    asalSekolah: '',
    kelas: '',
    guru: '',
    waGuru: '',
    emailGuru: ''
  });
  
  const steps = [
    "Data Pribadi",
    "Data Sekolah",
    "Upload Twibbon",
    "Konfirmasi"
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
  };

  kirimData = async () => {
    const response = await fetch(`${api.URL_API}/api/participants`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${localStorage.getItem('token')}`
      },
      body: JSON.stringify({
        ...dataPribadi,
        ...dataSekolah
      }),
      credentials: 'include'
    });
    const data = await response.json();
    if (response.ok) {
      alert('Pendaftaran berhasil!');
      navigate('/dashboard');
    } else {
      alert('Pendaftaran gagal! Silakan coba lagi.');
    }
  };

  const renderForm = () => {
    
    if (step === 1) {
      return (
        <motion.div 
          key={step}
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -30 }}
          transition={{ duration: 0.5 }}
          className="bg-white p-8 rounded-2xl shadow-xl w-full max-w-4xl border border-purple-100 mx-8 mt-8"
        >
          <h2 className="text-2xl font-bold mb-6 text-purple-800 text-center">Data Pribadi</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className='col-span-1'>
              <label className="block text-sm font-medium text-gray-700 mb-2">Nama Lengkap</label>
              <input
                type="text"
                placeholder="Nama Lengkap"
                value={dataPribadi.nama}
                onChange={(e) => setDataPribadi({ ...dataPribadi, nama: e.target.value })}
                className="border border-gray-300 rounded-lg px-4 py-3 w-full focus:ring-2 focus:ring-purple-600 focus:outline-none"
              />
            </div>

            <div className="col-span-1">
              <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
              <input
                type="email"
                placeholder="Email"
                value={dataPribadi.email}
                onChange={(e) => setDataPribadi({ ...dataPribadi, email: e.target.value })}
                className="border border-gray-300 rounded-lg px-4 py-3 w-full focus:ring-2 focus:ring-purple-600 focus:outline-none"
              />
            </div>

            <div className="col-span-1">
              <label className="block text-sm font-medium text-gray-700 mb-2">NISN</label>
              <input
                type="text"
                placeholder="NISN"
                value={dataPribadi.nisn}
                onChange={(e) => setDataPribadi({ ...dataPribadi, nisn: e.target.value })}
                className="border border-gray-300 rounded-lg px-4 py-3 w-full focus:ring-2 focus:ring-purple-600 focus:outline-none"
              />
            </div>

            <div className="col-span-1">
              <label className="block text-sm font-medium text-gray-700 mb-2">Alamat</label>
              <input
                type="text"
                placeholder="Alamat"
                value={dataPribadi.alamat}
                onChange={(e) => setDataPribadi({ ...dataPribadi, alamat: e.target.value })}
                className="border border-gray-300 rounded-lg px-4 py-3 w-full focus:ring-2 focus:ring-purple-600 focus:outline-none"
              />
            </div>

            <div className="col-span-1">
              <label className="block text-sm font-medium text-gray-700 mb-2">Provinsi</label>
              <select
                value={dataPribadi.provinsi}
                onChange={(e) => setDataPribadi({ ...dataPribadi, provinsi: e.target.value })}
                className="border border-gray-300 rounded-lg px-4 py-3 w-full focus:ring-2 focus:ring-purple-600 focus:outline-none"
              >
                <option value="">Pilih Provinsi</option>
                {provinsi.map((provinsi) => (
                  <option key={provinsi.id} value={provinsi.name}>
                    {provinsi.name}
                  </option>
                ))}
              </select>
            </div>


            <div className="col-span-1">
              <label className="block text-sm font-medium text-gray-700 mb-2">Kota/Kabupaten</label>
              <select
                value={dataPribadi.kota}
                onChange={(e) => setDataPribadi({ ...dataPribadi, kota: e.target.value })}
                className="border border-gray-300 rounded-lg px-4 py-3 w-full focus:ring-2 focus:ring-purple-600 focus:outline-none"
              >
                <option value="">Pilih Kota/Kabupaten</option>
                {kota.map((item) => (
                  <option key={item.id} value={item.name}>
                  {item.name}
                  </option>
                ))}
              </select>
            </div>


            <div className="col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-2">Pilih Jenis Lomba</label>
              <select 
                value={dataPribadi.jenisLomba}
                onChange={(e) => setDataPribadi({ ...dataPribadi, jenisLomba: e.target.value })}
                className="border border-gray-300 rounded-lg px-4 py-3 w-full focus:ring-2 focus:ring-purple-600 focus:outline-none">
                <option>Pilih Jenis Lomba</option>
                <option>KTI</option>
                <option>Olimpiade</option>
              </select>
            </div>
          </div>
          
          <div className="mt-8 flex justify-end">
            <button
              onClick={() => setStep(2)}
              className="bg-purple-700 hover:bg-purple-800 text-white py-3 px-10 rounded-lg font-semibold shadow-md transition duration-300 ease-in-out transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-purple-600 focus:ring-opacity-50"
            >
              Lanjutkan
            </button>
          </div>
        </motion.div>
      );
    } else if (step === 2) {
      return (
        <motion.div 
          key={step}
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -30 }}
          transition={{ duration: 0.5 }}
          className="bg-white p-8 rounded-2xl shadow-xl w-full max-w-4xl border border-purple-100 mx-8 mt-8"
        >
          <h2 className="text-2xl font-bold mb-6 text-purple-800 text-center">Data Sekolah</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className='col-span-1'>
              <label className='block text-sm font-medium text-gray-700 mb-2'>Jenjang</label>
              <select 
                value={dataSekolah.jenjang}
                onChange={(e) => setDataSekolah({ ...dataSekolah, jenjang: e.target.value })}
                className='border border-gray-300 rounded-lg px-4 py-3 w-full focus:ring-2 focus:ring-purple-600 focus:outline-none'>
                <option>Jenjang</option>
                <option>SMA</option>
                <option>SMK</option>
                <option>SMP</option>
                <option>SD</option>
              </select>
            </div>
            
            <div className='col-span-1'>
              <label className='block text-sm font-medium text-gray-700 mb-2'>Kelas</label>
              <input
                type='number'
                placeholder='Kelas'
                value={dataSekolah.kelas}
                onChange={(e) => setDataSekolah({ ...dataSekolah, kelas: e.target.value })}
                className='border border-gray-300 rounded-lg px-4 py-3 w-full focus:ring-2 focus:ring-purple-600 focus:outline-none'
              />
            </div>
            
             <div className='col-span-1'>
              <label className='block text-sm font-medium text-gray-700 mb-2'>Asal Sekolah</label>
              <input
                type='text'
                placeholder='Asal Sekolah'
                value={dataSekolah.asalSekolah}
                onChange={(e) => setDataSekolah({ ...dataSekolah, asalSekolah: e.target.value })}
                className='border border-gray-300 rounded-lg px-4 py-3 w-full focus:ring-2 focus:ring-purple-600 focus:outline-none'
              />
            </div>
            
            <div className='col-span-1'>
              <label className='block text-sm font-medium text-gray-700 mb-2'>Nama Guru Pendamping (Opsional)</label>
              <input
                type='text'
                placeholder='Nama Guru Pendamping'
                value={dataSekolah.guru}
                onChange={(e) => setDataSekolah({ ...dataSekolah, guru: e.target.value })}
                className='border border-gray-300 rounded-lg px-4 py-3 w-full focus:ring-2 focus:ring-purple-600 focus:outline-none'
              />
            </div>
            
            <div className='col-span-1'>
              <label className='block text-sm font-medium text-gray-700 mb-2'>WhattsApp Guru Pendamping (Opsional)</label>
              <input
                type='text'
                placeholder='WhattsApp Guru Pendamping'
                value={dataSekolah.waGuru}
                onChange={(e) => setDataSekolah({ ...dataSekolah, waGuru: e.target.value })}
                className='border border-gray-300 rounded-lg px-4 py-3 w-full focus:ring-2 focus:ring-purple-600 focus:outline-none'
              />
            </div> 

            <div className='col-span-1'>
              <label className='block text-sm font-medium text-gray-700 mb-2'>Email Guru Pendamping (Opsional)</label>
              <input
                type='email'
                placeholder='Email Guru Pendamping'
                value={dataSekolah.emailGuru}
                onChange={(e) => setDataSekolah({ ...dataSekolah, emailGuru: e.target.value })}
                className='border border-gray-300 rounded-lg px-4 py-3 w-full focus:ring-2 focus:ring-purple-600 focus:outline-none'
              />
            </div>
          </div>
          
          <div className="mt-8 flex justify-between">
            <button
              onClick={() => setStep(1)}
              className="bg-gray-200 hover:bg-gray-300 text-gray-800 py-3 px-10 rounded-lg font-semibold shadow-md transition duration-300 ease-in-out focus:outline-none focus:ring-2 focus:ring-gray-400 focus:ring-opacity-50"
            >
              Kembali
            </button>
            
            <button
              onClick={() => setStep(3)}
              className="bg-purple-700 hover:bg-purple-800 text-white py-3 px-10 rounded-lg font-semibold shadow-md transition duration-300 ease-in-out transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-purple-600 focus:ring-opacity-50"
            >
              Lanjutkan
            </button>
          </div>
        </motion.div>
      );
    } else if (step === 3) {
      return (
        <motion.div 
          key={step}
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -30 }}
          transition={{ duration: 0.5 }}
          className="bg-white p-8 rounded-2xl shadow-xl w-full max-w-4xl border border-purple-100 mx-8 mt-8"
        >
          <h2 className="text-2xl font-bold mb-6 text-purple-800 text-center">Bukti Upload Twibbon</h2>
          
          <div className="flex flex-col items-center mb-8">
            <h3 className="text-lg font-medium text-gray-700 mb-4">Contoh Twibbon</h3>
            <div className="w-80 h-80 border border-gray-200 rounded-lg shadow-md flex items-center justify-center bg-gray-50 overflow-hidden">
              <img src='/src/assets/gimage.jpeg' alt="Contoh Twibbon" className='max-h-full max-w-full object-contain'/>
            </div>
          </div>
          
          <div className="space-y-6">
            <div className="bg-purple-50 p-4 rounded-lg">
              <div className="flex items-center mb-3">
                <div className="w-10 h-10 bg-purple-100 rounded-full flex items-center justify-center mr-3">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-purple-700" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2h-1V9a1 1 0 00-1-1z" clipRule="evenodd" />
                  </svg>
                </div>
                <h3 className="text-lg font-medium text-purple-800">Petunjuk</h3>
              </div>
              <ol className="list-decimal ml-6 text-gray-700 space-y-2">
                <li>Download template Twibbon pada link di bawah</li>
                <li>Unggah foto profil Anda menggunakan template Twibbon</li>
                <li>Posting ke Instagram Anda dengan caption yang ditentukan</li>
                <li>Screenshot bukti posting dan unggah di bawah</li>
              </ol>
            </div>
            
            <div>
              <h3 className="text-lg font-medium text-gray-700 mb-2">Download Twibbon</h3>
              <a
                href="https://twibbon.com/example"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center px-4 py-2 bg-purple-100 text-purple-700 rounded-lg hover:bg-purple-200 transition-colors"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M3 17a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm3.293-7.707a1 1 0 011.414 0L9 10.586V3a1 1 0 112 0v7.586l1.293-1.293a1 1 0 111.414 1.414l-3 3a1 1 0 01-1.414 0l-3-3a1 1 0 010-1.414z" clipRule="evenodd" />
                </svg>
                Download Twibbon
              </a>
            </div>
            
            <div className="mt-6">
              <h3 className="text-lg font-medium text-gray-700 mb-2">Unggah Bukti</h3>
              <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 flex flex-col items-center justify-center">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 text-gray-400 mb-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
                <p className="text-sm text-gray-500 mb-4 text-center">Unggah screenshot postingan Instagram Anda</p>
                <input
                  type="file"
                  accept="image/*"
                  className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-purple-50 file:text-purple-700 hover:file:bg-purple-100"
                />
              </div>
            </div>
          </div>
          
          <div className="mt-8 flex justify-between">
            <button
              onClick={() => setStep(2)}
              className="bg-gray-200 hover:bg-gray-300 text-gray-800 py-3 px-10 rounded-lg font-semibold shadow-md transition duration-300 ease-in-out focus:outline-none focus:ring-2 focus:ring-gray-400 focus:ring-opacity-50"
            >
              Kembali
            </button>
            
            <button
              onClick={() => setStep(4)}
              className="bg-purple-700 hover:bg-purple-800 text-white py-3 px-10 rounded-lg font-semibold shadow-md transition duration-300 ease-in-out transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-purple-600 focus:ring-opacity-50"
            >
              Lanjutkan
            </button>
          </div>
        </motion.div>
      );
    } else if (step === 4) {
      return (
        <motion.div 
          key={step}
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -30 }}
          transition={{ duration: 0.5 }}
          className="bg-white p-8 rounded-2xl shadow-xl w-full max-w-4xl border border-purple-100 mx-8 mt-8"
        >
          <h2 className="text-2xl font-bold mb-6 text-purple-800 text-center">Konfirmasi Data</h2>
          
          <div className="bg-purple-50 p-4 rounded-lg mb-6">
            <div className="flex items-center mb-3">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-purple-700 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <p className="text-purple-800 font-medium">Periksa kembali data Anda sebelum kirim</p>
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-gray-50 p-6 rounded-xl border border-gray-200">
              <h3 className="text-lg font-semibold mb-4 text-purple-700 border-b border-gray-200 pb-2">Data Pribadi</h3>
              <div className="space-y-3 text-gray-700">
                <div className="grid grid-cols-3">
                  <span className="font-medium">Nama</span>
                  <span className="col-span-2">{dataPribadi.nama || ':'}</span>
                </div>
                <div className="grid grid-cols-3">
                  <span className="font-medium">Email</span>
                  <span className="col-span-2">{dataPribadi.email || ':'}</span>
                </div>
                <div className="grid grid-cols-3">
                  <span className="font-medium">NISN</span>
                  <span className="col-span-2">{dataPribadi.nisn || ':'}</span>
                </div>
                <div className="grid grid-cols-3">
                  <span className="font-medium">Alamat</span>
                  <span className="col-span-2">{dataPribadi.alamat || ':'}</span>
                </div>
                <div className="grid grid-cols-3">
                  <span className="font-medium">Provinsi</span>
                  <span className="col-span-2">{dataPribadi.provinsi || ':'}</span>
                </div>
                <div className="grid grid-cols-3">
                  <span className="font-medium">Kota/Kab</span>
                  <span className="col-span-2">{dataPribadi.kota || ':'}</span>
                </div>
                <div className="grid grid-cols-3">
                  <span className="font-medium">Jenis Lomba</span>
                  <span className="col-span-2">{dataPribadi.jenisLomba || ':'}</span>
                </div>
              </div>
            </div>

            <div className="bg-gray-50 p-6 rounded-xl border border-gray-200">
              <h3 className="text-lg font-semibold mb-4 text-purple-700 border-b border-gray-200 pb-2">Data Sekolah</h3>
              <div className="space-y-3 text-gray-700">
                <div className="grid grid-cols-3">
                  <span className="font-medium">Jenjang</span>
                  <span className="col-span-2">{dataSekolah.jenjang || ':'}</span>
                </div>
                <div className="grid grid-cols-3">
                  <span className="font-medium">Kelas</span>
                  <span className="col-span-2">{dataSekolah.kelas || ':'}</span>
                </div>
                <div className="grid grid-cols-3">
                  <span className="font-medium">Asal Sekolah</span>
                  <span className="col-span-2">{dataSekolah.asalSekolah || ':'}</span>
                </div>
                <div className="grid grid-cols-3">
                  <span className="font-medium">Guru Pendamping</span>
                  <span className="col-span-2">{dataSekolah.guru || ':'}</span>
                </div>
                <div className="grid grid-cols-3">
                  <span className="font-medium">WhatsApp Guru</span>
                  <span className="col-span-2">{dataSekolah.waGuru || ':'}</span>
                </div>
                <div className='grid grid-cols-3'>
                  <span className="font-medium">Email Guru</span>
                  <span className="col-span-2">{dataSekolah.emailGuru || ':'}</span>
                </div>
              </div>
            </div>
          </div>
          
          <div className="mt-8 flex justify-between">
            <button
              onClick={() => setStep(3)}
              className="bg-gray-200 hover:bg-gray-300 text-gray-800 py-3 px-10 rounded-lg font-semibold shadow-md transition duration-300 ease-in-out focus:outline-none focus:ring-2 focus:ring-gray-400 focus:ring-opacity-50"
            >
              Kembali
            </button>
            
            <button
              onClick={() => kirimData()}
              className="bg-purple-700 hover:bg-purple-800 text-white py-3 px-10 rounded-lg font-semibold shadow-md transition duration-300 ease-in-out transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-purple-600 focus:ring-opacity-50"
            >
              Kirim Pendaftaran
            </button>
          </div>
        </motion.div>
      );
    }
  };

  const getProvinsi = async () => {
    const response = await fetch('https://www.emsifa.com/api-wilayah-indonesia/api/provinces.json')
    const data = await response.json()
    setProvinsi(data);
    console.log('provinsi', data);
  }

  useEffect(() => {
    getProvinsi();
    console.log('provinsi', provinsi);
  }, []);

  const getKota = async (provinsiId) => {
    const response = await fetch(`https://www.emsifa.com/api-wilayah-indonesia/api/regencies/${provinsiId}.json`)
    const data = await response.json()
    setKota(data);
    console.log('kota', data);
  }

  useEffect(() => {
    const selectedProv = provinsi.find((item) => item.name === dataPribadi.provinsi);
    if (selectedProv) {
      getKota(selectedProv.id);
    }
  }, [dataPribadi.provinsi]);

  const getUser = async () => {
    const response = await fetch(`${api.URL_API}/api/users/byAuth`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${localStorage.getItem('token')}`
      },
      credentials: 'include'
    });
    const data = await response.json();
    setData(data);

    setDataPribadi({
      ...dataPribadi,
      nama: data.name,
      email: data.email,
      nisn: data.nisn,
      password: data.password,
      alamat: data.alamat,
      provinsi: data.provinsi,
      kota: data.kota,
      jenisLomba: data.jenisLomba
    });

    setDataSekolah({
      ...dataSekolah,
      jenjang: data.jenjang,
      asalSekolah: data.asalSekolah,
      kelas: data.kelas,
      guru: data.guru,
      waGuru: data.waGuru,
      emailGuru: data.emailGuru
    });

    const updateUser = async () => {
      const response = await fetch(`${api.URL_API}/api/users/${data.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        },
        body: JSON.stringify({
          name: dataPribadi.nama,
          email: dataPribadi.email,
          nisn: dataPribadi.nisn,
          password: dataPribadi.password,
          alamat: dataPribadi.alamat,
          provinsi: dataPribadi.provinsi,
          kota: dataPribadi.kota,
          jenisLomba: dataPribadi.jenisLomba,
          jenjang: dataSekolah.jenjang,
          asalSekolah: dataSekolah.asalSekolah,
          kelas: dataSekolah.kelas,
          guru: dataSekolah.guru,
          waGuru: dataSekolah.waGuru,
          emailGuru: dataSekolah.emailGuru
        })
      });
    }
  }

  useEffect(() => {
    getUser();
  }, []);

  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-br from-indigo-900 via-purple-900 to-gray-900">
      {/* Fixed Header */}
      {/* <header className="fixed top-0 left-0 right-0 bg-white py-3 px-6 shadow-md z-50">
        <div className="container mx-auto flex items-center justify-between">
          <div className="flex items-center">
            <img src='/src/assets/hmpti.png' alt="Logo" className="h-14 mr-6" />
          </div>
          <div className="flex-grow flex items-center justify-center">
            <h1 className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-700 to-purple-900">Onboarding Peserta</h1>
          </div>
        </div>
      </header> */}

      {/* Main Content with padding to account for fixed header */}
      <div className="flex flex-col md:flex-row flex-grow md:container mx-auto mt-24 mb-8">
        {/* Steps Sidebar */}
        <div className="md:w-1/4 p-6 bg-white rounded-2xl shadow-lg mx-4 md:mx-0 md:mr-8 mb-6 md:mb-0 md:sticky md:top-28 md:self-start">
          <h2 className="text-xl font-bold mb-6 text-purple-800 border-b border-purple-100 pb-3">
            Tahapan Pendaftaran
          </h2>
          
          {steps.map((item, index) => (
            <motion.div
              key={index}
              variants={itemVariants}
              className="mb-4 last:mb-0"
            >
              <button
                onClick={() => setStep(index + 1)}
                disabled={index + 1 > step}
                className={`w-full flex items-center p-3 rounded-lg text-left transition-all duration-200 ease-in-out
                  ${step === index + 1 
                    ? "bg-purple-100 text-purple-800 font-medium" 
                    : index + 1 < step 
                      ? "bg-gray-50 text-gray-700 hover:bg-gray-100" 
                      : "bg-gray-50 text-gray-400 cursor-not-allowed"
                  }`}
              >
                <div className={`flex items-center justify-center w-8 h-8 rounded-full mr-3 text-sm font-bold
                  ${step === index + 1 
                    ? "bg-purple-700 text-white" 
                    : index + 1 < step 
                      ? "bg-purple-600 text-white" 
                      : "bg-gray-200 text-gray-500"
                  }`}>
                  {index + 1 < step ? (
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                  ) : (
                    index + 1
                  )}
                </div>
                {item}
                
                {step === index + 1 && (
                  <motion.div 
                    className="ml-auto w-2 h-2 bg-purple-700 rounded-full"
                    animate={{ scale: [1, 1.5, 1] }}
                    transition={{ repeat: Infinity, duration: 2 }}
                  />
                )}
              </button>
            </motion.div>
          ))}
        </div>

        {/* Form Container */}
        <div className="md:w-3/4 flex justify-center">
          <AnimatePresence mode="wait">
            {renderForm()}
          </AnimatePresence>
        </div>
      </div>
      
      {/* Footer */}
     
    </div>
  );
}

export default Onboarding;