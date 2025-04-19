import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import { useEffect } from "react";
import Beranda from "./Views/Beranda";
import Kti from "./Views/Kti";
import Cbt from "./Views/Cbt";
import Twibbon from "./Views/Twibbon";
import Login from "./Views/Login";
import RegisterPage from "./Component/Register/Register";
import Forgot from "./Component/Login/Forgot";

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
          {/* Tambahkan route lain sesuai kebutuhan */}
        </Routes>
      </ScrollToHashWrapper>
    </BrowserRouter>
  );
}

export default App;
