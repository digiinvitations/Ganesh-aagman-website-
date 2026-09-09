import { motion } from "motion/react";
import { useEffect, useState } from "react";

export function DiyaParticles() {
  const [particles, setParticles] = useState<{ id: number; left: number; duration: number; delay: number; size: number }[]>([]);

  useEffect(() => {
    // Generate static particle config once to avoid hydration mismatch
    const generateParticles = () => {
      const newParticles = Array.from({ length: 25 }).map((_, i) => ({
        id: i,
        left: Math.random() * 100,
        duration: Math.random() * 5 + 4, // 4-9s
        delay: Math.random() * 3,
        size: Math.random() * 4 + 2, // 2-6px
      }));
      setParticles(newParticles);
    };
    generateParticles();
  }, []);

  return (
    <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden mix-blend-screen">
      {/* Subtle flickering warm gradient behind Ganesha */}
      <motion.div
        animate={{ opacity: [0.3, 0.5, 0.3, 0.6, 0.3] }}
        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
        className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_rgba(255,165,0,0.25)_0%,_transparent_60%)]"
      />
      
      {/* Floating light particles */}
      {particles.map((p) => (
        <motion.div
          key={p.id}
          initial={{ y: "110%", opacity: 0 }}
          animate={{ y: "-10%", opacity: [0, 0.8, 0.8, 0] }}
          transition={{
            duration: p.duration,
            delay: p.delay,
            repeat: Infinity,
            ease: "easeIn",
          }}
          className="absolute bottom-0 rounded-full bg-[#FFBF00] shadow-[0_0_8px_2px_rgba(255,191,0,0.8)]"
          style={{
            left: `${p.left}%`,
            width: p.size,
            height: p.size,
          }}
        />
      ))}
    </div>
  );
}
