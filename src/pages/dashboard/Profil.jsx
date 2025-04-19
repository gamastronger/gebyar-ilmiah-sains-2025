import {
  Card,
  CardBody,
  Typography,
  Button,
  Input,
} from "@material-tailwind/react";
import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export function Profil() {
  const [data, setData] = useState([
    {
      id: 1,
      name: "Admin Satu",
      email: "admin1@example.com",
      phone: "08123456789",
    },
    {
      id: 2,
      name: "Admin Dua",
      email: "admin2@example.com",
      phone: "08987654321",
    },
  ]);

  const [editingId, setEditingId] = useState(null);
  const [editedAdmin, setEditedAdmin] = useState({ name: "", email: "", phone: "" });

  const handleEdit = (admin) => {
    setEditingId(admin.id);
    setEditedAdmin({ name: admin.name, email: admin.email, phone: admin.phone });
  };

  const handleSave = (id) => {
    setData(
      data.map((admin) =>
        admin.id === id ? { ...admin, ...editedAdmin } : admin
      )
    );
    setEditingId(null);
  };

  const handleDelete = (id) => {
    const confirm = window.confirm("Yakin ingin menghapus admin ini?");
    if (confirm) {
      setData(data.filter((admin) => admin.id !== id));
    }
  };

  const fadeIn = {
    initial: { opacity: 0, y: -10 },
    animate: { opacity: 1, y: 0, transition: { duration: 0.3 } },
    exit: { opacity: 0, y: -10, transition: { duration: 0.2 } },
  };

  return (
    <>
      <div className="relative mt-8 h-72 w-full overflow-hidden rounded-xl bg-[url('/img/background-image.png')] bg-cover bg-center">
        {/* Overlay dihapus */}
      </div>
      <Card className="mx-3 -mt-16 mb-6 lg:mx-4 border border-blue-gray-100">
        <CardBody className="overflow-x-auto px-6 pt-3 pb-2">
          <table className="w-full min-w-[640px] table-auto">
            <thead>
              <tr>
                {["ID", "Nama", "Email", "Nomor WA", "Aksi"].map((el) => (
                  <th
                    key={el}
                    className="border-b border-blue-gray-50 py-3 px-5 text-left"
                  >
                    <Typography
                      variant="small"
                      className="text-[11px] font-bold uppercase text-blue-gray-400"
                    >
                      {el}
                    </Typography>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {data.map((admin, key) => {
                const className = `py-3 px-5 ${key !== data.length - 1 ? "border-b border-blue-gray-50" : ""}`;
                const isEditing = editingId === admin.id;

                return (
                  <tr key={admin.id}>
                    <td className={className}>
                      <Typography
                        variant="small"
                        color="blue-gray"
                        className="font-semibold"
                      >
                        {admin.id}
                      </Typography>
                    </td>

                    {/* Nama */}
                    <td className={className}>
                      <div className="w-full min-w-[150px]">
                        <AnimatePresence mode="wait">
                          {isEditing ? (
                            <motion.div
                              key="input-name"
                              {...fadeIn}
                              layout
                              className="w-full"
                            >
                              <Input
                                size="sm"
                                value={editedAdmin.name}
                                onChange={(e) =>
                                  setEditedAdmin({ ...editedAdmin, name: e.target.value })
                                }
                                className="h-8 max-w-[150px]"
                              />
                            </motion.div>
                          ) : (
                            <motion.div
                              key="text-name"
                              {...fadeIn}
                              layout
                              className="w-full"
                            >
                              <Typography
                                variant="small"
                                color="blue-gray"
                                className="font-semibold"
                              >
                                {admin.name}
                              </Typography>
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </div>
                    </td>

                    {/* Email */}
                    <td className={className}>
                      <div className="w-full min-w-[200px]">
                        <AnimatePresence mode="wait">
                          {isEditing ? (
                            <motion.div
                              key="input-email"
                              {...fadeIn}
                              layout
                              className="w-full"
                            >
                              <Input
                                size="sm"
                                value={editedAdmin.email}
                                onChange={(e) =>
                                  setEditedAdmin({ ...editedAdmin, email: e.target.value })
                                }
                                className="h-8 max-w-[200px]"
                              />
                            </motion.div>
                          ) : (
                            <motion.div
                              key="text-email"
                              {...fadeIn}
                              layout
                              className="w-full"
                            >
                              <Typography className="text-xs font-normal text-blue-gray-500">
                                {admin.email}
                              </Typography>
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </div>
                    </td>

                    {/* Nomor WA */}
                    <td className={className}>
                      <div className="w-full min-w-[150px]">
                        <AnimatePresence mode="wait">
                          {isEditing ? (
                            <motion.div
                              key="input-phone"
                              {...fadeIn}
                              layout
                              className="w-full"
                            >
                              <Input
                                size="sm"
                                value={editedAdmin.phone}
                                onChange={(e) =>
                                  setEditedAdmin({ ...editedAdmin, phone: e.target.value })
                                }
                                className="h-8 max-w-[150px]"
                              />
                            </motion.div>
                          ) : (
                            <motion.div
                              key="text-phone"
                              {...fadeIn}
                              layout
                              className="w-full"
                            >
                              <Typography className="text-xs font-normal text-blue-gray-500">
                                {admin.phone}
                              </Typography>
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </div>
                    </td>

                    {/* Aksi */}
                    <td className={className}>
                      <div className="flex gap-2">
                        {isEditing ? (
                          <>
                            <Button
                              size="sm"
                              color="green"
                              onClick={() => handleSave(admin.id)}
                            >
                              Simpan
                            </Button>
                            <Button
                              size="sm"
                              variant="outlined"
                              onClick={() => setEditingId(null)}
                            >
                              Batal
                            </Button>
                          </>
                        ) : (
                          <>
                            <Button
                              size="sm"
                              color="blue"
                              onClick={() => handleEdit(admin)}
                            >
                              Edit
                            </Button>
                            <Button
                              size="sm"
                              color="red"
                              onClick={() => handleDelete(admin.id)}
                            >
                              Delete
                            </Button>
                          </>
                        )}
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </CardBody>
      </Card>
    </>
  );
}

export default Profil;
  