import { motion } from "motion/react";
import { WeddingData } from "../types";

interface DeviShrineProps {
  data?: WeddingData;
}

export function DeviShrine({ data }: DeviShrineProps) {
  const deviName = data?.deviName || "KAROLI WALI MATA";
  const deviImageUrl = data?.deviImageUrl;

  return (
    <section className="py-24 px-4 sm:px-6 bg-[#FDF0F4] flex flex-col items-center relative overflow-hidden border-t border-[#F3C3D2]/50">
      {/* Background Soft Divine Halo */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_rgba(255,183,77,0.12)_0%,_rgba(253,240,244,0)_70%)] pointer-events-none" />

      <motion.div
        initial={{ opacity: 0, y: 25 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-60px" }}
        transition={{ duration: 0.9 }}
        className="w-full max-w-md mx-auto flex flex-col items-center text-center relative z-10"
      >
        {/* Top Temple Bells Hanging */}
        <div className="flex justify-between items-start w-3/4 max-w-[260px] -mb-3 z-20 pointer-events-none">
          <div className="flex flex-col items-center animate-bell-ring">
            <div className="w-[1.5px] h-6 bg-[#D4AF37]" />
            <span className="text-xl -mt-1 drop-shadow-md">🔔</span>
          </div>
          <div className="flex items-center gap-1 mt-1 text-[#E65100]">
            <span className="text-xs">🌼</span>
            <span className="text-sm">🪷</span>
            <span className="text-xs">🌼</span>
          </div>
          <div className="flex flex-col items-center animate-bell-ring" style={{ animationDelay: '0.8s' }}>
            <div className="w-[1.5px] h-6 bg-[#D4AF37]" />
            <span className="text-xl -mt-1 drop-shadow-md">🔔</span>
          </div>
        </div>

        {/* Traditional Devotional Shrine Arch (Cream / Ivory Arch with Gold and Saffron Trims) */}
        <div className="w-full bg-[#FFFDF7] rounded-t-[120px] rounded-b-3xl p-6 sm:p-8 border-2 border-[#D4AF37]/60 shadow-[0_15px_40px_rgba(212,175,55,0.18)] relative flex flex-col items-center">
          
          {/* Inner Arch Hairline Border */}
          <div className="absolute inset-3 rounded-t-[110px] rounded-b-2xl border border-[#B8141B]/20 pointer-events-none" />

          {/* Arch Top Kalash / Tilak */}
          <div className="w-10 h-10 rounded-full bg-[#FAF2F5] border border-[#D4AF37]/50 flex items-center justify-center -mt-11 mb-3 shadow-md z-10">
            <span className="text-lg">🪔</span>
          </div>

          {/* Devi Name & Kul Devi Subheading */}
          <h2 className="font-serif text-2xl sm:text-3xl font-extrabold text-[#B8141B] tracking-[0.14em] uppercase mb-1 drop-shadow-sm">
            {deviName}
          </h2>

          <p className="font-serif text-[11px] sm:text-xs font-bold text-[#E65100] tracking-[0.25em] uppercase mb-5">
            OUR KUL DEVI • OUR DIVINE BLESSINGS
          </p>

          {/* Mata Image Container or Traditional Devotional Shrine Artwork */}
          <div className="w-full max-w-[280px] aspect-[4/5] rounded-t-[80px] rounded-b-2xl overflow-hidden relative border-2 border-[#D4AF37]/50 shadow-inner bg-gradient-to-b from-[#FFF5F8] to-[#FCE6ED] flex items-center justify-center p-3 mb-6">
            {deviImageUrl ? (
              <img 
                src={deviImageUrl} 
                alt={deviName} 
                className="w-full h-full object-cover rounded-t-[70px] rounded-b-xl"
              />
            ) : (
              /* Sacred Shrine Devotional Frame */
              <div className="w-full h-full flex flex-col items-center justify-center relative rounded-t-[70px] rounded-b-xl border border-[#D4AF37]/30 bg-gradient-to-b from-[#FFF8E7]/80 to-[#FFF0F5]/90 p-4">
                {/* Divine Halo */}
                <div className="w-32 h-32 rounded-full bg-[#FFBF00]/20 blur-xl absolute" />
                
                {/* Devotional Motif: Maa Durga / Devi Trishul & Lotus Emblem */}
                <div className="w-24 h-24 rounded-full bg-[#FFFDF7] border-2 border-[#D4AF37] flex items-center justify-center shadow-lg relative z-10 mb-3">
                  <span className="text-5xl filter drop-shadow-[0_2px_8px_rgba(212,175,55,0.5)]">
                    🔱
                  </span>
                </div>

                <p className="font-serif text-sm font-bold text-[#B8141B] tracking-[0.15em] relative z-10">
                  ॥ ॐ ऐं ह्रीं क्लीं चामुण्डायै विच्चे ॥
                </p>
                <p className="font-serif text-xs text-[#E65100] tracking-widest mt-1 font-semibold relative z-10">
                  ॥ माँ करौली वाली ॥
                </p>
              </div>
            )}

            {/* Marigold Garland at Arch Footing */}
            <div className="absolute bottom-1 inset-x-2 flex justify-between items-center px-2 py-1 bg-white/70 backdrop-blur-sm rounded-full border border-[#D4AF37]/30">
              <span className="text-xs">🌼</span>
              <span className="text-[10px] font-serif font-bold text-[#B8141B] tracking-wider uppercase">जय माता दी</span>
              <span className="text-xs">🌼</span>
            </div>
          </div>

          {/* Shrine Base Diyas */}
          <div className="flex justify-between items-center w-full px-6 mb-4">
            <div className="flex items-center gap-1.5">
              <span className="text-2xl filter drop-shadow-[0_0_8px_rgba(255,160,0,0.8)]">🪔</span>
              <span className="text-xs">🌼</span>
            </div>
            <div className="h-[1px] flex-1 mx-4 bg-gradient-to-r from-transparent via-[#D4AF37]/60 to-transparent" />
            <div className="flex items-center gap-1.5">
              <span className="text-xs">🌼</span>
              <span className="text-2xl filter drop-shadow-[0_0_8px_rgba(255,160,0,0.8)]">🪔</span>
            </div>
          </div>

          {/* Supporting Text */}
          <p className="font-serif text-sm sm:text-base text-[#3C1B26] italic leading-relaxed px-4">
            “May Maa Karoli bless our family with her divine grace, strength, happiness and prosperity.”
          </p>
        </div>
      </motion.div>
    </section>
  );
}
