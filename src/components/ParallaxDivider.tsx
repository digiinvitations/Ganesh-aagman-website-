import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'motion/react';

export function ParallaxDivider() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"]
  });

  // Smoothly translate the background on the Y axis
  const y = useTransform(scrollYProgress, [0, 1], ["-25%", "25%"]);

  return (
    <div 
      ref={ref} 
      className="w-full h-24 md:h-28 overflow-hidden relative flex items-center justify-center bg-[#FAF2F5] border-y border-[#F3C3D2]/70"
    >
      {/* Background that moves in parallax */}
      <motion.div
        style={{ y }}
        className="absolute inset-0 w-full h-[150%] -top-[25%] opacity-15 pointer-events-none"
      >
        <div 
          className="w-full h-full"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23d4af37' fill-opacity='0.6'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
            backgroundSize: '28px 28px'
          }}
        />
      </motion.div>

      {/* Fade edges to blend smoothly */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#FDF0F4] via-transparent to-[#FDF0F4] pointer-events-none" />
      
      {/* Central sacred motif */}
      <div className="relative z-10 flex items-center justify-center gap-3">
        <div className="w-12 h-px bg-gradient-to-r from-transparent to-[#D4AF37]" />
        <span className="text-[#E65100] text-sm">
          🌼
        </span>
        <div className="w-12 h-px bg-gradient-to-l from-transparent to-[#D4AF37]" />
      </div>
    </div>
  );
}
