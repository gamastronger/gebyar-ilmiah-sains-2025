import { BrowserRouter, Routes, Route } from "react-router-dom";
import Beranda from "./Views/Beranda";
import Pemesanan from "./Views/Pemesanan";
import Portofolio from "./Views/Portofolio";
import Layanan from "./Views/Layanan";
import Layanan2 from "./Views/Layanan2";


function App(){
  return(
    <BrowserRouter>
    <Routes>
      <Route path="/" element={<Beranda/>}/>
      <Route path="/portofolio" element={<Portofolio />} />
      <Route path="/layanan" element={<Layanan />} />
      <Route path="/Pemesanan" element={<Pemesanan />}/>
      <Route path="/layanan2" element={<Layanan2 />}/>
    </Routes>
    </BrowserRouter>
  )
}

export default App;