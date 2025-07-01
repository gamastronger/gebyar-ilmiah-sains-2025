import React, { useState, useEffect } from "react";
import {
  Card,
  CardBody,
  Typography,
  Button,
  Input,
  Select,
  Option,
  Badge,
  Avatar,
  IconButton,
} from "@material-tailwind/react";
import { 
  PencilSquareIcon, 
  TrashIcon, 
  UserPlusIcon, 
  MagnifyingGlassIcon,
  UsersIcon,
  ChartBarIcon,
  UserCircleIcon,
  PlusIcon,
  XMarkIcon,
  CheckCircleIcon,
  ExclamationCircleIcon
} from '@heroicons/react/24/outline';
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
  const [showForm, setShowForm] = useState(false);

  // Dummy data dengan data yang lebih realistis
  const dummyData = [
    { id: 1, full_name: "Budi Santoso", email: "budi.santoso@company.com", role: "Admin", status: "Active" },
    { id: 2, full_name: "Siti Aminah", email: "siti.aminah@company.com", role: "Super Admin", status: "Active" },
    { id: 3, full_name: "Ahmad Rizki", email: "ahmad.rizki@company.com", role: "Admin", status: "Active" },
    { id: 4, full_name: "Maya Putri", email: "maya.putri@company.com", role: "Admin", status: "Inactive" },
    { id: 5, full_name: "Dedi Kurniawan", email: "dedi.k@company.com", role: "Super Admin", status: "Active" },
  ];

  // Load data
  useEffect(() => { setAdmins(dummyData); }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const resetForm = () => {
    setFormData({ id: null, full_name: "", email: "", role: "Admin", status: "Active" });
    setIsEditing(false);
    setShowForm(false);
  };

  const handleSubmit = () => {
    const { full_name, email } = formData;
    if (!full_name.trim() || !email.trim()) {
      Swal.fire({ 
        title: 'Gagal!', 
        text: 'Nama dan email wajib diisi.', 
        icon: 'error', 
        confirmButtonText: 'OK',
        customClass: {
          popup: 'rounded-lg'
        }
      });
      return;
    }

    if (isEditing) {
      setAdmins(prev => prev.map(a => a.id === formData.id ? { ...formData } : a));
      Swal.fire({ 
        title: 'Sukses!', 
        text: 'Data admin berhasil diperbarui.', 
        icon: 'success', 
        confirmButtonText: 'OK',
        customClass: {
          popup: 'rounded-lg'
        }
      });
    } else {
      setAdmins(prev => [{ ...formData, id: Date.now() }, ...prev]);
      Swal.fire({ 
        title: 'Sukses!', 
        text: 'Admin baru berhasil ditambahkan.', 
        icon: 'success', 
        confirmButtonText: 'OK',
        customClass: {
          popup: 'rounded-lg'
        }
      });
    }
    resetForm();
  };

  const handleEdit = (admin) => {
    setFormData(admin);
    setIsEditing(true);
    setShowForm(true);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Delete admin
  const handleDelete = async (id) => {
    Swal.fire({
      title: 'Konfirmasi Hapus',
      text: 'Apakah Anda yakin ingin menghapus admin ini? Data yang dihapus tidak dapat dikembalikan.',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Ya, Hapus',
      cancelButtonText: 'Batal',
      confirmButtonColor: '#ef4444',
      cancelButtonColor: '#6b7280',
      customClass: {
        popup: 'rounded-lg'
      }
    }).then(result => {
      if (result.isConfirmed) {
        setAdmins(prev => prev.filter(a => a.id !== id));
        Swal.fire({ 
          title: 'Terhapus!', 
          text: 'Admin berhasil dihapus dari sistem.', 
          icon: 'success', 
          confirmButtonText: 'OK',
          customClass: {
            popup: 'rounded-lg'
          }
        });
      }
    });
  };

  const filteredAdmins = admins.filter(a =>
    a.full_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    a.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
    a.role.toLowerCase().includes(searchTerm.toLowerCase()) ||
    a.status.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const getInitials = (name) => {
    return name.split(' ').map(n => n[0]).join('').toUpperCase();
  };

  const activeAdmins = admins.filter(a => a.status === 'Active').length;
  const superAdmins = admins.filter(a => a.role === 'Super Admin').length;

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-blue-50 to-indigo-50">
      <div className="container mx-auto px-4 py-8">
        
        {/* Header Section */}
        <div className="mb-8">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div>
              <Typography variant="h3" className="font-bold text-gray-900 mb-2">
                Daftar Admin
              </Typography>
              
            </div>
            <Button
              variant="outlined"
              color="white"
              size="lg"
              className="flex items-center gap-3 rounded-full px-6 py-3 shadow-lg border-2 border-purple-500 bg-purple-100 hover:bg-purple-50 focus:outline-none focus:ring-2 focus:ring-purple-300 transition duration-300 hover:scale-105"
              onClick={() => setShowForm(!showForm)}
            >
              <PlusIcon className="h-6 w-6 text-purple-900" />
              <span className="font-semibold text-purple-900">Tambah Admin</span>
            </Button>

          </div>
        </div>

        {/* Stats Cards
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <Card className="bg-gradient-to-r from-blue-500 to-blue-600 text-white shadow-lg hover:shadow-xl transition-all duration-300">
            <CardBody className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <Typography variant="h4" className="font-bold mb-1">
                    {admins.length}
                  </Typography>
                  <Typography variant="small" className="opacity-90">
                    Total Admin
                  </Typography>
                </div>
                <UsersIcon className="h-12 w-12 opacity-80" />
              </div>
            </CardBody>
          </Card>

          <Card className="bg-gradient-to-r from-green-500 to-emerald-600 text-white shadow-lg hover:shadow-xl transition-all duration-300">
            <CardBody className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <Typography variant="h4" className="font-bold mb-1">
                    {activeAdmins}
                  </Typography>
                  <Typography variant="small" className="opacity-90">
                    Admin Aktif
                  </Typography>
                </div>
                <CheckCircleIcon className="h-12 w-12 opacity-80" />
              </div>
            </CardBody>
          </Card>

          <Card className="bg-gradient-to-r from-purple-500 to-purple-600 text-white shadow-lg hover:shadow-xl transition-all duration-300">
            <CardBody className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <Typography variant="h4" className="font-bold mb-1">
                    {superAdmins}
                  </Typography>
                  <Typography variant="small" className="opacity-90">
                    Super Admin
                  </Typography>
                </div>
                <ChartBarIcon className="h-12 w-12 opacity-80" />
              </div>
            </CardBody>
          </Card>
        </div> */}

        {/* Form Section */}
        {showForm && (
          <Card className="mb-8 shadow-xl border-0 overflow-hidden">
            <div className="bg-purple-900 p-6">
              <div className="flex items-center justify-between">
                <div className="text-white">
                  <Typography variant="h5" className="font-semibold mb-1">
                    {isEditing ? 'Edit Data Admin' : 'Tambah Admin Baru'}
                  </Typography>
                  <Typography variant="small" className="opacity-90">
                    {isEditing ? 'Perbarui informasi admin yang dipilih' : 'Lengkapi form untuk menambah admin baru'}
                  </Typography>
                </div>
                <IconButton 
                  variant="text" 
                  className="text-white hover:bg-white/20"
                  onClick={resetForm}
                >
                  <XMarkIcon className="h-6 w-6" />
                </IconButton>
              </div>
            </div>

            <CardBody className="p-8">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Typography variant="small" className="font-medium text-gray-700">
                    Nama Lengkap
                  </Typography>
                  <Input
                    size="lg"
                    placeholder="Masukkan nama lengkap"
                    name="full_name"
                    value={formData.full_name}
                    onChange={handleChange}
                    className="!border-gray-300 focus:!border-blue-500"
                    labelProps={{
                      className: "hidden",
                    }}
                    icon={<UserCircleIcon className="h-5 w-5 text-gray-400" />}
                  />
                </div>

                <div className="space-y-2">
                  <Typography variant="small" className="font-medium text-gray-700">
                    Email Address
                  </Typography>
                  <Input
                    size="lg"
                    type="email"
                    placeholder="Masukkan email address"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    className="!border-gray-300 focus:!border-blue-500"
                    labelProps={{
                      className: "hidden",
                    }}
                    icon={<MagnifyingGlassIcon className="h-5 w-5 text-gray-400" />}
                  />
                </div>

                <div className="space-y-2">
                  <Typography variant="small" className="font-medium text-gray-700">
                    Role
                  </Typography>
                  <Select 
                    size="lg"
                    value={formData.role} 
                    onChange={value => setFormData(prev => ({ ...prev, role: value }))}
                    className="!border-gray-300 focus:!border-blue-500"
                  >
                    <Option value="Admin">Admin</Option>
                    <Option value="Super Admin">Super Admin</Option>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Typography variant="small" className="font-medium text-gray-700">
                    Status
                  </Typography>
                  <Select 
                    size="lg"
                    value={formData.status} 
                    onChange={value => setFormData(prev => ({ ...prev, status: value }))}
                    className="!border-gray-300 focus:!border-blue-500"
                  >
                    <Option value="Active">Active</Option>
                    <Option value="Inactive">Inactive</Option>
                  </Select>
                </div>
              </div>

              <div className="flex justify-end gap-4 mt-8 pt-6 border-t border-gray-100">
                <Button 
                  variant="outlined" 
                  color="gray" 
                  size="lg"
                  onClick={resetForm}
                  className="px-8"
                >
                  Batal
                </Button>
                <Button 
                  className={`px-8 ${isEditing 
                    ? 'bg-gradient-to-r from-blue-600 to-indigo-600' 
                    : 'bg-purple-600'
                  } shadow-lg hover:shadow-xl transition-all duration-300`}
                  size="lg"
                  onClick={handleSubmit}
                >
                  {isEditing ? 'Update Data' : 'Tambah Admin'}
                </Button>
              </div>
            </CardBody>
          </Card>
        )}

        {/* Table Section */}
        <Card className="shadow-xl border-0 overflow-hidden">
          <div className="bg-white border-b border-gray-100 p-6">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
              <div>
                <Typography variant="h6" className="font-semibold text-gray-900 mb-1">
                  Daftar Administrator
                </Typography>
                <Typography variant="small" className="text-gray-600">
                  Menampilkan {filteredAdmins.length} dari {admins.length} admin
                </Typography>
              </div>
              <div className="w-full md:w-80">
                <Input
                  size="lg"
                  placeholder="Cari berdasarkan nama, email, role, atau status..."
                  value={searchTerm}
                  onChange={e => setSearchTerm(e.target.value)}
                  className="!border-gray-300 focus:!border-blue-500"
                  labelProps={{
                    className: "hidden",
                  }}
                  icon={<MagnifyingGlassIcon className="h-5 w-5 text-gray-400" />}
                />
              </div>
            </div>
          </div>

          <CardBody className="p-0">
            <div className="overflow-x-auto">
              <table className="min-w-full">
                <thead className="bg-gray-50 border-b border-gray-100">
                  <tr>
                    <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                      Admin
                    </th>
                    <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                      Role
                    </th>
                    <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                      Status
                    </th>
                    <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                      Aksi
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-100">
                  {filteredAdmins.length > 0 ? (
                    filteredAdmins.map((admin, index) => (
                      <tr key={admin.id} className="hover:bg-gray-50 transition-colors duration-200">
                        <td className="px-6 py-4">
                          <div className="flex items-center space-x-4">
                            <div className="flex-shrink-0">
                              <div className="h-12 w-12 rounded-full bg-gradient-to-r from-blue-500 to-indigo-600 flex items-center justify-center">
                                <Typography variant="small" className="font-semibold text-white">
                                  {getInitials(admin.full_name)}
                                </Typography>
                              </div>
                            </div>
                            <div>
                              <Typography variant="small" className="font-semibold text-gray-900">
                                {admin.full_name}
                              </Typography>
                              <Typography variant="small" className="text-gray-600">
                                {admin.email}
                              </Typography>
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-4">
                          <Badge
                            variant="gradient"
                            color={admin.role === 'Super Admin' ? 'purple' : 'blue'}
                            className="rounded-full"
                          >
                            {admin.role}
                          </Badge>
                        </td>
                        <td className="px-6 py-4">
                          <div className="flex items-center space-x-2">
                            <div className={`h-2 w-2 rounded-full ${
                              admin.status === 'Active' ? 'bg-green-500' : 'bg-gray-400'
                            }`}></div>
                            <span className={`text-sm font-medium ${
                              admin.status === 'Active' ? 'text-green-700' : 'text-gray-600'
                            }`}>
                              {admin.status}
                            </span>
                          </div>
                        </td>
                        <td className="px-6 py-4">
                          <div className="flex items-center space-x-2">
                            <IconButton
                              size="sm"
                              variant="outlined"
                              color="blue"
                              className="hover:bg-blue-50 transition-colors duration-200"
                              onClick={() => handleEdit(admin)}
                            >
                              <PencilSquareIcon className="h-4 w-4" />
                            </IconButton>
                            <IconButton
                              size="sm"
                              variant="outlined"
                              color="red"
                              className="hover:bg-red-50 transition-colors duration-200"
                              onClick={() => handleDelete(admin.id)}
                            >
                              <TrashIcon className="h-4 w-4" />
                            </IconButton>
                          </div>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan={4} className="px-6 py-12 text-center">
                        <div className="flex flex-col items-center space-y-4">
                          <ExclamationCircleIcon className="h-12 w-12 text-gray-400" />
                          <div>
                            <Typography variant="h6" className="text-gray-900 mb-1">
                              Tidak ada data admin
                            </Typography>
                            <Typography variant="small" className="text-gray-600">
                              {searchTerm ? 'Tidak ada admin yang sesuai dengan pencarian Anda.' : 'Belum ada admin yang ditambahkan ke sistem.'}
                            </Typography>
                          </div>
                        </div>
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </CardBody>
        </Card>
      </div>
    </div>
  );
}