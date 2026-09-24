import { motion } from "motion/react";
import { VenueDetails, Person } from "../types";
import { MapPin, CalendarPlus } from "lucide-react";

interface VenueProps {
  venue: VenueDetails;
  groom?: Person;
  bride?: Person;
  weddingDate?: string;
}

export function Venue({ venue }: VenueProps) {
  // Generate Google Calendar URL for Mata Ki Chowki on 24 October 2026, 8:00 PM IST
  const eventTitle = encodeURIComponent("Mata Ki Chowki");
  const eventLocation = encodeURIComponent("Krishna Palace, Sikandra Bodla Road, Agra, Near Kargil Petrol Pump");
  const eventDetails = encodeURIComponent("Mata Ki Chowki celebration with the divine blessings of Karoli Wali Mata. The Goyal Family cordially invites you.");
  
  // 24 Oct 2026, 8:00 PM IST is 2026-10-24T14:30:00Z; ends at 2026-10-24T19:30:00Z
  const calendarDates = "20261024T143000Z/20261024T193000Z";
  const calendarUrl = `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${eventTitle}&dates=${calendarDates}&location=${eventLocation}&details=${eventDetails}`;

  const mapUrl = venue?.mapUrl || "https://www.google.com/maps/search/?api=1&query=Krishna+Palace+Sikandra+Bodla+Road+Agra";

  return (
    <section className="py-24 px-4 sm:px-6 bg-[#FDF0F4] flex flex-col items-center overflow-hidden border-t border-[#F3C3D2]/50">
      
      {/* Background Soft Glow */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_rgba(230,81,0,0.04)_0%,_transparent_70%)] pointer-events-none" />

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
        className="w-full max-w-md flex flex-col items-center text-center relative z-10"
      >
        <span className="text-xl mb-1 text-[#E65100]">🪔</span>

        <h2 className="font-serif text-3xl sm:text-4xl uppercase tracking-[0.16em] text-[#B8141B] font-extrabold drop-shadow-sm mb-2">
          VENUE
        </h2>
        
        {/* Divider with Marigold */}
        <div className="flex items-center justify-center gap-3 my-3">
          <div className="h-[1px] w-12 bg-gradient-to-r from-transparent to-[#D4AF37]" />
          <span className="text-sm">🌼</span>
          <div className="h-[1px] w-12 bg-gradient-to-l from-transparent to-[#D4AF37]" />
        </div>

        {/* Venue Card */}
        <div className="w-full bg-[#FFFDF7] rounded-3xl p-7 sm:p-9 border-2 border-[#D4AF37]/50 shadow-[0_12px_35px_rgba(212,175,55,0.12)] mt-4 relative flex flex-col items-center">
          
          {/* Inner hairline border */}
          <div className="absolute inset-2.5 rounded-2xl border border-[#B8141B]/15 pointer-events-none" />

          {/* Location Pin Icon in Gold Circle */}
          <div className="w-12 h-12 rounded-full bg-[#FAF2F5] border border-[#D4AF37]/50 flex items-center justify-center mb-4 shadow-sm">
            <MapPin className="w-6 h-6 text-[#B8141B]" />
          </div>

          <h3 className="font-serif font-extrabold text-2xl sm:text-3xl text-[#B8141B] tracking-wider mb-3">
            {venue?.name || "KRISHNA PALACE"}
          </h3>

          <div className="flex flex-col gap-1 text-[#3C1B26] text-sm sm:text-base font-serif font-semibold leading-relaxed max-w-xs">
            <p>{venue?.addressLine1 || "Sikandra Bodla Road, Agra"}</p>
            <p className="text-[#E65100] font-bold">{venue?.addressLine2 || "Near Kargil Petrol Pump"}</p>
          </div>

          {/* Traditional Temple Decorative Line Art */}
          <div className="w-full max-w-[220px] h-24 my-6 opacity-40 flex items-center justify-center pointer-events-none">
            <svg viewBox="0 0 200 90" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full stroke-[#B8141B]" strokeWidth="1.2">
              {/* Kalash on spire */}
              <circle cx="100" cy="10" r="3" fill="#D4AF37" />
              <path d="M100 13V20" />
              {/* Temple Dome / Mandapa */}
              <path d="M100 20C112 20 120 32 120 48H80C80 32 88 20 100 20Z" />
              {/* Pillars */}
              <line x1="84" y1="48" x2="84" y2="78" />
              <line x1="94" y1="48" x2="94" y2="78" />
              <line x1="106" y1="48" x2="106" y2="78" />
              <line x1="116" y1="48" x2="116" y2="78" />
              {/* Side Pillars */}
              <path d="M60 40C68 40 72 48 72 58H48C48 48 52 40 60 40Z" />
              <line x1="52" y1="58" x2="52" y2="78" />
              <line x1="68" y1="58" x2="68" y2="78" />
              <path d="M140 40C148 40 152 48 152 58H128C128 48 132 40 140 40Z" />
              <line x1="132" y1="58" x2="132" y2="78" />
              <line x1="148" y1="58" x2="148" y2="78" />
              {/* Temple Base Platform */}
              <line x1="30" y1="78" x2="170" y2="78" strokeWidth="2" />
              <line x1="20" y1="84" x2="180" y2="84" strokeWidth="1.5" />
            </svg>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col gap-3.5 w-full relative z-10">
            <a 
              href={mapUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-2.5 bg-[#B8141B] hover:bg-[#9E0E15] text-[#FFFDF7] px-6 py-3.5 rounded-xl font-serif text-xs sm:text-sm tracking-[0.16em] uppercase font-bold shadow-md transition-all active:scale-95"
            >
              <MapPin className="w-4 h-4 text-[#FFBF00]" /> 
              VIEW ON GOOGLE MAPS
            </a>
            
            <a 
              href={calendarUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-2.5 bg-[#FFFDF7] hover:bg-[#FAF2F5] text-[#B8141B] border-2 border-[#D4AF37]/60 px-6 py-3 rounded-xl font-serif text-xs sm:text-sm tracking-[0.16em] uppercase font-bold shadow-sm transition-all active:scale-95"
            >
              <CalendarPlus className="w-4 h-4 text-[#E65100]" /> 
              SAVE TO CALENDAR
            </a>
          </div>

        </div>
      </motion.div>
    </section>
  );
}
