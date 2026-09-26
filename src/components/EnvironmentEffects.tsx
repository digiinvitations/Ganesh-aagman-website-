import React from 'react';

// Sacred Marigold petals, auspicious blossoms, and golden divine sparkles
// Kept low in density and quantity for a serene, graceful background ambiance
const FLOATING_CONFIGS = [
  { item: '🌼', left: 18, durationFall: 34, durationSway: 6, delay: 0, size: 15 },
  { item: '✨', left: 52, durationFall: 28, durationSway: 5, delay: 11, size: 13 },
  { item: '🌸', left: 82, durationFall: 36, durationSway: 6.5, delay: 22, size: 14 },
];

export function EnvironmentEffects() {
  return (
    <div className="fixed inset-0 z-[9000] pointer-events-none overflow-hidden" aria-hidden="true">
      {FLOATING_CONFIGS.map((config, index) => (
        <div
          key={`falling-item-${index}`}
          className="fixed pointer-events-none select-none drop-shadow-sm opacity-40"
          style={{
            left: `${config.left}%`,
            animation: `petal-fall ${config.durationFall}s linear infinite`,
            animationDelay: `${config.delay}s`,
            top: '-10%',
          }}
        >
          <div
            style={{
              animation: `petal-sway ${config.durationSway}s ease-in-out infinite alternate`,
              fontSize: `${config.size}px`,
            }}
          >
            {config.item}
          </div>
        </div>
      ))}
    </div>
  );
}
