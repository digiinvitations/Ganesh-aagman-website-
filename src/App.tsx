import React, { useEffect, useState } from 'react';
import { BrowserRouter, Routes, Route, useSearchParams } from 'react-router-dom';
import { motion } from 'motion/react';
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
import { ScrollPrompt } from './components/ScrollPrompt';
import { FullScreenScrollFlash } from './components/FullScreenScrollFlash';

function PublicView() {
  const [searchParams] = useSearchParams();
  const templateId = searchParams.get('template') || 'matakichowki_main';

  const [data, setData] = useState<WeddingData | null>(null);
  const [isPreloading, setIsPreloading] = useState(true);
  const [viewState, setViewState] = useState<'thumbnail' | 'opening-video' | 'transition' | 'main'>('thumbnail');
  const [isVideoPlaying, setIsVideoPlaying] = useState(false);
  const [isHeroEnded, setIsHeroEnded] = useState(false);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [showScrollFlash, setShowScrollFlash] = useState(false);
  
  // Scratch card reveal state: inside website, visitor faces the scratch card first
  const [isInvitationRevealed, setIsInvitationRevealed] = useState(() => {
    try {
      return sessionStorage.getItem('invitation_card_scratched') === 'true';
    } catch {
      return false;
    }
  });

  const openingVideoRef = React.useRef<HTMLVideoElement>(null);

  // Auto-scroll upward animation logic if user hasn't scrolled yet
  const hasUserScrolledRef = React.useRef(false);
  const autoScrollTriggeredRef = React.useRef(false);

  useEffect(() => {
    const handleUserScroll = () => {
      if (window.scrollY > 25) {
        hasUserScrolledRef.current = true;
        setShowScrollFlash(false);
      }
    };
    window.addEventListener('scroll', handleUserScroll, { passive: true });
    window.addEventListener('wheel', handleUserScroll, { passive: true });
    window.addEventListener('touchmove', handleUserScroll, { passive: true });
    return () => {
      window.removeEventListener('scroll', handleUserScroll);
      window.removeEventListener('wheel', handleUserScroll);
      window.removeEventListener('touchmove', handleUserScroll);
    };
  }, []);

  // Trigger 2-3 times upward-initial position scroll animation after card is revealed
  const triggerUpwardBounceSequence = React.useCallback(() => {
    if (hasUserScrolledRef.current || window.scrollY > 20) return;
    autoScrollTriggeredRef.current = true;

    // Bounce 1: Upward
    window.scrollTo({ top: 135, behavior: 'smooth' });

    // Bounce 1: Back to initial position
    const t1 = setTimeout(() => {
      if (hasUserScrolledRef.current) return;
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }, 850);

    // Bounce 2: Upward
    const t2 = setTimeout(() => {
      if (hasUserScrolledRef.current) return;
      window.scrollTo({ top: 145, behavior: 'smooth' });
    }, 1650);

    // Bounce 2: Back to initial position
    const t3 = setTimeout(() => {
      if (hasUserScrolledRef.current) return;
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }, 2500);

    // Bounce 3: Upward
    const t4 = setTimeout(() => {
      if (hasUserScrolledRef.current) return;
      window.scrollTo({ top: 135, behavior: 'smooth' });
    }, 3300);

    // Bounce 3: Back to initial position
    const t5 = setTimeout(() => {
      if (hasUserScrolledRef.current) return;
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }, 4150);

    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
      clearTimeout(t3);
      clearTimeout(t4);
      clearTimeout(t5);
    };
  }, []);

  // Make the hero section move upward-initial 2-3 times after card is revealed and user stays at top
  useEffect(() => {
    if (viewState === 'main' && isInvitationRevealed) {
      const timer = setTimeout(() => {
        triggerUpwardBounceSequence();
      }, 4000);
      return () => clearTimeout(timer);
    }
  }, [viewState, isInvitationRevealed, triggerUpwardBounceSequence]);

  // Full screen instant flash animation for 1 sec if someone has not scrolled after invitation is revealed
  useEffect(() => {
    if (viewState === 'main' && isInvitationRevealed) {
      const flashTimer = setTimeout(() => {
        if (!hasUserScrolledRef.current && window.scrollY < 20) {
          setShowScrollFlash(true);
          const endTimer = setTimeout(() => {
            setShowScrollFlash(false);
          }, 1000);
          return () => clearTimeout(endTimer);
        }
      }, 10000);
      return () => clearTimeout(flashTimer);
    }
  }, [viewState, isInvitationRevealed]);

  useEffect(() => {
    async function loadData() {
      const dbData = await getWeddingData(templateId);
      setData(dbData);
      if (!dbData.openingThumbnailUrl && !dbData.openingVideoUrl) {
        setViewState('main');
      } else if (!dbData.openingThumbnailUrl && dbData.openingVideoUrl) {
        setViewState('opening-video');
      }
    }
    loadData();
  }, [templateId]);

  const handleTransitionEnd = () => {
    setIsTransitioning(false);
    setViewState('main');
  };

  const handleVideoEnd = () => {
    setIsTransitioning(true);
    setViewState('transition');
  };

  const handleHeroVideoEnd = () => {
    setIsHeroEnded(true);
  };

  const handleCardScratched = () => {
    setIsInvitationRevealed(true);
    try {
      sessionStorage.setItem('invitation_card_scratched', 'true');
    } catch {}

    // Gentle scroll hint to indicate unlocked sections below
    setTimeout(() => {
      if (!hasUserScrolledRef.current && window.scrollY < 30) {
        window.scrollBy({
          top: 130,
          behavior: 'smooth'
        });
      }
    }, 1600);
  };

  const handleScrollDownClick = () => {
    hasUserScrolledRef.current = true;
    setShowScrollFlash(false);
    const heroElem = document.getElementById('hero-section');
    if (heroElem) {
      heroElem.scrollIntoView({ behavior: 'smooth' });
    } else {
      window.scrollTo({
        top: window.innerHeight * 0.92,
        behavior: 'smooth'
      });
    }
  };

  const handleThumbnailClick = () => {
    if (viewState === 'opening-video') {
      handleVideoEnd();
      return;
    }

    if (data?.openingVideoUrl) {
      setViewState('opening-video');
      if (openingVideoRef.current) {
        openingVideoRef.current.currentTime = 0;
        openingVideoRef.current.play().catch((err) => {
          console.error("Video playback failed", err);
          handleVideoEnd();
        });
      }
    } else {
      setIsTransitioning(true);
      setViewState('transition');
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
      setMetaTag('name', 'twitter:card', 'summary_large_image');

      if (data.ogImageUrl) {
        setMetaTag('property', 'og:image', data.ogImageUrl);
        setMetaTag('property', 'og:image:secure_url', data.ogImageUrl);
        setMetaTag('name', 'twitter:image', data.ogImageUrl);

        const img = new Image();
        img.onload = () => {
          setMetaTag('property', 'og:image:width', String(img.naturalWidth));
          setMetaTag('property', 'og:image:height', String(img.naturalHeight));
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

      {/* Main Content Sections - strictly invisible until transition finishes */}
      <main className={`w-full min-h-[100svh] bg-[#FDF0F4] relative overflow-hidden transition-opacity duration-700 ${viewState === 'main' ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}>
        
        {/* ========================================================
            1. SCRATCH CARD SECTION
            First section visitor faces on entry.
            Scratching reveals date, starts countdown, and unlocks the other sections!
        ======================================================== */}
        <Countdown 
          targetDate={data.weddingDate} 
          dateFormatted={data.weddingDateFormatted}
          dayFormatted={data.weddingDayFormatted}
          timeFormatted={data.weddingTimeFormatted}
          venueName={data.venue?.name}
          onScratched={handleCardScratched}
          isInitiallyScratched={isInvitationRevealed}
        />

        {/* Once card is scratched, show prominent scroll prompt with floating marigold petals */}
        {isInvitationRevealed && (
          <ScrollPrompt onClick={handleScrollDownClick} />
        )}

        {/* ========================================================
            REVEALED SECTIONS
            Becomes visible and accessible once the card is scratched!
        ======================================================== */}
        {isInvitationRevealed && (
          <motion.div
            initial={{ opacity: 0, y: 35 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.85, ease: "easeOut" }}
            className="w-full flex flex-col items-center"
          >
            <ParallaxDivider />

            {/* ========================================================
                2. HERO SECTION
            ======================================================== */}
            <div className="w-full">
              <Hero 
                data={data} 
                shouldPlayVideo={viewState === 'main'} 
                onVideoEnd={handleHeroVideoEnd}
              />
            </div>

            <ParallaxDivider />

            {/* ========================================================
                3. VENUE SECTION
            ======================================================== */}
            <div className="w-full">
              <Reveal delay={0.1}>
                <Venue 
                  venue={data.venue} 
                  groom={data.groom} 
                  bride={data.bride} 
                  weddingDate={data.weddingDate} 
                />
              </Reveal>
            </div>

            <ParallaxDivider />

            {/* ========================================================
                4. KAROLI WALI MATA WITH IMAGE SECTION
            ======================================================== */}
            <div className="w-full">
              <Reveal delay={0.1}>
                <DeviShrine data={data} />
              </Reveal>
            </div>

            <ParallaxDivider />

            {/* ========================================================
                5. जय माता दी MESSAGE SECTION
            ======================================================== */}
            <div className="w-full">
              <Reveal delay={0.1}>
                <InvitationMessage 
                  message={data.invitationMessage} 
                  isHeroEnded={isHeroEnded} 
                />
              </Reveal>
            </div>

            <ParallaxDivider />

            {/* ========================================================
                AFTER THIS ALL OTHER REQUIRED SECTIONS:
                6. Family Invitation
                7. Events Details
                8. Light a Diya
                9. RSVP
                10. Contact
                11. Closing Message
                12. Footer
            ======================================================== */}
            <div className="w-full">
              <Reveal delay={0.1}>
                <FamilyInvitation data={data} />
              </Reveal>
            </div>

            <ParallaxDivider />

            <div className="w-full">
              <Reveal delay={0.1}>
                <Events 
                  events={data.events} 
                  globalLogo={data.globalLogo} 
                  mataKiChowkiImageUrl={data.mataKiChowkiImageUrl} 
                />
              </Reveal>
            </div>

            <ParallaxDivider />

            <div className="w-full">
              <Reveal delay={0.1}>
                <LightDiya />
              </Reveal>
            </div>

            <ParallaxDivider />

            <div className="w-full">
              <Reveal delay={0.1}>
                <RSVP />
              </Reveal>
            </div>

            <ParallaxDivider />

            <div className="w-full">
              <Reveal delay={0.1}>
                <Contact data={data} />
              </Reveal>
            </div>

            <ParallaxDivider />

            <div className="w-full">
              <Reveal delay={0.1}>
                <ClosingMessage data={data} />
              </Reveal>
            </div>

            <div className="w-full">
              <Reveal delay={0.1}>
                <Footer data={data} />
              </Reveal>
            </div>
          </motion.div>
        )}
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

      {/* Full Screen Instant Flash Animation for 1 sec if user has not scrolled for 10 seconds */}
      <FullScreenScrollFlash isVisible={showScrollFlash} />
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
