import React, { useState } from "react";
import { Card, CardBody, Typography, Button, Chip, Input, Select, Option } from "@material-tailwind/react";
import { useNavigate } from "react-router-dom";
import { FaSearch, FaFilter } from "react-icons/fa";

// Data dummy (30 peserta)
const dummyParticipants = Array.from({ length: 30 }, (_, i) => ({
  id: i + 1,
  name: `Peserta ${i + 1}`,
  email: `peserta${i + 1}@example.com`,
  status: i % 3 === 0 ? "verified" : i % 3 === 1 ? "pending" : "failed",
  verifiedAt: i % 3 === 0 ? `2025-04-${10 + i} 10:30` : null,
  jenjang: i % 2 === 0 ? "SMA" : "SMP",
}));

export function Portofolio() {
  const [participants, setParticipants] = useState(dummyParticipants);
  const [searchTerm, setSearchTerm] = useState("");
  const [showFilterPopup, setShowFilterPopup] = useState(false);
  const [selectedFilters, setSelectedFilters] = useState({
    jenjang: "all", // Default: semua jenjang
    status: "all", // Default: semua Status
    waktu: "all", // Default: semua Waktu Diverifikasi
  });
  const [currentPage, setCurrentPage] = useState(1); // Halaman saat ini
  const itemsPerPage = 12; // Jumlah data per halaman
  const navigate = useNavigate();

  const handleDetail = (id) => {
    navigate(`/portofolio/${id}`);
  };

  // Fungsi untuk menangani pencarian
  const handleSearch = (e) => {
    setSearchTerm(e.target.value.toLowerCase());
    setCurrentPage(1); // Reset ke halaman pertama saat pencarian
  };

  // Menangani klik untuk filter pop-up
  const handleToggleFilterPopup = () => {
    setShowFilterPopup(!showFilterPopup);
  };

  // Menangani perubahan filter (dropdown)
  const handleFilterChange = (filterName, value) => {
    setSelectedFilters((prev) => ({
      ...prev,
      [filterName]: value,
    }));
    setCurrentPage(1); // Reset ke halaman pertama saat filter berubah
  };

  // Filter peserta berdasarkan pencarian dan filter yang dipilih
  const filteredParticipants = participants.filter((participant) => {
    const matchesSearch =
      participant.name.toLowerCase().includes(searchTerm) ||
      participant.email.toLowerCase().includes(searchTerm);

    const matchesJenjang =
      selectedFilters.jenjang === "all" || participant.jenjang === selectedFilters.jenjang;

    const matchesStatus =
      selectedFilters.status === "all" || participant.status === selectedFilters.status;

    const matchesWaktu =
      selectedFilters.waktu === "all" ||
      (selectedFilters.waktu === "verified" && participant.verifiedAt) ||
      (selectedFilters.waktu === "not_verified" && !participant.verifiedAt);

    return matchesSearch && matchesJenjang && matchesStatus && matchesWaktu;
  });

  // Pagination: Hitung data yang akan ditampilkan pada halaman saat ini
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredParticipants.slice(indexOfFirstItem, indexOfLastItem);

  // Fungsi untuk mengganti halaman
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <div className="p-4 bg-purple-50 min-h-screen">
      {/* Header */}
      <Typography variant="h6" className="mb-4 font-bold text-purple-800">
        Daftar Peserta KTI
      </Typography>

      <div className="flex flex-col md:flex-row justify-between items-center mb-4 gap-4">
  {/* Search Input */}
  <div className="relative w-full md:w-1/3">
    <Input
      type="text"
      placeholder="Cari peserta..."
      value={searchTerm}
      onChange={handleSearch}
      className="pr-8 rounded-md shadow-sm focus:ring-1 focus:ring-purple-500 text-sm"
    />
    <FaSearch className="absolute top-1/2 right-2 transform -translate-y-1/2 text-gray-400 text-sm" />
  </div>

  {/* Filter Dropdown */}
  <div className="relative w-full md:w-1/4">
    <Button
      color="purple"
      size="sm"
      onClick={handleToggleFilterPopup}
      className="w-full flex items-center justify-center py-1 px-3 text-xs font-medium rounded-md"
    >
      <FaFilter className="mr-1 text-gray-100" />
      Filter
    </Button>

    {/* Filter Popup */}
    {showFilterPopup && (
      <div className="absolute right-0 top-8 w-56 bg-white shadow-md rounded-md p-3 z-50">
        <div className="flex flex-col gap-3">
          {/* Filter Jenjang */}
          <div>
            <Typography variant="small" className="font-semibold text-gray-700 mb-1 text-xs">
              Jenjang
            </Typography>
            <Select
              value={selectedFilters.jenjang}
              onChange={(value) => handleFilterChange("jenjang", value)}
              className="text-xs"
            >
              <Option value="all">Semua</Option>
              <Option value="SMP">SMP</Option>
              <Option value="SMA">SMA</Option>
            </Select>
          </div>

          {/* Filter Status */}
          <div>
            <Typography variant="small" className="font-semibold text-gray-700 mb-1 text-xs">
              Status
            </Typography>
            <Select
              value={selectedFilters.status}
              onChange={(value) => handleFilterChange("status", value)}
              className="text-xs"
            >
              <Option value="all">Semua</Option>
              <Option value="verified">Terverifikasi</Option>
              <Option value="pending">Pending</Option>
              <Option value="failed">Gagal</Option>
            </Select>
          </div>

          {/* Filter Waktu */}
          <div>
            <Typography variant="small" className="font-semibold text-gray-700 mb-1 text-xs">
              Waktu Diverifikasi
            </Typography>
            <Select
              value={selectedFilters.waktu}
              onChange={(value) => handleFilterChange("waktu", value)}
              className="text-xs"
            >
              <Option value="all">Semua</Option>
              <Option value="verified">Terverifikasi</Option>
              <Option value="not_verified">Belum Diverifikasi</Option>
            </Select>
          </div>

          <Button
            color="purple"
            size="sm"
            onClick={() => setShowFilterPopup(false)}
            className="w-full mt-2 text-xs py-1"
          >
            Terapkan Filter
          </Button>
        </div>
      </div>
    )}
  </div>
</div>

      {/* Card Table */}
      <Card className="shadow-sm rounded-md bg-white">
        <CardBody>
          <div className="overflow-x-auto">
            <table className="w-full text-xs text-left text-gray-700">
              <thead className="bg-purple-100 border-b border-purple-300">
                <tr>
                  <th className="py-1 px-2 font-semibold text-purple-800">ID</th>
                  <th className="py-1 px-2 font-semibold text-purple-800">Nama</th>
                  <th className="py-1 px-2 font-semibold text-purple-800">Email</th>
                  <th className="py-1 px-2 font-semibold text-purple-800">Status</th>
                  <th className="py-1 px-2 font-semibold text-purple-800">Jenjang</th>
                  <th className="py-1 px-2 font-semibold text-purple-800">Waktu Diverifikasi</th>
                  <th className="py-1 px-2 font-semibold text-purple-800">Aksi</th>
                </tr>
              </thead>
              <tbody>
                {currentItems.map((participant, idx) => (
                  <tr
                    key={participant.id}
                    className={`${
                      idx % 2 === 0 ? "bg-white" : "bg-purple-50"
                    } border-b border-purple-200 hover:bg-purple-100 transition duration-150`}
                  >
                    <td className="py-1 px-2">{participant.id}</td>
                    <td className="py-1 px-2">{participant.name}</td>
                    <td className="py-1 px-2">{participant.email}</td>
                    <td className="py-1 px-2">
                      <Chip
                        value={
                          participant.status === "verified"
                            ? "Verifikasi"
                            : participant.status === "pending"
                            ? "Pending"
                            : "Gagal"
                        }
                        color={
                          participant.status === "verified"
                            ? "green"
                            : participant.status === "pending"
                            ? "amber"
                            : "red"
                        }
                        className={`text-[9px] px-1 py-0.5 font-medium rounded-full ${
                          participant.status === "verified"
                            ? "bg-green-100 text-green-800"
                            : participant.status === "pending"
                            ? "bg-yellow-100 text-yellow-800"
                            : "bg-red-100 text-red-800"
                        }`}
                      />
                    </td>
                    <td className="py-1 px-2">{participant.jenjang}</td>
                    <td className="py-1 px-2 text-gray-500 italic">
                      {participant.verifiedAt || "-"}
                    </td>
                    <td className="py-1 px-2">
                      <Button
                        size="sm"
                        color="purple"
                        onClick={() => handleDetail(participant.id)}
                        className="rounded-full text-[9px] px-2 py-0.5 normal-case bg-purple-500 hover:bg-purple-600 text-white"
                      >
                        Detail
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardBody>
      </Card>

      {/* Pagination */}
      <div className="flex justify-center mt-4">
        {Array.from({ length: Math.ceil(filteredParticipants.length / itemsPerPage) }, (_, i) => (
          <Button
            key={i + 1}
            size="sm"
            color={currentPage === i + 1 ? "purple" : "gray"}
            onClick={() => paginate(i + 1)}
            className={`mx-1 px-3 py-1 ${
              currentPage === i + 1 ? "bg-purple-600 text-white" : "bg-gray-200 text-gray-700"
            }`}
          >
            {i + 1}
          </Button>
        ))}
      </div>
    </div>
  );
}

export default Portofolio;