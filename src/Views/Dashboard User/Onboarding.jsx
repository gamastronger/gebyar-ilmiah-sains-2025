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
  const [selectedProvinsi, setSelectedProvinsi] = useState([]);
  const [kota, setKota] = useState([]);
  const [selectedKota, setSelectedKota] = useState([]);
  const [data, setData] = useState({});

  const [dataPribadi, setDataPribadi] = useState({
    name: '',
    email: '',
    nisn: '',
    alamat: '',
    provinsi_id: '',
    kabupaten_id: '',
    no_whatsapp: '',
    link_twibbon: null
  });

  const [dataSekolah, setDataSekolah] = useState({
    asal_sekolah: '',
    guru: '',
    wa_guru: '',
    email_guru: ''
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

  const kirimData = async () => {
    const formData = new FormData();

    console.log("Data Pribadi", dataPribadi);
    console.log("Data Sekolah", dataSekolah);
    // Data Pribadi
    if (dataPribadi.name) formData.append('name', dataPribadi.name);
    if (dataPribadi.email) formData.append('email', dataPribadi.email);
    if (dataPribadi.nisn) formData.append('nisn', dataPribadi.nisn);
    if (dataPribadi.alamat) formData.append('alamat', dataPribadi.alamat);
    if (dataPribadi.no_whatsapp) formData.append('jenis_lomba', dataPribadi.no_whatsapp);
    if (dataPribadi.provinsi_id) formData.append('provinsi_id', dataPribadi.provinsi_id);
    if (dataPribadi.kabupaten_id) formData.append('kabupaten_id', dataPribadi.kabupaten_id);
    if (dataPribadi.link_twibbon instanceof File) {
      formData.append('link_twibbon', dataPribadi.link_twibbon);
    }

    // Data Sekolah
    if (dataSekolah.asal_sekolah) formData.append('asal_sekolah', dataSekolah.asal_sekolah);
    if (dataSekolah.guru) formData.append('guru', dataSekolah.guru);
    if (dataSekolah.wa_guru) formData.append('wa_guru', dataSekolah.wa_guru);
    if (dataSekolah.email_guru) formData.append('email_guru', dataSekolah.email_guru);

    try {
      console.log("Isi FormData:");
      for (let [key, value] of formData.entries()) {
        console.log(`${key}:`, value);
      }

      const response = await fetch(`${api.URL_API}/api/participants`, {
        method: 'POST',
        credentials: 'include',
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`,
        },
        body: formData,
      });

      const data = await response.json();
      if (response.ok) {
        try {
          const invoiceResponse = await fetch(`${api.URL_API}/api/invoices`, {
            method: 'POST',
            credentials: 'include',
            headers: {
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${localStorage.getItem('token')}`,
            },
            body: JSON.stringify({
              user_id: data.id, // Assuming `data.id` contains the user ID
              jenis_lomba: dataPribadi.jenis_lomba,
            }),
          });

          if (invoiceResponse.ok) {
            alert('Onboarding berhasil dan invoice berhasil dibuat!');
            navigate('/dashboard/user');
          } else {
            const invoiceError = await invoiceResponse.json();
            alert('Onboarding berhasil, tetapi gagal membuat invoice.');
            console.error('Invoice error:', invoiceError);
          }
        } catch (invoiceError) {
          console.error('Invoice fetch error:', invoiceError);
          alert('Onboarding berhasil, tetapi terjadi kesalahan saat membuat invoice.');
        }
      } else {
        alert('Onboarding gagal! Silakan periksa data Anda.');
        console.error('Server response:', data);
      }
    } catch (error) {
      console.error('Fetch error:', error);
      alert('Terjadi kesalahan jaringan. Silakan coba lagi.');
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
          className="bg-white p-4 sm:p-6 md:p-8 rounded-2xl shadow-xl w-full max-w-4xl mx-auto border border-purple-100"
        >
          <h2 className="text-xl sm:text-2xl font-bold mb-4 sm:mb-6 text-purple-800 text-center">Data Pribadi</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
            <div className="col-span-1">
              <label className="block text-sm sm:text-base font-medium text-gray-700 mb-1 sm:mb-2">Nama Lengkap</label>
              <input
                type="text"
                placeholder="Nama Lengkap"
                value={dataPribadi.name}
                onChange={(e) => setDataPribadi({ ...dataPribadi, name: e.target.value })}
                className="border border-gray-300 rounded-lg px-3 py-2 sm:px-4 sm:py-2.5 w-full focus:ring-2 focus:ring-purple-600 focus:outline-none text-sm sm:text-base"
              />
            </div>

            <div className="col-span-1">
              <label className="block text-sm sm:text-base font-medium text-gray-700 mb-1 sm:mb-2">Email</label>
              <input
                type="email"
                placeholder="Email"
                value={dataPribadi.email}
                onChange={(e) => setDataPribadi({ ...dataPribadi, email: e.target.value })}
                className="border border-gray-300 rounded-lg px-3 py-2 sm:px-4 sm:py-2.5 w-full focus:ring-2 focus:ring-purple-600 focus:outline-none text-sm sm:text-base"
              />
            </div>

            <div className="col-span-1">
              <label className="block text-sm sm:text-base font-medium text-gray-700 mb-1 sm:mb-2">NISN</label>
              <input
                type="text"
                placeholder="NISN"
                value={dataPribadi.nisn}
                onChange={(e) => setDataPribadi({ ...dataPribadi, nisn: e.target.value })}
                className="border border-gray-300 rounded-lg px-3 py-2 sm:px-4 sm:py-2.5 w-full focus:ring-2 focus:ring-purple-600 focus:outline-none text-sm sm:text-base"
              />
            </div>
            
            <div className="col-span-1">
              <label className="block text-sm sm:text-base font-medium text-gray-700 mb-1 sm:mb-2">No WhatsApp</label>
              <input
                type="text"
                placeholder="No WhatsApp"
                value={dataPribadi.no_whatsapp}
                onChange={(e) => setDataPribadi({ ...dataPribadi, no_whatsapp: e.target.value })}
                className="border border-gray-300 rounded-lg px-3 py-2 sm:px-4 sm:py-2.5 w-full focus:ring-2 focus:ring-purple-600 focus:outline-none text-sm sm:text-base"
              />
            </div>

            <div className="col-span-full md:col-span-1">
              <label className="block text-sm sm:text-base font-medium text-gray-700 mb-1 sm:mb-2">Alamat</label>
              <input
                type="text"
                placeholder="Alamat"
                value={dataPribadi.alamat}
                onChange={(e) => setDataPribadi({ ...dataPribadi, alamat: e.target.value })}
                className="border border-gray-300 rounded-lg px-3 py-2 sm:px-4 sm:py-2.5 w-full focus:ring-2 focus:ring-purple-600 focus:outline-none text-sm sm:text-base"
              />
            </div>

            <div className="col-span-full md:col-span-1">
              <label className="block text-sm sm:text-base font-medium text-gray-700 mb-1 sm:mb-2">Provinsi</label>
              <select
                value={dataPribadi.provinsi_id}
                name="provinsi_id"
                onChange={(e) => {
                  const selectedValue = e.target.value;
                  setDataPribadi({ ...dataPribadi, provinsi_id: selectedValue });
                  setSelectedProvinsi(provinsi.find((item) => item.id === selectedValue)?.name || '');

                  if (selectedValue) {
                    getKota(selectedValue);
                  }
                }}
                className="border border-gray-300 rounded-lg px-3 py-2 sm:px-4 sm:py-2.5 w-full focus:ring-2 focus:ring-purple-600 focus:outline-none text-sm sm:text-base"
              >
                <option value="">Pilih Provinsi</option>
                {provinsi.map((provinsi) => (
                  <option key={provinsi.id} value={provinsi.id}>
                    {provinsi.name}
                  </option>
                ))}
              </select>
            </div>

            <div className="col-span-full md:col-span-1">
              <label className="block text-sm sm:text-base font-medium text-gray-700 mb-1 sm:mb-2">Kota/Kabupaten</label>
              <select
                value={dataPribadi.kabupaten_id}
                name="kabupaten_id"
                onChange={(e) => {
                  const selectedValue = e.target.value;
                  setDataPribadi({ ...dataPribadi, kabupaten_id: selectedValue });
                  setSelectedKota(kota.find((item) => item.id === selectedValue)?.name || '');
                }}
                className="border border-gray-300 rounded-lg px-3 py-2 sm:px-4 sm:py-2.5 w-full focus:ring-2 focus:ring-purple-600 focus:outline-none text-sm sm:text-base"
              >
                <option value="">Pilih Kota/Kabupaten</option>
                {kota.map((item) => (
                  <option key={item.id} value={item.id}>
                    {item.name}
                  </option>
                ))}
              </select>
            </div>
          </div>
          
          <div className="mt-6 sm:mt-8 flex justify-center sm:justify-end">
            <button
              onClick={() => setStep(2)}
              className="bg-purple-700 hover:bg-purple-800 text-white py-2 px-6 sm:py-3 sm:px-10 rounded-lg font-semibold shadow-md transition duration-300 ease-in-out transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-purple-600 focus:ring-opacity-50 text-sm sm:text-base w-full sm:w-auto"
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
          className="bg-white p-4 sm:p-6 md:p-8 rounded-2xl shadow-xl w-full max-w-4xl border border-purple-100 mx-2 sm:mx-4 md:mx-8 mt-4 md:mt-8"
        >
          <h2 className="text-2xl font-bold mb-6 text-purple-800 text-center">Data Sekolah</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
             <div className='col-span-1'>
              <label className='block text-sm font-medium text-gray-700 mb-2'>Asal Sekolah</label>
              <input
                type='text'
                placeholder='Asal Sekolah'
                value={dataSekolah.asal_sekolah}
                onChange={(e) => setDataSekolah({ ...dataSekolah, asal_sekolah: e.target.value })}
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
                value={dataSekolah.wa_guru}
                onChange={(e) => setDataSekolah({ ...dataSekolah, wa_guru: e.target.value })}
                className='border border-gray-300 rounded-lg px-4 py-3 w-full focus:ring-2 focus:ring-purple-600 focus:outline-none'
              />
            </div> 

            <div className='col-span-1'>
              <label className='block text-sm font-medium text-gray-700 mb-2'>Email Guru Pendamping (Opsional)</label>
              <input
                type='email'
                placeholder='Email Guru Pendamping'
                value={dataSekolah.email_guru}
                onChange={(e) => setDataSekolah({ ...dataSekolah, email_guru: e.target.value })}
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
          className="bg-white p-4 sm:p-6 md:p-8 rounded-2xl shadow-xl w-full max-w-4xl border border-purple-100 mx-2 sm:mx-4 md:mx-8 mt-4 md:mt-8"
        >
          <h2 className="text-xl sm:text-2xl font-bold mb-4 sm:mb-6 text-purple-800 text-center">Bukti Upload Twibbon</h2>
          
          <div className="flex flex-col items-center mb-6 sm:mb-8">
            <h3 className="text-base sm:text-lg font-medium text-gray-700 mb-3 sm:mb-4">Contoh Twibbon</h3>
            <div className="w-64 sm:w-80 h-64 sm:h-80 border border-gray-200 rounded-lg shadow-md flex items-center justify-center bg-gray-50 overflow-hidden">
              <img src='/src/assets/twibbon peserta.png' alt="Contoh Twibbon" className='max-h-full max-w-full object-contain'/>
            </div>
          </div>
          
          <div className="space-y-4 sm:space-y-6">
            <div className="bg-purple-50 p-3 sm:p-4 rounded-lg">
              <div className="flex items-center mb-2 sm:mb-3">
                <div className="w-8 sm:w-10 h-8 sm:h-10 bg-purple-100 rounded-full flex items-center justify-center mr-2 sm:mr-3">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 sm:h-5 w-4 sm:w-5 text-purple-700" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2h-1V9a1 1 0 00-1-1z" clipRule="evenodd" />
                  </svg>
                </div>
                <h3 className="text-base sm:text-lg font-medium text-purple-800">Petunjuk</h3>
              </div>
              <ol className="list-decimal ml-4 sm:ml-6 text-gray-700 space-y-1 sm:space-y-2 text-sm sm:text-base">
                <li>Download template Twibbon pada link di bawah</li>
                <li>Unggah foto profil Anda menggunakan template Twibbon</li>
                <li>Posting ke Instagram Anda dengan caption yang ditentukan</li>
                <li>Screenshot bukti posting dan unggah di bawah</li>
              </ol>
            </div>
            
            <div>
              <h3 className="text-base sm:text-lg font-medium text-gray-700 mb-2 sm:mb-3">Link Twibbon</h3>
              <a
                href="https://twibbo.nz/gisfmipaunesa"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center px-3 sm:px-4 py-1 sm:py-2 bg-purple-100 text-purple-700 rounded-lg hover:bg-purple-200 transition-colors text-sm sm:text-base"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 sm:h-5 w-4 sm:w-5 mr-1 sm:mr-2" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M3 17a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm3.293-7.707a1 1 0 011.414 0L9 10.586V3a1 1 0 112 0v7.586l1.293-1.293a1 1 0 111.414 1.414l-3 3a1 1 0 01-1.414 0l-3-3a1 1 0 010-1.414z" clipRule="evenodd" />
                </svg>
                Link Twibbon
              </a>
            </div>
            
            <div className="mt-4 sm:mt-6">
              <h3 className="text-base sm:text-lg font-medium text-gray-700 mb-2 sm:mb-3">Unggah Bukti</h3>
              <div className="border-2 border-dashed border-gray-300 rounded-lg p-4 sm:p-6 flex flex-col items-center justify-center">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 text-gray-400 mb-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
                <p className="text-xs sm:text-sm text-gray-500 mb-3 sm:mb-4 text-center">Unggah screenshot postingan Instagram Anda</p>
                <input
                  name='link_twibbon'
                  onChange={(e) => setDataPribadi({ ...dataPribadi, link_twibbon: e.target.files[0] })}
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
          className="bg-white p-4 sm:p-6 md:p-8 rounded-2xl shadow-xl w-full max-w-4xl border border-purple-100 mx-2 sm:mx-4 md:mx-8 mt-4 md:mt-8"
        >
          <h2 className="text-xl sm:text-2xl font-bold mb-4 sm:mb-6 text-purple-800 text-center">Konfirmasi Data</h2>
          
          <div className="bg-purple-50 p-3 sm:p-4 rounded-lg mb-4 sm:mb-6">
            <div className="flex items-center mb-2 sm:mb-3">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 sm:h-6 w-5 sm:w-6 text-purple-700 mr-1 sm:mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <p className="text-purple-800 font-medium text-sm sm:text-base">Periksa kembali data Anda sebelum kirim</p>
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6 md:gap-8">
            <div className="bg-gray-50 p-4 sm:p-6 rounded-xl border border-gray-200">
              <h3 className="text-base sm:text-lg font-semibold mb-3 sm:mb-4 text-purple-700 border-b border-gray-200 pb-2">Data Pribadi</h3>
              <div className="space-y-2 sm:space-y-3 text-gray-700 text-sm sm:text-base">
                <div className="grid grid-cols-3 gap-1 sm:gap-2">
                  <span className="font-medium">Nama</span>
                  <span className="col-span-2">{dataPribadi.name || ':'}</span>
                </div>
                <div className="grid grid-cols-3 gap-1 sm:gap-2">
                  <span className="font-medium">Email</span>
                  <span className="col-span-2">{dataPribadi.email || ':'}</span>
                </div>
                <div className="grid grid-cols-3 gap-1 sm:gap-2">
                  <span className="font-medium">NISN</span>
                  <span className="col-span-2">{dataPribadi.nisn || ':'}</span>
                </div>
                <div className="grid grid-cols-3">
                  <span className="font-medium">No WhatsApp</span>
                  <span className="col-span-2">{dataPribadi.no_whatsapp || ':'}</span>
                </div>
                <div className="grid grid-cols-3">
                  <span className="font-medium">Alamat</span>
                  <span className="col-span-2">{dataPribadi.alamat || ':'}</span>
                </div>
                <div className="grid grid-cols-3">
                  <span className="font-medium">Provinsi</span>
                  <span className="col-span-2">{selectedProvinsi || ':'}</span>
                </div>
                <div className="grid grid-cols-3">
                  <span className="font-medium">Kota/Kab</span>
                  <span className="col-span-2">{selectedKota || ':'}</span>
                </div>
              </div>
            </div>

            <div className="bg-gray-50 p-6 rounded-xl border border-gray-200">
              <h3 className="text-lg font-semibold mb-4 text-purple-700 border-b border-gray-200 pb-2">Data Sekolah</h3>
              <div className="space-y-3 text-gray-700">
                <div className="grid grid-cols-3">
                  <span className="font-medium">Asal Sekolah</span>
                  <span className="col-span-2">{dataSekolah.asal_sekolah || ':'}</span>
                </div>
                <div className="grid grid-cols-3">
                  <span className="font-medium">Guru Pendamping</span>
                  <span className="col-span-2">{dataSekolah.guru || ':'}</span>
                </div>
                <div className="grid grid-cols-3">
                  <span className="font-medium">WhatsApp Guru</span>
                  <span className="col-span-2">{dataSekolah.wa_guru || ':'}</span>
                </div>
                <div className='grid grid-cols-3'>
                  <span className="font-medium">Email Guru</span>
                  <span className="col-span-2">{dataSekolah.email_guru || ':'}</span>
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
              Kirim Data Onboarding
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
    const selectedProv = provinsi.find((item) => item.name === dataPribadi.provinsi_id);
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

    if(data.status === 'pending') {
      alert('Anda sudah melakukan onboarding, silakan tunggu konfirmasi dari panitia');
      navigate('/dashboard/user');
    } else if (data.status === 'success') {
      alert('Anda sudah melakukan onboarding, silakan tunggu konfirmasi dari panitia');
      navigate('/dashboard/user');
    }

    setDataPribadi({
      ...dataPribadi,
      name: data.name,
      email: data.email,
      nisn: data.nisn,
      password: data.password,
      alamat: data.alamat,
      provinsi_id: data.provinsi,
      kabupaten_id: data.kota,
      no_whatsapp: data.no_whatsapp,
    });

    setDataSekolah({
      ...dataSekolah,
      asalSekolah: data.asalSekolah,
      guru: data.guru,
      wa_guru: data.wa_guru,
      email_guru: data.email_guru
    });
  }

  useEffect(() => {
    getUser();
  }, []);

  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-br from-indigo-900 via-purple-900 to-gray-900">
      {/* Main Content with padding to account for fixed header */}
      <div className="flex flex-col md:flex-row flex-grow md:container mx-auto mt-24 mb-8">
        {/* Steps Sidebar */}
        <div className="md:w-1/4 p-6 bg-white rounded-2xl shadow-lg mx-4 md:mx-0 md:mr-8 mb-6 md:mb-0 md:sticky md:top-28 md:self-start">
          <h2 className="text-xl font-bold mb-6 text-purple-800 border-b border-purple-100 pb-3">
            Tahapan Onboarding
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
    </div>
  );
}

export default Onboarding;