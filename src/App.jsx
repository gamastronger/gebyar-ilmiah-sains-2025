import { Routes, Route, Navigate } from "react-router-dom";
import { Admin, Auth } from "@/layouts";
import AddPortofolio from "./pages/Input/AddPortofolio";
import AddLayanan from "./pages/Input/AddLayanan";
import AddPaket from "./pages/Input/AddPaket";
import AddPesanan from "./pages/Input/AddPesanan";
import AddTestimoni from "./pages/Input/AddTestimoni";
import AddTentangKami from "./pages/Input/AddTentangKami";
import AddFAQ from "./pages/Input/AddFAQ";
import AddBanner from "./pages/Input/AddBanner";
import PrivateRoute from "./Component/PrivateRoute";
import Beranda from "./Views/Beranda";
import Kti from "./Views/Kti";
import Cbt from "./Views/Cbt";
import Twibbon from "./Views/Twibbon";
// import Login from "./Views/Login";
// import RegisterPage from "./Views/Register";
import Forgot from "./Component/Login/Forgot";
import ParticipantDetail from "./pages/dashboard/ParticipantDetail";
import ParticipantDetail2 from "./pages/dashboard/ParticipantDetail2";
// import Daftar from "./pages/auth/Daftar";
import KTIAdmin from "./pages/dashboard/KTI-Admin";
import Judul from "./Component/Kti/Judul";
import Onboarding from "./Views/Dashboard User/Onboarding";
import Pending from "./Views/Dashboard User/Pending";
import User from "./Views/Dashboard User/User";
import Panduan from "./Views/Dashboard User/Panduan";
import Bantuan from "./Views/Dashboard User/Bantuan";
import Invoice from "./Views/Dashboard User/Invoice";
import CbtUser from "./Views/Dashboard User/CbtUser";

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
      <Route path="/forgot" element={<Forgot />} />
      <Route path="/kti" element={<Kti />} />
      <Route path="/cbt" element={<Cbt />} />
      <Route path="/twibbon" element={<Twibbon />} />
      <Route path="/portofolio/:id" element={<ParticipantDetail />} />
      <Route path="/cbt-admin/detail/:id" element={<ParticipantDetail2 />} />
      <Route path="/dashboard/kti-admin" element={<KTIAdmin />} />
      <Route path="/dashboard/participant-detail/:id" element={<ParticipantDetail />} />
      <Route path="/judul" element={<Judul />} />
      <Route path="/onboarding" element={<Onboarding />} />  
      <Route path="/dashboard/pending" element={<Pending />} /> 
      <Route path="/dashboard/user" element={<User />} /> 
      <Route path="/dashboard/user/panduan" element={<Panduan />} /> 
      <Route path="/dashboard/user/bantuan" element={<Bantuan />} /> 
      <Route path="/dashboard/user/invoice" element={<Invoice />} />  
      <Route path="/dashboard/user/cbt" element={<CbtUser />} /> 
    </Routes>
  );
}

export default App;
