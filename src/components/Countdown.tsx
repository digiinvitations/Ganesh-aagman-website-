import { useState, useEffect } from "react";
import { motion } from "motion/react";

interface CountdownProps {
  targetDate?: string;
}

export function Countdown({ targetDate = "2026-09-14T00:00:00" }: CountdownProps) {
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
    <section className="py-20 px-4 bg-[#2A040F] flex flex-col items-center">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
        className="w-full max-w-md flex flex-col items-center"
      >
        <h2 className="font-serif text-xl sm:text-2xl tracking-[0.1em] font-bold text-[#D4AF37] text-center mb-6">
          COUNTING DOWN TO BAPPA'S AGMAN
        </h2>
        
        {/* Ornamental Divider */}
        <div className="flex items-center justify-center gap-4 py-4 mb-4 opacity-90 w-full">
          <div className="h-[1px] w-12 sm:w-16 bg-gradient-to-r from-transparent to-[#D4AF37]"></div>
          <span className="text-[#D4AF37] text-sm">🪷</span>
          <div className="h-[1px] w-12 sm:w-16 bg-gradient-to-l from-transparent to-[#D4AF37]"></div>
        </div>

        {!isEnded ? (
          <div className="flex justify-between items-center w-full gap-3 mt-2 px-2">
            <TimeUnit value={timeLeft.days} label="DAYS" />
            <TimeUnit value={timeLeft.hours} label="HOURS" />
            <TimeUnit value={timeLeft.minutes} label="MINUTES" />
            <TimeUnit value={timeLeft.seconds} label="SECONDS" />
          </div>
        ) : (
          <div className="text-center p-8 border border-[#D4AF37]/50 rounded-xl bg-[#3B0918] mt-4 shadow-[0_0_15px_rgba(212,175,55,0.1)]">
            <h3 className="font-serif font-bold text-2xl text-[#D4AF37] mb-3 tracking-wide">Bappa has Arrived!</h3>
            <p className="text-sm text-[#FDFBF7] opacity-90 uppercase tracking-widest">Let the celebrations begin</p>
          </div>
        )}
        
        <p className="font-serif text-[#FDFBF7]/80 uppercase tracking-[0.15em] text-[10px] sm:text-xs font-semibold mt-10 text-center drop-shadow-md">
          7 DAYS OF DEVOTION • CELEBRATION • TOGETHERNESS
        </p>
      </motion.div>
    </section>
  );
}

function TimeUnit({ value, label }: { value: number; label: string }) {
  const formattedValue = value.toString().padStart(2, "0");
  
  return (
    <div className="flex flex-col items-center w-1/4">
      <div className="w-full aspect-square bg-[#3B0918] rounded-md border border-[#D4AF37]/40 flex items-center justify-center shadow-lg mb-3 shadow-[0_0_10px_rgba(212,175,55,0.05)]">
        <span className="font-serif font-bold text-2xl sm:text-3xl text-[#D4AF37]">
          {formattedValue}
        </span>
      </div>
      <span className="text-[10px] font-semibold uppercase tracking-widest text-[#FDFBF7] opacity-80">
        {label}
      </span>
    </div>
  );
}
