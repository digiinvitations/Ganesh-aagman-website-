import React, { useEffect, useState } from 'react';
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
      
      if (data.globalLogo) assets.push({ type: 'image', url: data.globalLogo });
      
      if (data.events) {
        // Collect everything from events array
        data.events.forEach(e => {
           if (e.videoUrl) assets.push({ type: 'media', url: e.videoUrl });
           if (e.image) assets.push({ type: 'image', url: e.image });
           if (e.backgroundUrl) assets.push({ type: 'image', url: e.backgroundUrl });
           if (e.caricatureUrl) assets.push({ type: 'image', url: e.caricatureUrl });
           if (e.circularImageUrl) assets.push({ type: 'image', url: e.circularImageUrl });
           if (e.logoUrl) assets.push({ type: 'image', url: e.logoUrl });
        });
        
        if (data.gallery) {
           data.gallery.forEach(url => assets.push({ type: 'image', url }));
        }
      }

      // Collect timeline assets specifically
      if (data.timeline) {
        data.timeline.forEach(t => {
           if (t.imageUrl) assets.push({ type: 'image', url: t.imageUrl });
           if (t.logoUrl) assets.push({ type: 'image', url: t.logoUrl });
        });
      }

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
            // Fetch media to ensure it is fully downloaded and cached
            fetch(asset.url, { cache: "force-cache" })
              .then(res => res.blob())
              .then(() => { updateProgress(); resolve(); })
              .catch((err) => { 
                 console.warn("Preload fetch failed (likely CORS), skipping:", asset.url);
                 updateProgress(); 
                 resolve(); 
               });
          }
        });
      });

      // Timeout after 12 seconds max to avoid freezing on slow connections
      const timeout = new Promise<void>(resolve => setTimeout(resolve, 15000)); // slightly increased timeout for large video loading
      await Promise.race([Promise.all(promises), timeout]);

      if (isMounted) {
        setProgress(100);
        setTimeout(() => {
          if (isMounted) onComplete();
        }, 800); // Brief pause at 100% so it looks complete
      }
    };

    loadAssets();

    return () => { isMounted = false; };
  }, [data, onComplete]);

  return (
    <div className="fixed inset-0 z-[100000] flex flex-col items-center justify-center bg-[#3B0918] px-6">
      <motion.div 
        animate={{ scale: [1, 1.1, 1] }}
        transition={{ 
          scale: { repeat: Infinity, duration: 1.5, ease: "easeInOut" }
        }}
        className="mb-8 flex items-center justify-center text-[#D4AF37]"
      >
        <span className="text-6xl drop-shadow-[0_0_15px_rgba(212,175,55,0.4)]">🕉️</span>
      </motion.div>

      <div className="w-full max-w-xs">
        <div className="h-1 w-full bg-[#D4AF37]/20 rounded-full overflow-visible relative">
          <motion.div 
            className="h-full bg-[#D4AF37] absolute top-0 left-0 rounded-full shadow-[0_0_8px_rgba(212,175,55,0.8)]"
            initial={{ width: 0 }}
            animate={{ width: `${progress}%` }}
            transition={{ duration: 0.3 }}
          />
          {/* Progress Arrow following the tip */}
          <motion.div
            className="absolute top-1/2 -translate-y-1/2 text-[14px] drop-shadow-sm z-10"
            initial={{ left: "0%" }}
            animate={{ left: `calc(${progress}% - 8px)` }}
            transition={{ duration: 0.3 }}
          >
            🪷
          </motion.div>
        </div>
        <p className="text-center text-[#D4AF37] font-serif text-[10px] uppercase tracking-[0.2em] mt-6 font-bold opacity-90 drop-shadow-sm">
          {progress < 100 ? `Preparing Divine Journey ${progress}%` : "Ready"}
        </p>
      </div>
    </div>
  );
}
