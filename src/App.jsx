<<<<<<< HEAD
import { Routes, Route, Navigate } from "react-router-dom";
import { Admin, Auth } from "@/layouts";
import AddPortofolio from "./pages/Input/AddPortofolio"; // Path yang benar sesuai dengan struktur folder
import AddLayanan from "./pages/Input/AddLayanan"; // Import AddLayanan component
import AddPaket from "./pages/Input/AddPaket"; // Import AddPaket component
import AddPesanan from "./pages/Input/AddPesanan";
import AddTestimoni from "./pages/Input/AddTestimoni";
import AddTentangKami from "./pages/Input/AddTentangKami";
import AddFAQ from "./pages/Input/AddFAQ";
import AddBanner from "./pages/Input/AddBanner";
import PrivateRoute from "./Component/PrivateRoute";
=======
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import { useEffect } from "react";
>>>>>>> origin/syita
import Beranda from "./Views/Beranda";
import Kti from "./Views/Kti";
import Cbt from "./Views/Cbt";
import Twibbon from "./Views/Twibbon";
import Login from "./Views/Login";
<<<<<<< HEAD
import RegisterPage from "./Views/Register";
import Forgot from "./Component/Login/Forgot";
import ParticipantDetail from "./pages/dashboard/ParticipantDetail";
import ParticipantDetail2 from "./pages/dashboard/ParticipantDetail2";
import Daftar from "./pages/auth/Daftar";
import KTIAdmin from "./pages/dashboard/KTI-Admin";
import Judul from "./Component/Kti/Judul";

function App() {
  const isAuthenticated = localStorage.getItem('token') !== null;

  return (
    <Routes>
      
      <Route path="/admin/*" 
      element={<PrivateRoute isAuthenticated={isAuthenticated} element={<Admin />} />}
      />
      <Route path="/auth/*" element={<Auth />} />
      <Route path="*" element={<Navigate to="/admin/profil" replace />} />
      <Route path="/" element={<Beranda />} />
      <Route path="/portofolio/add" element={<AddPortofolio />} />
      <Route path="/add-layanan" element={<AddLayanan />} />
      <Route path="/paket/add" element={<AddPaket />} />
      <Route path="/add-pesanan" element={<AddPesanan />} />
      <Route path="/add-testimoni" element={<AddTestimoni />} />
      <Route path="/add-tentang-kami" element={<AddTentangKami />} />
      <Route path="/add-faq" element={<AddFAQ />} />
      <Route path="/add-banner" element={<AddBanner />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<RegisterPage />} />
      <Route path="/forgot" element={<Forgot />} />
      <Route path="/kti" element={<Kti />} />
      <Route path="/cbt" element={<Cbt />} />
      <Route path="/twibbon" element={<Twibbon />} />
      <Route path="/portofolio/:id" element={<ParticipantDetail />} />
      <Route path="/cbt-admin/detail/:id" element={<ParticipantDetail2 />} />
      <Route path="/daftar" element={<Daftar />} />
      <Route path="/dashboard/kti-admin" element={<KTIAdmin />} />
      <Route path="/dashboard/participant-detail/:id" element={<ParticipantDetail />} />
      <Route path="/judul" element={<Judul />} />
    </Routes>
=======
import RegisterPage from "./Component/Register/Register";
import Forgot from "./Component/Login/Forgot";
import Onboarding from "./Views/Dashboard User/Onboarding";
import Pending from "./Views/Dashboard User/Pending";
import User from "./Views/Dashboard User/User";
import Panduan from "./Views/Dashboard User/Panduan";
import Bantuan from "./Views/Dashboard User/Bantuan";
import Invoice from "./Views/Dashboard User/Invoice";
import CbtUser from "./Views/Dashboard User/CbtUser";

// Komponen pembungkus untuk menangani scroll ke hash seperti #contact-person
function ScrollToHashWrapper({ children }) {
  const location = useLocation();

  useEffect(() => {
    if (location.hash) {
      const el = document.querySelector(location.hash);
      if (el) {
        setTimeout(() => {
          el.scrollIntoView({ behavior: "smooth" });
        }, 300); // Delay biar komponen sempat render
      }
    }
  }, [location]);

  return children;
}

function App() {
  return (
    <BrowserRouter>
      <ScrollToHashWrapper>
        <Routes>
          <Route path="/" element={<Beranda />} />
          <Route path="/kti" element={<Kti />} />
          <Route path="/cbt" element={<Cbt />} />
          <Route path="/twibbon" element={<Twibbon />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/forgot" element={<Forgot />} />
          <Route path="/onboarding" element={<Onboarding />} />  /* finished */
          <Route path="/dashboard/pending" element={<Pending />} /> /* finished */
          <Route path="/dashboard/user" element={<User />} /> /* finished */
          <Route path="/dashboard/user/panduan" element={<Panduan />} /> /* finished */
          <Route path="/dashboard/user/bantuan" element={<Bantuan />} /> /* finished */
          <Route path="/dashboard/user/invoice" element={<Invoice />} /> /* finished (ragu) */
          <Route path="/dashboard/user/cbt" element={<CbtUser />} /> 
          {/* Tambahkan route lain sesuai kebutuhan */}
        </Routes>
      </ScrollToHashWrapper>
    </BrowserRouter>
>>>>>>> origin/syita
  );
}

export default App;
