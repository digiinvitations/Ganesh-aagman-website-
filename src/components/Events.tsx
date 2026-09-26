import { motion } from "motion/react";
import { EventDetails } from "../types";
import { Clock, MapPin } from "lucide-react";

interface EventsProps {
  events?: EventDetails[];
  globalLogo?: string;
  mataKiChowkiImageUrl?: string;
}

export function Events({ events, globalLogo, mataKiChowkiImageUrl }: EventsProps) {
  // Single event display
  const mainEvent = events && events.length > 0 ? events[0] : {
    title: "MATA KI CHOWKI",
    subtitle: "AN EVENING OF DIVINE BLESSINGS",
    date: "24 OCTOBER 2026",
    time: "8:00 PM ONWARDS",
    location: "KRISHNA PALACE, AGRA",
    description: "Come together for an evening of devotion, bhajan sandhya, divine aarti and blessings of Maa Karoli."
  };

  return (
    <section className="py-20 px-4 sm:px-6 bg-[#FDF0F4] flex flex-col items-center relative overflow-hidden">
      
      {/* Background Soft Radial Glow */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_rgba(230,81,0,0.05)_0%,_transparent_70%)] pointer-events-none" />

      {/* Main Section Heading: displayed with default event details box; omitted when custom image is embedded cleanly without separations */}
      {!mataKiChowkiImageUrl && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="flex flex-col items-center text-center relative z-10 mb-8"
        >
          <span className="text-xl mb-1 text-[#E65100]">🪔</span>
          <h2 className="font-serif text-3xl sm:text-4xl uppercase tracking-[0.15em] text-[#B8141B] font-extrabold drop-shadow-sm mb-2">
            MATA KI CHOWKI
          </h2>
          <p className="font-serif text-xs sm:text-sm uppercase tracking-[0.25em] text-[#E65100] font-bold">
            AN EVENING OF DIVINE BLESSINGS
          </p>

          <div className="flex items-center justify-center gap-3 mt-4">
            <div className="h-[1px] w-12 bg-gradient-to-r from-transparent to-[#D4AF37]" />
            <span className="text-sm">🌼</span>
            <div className="h-[1px] w-12 bg-gradient-to-l from-transparent to-[#D4AF37]" />
          </div>
        </motion.div>
      )}

      {/* Devotional Event Content / Cleanly Embedded Image */}
      <motion.div
        initial={{ opacity: 0, scale: 0.98, y: 20 }}
        whileInView={{ opacity: 1, scale: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.9 }}
        className="w-full max-w-xl mx-auto relative z-10 flex justify-center"
      >
        {/* 
          MATA KI CHOWKI IMAGE:
          Embedded cleanly and directly without any box, borders, frames, or separations.
        */}
        {mataKiChowkiImageUrl ? (
          <div className="w-full flex justify-center items-center">
            <img 
              src={mataKiChowkiImageUrl} 
              alt="Mata Ki Chowki" 
              className="w-full h-auto object-contain block max-w-lg mx-auto" 
            />
          </div>
        ) : (
          <div className="w-full max-w-md bg-[#FFFDF7] rounded-3xl p-7 sm:p-9 border-2 border-[#D4AF37]/50 shadow-[0_12px_35px_rgba(212,175,55,0.14)] relative overflow-hidden flex flex-col items-center text-center">
            
            {/* Inner hairline border */}
            <div className="absolute inset-2.5 rounded-2xl border border-[#B8141B]/15 pointer-events-none" />

            {/* Corner traditional stars */}
            <span className="absolute top-3 left-3 text-xs text-[#D4AF37]">✦</span>
            <span className="absolute top-3 right-3 text-xs text-[#D4AF37]">✦</span>
            <span className="absolute bottom-3 left-3 text-xs text-[#D4AF37]">✦</span>
            <span className="absolute bottom-3 right-3 text-xs text-[#D4AF37]">✦</span>

            {/* Optional Logo */}
            {globalLogo && (
              <img 
                src={globalLogo} 
                alt="Logo" 
                className="w-16 h-16 object-contain mb-4 drop-shadow-sm" 
              />
            )}

            {/* Date Badge */}
            <div className="bg-[#FAF2F5] border border-[#B8141B]/25 rounded-2xl px-6 py-3 mb-6 shadow-sm w-full max-w-xs flex flex-col items-center">
              <span className="font-serif text-[10px] tracking-[0.25em] text-[#E65100] uppercase font-bold mb-1">
                DATE & DAY
              </span>
              <span className="font-serif text-xl sm:text-2xl font-extrabold text-[#B8141B] tracking-wider">
                {mainEvent.date || "24 OCTOBER 2026"}
              </span>
              <span className="font-serif text-sm font-bold text-[#7A4B5B] uppercase tracking-widest mt-0.5">
                SATURDAY
              </span>
            </div>

            {/* Time Badge */}
            <div className="flex items-center gap-2 mb-6 text-[#E65100]">
              <Clock className="w-5 h-5 text-[#B8141B]" />
              <span className="font-serif text-base sm:text-lg font-bold tracking-[0.12em] text-[#B8141B]">
                {mainEvent.time || "8:00 PM ONWARDS"}
              </span>
            </div>

            <div className="w-24 h-px bg-gradient-to-r from-transparent via-[#D4AF37] to-transparent mb-6" />

            {/* Devi Dedication */}
            <div className="flex flex-col items-center mb-6">
              <span className="font-serif text-[10px] uppercase tracking-[0.25em] font-bold text-[#7A4B5B] mb-1">
                IN HONOR OF
              </span>
              <h4 className="font-serif text-xl sm:text-2xl font-bold text-[#B8141B] tracking-widest">
                KAROLI WALI MATA
              </h4>
            </div>

            {/* Location Summary */}
            <div className="flex items-center gap-2 text-xs sm:text-sm text-[#7A4B5B] font-serif font-bold uppercase tracking-wider bg-[#FFF5F8] px-4 py-2 rounded-full border border-[#D4AF37]/30">
              <MapPin className="w-4 h-4 text-[#B8141B]" />
              <span>{mainEvent.location || "KRISHNA PALACE, AGRA"}</span>
            </div>

            {/* Devotional Description */}
            <p className="font-serif text-xs sm:text-sm text-[#5E2B3C] italic mt-6 leading-relaxed px-2">
              “{mainEvent.description || "Join our family for an auspicious evening of devotional bhajans, sacred aarti, and the divine grace of Karoli Wali Mata."}”
            </p>

            {/* Bottom Traditional Floral Ribbon */}
            <div className="flex items-center justify-center gap-3 mt-6 pt-4 border-t border-[#D4AF37]/30 w-full">
              <span className="text-xs">🌼</span>
              <span className="font-serif text-[11px] font-bold text-[#B8141B] tracking-[0.2em] uppercase">
                ॥ जय माता दी ॥
              </span>
              <span className="text-xs">🌼</span>
            </div>

          </div>
        )}
      </motion.div>
    </section>
  );
}
