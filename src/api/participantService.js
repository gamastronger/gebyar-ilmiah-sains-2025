import api from "../configs/api";

export async function getParticipantById(id) {
  const res = await fetch(`${api.URL_API}/participants/${id}`);
  if (!res.ok) throw new Error("Gagal mengambil data peserta");
  return res.json();
}

export async function updateParticipant(id, data) {
  const res = await fetch(`${api.URL_API}/participants/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  if (!res.ok) throw new Error("Gagal update data peserta");
  return res.json();
}