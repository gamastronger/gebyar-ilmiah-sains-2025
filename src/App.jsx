import { Routes, Route } from "react-router-dom";
import { Admin, Auth } from "@/layouts";
import AddPortofolio from "./pages/Input/AddPortofolio";
import AddLayanan from "./pages/Input/AddLayanan";
import AddPaket from "./pages/Input/AddPaket";
import AddPesanan from "./pages/Input/AddPesanan";
import AddTestimoni from "./pages/Input/AddTestimoni";
import AddTentangKami from "./pages/Input/AddTentangKami";
import AddFAQ from "./pages/Input/AddFAQ";
import AddBanner from "./pages/Input/AddBanner";
import SmartRoute from "./Component/SmartRoute";
import Beranda from "./Views/Beranda";
import Kti from "./Views/Kti";
import Cbt from "./Views/Cbt";
import Twibbon from "./Views/Twibbon";
import Forgot from "./Component/Login/Forgot";
import ParticipantDetail from "./pages/dashboard/ParticipantDetail";
import KTIAdmin from "./pages/dashboard/KTI-Admin";
import Judul from "./Component/Kti/Judul";
import Onboarding from "./Views/Dashboard User/Onboarding";
import Pending from "./Views/Dashboard User/Pending";
import User from "./Views/Dashboard User/User";
import Panduan from "./Views/Dashboard User/Panduan";
import Bantuan from "./Views/Dashboard User/Bantuan";
import Invoice from "./Views/Dashboard User/Invoice";
import CbtUser from "./Views/Dashboard User/CbtUser";
import Kontak from "./Views/Kontak";
import Jurnal from "./Views/Dashboard User/Jurnal";

function App() {
  return (
    <Routes>
      {/* Auth routes - hanya untuk guest */}
      <Route
        path="/auth/*"
        element={<SmartRoute authOnly={true} element={<Auth />} />}
      />
      {/* <Route
        path="/auth/daftar"
        element={<SmartRoute authOnly={true} element={<Daftar />} />}
      /> */}

      {/* Public routes */}
      <Route path="/" element={<Beranda />} />
      <Route path="/forgot" element={<Forgot />} />
      <Route path="/kti" element={<Kti />} />
      <Route path="/cbt" element={<Cbt />} />
      <Route path="/kontak" element={<Kontak />} />
      <Route path="/twibbon" element={<Twibbon />} />

      {/* Peserta / user routes */}
      <Route
        path="/onboarding"
        element={
          <SmartRoute allowedRoles={["peserta"]} element={<Onboarding />} />
        }
      />
      <Route
        path="/dashboard/pending"
        element={<SmartRoute allowedRoles={["peserta"]} element={<Pending />} />}
      />
      <Route
        path="/dashboard/user"
        element={<SmartRoute allowedRoles={["peserta"]} element={<User />} />}
      />
      <Route
        path="/dashboard/user/panduan"
        element={<SmartRoute allowedRoles={["peserta"]} element={<Panduan />} />}
      />
      <Route
        path="/dashboard/user/bantuan"
        element={<SmartRoute allowedRoles={["peserta"]} element={<Bantuan />} />}
      />
      <Route
        path="/dashboard/user/invoice"
        element={<SmartRoute allowedRoles={["peserta"]} element={<Invoice />} />}
      />
      <Route
        path="/dashboard/user/jurnal"
        element={<SmartRoute allowedRoles={["peserta"]} element={<Jurnal />} />}
      />
      <Route
        path="/dashboard/user/cbt"
        element={<SmartRoute allowedRoles={["peserta"]} element={<CbtUser />} />}
      />

      {/* Admin routes */}
      <Route
        path="/admin/*"
        element={<SmartRoute allowedRoles={["admin"]} element={<Admin />} />}
      />
      <Route
        path="/portofolio/:id"
        element={
          <SmartRoute allowedRoles={["admin"]} element={<ParticipantDetail />} />
        }
      />
      <Route
        path="/dashboard/kti-admin"
        element={<SmartRoute allowedRoles={["admin"]} element={<KTIAdmin />} />}
      />
      <Route
        path="/dashboard/participant-detail/:id"
        element={
          <SmartRoute allowedRoles={["admin"]} element={<ParticipantDetail />} />
        }
      />
      <Route
        path="/judul"
        element={<SmartRoute allowedRoles={["admin"]} element={<Judul />} />}
      />

      <Route path="/auth/forbidden" element={<h1>Forbidden</h1>} />
    </Routes>
  );
}

export default App;