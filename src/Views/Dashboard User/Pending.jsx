import React, { useState, useEffect } from 'react';

const VerificationPopup = ({ onClose, onRedirectToUser }) => {
  const [animateOut, setAnimateOut] = useState(false);
  
  // animasi keluar
  const handleClose = () => {
    setAnimateOut(true);
    setTimeout(() => {
      onClose();
    }, 500); 
  };

  // HWhatsApp
  const handleWhatsAppClick = () => {
    window.open("https://wa.me/6281585616615", "_blank");
    
    // Start animation out
    setAnimateOut(true);
    
    // setelah animasikan keluar, baru redirect
    setTimeout(() => {
      onRedirectToUser();
    }, 500);
  };

  return (
    <div className={`fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50 transition-opacity duration-500 ${animateOut ? 'opacity-0' : 'opacity-100'}`}>
      <div className={`bg-white rounded-lg shadow-xl w-full max-w-md p-6 text-center relative transition-all duration-500 ${animateOut ? 'scale-75 opacity-0' : 'scale-100 opacity-100'}`}>
        <div className="mb-5">
          <div className="mx-auto w-20 h-20 mb-4 rounded-full flex items-center justify-center animate-bounce">
            <div className="h-14 w-14 rounded-full bg-amber-100 flex items-center justify-center">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-amber-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            </div>
          </div>
          <h2 className="text-2xl font-bold text-amber-500 mb-2 animate-pulse">Pendaftaran Tersimpan</h2>
        </div>
        
        <div className="flex items-center justify-center text-sm text-gray-500 mb-5">
          <span className="inline-block w-3 h-3 bg-amber-500 rounded-full mr-2 animate-ping"></span>
          <span>Status: Pending</span>
        </div>
        
        <p className="text-gray-600 mb-6 text-base leading-relaxed">
          Pendaftaran Anda telah kami simpan namun status verifikasi masih pending. <br></br>
          Silahkan konfirmasi dan hubungi kami melalui WhatsApp.
        </p>
        
        <button 
          onClick={handleWhatsAppClick}
          className="bg-green-500 hover:bg-green-600 text-white py-3 px-6 rounded-full text-base flex items-center justify-center mx-auto w-64 transition-all duration-300 transform hover:scale-105 hover:shadow-lg"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="currentColor"
            className="w-5 h-5 mr-2"
          >
            <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
          </svg>
          <span className="relative inline-block">
            Hubungi via WhatsApp
            <span className="absolute -right-1 -top-1 flex h-3 w-3">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-3 w-3 bg-green-500"></span>
            </span>
          </span>
        </button>
        
        <div className="mt-6 text-sm text-gray-500">
          <button 
            onClick={handleClose} 
            className="text-gray-500 hover:text-gray-700 underline transition-colors duration-300"
          >
            Tutup
          </button>
        </div>
      </div>
    </div>
  );
};

const Pending = () => {
  const [showPopup, setShowPopup] = useState(false);
  
  // menampilkan popup setelah 300ms
  useEffect(() => {
    const timer = setTimeout(() => {
      setShowPopup(true);
    }, 300);
    
    return () => clearTimeout(timer);
  }, []);
  
  const handleClose = () => {
    setShowPopup(false);
  };
  
  // Fungsi untuk mengarahkan ke halaman user setelah menutup popup
  const redirectToUserPage = () => {
    window.location.href = "/dashboard/user";
  };
  
  return (
    <div>
      {showPopup && (
        <VerificationPopup 
          onClose={handleClose} 
          onRedirectToUser={redirectToUserPage} 
        />
      )}
    </div>
  );
};

export default Pending;