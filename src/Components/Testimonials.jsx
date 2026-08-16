import { useState, useRef, useEffect, useCallback } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "../utils/useGSAP";

gsap.registerPlugin(ScrollTrigger);

const SQRT_5000 = Math.sqrt(5000);

const TESTIMONIALS = [
  {
    id: 0,
    client: "BERNADETTE HOGAN",
    role: "Residence 04 Homeowner",
    location: "THE WHISPERING PINES • RESIDENCE 04",
    image:
      "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=400&q=85",
    rating: 5,
    quote:
      "Michael was an exceptional partner in our home search. His tireless dedication, deep market acumen, and 24/7 availability made acquiring Residence 04 an effortless, first-class experience.",
  },
  {
    id: 1,
    client: "ALEXANDER & EVELYN VANCE",
    role: "Estate Investors",
    location: "FIRST KEY ESTATE • PAVILION SUITES",
    image:
      "https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&w=400&q=85",
    rating: 5,
    quote:
      "First Key Estate transformed our perception of masterplanned living. The architectural craftsmanship, privacy, and serene natural surroundings are truly unmatched — a generational investment.",
  },
  {
    id: 2,
    client: "DR. JULIAN THORNE",
    role: "Sanctuary Resident",
    location: "BOTANICAL CANOPY • VILLA 18",
    image:
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=400&q=85",
    rating: 5,
    quote:
      "From initial masterplan consultation to final handover, the attention to detail was remarkable. Living surrounded by mature pine groves and contemporary luxury is extraordinary.",
  },
  {
    id: 3,
    client: "CATHERINE MONTGOMERY",
    role: "Estate Investor",
    location: "THE HEIRLOOM TERRACES • LOT 12",
    image:
      "https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=400&q=85",
    rating: 5,
    quote:
      "A true masterclass in residential planning. First Key Estate delivers enduring value with modern aesthetics that will stand the test of time. I could not be happier with my sanctuary home.",
  },
  {
    id: 4,
    client: "MARCUS & SOPHIA REYNOLDS",
    role: "Heritage Residence Owners",
    location: "WEST ENCLAVE • PRIVATE ESTATE",
    image:
      "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=400&q=85",
    rating: 5,
    quote:
      "The Whispering Pines embodies the perfect harmony between sustainable infrastructure and timeless luxury. The community amenities and surrounding botanical canopy exceed everything we ever envisioned.",
  },
];

/* ─────────────────────────────────────────────────────────── */
/*  Interactive Stagger Testimonial Card                       */
/* ─────────────────────────────────────────────────────────── */
function TestimonialCard({
  slot,
  testimonial,
  onCardClick,
  cardWidth,
  cardHeight,
  cardSpacing,
  isMobile,
}) {
  const isCenter = slot === 0;
  const isRight = slot === 1;
  const isLeft = slot === -1;
  const isBack = slot === 2 || slot === -2;

  // Compute 3D spatial positioning relative to section center
  let x = 0;
  let y = 0;
  let scale = 1;
  let rotation = 0;
  let zIndex = 10;
  let opacity = 1;

  if (isCenter) {
    x = 0;
    y = isMobile ? -14 : -36;
    scale = 1.02;
    rotation = 0;
    zIndex = 30;
    opacity = 1;
  } else if (isRight) {
    x = cardSpacing;
    y = isMobile ? 8 : 14;
    scale = isMobile ? 0.88 : 0.93;
    rotation = isMobile ? 2 : 3;
    zIndex = 20;
    opacity = isMobile ? 0.5 : 0.88;
  } else if (isLeft) {
    x = -cardSpacing;
    y = isMobile ? 8 : 14;
    scale = isMobile ? 0.88 : 0.93;
    rotation = isMobile ? -2 : -3;
    zIndex = 20;
    opacity = isMobile ? 0.5 : 0.88;
  } else if (slot === 2) {
    // Right background queue
    x = cardSpacing * 0.5;
    y = 24;
    scale = 0.7;
    rotation = 1;
    zIndex = 5;
    opacity = 0;
  } else {
    // Left background queue
    x = -cardSpacing * 0.5;
    y = 24;
    scale = 0.7;
    rotation = -1;
    zIndex = 5;
    opacity = 0;
  }

  return (
    <div
      onClick={() => onCardClick(slot)}
      className={`absolute left-1/2 top-1/2 font-sans select-none will-change-transform ${isCenter
          ? "cursor-default shadow-2xl"
          : isBack
            ? "pointer-events-none"
            : "cursor-pointer group hover:opacity-100"
        }`}
      style={{
        width: cardWidth,
        height: cardHeight,
        padding: isMobile
          ? "24px 20px 20px 20px"
          : cardWidth > 420
            ? "36px 38px 32px 38px"
            : "28px 26px 24px 26px",
        clipPath: `polygon(42px 0%, calc(100% - 42px) 0%, 100% 42px, 100% 100%, calc(100% - 42px) 100%, 42px 100%, 0 100%, 0 0)`,
        transform: `translate(-50%, -50%) translate3d(${x}px, ${y}px, 0) rotate(${rotation}deg) scale(${scale})`,
        transformOrigin: "center center",
        backgroundColor: isCenter ? "#131316" : "#ffffff",
        backgroundImage: isCenter
          ? "linear-gradient(145deg, rgba(201,169,110,0.15) 0%, rgba(19,19,22,0.98) 45%, #131316 100%)"
          : "none",
        color: isCenter ? "#f8f7f5" : "#17171a",
        border: isCenter
          ? "1.5px solid rgba(201, 169, 110, 0.85)"
          : "1.5px solid rgba(23, 23, 26, 0.12)",
        boxShadow: isCenter
          ? "0 25px 60px -10px rgba(0,0,0,0.5), 0 0 25px rgba(201,169,110,0.2)"
          : "0 12px 35px rgba(23,23,26,0.06)",
        opacity,
        zIndex,
        transition:
          "transform 650ms cubic-bezier(0.23, 1, 0.32, 1), opacity 650ms cubic-bezier(0.23, 1, 0.32, 1), background-color 450ms ease, box-shadow 450ms ease, border-color 450ms ease",
      }}
    >
      {/* 45-degree Chamfer Top-Right Gold Accent Line */}
      <span
        className="absolute block origin-top-right rotate-45 pointer-events-none transition-colors duration-500"
        style={{
          right: -2,
          top: 40,
          width: SQRT_5000,
          height: 2,
          backgroundColor: isCenter ? "#c9a96e" : "rgba(23, 23, 26, 0.15)",
        }}
      />

      {/* Decorative Quotation Mark Watermark on Center Card */}
      {isCenter && (
        <span className="absolute top-4 right-7 text-7xl sm:text-8xl font-serif text-[#c9a96e]/10 pointer-events-none select-none font-black leading-none">
          &rdquo;
        </span>
      )}

      {/* Card Header: Avatar, Name, Role & Star Rating */}
      <div className="flex items-center justify-between mb-3.5 relative z-10">
        <div className="flex items-center gap-3 sm:gap-4">
          {/* Avatar with luxury gold ring */}
          <div className="relative flex-shrink-0">
            <img
              src={testimonial.image}
              alt={testimonial.client}
              className="h-11 w-11 xs:h-12 xs:w-12 sm:h-14 sm:w-14 rounded-full object-cover object-top transition-transform duration-500"
              style={{
                border: isCenter
                  ? "2px solid #c9a96e"
                  : "2px solid rgba(23,23,26,0.12)",
                boxShadow: isCenter
                  ? "0 0 14px rgba(201,169,110,0.4)"
                  : "0 2px 6px rgba(0,0,0,0.06)",
              }}
            />
          </div>

          <div className="flex flex-col">
            <p
              className="font-bold uppercase tracking-[0.1em] sm:tracking-[0.12em] transition-colors duration-500 leading-tight"
              style={{
                fontSize: isMobile ? "0.78rem" : cardWidth > 420 ? "0.92rem" : "0.84rem",
                color: isCenter ? "#c9a96e" : "#17171a",
              }}
            >
              {testimonial.client}
            </p>
            <p
              className="text-[9.5px] xs:text-[10px] sm:text-[11.5px] uppercase font-medium tracking-[0.05em] mt-0.5 transition-colors duration-500"
              style={{
                color: isCenter ? "rgba(248, 247, 245, 0.7)" : "#9e7d3b",
              }}
            >
              {testimonial.role}
            </p>
          </div>
        </div>

        {/* 5-Star Rating */}
        <div className="flex flex-col items-end flex-shrink-0">
          <div
            className="flex items-center gap-0.5 text-xs sm:text-sm tracking-widest transition-colors duration-500"
            style={{ color: isCenter ? "#c9a96e" : "#9e7d3b" }}
          >
            {"★".repeat(testimonial.rating)}
          </div>
          <span
            className="text-[8px] xs:text-[8.5px] sm:text-[9.5px] font-sans tracking-[0.12em] sm:tracking-[0.14em] uppercase mt-0.5 sm:mt-1 font-semibold transition-colors duration-500"
            style={{
              color: isCenter
                ? "rgba(201, 169, 110, 0.85)"
                : "rgba(23, 23, 26, 0.38)",
            }}
          >
            VERIFIED OWNER
          </span>
        </div>
      </div>

      {/* Gold Hairline Divider */}
      <div className="relative w-full flex items-center justify-center my-2.5 sm:my-3.5">
        <div
          className="w-full h-px transition-colors duration-500"
          style={{
            background: isCenter
              ? "linear-gradient(90deg, transparent, #c9a96e, transparent)"
              : "linear-gradient(90deg, transparent, rgba(23,23,26,0.15), transparent)",
          }}
        />
      </div>

      {/* Quote Text */}
      <p
        className="font-normal tracking-tight transition-colors duration-500 relative z-10"
        style={{
          fontSize: isMobile
            ? "0.90rem"
            : cardWidth > 420
              ? "1.06rem"
              : "0.94rem",
          lineHeight: isMobile ? 1.55 : 1.65,
          color: isCenter ? "rgba(248, 247, 245, 0.95)" : "rgba(23, 23, 26, 0.85)",
          display: "-webkit-box",
          WebkitLineClamp: isMobile ? 5 : 5,
          WebkitBoxOrient: "vertical",
          overflow: "hidden",
        }}
      >
        &ldquo;{testimonial.quote}&rdquo;
      </p>

      {/* Footer Location Tag */}
      <div
        className="absolute left-0 right-0 flex items-center justify-between"
        style={{
          bottom: isMobile ? 18 : 22,
          paddingLeft: isMobile ? 22 : 36,
          paddingRight: isMobile ? 22 : 36,
        }}
      >
        <span
          className="text-[9px] xs:text-[9.5px] sm:text-[11px] font-sans tracking-[0.14em] uppercase font-medium truncate max-w-[70%]"
          style={{
            color: isCenter ? "#c9a96e" : "#9e7d3b",
          }}
        >
          {testimonial.location}
        </span>

        <span
          className="text-[10.5px] sm:text-sm font-serif italic flex-shrink-0"
          style={{
            color: isCenter ? "rgba(201, 169, 110, 0.45)" : "rgba(23, 23, 26, 0.25)",
          }}
        >
          First Key Estate
        </span>
      </div>
    </div>
  );
}

/* ─────────────────────────────────────────────────────────── */
/*  Main Testimonials Section                                  */
/* ─────────────────────────────────────────────────────────── */
export default function Testimonials() {
  const [dimensions, setDimensions] = useState({
    cardWidth: 490,
    cardHeight: 410,
    cardSpacing: 440,
    isMobile: false,
  });
  const [activeIndex, setActiveIndex] = useState(0);
  const [autoPlay, setAutoPlay] = useState(true);

  const sectionRef = useRef(null);
  const headerRef = useRef(null);
  const eyebrowLeftBarRef = useRef(null);
  const eyebrowRightBarRef = useRef(null);
  const eyebrowTextRef = useRef(null);
  const titleLine1Ref = useRef(null);
  const titleLine2Ref = useRef(null);
  const subtitleRef = useRef(null);

  const carouselContainerRef = useRef(null);
  const bgAuraRef = useRef(null);

  /* ── Responsive Calculations: Optimized for Full Screen & Mobile ── */
  useEffect(() => {
    const handleResize = () => {
      const w = window.innerWidth;
      const isMob = w < 640;

      if (w < 400) {
        setDimensions({
          cardWidth: Math.min(w - 32, 340),
          cardHeight: 360,
          cardSpacing: Math.min(w * 0.85, 300),
          isMobile: true,
        });
      } else if (w < 640) {
        setDimensions({
          cardWidth: Math.min(w - 40, 360),
          cardHeight: 370,
          cardSpacing: Math.min(w * 0.85, 320),
          isMobile: true,
        });
      } else if (w < 768) {
        setDimensions({
          cardWidth: 380,
          cardHeight: 375,
          cardSpacing: 340,
          isMobile: false,
        });
      } else if (w < 1024) {
        setDimensions({
          cardWidth: 420,
          cardHeight: 385,
          cardSpacing: 370,
          isMobile: false,
        });
      } else if (w < 1440) {
        setDimensions({
          cardWidth: 460,
          cardHeight: 400,
          cardSpacing: 410,
          isMobile: false,
        });
      } else {
        setDimensions({
          cardWidth: 500,
          cardHeight: 415,
          cardSpacing: 450,
          isMobile: false,
        });
      }
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  /* ── Step Handlers ── */
  const handleNext = useCallback(() => {
    setActiveIndex((prev) => (prev + 1) % TESTIMONIALS.length);
  }, []);

  const handlePrev = useCallback(() => {
    setActiveIndex(
      (prev) => (prev - 1 + TESTIMONIALS.length) % TESTIMONIALS.length
    );
  }, []);

  const handleCardClick = useCallback((slot) => {
    if (slot === 1) {
      setActiveIndex((prev) => (prev + 1) % TESTIMONIALS.length);
    } else if (slot === -1) {
      setActiveIndex(
        (prev) => (prev - 1 + TESTIMONIALS.length) % TESTIMONIALS.length
      );
    }
  }, []);

  /* ── Auto-Play: Smooth Rotate Every 3 Seconds (3000ms) ── */
  useEffect(() => {
    if (!autoPlay) return;
    const timer = setInterval(() => {
      handleNext();
    }, 3000);

    return () => clearInterval(timer);
  }, [autoPlay, handleNext]);

  /* ── GSAP ScrollTrigger Entrance & Parallax Scrub ── */
  useGSAP(
    () => {
      const section = sectionRef.current;
      if (!section) return;

      // ── 1. Entrance Reveal Timeline on Scroll-In ──
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start: "top 78%",
          toggleActions: "play none none none",
        },
      });

      // Eyebrow expanding bars & tracking
      tl.fromTo(
        [eyebrowLeftBarRef.current, eyebrowRightBarRef.current],
        { scaleX: 0, opacity: 0 },
        { scaleX: 1, opacity: 1, duration: 1.1, ease: "power3.out" }
      );

      tl.fromTo(
        eyebrowTextRef.current,
        { y: 25, opacity: 0, letterSpacing: "0.2em" },
        { y: 0, opacity: 1, letterSpacing: "0.36em", duration: 1.1, ease: "power3.out" },
        "-=0.9"
      );

      // Title Line 1 ("Don't Take")
      tl.fromTo(
        titleLine1Ref.current,
        { y: 65, opacity: 0, scale: 0.94 },
        { y: 0, opacity: 1, scale: 1, duration: 1.2, ease: "power3.out" },
        "-=0.8"
      );

      // Title Line 2 ("Our Word for It.")
      tl.fromTo(
        titleLine2Ref.current,
        { y: 75, opacity: 0, scale: 0.94 },
        { y: 0, opacity: 1, scale: 1, duration: 1.25, ease: "power3.out" },
        "-=0.95"
      );

      // Carousel deck reveal
      tl.fromTo(
        carouselContainerRef.current,
        { y: 70, opacity: 0, scale: 0.96 },
        { y: 0, opacity: 1, scale: 1, duration: 1.2, ease: "power3.out" },
        "-=0.7"
      );

      // ── 2. Multi-Layer Parallax Scrub Dynamics ──
      // Multi-layer heading parallax float
      gsap.to(titleLine1Ref.current, {
        yPercent: -18,
        ease: "none",
        scrollTrigger: {
          trigger: section,
          start: "top bottom",
          end: "bottom top",
          scrub: 1.1,
        },
      });

      gsap.to(titleLine2Ref.current, {
        yPercent: -10,
        ease: "none",
        scrollTrigger: {
          trigger: section,
          start: "top bottom",
          end: "bottom top",
          scrub: 1.3,
        },
      });

      // Parallax background glow float
      if (bgAuraRef.current) {
        gsap.to(bgAuraRef.current, {
          yPercent: -30,
          scale: 1.12,
          ease: "none",
          scrollTrigger: {
            trigger: section,
            start: "top bottom",
            end: "bottom top",
            scrub: 1.3,
          },
        });
      }

      // Parallax 3D deck tilt and inertia on scroll
      if (carouselContainerRef.current) {
        gsap.to(carouselContainerRef.current, {
          yPercent: -6,
          ease: "none",
          scrollTrigger: {
            trigger: section,
            start: "top bottom",
            end: "bottom top",
            scrub: 1.1,
          },
        });
      }
    },
    { scope: sectionRef }
  );

  /* ── Touch Gesture Engine for Mobile ── */
  const touchStartXRef = useRef(0);
  const handleTouchStart = (e) => {
    setAutoPlay(false);
    touchStartXRef.current = e.touches[0].clientX;
  };
  const handleTouchEnd = (e) => {
    const touchEndX = e.changedTouches[0].clientX;
    const diff = touchStartXRef.current - touchEndX;
    if (Math.abs(diff) > 35) {
      if (diff > 0) handleNext();
      else handlePrev();
    }
    // Resume auto-play after swipe
    setTimeout(() => setAutoPlay(true), 4000);
  };

  /* ── Slot Computation for 5 Cards ── */
  const getSlot = (itemIndex) => {
    const diff = (itemIndex - activeIndex + TESTIMONIALS.length) % TESTIMONIALS.length;
    if (diff === 0) return 0;   // Center
    if (diff === 1) return 1;   // Right Flank
    if (diff === 4) return -1;  // Left Flank
    if (diff === 2) return 2;   // Right Back Queue (Hidden)
    return -2;                  // Left Back Queue (Hidden)
  };

  const containerHeight =
    dimensions.cardHeight + (dimensions.isMobile ? 50 : 80);

  return (
    <section
      ref={sectionRef}
      id="testimonials"
      className="relative w-full max-w-full min-h-screen min-h-[100dvh] flex flex-col justify-center items-center bg-[#f8f7f5] text-[#17171a] pt-8 pb-14 xs:pt-10 xs:pb-16 sm:py-24 lg:py-28 px-4 xs:px-6 sm:px-8 lg:px-12 select-none overflow-hidden font-sans"
      onMouseEnter={() => setAutoPlay(false)}
      onMouseLeave={() => setAutoPlay(true)}
    >
      {/* ── Centered Parallax Ambient Gold Glow ── */}
      <div
        ref={bgAuraRef}
        className="absolute pointer-events-none will-change-transform"
        style={{
          width: "clamp(500px, 65vw, 1100px)",
          height: "clamp(500px, 65vw, 1100px)",
          borderRadius: "50%",
          background:
            "radial-gradient(circle, rgba(201,169,110,0.08) 0%, transparent 65%)",
          top: "10%",
          left: "50%",
          transform: "translateX(-50%)",
        }}
      />

      <div className="w-full max-w-[1520px] mx-auto flex flex-col items-center justify-center my-auto">
        {/* ── Section Header with Multi-Plane Parallax Reveal ── */}
        <div
          ref={headerRef}
          className="flex flex-col items-center justify-center text-center w-full max-w-4xl mx-auto -mt-6 xs:-mt-4 sm:mt-0 pb-2 xs:pb-4 sm:pb-10 lg:pb-14 will-change-transform px-2 sm:px-4"
        >
          {/* Eyebrow */}
          <div className="flex items-center justify-center space-x-2.5 xs:space-x-4 mb-2 sm:mb-4">
            <span
              ref={eyebrowLeftBarRef}
              className="w-5 xs:w-8 sm:w-16 h-[2px] bg-[#9e7d3b] inline-block origin-right will-change-transform"
            />
            <span
              ref={eyebrowTextRef}
              className="text-[9px] xs:text-[10px] sm:text-xs font-sans tracking-[0.22em] xs:tracking-[0.32em] text-[#9e7d3b] uppercase font-bold whitespace-nowrap will-change-transform"
            >
              ESTATE RESIDENTS &amp; INVESTORS
            </span>
            <span
              ref={eyebrowRightBarRef}
              className="w-5 xs:w-8 sm:w-16 h-[2px] bg-[#9e7d3b] inline-block origin-left will-change-transform"
            />
          </div>

          {/* Grand Heading: 2 Distinct Architectural Typography Layers */}
          <h2 className="text-3xl xs:text-4xl sm:text-5xl lg:text-[4.2rem] xl:text-[4.8rem] leading-[1.08] sm:leading-[1.04] tracking-tight text-[#17171a] text-center">
            <span
              ref={titleLine1Ref}
              className="block font-black uppercase text-[#17171a] will-change-transform tracking-tight"
            >
              Don&apos;t Take
            </span>
            <span
              ref={titleLine2Ref}
              className="block font-light font-serif italic text-[#17171a]/75 sm:text-[#17171a]/70 will-change-transform mt-0.5 sm:mt-1 tracking-normal"
            >
              Our Word for It.
            </span>
          </h2>
          <br className="hidden sm:block" /><br className="hidden sm:block" /><br /><br />
        </div>

        {/* ── Symmetrical 5-Card Stagger Deck ── */}
        <div
          ref={carouselContainerRef}
          className="relative w-full max-w-full mx-auto flex items-center justify-center overflow-hidden will-change-transform"
          style={{ height: containerHeight, perspective: "1200px" }}
          onTouchStart={handleTouchStart}
          onTouchEnd={handleTouchEnd}
        >
          {TESTIMONIALS.map((testimonial, index) => {
            const slot = getSlot(index);
            return (
              <TestimonialCard
                key={testimonial.id}
                slot={slot}
                testimonial={testimonial}
                onCardClick={handleCardClick}
                cardWidth={dimensions.cardWidth}
                cardHeight={dimensions.cardHeight}
                cardSpacing={dimensions.cardSpacing}
                isMobile={dimensions.isMobile}
              />
            );
          })}
        </div>
      </div>
    </section>
  );
}