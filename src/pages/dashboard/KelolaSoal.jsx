import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from "react-router-dom";
import { Search, Plus, Trash2, Eye, FileText, Image, CheckCircle, XCircle, CheckCircle2 } from 'lucide-react';
import TambahSoal from "./TambahSoal";

// Util: mapping data dari API -> struktur UI lokal
const mapApiQuestions = (apiQuestions = [], jenjang) => {
  const toArray = (val) => (Array.isArray(val) ? val : []);
  const letterByIndex = (i) => String.fromCharCode(97 + i); // 0->'a'

  return toArray(apiQuestions).map((q, idx) => {
    const id = q?.id || q?._id || q?.question_id || q?.uuid || idx + 1;
    const pertanyaan = q?.question_text || q?.pertanyaan || q?.text || q?.title || "";

    // Deteksi tipe konten soal
    const gambarSoal = q?.image || q?.gambar || q?.image_url || null;
    const tipe = gambarSoal ? 'image' : 'text';

    // Ambil opsi jawaban dari berbagai kemungkinan key
    const rawOptions = q?.options || q?.choices || q?.jawaban || q?.answers || [];
    let jawaban = toArray(rawOptions).map((opt, i) => {
      const teks =
        typeof opt === 'string'
          ? opt
          : opt?.text || opt?.teks || opt?.label || opt?.optionText || '';
      const gambar = opt?.image || opt?.gambar || opt?.url || null;
      const tipeJawab = gambar ? 'image' : (opt?.tipe || 'text');
      const benar = Boolean(
        opt?.correct || opt?.benar || opt?.is_correct || opt?.isCorrect || false
      );
      return {
        id: letterByIndex(i),
        teks: String(teks ?? ''),
        tipe: tipeJawab,
        benar,
        ...(gambar ? { gambar } : {}),
      };
    });

    // Jika tidak ada flag benar pada opsi, coba pakai field penanda jawaban benar di level soal
    const anyCorrect = jawaban.some((j) => j.benar);
    if (!anyCorrect) {
      const correctOpt = q?.correct_option || q?.correctOption || q?.answer || q?.correctAnswer;
      const correctIdx =
        typeof correctOpt === 'number'
          ? correctOpt
          : typeof correctOpt === 'string'
            ? (correctOpt.toUpperCase().charCodeAt(0) - 65) // 'A' -> 0
            : -1;
      if (correctIdx >= 0 && correctIdx < jawaban.length) {
        jawaban = jawaban.map((j, i) => ({ ...j, benar: i === correctIdx }));
      }
    }

    // Tipe isian singkat jika tidak ada opsi tetapi ada jawaban benar text
    if (jawaban.length === 0 && (q?.correct_answer_text || q?.correctText)) {
      jawaban = [{ id: 'input', teks: q?.correct_answer_text || q?.correctText, tipe: 'input', benar: true }];
    }

    return {
      id,
      pertanyaan,
      tipe,
      jenjang,
      ...(gambarSoal ? { gambarSoal } : {}),
      jawaban,
    };
  });
};

const KelolaSoal = () => {
  const [currentView, setCurrentView] = useState('list'); // 'list' or 'answers'
  const [selectedSoal, setSelectedSoal] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedJenjang, setSelectedJenjang] = useState('SD');
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [soalToDelete, setSoalToDelete] = useState(null);
  const [alert, setAlert] = useState({ show: false, type: '', message: '' });
  const [isLoading, setIsLoading] = useState(false);
  const [showTambahModal, setShowTambahModal] = useState(false);

  const navigate = useNavigate();

  // Data soal per jenjang
  const [soalDataSD, setSoalDataSD] = useState([]);
  const [soalDataSMP, setSoalDataSMP] = useState([]);

  // Loader data dari API berdasarkan jenjang
  const loadSoal = async (level) => {
    setIsLoading(true);
    try {
      const token = localStorage.getItem('token'); // Replace with the actual key where the token is stored
      if (!token) {
        throw new Error('Token tidak ditemukan');
      }
    
      const { data } = await axios.get(
        'https://ujicoba-gis-backend.karyavisual.com/api/exam/questions',
        {
          params: { level },
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
    
      const payload = data?.data ?? data ?? [];
      const mapped = mapApiQuestions(payload, level);
      if (level === 'SD') setSoalDataSD(mapped);
      if (level === 'SMP') setSoalDataSMP(mapped);
    } catch (error) {
      console.error('Gagal memuat soal:', error);
      showAlert('error', `Gagal memuat soal ${level}.`);
    } finally {
      setIsLoading(false);
    }
  };

  // Muat data saat pertama dan saat jenjang berubah
  useEffect(() => {
    loadSoal(selectedJenjang);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedJenjang]);

  // Pilih data soal sesuai jenjang
  const soalData = selectedJenjang === 'SD' ? soalDataSD : soalDataSMP;
  const setSoalData = selectedJenjang === 'SD' ? setSoalDataSD : setSoalDataSMP;

  // Filtered data
  const filteredSoal = React.useMemo(() => {
    return soalData.filter(soal => {
      const searchMatch = soal.pertanyaan.toLowerCase().includes(searchTerm.toLowerCase());
      return searchMatch;
    });
  }, [soalData, searchTerm]);

  // Auto hide alert
  useEffect(() => {
    if (alert.show) {
      const timer = setTimeout(() => {
        setAlert({ show: false, type: '', message: '' });
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [alert.show]);

  // Utility function untuk menampilkan alert
  const showAlert = (type, message) => {
    setAlert({ show: true, type, message });
  };

  // Handler untuk detail soal
  const handleDetailClick = (soal) => {
    if (!soal || !soal.id) {
      showAlert('error', 'Data soal tidak valid');
      return;
    }
    setSelectedSoal(soal);
    setCurrentView('answers');
  };

  // Handler untuk kembali ke list
  const handleBackToList = () => {
    setCurrentView('list');
    setSelectedSoal(null);
  };

  // Handler untuk toggle jawaban benar
  const handleAnswerCorrectToggle = (answerId) => {
    if (!selectedSoal || !answerId) {
      showAlert('error', 'Data tidak valid');
      return;
    }

    const updatedSoal = { ...selectedSoal };

    // Jika tipe input, tidak perlu toggle
    if (updatedSoal.jawaban[0]?.tipe === 'input') {
      return;
    }

    // Untuk pilihan ganda, hanya satu yang bisa benar
    updatedSoal.jawaban = updatedSoal.jawaban.map(jawab => ({
      ...jawab,
      benar: jawab.id === answerId
    }));

    setSelectedSoal(updatedSoal);

    // Update data utama
    setSoalData(prev => prev.map(soal =>
      soal.id === updatedSoal.id ? updatedSoal : soal
    ));
  };

  // Utility functions
  const getTipeIcon = (tipe) => {
    switch (tipe) {
      case 'text': return <FileText className="w-4 h-4 text-gray-600" />;
      case 'image': return <Image className="w-4 h-4 text-gray-600" />;
      default: return <FileText className="w-4 h-4 text-gray-600" />;
    }
  };

  // Handler untuk delete soal
  const handleDeleteClick = (soal) => {
    if (!soal || !soal.id) {
      showAlert('error', 'Data soal tidak valid');
      return;
    }
    setSoalToDelete(soal);
    setShowDeleteModal(true);
  };

  // Konfirmasi delete
  const handleConfirmDelete = async () => {
    if (!soalToDelete) return;

    setIsLoading(true);
    try {
      await new Promise(resolve => setTimeout(resolve, 500));
      setSoalData(prev => prev.filter(s => s.id !== soalToDelete.id));
      setShowDeleteModal(false);
      setSoalToDelete(null);
      showAlert('success', 'Soal berhasil dihapus!');
    } catch (error) {
      showAlert('error', 'Gagal menghapus soal. Silakan coba lagi.');
    } finally {
      setIsLoading(false);
    }
  };

  // Cancel delete
  const handleCancelDelete = () => {
    setShowDeleteModal(false);
    setSoalToDelete(null);
  };

  // Save jawaban
  const handleSaveAnswers = async () => {
    if (!selectedSoal) {
      showAlert('error', 'Data soal tidak valid');
      return;
    }
    if (selectedSoal.jawaban[0]?.tipe !== 'input') {
      const hasCorrectAnswer = selectedSoal.jawaban.some(jawab => jawab.benar);
      if (!hasCorrectAnswer) {
        showAlert('error', 'Pilih setidaknya satu jawaban yang benar!');
        return;
      }
    }
    setIsLoading(true);
    try {
      await new Promise(resolve => setTimeout(resolve, 500));
      showAlert('success', 'Perubahan jawaban berhasil disimpan!');
      setCurrentView('list');
      setSelectedSoal(null);
    } catch (error) {
      showAlert('error', 'Gagal menyimpan perubahan. Silakan coba lagi.');
    } finally {
      setIsLoading(false);
    }
  };

  // Handler untuk tambah soal
  const handleTambahSoal = () => {
    navigate('/dashboard/tambahsoal');
  };

  // Handler submit soal baru
  const handleSubmitTambahSoal = (newSoal) => {
    setSoalData((prev) => [...prev, newSoal]);
  };

  // Alert notification component
  const AlertNotification = ({ show, type, message }) => (
    <div
      className={`
        fixed top-6 right-6 z-[9999] transition-all duration-300 transform
        ${show ? 'opacity-100 translate-y-0 pointer-events-auto' : 'opacity-0 -translate-y-2 pointer-events-none'}
      `}
    >
      <div className={`
        flex items-center gap-3 px-5 py-3 rounded-lg shadow-lg border backdrop-blur-sm
        ${type === 'success'
          ? 'bg-green-50 text-green-800 border-green-200'
          : 'bg-red-50 text-red-800 border-red-200'}
      `}>
        {type === 'success'
          ? <CheckCircle2 className="w-5 h-5 flex-shrink-0" />
          : <XCircle className="w-5 h-5 flex-shrink-0" />}
        <span className="font-medium text-sm">{message}</span>
      </div>
    </div>
  );

  // Loading overlay
  const LoadingOverlay = () => (
    <div className="fixed inset-0 bg-black bg-opacity-30 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 flex items-center gap-3">
        <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-blue-600"></div>
        <span className="text-gray-700">Memproses...</span>
      </div>
    </div>
  );

  // Edit mode state
  const [editMode, setEditMode] = useState(false);
  const [editSoal, setEditSoal] = useState(null);

  // Sync editSoal saat selectedSoal berubah
  useEffect(() => {
    setEditSoal(selectedSoal);
    setEditMode(false);
  }, [selectedSoal]);

  // Handler edit pertanyaan
  const handleEditPertanyaan = (e) => {
    setEditSoal((prev) => ({ ...prev, pertanyaan: e.target.value }));
  };

  // Handler edit gambar soal
  const handleEditGambarSoal = (file) => {
    setEditSoal((prev) => ({ ...prev, gambarSoal: file }));
  };

  // Handler edit jawaban (teks/gambar)
  const handleEditJawaban = (idx, value, file = undefined) => {
    setEditSoal((prev) => ({
      ...prev,
      jawaban: prev.jawaban.map((j, i) =>
        i === idx
          ? {
              ...j,
              teks: file ? file.name : value,
              gambar: file !== undefined ? file : j.gambar,
            }
          : j
      ),
    }));
  };

  // Simpan perubahan edit
  const handleSaveEditSoal = () => {
    setSoalData((prev) =>
      prev.map((soal) =>
        soal.id === editSoal.id ? editSoal : soal
      )
    );
    setSelectedSoal(editSoal);
    setEditMode(false);
    showAlert('success', 'Soal berhasil diperbarui!');
  };

  // Batalkan edit
  const handleCancelEdit = () => {
    setEditSoal(selectedSoal);
    setEditMode(false);
  };

  // Render halaman kelola jawaban
  if (currentView === 'answers' && selectedSoal) {
    if (!editSoal) return null; // Hindari error saat editSoal masih null

    return (
      <div className="p-2 sm:p-6 bg-white min-h-screen">
        <AlertNotification show={alert.show} type={alert.type} message={alert.message} />
        {isLoading && <LoadingOverlay />}

        {/* Header */}
        <div className="mb-6 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2">
          <button
            onClick={handleBackToList}
            className="text-blue-600 hover:text-blue-800 mb-2 sm:mb-0 flex items-center gap-2 transition-colors"
            disabled={isLoading}
          >
            ← Kembali ke Daftar Soal
          </button>
          {!editMode && (
            <button
              onClick={() => setEditMode(true)}
              className="px-4 py-2 bg-yellow-100 text-yellow-800 rounded hover:bg-yellow-200 transition-colors font-semibold text-sm"
            >
              Edit Soal
            </button>
          )}
        </div>

        {/* Soal Info */}
        <div className="bg-gray-50 p-3 sm:p-4 rounded-lg mb-6 border">
          <div className="flex flex-col sm:flex-row items-start gap-3">
            {getTipeIcon(editSoal.tipe)}
            <div className="flex-1">
              <div className="text-gray-800 font-medium mb-2">
                {editSoal.tipe === "image" && (
                  <div className="mb-2">
                    {editMode ? (
                      <>
                        <input
                          type="file"
                          accept="image/*"
                          onChange={(e) =>
                            handleEditGambarSoal(e.target.files[0] || null)
                          }
                          className="block mb-2"
                        />
                        {editSoal.gambarSoal && (
                          <img
                            src={
                              typeof editSoal.gambarSoal === "string"
                                ? editSoal.gambarSoal
                                : URL.createObjectURL(editSoal.gambarSoal)
                            }
                            alt="Soal"
                            className="w-full max-w-xs h-32 object-contain border rounded"
                          />
                        )}
                      </>
                    ) : (
                      editSoal.gambarSoal && (
                        <img
                          src={
                            typeof editSoal.gambarSoal === "string"
                              ? editSoal.gambarSoal
                              : URL.createObjectURL(editSoal.gambarSoal)
                          }
                          alt="Soal"
                          className="w-full max-w-xs h-32 object-contain border rounded mb-2"
                        />
                      )
                    )}
                  </div>
                )}
                {editMode ? (
                  <textarea
                    className="w-full border border-gray-300 rounded px-3 py-2 focus:ring-2 focus:ring-blue-500"
                    value={editSoal.pertanyaan}
                    onChange={handleEditPertanyaan}
                    rows={2}
                    required
                  />
                ) : (
                  <span>{editSoal.pertanyaan}</span>
                )}
              </div>
              <div className="flex flex-wrap gap-4 text-sm text-gray-600">
                <span>
                  Jenjang: <span className="font-medium">{editSoal.jenjang}</span>
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Jawaban */}
        <div className="space-y-4">
          <h3 className="text-lg font-medium text-gray-800">Pilihan Jawaban</h3>
          {editSoal.jawaban?.map((jawab, index) => (
            <div key={jawab.id} className="border rounded-lg p-3 sm:p-4 hover:bg-gray-50 transition-colors">
              <div className="flex flex-col sm:flex-row items-start gap-3">
                <div className="flex items-center gap-2 mb-2 sm:mb-0">
                  {jawab.tipe === 'input' ? (
                    <span className="w-7 h-7 bg-blue-100 text-blue-800 rounded text-sm flex items-center justify-center font-medium">
                      T
                    </span>
                  ) : (
                    <span className="w-7 h-7 bg-gray-100 text-gray-800 rounded text-sm flex items-center justify-center font-medium">
                      {String.fromCharCode(65 + index)}
                    </span>
                  )}
                </div>
                <div className="flex-1 w-full">
                  {jawab.tipe === 'image' ? (
                    <div className="space-y-2">
                      {editMode ? (
                        <>
                          <input
                            type="file"
                            accept="image/*"
                            onChange={(e) =>
                              handleEditJawaban(index, jawab.teks, e.target.files[0] || null)
                            }
                            className="block mb-2"
                          />
                          {jawab.gambar && (
                            <div className="w-full max-w-xs h-24 bg-gray-200 rounded border flex items-center justify-center overflow-hidden">
                              <img
                                src={
                                  typeof jawab.gambar === "string"
                                    ? jawab.gambar
                                    : URL.createObjectURL(jawab.gambar)
                                }
                                alt={`Jawaban ${String.fromCharCode(65 + index)}`}
                                className="object-contain w-full h-full"
                              />
                            </div>
                          )}
                          <input
                            type="text"
                            className="w-full border border-gray-300 rounded px-3 py-2 focus:ring-2 focus:ring-blue-500"
                            value={jawab.teks}
                            onChange={(e) => handleEditJawaban(index, e.target.value)}
                            placeholder={`Jawaban ${String.fromCharCode(65 + index)}`}
                            required
                          />
                        </>
                      ) : (
                        <>
                          {jawab.gambar && (
                            <div className="w-full max-w-xs h-24 bg-gray-200 rounded border flex items-center justify-center overflow-hidden">
                              <img
                                src={
                                  typeof jawab.gambar === "string"
                                    ? jawab.gambar
                                    : URL.createObjectURL(jawab.gambar)
                                }
                                alt={`Jawaban ${String.fromCharCode(65 + index)}`}
                                className="object-contain w-full h-full"
                              />
                            </div>
                          )}
                          <p className="text-gray-800">{jawab.teks}</p>
                        </>
                      )}
                    </div>
                  ) : (
                    editMode ? (
                      <input
                        type={jawab.tipe === "text" ? "text" : "number"}
                        className="w-full border border-gray-300 rounded px-3 py-2 focus:ring-2 focus:ring-blue-500"
                        value={jawab.teks}
                        onChange={(e) => handleEditJawaban(index, e.target.value)}
                        placeholder={
                          jawab.tipe === "input"
                            ? "Jawaban isian"
                            : `Jawaban ${String.fromCharCode(65 + index)}`
                        }
                        required
                      />
                    ) : (
                      <p className="text-gray-800">{jawab.teks}</p>
                    )
                  )}
                </div>
                {jawab.tipe !== 'input' && (
                  <button
                    onClick={() => handleAnswerCorrectToggle(jawab.id)}
                    disabled={isLoading || editMode}
                    className={`flex items-center gap-2 px-3 py-2 rounded text-sm font-medium transition-all ${
                      jawab.benar
                        ? 'bg-green-100 text-green-800 border border-green-300 shadow-sm'
                        : 'bg-gray-100 text-gray-600 border border-gray-300 hover:bg-gray-200 hover:shadow-sm'
                    } ${isLoading || editMode ? 'opacity-50 cursor-not-allowed' : ''}`}
                  >
                    <CheckCircle className="w-4 h-4" />
                    {jawab.benar ? 'Jawaban Benar' : 'Tandai Benar'}
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* Save/Cancel Edit */}
        {editMode && (
          <div className="mt-8 flex flex-col sm:flex-row justify-end gap-3">
            <button
              onClick={handleCancelEdit}
              className="px-6 py-2 bg-gray-200 text-gray-700 rounded hover:bg-gray-300 transition-colors font-semibold"
            >
              Batal
            </button>
            <button
              onClick={handleSaveEditSoal}
              className="px-6 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors font-semibold"
            >
              Simpan Perubahan
            </button>
          </div>
        )}

        {/* Save Button (non-edit mode) */}
        {!editMode && (
          <div className="mt-8 flex flex-col sm:flex-row justify-end">
            <button
              onClick={handleSaveAnswers}
              disabled={isLoading}
              className={`px-6 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors flex items-center gap-2 ${
                isLoading ? 'opacity-50 cursor-not-allowed' : ''
              }`}
            >
              {isLoading && <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>}
              Simpan Perubahan
            </button>
          </div>
        )}
      </div>
    );
  }

  // Render halaman utama (list soal)
  return (
    <div className="p-2 sm:p-6 bg-white min-h-screen">
      <AlertNotification show={alert.show} type={alert.type} message={alert.message} />
      {isLoading && <LoadingOverlay />}

      {/* Pilihan Jenjang */}
      <div className="flex gap-2 sm:gap-4 mb-8 flex-wrap">
        <button
          className={`flex items-center gap-1 px-3 py-1 text-xs rounded border transition-colors font-semibold
            ${selectedJenjang === 'SD'
              ? 'bg-blue-600 text-white border-blue-700 shadow'
              : 'bg-gray-100 text-gray-700 border-gray-300 hover:bg-blue-50'}
        `}
          onClick={() => setSelectedJenjang('SD')}
          disabled={isLoading}
        >
          Soal SD
        </button>
        <button
          className={`flex items-center gap-1 px-3 py-1 text-xs rounded border transition-colors font-semibold
            ${selectedJenjang === 'SMP'
              ? 'bg-blue-600 text-white border-blue-700 shadow'
              : 'bg-gray-100 text-gray-700 border-gray-300 hover:bg-blue-50'}
        `}
          onClick={() => setSelectedJenjang('SMP')}
          disabled={isLoading}
        >
          Soal SMP
        </button>
      </div>

      {/* Header */}
      <div className="mb-6">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-4 gap-2">
          <h2 className="text-xl font-semibold text-gray-800">
            Kelola Soal & Jawaban Science Competition {selectedJenjang}
          </h2>
          <button
            onClick={() => setShowTambahModal(true)}
            className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors"
          >
            <Plus className="w-4 h-4" />
            Tambah Soal
          </button>
        </div>
        <div className="relative max-w-md w-full">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
          <input
            type="text"
            placeholder="Cari soal..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>
      </div>

      {/* Modal Tambah Soal */}
      <TambahSoal
        show={showTambahModal}
        onClose={() => setShowTambahModal(false)}
        onSubmit={handleSubmitTambahSoal}
        jenjang={selectedJenjang}
        showAlert={showAlert}
      />

      {/* Soal List */}
      <div className="bg-white border rounded-lg overflow-x-auto shadow-sm">
        <table className="w-full min-w-[500px]">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-4 sm:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Soal
              </th>
              <th className="px-4 sm:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Jenjang
              </th>
              <th className="px-4 sm:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Aksi
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {filteredSoal.map((soal) => (
              <tr key={soal.id} className="hover:bg-gray-50 transition-colors">
                <td className="px-4 sm:px-6 py-4">
                  <div className="flex items-start gap-3">
                    <div className="flex-1">
                      <p className="text-sm text-gray-800 font-medium leading-relaxed break-words">
                        {soal.pertanyaan}
                      </p>
                    </div>
                  </div>
                </td>
                <td className="px-4 sm:px-6 py-4 whitespace-nowrap">
                  <span className="px-2 py-1 text-xs font-medium bg-blue-100 text-blue-800 rounded border border-blue-200">
                    {soal.jenjang}
                  </span>
                </td>
                <td className="px-4 sm:px-6 py-4 whitespace-nowrap">
                  <div className="flex flex-col sm:flex-row items-start sm:items-center gap-2">
                    <button
                      onClick={() => handleDetailClick(soal)}
                      disabled={isLoading}
                      className="flex items-center gap-1 px-3 py-1 text-xs bg-green-100 text-green-800 rounded hover:bg-green-200 transition-colors border border-green-200 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      <Eye className="w-3 h-3" />
                      Detail
                    </button>
                    <button
                      onClick={() => handleDeleteClick(soal)}
                      disabled={isLoading}
                      className="flex items-center gap-1 px-3 py-1 text-xs bg-red-100 text-red-800 rounded hover:bg-red-200 transition-colors border border-red-200 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      <Trash2 className="w-3 h-3" />
                      Hapus
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {filteredSoal.length === 0 && (
          <div className="text-center py-12 text-gray-500">
            <FileText className="w-12 h-12 mx-auto mb-4 text-gray-300" />
            <p className="text-lg font-medium">Tidak ada soal yang ditemukan</p>
            <p className="text-sm">Coba ubah kata kunci pencarian</p>
          </div>
        )}
      </div>

      {/* Modal Konfirmasi Hapus */}
      {showDeleteModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 p-4">
          <div className="bg-white rounded-lg shadow-xl p-6 max-w-md w-full">
            <h2 className="text-lg font-semibold mb-4 text-gray-800">Konfirmasi Hapus</h2>
            <p className="mb-6 text-gray-600">
              Apakah Anda yakin ingin menghapus soal:
            </p>
            <div className="bg-gray-50 p-3 rounded border mb-6">
              <p className="font-medium text-gray-900 text-sm">{soalToDelete?.pertanyaan}</p>
            </div>
            <div className="flex flex-col sm:flex-row justify-end gap-3">
              <button
                onClick={handleCancelDelete}
                disabled={isLoading}
                className="px-4 py-2 rounded bg-gray-200 text-gray-700 hover:bg-gray-300 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Batal
              </button>
              <button
                onClick={handleConfirmDelete}
                disabled={isLoading}
                className="px-4 py-2 rounded bg-red-600 text-white hover:bg-red-700 transition-colors flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isLoading && <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>}
                Hapus
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default KelolaSoal;