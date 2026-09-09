import React from "react";
import { motion } from "motion/react";
import { HeartDivider } from "./HeartDivider";
import { EventDetails } from "../types";
import { Calendar, MapPin } from "lucide-react";
import { FloatingLanterns } from "./FloatingLanterns";

interface EventsProps {
  events: EventDetails[];
  globalLogo?: string;
}

// Map decorative styles to specific colors for particles/overlays
const themeMap: Record<string, { particle: string; text: string; border: string }> = {
  haldi: { particle: "#D4AF37", text: "text-[#D4AF37]", border: "border-[#D4AF37]/40" },
  mehndi: { particle: "#D4AF37", text: "text-[#D4AF37]", border: "border-[#D4AF37]/40" },
  sangeet: { particle: "#D4AF37", text: "text-[#D4AF37]", border: "border-[#D4AF37]/40" },
  wedding: { particle: "#D4AF37", text: "text-[#D4AF37]", border: "border-[#D4AF37]/40" },
  none: { particle: "#FFBF00", text: "text-[#D4AF37]", border: "border-[#D4AF37]/40" }
};

function EventCard({ event, index, globalLogo }: { event: EventDetails; index: number; globalLogo?: string }) {
  const theme = themeMap[event.decorativeStyle || "none"] || themeMap.none;
  const isEvening = event.time?.toLowerCase().includes("pm") || event.decorativeStyle === "sangeet" || event.title.toLowerCase().includes("night") || event.title.toLowerCase().includes("evening");

  return (
    <div className="w-full max-w-md aspect-[9/16] relative flex flex-col items-center justify-center overflow-hidden rounded-2xl shadow-2xl mx-auto bg-[#3B0918]">
      {/* Background Image - HD & 100% visible (no dark overlays) */}
      {event.backgroundUrl && (
        <img 
          src={event.backgroundUrl} 
          alt={event.title} 
          className="absolute inset-0 w-full h-full object-cover z-0" 
        />
      )}

      {isEvening && <FloatingLanterns />}

      {/* Animated Blinking Sparkles */}
      <div className="absolute inset-0 z-10 pointer-events-none overflow-hidden mix-blend-screen">
        {[...Array(5)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute rounded-full bg-white shadow-[0_0_12px_3px_rgba(255,255,255,0.9)]"
            style={{
              left: Math.random() * 90 + 5 + "%",
              top: Math.random() * 90 + 5 + "%",
              width: Math.random() * 3 + 2 + "px",
              height: Math.random() * 3 + 2 + "px",
            }}
            animate={{
              opacity: [0, 1, 0],
              scale: [0.1, 1.5, 0.1],
            }}
            transition={{
              duration: Math.random() * 1 + 1, // Rapid blink
              repeat: Infinity,
              ease: "easeInOut",
              delay: Math.random() * 2
            }}
          />
        ))}
      </div>

      {/* Logo Container - Only the logo remains, completely transparent background */}
      <motion.div 
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 1, delay: 0.2 }}
        className="absolute top-6 left-0 right-0 z-10 flex flex-col items-center justify-center text-center pointer-events-none"
      >
        {/* Logo - Universal and smaller */}
        {event.showLogo !== false && globalLogo && (
          <motion.img 
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1, delay: 0.4 }}
            src={globalLogo} 
            alt="Logo" 
            className="w-16 h-16 shrink-0 object-contain drop-shadow-[0_4px_8px_rgba(0,0,0,0.5)]" 
          />
        )}
      </motion.div>

      {/* Caricature */}
      {event.showCaricature !== false && event.caricatureUrl && (
        <motion.div
          animate={{ y: [-4, 4, -4] }}
          transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
          className="absolute bottom-4 z-20 pointer-events-none"
        >
          <img 
            src={event.caricatureUrl} 
            alt="Caricature" 
            className="w-48 h-48 object-contain drop-shadow-2xl" 
          />
        </motion.div>
      )}
    </div>
  );
}

export function Events({ events, globalLogo }: EventsProps) {
  if (!events || events.length === 0) return null;

  // Use events as they are (ordered by admin panel)
  const sortedEvents = events;

  // Smart Logo Cascading: If the Hero global logo is missing, look for any logo uploaded to ANY event and use it everywhere.
  const universalLogo = globalLogo || events.find(e => e.logoUrl)?.logoUrl;

  return (
    <section className="bg-[#4A0B1E] py-24 px-4 md:px-8 flex flex-col items-center border-t border-b border-[#D4AF37]/20 relative overflow-hidden">
      
      {/* Background radial glow */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_rgba(212,175,55,0.05)_0%,_transparent_70%)] pointer-events-none" />

      <h2 className="font-serif text-3xl md:text-4xl uppercase tracking-widest text-[#D4AF37] text-center drop-shadow-sm font-bold mb-4 relative z-10">
        7 Days Celebration Journey
      </h2>
      <div className="mb-14 relative z-10">
        <HeartDivider />
      </div>
      <div className="w-full flex flex-col gap-16 md:gap-24 relative z-10">
        {sortedEvents.map((event, index) => (
          <div key={event.id || index}>
            <EventCard event={event} index={index} globalLogo={universalLogo} />
          </div>
        ))}
      </div>

      <div className="mt-24 pt-12 border-t border-[#D4AF37]/30 flex flex-col items-center text-center w-full max-w-sm relative z-10">
        <p className="font-serif text-[10px] tracking-[0.2em] uppercase text-[#D4AF37] font-semibold opacity-90 mb-3">
          SPONSORED BY
        </p>
        <h4 className="font-serif text-lg tracking-widest text-[#FDFBF7] font-bold">
          DARSHAN HIGHTS YUVA SANGH
        </h4>
        <span className="font-serif text-[#D4AF37] text-sm italic my-2">AND</span>
        <h4 className="font-serif text-lg tracking-widest text-[#FDFBF7] font-bold mb-8">
          SHRI HARSSHAD MAHENDRA JAAIN
        </h4>
        
        <div className="w-8 h-[1px] bg-[#D4AF37]/50 mb-8" />
        
        <p className="font-serif text-[9px] tracking-[0.2em] uppercase text-[#D4AF37] font-semibold opacity-80 mb-2">
          ALL EVENTS BY
        </p>
        <h4 className="font-serif text-base tracking-widest text-[#FDFBF7] font-bold">
          KIRTI JAIN
        </h4>
        <h4 className="font-serif text-xs tracking-widest text-[#D4AF37] font-bold mt-1">
          (EVENTS ADDICT)
        </h4>
      </div>
    </section>
  );
}
