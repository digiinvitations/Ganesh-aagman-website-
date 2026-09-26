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
  type: 'gold' | 'white' | 'star' | 'diamond';
}

export function OpeningTransition({ isActive, onComplete }: OpeningTransitionProps) {
  const [sparkles, setSparkles] = useState<Sparkle[]>([]);

  useEffect(() => {
    // Generate beautiful sparkles distributed across full screen
    const generated: Sparkle[] = Array.from({ length: 48 }).map((_, i) => ({
      id: i,
      top: Math.random() * 94 + 3,
      left: Math.random() * 94 + 3,
      size: Math.random() * 16 + 10, // 10px to 26px
      delay: Math.random() * 0.4,
      duration: Math.random() * 0.7 + 0.8,
      type: i % 4 === 0 ? 'gold' : i % 4 === 1 ? 'white' : i % 4 === 2 ? 'star' : 'diamond',
    }));
    setSparkles(generated);
  }, []);

  useEffect(() => {
    if (isActive) {
      // Exactly 1.5 seconds for the white dim light transition with sparkles
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
          transition={{ duration: 0.35, ease: "easeInOut" }}
          className="fixed inset-0 z-[10000] flex items-center justify-center pointer-events-none select-none overflow-hidden"
        >
          {/* 100% Solid Opaque White Base Layer - guarantees hero image is completely hidden */}
          <div className="absolute inset-0 bg-[#FFFFFF]" />

          {/* Soft Dim Warm Divine Radial Gradient Layer */}
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_#FFFFFF_0%,_#FFFDF7_50%,_#FFF6EC_100%)]" />

          {/* Soft Warm Golden Halo at Center */}
          <motion.div
            initial={{ scale: 0.7, opacity: 0.2 }}
            animate={{ scale: [0.7, 1.3, 1.15], opacity: [0.2, 0.7, 0.45] }}
            transition={{ duration: 1.5, ease: "easeOut" }}
            className="absolute w-[85vw] h-[85vw] max-w-[650px] max-h-[650px] rounded-full bg-[radial-gradient(circle,_#FFF9E6_0%,_rgba(255,223,128,0.4)_45%,_transparent_75%)] blur-2xl pointer-events-none"
          />

          {/* Full Screen Divine Sparkles */}
          {sparkles.map((sp) => (
            <motion.div
              key={sp.id}
              initial={{ scale: 0, opacity: 0 }}
              animate={{
                scale: [0, 1.25, 0.9, 1.35, 0],
                opacity: [0, 1, 0.75, 1, 0],
                y: [0, -18, -35],
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
                  className="w-full h-full drop-shadow-[0_0_8px_rgba(255,200,0,0.9)]"
                >
                  <path
                    d="M12 0L14.5 9.5L24 12L14.5 14.5L12 24L9.5 14.5L0 12L9.5 9.5L12 0Z"
                    fill="url(#goldSparkleGrad)"
                  />
                  <defs>
                    <linearGradient id="goldSparkleGrad" x1="0" y1="0" x2="24" y2="24" gradientUnits="userSpaceOnUse">
                      <stop stopColor="#FFFDE7" />
                      <stop offset="0.45" stopColor="#FFD54F" />
                      <stop offset="1" stopColor="#FFA000" />
                    </linearGradient>
                  </defs>
                </svg>
              ) : sp.type === 'diamond' ? (
                <div
                  className="rotate-45 bg-[#FFF9C4] shadow-[0_0_12px_4px_rgba(255,215,0,0.8)] border border-[#FFE082]"
                  style={{ width: `${sp.size * 0.55}px`, height: `${sp.size * 0.55}px` }}
                />
              ) : sp.type === 'gold' ? (
                <div
                  className="rounded-full bg-[#FFD54F] shadow-[0_0_14px_5px_rgba(255,193,7,0.85)]"
                  style={{ width: `${sp.size * 0.65}px`, height: `${sp.size * 0.65}px` }}
                />
              ) : (
                <div
                  className="rounded-full bg-white shadow-[0_0_12px_4px_rgba(255,255,255,1)]"
                  style={{ width: `${sp.size * 0.55}px`, height: `${sp.size * 0.55}px` }}
                />
              )}
            </motion.div>
          ))}

          {/* Gentle Auspicious Blessing Center Indicator */}
          <motion.div
            initial={{ opacity: 0, scale: 0.88 }}
            animate={{ opacity: [0, 0.95, 0.95, 0], scale: [0.88, 1, 1, 1.05] }}
            transition={{ duration: 1.5, ease: "easeInOut" }}
            className="relative z-10 flex flex-col items-center gap-2 text-center"
          >
            <span className="text-3xl sm:text-4xl drop-shadow-[0_0_14px_rgba(255,200,0,0.7)] animate-pulse">
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
