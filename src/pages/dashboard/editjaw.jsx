import React, { useState } from 'react';
import { Edit, Trash2, Eye, CheckCircle } from 'lucide-react';

const EditJawabanModal = ({ jawabanData, onClose, onSave }) => {
  const [soal, setSoal] = useState(jawabanData.soal);
  const [jawaban, setJawaban] = useState(jawabanData.jawaban);
  const [kategori, setKategori] = useState(jawabanData.kategori);
  const [tingkat, setTingkat] = useState(jawabanData.tingkat);

  const handleSave = () => {
    // Call the save function passed as prop
    onSave({
      ...jawabanData,
      soal,
      jawaban,
      kategori,
      tingkat
    });
    onClose(); // Close the modal after save
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-xl p-6 w-full max-w-2xl mx-4 max-h-[90vh] overflow-y-auto">
        <div className="flex justify-between items-center mb-6">
          <h3 className="text-xl font-bold text-gray-900">Edit Jawaban</h3>
          <button 
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600"
          >
            ×
          </button>
        </div>

        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Soal/Pertanyaan
            </label>
            <textarea 
              value={soal}
              onChange={(e) => setSoal(e.target.value)}
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              rows="3"
              placeholder="Masukkan soal atau pertanyaan..."
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Jawaban
            </label>
            <textarea 
              value={jawaban}
              onChange={(e) => setJawaban(e.target.value)}
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              rows="4"
              placeholder="Masukkan jawaban yang benar..."
            />
          </div>
          
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Kategori
              </label>
              <select 
                value={kategori}
                onChange={(e) => setKategori(e.target.value)}
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option>Pilih Kategori</option>
                <option>Pemrograman Dasar</option>
                <option>Web Development</option>
                <option>Database</option>
                <option>Algoritma</option>
              </select>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Tingkat Kesulitan
              </label>
              <select 
                value={tingkat}
                onChange={(e) => setTingkat(e.target.value)}
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option>Pilih Tingkat</option>
                <option>Mudah</option>
                <option>Sedang</option>
                <option>Sulit</option>
              </select>
            </div>
          </div>
          
          <div className="flex justify-end space-x-3 pt-4">
            <button 
              onClick={onClose}
              className="px-4 py-2 text-gray-600 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors"
            >
              Batal
            </button>
            <button 
              onClick={handleSave}
              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              Simpan Perubahan
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

const KelolaJawaban = () => {
  const [activeTab, setActiveTab] = useState('admin');
  const [searchTerm, setSearchTerm] = useState('');
  const [showEditModal, setShowEditModal] = useState(false);
  const [selectedJawaban, setSelectedJawaban] = useState(null);

  const mockJawaban = [
    {
      id: 1,
      soal: "Apa yang dimaksud dengan algoritma dalam pemrograman?",
      jawaban: "Algoritma adalah langkah-langkah logis yang terstruktur untuk menyelesaikan suatu masalah",
      kategori: "Pemrograman Dasar",
      tingkat: "Mudah",
      status: "Aktif",
      created: "2024-06-01",
      createdBy: "Admin"
    },
    {
      id: 2,
      soal: "Jelaskan perbedaan antara HTML dan CSS",
      jawaban: "HTML digunakan untuk struktur konten web, sedangkan CSS digunakan untuk styling dan layout",
      kategori: "Web Development",
      tingkat: "Mudah",
      status: "Aktif",
      created: "2024-06-02",
      createdBy: "Admin"
    },
    {
      id: 3,
      soal: "Apa itu database normalisasi?",
      jawaban: "Normalisasi adalah proses mengorganisir data dalam database untuk mengurangi redundansi",
      kategori: "Database",
      tingkat: "Sedang",
      status: "Draft",
      created: "2024-06-03",
      createdBy: "Admin"
    }
  ];

  const handleEditClick = (jawabanData) => {
    setSelectedJawaban(jawabanData);
    setShowEditModal(true);
  };

  const handleSaveEdit = (updatedJawaban) => {
    // Save updated jawaban logic
    console.log("Jawaban updated:", updatedJawaban);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Jawaban List */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200">
        <div className="px-6 py-4 border-b border-gray-200">
          <h3 className="text-lg font-semibold text-gray-900">Daftar Jawaban</h3>
        </div>
        
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Soal & Jawaban
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Kategori
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Tanggal
                </th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Aksi
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {mockJawaban.map((item) => (
                <tr key={item.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4">
                    <div className="max-w-xs">
                      <p className="text-sm font-medium text-gray-900 truncate">
                        {item.soal}
                      </p>
                      <p className="text-sm text-gray-500 mt-1 truncate">
                        {item.jawaban}
                      </p>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                      {item.kategori}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${item.status === 'Aktif' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'}`}>
                      {item.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {item.created}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    <div className="flex items-center justify-end space-x-2">
                      <button className="text-blue-600 hover:text-blue-900 p-1">
                        <Eye className="h-4 w-4" />
                      </button>
                      <button
                        onClick={() => handleEditClick(item)}
                        className="text-green-600 hover:text-green-900 p-1"
                      >
                        <Edit className="h-4 w-4" />
                      </button>
                      <button className="text-red-600 hover:text-red-900 p-1">
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Edit Modal */}
      {showEditModal && (
        <EditJawabanModal 
          jawabanData={selectedJawaban} 
          onClose={() => setShowEditModal(false)} 
          onSave={handleSaveEdit} 
        />
      )}
    </div>
  );
};

export default KelolaJawaban;
