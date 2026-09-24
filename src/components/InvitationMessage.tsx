import { motion } from "motion/react";

interface InvitationMessageProps {
  message?: string;
  isHeroEnded?: boolean;
}

export function InvitationMessage({ message }: InvitationMessageProps) {
  return (
    <section className="relative px-5 py-24 bg-[#FDF0F4] flex flex-col items-center text-center overflow-hidden border-t border-[#F3C3D2]/50">
      {/* Background Soft Aura */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_rgba(230,81,0,0.04)_0%,_transparent_75%)] pointer-events-none" />

      <motion.div
        initial={{ opacity: 0, y: 25 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ duration: 0.9 }}
        className="max-w-md mx-auto flex flex-col items-center relative z-10 w-full"
      >
        {/* Ivory Card with Traditional Border */}
        <div className="w-full bg-[#FFFDF7] rounded-3xl p-7 sm:p-9 border-2 border-[#D4AF37]/50 shadow-[0_10px_30px_rgba(212,175,55,0.1)] relative">
          
          {/* Inner ornamental hairline border */}
          <div className="absolute inset-2.5 rounded-2xl border border-[#B8141B]/15 pointer-events-none" />

          {/* Top Decorative Flower & Bell */}
          <div className="flex items-center justify-center gap-3 mb-4">
            <span className="text-sm">🔔</span>
            <div className="h-[1px] w-12 bg-gradient-to-r from-transparent to-[#D4AF37]"></div>
            <span className="text-base">🌼</span>
            <div className="h-[1px] w-12 bg-gradient-to-l from-transparent to-[#D4AF37]"></div>
            <span className="text-sm">🔔</span>
          </div>
          
          {/* Heading */}
          <h2 className="font-serif text-[#B8141B] text-2xl sm:text-3xl font-extrabold tracking-[0.16em] mb-6 drop-shadow-sm">
            ॥ जय माता दी ॥
          </h2>
          
          {/* Main Invitation Text */}
          <div className="flex flex-col gap-4 font-serif text-[#3C1B26] text-base sm:text-lg leading-relaxed px-2">
            <p>
              With immense devotion and heartfelt joy, we invite you to join us for an auspicious evening dedicated to Karoli Wali Mata.
            </p>
            <p className="text-[#5E2B3C]">
              Come together with family and loved ones to seek Maa's divine blessings, immerse ourselves in devotion and bhakti, and share an evening filled with faith, peace and togetherness.
            </p>
          </div>
          
          {/* Decorative Divider */}
          <div className="flex items-center justify-center gap-3 my-6">
            <div className="h-[1px] w-16 bg-[#D4AF37]/50" />
            <span className="text-[#E65100] text-xs">✦</span>
            <div className="h-[1px] w-16 bg-[#D4AF37]/50" />
          </div>

          {/* Decorative Footer: श्रद्धा • भक्ति • आशीर्वाद • मंगलकामना */}
          <p className="font-serif text-[#B8141B] text-xs sm:text-sm font-bold tracking-[0.15em] drop-shadow-sm">
            श्रद्धा • भक्ति • आशीर्वाद • मंगलकामना
          </p>

        </div>
      </motion.div>
    </section>
  );
}
