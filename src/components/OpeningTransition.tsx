import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "motion/react";

interface OpeningTransitionProps {
  isActive: boolean;
  onComplete: () => void;
}

interface Sparkle {
  id: number;
  top: number;
  left: number;
  size: number;
  delay: number;
  duration: number;
  type: 'gold' | 'white' | 'star';
}

export function OpeningTransition({ isActive, onComplete }: OpeningTransitionProps) {
  const [sparkles, setSparkles] = useState<Sparkle[]>([]);

  useEffect(() => {
    // Generate beautiful sparkles distributed across full screen
    const generated: Sparkle[] = Array.from({ length: 35 }).map((_, i) => ({
      id: i,
      top: Math.random() * 95 + 2,
      left: Math.random() * 94 + 3,
      size: Math.random() * 14 + 10, // 10px to 24px
      delay: Math.random() * 0.4,
      duration: Math.random() * 0.6 + 0.9,
      type: i % 3 === 0 ? 'gold' : i % 3 === 1 ? 'white' : 'star',
    }));
    setSparkles(generated);
  }, []);

  useEffect(() => {
    if (isActive) {
      // 1.5s total duration for the white dim light transition with sparkles
      const timer = setTimeout(() => {
        onComplete();
      }, 1500);
      return () => clearTimeout(timer);
    }
  }, [isActive, onComplete]);

  return (
    <AnimatePresence>
      {isActive && (
        <motion.div
          key="white-dim-light-transition"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.4, ease: "easeInOut" }}
          className="fixed inset-0 z-[10000] flex items-center justify-center pointer-events-none select-none overflow-hidden"
        >
          {/* Full Screen White Dim Light Layer */}
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_rgba(255,255,255,0.96)_0%,_rgba(255,252,245,0.92)_50%,_rgba(255,245,240,0.85)_100%)] backdrop-blur-sm" />

          {/* Soft Warm Divine Halo at Center */}
          <motion.div
            initial={{ scale: 0.8, opacity: 0.3 }}
            animate={{ scale: [0.8, 1.25, 1.1], opacity: [0.3, 0.75, 0.5] }}
            transition={{ duration: 1.5, ease: "easeOut" }}
            className="absolute w-[80vw] h-[80vw] max-w-[600px] max-h-[600px] rounded-full bg-[radial-gradient(circle,_rgba(255,255,255,1)_0%,_rgba(255,236,179,0.5)_45%,_transparent_75%)] blur-2xl pointer-events-none"
          />

          {/* Divine Sparkles */}
          {sparkles.map((sp) => (
            <motion.div
              key={sp.id}
              initial={{ scale: 0, opacity: 0 }}
              animate={{
                scale: [0, 1.2, 0.9, 1.3, 0],
                opacity: [0, 0.95, 0.7, 1, 0],
                y: [0, -15, -30],
              }}
              transition={{
                duration: sp.duration,
                delay: sp.delay,
                ease: "easeInOut",
              }}
              className="absolute pointer-events-none flex items-center justify-center"
              style={{
                top: `${sp.top}%`,
                left: `${sp.left}%`,
                width: `${sp.size}px`,
                height: `${sp.size}px`,
              }}
            >
              {sp.type === 'star' ? (
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  className="w-full h-full drop-shadow-[0_0_8px_rgba(255,215,0,0.8)]"
                >
                  <path
                    d="M12 0L14.5 9.5L24 12L14.5 14.5L12 24L9.5 14.5L0 12L9.5 9.5L12 0Z"
                    fill="url(#goldSparkleGrad)"
                  />
                  <defs>
                    <linearGradient id="goldSparkleGrad" x1="0" y1="0" x2="24" y2="24" gradientUnits="userSpaceOnUse">
                      <stop stopColor="#FFF9C4" />
                      <stop offset="0.5" stopColor="#FFD54F" />
                      <stop offset="1" stopColor="#FFA000" />
                    </linearGradient>
                  </defs>
                </svg>
              ) : sp.type === 'gold' ? (
                <div
                  className="rounded-full bg-[#FFE082] shadow-[0_0_12px_4px_rgba(255,193,7,0.75)]"
                  style={{ width: `${sp.size * 0.6}px`, height: `${sp.size * 0.6}px` }}
                />
              ) : (
                <div
                  className="rounded-full bg-white shadow-[0_0_10px_3px_rgba(255,255,255,0.9)]"
                  style={{ width: `${sp.size * 0.5}px`, height: `${sp.size * 0.5}px` }}
                />
              )}
            </motion.div>
          ))}

          {/* Gentle Auspicious Blessing Center Indicator */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: [0, 0.85, 0.85, 0], scale: [0.9, 1, 1, 1.05] }}
            transition={{ duration: 1.5, ease: "easeInOut" }}
            className="relative z-10 flex flex-col items-center gap-2 text-center"
          >
            <span className="text-3xl sm:text-4xl drop-shadow-[0_0_12px_rgba(255,215,0,0.6)] animate-pulse">
              ✨ 🪔 ✨
            </span>
            <span className="font-serif text-sm tracking-[0.25em] text-[#B8141B] uppercase font-bold drop-shadow-sm">
              ॥ जय माता दी ॥
            </span>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
