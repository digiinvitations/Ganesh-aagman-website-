import { motion } from "motion/react";
import { ArrowDown } from "lucide-react";
import { WeddingData } from "../types";
import { useState, useRef, useEffect } from "react";
import { DiyaParticles } from "./DiyaParticles";

interface HeroProps {
  data: WeddingData;
  shouldPlayVideo?: boolean;
  onVideoEnd?: () => void;
}

export function Hero({ data, shouldPlayVideo = true, onVideoEnd }: HeroProps) {
  const [showText, setShowText] = useState(!data.heroVideoUrl);
  const [isEnded, setIsEnded] = useState(!data.heroVideoUrl);
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    if (shouldPlayVideo && videoRef.current) {
      videoRef.current.play().catch(console.error);
    }
  }, [shouldPlayVideo]);

  const handleTimeUpdate = () => {
    if (videoRef.current) {
      const { currentTime, duration } = videoRef.current;
      // Fade in at the very end of the video
      if (duration && currentTime >= duration - 0.8) {
        if (!showText) setShowText(true);
      }
    }
  };

  const handleEnded = () => {
    setIsEnded(true);
    setShowText(true);
    if (onVideoEnd) onVideoEnd();
  };

  return (
    <section className="relative min-h-[100svh] w-full flex flex-col items-center justify-center overflow-hidden bg-[#3B0918]">
      {/* Background Video or Image */}
      <div className="absolute inset-0 z-0 bg-[#3B0918]">
        {data.heroVideoUrl ? (
          <video
            ref={videoRef}
            src={data.heroVideoUrl}
            muted
            playsInline
            preload="auto"
            onTimeUpdate={handleTimeUpdate}
            onEnded={handleEnded}
            className="w-full h-full object-cover"
          />
        ) : (
          <div 
            className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-80"
            style={{ backgroundImage: "url('https://images.unsplash.com/photo-1519225421980-715cb0215aed?q=80&w=2070&auto=format&fit=crop')" }}
          />
        )}
        
        <DiyaParticles />

        {/* Dynamic Light/Pink Overlay for readability */}
        <div className={`absolute inset-0 bg-black/40 transition-opacity duration-1000 ${data.heroVideoUrl && !showText ? 'opacity-0' : 'opacity-100'}`} />

        <div className="absolute bottom-0 inset-x-0 h-48 bg-gradient-to-t from-[#3B0918] via-[#3B0918]/60 to-transparent pointer-events-none z-10" />
      </div>

      {/* Content */}
      <div className={`relative z-10 flex flex-col justify-between px-6 text-center w-full max-w-md mx-auto pt-16 pb-10 h-full min-h-[100svh] transition-opacity duration-1000 ${showText ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}>
        
        {/* TOP TEXT ZONE */}
        <motion.div
          initial={{ opacity: 0, y: -15 }}
          animate={{ opacity: showText ? 1 : 0, y: showText ? 0 : -15 }}
          transition={{ duration: 1.2, delay: 0.2, ease: "easeOut" }}
          className="flex flex-col items-center w-full mt-4"
        >
          {/* Pill for Ganesh Ji */}
          <div className="bg-black/50 border border-wine-dark/40 px-5 py-1.5 rounded-full backdrop-blur-sm mb-5 shadow-[0_0_10px_rgba(212,175,55,0.2)]">
            <span className="font-serif text-wine-dark text-xs sm:text-sm tracking-[0.1em] font-medium drop-shadow-md">॥ श्री गणेशाय नमः ॥</span>
          </div>
          
          <h3 className="font-serif text-text-body/90 uppercase tracking-[0.35em] text-[10px] sm:text-xs font-semibold mb-3 drop-shadow-sm">
            GANPATI BAPPA'S
          </h3>
          
          <h1 className="font-serif text-[42px] sm:text-5xl text-wine-dark drop-shadow-md leading-none mb-4 font-bold" style={{ textShadow: '0 0 20px rgba(212,175,55,0.4), 0 2px 4px rgba(0,0,0,0.5)' }}>
            GRAND AGMAN
          </h1>
          
          <p className="font-serif text-text-body uppercase tracking-[0.25em] text-[9px] sm:text-[10px] font-semibold drop-shadow-sm">
            14 — 20 SEPTEMBER 2026
          </p>
        </motion.div>

        {/* CENTRAL ZONE - NO TEXT */}
        <div className="flex-1 w-full" />
        
        {/* BOTTOM TEXT ZONE */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: showText ? 1 : 0, y: showText ? 0 : 15 }}
          transition={{ duration: 1.2, delay: 0.6, ease: "easeOut" }}
          className="flex flex-col items-center w-full mb-2"
        >
          <p className="font-serif text-text-body/80 uppercase tracking-[0.2em] text-[8px] sm:text-[9px] font-semibold mb-6 shadow-black drop-shadow-md">
            7 DAYS • 7 CELEBRATIONS • ONE DIVINE JOURNEY
          </p>
          
          {/* Scroll Indicator */}
          <div className="flex flex-col items-center opacity-90 cursor-pointer">
            <span className="text-[9px] font-serif text-wine-dark uppercase tracking-[0.3em] mb-2 font-bold drop-shadow-md">SCROLL</span>
            <motion.div 
              animate={{ y: [0, 6, 0] }}
              transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            >
              <ArrowDown className="w-4 h-4 text-wine-dark drop-shadow-md" />
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
