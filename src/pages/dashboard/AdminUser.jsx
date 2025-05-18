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
import api from "../../configs/api"; // pastikan path ini benar

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
  const [searchTerm, setSearchTerm] = useState("");

  // Fetch all admins from backend
  const fetchAllAdmins = async () => {
    try {
      const res = await fetch(`${api.URL_API}/api/users?role=admin`, {
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${localStorage.getItem("token")}`,
        },
        credentials: "include",
      });
      const data = await res.json();
      if (res.ok) {
        setAdmins(data);
      } else {
        Swal.fire("Gagal", data.message || "Gagal mengambil data admin", "error");
      }
    } catch (err) {
      Swal.fire("Gagal", "Tidak dapat terhubung ke server", "error");
    }
  };

  // Handle input change
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // Submit (add or update)
  const handleSubmit = async () => {
    if (!formData.full_name || !formData.email) {
      Swal.fire({
        title: "Gagal!",
        text: "Nama dan Email wajib diisi.",
        icon: "error",
        confirmButtonText: "OK",
        buttonsStyling: false,
        customClass: {
          confirmButton: "bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition-all",
        },
      });
      return;
    }

    try {
      let res, data;
      if (isEditing) {
        res = await fetch(`${api.URL_API}/api/admins/${formData.id}`, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${localStorage.getItem("token")}`,
          },
          credentials: "include",
          body: JSON.stringify(formData),
        });
        data = await res.json();
      } else {
        res = await fetch(`${api.URL_API}/api/admins`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${localStorage.getItem("token")}`,
          },
          credentials: "include",
          body: JSON.stringify(formData),
        });
        data = await res.json();
      }

      if (res.ok) {
        Swal.fire({
          title: "Berhasil!",
          text: isEditing ? "Data admin berhasil diperbarui." : "Data admin berhasil ditambahkan.",
          icon: "success",
          confirmButtonText: "OK",
          buttonsStyling: false,
          customClass: {
            confirmButton: "bg-emerald-500 text-white px-4 py-2 rounded-lg hover:bg-emerald-600 transition-all",
          },
        });
        fetchAllAdmins();
        resetForm();
      } else {
        Swal.fire("Gagal", data.message || "Gagal menyimpan data admin", "error");
      }
    } catch (err) {
      Swal.fire("Gagal", "Tidak dapat terhubung ke server", "error");
    }
  };

  // Reset form
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

  // Edit admin
  const handleEdit = (data) => {
    setFormData(data);
    setIsEditing(true);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Delete admin
  const handleDelete = async (id) => {
    Swal.fire({
      title: "Konfirmasi Hapus",
      text: "Apakah Anda yakin ingin menghapus data ini? Data yang dihapus tidak dapat dikembalikan.",
      icon: "warning",
      showCancelButton: true,
      buttonsStyling: false,
      customClass: {
        actions: "flex space-x-4",
        confirmButton: "bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition-all",
        cancelButton: "bg-gray-300 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-400 transition-all",
      },
      confirmButtonText: "Hapus",
      cancelButtonText: "Batal",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          const res = await fetch(`${api.URL_API}/api/admins/${id}`, {
            method: "DELETE",
            headers: {
              "Content-Type": "application/json",
              "Authorization": `Bearer ${localStorage.getItem("token")}`,
            },
            credentials: "include",
          });
          const data = await res.json();
          if (res.ok) {
            Swal.fire({
              title: "Berhasil!",
              text: "Data admin berhasil dihapus.",
              icon: "success",
              confirmButtonText: "OK",
              buttonsStyling: false,
              customClass: {
                confirmButton: "bg-emerald-500 text-white px-4 py-2 rounded-lg hover:bg-emerald-600 transition-all",
              },
            });
            fetchAllAdmins();
          } else {
            Swal.fire("Gagal", data.message || "Gagal menghapus admin", "error");
          }
        } catch (err) {
          Swal.fire("Gagal", "Tidak dapat terhubung ke server", "error");
        }
      }
    });
  };

  // Filter admins based on search term
  const filteredAdmins = admins.filter((admin) =>
    admin.full_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    admin.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
    admin.role.toLowerCase().includes(searchTerm.toLowerCase()) ||
    admin.status.toLowerCase().includes(searchTerm.toLowerCase())
  );

  useEffect(() => {
    fetchAllAdmins();
  }, []);

  return (
    <div className="p-6 bg-gradient-to-br from-blue-50 to-indigo-50 min-h-screen">
      <div className="max-w-7xl mx-auto">
        <Typography variant="h4" className="font-bold text-indigo-900 mb-6 flex items-center">
          <i className="fas fa-user-shield mr-3 text-indigo-600"></i>
          Manajemen Admin
        </Typography>
        
        {/* Form Card */}
        <Card className="mb-8 shadow-lg border-t-4 border-indigo-500 rounded-lg overflow-hidden">
          <CardBody className="p-6">
            <Typography variant="h5" className="font-bold text-indigo-800 mb-6 flex items-center">
              <i className={`fas fa-${isEditing ? 'edit' : 'user-plus'} mr-2 text-indigo-600`}></i>
              {isEditing ? "Edit Admin" : "Tambah Admin Baru"}
            </Typography>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-1">
                <Typography variant="small" className="font-medium text-gray-700 mb-1">Nama Lengkap</Typography>
                <Input
                  size="lg"
                  placeholder="Masukkan nama lengkap"
                  name="full_name"
                  value={formData.full_name}
                  onChange={handleChange}
                  className="!border-gray-300 focus:!border-indigo-500"
                  labelProps={{
                    className: "hidden",
                  }}
                  icon={<i className="fas fa-user text-gray-400" />}
                />
              </div>
              
              <div className="space-y-1">
                <Typography variant="small" className="font-medium text-gray-700 mb-1">Email</Typography>
                <Input
                  size="lg"
                  type="email"
                  placeholder="Masukkan email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="!border-gray-300 focus:!border-indigo-500"
                  labelProps={{
                    className: "hidden",
                  }}
                  icon={<i className="fas fa-envelope text-gray-400" />}
                />
              </div>
              
              <div className="space-y-1">
                <Typography variant="small" className="font-medium text-gray-700 mb-1">Role</Typography>
                <Select
                  size="lg"
                  name="role"
                  value={formData.role}
                  onChange={(value) => handleChange({ target: { name: "role", value } })}
                  className="!border-gray-300"
                >
                  <Option value="Admin">Admin</Option>
                  <Option value="Super Admin">Super Admin</Option>
                </Select>
              </div>
              
              <div className="space-y-1">
                <Typography variant="small" className="font-medium text-gray-700 mb-1">Status</Typography>
                <Select
                  size="lg"
                  name="status"
                  value={formData.status}
                  onChange={(value) => handleChange({ target: { name: "status", value } })}
                  className="!border-gray-300"
                >
                  <Option value="Active">Active</Option>
                  <Option value="Inactive">Inactive</Option>
                </Select>
              </div>
            </div>
            
            <div className="flex justify-end gap-4 mt-8">
              {isEditing && (
                <Button
                  variant="outlined"
                  color="red"
                  onClick={resetForm}
                  className="rounded-lg flex items-center gap-2 px-5"
                >
                  <i className="fas fa-times"></i> Batal
                </Button>
              )}
              <Button
                color={isEditing ? "blue" : "green"}
                onClick={handleSubmit}
                className={`rounded-lg flex items-center gap-2 px-6 ${
                  isEditing ? 'bg-blue-600 hover:bg-blue-700' : 'bg-emerald-600 hover:bg-emerald-700'
                }`}
              >
                <i className={`fas fa-${isEditing ? 'save' : 'plus'}`}></i>
                {isEditing ? "Update" : "Tambah"}
              </Button>
            </div>
          </CardBody>
        </Card>

        {/* Table Card */}
        <Card className="shadow-lg rounded-lg overflow-hidden border border-gray-200">
          <CardBody className="p-0">
            <div className="bg-gradient-to-r from-indigo-600 to-blue-500 p-6">
              <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                <Typography variant="h5" className="font-bold text-white flex items-center">
                  <i className="fas fa-users mr-2"></i>
                  Daftar Admin
                </Typography>
                
                <div className="relative w-full md:w-64">
                  <Input
                    size="md"
                    placeholder="Cari admin..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="bg-white/90 !border-none rounded-lg pr-10"
                    labelProps={{
                      className: "hidden",
                    }}
                    containerProps={{
                      className: "min-w-0",
                    }}
                  />
                  <div className="absolute right-3 top-2.5 text-gray-500">
                    <i className="fas fa-search"></i>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="overflow-x-auto">
              <table className="w-full text-left">
                <thead>
                  <tr className="bg-gray-100 border-b border-gray-200">
                    {["Nama", "Email", "Role", "Status", "Aksi"].map((header) => (
                      <th
                        key={header}
                        className="py-4 px-6 text-indigo-900 font-semibold text-sm"
                      >
                        {header}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {filteredAdmins.length > 0 ? (
                    filteredAdmins.map((admin) => (
                      <tr
                        key={admin.id}
                        className="hover:bg-indigo-50/70 transition duration-150"
                      >
                        <td className="py-4 px-6 font-medium">{admin.full_name}</td>
                        <td className="py-4 px-6 text-gray-600">{admin.email}</td>
                        <td className="py-4 px-6">
                          <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                            admin.role === "Super Admin" 
                              ? "bg-purple-100 text-purple-800" 
                              : "bg-blue-100 text-blue-800"
                          }`}>
                            {admin.role === "Super Admin" && <i className="fas fa-crown mr-1 text-purple-500"></i>}
                            {admin.role === "Admin" && <i className="fas fa-user-shield mr-1 text-blue-500"></i>}
                            {admin.role}
                          </span>
                        </td>
                        <td className="py-4 px-6">
                          <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                            admin.status === "Active" 
                              ? "bg-green-100 text-green-800" 
                              : "bg-gray-100 text-gray-800"
                          }`}>
                            <span className={`w-2 h-2 mr-1.5 rounded-full ${
                              admin.status === "Active" ? "bg-green-500" : "bg-gray-500"
                            }`}></span>
                            {admin.status}
                          </span>
                        </td>
                        <td className="py-4 px-6">
                          <div className="flex gap-2">
                            <Button
                              size="sm"
                              className="bg-blue-500 hover:bg-blue-600 rounded-md flex items-center gap-1 py-1.5"
                              onClick={() => handleEdit(admin)}
                            >
                              <i className="fas fa-edit text-xs"></i>
                              <span>Edit</span>
                            </Button>
                            <Button
                              size="sm"
                              className="bg-red-500 hover:bg-red-600 rounded-md flex items-center gap-1 py-1.5"
                              onClick={() => handleDelete(admin.id)}
                            >
                              <i className="fas fa-trash-alt text-xs"></i>
                              <span>Hapus</span>
                            </Button>
                          </div>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan="5" className="py-8 text-center text-gray-500 italic">
                        {searchTerm ? (
                          <div className="flex flex-col items-center">
                            <i className="fas fa-search text-3xl mb-3 text-gray-400"></i>
                            <p>Tidak ada data admin yang sesuai dengan pencarian.</p>
                          </div>
                        ) : (
                          <div className="flex flex-col items-center">
                            <i className="fas fa-users text-3xl mb-3 text-gray-400"></i>
                            <p>Belum ada data admin.</p>
                          </div>
                        )}
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
            
            <div className="py-4 px-6 bg-gray-50 border-t border-gray-200 text-sm text-gray-500">
              Menampilkan {filteredAdmins.length} dari {admins.length} total admin
            </div>
          </CardBody>
        </Card>
      </div>
    </div>
  );
}

export default Pesanan;