import { useEffect, useRef } from "react";
import { motion, useInView } from "motion/react";
import confetti from "canvas-confetti";
import { WeddingData } from "../types";

interface ClosingMessageProps {
  data: WeddingData;
}

export function ClosingMessage({ data }: ClosingMessageProps) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.5 });

  useEffect(() => {
    if (isInView) {
      const duration = 3 * 1000;
      const animationEnd = Date.now() + duration;
      const defaults = { startVelocity: 25, spread: 360, ticks: 60, zIndex: 10000, colors: ['#D4AF37', '#FFBF00', '#8B0000', '#A91F3D'] };

      const randomInRange = (min: number, max: number) => Math.random() * (max - min) + min;

      const interval: any = setInterval(function() {
        const timeLeft = animationEnd - Date.now();

        if (timeLeft <= 0) {
          return clearInterval(interval);
        }

        const particleCount = 40 * (timeLeft / duration);
        confetti(Object.assign({}, defaults, { particleCount, origin: { x: randomInRange(0.1, 0.3), y: Math.random() - 0.2 } }));
        confetti(Object.assign({}, defaults, { particleCount, origin: { x: randomInRange(0.7, 0.9), y: Math.random() - 0.2 } }));
      }, 250);

      return () => clearInterval(interval);
    }
  }, [isInView]);

  return (
    <section ref={ref} className="py-24 px-6 bg-[#3B0918] relative overflow-hidden flex flex-col items-center justify-center text-center border-t border-[#D4AF37]/20">
      
      {/* Top Decorative Wavy Line - Styled as Golden Pattern */}
      <div className="w-full max-w-sm mx-auto mb-10 flex justify-center opacity-70">
        <svg width="200" height="30" viewBox="0 0 200 30" preserveAspectRatio="none">
          <path d="M 0 15 Q 50 15 100 25 T 200 15" fill="none" stroke="#D4AF37" strokeWidth="1" />
          <circle cx="100" cy="18" r="1.5" fill="#D4AF37" />
          <circle cx="92" cy="22" r="1" fill="#D4AF37" />
          <circle cx="108" cy="22" r="1" fill="#D4AF37" />
        </svg>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 1 }}
        className="max-w-md mx-auto flex flex-col items-center relative z-10"
      >
        <p className="font-serif font-semibold text-lg md:text-xl text-[#FDFBF7] leading-relaxed drop-shadow-sm mb-6 whitespace-pre-line px-4">
          With love, devotion & togetherness
        </p>
        
        <h3 className="font-serif text-[#D4AF37] uppercase tracking-[0.25em] text-[10px] sm:text-xs font-semibold mb-2">
          GANPATI BAPPA'S
        </h3>
        
        <h2 className="font-serif font-bold text-4xl md:text-5xl text-[#D4AF37] tracking-wider drop-shadow-md mb-2">
          GRAND AGMAN
        </h2>
        
        <p className="font-serif text-[#FDFBF7] uppercase tracking-[0.25em] text-[9px] sm:text-[10px] font-semibold mt-3">
          14 — 20 SEPTEMBER 2026
        </p>
      </motion.div>

      {/* Bottom Decorative Wavy Line */}
      <div className="w-full max-w-sm mx-auto mt-12 flex justify-center opacity-70">
        <svg width="200" height="30" viewBox="0 0 200 30" preserveAspectRatio="none">
          <path d="M 0 15 Q 50 15 100 5 T 200 15" fill="none" stroke="#D4AF37" strokeWidth="1" />
          <circle cx="100" cy="12" r="1.5" fill="#D4AF37" />
          <circle cx="92" cy="8" r="1" fill="#D4AF37" />
          <circle cx="108" cy="8" r="1" fill="#D4AF37" />
        </svg>
      </div>
    </section>
  );
}
