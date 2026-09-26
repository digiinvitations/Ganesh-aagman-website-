import { useRef } from "react";
import { WeddingData } from "../types";
import { ChevronDown } from "lucide-react";

interface HeroProps {
  data: WeddingData;
  shouldPlayVideo?: boolean;
  onVideoEnd?: () => void;
  onScrollDown?: () => void;
}

export function Hero({ data, onVideoEnd, onScrollDown }: HeroProps) {
  // High quality default image if none uploaded yet
  const heroImage = data.heroImageUrl || "https://images.unsplash.com/photo-1544816155-12df9643f363?q=80&w=2560&auto=format&fit=crop";
  const videoRef = useRef<HTMLVideoElement>(null);
  const hasTriggeredEndRef = useRef(false);

  const handleVideoEnded = () => {
    if (!hasTriggeredEndRef.current) {
      hasTriggeredEndRef.current = true;
      onVideoEnd?.();
    }
    // Continue loop gracefully
    if (videoRef.current) {
      videoRef.current.currentTime = 0;
      videoRef.current.play().catch(() => {});
    }
  };

  const handleTimeUpdate = () => {
    if (videoRef.current && !hasTriggeredEndRef.current) {
      const { currentTime, duration } = videoRef.current;
      // When video reaches within 0.5s of ending
      if (duration > 0 && currentTime >= duration - 0.5) {
        hasTriggeredEndRef.current = true;
        onVideoEnd?.();
      }
    }
  };

  const handleScrollClick = () => {
    if (onScrollDown) {
      onScrollDown();
    } else {
      window.scrollTo({
        top: window.innerHeight * 0.85,
        behavior: "smooth",
      });
    }
  };

  return (
    <section className="relative w-full h-[100svh] min-h-[100svh] overflow-hidden bg-[#FDF0F4] flex items-center justify-center">
      {data.heroVideoUrl ? (
        <video
          ref={videoRef}
          src={data.heroVideoUrl}
          autoPlay
          muted
          playsInline
          onEnded={handleVideoEnded}
          onTimeUpdate={handleTimeUpdate}
          className="w-full h-full object-cover object-center"
        />
      ) : (
        <img
          src={heroImage}
          alt="Hero"
          className="w-full h-full object-cover object-center select-none"
          loading="eager"
          decoding="async"
        />
      )}

      {/* Soft Bottom Shadow Gradient to make the scroll down button crystal clear */}
      <div className="absolute inset-x-0 bottom-0 h-36 bg-gradient-to-t from-black/65 via-black/25 to-transparent pointer-events-none z-10" />

      {/* Prominent Animated Scroll Down Button & Indicator */}
      <div className="absolute bottom-6 sm:bottom-8 left-0 right-0 z-20 flex flex-col items-center justify-center px-4 pointer-events-auto">
        <button
          type="button"
          onClick={handleScrollClick}
          aria-label="Scroll down to view invitation"
          className="group flex flex-col items-center gap-2 focus:outline-none cursor-pointer transform transition-transform duration-200 hover:scale-105 active:scale-95"
        >
          {/* Glowing Auspicious Pill Badge */}
          <div className="flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#2A050C]/90 backdrop-blur-md border border-[#D4AF37]/80 text-[#FFFDF7] shadow-[0_4px_20px_rgba(0,0,0,0.6)] group-hover:bg-[#440813] transition-colors">
            <span className="text-xs text-[#FFD54F] animate-pulse">🪔</span>
            <span className="font-serif text-[11px] sm:text-xs font-bold uppercase tracking-[0.2em] text-[#FFFDF7] drop-shadow-sm">
              Scroll Down To View Invitation
            </span>
            <span className="text-[10px] text-[#FFD54F]">✦</span>
          </div>

          {/* Bouncing Chevron in Golden Halo */}
          <div className="relative flex items-center justify-center">
            {/* Soft pulsing outer ring */}
            <div className="absolute inset-0 rounded-full bg-[#D4AF37]/40 animate-ping opacity-75" />
            
            <div className="relative w-10 h-10 rounded-full bg-[#FFFDF7] border-2 border-[#D4AF37] flex items-center justify-center text-[#B8141B] shadow-[0_4px_16px_rgba(212,175,55,0.6)] animate-bounce group-hover:bg-[#FFF9E6] transition-colors">
              <ChevronDown className="w-5 h-5 text-[#B8141B] stroke-[2.5]" />
            </div>
          </div>
        </button>
      </div>
    </section>
  );
}
