import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import Navbar from "../../Component/Navbar"; // Pastikan path ini benar
import illustrationImg from "../../assets/imglogin.jpg"; // Gambar bisa disesuaikan
import api from "@/configs/api";

export function Masuk() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false); // State untuk fitur lihat password
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch(`${api.URL_API}/api/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      if (!response.ok) {
        throw new Error("Login gagal. Silakan periksa email dan kata sandi Anda.");
      }

      const data = await response.json();
      localStorage.setItem("token", data.token);
      localStorage.setItem("role", data.role);
      localStorage.setItem('status', data.user.status); // Simpan data user ke localStorage
      console.log("Navigating to /admin");
      navigate("/admin/Dash-Admin");
      console.log("Navigating to /admin hahhhh");
    } catch (err) {
      setError(err.message);
    }
  };

  const fadeIn = {
    initial: { opacity: 0, y: 30, filter: "blur(8px)" },
    animate: {
      opacity: 1,
      y: 0,
      filter: "blur(0px)",
      transition: { duration: 0.7, ease: "easeOut" },
    },
    exit: { opacity: 0, y: 30, filter: "blur(8px)", transition: { duration: 0.5 } },
  };

  return (
    <>
      {/* Navbar */}
      <Navbar />

      {/* Form Login */}
      <motion.div
        className="min-h-screen bg-[#210034] flex items-center justify-center px-4 py-12 pt-20" // Tambahkan padding top untuk menghindari overlap dengan navbar
        variants={fadeIn}
        initial="initial"
        animate="animate"
        exit="exit"
      >
        <div className="w-full max-w-6xl h-[80vh] lg:h-[70vh] bg-white rounded-2xl shadow-xl grid grid-cols-1 lg:grid-cols-2 overflow-hidden">
          {/* Gambar di sisi kiri dengan gradient ungu */}
          <div className="hidden lg:flex items-center justify-center bg-gradient-to-br from-[#ddd6f3] to-[#f3e7e9] relative">
            {/* Gradient di atas gambar */}
            <div className="absolute inset-0 z-10 bg-gradient-to-tl from-purple-400 via-transparent to-purple-600 mix-blend-multiply opacity-60 pointer-events-none" />
            
            {/* Gambar */}
            <img
              src={illustrationImg}
              alt="Illustration"
              className="rounded-2xl max-h-[95%] object-contain relative z-20"
            />
          </div>

          {/* Form Login */}
          <div className="p-6 sm:p-8 flex flex-col justify-center">
            <h1 className="text-3xl font-bold text-center text-gray-900 mb-3">Login</h1>
            <h1 className="text-xl font-semibold text-center text-gray-900 mb-1">Welcome Back</h1>
            <p className="text-sm text-center text-gray-600 mb-4">Enter your email and password</p>

            <form className="space-y-3" onSubmit={handleLogin}>
              <div>
                <label className="block text-sm font-medium text-gray-700">Email</label>
                <input
                  type="email"
                  placeholder="Email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full px-3 py-2 mt-1 border rounded-md focus:outline-none focus:ring-2 focus:ring-purple-600 text-sm"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">Password</label>
                <div className="relative">
                  <input
                    type={showPassword ? "text" : "password"} // Ubah tipe input berdasarkan state
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full px-3 py-2 mt-1 border rounded-md focus:outline-none focus:ring-2 focus:ring-purple-600 text-sm"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)} // Toggle state showPassword
                    className="absolute inset-y-0 right-3 flex items-center text-sm text-gray-600 hover:text-purple-600"
                  >
                    {showPassword ? "Hide" : "Show"}
                  </button>
                </div>
              </div>

              {error && (
                <p className="text-center text-sm text-red-600 mt-2">{error}</p>
              )}

              <div className="flex items-center justify-between text-xs">
                <label className="text-purple-700 flex items-center gap-2">
                  <input type="checkbox" className="form-checkbox text-purple-200" />
                  Remember me
                </label>
                <a href="/forgot" className="text-purple-600 hover:underline">
                  Forgot?
                </a>
              </div>

              <button
                type="submit"
                className="w-full bg-purple-600 hover:bg-purple-700 text-white py-2 rounded-lg font-semibold text-sm shadow-md transition"
              >
                Login
              </button>

              <p className="text-center text-sm text-gray-600 mt-3">
                Belum punya akun?{" "}
                <a href="/auth/daftar" className="text-purple-600 font-medium hover:underline">
                  Daftar di sini
                </a>
              </p>
            </form>
          </div>
        </div>
      </motion.div>
    </>
  );
}

export default Masuk;