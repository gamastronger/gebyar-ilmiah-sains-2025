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
import { useNavigate } from "react-router-dom";
import { FaSearch, FaFilter, FaChevronLeft, FaChevronRight } from "react-icons/fa";
import { motion, AnimatePresence } from "framer-motion";
import { participantsData } from "../../data/participantsData";
import api from "@/configs/api";
import dayjs from "dayjs";
import localizedFormat from "dayjs/plugin/localizedFormat";
import Swal from "sweetalert2"; // Tambahkan import ini jika belum ada
import "dayjs/locale/id"; // Bahasa Indonesia

dayjs.extend(localizedFormat);
dayjs.locale("id");

export function Portofolio() {
  const [participants, setParticipants] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [showFilterPopup, setShowFilterPopup] = useState(false);
  const [selectedFilters, setSelectedFilters] = useState({
    jenjang: "all",
    status: "all",
    waktu: "all",
  });
  const [currentPage, setCurrentPage] = useState(1);
  const [isLoading, setIsLoading] = useState(true);
  const itemsPerPage = 20;
  const navigate = useNavigate();

  // Fetch data peserta dari API
  useEffect(() => {
    setTimeout(() => {
      setIsLoading(false);
    }, 800);
  }, []);

  // Perbarui data saat komponen dimuat ulang
  useEffect(() => {
    const getUsers = async () => {
      const response = await fetch(`${api.URL_API}/api/users?jenis_lomba=science-writing`, {
        method: "GET",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${localStorage.getItem("token")}`,
        },
      });
      const data = await response.json();
      if (response.ok) {
        setParticipants(data);
        setIsLoading(false);
      } else {
        console.error("Error fetching participants:", data);
        setIsLoading(false);
      }
    };
    getUsers();
    // setParticipants([...participantsData]);
  }, []);

  const handleDetail = (id) => {
    navigate(`/dashboard/participant-detail/${id}`);
  };

  const handleDelete = async (id) => {
    Swal.fire({
      title: "Hapus Peserta?",
      text: "Data peserta akan dihapus secara permanen. Tindakan ini tidak dapat dibatalkan.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Ya, Hapus",
      cancelButtonText: "Batal",
      confirmButtonColor: "#f43f5e",
      cancelButtonColor: "#9333EA",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          const res = await fetch(`${api.URL_API}/api/users/${id}`, {
            method: "DELETE",
            credentials: "include",
            headers: {
              "Content-Type": "application/json",
              "Authorization": `Bearer ${localStorage.getItem("token")}`,
            },
          });
          if (res.ok) {
            setParticipants((prev) => prev.filter((p) => p.id !== id));
            Swal.fire("Berhasil!", "Data peserta telah dihapus.", "success");
          } else {
            Swal.fire("Gagal", "Gagal menghapus peserta.", "error");
          }
        } catch (err) {
          Swal.fire("Gagal", "Terjadi kesalahan saat menghapus.", "error");
        }
      }
    });
  };

  const handleSearch = (e) => {
    setSearchTerm(e.target.value.toLowerCase());
    setCurrentPage(1);
  };

  const handleToggleFilterPopup = () => {
    setShowFilterPopup(!showFilterPopup);
  };

  const handleFilterChange = (filterName, value) => {
    setSelectedFilters((prev) => ({
      ...prev,
      [filterName]: value,
    }));
    setCurrentPage(1);
  };

  // Filter peserta berdasarkan pencarian dan filter yang dipilih
  const filteredParticipants = participants.filter((participant) => {
    const matchesSearch =
      (participant.name?.toLowerCase().includes(searchTerm) ||
       participant.email?.toLowerCase().includes(searchTerm));

    const matchesJenjang =
      selectedFilters.jenjang === "all" || 
      (participant.jenjang && participant.jenjang.toLowerCase() === selectedFilters.jenjang.toLowerCase());

    const matchesStatus =
      selectedFilters.status === "all" || 
      (participant.status && participant.status.toLowerCase() === selectedFilters.status.toLowerCase());

    const matchesWaktu =
      selectedFilters.waktu === "all" ||
      (selectedFilters.waktu === "verified" && participant.email_verified_at) ||
      (selectedFilters.waktu === "not_verified" && !participant.email_verified_at);

    return matchesSearch && matchesJenjang && matchesStatus && matchesWaktu;
  });

  // Pagination logic
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredParticipants.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(filteredParticipants.length / itemsPerPage);

  const paginate = (pageNumber) => {
    if (pageNumber > 0 && pageNumber <= totalPages) {
      setCurrentPage(pageNumber);
    }
  };

  // Status color mapping
  const statusConfig = {
    verified: {
      label: "Terverifikasi",
      bgColor: "bg-green-100",
      textColor: "text-green-800",
      borderColor: "border-green-200",
    },
    pending: {
      label: "Pending",
      bgColor: "bg-amber-100",
      textColor: "text-amber-800",
      borderColor: "border-amber-200",
    },
    failed: {
      label: "Gagal",
      bgColor: "bg-red-100",
      textColor: "text-red-800",
      borderColor: "border-red-200",
    },
    "-": {
      label: "-",
      bgColor: "bg-gray-100",
      textColor: "text-gray-800",
      borderColor: "border-gray-200",
    },
  };

  return (
    <div className="p-4 md:p-8 bg-gradient-to-br from-purple-50 to-indigo-50 min-h-screen">
      {/* Header with animated gradient */}
      <div className="mb-8 relative overflow-hidden rounded-lg shadow-md p-6 bg-gradient-to-r from-purple-600 to-indigo-600">
        <div className="absolute top-0 left-0 right-0 bottom-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNTYwIiBoZWlnaHQ9IjU2MCIgdmlld0JveD0iMCAwIDU2MCA1NjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CiAgPGRlZnM+CiAgICA8cmFkaWFsR3JhZGllbnQgaWQ9ImciIGN4PSIwIiBjeT0iMCIgcj0iMSIgZ3JhZGllbnRVbml0cz0idXNlclNwYWNlT25Vc2UiIGdyYWRpZW50VHJhbnNmb3JtPSJ0cmFuc2xhdGUoMjgwIDI4MCkgc2NhbGUoMjgwKSI+CiAgICAgIDxzdG9wIHN0b3AtY29sb3I9IiNmZmYiIHN0b3Atb3BhY2l0eT0iMC4xIi8+CiAgICAgIDxzdG9wIHN0b3AtY29sb3I9IiNmZmYiIHN0b3Atb3BhY2l0eT0iMCIgb2Zmc2V0PSIxIi8+CiAgICA8L3JhZGlhbEdyYWRpZW50PgogIDwvZGVmcz4KICA8cmVjdCB3aWR0aD0iNTYwIiBoZWlnaHQ9IjU2MCIgZmlsbD0idXJsKCNnKSIvPgogIDxnIGZpbGw9Im5vbmUiIHN0cm9rZT0iI2ZmZiIgc3Ryb2tlLW9wYWNpdHk9IjAuMiIgc3Ryb2tlLXdpZHRoPSIyIj4KICAgIDxjaXJjbGUgY3g9IjI4MCIgY3k9IjI4MCIgcj0iMTAwIi8+CiAgICA8Y2lyY2xlIGN4PSIyODAiIGN5PSIyODAiIHI9IjE3NSIvPgogICAgPGNpcmNsZSBjeD0iMjgwIiBjeT0iMjgwIiByPSIyNTAiLz4KICA8L2c+Cjwvc3ZnPg==')] bg-no-repeat bg-center opacity-20"></div>
        <div className="relative z-10">
          <Typography variant="h4" className="font-bold text-white mb-2">
            Daftar Peserta Science Writing Competition
          </Typography>
          <Typography variant="paragraph" className="text-purple-100">
            Manajemen peserta SWC | {filteredParticipants.length} peserta terdaftar
          </Typography>
        </div>
      </div>

      {/* Search and Filter Controls */}
      <div className="flex flex-col md:flex-row justify-between items-stretch mb-6 gap-4">
        {/* Search Input with animation */}
        <motion.div 
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          className="relative w-full md:w-1/2"
        >
          <Input
            type="text"
            placeholder="Cari berdasarkan nama atau email..."
            value={searchTerm}
            onChange={handleSearch}
            className="pr-10 py-2 border-purple-200 rounded-lg shadow-sm focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
            icon={<FaSearch className="text-purple-400" />}
            labelProps={{
              className: "hidden",
            }}
          />
        </motion.div>

        {/* Filter Button and Popup */}
        <motion.div 
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.1 }}
          className="relative w-full md:w-auto"
        >
          <Button
            color="purple"
            size="lg"
            onClick={handleToggleFilterPopup}
            className="w-full md:w-auto flex items-center justify-center py-2 px-6 rounded-lg shadow-md hover:shadow-lg transition-all duration-300 bg-gradient-to-r from-purple-600 to-indigo-600"
          >
            <FaFilter className="mr-2" /> Filter Data
          </Button>

          {/* Filter Popup with improved layout and animations */}
          <AnimatePresence>
            {showFilterPopup && (
              <motion.div
                initial={{ opacity: 0, scale: 0.95, y: 10 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95, y: 10 }}
                transition={{ duration: 0.2, ease: "easeOut" }}
                className="absolute right-0 top-12 w-80 bg-white shadow-2xl rounded-xl overflow-hidden z-50 border border-purple-200"
              >
                {/* Header with gradient background and icon */}
                <div className="bg-gradient-to-r from-purple-600 to-indigo-600 px-4 py-3 flex items-center gap-2">
                  <span className="bg-white bg-opacity-20 rounded-full p-1">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2a1 1 0 01-.293.707l-7 7V21a1 1 0 01-1.447.894l-4-2A1 1 0 017 19v-5.293l-7-7A1 1 0 013 4z" /></svg>
                  </span>
                  <Typography variant="small" className="font-bold text-white">
                    Filter Data Peserta
                  </Typography>
                </div>
                
                <div className="p-5">
                  <div className="flex flex-col gap-5">
                    {/* Filter Jenjang */}
                    <div>
                      <Typography variant="small" className="font-semibold text-gray-700 mb-1 flex items-center gap-1">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-purple-600" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 14l9-5-9-5-9 5 9 5zm0 0v6m0 0H6m6 0h6" /></svg>
                        Jenjang Pendidikan
                      </Typography>
                      <Select
                        value={selectedFilters.jenjang}
                        onChange={(value) => handleFilterChange("jenjang", value)}
                        className="text-sm"
                        labelProps={{ className: "hidden" }}
                        menuProps={{ className: "p-1" }}
                        containerProps={{ className: "min-w-full" }}
                      >
                        <Option value="all" className="text-sm py-1.5">Semua Jenjang</Option>
                        <Option value="SMA/MA/SMK" className="text-sm py-1.5">SMA/MA/SMK</Option>
                        <Option value="Mahasiswa/i" className="text-sm py-1.5">Mahasiswa/i</Option>
                      </Select>
                    </div>

                    {/* Filter Status */}
                    <div>
                      <Typography variant="small" className="font-semibold text-gray-700 mb-1 flex items-center gap-1">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-purple-600" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>
                        Status Verifikasi
                      </Typography>
                      <Select
                        value={selectedFilters.status}
                        onChange={(value) => handleFilterChange("status", value)}
                        className="text-sm"
                        labelProps={{ className: "hidden" }}
                        menuProps={{ className: "p-1" }}
                        containerProps={{ className: "min-w-full" }}
                      >
                        <Option value="all" className="text-sm py-1.5">Semua Status</Option>
                        <Option value="verified" className="text-sm py-1.5">Terverifikasi</Option>
                        <Option value="pending" className="text-sm py-1.5">Pending</Option>
                        <Option value="failed" className="text-sm py-1.5">Gagal</Option>
                      </Select>
                    </div>

                    {/* Filter Waktu */}
                    <div>
                      <Typography variant="small" className="font-semibold text-gray-700 mb-1 flex items-center gap-1">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-purple-600" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                        Waktu Diverifikasi
                      </Typography>
                      <Select
                        value={selectedFilters.waktu}
                        onChange={(value) => handleFilterChange("waktu", value)}
                        className="text-sm"
                        labelProps={{ className: "hidden" }}
                        menuProps={{ className: "p-1" }}
                        containerProps={{ className: "min-w-full" }}
                      >
                        <Option value="all" className="text-sm py-1.5">Semua Waktu</Option>
                        <Option value="verified" className="text-sm py-1.5">Sudah Diverifikasi</Option>
                        <Option value="not_verified" className="text-sm py-1.5">Belum Diverifikasi</Option>
                      </Select>
                    </div>

                    {/* Action buttons */}
                    <div className="flex justify-between gap-3 mt-2">
                      <Button
                        color="red"
                        size="sm"
                        variant="outlined"
                        onClick={() => {
                          setSelectedFilters({
                            jenjang: "all",
                            status: "all",
                            waktu: "all",
                          });
                        }}
                        className="w-1/2 py-2 flex items-center justify-center gap-1 hover:bg-red-50 transition-colors"
                      >
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
                        Reset
                      </Button>
                      <Button
                        color="purple"
                        size="sm"
                        onClick={() => setShowFilterPopup(false)}
                        className="w-1/2 py-2 bg-gradient-to-r from-purple-600 to-indigo-600 hover:shadow-md transition-all flex items-center justify-center gap-1"
                      >
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>
                        Terapkan
                      </Button>
                    </div>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      </div>

      {/* Card Table */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: 0.2 }}
      >
        <Card className="shadow-lg rounded-xl overflow-hidden border border-purple-100">
          <CardBody className="p-0">
            {isLoading ? (
              <div className="flex justify-center items-center py-20">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-purple-500"></div>
              </div>
            ) : (
              <>
                <div className="overflow-x-auto">
                  <table className="w-full text-sm text-left">
                    <thead className="bg-gradient-to-r from-purple-600 to-indigo-600 text-white">
                      <tr>
                        <th className="py-3 px-4 font-semibold">ID</th>
                        <th className="py-3 px-4 font-semibold">Nama</th>
                        <th className="py-3 px-4 font-semibold">Email</th>
                        <th className="py-3 px-4 font-semibold">Status</th>
                        <th className="py-3 px-4 font-semibold">Jenjang</th>
                        <th className="py-3 px-4 font-semibold">Waktu Diverifikasi</th>
                        <th className="py-3 px-4 font-semibold">Jurnal</th>
                        <th className="py-3 px-4 font-semibold text-center">Aksi</th>
                      </tr>
                    </thead>
                    <tbody>
                      {currentItems.length > 0 ? (
                        currentItems.map((participant, idx) => (
                          <motion.tr
                            key={participant.id}
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ duration: 0.3, delay: idx * 0.03 }}
                            className={`${
                              idx % 2 === 0 ? "bg-white" : "bg-purple-50"
                            } hover:bg-purple-100 transition-colors duration-150`}
                          >
                            <td className="py-3 px-4 border-b border-purple-100">{idx + 1}</td>
                            <td className="py-3 px-4 border-b border-purple-100 font-medium">{participant.name}</td>
                            <td className="py-3 px-4 border-b border-purple-100 text-gray-600">{participant.email}</td>
                            <td className="py-3 px-4 border-b border-purple-100">
                              <span
                                className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium 
                                ${statusConfig[participant.status]?.bgColor || "bg-gray-100"} 
                                ${statusConfig[participant.status]?.textColor || "text-gray-800"} 
                                border ${statusConfig[participant.status]?.borderColor || "border-gray-200"}`}
                              >
                                {statusConfig[participant.status]?.label || participant.status}
                              </span>
                            </td>
                            <td className="py-3 px-4 border-b border-purple-100">
                              <span className="inline-flex items-center px-2.5 py-1 rounded-md text-xs font-medium bg-indigo-50 text-indigo-700">
                                {participant.jenjang || "—"}
                              </span>
                            </td>
                            <td className="py-3 px-4 border-b border-purple-100 text-gray-500">
                              {participant.email_verified_at
                                ? dayjs(participant.email_verified_at).format("dddd, D MMMM YYYY [pukul] HH:mm")
                                : "—"}
                            </td>

                            <td className="py-3 px-4 border-b border-purple-100">
                              <span
                                className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium 
                                ${participant.jurnal ? "bg-green-100 text-green-800 border-green-200" : "bg-red-100 text-red-800 border-red-200"} 
                                border`}
                              >
                                {participant.jurnal ? "Sudah" : "Kosong"}
                              </span>
                            </td>
                            <td className="py-3 px-4 border-b border-purple-100 text-center">
                              <div className="flex justify-center items-center gap-2">
                                <Button
                                  color="purple"
                                  onClick={() => handleDetail(participant.id)}
                                  className="rounded-md text-xs px-4 py-2 normal-case bg-gradient-to-r from-purple-600 to-indigo-600 hover:shadow-md transition-all duration-300 min-w-[80px] h-9 flex items-center justify-center"
                                >
                                  Detail
                                </Button>
                                <Button
                                  color="red"
                                  onClick={() => handleDelete(participant.id)}
                                  className="rounded-md text-xs px-4 py-2 normal-case bg-gradient-to-r from-red-500 to-pink-500 hover:shadow-md transition-all duration-300 min-w-[80px] h-9 flex items-center justify-center"
                                >
                                  Hapus
                                </Button>
                              </div>
                            </td>
                          </motion.tr>
                        ))
                      ) : (
                        <tr>
                          <td colSpan="8" className="py-8 px-4 text-center text-gray-500">
                            Tidak ada data peserta yang sesuai dengan filter
                          </td>
                        </tr>
                      )}
                    </tbody>
                  </table>
                </div>
              </>
            )}
          </CardBody>
        </Card>
      </motion.div>

      {/* Enhanced Pagination */}
      {filteredParticipants.length > 0 && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.4, delay: 0.4 }}
          className="mt-6 flex justify-between items-center"
        >
          <div className="text-sm text-gray-600">
            Menampilkan {indexOfFirstItem + 1}-
            {Math.min(indexOfLastItem, filteredParticipants.length)} dari{" "}
            {filteredParticipants.length} peserta
          </div>
          
          <div className="flex items-center space-x-1">
            <Button
              color={currentPage > 1 ? "purple" : "gray"}
              disabled={currentPage === 1}
              onClick={() => paginate(currentPage - 1)}
              className={`flex items-center justify-center px-3 py-1 rounded-md ${
                currentPage > 1 
                  ? "bg-purple-100 text-purple-700 hover:bg-purple-200" 
                  : "bg-gray-100 text-gray-400 cursor-not-allowed"
              }`}
              size="sm"
            >
              <FaChevronLeft className="w-3 h-3" />
            </Button>
            
            {/* Dynamic pagination buttons */}
            {Array.from({ length: totalPages }, (_, i) => {
              // Display first page, last page, and pages around current page
              if (
                i === 0 ||
                i === totalPages - 1 ||
                (i >= currentPage - 2 && i <= currentPage + 2)
              ) {
                return (
                  <Button
                    key={i + 1}
                    size="sm"
                    onClick={() => paginate(i + 1)}
                    className={`w-8 h-8 rounded-md flex items-center justify-center ${
                      currentPage === i + 1
                        ? "bg-gradient-to-r from-purple-600 to-indigo-600 text-white shadow-md"
                        : "bg-white text-gray-700 hover:bg-purple-50"
                    }`}
                  >
                    {i + 1}
                  </Button>
                );
              }
              
              // Show ellipsis for skipped pages
              if (i === 1 && currentPage > 4) {
                return <span key={`ellipsis-1`} className="px-2">...</span>;
              }
              if (i === totalPages - 2 && currentPage < totalPages - 3) {
                return <span key={`ellipsis-2`} className="px-2">...</span>;
              }
              
              return null;
            })}
            
            <Button
              color={currentPage < totalPages ? "purple" : "gray"}
              disabled={currentPage === totalPages}
              onClick={() => paginate(currentPage + 1)}
              className={`flex items-center justify-center px-3 py-1 rounded-md ${
                currentPage < totalPages 
                  ? "bg-purple-100 text-purple-700 hover:bg-purple-200" 
                  : "bg-gray-100 text-gray-400 cursor-not-allowed"
              }`}
              size="sm"
            >
              <FaChevronRight className="w-3 h-3" />
            </Button>
          </div>
        </motion.div>
      )}
    </div>
  );
}

export default Portofolio;