import React from 'react';
import { ChevronsDown } from 'lucide-react';
import { motion } from 'motion/react';

interface ScrollPromptProps {
  onClick?: () => void;
}

// Delicate sacred marigold petal
function MarigoldPetal({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 32 32" fill="none" className={className}>
      <defs>
        <linearGradient id="marigoldPetalGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#FFF9C4" />
          <stop offset="35%" stopColor="#FFB300" />
          <stop offset="75%" stopColor="#FB8C00" />
          <stop offset="100%" stopColor="#D84315" />
        </linearGradient>
      </defs>
      <path
        d="M16 2 C22 8, 28 16, 23 25 C19 31, 13 31, 9 25 C4 16, 10 8, 16 2 Z"
        fill="url(#marigoldPetalGrad)"
      />
      <path
        d="M16 5 C16.5 12, 16.5 21, 16 27"
        stroke="#FFE082"
        strokeWidth="0.75"
        strokeLinecap="round"
        opacity="0.65"
      />
    </svg>
  );
}

// Small auspicious marigold blossom
function MarigoldBlossom({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className}>
      {[0, 45, 90, 135, 180, 225, 270, 315].map((angle, idx) => (
        <ellipse
          key={idx}
          cx="12"
          cy="6"
          rx="2.2"
          ry="3.8"
          fill={idx % 2 === 0 ? "#FFB300" : "#FFA000"}
          opacity="0.9"
          transform={`rotate(${angle} 12 12)`}
        />
      ))}
      <circle cx="12" cy="12" r="2.2" fill="#D84315" />
      <circle cx="12" cy="12" r="1.2" fill="#FFF9C4" />
    </svg>
  );
}

export function ScrollPrompt({ onClick }: ScrollPromptProps) {
  return (
    <div className="w-full flex flex-col items-center justify-center pt-5 pb-5 px-4 relative z-30 pointer-events-auto select-none">
      
      {/* Floating Marigold Petals and Glow Container behind the button */}
      <div className="relative flex items-center justify-center">

        {/* Soft Ambient Golden-Amber Floral Halo */}
        <div className="absolute inset-0 -inset-x-8 -inset-y-3 bg-[radial-gradient(ellipse_at_center,_rgba(255,179,0,0.22)_0%,_rgba(230,81,0,0.1)_45%,_transparent_75%)] blur-md pointer-events-none z-0" />

        {/* Floating Petal 1: Top Left */}
        <motion.div
          animate={{
            y: [-5, 6, -5],
            x: [-4, 3, -4],
            rotate: [-14, 18, -14],
          }}
          transition={{ duration: 4.2, repeat: Infinity, ease: "easeInOut" }}
          className="absolute -top-3.5 -left-5 sm:-left-7 w-6 h-6 pointer-events-none z-0 opacity-75 drop-shadow-xs"
        >
          <MarigoldPetal className="w-full h-full" />
        </motion.div>

        {/* Floating Petal 2: Top Right */}
        <motion.div
          animate={{
            y: [5, -6, 5],
            x: [3, -5, 3],
            rotate: [15, -12, 15],
          }}
          transition={{ duration: 3.8, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
          className="absolute -top-4 -right-4 sm:-right-6 w-5 h-5 pointer-events-none z-0 opacity-70 drop-shadow-xs"
        >
          <MarigoldPetal className="w-full h-full" />
        </motion.div>

        {/* Floating Blossom: Bottom Left */}
        <motion.div
          animate={{
            y: [4, -5, 4],
            x: [-3, 4, -3],
            rotate: [-10, 25, -10],
          }}
          transition={{ duration: 4.6, repeat: Infinity, ease: "easeInOut", delay: 1 }}
          className="absolute -bottom-3 -left-3 sm:-left-5 w-5 h-5 pointer-events-none z-0 opacity-65 drop-shadow-xs"
        >
          <MarigoldBlossom className="w-full h-full" />
        </motion.div>

        {/* Floating Petal 3: Bottom Right */}
        <motion.div
          animate={{
            y: [-6, 5, -6],
            x: [4, -3, 4],
            rotate: [20, -15, 20],
          }}
          transition={{ duration: 4.0, repeat: Infinity, ease: "easeInOut", delay: 1.4 }}
          className="absolute -bottom-3.5 -right-5 sm:-right-7 w-6 h-6 pointer-events-none z-0 opacity-75 drop-shadow-xs"
        >
          <MarigoldPetal className="w-full h-full" />
        </motion.div>

        {/* Floating Petal 4: Top Center Drift */}
        <motion.div
          animate={{
            y: [-3, 5, -3],
            x: [2, -2, 2],
            rotate: [-8, 12, -8],
          }}
          transition={{ duration: 3.5, repeat: Infinity, ease: "easeInOut", delay: 0.8 }}
          className="absolute -top-5 left-1/3 w-4 h-4 pointer-events-none z-0 opacity-55"
        >
          <MarigoldPetal className="w-full h-full" />
        </motion.div>

        {/* Floating Blossom: Bottom Center Drift */}
        <motion.div
          animate={{
            y: [3, -4, 3],
            x: [-2, 3, -2],
            rotate: [8, -16, 8],
          }}
          transition={{ duration: 4.8, repeat: Infinity, ease: "easeInOut", delay: 1.8 }}
          className="absolute -bottom-4 right-1/3 w-4 h-4 pointer-events-none z-0 opacity-50"
        >
          <MarigoldBlossom className="w-full h-full" />
        </motion.div>

        {/* Scroll Button */}
        <button
          type="button"
          onClick={onClick}
          aria-label="Scroll down to explore invitation"
          className="group relative z-10 inline-flex items-center gap-3 px-6 py-2.5 sm:px-7 sm:py-3 rounded-full bg-[#FFFDF7]/95 hover:bg-[#FFFDF7] backdrop-blur-md border-2 border-[#D4AF37] shadow-[0_6px_25px_rgba(212,175,55,0.45)] hover:shadow-[0_8px_30px_rgba(212,175,55,0.7)] transition-all duration-300 transform hover:scale-105 active:scale-95 cursor-pointer"
        >
          {/* Pulsating Indicating Outer Halo Ring */}
          <span className="absolute -inset-1 rounded-full bg-gradient-to-r from-[#D4AF37]/50 via-[#FFD54F]/70 to-[#D4AF37]/50 blur-xs opacity-75 animate-pulse group-hover:opacity-100 transition-opacity pointer-events-none" />

          {/* Auspicious Diya */}
          <span className="relative text-base sm:text-lg animate-bounce drop-shadow-sm">
            🪔
          </span>

          {/* Bigger, Bold Devotional Title */}
          <div className="relative flex flex-col items-start text-left leading-tight">
            <span className="font-serif text-[11px] sm:text-xs font-black uppercase tracking-[0.2em] text-[#B8141B] drop-shadow-xs">
              Scroll Down To Explore
            </span>
            <span className="font-serif text-[9px] uppercase tracking-[0.16em] text-[#E65100] font-bold">
              पवित्र निमंत्रण दर्शन हेतु ↓
            </span>
          </div>

          {/* Indicating Downward Arrow with Bounce Effect */}
          <div className="relative w-7 h-7 rounded-full bg-[#B8141B] border border-[#FFD54F] flex items-center justify-center shadow-xs text-[#FFFDF7] group-hover:bg-[#800C12] transition-colors">
            <ChevronsDown className="w-4 h-4 text-[#FFD54F] animate-bounce stroke-[3]" />
          </div>
        </button>
      </div>
    </div>
  );
}
