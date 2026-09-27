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
import { FloatingScrollIndicator } from './components/FloatingScrollIndicator';

const SECTION_IDS = [
  'scratch-card-section',
  'section-hero',
  'section-venue',
  'section-devi',
  'section-message',
  'section-family',
  'section-events',
  'section-diya',
  'section-rsvp',
  'section-contact',
  'section-closing',
  'section-footer',
];

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

  // Self-scrolling system state & refs
  const isAutoScrollingRef = React.useRef(false);
  const autoScrollTimerRef = React.useRef<NodeJS.Timeout | null>(null);
  const isSelfScrollingActiveRef = React.useRef(false);
  const hasUserManuallyScrolledRef = React.useRef(false);

  // Stop self-scrolling immediately
  const stopSelfScrolling = React.useCallback(() => {
    if (autoScrollTimerRef.current) {
      clearTimeout(autoScrollTimerRef.current);
      autoScrollTimerRef.current = null;
    }
    isSelfScrollingActiveRef.current = false;
  }, []);

  const visibility = data?.sectionVisibility || {};
  const isScratchCardActive = visibility.scratchCard !== false;
  const isContentRevealed = !isScratchCardActive || isInvitationRevealed;

  // Dynamically compute active section IDs based on admin visibility toggles
  const activeSectionIds = React.useMemo(() => {
    return [
      visibility.scratchCard !== false ? 'scratch-card-section' : null,
      visibility.hero !== false ? 'section-hero' : null,
      visibility.venue !== false ? 'section-venue' : null,
      visibility.deviShrine !== false ? 'section-devi' : null,
      visibility.invitationMessage !== false ? 'section-message' : null,
      visibility.familyInvitation !== false ? 'section-family' : null,
      visibility.events !== false ? 'section-events' : null,
      visibility.lightDiya !== false ? 'section-diya' : null,
      visibility.rsvp !== false ? 'section-rsvp' : null,
      visibility.contact !== false ? 'section-contact' : null,
      visibility.closingMessage !== false ? 'section-closing' : null,
      visibility.footer !== false ? 'section-footer' : null,
    ].filter(Boolean) as string[];
  }, [visibility]);

  // Smoothly scroll down to the next visible section in the list
  const scrollToNextSection = React.useCallback(() => {
    const currentScroll = window.scrollY;
    let nextTargetId: string | null = null;

    for (let i = 0; i < activeSectionIds.length; i++) {
      const el = document.getElementById(activeSectionIds[i]);
      if (el) {
        const top = el.getBoundingClientRect().top + window.scrollY;
        // Find the first visible section that begins distinctly below the current viewport top (margin of 75px)
        if (top > currentScroll + 75) {
          nextTargetId = activeSectionIds[i];
          break;
        }
      }
    }

    if (nextTargetId) {
      const targetEl = document.getElementById(nextTargetId);
      if (targetEl) {
        isAutoScrollingRef.current = true;
        targetEl.scrollIntoView({ behavior: 'smooth', block: 'start' });
        
        setTimeout(() => {
          isAutoScrollingRef.current = false;
        }, 1100);

        const isLast = nextTargetId === activeSectionIds[activeSectionIds.length - 1];
        return !isLast;
      }
    }
    return false;
  }, [activeSectionIds]);

  // Start self-scrolling section wise every 3-4 seconds
  const startSelfScrolling = React.useCallback(() => {
    stopSelfScrolling();
    if (hasUserManuallyScrolledRef.current) return;

    isSelfScrollingActiveRef.current = true;

    // After scratching, give 1.4s for celebration chime, confetti & viewing the countdown,
    // then smoothly scroll full section after every 3.5 seconds (within 3-4s range)
    const scheduleNext = (delayMs: number) => {
      autoScrollTimerRef.current = setTimeout(() => {
        if (!isSelfScrollingActiveRef.current || hasUserManuallyScrolledRef.current) {
          stopSelfScrolling();
          return;
        }

        const hasMore = scrollToNextSection();
        if (hasMore && isSelfScrollingActiveRef.current && !hasUserManuallyScrolledRef.current) {
          scheduleNext(3500); // Full section scroll after every 3.5 seconds
        } else {
          stopSelfScrolling();
        }
      }, delayMs);
    };

    scheduleNext(1400);
  }, [scrollToNextSection, stopSelfScrolling]);

  // Cancel self-scrolling as soon as user manually starts scrolling or touches screen
  useEffect(() => {
    const handleManualInterruption = () => {
      if (isSelfScrollingActiveRef.current) {
        hasUserManuallyScrolledRef.current = true;
        stopSelfScrolling();
      }
    };

    const handleWindowScroll = () => {
      if (!isAutoScrollingRef.current && isSelfScrollingActiveRef.current) {
        hasUserManuallyScrolledRef.current = true;
        stopSelfScrolling();
      }
    };

    window.addEventListener('wheel', handleManualInterruption, { passive: true });
    window.addEventListener('touchstart', handleManualInterruption, { passive: true });
    window.addEventListener('touchmove', handleManualInterruption, { passive: true });
    window.addEventListener('pointerdown', handleManualInterruption, { passive: true });
    window.addEventListener('keydown', (e) => {
      if (['ArrowDown', 'ArrowUp', 'PageDown', 'PageUp', 'Space', 'Home', 'End'].includes(e.code)) {
        handleManualInterruption();
      }
    });
    window.addEventListener('scroll', handleWindowScroll, { passive: true });

    return () => {
      window.removeEventListener('wheel', handleManualInterruption);
      window.removeEventListener('touchstart', handleManualInterruption);
      window.removeEventListener('touchmove', handleManualInterruption);
      window.removeEventListener('pointerdown', handleManualInterruption);
      window.removeEventListener('keydown', handleManualInterruption as any);
      window.removeEventListener('scroll', handleWindowScroll);
      stopSelfScrolling();
    };
  }, [stopSelfScrolling]);

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
    hasUserManuallyScrolledRef.current = false;
    try {
      sessionStorage.setItem('invitation_card_scratched', 'true');
    } catch {}

    // Automatically starts scrolling itself section wise until someone manually start scrolling!
    startSelfScrolling();
  };

  const handleScrollDownClick = () => {
    setShowScrollFlash(false);
    scrollToNextSection();
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
        {visibility.scratchCard !== false && (
          <Countdown 
            targetDate={data.weddingDate} 
            dateFormatted={data.weddingDateFormatted}
            dayFormatted={data.weddingDayFormatted}
            timeFormatted={data.weddingTimeFormatted}
            venueName={data.venue?.name}
            onScratched={handleCardScratched}
            isInitiallyScratched={isInvitationRevealed}
          />
        )}

        {/* Once card is scratched (and if card is active), show prominent scroll prompt with floating marigold petals */}
        {isContentRevealed && isScratchCardActive && (
          <ScrollPrompt onClick={handleScrollDownClick} />
        )}

        {/* ========================================================
            REVEALED SECTIONS
            Becomes visible and accessible once the card is scratched (or immediately if card is hidden)!
        ======================================================== */}
        {isContentRevealed && (
          <motion.div
            initial={{ opacity: 0, y: 25 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.65, ease: "easeOut" }}
            className="w-full flex flex-col items-center"
          >
            {/* ========================================================
                2. HERO SECTION
            ======================================================== */}
            {visibility.hero !== false && (
              <>
                <ParallaxDivider />
                <div id="section-hero" className="w-full">
                  <Hero 
                    data={data} 
                    shouldPlayVideo={viewState === 'main'} 
                    onVideoEnd={handleHeroVideoEnd}
                  />
                </div>
              </>
            )}

            {/* ========================================================
                3. VENUE SECTION
            ======================================================== */}
            {visibility.venue !== false && (
              <>
                <ParallaxDivider />
                <div id="section-venue" className="w-full">
                  <Reveal delay={0.1}>
                    <Venue 
                      venue={data.venue} 
                      groom={data.groom} 
                      bride={data.bride} 
                      weddingDate={data.weddingDate} 
                    />
                  </Reveal>
                </div>
              </>
            )}

            {/* ========================================================
                4. KAROLI WALI MATA WITH IMAGE SECTION
            ======================================================== */}
            {visibility.deviShrine !== false && (
              <>
                <ParallaxDivider />
                <div id="section-devi" className="w-full">
                  <Reveal delay={0.1}>
                    <DeviShrine data={data} />
                  </Reveal>
                </div>
              </>
            )}

            {/* ========================================================
                5. जय माता दी MESSAGE SECTION
            ======================================================== */}
            {visibility.invitationMessage !== false && (
              <>
                <ParallaxDivider />
                <div id="section-message" className="w-full">
                  <Reveal delay={0.1}>
                    <InvitationMessage 
                      message={data.invitationMessage} 
                      isHeroEnded={isHeroEnded} 
                    />
                  </Reveal>
                </div>
              </>
            )}

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
            {visibility.familyInvitation !== false && (
              <>
                <ParallaxDivider />
                <div id="section-family" className="w-full">
                  <Reveal delay={0.1}>
                    <FamilyInvitation data={data} />
                  </Reveal>
                </div>
              </>
            )}

            {visibility.events !== false && (
              <>
                <ParallaxDivider />
                <div id="section-events" className="w-full">
                  <Reveal delay={0.1}>
                    <Events 
                      events={data.events} 
                      globalLogo={data.globalLogo} 
                      mataKiChowkiImageUrl={data.mataKiChowkiImageUrl} 
                    />
                  </Reveal>
                </div>
              </>
            )}

            {visibility.lightDiya !== false && (
              <>
                <ParallaxDivider />
                <div id="section-diya" className="w-full">
                  <Reveal delay={0.1}>
                    <LightDiya />
                  </Reveal>
                </div>
              </>
            )}

            {visibility.rsvp !== false && (
              <>
                <ParallaxDivider />
                <div id="section-rsvp" className="w-full">
                  <Reveal delay={0.1}>
                    <RSVP />
                  </Reveal>
                </div>
              </>
            )}

            {visibility.contact !== false && (
              <>
                <ParallaxDivider />
                <div id="section-contact" className="w-full">
                  <Reveal delay={0.1}>
                    <Contact data={data} />
                  </Reveal>
                </div>
              </>
            )}

            {visibility.closingMessage !== false && (
              <>
                <ParallaxDivider />
                <div id="section-closing" className="w-full">
                  <Reveal delay={0.1}>
                    <ClosingMessage data={data} />
                  </Reveal>
                </div>
              </>
            )}

            {visibility.footer !== false && (
              <div id="section-footer" className="w-full">
                <Reveal delay={0.1}>
                  <Footer data={data} />
                </Reveal>
              </div>
            )}
          </motion.div>
        )}
      </main>

      {/* Floating Scroll Down Indicator with animated bigger down arrow */}
      <FloatingScrollIndicator 
        onScrollNext={scrollToNextSection} 
        visible={viewState === 'main' && isContentRevealed} 
      />

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
