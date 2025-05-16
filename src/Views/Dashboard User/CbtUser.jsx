"use client"
import { useEffect, useState } from "react"
import { Clock, Rocket, Sparkles, Zap } from "lucide-react"
function CbtUser() {
  const targetDate = new Date("2025-09-21T00:00:00")
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  })

  useEffect(() => {
    const calculateTimeLeft = () => {
      const difference = targetDate.getTime() - new Date().getTime()

      if (difference > 0) {
        setTimeLeft({
          days: Math.floor(difference / (1000 * 60 * 60 * 24)),
          hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
          minutes: Math.floor((difference / 1000 / 60) % 60),
          seconds: Math.floor((difference / 1000) % 60),
        })
      }
    }

    calculateTimeLeft()
    const timer = setInterval(calculateTimeLeft, 1000)

    return () => clearInterval(timer)
  }, [])

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-900 via-purple-900 to-gray-900 flex flex-col items-center justify-center p-4 text-white overflow-hidden relative">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden">
        {[...Array(20)].map((_, i) => (
          <div
            key={i}
            className="absolute rounded-full bg-indigo-500/10 blur-xl"
            style={{
              width: `${Math.random() * 300 + 50}px`,
              height: `${Math.random() * 300 + 50}px`,
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animation: `float ${Math.random() * 10 + 15}s infinite ease-in-out`,
              animationDelay: `${Math.random() * 5}s`,
            }}
          />
        ))}
      </div>

      <div className="relative z-10 w-full max-w-4xl">
        <div className="text-center mb-8">
          <div className="flex justify-center mb-4">
            <div className="bg-white/10 backdrop-blur-md p-3 rounded-full">
              <Rocket className="h-10 w-10 text-indigo-100" />
            </div>
          </div>
          <h1 className="text-4xl md:text-6xl font-bold mb-2 bg-clip-text text-white bg-gradient-to-r from-indigo-400 to-purple-400">
            AKSES AKAN SEGERA DIBUKA
          </h1>
          <div className="flex items-center justify-center gap-2 text-indigo-200 mb-6">
            <Sparkles className="h-5 w-5" />
            <p className="text-lg md:text-xl">Science Competition GIS UNESA</p>
            <Sparkles className="h-5 w-5" />
          </div>
        </div>

        {/* Futuristic countdown */}
        <div className="bg-white/5 backdrop-blur-md rounded-2xl border border-white/10 p-8 mb-8 shadow-[0_0_15px_rgba(99,102,241,0.2)]">
          <h2 className="text-xl md:text-2xl font-medium text-center mb-6 flex items-center justify-center gap-2">
            <Clock className="h-5 w-5 text-indigo-100" />
            <span>COUNTDOWN MENUJU 21 SEPTEMBER</span>
          </h2>

          <div className="grid grid-cols-4 gap-4">
            {[
              { label: "HARI", value: timeLeft.days },
              { label: "JAM", value: timeLeft.hours },
              { label: "MENIT", value: timeLeft.minutes },
              { label: "DETIK", value: timeLeft.seconds },
            ].map((item) => (
              <div key={item.label} className="flex flex-col items-center">
                <div className="bg-gradient-to-b from-indigo-900 to-indigo-950 rounded-lg border border-indigo-500/30 w-full py-4 px-2 mb-2 relative overflow-hidden">
                  <div className="absolute inset-0 bg-indigo-400/5 rounded-lg"></div>
                  <div className="text-3xl md:text-5xl font-bold text-center text-white">
                    {String(item.value).padStart(2, "0")}
                  </div>
                  <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-indigo-400 to-purple-500"></div>
                </div>
                <div className="text-xs md:text-sm font-medium text-indigo-100">{item.label}</div>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white/5 backdrop-blur-md rounded-2xl border border-white/10 p-6 mb-8">
          <div className="flex items-center gap-3 mb-4">
            <div className="bg-indigo-500/20 p-2 rounded-lg">
              <Zap className="h-6 w-6 text-indigo-100" />
            </div>
            <h3 className="text-xl font-medium">Sistem Sedang Dipersiapkan</h3>
          </div>
          <p className="text-white/80 mb-4">
            Kami sedang mempersiapkan sistem dengan teknologi terbaru untuk memberikan
            pengalaman ujian yang optimal. Akses akan dibuka pada tanggal 21 September.
          </p>
          <div className="flex flex-wrap gap-3 text-sm">
            <div className="bg-white/10 px-3 py-1.5 rounded-full">Antarmuka Baru</div>
            <div className="bg-white/10 px-3 py-1.5 rounded-full">Kecepatan Tinggi</div>
            <div className="bg-white/10 px-3 py-1.5 rounded-full">Keamanan Ditingkatkan</div>
          </div>
        </div>
      </div>

      <style jsx global>{`
        @keyframes float {
          0%, 100% {
            transform: translateY(0) scale(1);
            opacity: 0.1;
          }
          50% {
            transform: translateY(-20px) scale(1.1);
            opacity: 0.2;
          }
        }
      `}</style>
    </div>
  )
}

export default CbtUser