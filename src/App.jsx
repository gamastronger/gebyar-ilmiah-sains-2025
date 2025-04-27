import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import { useEffect } from "react";
import Beranda from "./Views/Beranda";
import Kti from "./Views/Kti";
import Cbt from "./Views/Cbt";
import Twibbon from "./Views/Twibbon";
import Login from "./Views/Login";
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
  );
}

export default App;
