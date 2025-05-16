import React, { useState, useEffect } from 'react';
import NavDashUser from '../../Component/NavDashUser';
import { Beaker, Atom, Stars, Rocket, Zap } from 'lucide-react';

function CbtUser() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [particles, setParticles] = useState([]);
  const [counter, setCounter] = useState(0);
  const [showMessage, setShowMessage] = useState(false);
  const [stars, setStars] = useState([]);
  
  // Create initial stars
  useEffect(() => {
    const newStars = [];
    for (let i = 0; i < 50; i++) {
      newStars.push({
        id: i,
        x: Math.random() * 100,
        y: Math.random() * 100,
        size: Math.random() * 2 + 1,
        opacity: Math.random() * 0.7 + 0.3,
        animationDuration: Math.random() * 3 + 2
      });
    }
    setStars(newStars);
  }, []);

  // Handle mouse move to track position
  useEffect(() => {
    const handleMouseMove = (e) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  // Create particles on mouse move
  useEffect(() => {
    const interval = setInterval(() => {
      if (mousePosition.x !== 0 && mousePosition.y !== 0) {
        const newParticle = {
          id: counter,
          x: mousePosition.x,
          y: mousePosition.y,
          size: Math.random() * 10 + 5,
          speedX: (Math.random() - 0.5) * 6,
          speedY: (Math.random() - 0.5) * 6,
          color: `hsl(${Math.random() * 60 + 220}, 100%, 60%)`,
          lifetime: 100
        };
        
        setParticles(prevParticles => [...prevParticles, newParticle]);
        setCounter(prevCounter => prevCounter + 1);
      }
    }, 100);

    return () => clearInterval(interval);
  }, [mousePosition, counter]);

  // Update particles
  useEffect(() => {
    if (particles.length === 0) return;
    
    const animationFrame = requestAnimationFrame(() => {
      setParticles(prevParticles => 
        prevParticles
          .map(particle => ({
            ...particle,
            x: particle.x + particle.speedX,
            y: particle.y + particle.speedY,
            lifetime: particle.lifetime - 1
          }))
          .filter(particle => particle.lifetime > 0)
      );
    });
    
    return () => cancelAnimationFrame(animationFrame);
  }, [particles]);

  // Show experiment success message
  const handleExperiment = () => {
    setShowMessage(true);
    setTimeout(() => setShowMessage(false), 3000);
  };

  return (
    <>
      <NavDashUser />
      <div className="relative min-h-screen px-4 sm:px-8 py-10 pt-20 bg-gradient-to-br from-purple-700 via-purple-500 to-blue-600 overflow-hidden">
        {/* Floating stars */}
        <div className="absolute inset-0 overflow-hidden">
          {stars.map(star => (
            <div 
              key={star.id}
              className="absolute rounded-full bg-white"
              style={{
                left: `${star.x}%`,
                top: `${star.y}%`,
                width: `${star.size}px`,
                height: `${star.size}px`,
                opacity: star.opacity,
                animation: `twinkle ${star.animationDuration}s ease-in-out infinite alternate`
              }}
            />
          ))}
        </div>

        {/* Mouse trail particles */}
        {particles.map(particle => (
          <div
            key={particle.id}
            className="absolute rounded-full"
            style={{
              left: particle.x,
              top: particle.y,
              width: `${particle.size}px`,
              height: `${particle.size}px`,
              backgroundColor: particle.color,
              opacity: particle.lifetime / 100,
              transform: `translate(-50%, -50%)`
            }}
          />
        ))}

        {/* Main content container */}
        <div className="mt-10 relative z-10 max-w-4xl mx-auto text-center">
          <div className="flex justify-center mb-6">
            <div className="relative">
              <Atom size={80} className="text-white opacity-90" />
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-10 h-10 rounded-full bg-blue-400 animate-pulse opacity-50" />
              </div>
            </div>
          </div>
          
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Science Competition Portal
          </h1>
          
          <div className="bg-white/10 backdrop-blur-md p-6 rounded-xl border border-white/20 shadow-lg mb-8">
            <h2 className="text-2xl font-semibold text-white mb-4">
              Maintenance
            </h2>
            <p className="text-lg text-white/90 mb-4">
              Halo, Sahabat Sains!
              Saat ini halaman Science Competition sedang dalam proses pengembangan supaya dapat memperoleh pengalaman terbaik anda
            </p>
            <div className="flex flex-wrap justify-center gap-4 mb-6">
              <Beaker className="text-blue-200 animate-bounce" size={32} />
              <Stars className="text-yellow-200 animate-pulse" size={32} />
              <Rocket className="text-red-200 animate-bounce" size={32} />
              <Zap className="text-green-200 animate-pulse" size={32} />
            </div>
            
          </div>

          

          

          
        </div>

        {/* CSS animations */}
        <style jsx>{`
          @keyframes twinkle {
            0% { opacity: 0.3; }
            100% { opacity: 1; }
          }
        `}</style>
      </div>
    </>
  );
}

export default CbtUser;