import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'motion/react';

export function ParallaxDivider() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"]
  });

  // Smoothly translate the background on the Y axis
  const y = useTransform(scrollYProgress, [0, 1], ["-30%", "30%"]);

  return (
    <div 
      ref={ref} 
      className="w-full h-32 md:h-40 overflow-hidden relative flex items-center justify-center bg-[#2A040F] border-y border-[#D4AF37]/20"
    >
      {/* Background that moves in parallax */}
      <motion.div
        style={{ y }}
        className="absolute inset-0 w-full h-[160%] -top-[30%] opacity-20 pointer-events-none"
      >
        <div 
          className="w-full h-full"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23d4af37' fill-opacity='0.4'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
            backgroundSize: '30px 30px'
          }}
        />
      </motion.div>

      {/* Fade edges to blend into the dark maroon sections smoothly */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#3B0918] via-transparent to-[#3B0918] pointer-events-none" />
      
      {/* Central decorative motif */}
      <div className="relative z-10 flex items-center justify-center gap-4">
        <div className="w-12 h-px bg-gradient-to-r from-transparent to-[#D4AF37]/50" />
        <span className="text-[#D4AF37] opacity-80 text-xl drop-shadow-[0_0_10px_rgba(212,175,55,0.5)]">
          🪷
        </span>
        <div className="w-12 h-px bg-gradient-to-l from-transparent to-[#D4AF37]/50" />
      </div>
    </div>
  );
}
