import { motion } from "motion/react";

interface InvitationMessageProps {
  message?: string;
  isHeroEnded?: boolean;
}

export function InvitationMessage({ isHeroEnded }: InvitationMessageProps) {
  return (
    <section className="relative px-6 pt-32 pb-24 bg-[#3B0918] flex flex-col items-center text-center overflow-hidden">
      {/* Background Gradient & Glow */}
      <div className={`absolute top-0 inset-x-0 h-48 bg-gradient-to-b from-[#2A040F] to-transparent pointer-events-none transition-opacity duration-1000 z-0 ${isHeroEnded ? 'opacity-100' : 'opacity-0'}`} />
      
      {/* Subtle Warm Lighting Overlay */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_rgba(212,175,55,0.05)_0%,_transparent_60%)] pointer-events-none" />

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 1 }}
        className="max-w-md mx-auto flex flex-col items-center relative z-10"
      >
        <div className="flex items-center justify-center w-full gap-4 mb-6">
          <div className="h-[1px] w-12 sm:w-16 bg-gradient-to-r from-transparent to-[#D4AF37]"></div>
          <span className="text-[#D4AF37] text-xl drop-shadow-md">🪷</span>
          <div className="h-[1px] w-12 sm:w-16 bg-gradient-to-l from-transparent to-[#D4AF37]"></div>
        </div>
        
        <h2 className="font-serif text-[#D4AF37] text-sm sm:text-base font-bold tracking-[0.15em] mb-8 drop-shadow-sm">
          ॥ गणपती बाप्पा मोरया ॥
        </h2>
        
        <p className="font-serif font-medium text-lg sm:text-xl text-[#FDFBF7] leading-relaxed whitespace-pre-line px-4 drop-shadow-sm">
          With immense joy and devotion, we welcome Bappa into our hearts and our celebration. Join us as we come together for seven days of divine blessings, joyful moments, music, games, devotion and togetherness.
        </p>
        
        <div className="flex items-center justify-center w-full gap-4 mt-10">
          <div className="h-[1px] w-12 sm:w-16 bg-gradient-to-r from-transparent to-[#D4AF37]"></div>
          <span className="text-[#D4AF37] text-xl drop-shadow-md">🏮</span>
          <div className="h-[1px] w-12 sm:w-16 bg-gradient-to-l from-transparent to-[#D4AF37]"></div>
        </div>
      </motion.div>
    </section>
  );
}
