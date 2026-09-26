import React from 'react';

// SVG Marigold Petal with rich saffron-orange gradient and subtle ribbing
function MarigoldPetalSvg({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 32 32" fill="none" className={className} xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="envMarigoldGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#FFF9C4" />
          <stop offset="30%" stopColor="#FFB300" />
          <stop offset="70%" stopColor="#FB8C00" />
          <stop offset="100%" stopColor="#D84315" />
        </linearGradient>
      </defs>
      <path
        d="M16 2 C22 8, 28 16, 23 25 C19 31, 13 31, 9 25 C4 16, 10 8, 16 2 Z"
        fill="url(#envMarigoldGrad)"
      />
      <path
        d="M16 5 C16.5 12, 16.5 21, 16 27"
        stroke="#FFE082"
        strokeWidth="0.8"
        strokeLinecap="round"
        opacity="0.6"
      />
    </svg>
  );
}

// Small sacred marigold mini blossom
function MarigoldBlossomSvg({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className} xmlns="http://www.w3.org/2000/svg">
      {[0, 45, 90, 135, 180, 225, 270, 315].map((angle, idx) => (
        <ellipse
          key={idx}
          cx="12"
          cy="6"
          rx="2.2"
          ry="3.8"
          fill={idx % 2 === 0 ? "#FFB300" : "#FB8C00"}
          opacity="0.85"
          transform={`rotate(${angle} 12 12)`}
        />
      ))}
      <circle cx="12" cy="12" r="2.2" fill="#D84315" />
      <circle cx="12" cy="12" r="1.1" fill="#FFF9C4" />
    </svg>
  );
}

/**
 * 3-5 Marigold petals released intermittently from the top of the screen
 * with varying speeds, sway, and opacities.
 * Placed in peripheral lanes with pointer-events-none and gentle opacities
 * to ensure zero obstruction of text or interactive elements.
 */
interface PetalConfig {
  id: string;
  type: 'petal' | 'blossom';
  left: number; // percentage across screen width
  duration: number; // fall duration in seconds (speed)
  delay: number; // intermittent release delay in seconds
  sway: number; // horizontal sway distance in px
  rotate: number; // rotation in deg
  opacity: number; // subtle opacity for non-obstructive visual harmony
  size: number; // size in px
}

const FLOATING_PETAL_CONFIGS: PetalConfig[] = [
  // Petal 1: Left outer gutter (fast, subtle drift)
  {
    id: 'petal-left-outer',
    type: 'petal',
    left: 7,
    duration: 18,
    delay: 0,
    sway: 35,
    rotate: 190,
    opacity: 0.48,
    size: 20,
  },
  // Petal 2: Left-center gentle lane (medium speed, released after 4.5s)
  {
    id: 'blossom-left-inner',
    type: 'blossom',
    left: 23,
    duration: 23,
    delay: 4.5,
    sway: -28,
    rotate: -150,
    opacity: 0.38,
    size: 16,
  },
  // Petal 3: Right-center lane (relaxed float, released after 9s)
  {
    id: 'petal-right-inner',
    type: 'petal',
    left: 75,
    duration: 21,
    delay: 9,
    sway: 32,
    rotate: 170,
    opacity: 0.42,
    size: 19,
  },
  // Petal 4: Right outer gutter (slow graceful glide, released after 14s)
  {
    id: 'petal-right-outer',
    type: 'petal',
    left: 91,
    duration: 26,
    delay: 14,
    sway: -30,
    rotate: -210,
    opacity: 0.36,
    size: 17,
  },
  // Petal 5: Center-subtle drift with very light opacity (released after 19s)
  {
    id: 'petal-center-ambient',
    type: 'petal',
    left: 49,
    duration: 28,
    delay: 19,
    sway: 24,
    rotate: 140,
    opacity: 0.28,
    size: 16,
  },
];

export function EnvironmentEffects() {
  return (
    <div
      className="fixed inset-0 z-[8900] pointer-events-none overflow-hidden select-none"
      aria-hidden="true"
    >
      {FLOATING_PETAL_CONFIGS.map((config) => (
        <div
          key={config.id}
          className="fixed pointer-events-none select-none animate-floating-petals drop-shadow-xs"
          style={
            {
              left: `${config.left}%`,
              width: `${config.size}px`,
              height: `${config.size}px`,
              '--petal-duration': `${config.duration}s`,
              '--petal-delay': `${config.delay}s`,
              '--petal-sway': `${config.sway}px`,
              '--petal-rotate': `${config.rotate}deg`,
              '--petal-opacity': config.opacity,
            } as React.CSSProperties
          }
        >
          {config.type === 'blossom' ? (
            <MarigoldBlossomSvg className="w-full h-full" />
          ) : (
            <MarigoldPetalSvg className="w-full h-full" />
          )}
        </div>
      ))}
    </div>
  );
}
