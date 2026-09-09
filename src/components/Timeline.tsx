import { motion } from "motion/react";
import { TimelineItem } from "../types";
import { Clock, MapPin, Sparkles } from "lucide-react";

interface TimelineProps {
  timeline: TimelineItem[];
  globalLogo?: string;
}

export function Timeline({ timeline, globalLogo }: TimelineProps) {
  if (!timeline || timeline.length === 0) return null;

  return (
    <section className="py-20 px-4 md:px-6 bg-[#3B0918] flex flex-col items-center overflow-hidden relative">
      {/* Subtle Background Pattern */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_rgba(212,175,55,0.03)_0%,_transparent_60%)] pointer-events-none"></div>
      
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
        className="w-full max-w-lg flex flex-col items-center relative z-10"
      >
        <div className="mb-4 text-4xl opacity-80">🕉️</div>
        <h2 className="font-serif text-3xl md:text-4xl uppercase tracking-widest text-[#D4AF37] font-bold text-center drop-shadow-sm mb-12">
          7 Days of Bappa<br/><span className="text-xl md:text-2xl opacity-90 mt-2 block tracking-[0.2em]">A Divine Celebration</span>
        </h2>

        <div className="w-full relative">
          {/* Main vertical line - slightly off-center to allow card on the right on mobile */}
          <div className="absolute left-8 md:left-12 top-0 bottom-0 w-0.5 bg-gradient-to-b from-transparent via-[#D4AF37]/30 to-transparent" />

          {timeline.map((item, index) => {
            const logoToUse = item.logoUrl || globalLogo;
            
            return (
              <motion.div 
                key={item.id || index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.6, delay: index * 0.1, type: "spring", bounce: 0.3 }}
                className="mb-10 relative w-full flex flex-row items-stretch pl-16 md:pl-24 pr-2"
              >
                {/* Timeline Dot/Flower */}
                <div className="absolute left-8 md:left-12 top-6 transform -translate-x-1/2 flex items-center justify-center w-5 h-5 rounded-full bg-[#FFBF00] ring-4 ring-[#3B0918] shadow-[0_0_10px_rgba(212,175,55,0.5)] z-10" />
                
                {/* Content Card */}
                <div className="bg-[#2A040F] p-5 rounded-2xl border border-[#D4AF37]/40 shadow-[0_4px_20px_-4px_rgba(0,0,0,0.3)] hover:shadow-lg hover:shadow-[#D4AF37]/5 transition-all relative w-full flex flex-col gap-4 overflow-hidden">
                  
                  {/* Decorative Background Image (if any) */}
                  {item.imageUrl && (
                     <div className="absolute inset-0 opacity-20 pointer-events-none">
                       <img src={item.imageUrl} alt="" className="w-full h-full object-cover mix-blend-overlay" />
                       <div className="absolute inset-0 bg-gradient-to-b from-[#2A040F]/10 to-[#2A040F] pointer-events-none" />
                     </div>
                  )}

                  {/* Top row: Circle Image & Title/Tagline */}
                  <div className="flex items-center gap-4 relative z-10">
                    {/* Circular Image / Icon */}
                    {logoToUse ? (
                      <div className="w-16 h-16 md:w-20 md:h-20 shrink-0 rounded-full border-2 border-[#D4AF37]/40 bg-white/10 backdrop-blur-sm overflow-hidden shadow-sm flex items-center justify-center p-2">
                        <img 
                          src={logoToUse} 
                          alt="Logo" 
                          className="w-full h-full object-contain"
                        />
                      </div>
                    ) : (
                      <div className="w-16 h-16 md:w-20 md:h-20 shrink-0 rounded-full border-2 border-[#D4AF37]/40 bg-[#3B0918] flex items-center justify-center shadow-sm"> 
                        <Sparkles className="w-6 h-6 text-[#D4AF37] opacity-60" />
                      </div>
                    )}
                    
                    {/* Title & Subtitle */}
                    <div className="flex flex-col">
                      <h3 className="font-serif text-lg md:text-xl font-bold uppercase tracking-widest text-[#FDFBF7]">
                        {item.title}
                      </h3>
                      {item.hashtag && (
                        <span className="font-serif text-[10px] md:text-xs font-bold tracking-widest text-[#D4AF37] opacity-90 mt-1">
                          {item.hashtag}
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Details (Date, Description) */}
                  <div className="flex flex-col gap-2.5 bg-[#3B0918]/80 backdrop-blur-sm rounded-xl p-3.5 border border-[#D4AF37]/20 shadow-inner relative z-10">
                    <div className="flex flex-col gap-2">
                      <p className="font-serif text-[11px] md:text-sm uppercase tracking-widest flex items-center gap-2 font-bold text-[#D4AF37]">
                        <Clock className="w-4 h-4" /> 
                        {[item.date, item.day, item.time].filter(Boolean).join(" • ")}
                      </p>
                      {item.location && (
                        <p className="font-serif text-[10px] md:text-xs uppercase tracking-widest flex items-center gap-2 text-[#D4AF37]/90">
                          <MapPin className="w-3.5 h-3.5" /> 
                          {item.location}
                        </p>
                      )}
                    </div>

                    {item.description && (
                      <div className="w-full h-px bg-[#D4AF37]/30 my-0.5" />
                    )}

                    {item.description && (
                      <p className="text-[11px] md:text-xs text-[#FDFBF7]/90 leading-relaxed font-serif italic whitespace-pre-line">
                        {item.description}
                      </p>
                    )}
                  </div>

                  {/* Special Highlight Badge */}
                  <div className="mt-1 w-full bg-[#8B0000]/80 border border-[#D4AF37]/40 rounded-full py-1.5 px-3 flex items-center justify-center shadow-sm relative z-10">
                    <p className="font-serif text-[8.5px] sm:text-[9.5px] uppercase tracking-[0.15em] text-[#FDFBF7] font-bold">
                      🎁 2 LUCKY DRAW GIFTS EVERY DAY AFTER AARTI
                    </p>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </motion.div>
    </section>
  );
}
