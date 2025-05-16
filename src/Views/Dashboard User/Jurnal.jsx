import React, { useState } from "react";
import NavDashUser from "../../Component/NavDashUser";
import { FiUpload, FiFileText, FiAlertCircle, FiCheckCircle } from "react-icons/fi";
import { motion } from "framer-motion";

function Jurnal() {
  const [selectedFile, setSelectedFile] = useState(null);
  const [isUploading, setIsUploading] = useState(false);
  const [uploadStatus, setUploadStatus] = useState(null);
  const [judul, setJudul] = useState('');
  const [deskripsi, setDeskripsi] = useState('');

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const validTypes = [
        "application/pdf",
        "application/msword",
        "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
      ];
      if (!validTypes.includes(file.type)) {
        setUploadStatus({
          success: false,
          message: "Format file tidak didukung. Gunakan PDF atau DOC/DOCX.",
        });
        return;
      }

      if (file.size > 5 * 1024 * 1024) {
        setUploadStatus({
          success: false,
          message: "Ukuran file terlalu besar. Maksimal 5MB.",
        });
        return;
      }

      setSelectedFile(file);
      setUploadStatus(null);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!selectedFile) {
      setUploadStatus({
        success: false,
        message: "Silakan pilih file jurnal terlebih dahulu.",
      });
      return;
    }

    if (!judul.trim()) {
      setUploadStatus({
        success: false,
        message: "Judul jurnal tidak boleh kosong.",
      });
      return;
    }

    setIsUploading(true);

    setTimeout(() => {
      setIsUploading(false);
      setUploadStatus({
        success: true,
        message: "Jurnal berhasil diunggah!",
      });

      setSelectedFile(null);
      setJudul("");
      setDeskripsi("");
      document.getElementById("file-input").value = "";
    }, 2000);
  };

  return (
    <>
      <NavDashUser />
      {/* Alert upload status di tengah layar */}
      {uploadStatus && (
        <div className="fixed inset-0 flex items-center justify-center z-50 bg-black/40">
          <div
            className={
              `p-4 rounded-xl shadow-2xl flex items-center gap-3 w-full max-w-md text-center border-2 ` +
              (uploadStatus.success
                ? "bg-gradient-to-r from-green-100 to-green-50 text-green-800 border-green-200"
                : "bg-gradient-to-r from-red-100 to-red-50 text-red-800 border-red-200")
            }
            style={{ animation: "fadeInDown 0.5s" }}
          >
            {uploadStatus.success ? (
              <FiCheckCircle className="h-6 w-6 flex-shrink-0 text-green-500 animate-bounce" />
            ) : (
              <FiAlertCircle className="h-6 w-6 flex-shrink-0 text-red-500 animate-pulse" />
            )}
            <span className="font-semibold">{uploadStatus.message}</span>
          </div>
          <style>
            {`
              @keyframes fadeInDown {
                from { opacity: 0; transform: translateY(-20px);}
                to { opacity: 1; transform: translateY(0);}
              }
            `}
          </style>
        </div>
      )}

      <div className="pt-20 min-h-screen bg-gradient-to-br from-[#4f1c8f] via-[#5b21b6] to-[#2563eb]">
        <div className="max-w-4xl mx-auto px-4 py-8">
          <motion.div
            initial={{ scale: 0.96, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.2, ease: "easeOut" }}
            className="bg-white/90 rounded-xl shadow-2xl overflow-hidden border border-purple-100"
          >
            {/* Header */}
            <div className="bg-gradient-to-r from-purple-700 via-purple-600 to-blue-600 px-6 py-4">
              <h1 className="text-2xl font-bold text-white flex items-center drop-shadow">
                <FiFileText className="mr-2" />
                Upload Jurnal
              </h1>
              <p className="text-purple-100 mt-1">
                Unggah dokumen jurnal penelitian Anda di sini
              </p>
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit} className="p-6">
              {/* Judul */}
              <div className="mb-6">
                <label
                  htmlFor="judul"
                  className="block text-sm font-medium text-purple-800 mb-1"
                >
                  Judul Jurnal <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  id="judul"
                  value={judul}
                  onChange={(e) => setJudul(e.target.value)}
                  className="w-full px-4 py-2 border border-purple-200 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500 bg-white"
                  placeholder="Masukkan judul jurnal"
                  required
                />
              </div>

              {/* Deskripsi */}
              <div className="mb-6">
                <label
                  htmlFor="deskripsi"
                  className="block text-sm font-medium text-purple-800 mb-1"
                >
                  Deskripsi (Opsional)
                </label>
                <textarea
                  id="deskripsi"
                  value={deskripsi}
                  onChange={(e) => setDeskripsi(e.target.value)}
                  rows="3"
                  className="w-full px-4 py-2 border border-purple-200 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500 bg-white"
                  placeholder="Deskripsi singkat tentang jurnal Anda"
                />
              </div>

              {/* File Upload */}
              <div className="mb-6">
                <label className="block text-sm font-medium text-purple-800 mb-1">
                  File Jurnal <span className="text-red-500">*</span>
                </label>

                <div className="border-2 border-dashed border-purple-300 rounded-lg p-8 text-center hover:border-purple-400 transition-colors bg-white/80">
                  <input
                    type="file"
                    id="file-input"
                    onChange={handleFileChange}
                    className="hidden"
                    accept=".pdf,.doc,.docx"
                  />

                  <div className="flex flex-col items-center">
                    <FiUpload className="h-12 w-12 text-purple-500 mb-3" />

                    <p className="mb-2 text-sm text-purple-800">
                      <span className="font-semibold">Klik untuk unggah</span> atau drag & drop
                    </p>

                    <p className="text-xs text-purple-400 mb-4">
                      PDF, DOC, atau DOCX (Maks. 5MB)
                    </p>

                    <button
                      type="button"
                      onClick={() => document.getElementById("file-input").click()}
                      className="px-4 py-2 bg-gradient-to-r from-purple-600 to-blue-500 text-white rounded-lg hover:from-purple-700 hover:to-blue-600 transition-colors"
                    >
                      Pilih File
                    </button>
                  </div>
                </div>

                {/* File info */}
                {selectedFile && (
                  <div className="mt-3 flex items-center text-sm text-purple-700 bg-purple-50 p-3 rounded-lg">
                    <FiFileText className="h-5 w-5 text-purple-600 mr-2" />
                    <div>
                      <p className="font-medium">{selectedFile.name}</p>
                      <p className="text-xs text-purple-400">
                        {(selectedFile.size / 1024 / 1024).toFixed(2)} MB • {selectedFile.type}
                      </p>
                    </div>
                  </div>
                )}
              </div>

              {/* Info Box */}
              <div className="mb-6 bg-gradient-to-r from-blue-50 via-purple-50 to-purple-100 p-4 rounded-lg text-sm text-blue-800 border border-blue-100">
                <h3 className="font-semibold mb-2 flex items-center text-purple-700">
                  <FiAlertCircle className="h-4 w-4 mr-1" /> Informasi Penting
                </h3>
                <ul className="list-disc list-inside space-y-1 text-blue-700">
                  <li>Format file yang diterima: PDF, DOC, atau DOCX</li>
                  <li>Ukuran maksimal file: 5MB</li>
                  <li>Pastikan jurnal sudah final dan siap untuk di-review</li>
                  <li>Setelah upload, Anda masih dapat mengedit metadata jurnal</li>
                </ul>
              </div>

              {/* Submit Button */}
              <div className="flex justify-end">
                <button
                  type="submit"
                  disabled={isUploading}
                  className={`px-6 py-3 bg-gradient-to-r from-purple-600 to-blue-500 text-white rounded-lg font-medium flex items-center ${
                    isUploading
                      ? "opacity-70 cursor-not-allowed"
                      : "hover:from-purple-700 hover:to-blue-600"
                  }`}
                >
                  {isUploading ? (
                    <>
                      <div className="h-5 w-5 border-2 border-t-transparent border-white rounded-full animate-spin mr-2"></div>
                      Mengunggah...
                    </>
                  ) : (
                    <>
                      <FiUpload className="h-5 w-5 mr-2" />
                      Unggah Jurnal
                    </>
                  )}
                </button>
              </div>
            </form>
          </motion.div>
        </div>
      </div>
    </>
  );
}

export default Jurnal;