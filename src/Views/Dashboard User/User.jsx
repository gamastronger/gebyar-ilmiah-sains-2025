import DashboardUserLayout from '../../Component/NavDashUser';
import { motion } from 'framer-motion';

function User() {
  return (
    <DashboardUserLayout>
      <div className="bg-gradient-to-br from-indigo-900 via-purple-900 to-gray-900 pt-20 px-4 sm:px-8 py-10 min-h-screen flex items-center justify-center">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="w-full max-w-6xl"
        >
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8">
            {/* Left Card */}
            <motion.div 
              initial={{ x: -20, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: 0.2, duration: 0.4 }}
              className="bg-white/90 backdrop-blur-sm p-6 sm:p-8 flex flex-col items-center justify-center rounded-2xl shadow-xl border border-purple-100"
            >
              <div className="relative mb-6">
                <div className="absolute inset-0 bg-gradient-to-r from-purple-500 to-indigo-600 rounded-full blur-md opacity-70"></div>
                <img 
                  src="/img/logogis.png" 
                  alt="Logo GIS" 
                  className="relative w-28 h-28 sm:w-36 sm:h-36 rounded-full border-4 border-white shadow-lg object-cover"
                />
              </div>
              <h3 className="text-2xl sm:text-3xl font-bold bg-gradient-to-r from-purple-800 to-indigo-700 bg-clip-text text-transparent text-center">Gebyar Ilmiah Sains</h3>
              <div className="w-20 h-1 bg-gradient-to-r from-purple-500 to-indigo-500 rounded-full mt-4"></div>
            </motion.div>

            {/* Right Card */}
            <motion.div 
              initial={{ x: 20, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: 0.3, duration: 0.4 }}
              className="bg-white/90 backdrop-blur-sm p-6 sm:p-8 rounded-2xl shadow-xl border border-purple-100"
            >
              <h2 className="text-2xl sm:text-3xl font-bold mb-4 text-slate-800 relative">
                <span className="bg-gradient-to-r from-purple-800 to-indigo-700 bg-clip-text text-transparent">About GIS</span>
                <div className="h-1 w-20 bg-gradient-to-r from-purple-500 to-indigo-500 rounded-full mt-2"></div>
              </h2>
              
              <div className="overflow-y-auto max-h-80 sm:max-h-96 pr-2 custom-scrollbar">
                <p className="text-base sm:text-lg leading-relaxed text-slate-700">
                  13th Gebyar Ilmiah Sains Tingkat Nasional 2025 Jenjang SD/Sederajat, SMP/Sederajat, SMA/SMK/Sederajat, dan 
                  Mahasiswa/i yang terdiri dari Science Competition dan Science Writing Competition yang merupakan salah satu 
                  kegiatan dari HMP Pendidikan IPA FMIPA Unesa yang bertujuan sebagai Ajang kompetisi tingkat nasional untuk 
                  meningkatkan kemampuan bersaing siswa dan mahasiswa dalam Ilmu Pengetahuan dan Teknologi (IPTEK) dan melatih 
                  siswa dan mahasiswa dalam bersaing inovasi di bidang Pendidikan, Bioteknologi, Energi Terbarukan, dan Lingkungan.
                </p>
              </div>
            </motion.div>
          </div>
        </motion.div>
      </div>
      
      {/* Custom CSS untuk scrollbar */}
      <style jsx>{`
        .custom-scrollbar::-webkit-scrollbar {
          width: 5px;
        }
        
        .custom-scrollbar::-webkit-scrollbar-track {
          background: #f1f1f1;
          border-radius: 10px;
        }
        
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: linear-gradient(to bottom, #9333ea, #6366f1);
          border-radius: 10px;
        }
        
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: linear-gradient(to bottom, #7e22ce, #4f46e5);
        }
      `}</style>
    </DashboardUserLayout>
  );
}

export default User;