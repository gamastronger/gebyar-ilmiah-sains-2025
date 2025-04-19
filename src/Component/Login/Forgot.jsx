import { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';

const ForgotPasswordPage = () => {
  const [step, setStep] = useState('email');
  const [email, setEmail] = useState('');
  const [code, setCode] = useState(['', '', '', '']);
  const [timer, setTimer] = useState(30);
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [showSuccess, setShowSuccess] = useState(false);
  const navigate = useNavigate();
  const inputRefs = useRef([]);

  useEffect(() => {
    if (step === 'verify' && timer > 0) {
      const interval = setInterval(() => setTimer((prev) => prev - 1), 1000);
      return () => clearInterval(interval);
    }
  }, [step, timer]);

  const handleSendCode = () => {
    setStep('verify');
    setTimer(30);
  };

  const handleVerifyCode = () => {
    const fullCode = code.join('');
    if (fullCode.length === 4) {
      setStep('reset');
    } else {
      alert('Kode verifikasi tidak valid!');
    }
  };

  const handleResetPassword = () => {
    if (newPassword !== confirmPassword) {
      setPasswordError('Password tidak cocok');
      return;
    }
    setPasswordError('');
    setShowSuccess(true);

    setTimeout(() => {
      navigate('/login');
    }, 3000);
  };

  const handleCodeChange = (value, index) => {
    if (!/^[0-9]?$/.test(value)) return;
    const newCode = [...code];
    newCode[index] = value;
    setCode(newCode);
    if (value && index < 3) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handleKeyDown = (e, index) => {
    if (e.key === 'Backspace' && code[index] === '' && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  return (
    <motion.div
      className="min-h-screen bg-[#210034] flex items-center justify-center px-4"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <div className="w-full max-w-md bg-white rounded-2xl shadow-xl p-8">
        {step === 'email' && (
          <>
            <h2 className="text-2xl font-bold text-center text-gray-800 mb-4">Lupa Password</h2>
            <p className="text-sm text-center text-gray-600 mb-6">
              Masukkan email yang terkait akunmu dan kami akan mengirimkan kode verifikasi
            </p>
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-purple-600 text-sm mb-4"
            />
            <button
              onClick={handleSendCode}
              className="w-full bg-purple-600 hover:bg-purple-700 text-white py-2 rounded-md font-semibold text-sm"
            >
              Kirim Kode
            </button>
          </>
        )}

        {step === 'verify' && (
          <>
            <button
              onClick={() => setStep('email')}
              className="text-sm text-purple-600 hover:underline mb-4"
            >
              ← Mau ganti email?
            </button>
            <h2 className="text-2xl font-bold text-center text-gray-800 mb-2">Verifikasi Kode</h2>
            <p className="text-sm text-center text-gray-600 mb-4">
              Kami mengirimkan kode ke{' '}
              <span className="text-purple-600 font-medium">{email || 'email@example.com'}</span>
            </p>

            <div className="grid grid-cols-4 gap-4 justify-center mb-4 max-w-xs mx-auto">
              {code.map((digit, index) => (
                <input
                  key={index}
                  ref={(el) => (inputRefs.current[index] = el)}
                  type="text"
                  maxLength="1"
                  value={digit}
                  onChange={(e) => handleCodeChange(e.target.value, index)}
                  onKeyDown={(e) => handleKeyDown(e, index)}
                  className="w-14 h-14 text-center text-2xl font-semibold border-2 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-600"
                />
              ))}
            </div>

            {timer > 0 ? (
              <p className="text-sm text-center text-gray-500">Kirim ulang kode dalam {timer}s</p>
            ) : (
              <button
                onClick={handleSendCode}
                className="text-sm text-purple-600 hover:underline font-medium mb-2"
              >
                Kirim ulang kode
              </button>
            )}

            <button
              onClick={handleVerifyCode}
              className="w-full bg-purple-600 hover:bg-purple-700 text-white py-2 rounded-md font-semibold text-sm mt-4"
            >
              Verifikasi
            </button>
          </>
        )}

        {step === 'reset' && (
          <>
            {!showSuccess ? (
              <>
                <h2 className="text-2xl font-bold text-center text-gray-800 mb-2">Reset Password</h2>
                <p className="text-sm text-center text-gray-600 mb-4">
                  Masukkan password baru kamu di bawah ini
                </p>
                <input
                  type="password"
                  placeholder="Password Baru"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-purple-600 text-sm mb-3"
                />
                <input
                  type="password"
                  placeholder="Konfirmasi Password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-purple-600 text-sm mb-1"
                />
                {passwordError && (
                  <p className="text-red-500 text-xs mb-2">{passwordError}</p>
                )}
                <button
                  onClick={handleResetPassword}
                  disabled={!newPassword || !confirmPassword || newPassword !== confirmPassword}
                  className={`w-full ${
                    newPassword === confirmPassword
                      ? 'bg-purple-600 hover:bg-purple-700'
                      : 'bg-gray-300 cursor-not-allowed'
                  } text-white py-2 rounded-md font-semibold text-sm`}
                >
                  Reset Password
                </button>
              </>
            ) : (
                <div className="text-center">
                <div className="flex justify-center mb-4">
                  <svg
                    className="w-16 h-16 text-green-500"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                </div>
                <h2 className="text-2xl font-bold text-gray-800 mb-2">Berhasil!</h2>
                <p className="text-sm text-gray-600">Password kamu berhasil direset.</p>
                <p className="text-xs text-gray-500 mt-2">Mengalihkan ke login dalam 3 detik...</p>
              </div>
            )}
          </>
        )}
      </div>
    </motion.div>
  );
};

export default ForgotPasswordPage;
