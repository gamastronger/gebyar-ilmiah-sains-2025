import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import illustrationImg from '../../assets/bgsementararegister.jpg';
import api from '../../configs/api';

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const fadeIn = {
    initial: { opacity: 0, y: 30, filter: 'blur(8px)' },
    animate: {
      opacity: 1,
      y: 0,
      filter: 'blur(0px)',
      transition: { duration: 0.7, ease: 'easeOut' },
    },
    exit: { opacity: 0, y: 30, filter: 'blur(8px)', transition: { duration: 0.5 } },
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    setError('');

    try {
      const response = await fetch(`${api.URL_API}/api/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();
      console.log("data", data);

      if (!response.ok) {
        throw new Error(data.message || 'Login gagal');
      }

      // Simpan token ke localStorage
      localStorage.setItem('token', data.token);
      localStorage.setItem('role', data.role); // Simpan data user ke localStorage
      if (data.role === 'admin') {
        navigate('/admin');
      }
      if (data.role === 'peserta') {
        navigate('/onboarding');
      }
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <motion.div
      className="min-h-screen bg-[#210034] flex items-center justify-center px-4 py-6 lg:py-8"
      variants={fadeIn}
      initial="initial"
      animate="animate"
      exit="exit"
    >
      <div className="w-full max-w-6xl h-[80vh] lg:h-[70vh] bg-white rounded-2xl shadow-xl grid grid-cols-1 lg:grid-cols-2 overflow-hidden">
        <div className="hidden lg:flex items-center justify-center bg-gradient-to-br from-[#ddd6f3] to-[#f3e7e9]">
          <img src={illustrationImg} alt="Illustration" className="max-h-[80%] object-contain" />
        </div>

        <div className="p-6 sm:p-8 flex flex-col justify-center">
          <h1 className="text-3xl font-bold text-center text-gray-900 mb-3">Login</h1>
          <h1 className="text-xl font-semibold text-center text-gray-900 mb-1">Welcome Back</h1>
          <p className="text-sm text-center text-gray-600 mb-4">Enter your email and password</p>

          <form className="space-y-3" onSubmit={handleLogin}>
            {error && <p className="text-red-600 text-sm text-center">{error}</p>}

            <div>
              <label className="block text-sm font-medium text-gray-700">Email</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Email"
                className="w-full px-3 py-2 mt-1 border rounded-md focus:outline-none focus:ring-2 focus:ring-purple-600 text-sm text-black"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">Password</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Password"
                className="w-full px-3 py-2 mt-1 border rounded-md focus:outline-none focus:ring-2 focus:ring-purple-600 text-sm text-black"
                required
              />
            </div>

            <div className="flex items-center justify-between text-xs">
              <label className="text-purple-700 flex items-center gap-2">
                <input type="checkbox" className="form-checkbox text-purple-200" />
                Remember me
              </label>
              <Link to="/forgot" className="text-purple-600 hover:underline">
                Forgot?
              </Link>
            </div>

            <button
              type="submit"
              className="w-full bg-purple-600 hover:bg-purple-700 text-white py-2 rounded-lg font-semibold text-sm shadow-md transition"
            >
              Login
            </button>

            <p className="text-center text-sm text-gray-600 mt-3">
              Belum punya akun?{' '}
              <Link to="/register" className="text-purple-600 font-medium hover:underline">
                Daftar di sini
              </Link>
            </p>
          </form>
        </div>
      </div>
    </motion.div>
  );
};

export default LoginPage;