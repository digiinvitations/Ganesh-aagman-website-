import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ChevronDown, ChevronsDown } from 'lucide-react';

interface FullScreenScrollFlashProps {
  isVisible: boolean;
}

export function FullScreenScrollFlash({ isVisible }: FullScreenScrollFlashProps) {
  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          key="scroll-down-flash"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          className="fixed inset-0 z-[10005] flex flex-col items-center justify-center pointer-events-none select-none overflow-hidden"
        >
          {/* Radiant Golden / Crimson Flash Backdrop */}
          <motion.div
            initial={{ opacity: 0, scale: 0.92 }}
            animate={{ opacity: [0, 0.95, 0.9, 0], scale: [0.92, 1, 1.02, 1.05] }}
            transition={{ duration: 1.0, ease: "easeInOut" }}
            className="absolute inset-0 bg-[radial-gradient(circle_at_center,_rgba(255,248,225,0.95)_0%,_rgba(255,223,128,0.75)_35%,_rgba(184,20,27,0.35)_70%,_rgba(59,7,16,0.6)_100%)]"
          />

          {/* Central Indicating Flash Container */}
          <motion.div
            initial={{ opacity: 0, y: -20, scale: 0.85 }}
            animate={{ 
              opacity: [0, 1, 1, 0],
              y: [-20, 0, 10, 30],
              scale: [0.85, 1.05, 1, 0.95]
            }}
            transition={{ duration: 1.0, ease: "easeOut" }}
            className="relative z-10 flex flex-col items-center gap-3.5 px-6 py-6 rounded-3xl bg-[#3B0710]/85 border-2 border-[#FFD54F] shadow-[0_0_50px_rgba(255,215,0,0.85)] backdrop-blur-md max-w-xs text-center"
          >
            {/* Sacred Diya with pulse */}
            <div className="w-14 h-14 rounded-full bg-[#FFF9C4] border-2 border-[#D4AF37] flex items-center justify-center shadow-[0_0_20px_rgba(255,215,0,0.9)] animate-pulse">
              <span className="text-2xl">🪔</span>
            </div>

            {/* Sacred Hindi Blessing */}
            <span className="font-serif text-xs uppercase tracking-[0.25em] text-[#FFD54F] font-bold drop-shadow-sm">
              ॥ कृपया नीचे स्क्रॉल करें ॥
            </span>

            {/* Big Indicating Scroll Down Heading */}
            <div className="space-y-0.5">
              <h3 className="font-serif text-lg sm:text-xl font-extrabold uppercase tracking-[0.16em] text-[#FFFDF7] drop-shadow-[0_2px_8px_rgba(0,0,0,0.7)]">
                Scroll Down
              </h3>
              <p className="font-serif text-[11px] text-[#FFE082] uppercase tracking-[0.18em] font-medium">
                To Explore Invitation
              </p>
            </div>

            {/* Large Cascading Bouncing Downward Arrows */}
            <div className="flex flex-col items-center -space-y-2 pt-1">
              <ChevronDown className="w-7 h-7 text-[#FFD54F] animate-bounce stroke-[3]" />
              <ChevronsDown className="w-8 h-8 text-[#FFFDF7] animate-bounce stroke-[3]" />
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
