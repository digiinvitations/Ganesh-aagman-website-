import { useState, useEffect } from "react";
import { motion } from "motion/react";

interface CountdownProps {
  targetDate?: string;
}

export function Countdown({ targetDate = "2026-10-24T20:00:00" }: CountdownProps) {
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  const [isEnded, setIsEnded] = useState(false);

  useEffect(() => {
    const calculateTimeLeft = () => {
      const difference = new Date(targetDate).getTime() - new Date().getTime();

      if (difference > 0) {
        setTimeLeft({
          days: Math.floor(difference / (1000 * 60 * 60 * 24)),
          hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
          minutes: Math.floor((difference / 1000 / 60) % 60),
          seconds: Math.floor((difference / 1000) % 60),
        });
      } else {
        setIsEnded(true);
      }
    };

    calculateTimeLeft();
    const timer = setInterval(calculateTimeLeft, 1000);
    return () => clearInterval(timer);
  }, [targetDate]);

  return (
    <section className="py-20 px-4 bg-[#FDF0F4] flex flex-col items-center relative overflow-hidden border-t border-[#F3C3D2]/60">
      {/* Subtle traditional mandala watermark */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_rgba(230,81,0,0.03)_0%,_transparent_70%)] pointer-events-none" />

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
        className="w-full max-w-md flex flex-col items-center relative z-10"
      >
        <span className="text-2xl mb-2 text-[#E65100]">🪔</span>

        <h2 className="font-serif text-xl sm:text-2xl tracking-[0.12em] font-bold text-[#B8141B] text-center mb-2">
          COUNTING DOWN TO MATA KI CHOWKI
        </h2>
        
        {/* Ornamental Divider with Marigold Motif */}
        <div className="flex items-center justify-center gap-3 py-3 mb-4 w-full">
          <div className="h-[1px] w-12 sm:w-16 bg-gradient-to-r from-transparent to-[#D4AF37]"></div>
          <span className="text-[#E65100] text-sm">🌼</span>
          <div className="h-[1px] w-12 sm:w-16 bg-gradient-to-l from-transparent to-[#D4AF37]"></div>
        </div>

        {!isEnded ? (
          <div className="flex justify-between items-center w-full gap-2.5 sm:gap-3 mt-2 px-1">
            <TimeUnit value={timeLeft.days} label="DAYS" />
            <TimeUnit value={timeLeft.hours} label="HOURS" />
            <TimeUnit value={timeLeft.minutes} label="MINUTES" />
            <TimeUnit value={timeLeft.seconds} label="SECONDS" />
          </div>
        ) : (
          <div className="text-center p-8 border-2 border-[#D4AF37]/60 rounded-2xl bg-[#FFFDF7] mt-4 shadow-[0_8px_25px_rgba(212,175,55,0.15)]">
            <h3 className="font-serif font-bold text-3xl text-[#B8141B] mb-2 tracking-wide">
              JAI MATA DI!
            </h3>
            <p className="text-xs sm:text-sm text-[#E65100] font-bold uppercase tracking-widest">
              LET THE DIVINE CELEBRATIONS BEGIN
            </p>
          </div>
        )}
        
        <div className="mt-8 flex items-center justify-center gap-2">
          <span className="text-[#D4AF37] text-xs">✦</span>
          <p className="font-serif text-[#7A4B5B] uppercase tracking-[0.18em] text-[10px] sm:text-xs font-bold text-center">
            AN EVENING OF DEVOTION • BLESSINGS • TOGETHERNESS
          </p>
          <span className="text-[#D4AF37] text-xs">✦</span>
        </div>
      </motion.div>
    </section>
  );
}

function TimeUnit({ value, label }: { value: number; label: string }) {
  const formattedValue = value.toString().padStart(2, "0");
  
  return (
    <div className="flex flex-col items-center w-1/4">
      <div className="w-full aspect-square bg-[#FFFDF7] rounded-xl border border-[#D4AF37]/50 flex items-center justify-center shadow-[0_4px_15px_rgba(184,20,27,0.06)] mb-2 relative overflow-hidden group hover:border-[#B8141B]/60 transition-colors">
        {/* Soft top highlight */}
        <div className="absolute top-0 inset-x-0 h-1 bg-gradient-to-r from-[#D4AF37]/40 via-[#B8141B]/40 to-[#D4AF37]/40" />
        <span className="font-serif font-bold text-2xl sm:text-3xl text-[#B8141B] drop-shadow-sm">
          {formattedValue}
        </span>
      </div>
      <span className="text-[9px] sm:text-[10px] font-bold uppercase tracking-[0.2em] text-[#7A4B5B]">
        {label}
      </span>
    </div>
  );
}
