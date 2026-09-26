import { motion } from "motion/react";
import { WeddingData } from "../types";

interface FamilyInvitationProps {
  data?: WeddingData;
}

export function FamilyInvitation({ data }: FamilyInvitationProps) {
  const elder1 = data?.familyMembers?.elder1 || "AJIT KUMAR GOYAL";
  const elder2 = data?.familyMembers?.elder2 || "MAMTA AGARWAL";
  const elder3 = data?.familyMembers?.elder3 || "VIJAY RANI";
  const familyName = data?.familyMembers?.familyName || "THE GOYAL FAMILY";
  const customCardImage = data?.subhAagmanImageUrl;

  return (
    <section className="py-20 px-4 sm:px-6 bg-[#FDF0F4] flex flex-col items-center relative overflow-hidden">
      {/* Background radial highlight */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_rgba(255,183,77,0.08)_0%,_transparent_70%)] pointer-events-none" />

      <motion.div
        initial={{ opacity: 0, y: 25 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.9 }}
        className="w-full max-w-md mx-auto relative z-10 flex flex-col items-center text-center"
      >
        {/* 
          SUBH AAGMAN CONTENT BOX
          If customCardImage is set from Admin, replace full content box with single image content
          with the exact same ratio & royal golden framing as the created content box.
        */}
        {customCardImage ? (
          <div className="w-full bg-[#FFFDF7] rounded-3xl border-2 border-[#D4AF37]/60 shadow-[0_12px_35px_rgba(212,175,55,0.15)] relative overflow-hidden group">
            {/* Inner hairline border */}
            <div className="absolute inset-2.5 rounded-2xl border border-[#B8141B]/20 pointer-events-none z-10" />

            {/* Corner Floral Motifs */}
            <span className="absolute top-3 left-3 text-xs text-[#D4AF37] z-10 drop-shadow-sm pointer-events-none">✦</span>
            <span className="absolute top-3 right-3 text-xs text-[#D4AF37] z-10 drop-shadow-sm pointer-events-none">✦</span>
            <span className="absolute bottom-3 left-3 text-xs text-[#D4AF37] z-10 drop-shadow-sm pointer-events-none">✦</span>
            <span className="absolute bottom-3 right-3 text-xs text-[#D4AF37] z-10 drop-shadow-sm pointer-events-none">✦</span>

            <img
              src={customCardImage}
              alt="॥ शुभ आगमन ॥"
              className="w-full h-auto object-cover rounded-3xl block transition-transform duration-500 group-hover:scale-[1.01]"
            />
          </div>
        ) : (
          <div className="w-full bg-[#FFFDF7] rounded-3xl p-7 sm:p-9 border-2 border-[#D4AF37]/50 shadow-[0_12px_35px_rgba(212,175,55,0.12)] relative">
            {/* Inner hairline border */}
            <div className="absolute inset-2.5 rounded-2xl border border-[#B8141B]/20 pointer-events-none" />

            {/* Corner Floral Motifs */}
            <span className="absolute top-3 left-3 text-xs text-[#D4AF37]">✦</span>
            <span className="absolute top-3 right-3 text-xs text-[#D4AF37]">✦</span>
            <span className="absolute bottom-3 left-3 text-xs text-[#D4AF37]">✦</span>
            <span className="absolute bottom-3 right-3 text-xs text-[#D4AF37]">✦</span>

            {/* Top Devotional Symbol */}
            <div className="flex items-center justify-center gap-3 mb-4">
              <span className="text-xl">🪔</span>
              <span className="font-serif text-[#B8141B] font-bold text-sm tracking-[0.2em]">
                ॥ शुभ आगमन ॥
              </span>
              <span className="text-xl">🪔</span>
            </div>

            {/* "WITH THE BLESSINGS OF" */}
            <p className="font-serif text-[11px] sm:text-xs uppercase tracking-[0.3em] font-bold text-[#E65100] mb-5">
              WITH THE BLESSINGS OF
            </p>

            {/* First Pair of Elders */}
            <div className="flex flex-col items-center mb-4">
              <h3 className="font-serif text-xl sm:text-2xl font-bold text-[#B8141B] tracking-wider leading-snug">
                {elder1}
              </h3>
              <span className="font-serif text-sm italic text-[#D4AF37] font-semibold my-1">
                &
              </span>
              <h3 className="font-serif text-xl sm:text-2xl font-bold text-[#B8141B] tracking-wider leading-snug">
                {elder2}
              </h3>
            </div>

            {/* "AND" connector */}
            <div className="flex items-center justify-center gap-4 my-3">
              <div className="h-[1px] w-10 bg-gradient-to-r from-transparent to-[#D4AF37]" />
              <span className="font-serif text-xs uppercase tracking-[0.25em] font-bold text-[#7A4B5B]">
                AND
              </span>
              <div className="h-[1px] w-10 bg-gradient-to-l from-transparent to-[#D4AF37]" />
            </div>

            {/* Elder 3 */}
            <h3 className="font-serif text-xl sm:text-2xl font-bold text-[#B8141B] tracking-wider mb-6">
              {elder3}
            </h3>

            {/* Divider with Marigold */}
            <div className="flex items-center justify-center gap-3 my-5">
              <div className="h-[1px] w-16 bg-[#D4AF37]/50" />
              <span className="text-sm">🌼</span>
              <div className="h-[1px] w-16 bg-[#D4AF37]/50" />
            </div>

            {/* "THE GOYAL FAMILY" */}
            <h4 className="font-serif text-2xl sm:text-3xl font-extrabold text-[#B8141B] tracking-[0.12em] mb-2">
              {familyName}
            </h4>

            {/* "CORDIALLY INVITES YOU TO" */}
            <p className="font-serif text-[11px] sm:text-xs uppercase tracking-[0.28em] font-bold text-[#E65100] mb-3">
              CORDIALLY INVITES YOU TO
            </p>

            {/* Event Badge */}
            <div className="inline-block px-5 py-2 rounded-full bg-[#FAF2F5] border border-[#B8141B]/30 shadow-inner mt-1">
              <span className="font-serif text-sm sm:text-base font-bold text-[#B8141B] tracking-[0.18em]">
                MATA KI CHOWKI
              </span>
            </div>
          </div>
        )}
      </motion.div>
    </section>
  );
}
