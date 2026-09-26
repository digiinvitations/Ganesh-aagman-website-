import { useRef } from "react";
import { WeddingData } from "../types";
import { ChevronDown } from "lucide-react";

interface HeroProps {
  data: WeddingData;
  shouldPlayVideo?: boolean;
  onVideoEnd?: () => void;
}

export function Hero({ data, onVideoEnd }: HeroProps) {
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
    </section>
  );
}
