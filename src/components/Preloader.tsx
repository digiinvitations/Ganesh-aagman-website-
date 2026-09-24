import { useEffect, useState } from 'react';
import { motion } from 'motion/react';
import { WeddingData } from '../types';

interface PreloaderProps {
  data: WeddingData;
  onComplete: () => void;
}

export function Preloader({ data, onComplete }: PreloaderProps) {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    let isMounted = true;

    const loadAssets = async () => {
      const assets: { type: 'image' | 'media'; url: string }[] = [];

      // Collect all critical assets
      if (data.openingThumbnailUrl) assets.push({ type: 'image', url: data.openingThumbnailUrl });
      if (data.openingVideoUrl) assets.push({ type: 'media', url: data.openingVideoUrl });
      if (data.heroVideoUrl) assets.push({ type: 'media', url: data.heroVideoUrl });
      if (data.heroImageUrl) assets.push({ type: 'image', url: data.heroImageUrl });
      if (data.deviImageUrl) assets.push({ type: 'image', url: data.deviImageUrl });
      if (data.globalLogo) assets.push({ type: 'image', url: data.globalLogo });

      // Deduplicate by URL
      const uniqueAssets = Array.from(new Set(assets.map(a => a.url)))
        .map(url => assets.find(a => a.url === url)!);

      const total = uniqueAssets.length;
      if (total === 0) {
        onComplete();
        return;
      }

      let loadedCount = 0;
      const updateProgress = () => {
        loadedCount++;
        if (isMounted) {
          setProgress(Math.round((loadedCount / total) * 100));
        }
      };

      const promises = uniqueAssets.map(asset => {
        return new Promise<void>((resolve) => {
          if (asset.type === 'image') {
            const img = new Image();
            img.onload = () => { updateProgress(); resolve(); };
            img.onerror = () => { updateProgress(); resolve(); };
            img.src = asset.url;
          } else {
            fetch(asset.url, { cache: "force-cache" })
              .then(res => res.blob())
              .then(() => { updateProgress(); resolve(); })
              .catch(() => { 
                updateProgress(); 
                resolve(); 
              });
          }
        });
      });

      const timeout = new Promise<void>(resolve => setTimeout(resolve, 10000));
      await Promise.race([Promise.all(promises), timeout]);

      if (isMounted) {
        setProgress(100);
        setTimeout(() => {
          if (isMounted) onComplete();
        }, 600);
      }
    };

    loadAssets();

    return () => { isMounted = false; };
  }, [data, onComplete]);

  return (
    <div className="fixed inset-0 z-[100000] flex flex-col items-center justify-center bg-[#FDF0F4] px-6">
      <motion.div 
        animate={{ scale: [1, 1.08, 1] }}
        transition={{ 
          scale: { repeat: Infinity, duration: 1.6, ease: "easeInOut" }
        }}
        className="mb-6 flex flex-col items-center justify-center text-center"
      >
        <span className="text-5xl filter drop-shadow-[0_0_15px_rgba(255,183,77,0.6)] mb-3">
          🪔
        </span>
        <h2 className="font-serif text-xl sm:text-2xl font-extrabold text-[#B8141B] tracking-[0.18em]">
          ॥ जय माता दी ॥
        </h2>
      </motion.div>

      <div className="w-full max-w-xs">
        <div className="h-1.5 w-full bg-[#D4AF37]/25 rounded-full overflow-hidden relative">
          <motion.div 
            className="h-full bg-gradient-to-r from-[#B8141B] to-[#D4AF37] absolute top-0 left-0 rounded-full"
            initial={{ width: 0 }}
            animate={{ width: `${progress}%` }}
            transition={{ duration: 0.3 }}
          />
        </div>
        <p className="text-center text-[#7A4B5B] font-serif text-[11px] uppercase tracking-[0.2em] mt-4 font-bold">
          {progress < 100 ? `Opening Divine Invitation ${progress}%` : "Welcome"}
        </p>
      </div>
    </div>
  );
}
