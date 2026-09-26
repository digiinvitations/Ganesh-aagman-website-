import React, { useEffect, useState } from 'react';
import { ChevronsDown } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface FloatingScrollIndicatorProps {
  onScrollNext: () => void;
  visible?: boolean;
}

export function FloatingScrollIndicator({ onScrollNext, visible = true }: FloatingScrollIndicatorProps) {
  const [isNearBottom, setIsNearBottom] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const scrollPos = window.scrollY + window.innerHeight;
      const docHeight = document.documentElement.scrollHeight;
      // Hide when near footer (last 120px)
      if (docHeight - scrollPos < 120) {
        setIsNearBottom(true);
      } else {
        setIsNearBottom(false);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  if (!visible || isNearBottom) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: 15 }}
        transition={{ duration: 0.3 }}
        className="fixed bottom-4 left-1/2 -translate-x-1/2 z-[75] pointer-events-auto select-none"
      >
        <button
          type="button"
          onClick={onScrollNext}
          aria-label="Scroll down"
          className="group flex flex-col items-center justify-center bg-transparent border-0 p-1.5 transition-all duration-300 transform active:scale-95 cursor-pointer focus:outline-none"
        >
          {/* Free, Unboxed Text with subtle drop shadow */}
          <span className="font-serif text-[11px] sm:text-xs font-extrabold uppercase tracking-[0.2em] text-[#B8141B] drop-shadow-[0_1px_3px_rgba(255,255,255,0.95)] group-hover:text-[#800C12] transition-colors">
            Scroll down
          </span>

          {/* Slightly small, free-floating animating down arrow */}
          <motion.div
            animate={{
              y: [0, 5, 0],
              scale: [1, 1.15, 1],
            }}
            transition={{
              duration: 1.4,
              repeat: Infinity,
              ease: "easeInOut",
            }}
            className="text-[#B8141B] group-hover:text-[#800C12] drop-shadow-[0_1px_3px_rgba(255,255,255,0.9)] flex items-center justify-center mt-0.5"
          >
            <ChevronsDown className="w-5 h-5 sm:w-5.5 sm:h-5.5 stroke-[2.6]" />
          </motion.div>
        </button>
      </motion.div>
    </AnimatePresence>
  );
}
