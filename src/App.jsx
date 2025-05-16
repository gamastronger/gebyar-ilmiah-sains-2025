import { Routes, Route, Navigate } from "react-router-dom";
import { Admin, Auth } from "@/layouts";
import PrivateRoute from "./Component/PrivateRoute";
import Beranda from "./Views/Beranda";
import Kti from "./Views/Swc";
import Cbt from "./Views/Sc";
import Twibbon from "./Views/Twibbon";
// import Login from "./Views/Login";
// import RegisterPage from "./Views/Register";
import Forgot from "./Component/Login/Forgot";
import ParticipantDetail from "./pages/dashboard/ParticipantDetail";
// import Daftar from "./pages/auth/Daftar";
import KTIAdmin from "./pages/dashboard/SWC-Admin";
import Judul from "./Component/SWC/JudulSWC";
import Onboarding from "./Views/Dashboard User/Onboarding";
import Pending from "./Views/Dashboard User/Pending";
import User from "./Views/Dashboard User/User";
import Panduan from "./Views/Dashboard User/Panduan";
import Bantuan from "./Views/Dashboard User/Bantuan";
import Invoice from "./Views/Dashboard User/Invoice";
import CbtUser from "./Views/Dashboard User/CbtUser";
import Kontak from "./Views/Kontak";
function App() {
  const isAuthenticated = localStorage.getItem('token') !== null;
  const userRole = localStorage.getItem('role'); // Ambil data user dari localStorage

  console.log("User Role:", userRole);
  return (
    <Routes>
      { /* Untuk Auth */}
      <Route path="/auth/*" element={<Auth />} />
      <Route path="*" element={<Navigate to="/admin" replace />} />
      <Route path="/" element={<Beranda />} />
      <Route path="/forgot" element={<Forgot />} />

      { /* Untuk Guest */}
      <Route path="/swc" element={<Kti />} />
      <Route path="/sc" element={<Cbt />} />
      <Route path="/kontak" element={<Kontak />} />
      <Route path="/twibbon" element={<Twibbon />} />

      { /* Untuk User */ }
      <Route
        path="/onboarding"
        element={
          <PrivateRoute
            isAuthenticated={isAuthenticated}
            allowedRoles={["peserta"]}
            userRole={userRole}
            element={<Onboarding />}
          />
        }
      />
      <Route
        path="/dashboard/pending"
        element={
          <PrivateRoute
            isAuthenticated={isAuthenticated}
            allowedRoles={["peserta"]}
            userRole={userRole}
            element={<Pending />}
          />
        }
      />
      <Route
        path="/dashboard/user"
        element={
          <PrivateRoute
            isAuthenticated={isAuthenticated}
            allowedRoles={["peserta"]}
            userRole={userRole}
            element={<User />}
          />
        }
      />
      <Route
        path="/dashboard/user/panduan"
        element={
          <PrivateRoute
            isAuthenticated={isAuthenticated}
            allowedRoles={["peserta"]}
            userRole={userRole}
            element={<Panduan />}
          />
        }
      />
      <Route
        path="/dashboard/user/bantuan"
        element={
          <PrivateRoute
            isAuthenticated={isAuthenticated}
            allowedRoles={["peserta"]}
            userRole={userRole}
            element={<Bantuan />}
          />
        }
      />
      <Route
        path="/dashboard/user/invoice"
        element={
          <PrivateRoute
            isAuthenticated={isAuthenticated}
            allowedRoles={["peserta"]}
            userRole={userRole}
            element={<Invoice />}
          />
        }
      />
      <Route
        path="/dashboard/user/cbt"
        element={
          <PrivateRoute
            isAuthenticated={isAuthenticated}
            allowedRoles={["peserta"]}
            userRole={userRole}
            element={<CbtUser />}
          />
        }
      />


      { /* Untuk Admin */}
      {/* <Route path="/admin/*" 
      element={<PrivateRoute isAuthenticated={isAuthenticated} element={<Admin />} />}
      /> */}
      { /* Untuk Admin */ }
      <Route
        path="/admin/*"
        element={
          <PrivateRoute
            isAuthenticated={isAuthenticated}
            allowedRoles={["admin"]}
            userRole={userRole}
            element={<Admin />}
          />
        }
      />
      <Route
        path="/portofolio/:id"
        element={
          <PrivateRoute
            isAuthenticated={isAuthenticated}
            allowedRoles={["admin"]}
            userRole={userRole}
            element={<ParticipantDetail />}
          />
        }
      />
      
      <Route
        path="/dashboard/kti-admin"
        element={
          <PrivateRoute
            isAuthenticated={isAuthenticated}
            allowedRoles={["admin"]}
            userRole={userRole}
            element={<KTIAdmin />}
          />
        }
      />
      <Route
        path="/dashboard/participant-detail/:id"
        element={
          <PrivateRoute
            isAuthenticated={isAuthenticated}
            allowedRoles={["admin"]}
            userRole={userRole}
            element={<ParticipantDetail />}
          />
        }
      />
      <Route
        path="/judul"
        element={
          <PrivateRoute
            isAuthenticated={isAuthenticated}
            allowedRoles={["admin"]}
            userRole={userRole}
            element={<Judul />}
          />
        }
      />

      <Route path="/admin/kti-admin/:id" element={<ParticipantDetail />} />

      <Route path="/auth/forbidden" element={<h1>Forbidden</h1>} />
    </Routes>
  );
}

export default App;
