import React, { useEffect, useState } from 'react';
import { BrowserRouter, Routes, Route, useSearchParams } from 'react-router-dom';
import { Hero } from './components/Hero';
import { Countdown } from './components/Countdown';
import { FamilyInvitation } from './components/FamilyInvitation';
import { LightDiya } from './components/LightDiya';
import { InvitationMessage } from './components/InvitationMessage';
import { DeviShrine } from './components/DeviShrine';
import { Events } from './components/Events';
import { Venue } from './components/Venue';
import { RSVP } from './components/RSVP';
import { Contact } from './components/Contact';
import { ClosingMessage } from './components/ClosingMessage';
import { Footer } from './components/Footer';
import { MusicControl } from './components/MusicControl';
import { getWeddingData } from './services/db';
import { WeddingData } from './types';
import { AdminPanel } from './components/AdminPanel';
import { Preloader } from './components/Preloader';
import { Reveal } from './components/Reveal';
import { EnvironmentEffects } from './components/EnvironmentEffects';
import { ParallaxDivider } from './components/ParallaxDivider';
import { OpeningTransition } from './components/OpeningTransition';

function PublicView() {
  const [searchParams] = useSearchParams();
  const templateId = searchParams.get('template') || 'matakichowki_main';

  const [data, setData] = useState<WeddingData | null>(null);
  const [isPreloading, setIsPreloading] = useState(true);
  const [viewState, setViewState] = useState<'thumbnail' | 'opening-video' | 'main'>('thumbnail');
  const [isVideoPlaying, setIsVideoPlaying] = useState(false);
  const [isHeroEnded, setIsHeroEnded] = useState(false);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const openingVideoRef = React.useRef<HTMLVideoElement>(null);

  useEffect(() => {
    async function loadData() {
      const dbData = await getWeddingData(templateId);
      setData(dbData);
      if (!dbData.openingThumbnailUrl) {
        setViewState('main');
      }
    }
    loadData();
  }, [templateId]);

  const handleTransitionEnd = () => {
    setIsTransitioning(false);
  };

  const handleVideoEnd = () => {
    setIsTransitioning(true);
    setViewState('main');
  };

  const handleThumbnailClick = () => {
    if (viewState === 'opening-video') {
      handleVideoEnd();
      return;
    }

    if (data?.openingVideoUrl) {
      setViewState('opening-video');
      if (openingVideoRef.current) {
        openingVideoRef.current.play().catch((err) => {
          console.error("Video playback failed", err);
          handleVideoEnd();
        });
      }
    } else {
      setIsTransitioning(true);
      setViewState('main');
    }
  };

  useEffect(() => {
    if (data) {
      const pageTitle = "Mata Ki Chowki Invitation | Karoli Wali Mata";
      const pageDesc = "With immense devotion and heartfelt joy, the Goyal Family cordially invites you to Mata Ki Chowki on Saturday, 24 October 2026 at Krishna Palace, Agra.";
      
      document.title = pageTitle;

      const setMetaTag = (attribute: string, key: string, content: string) => {
        let meta = document.querySelector(`meta[${attribute}="${key}"]`);
        if (!meta) {
          meta = document.createElement('meta');
          meta.setAttribute(attribute, key);
          document.head.appendChild(meta);
        }
        meta.setAttribute('content', content);
      };

      setMetaTag('name', 'description', pageDesc);
      setMetaTag('property', 'og:title', pageTitle);
      setMetaTag('property', 'og:description', pageDesc);
      setMetaTag('name', 'twitter:title', pageTitle);
      setMetaTag('name', 'twitter:description', pageDesc);

      if (data.ogImageUrl) {
        setMetaTag('property', 'og:image', data.ogImageUrl);
        setMetaTag('property', 'og:image:secure_url', data.ogImageUrl);
        setMetaTag('name', 'twitter:image', data.ogImageUrl);

        const img = new Image();
        img.onload = () => {
          setMetaTag('property', 'og:image:width', String(img.naturalWidth));
          setMetaTag('property', 'og:image:height', String(img.naturalHeight));
          const ratio = img.naturalWidth / img.naturalHeight;
          if (ratio < 1.1) {
            setMetaTag('name', 'twitter:card', 'summary');
          } else {
            setMetaTag('name', 'twitter:card', 'summary_large_image');
          }
        };
        img.src = data.ogImageUrl;
      }
    }
  }, [data]);

  if (!data) {
    return <div className="min-h-screen bg-[#FDF0F4] flex items-center justify-center font-serif text-[#B8141B]">Loading...</div>;
  }

  if (isPreloading) {
    return <Preloader data={data} onComplete={() => setIsPreloading(false)} />;
  }

  return (
    <div className={`w-full bg-[#FDF0F4] relative mx-auto max-w-md shadow-2xl overflow-hidden sm:my-0 ${viewState !== 'main' ? 'h-[100svh]' : 'min-h-[100svh]'}`}>
      
      {/* Devotional Audio player remains mounted across transitions */}
      <MusicControl musicUrl={data.musicUrl} shouldPlay={viewState !== 'thumbnail'} />

      {/* Global Environment Animations (Auspicious Marigold Blossoms & Sparkles) */}
      {viewState === 'main' && <EnvironmentEffects />}

      {/* Main Content Sections */}
      <main className="w-full min-h-[100svh] bg-[#FDF0F4] relative overflow-hidden">
        
        {/* HERO SECTION */}
        <Hero 
          data={data} 
          shouldPlayVideo={viewState === 'main' || !data.openingVideoUrl} 
          onVideoEnd={() => setIsHeroEnded(true)} 
        />
        
        <ParallaxDivider />
        {/* SECTION 1 — COUNTDOWN */}
        <Reveal delay={0.1}><Countdown targetDate={data.weddingDate} /></Reveal>
        
        <ParallaxDivider />
        {/* SECTION 2 — FAMILY INVITATION */}
        <Reveal delay={0.1}><FamilyInvitation data={data} /></Reveal>
        
        {/* SECTION 3 — LIGHT A DIYA */}
        <Reveal delay={0.1}><LightDiya /></Reveal>
        
        <ParallaxDivider />
        {/* SECTION 4 — INVITATION MESSAGE */}
        <Reveal delay={0.1}><InvitationMessage message={data.invitationMessage} isHeroEnded={isHeroEnded} /></Reveal>
        
        <ParallaxDivider />
        {/* SECTION 5 — KAROLI WALI MATA */}
        <Reveal delay={0.1}><DeviShrine data={data} /></Reveal>
        
        <ParallaxDivider />
        {/* SECTION 6 — EVENT DETAILS */}
        <Reveal delay={0.1}><Events events={data.events} globalLogo={data.globalLogo} /></Reveal>
        
        <ParallaxDivider />
        {/* SECTION 7 — VENUE */}
        <Reveal delay={0.1}><Venue venue={data.venue} groom={data.groom} bride={data.bride} weddingDate={data.weddingDate} /></Reveal>
        
        <ParallaxDivider />
        {/* SECTION 8 — RSVP */}
        <Reveal delay={0.1}><RSVP /></Reveal>
        
        <ParallaxDivider />
        {/* SECTION 9 — CONTACT */}
        <Reveal delay={0.1}><Contact data={data} /></Reveal>
        
        <ParallaxDivider />
        {/* SECTION 10 — FINAL CLOSING */}
        <Reveal delay={0.1}><ClosingMessage data={data} /></Reveal>
        
        {/* FOOTER */}
        <Reveal delay={0.1}><Footer data={data} /></Reveal>
      </main>

      {/* Opening Video Overlay */}
      {data.openingVideoUrl && (
        <div 
          className={`absolute inset-0 z-[9999] bg-[#FDF0F4] flex items-center justify-center ${viewState === 'opening-video' ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}
        >
          <video
            ref={openingVideoRef}
            src={data.openingVideoUrl}
            playsInline
            muted
            preload="auto"
            onLoadedData={() => setIsVideoPlaying(true)}
            onTimeUpdate={(e) => {
              if (e.currentTarget.currentTime > 0.1) {
                setIsVideoPlaying(true);
              }
            }}
            onEnded={handleVideoEnd}
            onClick={handleVideoEnd}
            className="w-full h-full object-contain cursor-pointer"
          />
        </div>
      )}

      {/* Thumbnail Overlay */}
      {data.openingThumbnailUrl && (
        <div 
          className={`absolute inset-0 z-[9999] bg-[#FDF0F4] flex flex-col items-center justify-center cursor-pointer transition-opacity duration-700 ${viewState === 'thumbnail' || (viewState === 'opening-video' && !isVideoPlaying) ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}
          onClick={handleThumbnailClick}
        >
          <img 
            src={data.openingThumbnailUrl} 
            alt="Opening" 
            className="absolute inset-0 w-full h-full object-contain" 
          />
          
          {/* Tap to open indicator */}
          <div className="absolute bottom-20 z-10 bg-[#FFFDF7]/90 backdrop-blur-md border border-[#D4AF37]/60 px-6 py-2.5 rounded-full shadow-lg flex items-center justify-center animate-pulse">
            <span className="font-serif text-[#B8141B] uppercase tracking-widest text-xs font-bold drop-shadow-sm">
              Tap to open
            </span>
          </div>
        </div>
      )}

      {/* Full Screen White Dim Light Transition with Sparkles (1.5 seconds) */}
      <OpeningTransition 
        isActive={isTransitioning} 
        onComplete={handleTransitionEnd} 
      />
    </div>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<PublicView />} />
        <Route path="/admin" element={<AdminPanel />} />
      </Routes>
    </BrowserRouter>
  );
}
