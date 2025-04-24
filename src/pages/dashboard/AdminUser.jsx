import React, { useState, useEffect } from "react";
import {
  Card,
  CardBody,
  Typography,
  Button,
  Input,
  Select,
  Option,
} from "@material-tailwind/react";
import Swal from "sweetalert2";

export function Pesanan() {
  const [admins, setAdmins] = useState([]);
  const [formData, setFormData] = useState({
    id: null,
    full_name: "",
    email: "",
    role: "Admin",
    status: "Active",
  });
  const [isEditing, setIsEditing] = useState(false);

  // Dummy data untuk testing
  const dummyData = [
    {
      id: 1,
      full_name: "Budi Santoso",
      email: "budi@example.com",
      role: "Admin",
      status: "Active",
    },
    {
      id: 2,
      full_name: "Siti Aminah",
      email: "siti@example.com",
      role: "Super Admin",
      status: "Inactive",
    },
  ];

  // Simulasi fetch data dummy
  const fetchAllAdmins = () => {
    setAdmins(dummyData);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = () => {
    if (!formData.full_name || !formData.email) {
      Swal.fire({
        title: "Gagal!",
        text: "Nama dan Email wajib diisi.",
        icon: "error",
        confirmButtonText: "OK",
        buttonsStyling: false,
        customClass: {
          confirmButton: "bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600",
        },
      });
      return;
    }

    if (isEditing) {
      setAdmins((prev) =>
        prev.map((admin) =>
          admin.id === formData.id ? { ...admin, ...formData } : admin
        )
      );
      Swal.fire({
        title: "Berhasil!",
        text: "Data admin berhasil diperbarui.",
        icon: "success",
        confirmButtonText: "OK",
        buttonsStyling: false,
        customClass: {
          confirmButton: "bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600",
        },
      });
    } else {
      const newAdmin = {
        ...formData,
        id: Date.now(),
      };
      setAdmins((prev) => [...prev, newAdmin]);
      Swal.fire({
        title: "Berhasil!",
        text: "Data admin berhasil ditambahkan.",
        icon: "success",
        confirmButtonText: "OK",
        buttonsStyling: false,
        customClass: {
          confirmButton: "bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600",
        },
      });
    }
    resetForm();
  };

  const resetForm = () => {
    setFormData({
      id: null,
      full_name: "",
      email: "",
      role: "Admin",
      status: "Active",
    });
    setIsEditing(false);
  };

  const handleEdit = (data) => {
    setFormData(data);
    setIsEditing(true);
  };

  const handleDelete = (id) => {
    Swal.fire({
      title: "Konfirmasi Hapus",
      text: "Apakah Anda yakin ingin menghapus data ini? Data yang dihapus tidak dapat dikembalikan.",
      icon: "warning",
      showCancelButton: true,
      buttonsStyling: false,
      customClass: {
        actions: "flex space-x-4", // ✅ Tambahkan ini untuk memberi spasi antar tombol
        confirmButton: "bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600",
        cancelButton: "bg-gray-300 text-gray-700 px-4 py-2 rounded-md hover:bg-gray-400",
      },
      confirmButtonText: "Hapus",
      cancelButtonText: "Batal",
    }).then((result) => {
      if (result.isConfirmed) {
        setAdmins((prev) => prev.filter((admin) => admin.id !== id));
        Swal.fire({
          title: "Berhasil!",
          text: "Data admin berhasil dihapus.",
          icon: "success",
          confirmButtonText: "OK",
          buttonsStyling: false,
          customClass: {
            confirmButton: "bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600",
          },
        });
      }
    });
  };

  useEffect(() => {
    fetchAllAdmins();
  }, []);

  return (
    <div className="p-6 bg-gradient-to-br from-blue-50 to-blue-100 min-h-screen">
      <Card className="mb-6 shadow-lg">
        <CardBody>
          <Typography variant="h5" className="font-bold text-blue-800 mb-4">
            {isEditing ? "Edit Admin" : "Tambah Admin"}
          </Typography>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Input
              label="Nama Lengkap"
              name="full_name"
              value={formData.full_name}
              onChange={handleChange}
              className="border border-gray-300 rounded-md"
            />
            <Input
              label="Email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="border border-gray-300 rounded-md"
            />
            <Select
              label="Role"
              name="role"
              value={formData.role}
              onChange={(value) =>
                handleChange({ target: { name: "role", value } })
              }
              className="border border-gray-300 rounded-md"
            >
              <Option value="Admin">Admin</Option>
              <Option value="Super Admin">Super Admin</Option>
            </Select>
            <Select
              label="Status"
              name="status"
              value={formData.status}
              onChange={(value) =>
                handleChange({ target: { name: "status", value } })
              }
              className="border border-gray-300 rounded-md"
            >
              <Option value="Active">Active</Option>
              <Option value="Inactive">Inactive</Option>
            </Select>
          </div>
          <div className="flex justify-end gap-4 mt-4">
            <Button
              color={isEditing ? "blue" : "green"}
              onClick={handleSubmit}
              className="rounded-md"
            >
              {isEditing ? "Update" : "Tambah"}
            </Button>
            {isEditing && (
              <Button
                color="red"
                onClick={resetForm}
                className="rounded-md"
              >
                Batal
              </Button>
            )}
          </div>
        </CardBody>
      </Card>

      <Card className="shadow-lg">
        <CardBody>
          <Typography variant="h5" className="font-bold text-blue-800 mb-4">
            Daftar Admin
          </Typography>
          <div className="overflow-x-auto">
            <table className="w-full text-left border border-gray-300">
              <thead className="bg-blue-100">
                <tr>
                  {["Nama", "Email", "Role", "Status", "Aksi"].map((el) => (
                    <th
                      key={el}
                      className="py-3 px-4 border text-blue-800 font-semibold text-sm"
                    >
                      {el}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {admins.map((admin) => (
                  <tr
                    key={admin.id}
                    className="hover:bg-blue-50 transition duration-150"
                  >
                    <td className="py-3 px-4 border">{admin.full_name}</td>
                    <td className="py-3 px-4 border">{admin.email}</td>
                    <td className="py-3 px-4 border">{admin.role}</td>
                    <td className="py-3 px-4 border">{admin.status}</td>
                    <td className="py-3 px-4 border">
                      <div className="flex gap-2">
                        <Button
                          size="sm"
                          color="green"
                          onClick={() => handleEdit(admin)}
                          className="rounded-md"
                        >
                          Edit
                        </Button>
                        <Button
                          size="sm"
                          color="red"
                          onClick={() => handleDelete(admin.id)}
                          className="rounded-md"
                        >
                          Hapus
                        </Button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardBody>
      </Card>
    </div>
  );
}

export default Pesanan;