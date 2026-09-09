import React, { useState } from 'react';
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
    <section className="py-16 px-4 md:px-6 bg-[#3B0918] flex flex-col items-center relative overflow-hidden">
      {/* Background radial glow when lit */}
      <motion.div 
        className="absolute inset-0 pointer-events-none"
        animate={{
          background: isLit 
            ? 'radial-gradient(circle at center, rgba(212,175,55,0.15) 0%, transparent 60%)'
            : 'radial-gradient(circle at center, rgba(212,175,55,0.02) 0%, transparent 60%)'
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
        <h3 className="font-serif text-2xl uppercase tracking-widest text-[#D4AF37] font-bold drop-shadow-sm mb-4">
          Light a Diya
        </h3>
        
        <p className="font-serif text-[11px] md:text-xs text-[#FDFBF7]/80 leading-relaxed italic mb-8">
          Offer your blessings by lighting a virtual diya for the auspicious occasion.
        </p>

        {/* Interactive Diya Button */}
        <button 
          onClick={handleToggle}
          className="relative outline-none group mb-6 focus:outline-none"
          aria-label={isLit ? "Extinguish Diya" : "Light Diya"}
        >
          {/* Flame (Absolute) */}
          <AnimatePresence>
            {isLit && (
              <motion.div
                initial={{ opacity: 0, scale: 0.5, y: 10 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.5, y: 10 }}
                transition={{ duration: 0.5 }}
                className="absolute -top-12 left-1/2 -translate-x-1/2 flex justify-center w-full"
              >
                {/* Glow behind flame */}
                <motion.div 
                  animate={{ opacity: [0.6, 0.9, 0.6], scale: [0.9, 1.1, 0.9] }}
                  transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                  className="absolute top-4 w-12 h-12 bg-[#FFBF00] rounded-full blur-[15px]"
                />
                <span className="text-5xl drop-shadow-[0_0_15px_rgba(255,191,0,0.8)] relative z-10">🔥</span>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Diya Base */}
          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className={`text-6xl transition-transform duration-300 relative z-10 ${isLit ? 'drop-shadow-[0_10px_20px_rgba(212,175,55,0.4)]' : 'drop-shadow-lg grayscale-[0.3]'}`}
          >
            🪔
          </motion.div>
        </button>

        {/* Thank you message */}
        <div className="h-8 flex items-center justify-center">
          <AnimatePresence mode="wait">
            {isLit ? (
              <motion.p
                key="lit"
                initial={{ opacity: 0, y: 5 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -5 }}
                className="font-serif text-[#D4AF37] text-sm tracking-widest uppercase font-bold"
              >
                Thank you for your blessings!
              </motion.p>
            ) : hasLitOnce ? (
              <motion.p
                key="unlit"
                initial={{ opacity: 0, y: 5 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -5 }}
                className="font-serif text-[#FDFBF7]/60 text-xs tracking-wider"
              >
                Tap the diya to relight
              </motion.p>
            ) : (
              <motion.p
                key="initial"
                initial={{ opacity: 0, y: 5 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -5 }}
                className="font-serif text-[#FDFBF7]/80 text-xs tracking-wider uppercase animate-pulse"
              >
                Tap to light
              </motion.p>
            )}
          </AnimatePresence>
        </div>
      </motion.div>
    </section>
  );
}
