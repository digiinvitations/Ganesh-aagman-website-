import { useEffect, useRef } from "react";
import { motion, useInView } from "motion/react";
import confetti from "canvas-confetti";
import { WeddingData } from "../types";

interface ClosingMessageProps {
  data?: WeddingData;
}

export function ClosingMessage({ data }: ClosingMessageProps) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.4 });
  const customCardImage = data?.faithDevotionImageUrl;

  useEffect(() => {
    if (isInView) {
      const duration = 2.5 * 1000;
      const animationEnd = Date.now() + duration;
      // Traditional devotional colors: Gold, Saffron Orange, Vermilion Red, Golden Yellow
      const defaults = { 
        startVelocity: 25, 
        spread: 360, 
        ticks: 60, 
        zIndex: 10000, 
        colors: ['#D4AF37', '#FF7A00', '#B8141B', '#FFC107', '#FFF5F8'] 
      };

      const randomInRange = (min: number, max: number) => Math.random() * (max - min) + min;

      const interval: any = setInterval(function() {
        const timeLeft = animationEnd - Date.now();

        if (timeLeft <= 0) {
          return clearInterval(interval);
        }

        const particleCount = 35 * (timeLeft / duration);
        confetti(Object.assign({}, defaults, { particleCount, origin: { x: randomInRange(0.1, 0.3), y: Math.random() - 0.2 } }));
        confetti(Object.assign({}, defaults, { particleCount, origin: { x: randomInRange(0.7, 0.9), y: Math.random() - 0.2 } }));
      }, 250);

      return () => clearInterval(interval);
    }
  }, [isInView]);

  return (
    <section ref={ref} className="py-24 px-5 bg-[#FDF0F4] relative overflow-hidden flex flex-col items-center justify-center text-center border-t border-[#F3C3D2]/50">
      
      {/* Background radial glow */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_rgba(255,183,77,0.08)_0%,_transparent_70%)] pointer-events-none" />

      {/* Top Ornamental Arch Line */}
      <div className="w-full max-w-xs mx-auto mb-8 flex items-center justify-center gap-3 opacity-80">
        <div className="h-[1px] w-16 bg-gradient-to-r from-transparent to-[#D4AF37]" />
        <span className="text-[#E65100] text-sm">🌼</span>
        <div className="h-[1px] w-16 bg-gradient-to-l from-transparent to-[#D4AF37]" />
      </div>

      <motion.div
        initial={{ opacity: 0, y: 25 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.9 }}
        className="max-w-md mx-auto flex flex-col items-center relative z-10 w-full"
      >
        {/* 
          WITH FAITH, DEVOTION & TOGETHERNESS CONTENT BOX:
          If faithDevotionImageUrl is set from Admin, replace full content box with single image content
          with the exact same ratio & royal golden framing as the created content box.
        */}
        {customCardImage ? (
          <div className="w-full bg-[#FFFDF7] rounded-3xl border-2 border-[#D4AF37]/60 shadow-[0_12px_35px_rgba(212,175,55,0.15)] relative overflow-hidden group">
            {/* Inner hairline border */}
            <div className="absolute inset-2.5 rounded-2xl border border-[#B8141B]/20 pointer-events-none z-10" />

            {/* Corner traditional stars */}
            <span className="absolute top-3 left-3 text-xs text-[#D4AF37] z-10 drop-shadow-sm pointer-events-none">✦</span>
            <span className="absolute top-3 right-3 text-xs text-[#D4AF37] z-10 drop-shadow-sm pointer-events-none">✦</span>
            <span className="absolute bottom-3 left-3 text-xs text-[#D4AF37] z-10 drop-shadow-sm pointer-events-none">✦</span>
            <span className="absolute bottom-3 right-3 text-xs text-[#D4AF37] z-10 drop-shadow-sm pointer-events-none">✦</span>

            <img 
              src={customCardImage} 
              alt="With Faith, Devotion & Togetherness" 
              className="w-full h-auto object-cover rounded-3xl block transition-transform duration-500 group-hover:scale-[1.01]" 
            />
          </div>
        ) : (
          <div className="w-full bg-[#FFFDF7] rounded-3xl p-7 sm:p-9 border-2 border-[#D4AF37]/50 shadow-[0_12px_35px_rgba(212,175,55,0.12)] relative flex flex-col items-center">
            
            {/* Inner hairline border */}
            <div className="absolute inset-2.5 rounded-2xl border border-[#B8141B]/15 pointer-events-none" />

            {/* Corner traditional stars */}
            <span className="absolute top-3 left-3 text-xs text-[#D4AF37]">✦</span>
            <span className="absolute top-3 right-3 text-xs text-[#D4AF37]">✦</span>
            <span className="absolute bottom-3 left-3 text-xs text-[#D4AF37]">✦</span>
            <span className="absolute bottom-3 right-3 text-xs text-[#D4AF37]">✦</span>

            {/* Subtitle */}
            <p className="font-serif font-bold text-xs sm:text-sm uppercase tracking-[0.25em] text-[#E65100] mb-3">
              WITH FAITH, DEVOTION & TOGETHERNESS
            </p>

            {/* Devotional Salutation */}
            <h3 className="font-serif text-2xl sm:text-3xl font-extrabold text-[#B8141B] tracking-[0.16em] mb-3 drop-shadow-sm">
              ॥ जय माता दी ॥
            </h3>

            {/* Event Title */}
            <h2 className="font-serif font-extrabold text-3xl sm:text-4xl text-[#B8141B] tracking-wider mb-2">
              MATA KI CHOWKI
            </h2>

            {/* Event Date */}
            <p className="font-serif text-sm sm:text-base font-bold text-[#E65100] tracking-[0.2em] uppercase mb-6">
              24 OCTOBER 2026
            </p>

            <div className="w-24 h-px bg-gradient-to-r from-transparent via-[#D4AF37] to-transparent mb-6" />

            {/* Closing Heartfelt Message */}
            <div className="flex flex-col gap-3 font-serif text-[#3C1B26] text-sm sm:text-base leading-relaxed px-2 mb-6">
              <p>
                Your presence and blessings will make this auspicious evening even more special.
              </p>
              <p className="text-[#5E2B3C] italic">
                We look forward to welcoming you with folded hands and heartfelt devotion.
              </p>
            </div>

            <div className="w-24 h-px bg-gradient-to-r from-transparent via-[#D4AF37] to-transparent mb-6" />

            {/* With Love & Blessings Goyal Family */}
            <p className="font-serif text-[11px] sm:text-xs uppercase tracking-[0.25em] font-bold text-[#7A4B5B] mb-1">
              WITH LOVE & BLESSINGS
            </p>
            <h4 className="font-serif text-2xl sm:text-3xl font-extrabold text-[#B8141B] tracking-[0.12em] mb-4">
              GOYAL FAMILY
            </h4>

            {/* Final Line */}
            <div className="inline-block px-6 py-2 rounded-full bg-[#FAF2F5] border border-[#B8141B]/30 shadow-inner mt-2">
              <span className="font-serif text-base sm:text-lg font-bold text-[#B8141B] tracking-[0.2em]">
                ॥ जय माता दी ॥
              </span>
            </div>

          </div>
        )}
      </motion.div>
    </section>
  );
}
