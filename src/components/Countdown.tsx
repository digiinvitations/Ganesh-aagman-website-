import React, { useState, useEffect, useRef, useCallback } from "react";
import { motion, AnimatePresence } from "motion/react";
import confetti from "canvas-confetti";
import { Sparkles, RotateCcw } from "lucide-react";

interface CountdownProps {
  targetDate?: string;
  dateFormatted?: string;
  dayFormatted?: string;
  timeFormatted?: string;
  venueName?: string;
  onScratched?: () => void;
  isInitiallyScratched?: boolean;
}

// Auspicious celebration chime using Web Audio API synthesis
function playCelebrationChime() {
  try {
    const AudioCtx = window.AudioContext || (window as any).webkitAudioContext;
    if (!AudioCtx) return;
    const ctx = new AudioCtx();
    const now = ctx.currentTime;

    // Harmonic celebration bell frequencies
    const freqs = [528, 660, 792, 1056];
    freqs.forEach((freq, idx) => {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = "sine";
      osc.frequency.setValueAtTime(freq, now + idx * 0.1);

      gain.gain.setValueAtTime(0.001, now + idx * 0.1);
      gain.gain.exponentialRampToValueAtTime(0.18, now + idx * 0.1 + 0.05);
      gain.gain.exponentialRampToValueAtTime(0.0001, now + idx * 0.1 + 1.6);

      osc.connect(gain);
      gain.connect(ctx.destination);

      osc.start(now + idx * 0.1);
      osc.stop(now + idx * 0.1 + 1.8);
    });
  } catch {
    // ignore audio block
  }
}

export function Countdown({
  targetDate = "2026-10-24T20:00:00",
  dateFormatted = "24 October 2026",
  dayFormatted = "Saturday",
  timeFormatted = "8:00 PM Onwards",
  venueName = "Krishna Palace, Agra",
  onScratched,
  isInitiallyScratched = false,
}: CountdownProps) {
  // Scratch progression:
  // 1: Layer 1 (Gold Foil with "SCRATCH GOLD FOIL")
  // 2: Layer 2 (Gold Foil with "SCRATCH GOLD FOIL")
  // 3: Both layers cleared -> Date Revealed & Countdown Activated & Rest of Website Revealed!
  const [scratchLayer, setScratchLayer] = useState<1 | 2 | 3>(isInitiallyScratched ? 3 : 1);
  const [resetKey, setResetKey] = useState(0);

  // Canvas refs
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);
  const isDrawingRef = useRef(false);
  const lastPosRef = useRef<{ x: number; y: number } | null>(null);
  const lastCheckTimeRef = useRef(0);

  // Live countdown state
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  // Countdown timer calculation
  useEffect(() => {
    const calculateTimeLeft = () => {
      const difference = new Date(targetDate).getTime() - new Date().getTime();

      if (difference > 0) {
        setTimeLeft({
          days: Math.floor(difference / (1000 * 60 * 60 * 24)),
          hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
          minutes: Math.floor((difference / 1000 / 60) % 60),
          seconds: Math.floor((difference / 1000) % 60),
        });
      }
    };

    calculateTimeLeft();
    const timer = setInterval(calculateTimeLeft, 1000);
    return () => clearInterval(timer);
  }, [targetDate]);

  // Grand celebration trigger
  const triggerCelebration = useCallback(() => {
    playCelebrationChime();

    // Multi-cannon celebratory confetti
    try {
      const end = Date.now() + 1600;
      const colors = ["#D4AF37", "#FFBF00", "#B8141B", "#FFE58F", "#FF7A00"];

      (function frame() {
        confetti({
          particleCount: 6,
          angle: 60,
          spread: 60,
          origin: { x: 0, y: 0.65 },
          colors,
        });
        confetti({
          particleCount: 6,
          angle: 120,
          spread: 60,
          origin: { x: 1, y: 0.65 },
          colors,
        });

        if (Date.now() < end) {
          requestAnimationFrame(frame);
        }
      })();
    } catch {
      // fallback
    }
  }, []);

  // Draw foil on canvas: Luxurious metallic foil with "SCRATCH GOLD FOIL"
  const drawFoil = useCallback((ctx: CanvasRenderingContext2D, width: number, height: number, layer: 1 | 2) => {
    ctx.clearRect(0, 0, width, height);

    // Multi-stop 24K Royal Gold gradient
    const grad = ctx.createLinearGradient(0, 0, width, height);
    if (layer === 1) {
      grad.addColorStop(0, "#9A6B1F");
      grad.addColorStop(0.18, "#FDF6C7");
      grad.addColorStop(0.38, "#DAA520");
      grad.addColorStop(0.55, "#FFE685");
      grad.addColorStop(0.72, "#B38728");
      grad.addColorStop(0.88, "#FFF0A3");
      grad.addColorStop(1, "#8B6508");
    } else {
      grad.addColorStop(0, "#AA771C");
      grad.addColorStop(0.2, "#FFE082");
      grad.addColorStop(0.45, "#FFBF00");
      grad.addColorStop(0.7, "#FFD54F");
      grad.addColorStop(0.85, "#FFA000");
      grad.addColorStop(1, "#7A5005");
    }
    ctx.fillStyle = grad;
    ctx.fillRect(0, 0, width, height);

    // Subtle diagonal luxury foil luster texture
    ctx.save();
    ctx.strokeStyle = "rgba(255, 255, 255, 0.28)";
    ctx.lineWidth = 1.5;
    for (let i = -width; i < width + height; i += 16) {
      ctx.beginPath();
      ctx.moveTo(i, 0);
      ctx.lineTo(i + height, height);
      ctx.stroke();
    }
    ctx.restore();

    // Ornate double golden border inside foil
    ctx.save();
    ctx.strokeStyle = "rgba(110, 60, 8, 0.4)";
    ctx.lineWidth = 2;
    ctx.strokeRect(8, 8, width - 16, height - 16);
    ctx.strokeStyle = "rgba(255, 255, 255, 0.7)";
    ctx.lineWidth = 1;
    ctx.strokeRect(12, 12, width - 24, height - 24);

    // Corner decorative stars
    ctx.fillStyle = "#5A3004";
    ctx.font = "bold 13px serif";
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    ctx.fillText("✦", 18, 18);
    ctx.fillText("✦", width - 18, 18);
    ctx.fillText("✦", 18, height - 18);
    ctx.fillText("✦", width - 18, height - 18);

    // The text written on the scratch box: SCRATCH GOLD FOIL
    const fontSize = Math.max(15, Math.floor(Math.min(width * 0.055, 22)));
    ctx.font = `800 ${fontSize}px 'Cinzel', 'Playfair Display', Georgia, serif`;
    ctx.letterSpacing = "0.18em";

    // Embossed shadow
    ctx.shadowColor = "rgba(255, 255, 255, 0.85)";
    ctx.shadowBlur = 1;
    ctx.shadowOffsetY = 1;
    ctx.fillStyle = "#422104";
    ctx.fillText("SCRATCH GOLD FOIL", width / 2, height / 2);

    ctx.restore();
  }, []);

  // Initialize canvas
  const initCanvas = useCallback(() => {
    if (scratchLayer === 3) return;
    const canvas = canvasRef.current;
    const container = containerRef.current;
    if (!canvas || !container) return;

    const rect = container.getBoundingClientRect();
    const width = Math.floor(rect.width);
    const height = Math.floor(rect.height);

    if (width === 0 || height === 0) return;

    const dpr = window.devicePixelRatio || 1;
    canvas.width = width * dpr;
    canvas.height = height * dpr;
    canvas.style.width = `${width}px`;
    canvas.style.height = `${height}px`;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    ctx.scale(dpr, dpr);
    drawFoil(ctx, width, height, scratchLayer);
  }, [scratchLayer, drawFoil]);

  useEffect(() => {
    initCanvas();
    const handleResize = () => initCanvas();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [initCanvas, scratchLayer, resetKey]);

  // Scratch progress calculation
  const checkScratchPercentage = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const width = canvas.width;
    const height = canvas.height;
    const imgData = ctx.getImageData(0, 0, width, height);
    const data = imgData.data;

    let transparentPixels = 0;
    let sampledPixels = 0;
    for (let i = 3; i < data.length; i += 4 * 16) {
      sampledPixels++;
      if (data[i] < 128) {
        transparentPixels++;
      }
    }

    const percentage = (transparentPixels / sampledPixels) * 100;

    // Threshold 28% for pleasant, responsive reveal
    if (percentage > 28) {
      if (scratchLayer === 1) {
        // Layer 1 cleared -> Advance to Layer 2
        try {
          confetti({
            particleCount: 22,
            spread: 45,
            origin: { y: 0.55 },
            colors: ["#D4AF37", "#FFE58F", "#FF7A00"],
          });
        } catch {}
        setScratchLayer(2);
      } else if (scratchLayer === 2) {
        // Layer 2 cleared -> Final Reveal & Automatically Activate Countdown & Reveal other sections!
        setScratchLayer(3);
        triggerCelebration();
        onScratched?.();
      }
    }
  }, [scratchLayer, triggerCelebration, onScratched]);

  const scratch = (clientX: number, clientY: number) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const rect = canvas.getBoundingClientRect();
    const x = clientX - rect.left;
    const y = clientY - rect.top;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const dpr = window.devicePixelRatio || 1;

    ctx.save();
    ctx.globalCompositeOperation = "destination-out";
    ctx.lineWidth = 38 * dpr;
    ctx.lineCap = "round";
    ctx.lineJoin = "round";

    if (lastPosRef.current) {
      ctx.beginPath();
      ctx.moveTo(lastPosRef.current.x * dpr, lastPosRef.current.y * dpr);
      ctx.lineTo(x * dpr, y * dpr);
      ctx.stroke();
    } else {
      ctx.beginPath();
      ctx.arc(x * dpr, y * dpr, 19 * dpr, 0, Math.PI * 2);
      ctx.fill();
    }
    ctx.restore();

    lastPosRef.current = { x, y };

    const now = Date.now();
    if (now - lastCheckTimeRef.current > 110) {
      lastCheckTimeRef.current = now;
      checkScratchPercentage();
    }
  };

  const handlePointerDown = (e: React.PointerEvent<HTMLCanvasElement>) => {
    isDrawingRef.current = true;
    lastPosRef.current = null;
    (e.target as HTMLElement).setPointerCapture(e.pointerId);
    scratch(e.clientX, e.clientY);
  };

  const handlePointerMove = (e: React.PointerEvent<HTMLCanvasElement>) => {
    if (!isDrawingRef.current) return;
    scratch(e.clientX, e.clientY);
  };

  const handlePointerUp = (e: React.PointerEvent<HTMLCanvasElement>) => {
    isDrawingRef.current = false;
    lastPosRef.current = null;
    try {
      (e.target as HTMLElement).releasePointerCapture(e.pointerId);
    } catch {
      // ignore
    }
    checkScratchPercentage();
  };

  // Quick auto-reveal feature
  const handleQuickReveal = () => {
    setScratchLayer(3);
    triggerCelebration();
    onScratched?.();
  };

  // Re-scratch reset feature
  const handleReset = () => {
    setScratchLayer(1);
    setResetKey((prev) => prev + 1);
  };

  return (
    <section 
      id="scratch-card-section"
      className="py-10 sm:py-16 px-4 bg-[#FDF0F4] flex flex-col items-center justify-center relative overflow-hidden select-none min-h-[92svh]"
    >
      {/* Soft Devotional Aura Background */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_rgba(255,183,77,0.18)_0%,_rgba(253,240,244,0)_75%)] pointer-events-none" />

      <div className="w-full max-w-md flex flex-col items-center relative z-10">

        {/* Auspicious Devotional Invocation Header */}
        <div className="flex flex-col items-center text-center mb-4">
          <div className="flex items-center gap-2 mb-1 text-sm text-[#B8141B] font-bold font-serif">
            <span>🔔</span>
            <span className="tracking-[0.25em] uppercase text-xs sm:text-sm text-[#B8141B] drop-shadow-xs">
              ॥ श्री गणेशाय नमः ॥ • ॥ जय माता दी ॥
            </span>
            <span>🔔</span>
          </div>

          <h1 className="font-serif text-2xl sm:text-3xl font-extrabold uppercase tracking-[0.18em] text-[#B8141B] drop-shadow-sm">
            Mata Ki Chowki
          </h1>
          <p className="font-serif text-xs uppercase tracking-[0.22em] text-[#E65100] font-semibold mt-0.5">
            ॥ शुभ निमंत्रण पत्र ॥
          </p>
        </div>

        {/* Scratch Guidance / Celebration Status Banner */}
        <div className="mb-3 w-full flex justify-center">
          {scratchLayer !== 3 ? (
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#FFFDF7] border border-[#D4AF37] shadow-[0_2px_12px_rgba(212,175,55,0.25)] animate-pulse">
              <span className="text-xs text-[#E65100]">🪔</span>
              <span className="font-serif text-[11px] sm:text-xs font-bold uppercase tracking-[0.16em] text-[#B8141B]">
                {scratchLayer === 1 ? "Scratch Gold Foil to Reveal" : "Keep Scratching to Unlock!"}
              </span>
              <Sparkles className="w-3.5 h-3.5 text-[#D4AF37]" />
            </div>
          ) : (
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#FFFDF7] border border-[#D4AF37] shadow-[0_2px_12px_rgba(212,175,55,0.3)]">
              <span className="text-xs text-[#E65100]">🪔</span>
              <span className="font-serif text-[11px] sm:text-xs font-bold uppercase tracking-[0.18em] text-[#B8141B]">
                तारीख व काउंटडाउन प्रकट • Invitation Revealed
              </span>
              <span className="text-xs text-[#E65100]">✦</span>
            </div>
          )}
        </div>
        
        {/* GOLDEN ROYAL SCRATCH CARD CONTAINER */}
        <div className="w-full bg-[#FFFDF7] rounded-[32px] sm:rounded-[36px] p-5 sm:p-7 border-2 border-[#D4AF37] shadow-[0_12px_40px_rgba(212,175,55,0.28)] relative flex flex-col items-center overflow-hidden">
          
          {/* Inner ornamental hairline border */}
          <div className="absolute inset-2.5 rounded-[26px] border border-[#D4AF37]/35 pointer-events-none" />

          {/* Corner gold stars */}
          <span className="absolute top-3.5 left-3.5 text-xs text-[#D4AF37] pointer-events-none">✦</span>
          <span className="absolute top-3.5 right-3.5 text-xs text-[#D4AF37] pointer-events-none">✦</span>
          <span className="absolute bottom-3.5 left-3.5 text-xs text-[#D4AF37] pointer-events-none">✦</span>
          <span className="absolute bottom-3.5 right-3.5 text-xs text-[#D4AF37] pointer-events-none">✦</span>

          {/* 
            SCRATCH BOX 
            Reveals the date & activates the countdown when scratched
          */}
          <div 
            ref={containerRef}
            className="relative w-full h-[185px] sm:h-[195px] rounded-2xl overflow-hidden border-2 border-[#D4AF37] shadow-inner select-none bg-[#FFFDF7]"
          >
            {/* Underlying Content: Event Date, Day & Time */}
            <div className="absolute inset-0 w-full h-full flex flex-col justify-center items-center p-4 bg-[#FFFDF7] text-center select-none">
              <span className="text-xs text-[#E65100] font-serif font-bold uppercase tracking-[0.2em] mb-1">
                ॥ शुभ मुहूर्त ॥
              </span>
              <h3 className="font-serif text-2xl sm:text-3xl font-extrabold text-[#B8141B] tracking-wider leading-tight drop-shadow-sm mb-1.5">
                {dateFormatted}
              </h3>
              <div className="flex items-center justify-center gap-2 text-xs sm:text-sm font-serif font-bold text-[#7A4B5B] uppercase tracking-widest">
                <span>{dayFormatted}</span>
                <span className="text-[#D4AF37]">•</span>
                <span className="text-[#E65100]">{timeFormatted}</span>
              </div>
              {venueName && (
                <p className="font-serif text-[11px] sm:text-xs text-[#3C1B26] font-semibold tracking-wider mt-2 opacity-90">
                  📍 {venueName}
                </p>
              )}
            </div>

            {/* Scratch Foil Canvas Layer (Layers 1 and 2) */}
            <AnimatePresence mode="wait">
              {scratchLayer !== 3 && (
                <motion.canvas
                  key={`canvas-${scratchLayer}-${resetKey}`}
                  ref={canvasRef}
                  initial={{ opacity: 0.95 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0, scale: 1.02 }}
                  transition={{ duration: 0.35 }}
                  onPointerDown={handlePointerDown}
                  onPointerMove={handlePointerMove}
                  onPointerUp={handlePointerUp}
                  onPointerCancel={handlePointerUp}
                  className="absolute inset-0 w-full h-full cursor-grab active:cursor-grabbing touch-none z-20"
                  style={{ touchAction: "none" }}
                />
              )}
            </AnimatePresence>
          </div>

          {/* Quick Reveal button for convenience when unscratched */}
          {scratchLayer !== 3 && (
            <div className="mt-3.5 flex flex-col items-center gap-1.5">
              <button
                type="button"
                onClick={handleQuickReveal}
                className="text-[11px] font-serif font-bold text-[#B8141B] hover:text-[#800C12] underline underline-offset-4 tracking-wider transition-colors cursor-pointer"
              >
                ✦ Click to Auto-Reveal / तुरंत खोलें ✦
              </button>
              <p className="text-[10px] text-[#7A4B5B] font-serif tracking-wide text-center">
                (Swipe or drag finger across gold foil to scratch manually)
              </p>
            </div>
          )}

          {/* 
            THE COUNTDOWN
            Automatically starts and becomes visible upon scratching the date card
          */}
          <AnimatePresence>
            {scratchLayer === 3 && (
              <motion.div
                initial={{ opacity: 0, scale: 0.92, y: 12 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                transition={{ duration: 0.6, ease: "easeOut" }}
                className="w-full mt-5 flex flex-col items-center"
              >
                {/* Countdown Header */}
                <div className="w-full flex items-center justify-between mb-3 px-1">
                  <span className="font-serif text-[10px] sm:text-[11px] font-bold uppercase tracking-[0.2em] text-[#B8141B]">
                    COUNTDOWN TO AUSPICIOUS CHOWKI
                  </span>
                  
                  {/* Option to re-scratch if desired */}
                  <button
                    type="button"
                    onClick={handleReset}
                    title="Scratch again"
                    className="inline-flex items-center gap-1 text-[10px] font-serif text-[#7A4B5B] hover:text-[#B8141B] transition-colors cursor-pointer"
                  >
                    <RotateCcw className="w-3 h-3" />
                    <span>Re-scratch</span>
                  </button>
                </div>

                {/* 4 Time Units */}
                <div className="w-full flex justify-between items-center gap-2 px-0 sm:px-1">
                  <TimeUnit value={timeLeft.days} label="DAYS" />
                  <TimeUnit value={timeLeft.hours} label="HOURS" />
                  <TimeUnit value={timeLeft.minutes} label="MINUTES" />
                  <TimeUnit value={timeLeft.seconds} label="SECONDS" />
                </div>
              </motion.div>
            )}
          </AnimatePresence>

        </div>

      </div>
    </section>
  );
}

function TimeUnit({ value, label }: { value: number; label: string }) {
  const formattedValue = value.toString().padStart(2, "0");

  return (
    <div className="flex flex-col items-center w-1/4">
      <div className="w-full aspect-square bg-[#FFFDF7] rounded-2xl border-2 border-[#D4AF37] flex items-center justify-center shadow-[0_4px_14px_rgba(212,175,55,0.18)] mb-1.5 relative overflow-hidden">
        {/* Top Gold Foil Bar */}
        <div className="absolute top-0 inset-x-0 h-1 bg-gradient-to-r from-[#D4AF37] via-[#B8141B] to-[#D4AF37]" />
        
        <span className={`font-serif font-extrabold text-xl sm:text-2xl text-[#B8141B] drop-shadow-sm ${
          label === "SECONDS" ? "animate-pulse text-[#E65100]" : ""
        }`}>
          {formattedValue}
        </span>
      </div>
      <span className="text-[9px] sm:text-[10px] font-serif font-bold uppercase tracking-[0.16em] text-[#7A4B5B]">
        {label}
      </span>
    </div>
  );
}
