import React from 'react';

// Sacred Marigold petals, auspicious blossoms, and golden divine sparkles
const FALLING_ITEMS = ['🌼', '🌸', '✨', '🌺', '🌼', '🪷'];

interface FallingElementProps {
  item: string;
  index: number;
}

const FallingElement: React.FC<FallingElementProps> = ({ item, index }) => {
  const durationFall = Math.random() * 20 + 22; 
  const durationSway = Math.random() * 4 + 4; // 4s - 8s
  const delay = Math.random() * 12;
  const startLeft = Math.random() * 90 + 5; // 5% - 95%
  const size = Math.random() * 8 + 20; // 20px - 28px

  return (
    <div 
      className="fixed z-[9000] pointer-events-none select-none opacity-75 drop-shadow-sm"
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
