import {
  Card,
  CardBody,
  Typography,
  Button,
  Input,
  Textarea,
  Switch,
  Radio,
} from "@material-tailwind/react";
import React, { useState, useEffect } from "react";
import Swal from "sweetalert2";

export function Paket() {
  const [soalList, setSoalList] = useState([]);
  const [kategoriList, setKategoriList] = useState([]);
  const [previewItem, setPreviewItem] = useState(null);

  const [formData, setFormData] = useState({
    question: "",
    question_image: null,
    option_a: "",
    option_a_image: null,
    option_b: "",
    option_b_image: null,
    option_c: "",
    option_c_image: null,
    option_d: "",
    option_d_image: null,
    correct_answer: "",
    category_id: "",
    is_active: true,
    question_type: "multiple_choice",
  });

  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    fetchKategori();
    fetchSoal();
  }, []);

  const fetchSoal = () => {
    const dummySoal = [
      {
        id: 1,
        question: "Apa ibu kota Indonesia?",
        question_image: null,
        option_a: "Jakarta",
        option_a_image: null,
        option_b: "Bandung",
        option_b_image: null,
        option_c: "Surabaya",
        option_c_image: null,
        option_d: "Medan",
        option_d_image: null,
        correct_answer: "A",
        category_id: 1,
        category: { name: "Geografi" },
        is_active: true,
        question_type: "multiple_choice",
      },
      {
        id: 2,
        question: "Jelaskan proses fotosintesis!",
        correct_answer: "Proses fotosintesis adalah ...",
        category_id: 2,
        category: { name: "Biologi" },
        is_active: true,
        question_type: "essay",
      },
    ];
    setSoalList(dummySoal);
  };

  const fetchKategori = () => {
    const dummyKategori = [
      { id: 1, name: "Geografi" },
      { id: 2, name: "Biologi" },
      { id: 3, name: "Matematika" },
    ];
    setKategoriList(dummyKategori);
  };

  const handleChange = (e) => {
    const { name, value, type, checked, files } = e.target;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : files ? files[0] : value,
    });
  };

  const handleSubmit = () => {
    const requiredFields = ["question", "category_id", "question_type"];
    if (formData.question_type === "multiple_choice") {
      requiredFields.push("option_a", "option_b", "option_c", "option_d", "correct_answer");
    } else if (formData.question_type === "essay") {
      requiredFields.push("correct_answer");
    }

    if (requiredFields.some((field) => !formData[field])) {
      Swal.fire("Error", "Harap lengkapi semua kolom.", "error");
      return;
    }

    if (isEditing) {
      setSoalList((prev) =>
        prev.map((soal) =>
          soal.id === formData.id
            ? {
                ...soal,
                ...formData,
                category: kategoriList.find(
                  (kat) => kat.id === parseInt(formData.category_id)
                ),
              }
            : soal
        )
      );
      Swal.fire("Sukses", "Soal berhasil diperbarui!", "success");
    } else {
      const newSoal = {
        ...formData,
        id: soalList.length + 1,
        category: kategoriList.find(
          (kat) => kat.id === parseInt(formData.category_id)
        ),
      };
      setSoalList((prev) => [...prev, newSoal]);
      Swal.fire("Sukses", "Soal berhasil ditambahkan!", "success");
    }

    resetForm();
  };

  const handlePreview = (item) => {
    setPreviewItem(item);
  };

  const resetForm = () => {
    setFormData({
      question: "",
      question_image: null,
      option_a: "",
      option_a_image: null,
      option_b: "",
      option_b_image: null,
      option_c: "",
      option_c_image: null,
      option_d: "",
      option_d_image: null,
      correct_answer: "",
      category_id: "",
      is_active: true,
      question_type: "multiple_choice",
    });
    setIsEditing(false);
  };

  return (
    <div className="p-6 bg-gradient-to-br from-blue-50 to-blue-100 min-h-screen">
      {/* Form Tambah/Edit Soal */}
      <Card className="mb-6 shadow-lg">
        <CardBody>
          <Typography variant="h5" className="mb-4 font-bold text-blue-800 text-center">
            {isEditing ? "Edit Soal" : "Tambah Soal"}
          </Typography>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Textarea
              label="Pertanyaan"
              name="question"
              value={formData.question}
              onChange={handleChange}
              className="border border-gray-300 rounded-md"
            />
            <div>
              <label className="block mb-1 text-sm text-gray-700">Gambar Soal</label>
              <input
                type="file"
                name="question_image"
                accept="image/*"
                onChange={handleChange}
                className="w-full border border-gray-300 px-3 py-2 rounded-md"
              />
            </div>
            <div>
              <label className="block mb-1 text-sm text-gray-700">Jenis Soal</label>
              <select
                name="question_type"
                value={formData.question_type}
                onChange={handleChange}
                className="w-full border border-gray-300 px-3 py-2 rounded-md"
              >
                <option value="multiple_choice">Pilihan Ganda</option>
                <option value="essay">Esai</option>
              </select>
            </div>
            {formData.question_type === "multiple_choice" && (
              <>
                {["option_a", "option_b", "option_c", "option_d"].map((opt, index) => (
                  <div key={opt}>
                    <Input
                      label={`Pilihan ${String.fromCharCode(65 + index)}`}
                      name={opt}
                      value={formData[opt]}
                      onChange={handleChange}
                      className="border border-gray-300 rounded-md"
                    />
                    <label className="block mb-1 text-sm text-gray-700">Gambar Pilihan</label>
                    <input
                      type="file"
                      name={`${opt}_image`}
                      accept="image/*"
                      onChange={handleChange}
                      className="w-full border border-gray-300 px-3 py-2 rounded-md"
                    />
                    <label className="flex items-center gap-2 mt-1">
                      <Radio
                        name="correct_answer"
                        value={String.fromCharCode(65 + index)}
                        checked={formData.correct_answer === String.fromCharCode(65 + index)}
                        onChange={handleChange}
                        color="blue"
                      />
                      <Typography>Pilih sebagai jawaban benar</Typography>
                    </label>
                  </div>
                ))}
              </>
            )}
            {formData.question_type === "essay" && (
              <Textarea
                label="Jawaban Benar"
                name="correct_answer"
                value={formData.correct_answer}
                onChange={handleChange}
                className="border border-gray-300 rounded-md"
              />
            )}
            <div>
              <label className="block mb-1 text-sm text-gray-700">Kategori Soal</label>
              <select
                name="category_id"
                value={formData.category_id}
                onChange={handleChange}
                className="w-full border border-gray-300 px-3 py-2 rounded-md"
              >
                <option value="">Pilih Kategori</option>
                {kategoriList.map((kat) => (
                  <option key={kat.id} value={kat.id}>
                    {kat.name}
                  </option>
                ))}
              </select>
            </div>
            <div className="flex items-center">
              <Switch
                label="Aktif"
                checked={formData.is_active}
                name="is_active"
                onChange={handleChange}
              />
            </div>
          </div>
          <div className="flex justify-end gap-4 mt-4">
            <Button
              onClick={handleSubmit}
              color={isEditing ? "blue" : "green"}
              className="rounded-md"
            >
              {isEditing ? "Update" : "Tambah"}
            </Button>
            {isEditing && (
              <Button onClick={resetForm} color="red" className="rounded-md">
                Batal
              </Button>
            )}
          </div>
        </CardBody>
      </Card>

      {/* Daftar Soal */}
      <Card className="shadow-lg">
        <CardBody>
          <Typography variant="h5" className="mb-4 font-bold text-blue-800 text-center">
            Daftar Soal
          </Typography>
          <div className="overflow-x-auto">
            <table className="min-w-full text-left border border-gray-300">
              <thead className="bg-blue-100">
                <tr>
                  <th className="py-3 px-4 border">Pertanyaan</th>
                  <th className="py-3 px-4 border">Kategori</th>
                  <th className="py-3 px-4 border">Aksi</th>
                </tr>
              </thead>
              <tbody>
                {soalList.map((soal) => (
                  <tr
                    key={soal.id}
                    className="hover:bg-blue-50 transition duration-150"
                  >
                    <td className="py-3 px-4 border max-w-xs overflow-hidden text-ellipsis whitespace-nowrap">
                      {soal.question}
                    </td>
                    <td className="py-3 px-4 border">
                      {soal.category?.name || "-"}
                    </td>
                    <td className="py-3 px-4 border">
                      <Button
                        size="sm"
                        color="blue"
                        onClick={() => handlePreview(soal)}
                        className="mr-2 rounded-md"
                      >
                        Preview
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardBody>
      </Card>

      {/* Preview Soal */}
      {previewItem && (
        <Card className="mt-6 shadow-lg">
          <CardBody>
            <Typography variant="h5" className="mb-4 font-bold text-blue-800 text-center">
              Preview Soal
            </Typography>
            <Typography className="text-gray-800">{previewItem.question}</Typography>
            {previewItem.question_image && (
              <img
                src={URL.createObjectURL(previewItem.question_image)}
                alt="Gambar Soal"
                className="mt-4 max-w-xs h-auto rounded-md"
              />
            )}
            {previewItem.question_type === "multiple_choice" && (
              <div className="mt-4">
                {["A", "B", "C", "D"].map((opt) => (
                  <Typography key={opt} className="text-gray-700">
                    {opt}. {previewItem[`option_${opt.toLowerCase()}`]}
                  </Typography>
                ))}
              </div>
            )}
            {previewItem.question_type === "essay" && (
              <Typography className="mt-4 text-gray-700">
                Jawaban: {previewItem.correct_answer}
              </Typography>
            )}
          </CardBody>
        </Card>
      )}
    </div>
  );
}

export default Paket;