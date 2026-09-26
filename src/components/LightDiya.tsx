import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';

export function LightDiya() {
  const [isLit, setIsLit] = useState(false);
  const [hasLitOnce, setHasLitOnce] = useState(false);

  const handleToggle = () => {
    setIsLit(!isLit);
    if (!hasLitOnce && !isLit) {
      setHasLitOnce(true);
    }
  };

  return (
    <section className="py-20 px-4 md:px-6 bg-[#FDF0F4] flex flex-col items-center relative overflow-hidden border-t border-[#F3C3D2]/50">
      {/* Background warm radial glow when lit */}
      <motion.div 
        className="absolute inset-0 pointer-events-none"
        animate={{
          background: isLit 
            ? 'radial-gradient(circle at center, rgba(255,183,77,0.3) 0%, rgba(253,240,244,0.1) 60%, transparent 100%)'
            : 'radial-gradient(circle at center, rgba(255,183,77,0.06) 0%, transparent 70%)'
        }}
        transition={{ duration: 1 }}
      />

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
        className="relative z-10 flex flex-col items-center w-full max-w-sm mx-auto text-center"
      >
        <span className="text-xl mb-1 text-[#E65100]">🪔</span>

        <h3 className="font-serif text-2xl uppercase tracking-[0.16em] text-[#B8141B] font-bold drop-shadow-sm mb-3">
          LIGHT A DIYA
        </h3>
        
        <p className="font-serif text-xs sm:text-sm text-[#7A4B5B] leading-relaxed max-w-xs mb-8">
          Offer your prayers and blessings by lighting a diya for this auspicious occasion.
        </p>

        {/* Diya Assembly with Marigold Floral Ring */}
        <div className="relative flex items-center justify-center my-4">
          
          {/* Marigold flower ring background */}
          <div className="absolute -inset-6 rounded-full border border-[#D4AF37]/30 bg-[#FFFDF7]/60 shadow-[0_8px_30px_rgba(212,175,55,0.15)] flex items-center justify-center pointer-events-none">
            <span className="absolute -top-3 text-lg">🌼</span>
            <span className="absolute -bottom-3 text-lg">🌼</span>
            <span className="absolute -left-3 text-lg">🌼</span>
            <span className="absolute -right-3 text-lg">🌼</span>
            <span className="absolute top-1 right-1 text-sm">🌸</span>
            <span className="absolute top-1 left-1 text-sm">🌸</span>
            <span className="absolute bottom-1 right-1 text-sm">🌸</span>
            <span className="absolute bottom-1 left-1 text-sm">🌸</span>
          </div>

          {/* Interactive Diya Button */}
          <button 
            onClick={handleToggle}
            className="relative outline-none group focus:outline-none p-6 z-10 cursor-pointer"
            aria-label={isLit ? "Extinguish Diya" : "Light Diya"}
          >
            {/* Animated Flame */}
            <AnimatePresence>
              {isLit && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.3, y: 15 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.3, y: 15 }}
                  transition={{ duration: 0.4 }}
                  className="absolute -top-8 left-1/2 -translate-x-1/2 flex justify-center items-center w-full pointer-events-none"
                >
                  {/* Outer pulsating warm glow */}
                  <motion.div 
                    animate={{ opacity: [0.6, 0.95, 0.6], scale: [0.95, 1.25, 0.95] }}
                    transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
                    className="absolute w-16 h-16 bg-[#FFBF00] rounded-full blur-[18px] opacity-80"
                  />
                  {/* Inner flame shape */}
                  <span className="text-5xl filter drop-shadow-[0_0_20px_rgba(255,140,0,0.9)] relative z-10 animate-flame-glow">
                    🔥
                  </span>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Traditional Brass Diya Base */}
            <div className="relative flex flex-col items-center">
              <svg 
                viewBox="0 0 100 60" 
                className="w-24 h-16 filter drop-shadow-[0_4px_12px_rgba(212,175,55,0.4)] transition-transform duration-300 group-hover:scale-105"
              >
                {/* Diya Oil Well Bowl */}
                <path 
                  d="M10 25 Q50 60 90 25 Q95 20 85 20 Q50 35 15 20 Q5 20 10 25Z" 
                  fill="url(#brassGradient)" 
                  stroke="#B8860B" 
                  strokeWidth="1.5"
                />
                {/* Diya Lip / Rim */}
                <ellipse 
                  cx="50" 
                  cy="20" 
                  rx="38" 
                  ry="6" 
                  fill="#E5A912" 
                  stroke="#D4AF37" 
                  strokeWidth="1"
                />
                {/* Diya Wick Peak */}
                <path 
                  d="M48 20 Q50 14 52 20 Z" 
                  fill="#8B4513" 
                />
                {/* Diya Stem Base */}
                <path 
                  d="M44 42 L38 55 Q50 58 62 55 L56 42 Z" 
                  fill="url(#brassGradient)" 
                  stroke="#B8860B" 
                  strokeWidth="1"
                />
                
                <defs>
                  <linearGradient id="brassGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#FFE082" />
                    <stop offset="50%" stopColor="#D4AF37" />
                    <stop offset="100%" stopColor="#996515" />
                  </linearGradient>
                </defs>
              </svg>
            </div>
          </button>
        </div>

        {/* Status Call to Action */}
        <p className="font-serif text-xs font-bold tracking-[0.2em] uppercase mt-2 text-[#E65100]">
          {isLit ? "॥ शुभ ज्योति प्रज्वलित ॥" : "TAP THE DIYA TO LIGHT"}
        </p>

        {hasLitOnce && (
          <motion.p 
            initial={{ opacity: 0, y: 5 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-xs font-serif text-[#7A4B5B] italic mt-3"
          >
            May Maa Karoli illuminate your life with infinite bliss and peace.
          </motion.p>
        )}
      </motion.div>
    </section>
  );
}
