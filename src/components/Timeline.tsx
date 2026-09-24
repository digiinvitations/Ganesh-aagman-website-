import { motion } from "motion/react";
import { TimelineItem } from "../types";
import { Clock, MapPin } from "lucide-react";

interface TimelineProps {
  timeline: TimelineItem[];
  globalLogo?: string;
}

export function Timeline({ timeline, globalLogo }: TimelineProps) {
  if (!timeline || timeline.length === 0) return null;

  return (
    <section className="py-20 px-4 md:px-6 bg-[#FDF0F4] flex flex-col items-center overflow-hidden relative border-t border-[#F3C3D2]/50">
      {/* Background Pattern */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_rgba(230,81,0,0.03)_0%,_transparent_60%)] pointer-events-none" />
      
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
        className="w-full max-w-lg flex flex-col items-center relative z-10"
      >
        <div className="mb-2 text-2xl text-[#E65100]">🪔</div>
        <h2 className="font-serif text-2xl md:text-3xl uppercase tracking-widest text-[#B8141B] font-extrabold text-center drop-shadow-sm mb-8">
          MATA KI CHOWKI<br/>
          <span className="text-xs md:text-sm text-[#E65100] mt-1 block tracking-[0.25em] font-bold">AN AUSPICIOUS EVENING</span>
        </h2>

        <div className="w-full relative">
          <div className="absolute left-8 md:left-12 top-0 bottom-0 w-0.5 bg-gradient-to-b from-transparent via-[#D4AF37]/50 to-transparent" />

          {timeline.map((item, index) => {
            return (
              <motion.div 
                key={item.id || index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="mb-8 relative w-full flex flex-row items-stretch pl-16 md:pl-24 pr-2"
              >
                {/* Timeline Dot */}
                <div className="absolute left-8 md:left-12 top-6 transform -translate-x-1/2 flex items-center justify-center w-5 h-5 rounded-full bg-[#D4AF37] ring-4 ring-[#FDF0F4] shadow-sm z-10">
                  <span className="text-[10px]">🌼</span>
                </div>
                
                {/* Content Card */}
                <div className="bg-[#FFFDF7] p-5 rounded-2xl border-2 border-[#D4AF37]/50 shadow-md relative w-full flex flex-col gap-3">
                  <h3 className="font-serif font-extrabold text-xl text-[#B8141B] tracking-wide">
                    {item.title}
                  </h3>
                  
                  <div className="flex flex-wrap items-center gap-3 text-xs font-serif text-[#7A4B5B]">
                    {item.time && (
                      <span className="flex items-center gap-1 font-bold text-[#E65100]">
                        <Clock className="w-3.5 h-3.5" /> {item.time}
                      </span>
                    )}
                    {item.location && (
                      <span className="flex items-center gap-1">
                        <MapPin className="w-3.5 h-3.5 text-[#B8141B]" /> {item.location}
                      </span>
                    )}
                  </div>

                  {item.description && (
                    <p className="font-serif text-xs text-[#3C1B26] leading-relaxed">
                      {item.description}
                    </p>
                  )}
                </div>
              </motion.div>
            );
          })}
        </div>
      </motion.div>
    </section>
  );
}
