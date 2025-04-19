import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import {
  Card,
  CardBody,
  Typography,
  Button,
  Input,
  Select,
  Option,
} from "@material-tailwind/react";

const dummyParticipants = [
  {
    id: 1,
    nama: "John Doe",
    email: "johndoe@example.com",
    whatsapp: "081234567890",
    alamat: "Jl. Mawar No. 123, Jakarta",
    sekolah: "SMA Negeri 1 Jakarta",
    nisn: "1234567890",
    kelas: "12 IPA 1",
  },
  {
    id: 2,
    nama: "Jane Smith",
    email: "janesmith@example.com",
    whatsapp: "082345678901",
    alamat: "Jl. Melati No. 45, Bandung",
    sekolah: "SMA Negeri 2 Bandung",
    nisn: "0987654321",
    kelas: "12 IPS 2",
  },
];

export default function PortofolioDetail() {
  const { id } = useParams();
  const [formData, setFormData] = useState({});
  const [errors, setErrors] = useState({});

  useEffect(() => {
    const data = dummyParticipants.find((item) => item.id === parseInt(id));
    if (data) {
      setFormData(data);
    }
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Validasi sederhana
    const newErrors = {};
    Object.keys(formData).forEach((key) => {
      if (!formData[key]) newErrors[key] = true;
    });
    setErrors(newErrors);
    if (Object.keys(newErrors).length === 0) {
      alert("Data berhasil disimpan!");
    }
  };

  return (
    <div className="p-8 bg-white min-h-screen flex justify-center">
      <Card className="w-full max-w-5xl shadow-xl rounded-2xl">
        <CardBody>
          <div className="flex justify-between items-center mb-6">
            <div>
              <Typography variant="h5" className="font-bold text-gray-800">
                Edit Data Peserta
              </Typography>
              <Typography variant="small" className="text-gray-500">
                Silakan perbarui data peserta sesuai kebutuhan.
              </Typography>
            </div>
            <Button variant="outlined" className="rounded-full">Edit</Button>
          </div>

          <form onSubmit={handleSubmit} className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm">
            <Input label="Nama Lengkap" name="nama" value={formData.nama || ''} onChange={handleChange} error={errors.nama} />
            <Input label="Email" type="email" name="email" value={formData.email || ''} onChange={handleChange} error={errors.email} />
            <Input label="Nomor WhatsApp" name="whatsapp" value={formData.whatsapp || ''} onChange={handleChange} error={errors.whatsapp} />
            <Input label="Alamat" name="alamat" value={formData.alamat || ''} onChange={handleChange} error={errors.alamat} />
            <Input label="Asal Sekolah" name="sekolah" value={formData.sekolah || ''} onChange={handleChange} error={errors.sekolah} />
            <Input label="NISN" name="nisn" value={formData.nisn || ''} onChange={handleChange} error={errors.nisn} />
            <Input label="Kelas" name="kelas" value={formData.kelas || ''} onChange={handleChange} error={errors.kelas} />
          </form>

          <div className="flex justify-end mt-6 gap-3">
            <Button variant="text" className="rounded-md">Cancel</Button>
            <Button type="submit" onClick={handleSubmit} className="rounded-md bg-black text-white">Save</Button>
          </div>
        </CardBody>
      </Card>
    </div>
  );
}
