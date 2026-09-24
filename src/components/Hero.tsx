import { WeddingData } from "../types";

interface HeroProps {
  data: WeddingData;
  shouldPlayVideo?: boolean;
  onVideoEnd?: () => void;
}

export function Hero({ data, onVideoEnd }: HeroProps) {
  // High quality default image if none uploaded yet
  const heroImage = data.heroImageUrl || "https://images.unsplash.com/photo-1544816155-12df9643f363?q=80&w=2560&auto=format&fit=crop";

  return (
    <section className="relative w-full h-[100svh] min-h-[100svh] overflow-hidden bg-[#FDF0F4] flex items-center justify-center">
      {data.heroVideoUrl ? (
        <video
          src={data.heroVideoUrl}
          autoPlay
          muted
          loop
          playsInline
          onEnded={onVideoEnd}
          className="w-full h-full object-cover object-center"
        />
      ) : (
        <img
          src={heroImage}
          alt="Hero"
          className="w-full h-full object-cover object-center select-none"
          loading="eager"
          decoding="async"
        />
      )}
    </section>
  );
}
