import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import { useEffect } from "react";
import Beranda from "./Views/Beranda";
import Layanan from "./Views/Kti";
import Layanan2 from "./Views/Cbt";
import Twibbon from "./Views/Twibbon";

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
          <Route path="/layanan" element={<Layanan />} />
          <Route path="/layanan2" element={<Layanan2 />} />
          <Route path="/twibbon" element={<Twibbon />} />
        </Routes>
      </ScrollToHashWrapper>
    </BrowserRouter>
  );
}

export default App;
