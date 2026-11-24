import { useCallback, useEffect, useState, type MouseEvent } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { scrollToAnchor } from '../constants/brand';

interface HeroSlide {
  id: string;
  src: string;
  alt: string;
  objectPositionClass: string;
}

const HERO_SLIDES: HeroSlide[] = [
  {
    id: 'kaftan',
    src: '/src/assets/images/hero_garment_kaftan_1795525399193.jpg',
    alt: "Tailored warm ivory and champagne traditional men's kaftan with intricate copper-gold geometric chest embroidery on an invisible form",
    objectPositionClass: 'object-center',
  },
  {
    id: 'senator',
    src: '/src/assets/images/hero_garment_senator_1795525400688.jpg',
    alt: 'Deep burgundy-brown Nigerian senator two-piece suit with brushed copper buttons folded artfully on dark charcoal slate',
    objectPositionClass: 'object-center',
  },
  {
    id: 'buba',
    src: '/src/assets/images/hero_garment_buba_1795525401304.jpg',
    alt: "Tailored deep charcoal-brown traditional men's Buba with woven burgundy and champagne geometric trim, Sokoto trousers, and fila cap on dark stone",
    objectPositionClass: 'object-[55%_center] sm:object-center',
  },
  {
    id: 'agbada',
    src: '/src/assets/images/hero_garment_agbada_1795525402519.jpg',
    alt: 'Majestic three-piece dark espresso and copper-gold hand-embroidered Nigerian Agbada displayed in full sculptural form',
    objectPositionClass: 'object-center',
  },
  {
    id: 'contemporary',
    src: '/src/assets/images/hero_garment_contemporary_1795525403623.jpg',
    alt: 'Contemporary luxury African tailored charcoal and burgundy-copper jacquard tunic coat with pleated wool trousers in a dark basalt studio',
    objectPositionClass: 'object-center',
  },
];

const SLIDE_INTERVAL_MS = 5000;

interface HeroSectionProps {
  onNavigate?: (sectionId: string) => void;
}

export function HeroSection({ onNavigate }: HeroSectionProps) {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    const updatePreference = () => setPrefersReducedMotion(mediaQuery.matches);
    updatePreference();
    mediaQuery.addEventListener('change', updatePreference);
    return () => mediaQuery.removeEventListener('change', updatePreference);
  }, []);

  useEffect(() => {
    if (isPaused) return;
    const timer = window.setInterval(() => {
      setActiveIndex((current) => (current + 1) % HERO_SLIDES.length);
    }, SLIDE_INTERVAL_MS);
    return () => window.clearInterval(timer);
  }, [isPaused, activeIndex]);

  const goToSlide = useCallback((index: number) => {
    setActiveIndex((index + HERO_SLIDES.length) % HERO_SLIDES.length);
  }, []);

  const handlePrevious = useCallback(() => {
    setActiveIndex((current) => (current - 1 + HERO_SLIDES.length) % HERO_SLIDES.length);
  }, []);

  const handleNext = useCallback(() => {
    setActiveIndex((current) => (current + 1) % HERO_SLIDES.length);
  }, []);

  const handleCtaClick = (event: MouseEvent<HTMLAnchorElement>, sectionId: string) => {
    event.preventDefault();
    onNavigate?.(sectionId);
    scrollToAnchor(sectionId);
  };

  return (
    <section
      id="home"
      aria-label="Abefe Stitches Luxury Menswear Showcase"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      className="relative w-full min-h-[620px] h-[calc(100svh-4rem)] md:h-[calc(100svh-5rem)] max-h-[900px] overflow-hidden bg-[#171412] scroll-mt-20 flex items-center justify-center"
    >
      {/* Full-Width Garment-Only Fashion Slideshow */}
      <div className="absolute inset-0 z-0 bg-[#171412]" aria-hidden="true">
        {HERO_SLIDES.map((slide, index) => {
          const isCurrent = index === activeIndex;
          return (
            <div
              key={slide.id}
              className={`absolute inset-0 transition-opacity ${
                prefersReducedMotion ? 'duration-300' : 'duration-1000 ease-in-out'
              } ${isCurrent ? 'opacity-100 z-10' : 'opacity-0 z-0'}`}
            >
              <img
                src={slide.src}
                alt={slide.alt}
                referrerPolicy="no-referrer"
                loading="eager"
                fetchPriority={index === 0 ? 'high' : 'auto'}
                decoding="async"
                className={`h-full w-full object-cover ${slide.objectPositionClass} ${
                  prefersReducedMotion
                    ? 'scale-100'
                    : isCurrent
                      ? 'scale-[1.06] transition-transform duration-[6000ms] ease-out'
                      : 'scale-100 transition-transform duration-700 ease-out'
                }`}
              />
            </div>
          );
        })}

        {/* Layered Espresso, Burgundy & Copper Editorial Overlays */}
        <div className="absolute inset-0 z-20 bg-[radial-gradient(ellipse_at_center,rgba(23,20,18,0.64)_0%,rgba(23,20,18,0.32)_55%,rgba(23,20,18,0.66)_100%)]" />
        <div className="absolute inset-0 z-20 bg-gradient-to-br from-[#702C3B]/30 via-[#25211F]/12 to-[#B87959]/20" />
        <div className="absolute inset-0 z-20 bg-gradient-to-b from-[#171412]/50 via-transparent to-[#171412]/78" />
      </div>

      {/* Centred Symmetrical Hero Content */}
      <div className="relative z-30 mx-auto w-full max-w-5xl px-5 sm:px-8 lg:px-12 pb-16 pt-8 sm:pb-14 sm:pt-6 flex flex-col items-center justify-center text-center">
        <div className="flex flex-col items-center gap-4 sm:gap-5 max-w-3xl">
          <p className="text-[11px] sm:text-xs font-medium tracking-[0.28em] uppercase text-[#E8D7CB] drop-shadow-[0_2px_10px_rgba(23,20,18,0.7)]">
            THE ART OF REFINED MENSWEAR
          </p>

          <span
            aria-hidden="true"
            className="block h-[1px] w-14 bg-gradient-to-r from-[#702C3B] via-[#B87959] to-[#E8D7CB]"
          />

          <h1 className="font-serif text-[clamp(2.05rem,4.9vw,4.35rem)] font-medium leading-[1.07] tracking-[0.025em] uppercase text-[#FAF4EC] text-balance drop-shadow-[0_4px_24px_rgba(23,20,18,0.75)]">
            DEFINED BY STYLE.
            <br />
            CRAFTED FOR DISTINCTION.
          </h1>

          <p className="font-sans text-sm sm:text-base leading-[1.75] text-[#E8D7CB]/95 max-w-[58ch] drop-shadow-[0_2px_12px_rgba(23,20,18,0.65)]">
            Welcome to Abefe Stitches — where exceptional craftsmanship meets timeless African elegance. Discover beautifully tailored kaftans, senator wears, Buba and agbada designs created for men who appreciate distinction.
          </p>

          {/* Centred Call-to-Action Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3.5 sm:gap-4 pt-3 w-full sm:w-auto">
            <a
              href="#booking"
              onClick={(e) => handleCtaClick(e, 'booking')}
              className="inline-flex items-center justify-center w-full max-w-[260px] sm:w-auto min-h-[46px] rounded-sm border border-[#B87959]/60 bg-gradient-to-r from-[#702C3B] to-[#863547] px-7 py-3 text-xs font-semibold tracking-[0.16em] uppercase text-[#FAF4EC] shadow-[0_10px_28px_-10px_rgba(112,44,59,0.75)] hover:from-[#863547] hover:to-[#B87959] hover:border-[#E8D7CB]/75 active:translate-y-px transition-[background,border-color,transform] duration-200 whitespace-nowrap shrink-0 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#E8D7CB]"
            >
              BOOK A SERVICE
            </a>

            <a
              href="#gallery"
              onClick={(e) => handleCtaClick(e, 'gallery')}
              className="inline-flex items-center justify-center w-full max-w-[260px] sm:w-auto min-h-[46px] rounded-sm border border-[#E8D7CB]/75 bg-[#171412]/35 px-7 py-3 text-xs font-semibold tracking-[0.16em] uppercase text-[#FAF4EC] backdrop-blur-xs hover:border-[#B87959] hover:bg-[#E8D7CB]/12 hover:text-[#E8D7CB] active:translate-y-px transition-[border-color,background-color,color,transform] duration-200 whitespace-nowrap shrink-0 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#E8D7CB]"
            >
              EXPLORE COLLECTION
            </a>
          </div>
        </div>
      </div>

      {/* Discreet Symmetrical Bottom Slideshow Controls */}
      <div className="absolute inset-x-0 bottom-5 sm:bottom-7 z-30">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-10 flex items-center justify-center gap-4 sm:gap-5">
          <button
            type="button"
            onClick={handlePrevious}
            aria-label="Previous look"
            className="inline-flex items-center justify-center h-9 w-9 sm:h-10 sm:w-10 rounded-sm border border-[#E8D7CB]/25 bg-[#171412]/45 text-[#FAF4EC] backdrop-blur-xs hover:border-[#B87959] hover:bg-[#702C3B]/70 hover:text-[#E8D7CB] transition-colors duration-200 cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#E8D7CB]"
          >
            <ChevronLeft className="h-4 w-4" strokeWidth={1.65} aria-hidden="true" />
          </button>

          <div
            role="group"
            aria-label="Hero slideshow pagination"
            className="flex items-center gap-2"
          >
            {HERO_SLIDES.map((slide, index) => {
              const isCurrent = index === activeIndex;
              return (
                <button
                  key={slide.id}
                  type="button"
                  onClick={() => goToSlide(index)}
                  aria-label={`View slide ${index + 1} of ${HERO_SLIDES.length}`}
                  aria-current={isCurrent ? 'true' : undefined}
                  className="group py-2 px-0.5 cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#E8D7CB] rounded-sm"
                >
                  <span
                    className={`block h-[2px] w-7 sm:w-9 rounded-full origin-center transition-[transform,opacity] duration-300 ${
                      isCurrent
                        ? 'scale-x-100 opacity-100 bg-gradient-to-r from-[#A66B72] via-[#B87959] to-[#E8D7CB]'
                        : 'scale-x-[0.55] opacity-40 bg-[#E8D7CB] group-hover:opacity-80'
                    }`}
                  />
                </button>
              );
            })}
          </div>

          <button
            type="button"
            onClick={handleNext}
            aria-label="Next look"
            className="inline-flex items-center justify-center h-9 w-9 sm:h-10 sm:w-10 rounded-sm border border-[#E8D7CB]/25 bg-[#171412]/45 text-[#FAF4EC] backdrop-blur-xs hover:border-[#B87959] hover:bg-[#702C3B]/70 hover:text-[#E8D7CB] transition-colors duration-200 cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#E8D7CB]"
          >
            <ChevronRight className="h-4 w-4" strokeWidth={1.65} aria-hidden="true" />
          </button>
        </div>
      </div>
    </section>
  );
}
