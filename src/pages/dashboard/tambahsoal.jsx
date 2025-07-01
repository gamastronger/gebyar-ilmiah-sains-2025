import React, { useState, useEffect } from "react";
import { FileText, Image, CheckCircle2 } from "lucide-react";

const defaultJawaban = [
  { id: "a", tipe: "text", teks: "", benar: false, gambar: null },
  { id: "b", tipe: "text", teks: "", benar: false, gambar: null },
  { id: "c", tipe: "text", teks: "", benar: false, gambar: null },
  { id: "d", tipe: "text", teks: "", benar: false, gambar: null },
];

const TambahSoal = ({
  show,
  onClose,
  onSubmit,
  jenjang,
  showAlert,
}) => {
  const [form, setForm] = useState({
    pertanyaan: "",
    tipeSoal: "text",
    gambarSoal: null,
    jenjang: jenjang || "SD",
    tipeJawaban: "text",
    jawaban: [...defaultJawaban],
  });

  useEffect(() => {
    if (show) {
      setForm({
        pertanyaan: "",
        tipeSoal: "text",
        gambarSoal: null,
        jenjang: jenjang || "SD",
        tipeJawaban: "text",
        jawaban: [...defaultJawaban],
      });
    }
  }, [show, jenjang]);

  const handleTipeJawabanChange = (tipe) => {
    setForm((prev) => ({
      ...prev,
      tipeJawaban: tipe,
      jawaban:
        tipe === "input"
          ? [{ id: "input", tipe: "input", teks: "", benar: true, gambar: null }]
          : [
              { id: "a", tipe, teks: "", benar: false, gambar: null },
              { id: "b", tipe, teks: "", benar: false, gambar: null },
              { id: "c", tipe, teks: "", benar: false, gambar: null },
              { id: "d", tipe, teks: "", benar: false, gambar: null },
            ],
    }));
  };

  const handleSetJawabanBenar = (idx) => {
    setForm((prev) => ({
      ...prev,
      jawaban: prev.jawaban.map((j, i) =>
        prev.tipeJawaban === "input"
          ? { ...j, benar: true }
          : { ...j, benar: i === idx }
      ),
    }));
  };

  const handleJawabanChange = (idx, value, file) => {
    setForm((prev) => ({
      ...prev,
      jawaban: prev.jawaban.map((j, i) =>
        i === idx
          ? {
              ...j,
              teks: file ? file.name : value,
              gambar: file || null,
            }
          : j
      ),
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!form.pertanyaan.trim()) {
      showAlert("error", "Pertanyaan wajib diisi!");
      return;
    }
    if (form.tipeSoal === "image" && !form.gambarSoal) {
      showAlert("error", "Gambar soal wajib diunggah!");
      return;
    }
    if (
      form.tipeJawaban !== "input" &&
      !form.jawaban.some((j) => j.benar)
    ) {
      showAlert("error", "Pilih satu jawaban benar!");
      return;
    }
    if (form.jawaban.some((j) => !j.teks.trim() && !j.gambar)) {
      showAlert("error", "Semua jawaban harus diisi!");
      return;
    }

    const newSoal = {
      id: Date.now(),
      pertanyaan: form.pertanyaan,
      tipe: form.tipeSoal,
      jenjang: form.jenjang,
      jawaban: form.jawaban.map((j) => ({
        ...j,
        url: j.gambar ? URL.createObjectURL(j.gambar) : undefined,
      })),
    };
    onSubmit(newSoal);
    onClose();
    showAlert("success", "Soal berhasil ditambahkan!");
  };

  if (!show) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center sm:justify-end bg-black bg-opacity-40 sm:pr-40">
      <form
        onSubmit={handleSubmit}
        className="bg-white rounded-lg shadow-xl w-full max-w-2xl relative flex flex-col max-h-[95vh] sm:max-h-[90vh] min-h-0
        mx-2 sm:mx-0"
        style={{ minWidth: "0" }}
      >
        <button
          type="button"
          onClick={onClose}
          className="absolute top-3 right-4 text-gray-400 hover:text-red-500 text-xl"
          aria-label="Tutup"
        >
          ×
        </button>
        <h3 className="text-lg font-semibold mb-6 text-gray-800 px-4 sm:px-8 pt-8">Tambah Soal Baru</h3>
        {/* Satu scroll untuk seluruh form */}
        <div className="flex-1 px-4 sm:px-8 pb-8 overflow-y-auto">
          {/* Tipe Soal */}
          <div className="mb-4">
            <label className="block text-gray-700 mb-2 font-medium">Tipe Soal</label>
            <div className="flex flex-col sm:flex-row gap-2 sm:gap-4">
              <label className="flex items-center gap-2">
                <input
                  type="radio"
                  name="tipeSoal"
                  value="text"
                  checked={form.tipeSoal === "text"}
                  onChange={() => setForm((f) => ({ ...f, tipeSoal: "text", gambarSoal: null }))}
                  className="accent-blue-600"
                />
                <FileText className="w-4 h-4" /> Text
              </label>
              <label className="flex items-center gap-2">
                <input
                  type="radio"
                  name="tipeSoal"
                  value="image"
                  checked={form.tipeSoal === "image"}
                  onChange={() => setForm((f) => ({ ...f, tipeSoal: "image" }))
                  }
                  className="accent-blue-600"
                />
                <Image className="w-4 h-4" /> Gambar
              </label>
            </div>
            {form.tipeSoal === "image" && (
              <div className="mt-2">
                <input
                  type="file"
                  accept="image/*"
                  onChange={(e) =>
                    setForm((f) => ({
                      ...f,
                      gambarSoal: e.target.files[0] || null,
                    }))
                  }
                  className="block"
                  required
                />
                {form.gambarSoal && (
                  <img
                    src={URL.createObjectURL(form.gambarSoal)}
                    alt="Preview"
                    className="w-full max-w-xs h-24 object-contain border rounded mt-2"
                  />
                )}
              </div>
            )}
          </div>
          {/* Pertanyaan */}
          <div className="mb-4">
            <label className="block text-gray-700 mb-2 font-medium">Pertanyaan</label>
            <textarea
              className="w-full border border-gray-300 rounded px-3 py-2 focus:ring-2 focus:ring-blue-500"
              value={form.pertanyaan}
              onChange={(e) => setForm((f) => ({ ...f, pertanyaan: e.target.value }))}
              rows={2}
              required
            />
          </div>
          {/* Jenjang */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-4">
            <div>
              <label className="block text-gray-700 mb-2 font-medium">Jenjang</label>
              <select
                className="w-full border border-gray-300 rounded px-3 py-2 focus:ring-2 focus:ring-blue-500"
                value={form.jenjang}
                onChange={(e) => setForm((f) => ({ ...f, jenjang: e.target.value }))}
              >
                <option value="SD">SD</option>
                <option value="SMP">SMP</option>
              </select>
            </div>
          </div>
          {/* Pilihan Jawaban */}
          <div className="mb-4">
            <label className="block text-gray-700 mb-2 font-medium">Tipe Jawaban</label>
            <div className="flex flex-col sm:flex-row gap-2 sm:gap-4 mb-2">
              <label className="flex items-center gap-2">
                <input
                  type="radio"
                  name="tipeJawaban"
                  value="text"
                  checked={form.tipeJawaban === "text"}
                  onChange={() => handleTipeJawabanChange("text")}
                  className="accent-blue-600"
                />
                <FileText className="w-4 h-4" /> Text
              </label>
              <label className="flex items-center gap-2">
                <input
                  type="radio"
                  name="tipeJawaban"
                  value="image"
                  checked={form.tipeJawaban === "image"}
                  onChange={() => handleTipeJawabanChange("image")}
                  className="accent-blue-600"
                />
                <Image className="w-4 h-4" /> Gambar
              </label>
              <label className="flex items-center gap-2">
                <input
                  type="radio"
                  name="tipeJawaban"
                  value="input"
                  checked={form.tipeJawaban === "input"}
                  onChange={() => handleTipeJawabanChange("input")}
                  className="accent-blue-600"
                />
                <span className="font-medium">Isian</span>
              </label>
            </div>
            <div className="space-y-3">
              {form.jawaban.map((j, idx) => (
                <div
                  key={j.id}
                  className={`flex flex-col sm:flex-row items-start sm:items-center gap-3 p-3 rounded-lg border ${
                    j.benar
                      ? "bg-green-50 border-green-300"
                      : "bg-gray-50 border-gray-200"
                  }`}
                >
                  {form.tipeJawaban === "image" ? (
                    <>
                      <input
                        type="file"
                        accept="image/*"
                        onChange={(e) =>
                          handleJawabanChange(idx, "", e.target.files[0])
                        }
                        className="block"
                        required
                      />
                      {j.gambar && (
                        <img
                          src={URL.createObjectURL(j.gambar)}
                          alt="Preview"
                          className="w-full max-w-[80px] h-12 object-contain border rounded"
                        />
                      )}
                    </>
                  ) : (
                    <input
                      type={form.tipeJawaban === "text" ? "text" : "number"}
                      className="flex-1 border border-gray-300 rounded px-3 py-2 focus:ring-2 focus:ring-blue-500"
                      value={j.teks}
                      onChange={(e) => handleJawabanChange(idx, e.target.value)}
                      placeholder={
                        form.tipeJawaban === "input"
                          ? "Jawaban isian"
                          : `Jawaban ${String.fromCharCode(65 + idx)}`
                      }
                      required
                    />
                  )}
                  <button
                    type="button"
                    onClick={() => handleSetJawabanBenar(idx)}
                    className={`flex items-center gap-1 px-3 py-1 rounded text-xs font-medium transition-colors mt-2 sm:mt-0
                    ${
                      j.benar
                        ? "bg-green-600 text-white"
                        : "bg-gray-200 text-gray-700 hover:bg-green-100 hover:text-green-700"
                    }`}
                  >
                    <CheckCircle2 className="w-4 h-4" />
                    {j.benar ? "Benar" : "Set Benar"}
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>
        {/* Submit & Batalkan */}
        <div className="flex flex-col sm:flex-row justify-end gap-3 px-4 sm:px-8 pb-8">
          <button
            type="button"
            onClick={onClose}
            className="px-6 py-2 bg-red-100 text-red-700 rounded hover:bg-red-200 transition-colors flex items-center gap-2 font-semibold shadow-sm"
          >
            Batalkan
          </button>
          <button
            type="submit"
            className="px-6 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors flex items-center gap-2 font-semibold shadow-sm"
          >
            Simpan Soal
          </button>
        </div>
      </form>
    </div>
  );
};

export default TambahSoal;