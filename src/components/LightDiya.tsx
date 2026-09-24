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
            <motion.div
              whileHover={{ scale: 1.08 }}
              whileTap={{ scale: 0.94 }}
              className={`text-6xl sm:text-7xl transition-all duration-300 relative z-10 ${
                isLit 
                  ? 'drop-shadow-[0_12px_25px_rgba(212,175,55,0.6)] brightness-110' 
                  : 'drop-shadow-md opacity-85'
              }`}
            >
              🪔
            </motion.div>
          </button>
        </div>

        {/* Status Text / Jai Mata Di */}
        <div className="h-10 mt-4 flex items-center justify-center">
          <AnimatePresence mode="wait">
            {isLit ? (
              <motion.div
                key="lit"
                initial={{ opacity: 0, scale: 0.85, y: 5 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, y: -5 }}
                className="flex flex-col items-center gap-1"
              >
                <p className="font-serif text-[#B8141B] text-xl sm:text-2xl tracking-[0.18em] font-extrabold drop-shadow-sm">
                  ॥ जय माता दी ॥
                </p>
                <p className="text-[10px] uppercase tracking-widest text-[#E65100] font-bold">
                  May Maa Bless You & Your Family
                </p>
              </motion.div>
            ) : hasLitOnce ? (
              <motion.p
                key="unlit"
                initial={{ opacity: 0, y: 5 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -5 }}
                className="font-serif text-[#7A4B5B] text-xs uppercase tracking-widest font-semibold cursor-pointer"
                onClick={handleToggle}
              >
                Tap the diya to relight
              </motion.p>
            ) : (
              <motion.div
                key="initial"
                initial={{ opacity: 0, y: 5 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -5 }}
                className="px-5 py-1.5 rounded-full bg-[#FFFDF7] border border-[#D4AF37]/50 shadow-sm flex items-center gap-2 animate-pulse cursor-pointer"
                onClick={handleToggle}
              >
                <span className="text-xs">✨</span>
                <span className="font-serif text-[#B8141B] text-xs tracking-[0.2em] uppercase font-bold">
                  TAP TO LIGHT
                </span>
                <span className="text-xs">✨</span>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </motion.div>
    </section>
  );
}
