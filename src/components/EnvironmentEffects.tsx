import React from 'react';

const FALLING_ITEMS = ['🪷', '🪷', '🪷', '🌰', '🌰', '🌰'];

const FallingElement = ({ item, index }: { item: string, index: number }) => {
  const durationFall = Math.random() * 20 + 25; 
  const durationSway = Math.random() * 4 + 4; // 4s - 8s
  const delay = Math.random() * 15;
  const startLeft = Math.random() * 90 + 5; // 5% - 95%
  const size = Math.random() * 10 + 24; // 24px - 34px

  return (
    <div 
      className="fixed z-[9000] pointer-events-none select-none opacity-80 drop-shadow-md"
      style={{
        left: `${startLeft}%`,
        animation: `petal-fall ${durationFall}s linear infinite`,
        animationDelay: `${delay}s`,
        top: '-10%',
      }}
    >
      <div
        style={{
          animation: `petal-sway ${durationSway}s ease-in-out infinite alternate`,
          fontSize: `${size}px`,
        }}
      >
        {item}
      </div>
    </div>
  );
};

export function EnvironmentEffects() {
  return (
    <div className="fixed inset-0 z-[9000] pointer-events-none overflow-hidden" aria-hidden="true">
      {FALLING_ITEMS.map((item, i) => <FallingElement key={`element-${i}`} item={item} index={i} />)}
    </div>
  );
}
