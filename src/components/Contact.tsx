import { motion } from "motion/react";
import { PhoneCall } from "lucide-react";
import { WeddingData } from "../types";

interface ContactProps {
  data?: WeddingData;
}

export function Contact({ data }: ContactProps) {
  const contactName = data?.contactPerson?.name || "AJIT KUMAR GOYAL";
  const contactPhone = data?.contactPerson?.phone || "9412300439";

  return (
    <section className="py-20 px-4 sm:px-6 bg-[#FDF0F4] flex flex-col items-center relative overflow-hidden border-t border-[#F3C3D2]/50">
      
      {/* Background Soft Glow */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_rgba(230,81,0,0.03)_0%,_transparent_70%)] pointer-events-none" />

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
        className="w-full max-w-md mx-auto flex flex-col items-center text-center relative z-10"
      >
        <span className="text-xl mb-1 text-[#E65100]">🪔</span>

        <h2 className="font-serif text-2xl sm:text-3xl uppercase tracking-[0.16em] text-[#B8141B] font-extrabold drop-shadow-sm mb-2">
          FOR ANY QUERIES
        </h2>

        {/* Divider with Marigold */}
        <div className="flex items-center justify-center gap-3 my-3">
          <div className="h-[1px] w-12 bg-gradient-to-r from-transparent to-[#D4AF37]" />
          <span className="text-sm">🌼</span>
          <div className="h-[1px] w-12 bg-gradient-to-l from-transparent to-[#D4AF37]" />
        </div>

        {/* Contact Card */}
        <div className="w-full bg-[#FFFDF7] rounded-3xl p-7 border-2 border-[#D4AF37]/50 shadow-[0_10px_30px_rgba(212,175,55,0.12)] mt-3 relative flex flex-col items-center">
          
          {/* Inner hairline border */}
          <div className="absolute inset-2.5 rounded-2xl border border-[#B8141B]/15 pointer-events-none" />

          {/* Contact Person Name */}
          <h3 className="font-serif text-xl sm:text-2xl font-bold text-[#B8141B] tracking-wider mb-2">
            {contactName}
          </h3>

          {/* Phone Number Display */}
          <p className="font-serif text-base sm:text-lg text-[#E65100] font-bold tracking-widest mb-6">
            +91 {contactPhone}
          </p>

          {/* Call Now Button with tel: */}
          <a
            href={`tel:${contactPhone}`}
            className="w-full max-w-xs flex items-center justify-center gap-2.5 bg-[#B8141B] hover:bg-[#9E0E15] text-[#FFFDF7] py-3.5 px-6 rounded-xl font-serif text-xs sm:text-sm tracking-[0.2em] uppercase font-bold shadow-md transition-all active:scale-95 cursor-pointer"
          >
            <PhoneCall className="w-4 h-4 text-[#FFBF00]" />
            CALL NOW
          </a>

          <p className="text-[10px] sm:text-[11px] font-serif uppercase tracking-[0.18em] text-[#7A4B5B] mt-4 font-semibold">
            WE ARE HAPPY TO ASSIST YOU
          </p>
        </div>

      </motion.div>
    </section>
  );
}
