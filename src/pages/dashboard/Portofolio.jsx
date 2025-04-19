import React, { useState } from "react";
import { Card, CardBody, Typography, Button, Chip } from "@material-tailwind/react";
import { useNavigate } from "react-router-dom";

// Data dummy
const dummyParticipants = [
  {
    id: 1,
    name: "John Doe",
    email: "johndoe@example.com",
    status: "pending",
    verifiedAt: null,
  },
  {
    id: 2,
    name: "Jane Smith",
    email: "janesmith@example.com",
    status: "verified",
    verifiedAt: "2025-04-19 10:30",
  },
  {
    id: 3,
    name: "Alex Johnson",
    email: "alexj@example.com",
    status: "pending",
    verifiedAt: null,
  },
];

export function Portofolio() {
  const [participants] = useState(dummyParticipants);
  const navigate = useNavigate();

  const handleDetail = (id) => {
    navigate(`/portofolio/${id}`); // Navigasi ke halaman detail berdasarkan ID
  };

  return (
    <div className="p-8 bg-gray-50 min-h-screen">
      <Card className="shadow-lg rounded-2xl">
        <CardBody>
          <Typography variant="h5" className="font-bold mb-6 text-gray-800">
            Daftar Peserta
          </Typography>
          <div className="overflow-x-auto">
            <table className="w-full text-sm text-left text-gray-700">
              <thead className="bg-gray-100 border-b border-gray-300">
                <tr>
                  {["ID", "Nama", "Email", "Status", "Waktu Diverifikasi", "Aksi"].map((el) => (
                    <th key={el} className="py-3 px-5 font-semibold">
                      {el}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {participants.map((participant) => (
                  <tr
                    key={participant.id}
                    className="border-b border-gray-200 hover:bg-purple-50 transition duration-150"
                  >
                    <td className="py-3 px-5">{participant.id}</td>
                    <td className="py-3 px-5">{participant.name}</td>
                    <td className="py-3 px-5">{participant.email}</td>
                    <td className="py-3 px-5">
                      <Chip
                        value={participant.status === "verified" ? "Terverifikasi" : "Pending"}
                        color={participant.status === "verified" ? "green" : "amber"}
                        className="text-xs px-2 py-1 font-medium rounded-full"
                      />
                    </td>
                    <td className="py-3 px-5 text-gray-500 italic">
                      {participant.verifiedAt || "-"}
                    </td>
                    <td className="py-3 px-5">
                      <Button
                        size="sm"
                        color="indigo"
                        onClick={() => handleDetail(participant.id)}
                        className="rounded-full text-xs px-4 py-1.5 normal-case"
                      >
                        Lihat Detail
                      </Button>
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

export default Portofolio;