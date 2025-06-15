import React, { useState, useEffect } from 'react';
import { useNavigate } from "react-router-dom";
import { Search, Plus, Trash2, Eye, FileText, Image, CheckCircle, XCircle, CheckCircle2 } from 'lucide-react';

const KelolaSoal = () => {
  const [currentView, setCurrentView] = useState('list'); // 'list' or 'answers'
  const [selectedSoal, setSelectedSoal] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedJenjang, setSelectedJenjang] = useState('all');
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [soalToDelete, setSoalToDelete] = useState(null);
  const [alert, setAlert] = useState({ show: false, type: '', message: '' });
  const [isLoading, setIsLoading] = useState(false);

  const navigate = useNavigate();

  // Sample data soal CBT
  const [soalData, setSoalData] = useState([
    {
      id: 1,
      pertanyaan: "Apa rumus luas lingkaran?",
      tipe: "text",
      jenjang: "SD",
      kategori: "Matematika",
      tingkat: "Mudah",
      jawaban: [
        { id: 'a', teks: "π × r²", tipe: "text", benar: true },
        { id: 'b', teks: "2 × π × r", tipe: "text", benar: false },
        { id: 'c', teks: "π × d", tipe: "text", benar: false },
        { id: 'd', teks: "r²", tipe: "text", benar: false }
      ]
    },
    {
      id: 2,
      pertanyaan: "Manakah gambar yang menunjukkan segitiga siku-siku?",
      tipe: "text",
      jenjang: "SD",
      kategori: "Matematika",
      tingkat: "Sedang",
      jawaban: [
        { id: 'a', teks: "Gambar A", tipe: "image", url: "/placeholder-triangle-a.jpg", benar: false },
        { id: 'b', teks: "Gambar B", tipe: "image", url: "/placeholder-triangle-b.jpg", benar: true },
        { id: 'c', teks: "Gambar C", tipe: "image", url: "/placeholder-triangle-c.jpg", benar: false },
        { id: 'd', teks: "Gambar D", tipe: "image", url: "/placeholder-triangle-d.jpg", benar: false }
      ]
    },
    {
      id: 3,
      pertanyaan: "Sebutkan ibu kota Indonesia!",
      tipe: "text",
      jenjang: "SMP",
      kategori: "IPS",
      tingkat: "Mudah",
      jawaban: [
        { id: 'input', teks: "Jakarta", tipe: "input", benar: true }
      ]
    }
  ]);

  // Memoized filtered data untuk performa lebih baik
  const filteredSoal = React.useMemo(() => {
    return soalData.filter(soal => {
      const searchMatch = soal.pertanyaan.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         soal.kategori.toLowerCase().includes(searchTerm.toLowerCase());
      const jenjangMatch = selectedJenjang === 'all' || soal.jenjang === selectedJenjang;
      return searchMatch && jenjangMatch;
    });
  }, [soalData, searchTerm, selectedJenjang]);

  // Auto hide alert setelah 3 detik
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
    switch(tipe) {
      case 'text': return <FileText className="w-4 h-4 text-gray-600" />;
      case 'image': return <Image className="w-4 h-4 text-gray-600" />;
      default: return <FileText className="w-4 h-4 text-gray-600" />;
    }
  };

  const getTingkatColor = (tingkat) => {
    switch(tingkat) {
      case 'Mudah': return 'bg-green-100 text-green-800 border-green-200';
      case 'Sedang': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'Sulit': return 'bg-red-100 text-red-800 border-red-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  // Handler untuk edit soal
  const handleEditClick = (soal) => {
    if (!soal || !soal.id) {
      showAlert('error', 'Data soal tidak valid');
      return;
    }
    navigate(`/dashboard/editsoal/${soal.id}`);
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
      // Simulasi API call - ganti dengan actual API call
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

    // Validasi: pastikan ada jawaban benar untuk pilihan ganda
    if (selectedSoal.jawaban[0]?.tipe !== 'input') {
      const hasCorrectAnswer = selectedSoal.jawaban.some(jawab => jawab.benar);
      if (!hasCorrectAnswer) {
        showAlert('error', 'Pilih setidaknya satu jawaban yang benar!');
        return;
      }
    }

    setIsLoading(true);
    try {
      // Simulasi API call - ganti dengan actual API call
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

  // Render halaman kelola jawaban
  if (currentView === 'answers' && selectedSoal) {
    return (
      <div className="p-6 bg-white min-h-screen">
        <AlertNotification show={alert.show} type={alert.type} message={alert.message} />
        {isLoading && <LoadingOverlay />}
        
        {/* Header */}
        <div className="mb-6">
          <button 
            onClick={handleBackToList}
            className="text-blue-600 hover:text-blue-800 mb-4 flex items-center gap-2 transition-colors"
            disabled={isLoading}
          >
            ← Kembali ke Daftar Soal
          </button>
          <h2 className="text-xl font-semibold text-gray-800">Kelola Jawaban Soal</h2>
        </div>

        {/* Soal Info */}
        <div className="bg-gray-50 p-4 rounded-lg mb-6 border">
          <div className="flex items-start gap-3">
            {getTipeIcon(selectedSoal.tipe)}
            <div className="flex-1">
              <p className="text-gray-800 font-medium mb-2">{selectedSoal.pertanyaan}</p>
              <div className="flex flex-wrap gap-4 text-sm text-gray-600">
                <span>Jenjang: <span className="font-medium">{selectedSoal.jenjang}</span></span>
                <span>Kategori: <span className="font-medium">{selectedSoal.kategori}</span></span>
                <span className={`px-2 py-1 rounded text-xs border ${getTingkatColor(selectedSoal.tingkat)}`}>
                  {selectedSoal.tingkat}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Jawaban */}
        <div className="space-y-4">
          <h3 className="text-lg font-medium text-gray-800">Pilihan Jawaban</h3>
          
          {selectedSoal.jawaban?.map((jawab, index) => (
            <div key={jawab.id} className="border rounded-lg p-4 hover:bg-gray-50 transition-colors">
              <div className="flex items-start gap-3">
                <div className="flex items-center gap-2">
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
                
                <div className="flex-1">
                  {jawab.tipe === 'image' ? (
                    <div className="space-y-2">
                      <p className="text-gray-800">{jawab.teks}</p>
                      <div className="w-32 h-24 bg-gray-200 rounded border flex items-center justify-center">
                        <Image className="w-8 h-8 text-gray-400" />
                        <span className="sr-only">Preview gambar {jawab.teks}</span>
                      </div>
                    </div>
                  ) : (
                    <p className="text-gray-800">{jawab.teks}</p>
                  )}
                </div>
                
                {jawab.tipe !== 'input' && (
                  <button
                    onClick={() => handleAnswerCorrectToggle(jawab.id)}
                    disabled={isLoading}
                    className={`flex items-center gap-2 px-3 py-2 rounded text-sm font-medium transition-all ${
                      jawab.benar 
                        ? 'bg-green-100 text-green-800 border border-green-300 shadow-sm' 
                        : 'bg-gray-100 text-gray-600 border border-gray-300 hover:bg-gray-200 hover:shadow-sm'
                    } ${isLoading ? 'opacity-50 cursor-not-allowed' : ''}`}
                  >
                    <CheckCircle className="w-4 h-4" />
                    {jawab.benar ? 'Jawaban Benar' : 'Tandai Benar'}
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* Save Button */}
        <div className="mt-8 flex justify-end">
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
      </div>
    );
  }

  // Render halaman utama (list soal)
  return (
    <div className="p-6 bg-white min-h-screen">
      <AlertNotification show={alert.show} type={alert.type} message={alert.message} />
      {isLoading && <LoadingOverlay />}
      
      {/* Header */}
      <div className="mb-6">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold text-gray-800">Kelola Soal CBT</h2>
          <button 
            onClick={handleTambahSoal}
            className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors"
          >
            <Plus className="w-4 h-4" />
            Tambah Soal
          </button>
        </div>
        
        {/* Filters */}
        <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center">
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input
              type="text"
              placeholder="Cari soal atau kategori..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
          
          <select
            value={selectedJenjang}
            onChange={(e) => setSelectedJenjang(e.target.value)}
            className="px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            <option value="all">Semua Jenjang</option>
            <option value="SD">SD</option>
            <option value="SMP">SMP</option>
          </select>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
        <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
          <p className="text-blue-600 text-sm font-medium">Total Soal</p>
          <p className="text-2xl font-bold text-blue-800">{soalData.length}</p>
        </div>
        <div className="bg-green-50 p-4 rounded-lg border border-green-200">
          <p className="text-green-600 text-sm font-medium">Soal SD</p>
          <p className="text-2xl font-bold text-green-800">{soalData.filter(s => s.jenjang === 'SD').length}</p>
        </div>
        <div className="bg-purple-50 p-4 rounded-lg border border-purple-200">
          <p className="text-purple-600 text-sm font-medium">Soal SMP</p>
          <p className="text-2xl font-bold text-purple-800">{soalData.filter(s => s.jenjang === 'SMP').length}</p>
        </div>
      </div>

      {/* Soal List */}
      <div className="bg-white border rounded-lg overflow-hidden shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Soal
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Jenjang
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Aksi
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredSoal.map((soal) => (
                <tr key={soal.id} className="hover:bg-gray-50 transition-colors">
                  <td className="px-6 py-4">
                    <div className="flex items-start gap-3">
                      <div className="flex-1">
                        <p className="text-sm text-gray-800 font-medium leading-relaxed">
                          {soal.pertanyaan}
                        </p>
                        <p className="text-xs text-gray-500 mt-1">{soal.kategori}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="px-2 py-1 text-xs font-medium bg-blue-100 text-blue-800 rounded border border-blue-200">
                      {soal.jenjang}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center gap-2">
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
        </div>
        
        {filteredSoal.length === 0 && (
          <div className="text-center py-12 text-gray-500">
            <FileText className="w-12 h-12 mx-auto mb-4 text-gray-300" />
            <p className="text-lg font-medium">Tidak ada soal yang ditemukan</p>
            <p className="text-sm">Coba ubah kata kunci pencarian atau filter</p>
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
            <div className="flex justify-end gap-3">
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