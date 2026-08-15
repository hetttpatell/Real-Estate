import { useState, useRef, useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "../utils/useGSAP";

gsap.registerPlugin(ScrollTrigger);

const TESTIMONIALS = [
  {
    id: 1,
    client: "BERNADETTE HOGAN",
    role: "RESIDENCE 04 HOMEOWNER",
    image:
      "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=1600&q=85",
    rating: 5,
    location: "THE WHISPERING PINES • RESIDENCE 04",
    quote:
      "Michael was a great realtor. Such a hard worker, dedicated to helping us find the perfect neighborhood, price point and home. He's a workaholic so he was available morning, noon and night. Tireless and dedicated. Would recommend him 100%!",
  },
  {
    id: 2,
    client: "ALEXANDER & EVELYN VANCE",
    role: "ESTATE INVESTORS",
    image:
      "https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&w=1600&q=85",
    rating: 5,
    location: "FIRST KEY ESTATE • PAVILION SUITES",
    quote:
      "First Key Estate transformed our entire perception of masterplanned living. The architectural craftsmanship, privacy, and serene natural surroundings at The Whispering Pines are truly unmatched. A generational investment for our family.",
  },
  {
    id: 3,
    client: "DR. JULIAN THORNE",
    role: "SANCTUARY RESIDENT",
    image:
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=1600&q=85",
    rating: 5,
    location: "BOTANICAL CANOPY • VILLA 18",
    quote:
      "From the initial masterplan consultation to the final handover of our residence, the attention to detail and transparency was remarkable. Living surrounded by mature pine groves and contemporary luxury is extraordinary.",
  },
  {
    id: 4,
    client: "MARCUS & SOPHIA REYNOLDS",
    role: "HERITAGE RESIDENCE OWNERS",
    image:
      "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=1600&q=85",
    rating: 5,
    location: "WEST ENCLAVE • PRIVATE ESTATE",
    quote:
      "The Whispering Pines embodies the perfect harmony between sustainable infrastructure and timeless luxury. The community amenities and surrounding botanical canopy exceed everything we ever envisioned.",
  },
  {
    id: 5,
    client: "CATHERINE MONTGOMERY",
    role: "ESTATE INVESTOR",
    image:
      "https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=1600&q=85",
    rating: 5,
    location: "THE HEIRLOOM TERRACES • LOT 12",
    quote:
      "A true masterclass in residential planning. First Key Estate delivers enduring value with modern aesthetics that will stand the test of time. I could not be happier with my new sanctuary home.",
  },
];

export default function Testimonials() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isFading, setIsFading] = useState(false);
  const [autoPlayActive, setAutoPlayActive] = useState(true);
  const [touchStart, setTouchStart] = useState(0);
  const [touchEnd, setTouchEnd] = useState(0);

  const sectionRef = useRef(null);
  const headerRef = useRef(null);
  const photoCardRef = useRef(null);
  const quoteCardRef = useRef(null);
  const quoteTextRef = useRef(null);
  const photoImgRef = useRef(null);
  const mobileCardRef = useRef(null);
  const mobileImageRef = useRef(null);
  const mobileContentRef = useRef(null);
  const mobileAuthorRef = useRef(null);
  const mobileNavRef = useRef(null);
  const autoPlayTimerRef = useRef(null);

  const activeTestimonial = TESTIMONIALS[currentIndex];

  // Auto-play functionality
  useEffect(() => {
    if (!autoPlayActive || isFading) return;

    autoPlayTimerRef.current = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % TESTIMONIALS.length);
    }, 6000);

    return () => {
      if (autoPlayTimerRef.current) clearInterval(autoPlayTimerRef.current);
    };
  }, [autoPlayActive, isFading]);

  const pauseAutoPlay = () => {
    setAutoPlayActive(false);
    if (autoPlayTimerRef.current) clearInterval(autoPlayTimerRef.current);
  };

  const resumeAutoPlay = () => {
    setAutoPlayActive(true);
  };

  // ScrollTrigger Initial Rise-Up Animations
  useGSAP(
    () => {
      const section = sectionRef.current;
      if (!section) return;

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start: "top 78%",
          toggleActions: "play none none none",
        },
      });

      // 1. Centered Header Reveal
      tl.fromTo(
        headerRef.current,
        { y: 70, opacity: 0 },
        { y: 0, opacity: 1, duration: 1.1, ease: "power3.out" }
      );

      // 2. Photos & Quote Cards Symmetrical Rise Up (Desktop)
      tl.fromTo(
        photoCardRef.current,
        { y: 90, opacity: 0, scale: 0.96 },
        { y: 0, opacity: 1, scale: 1, duration: 1.2, ease: "power3.out" },
        "-=0.7"
      );

      tl.fromTo(
        quoteCardRef.current,
        { y: 90, opacity: 0 },
        { y: 0, opacity: 1, duration: 1.2, ease: "power3.out" },
        "-=0.9"
      );

      // 3. Mobile Card Reveal with Stagger
      if (mobileCardRef.current) {
        tl.fromTo(
          mobileCardRef.current,
          { y: 90, opacity: 0, scale: 0.96 },
          { y: 0, opacity: 1, scale: 1, duration: 1.2, ease: "power3.out" },
          "-=0.7"
        );
      }
    },
    { scope: sectionRef }
  );

  // Premium transition animation
  const animateTransition = (index) => {
    // Desktop animation
    gsap.to([quoteTextRef.current, photoImgRef.current], {
      y: -15,
      opacity: 0,
      duration: 0.3,
      ease: "power2.inOut",
      onComplete: () => {
        setCurrentIndex(index);
        setIsFading(false);

        gsap.fromTo(
          [quoteTextRef.current, photoImgRef.current],
          { y: 35, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.6, ease: "power3.out", stagger: 0.1 }
        );
      },
    });

    // Mobile animation with stagger
    if (mobileImageRef.current && mobileContentRef.current) {
      gsap.to([mobileImageRef.current, mobileContentRef.current], {
        y: -12,
        opacity: 0,
        duration: 0.3,
        ease: "power2.inOut",
        onComplete: () => {
          gsap.fromTo(
            [mobileImageRef.current, mobileContentRef.current],
            { y: 25, opacity: 0 },
            { y: 0, opacity: 1, duration: 0.65, ease: "power3.out", stagger: 0.12 }
          );

          // Stagger author and nav
          if (mobileAuthorRef.current) {
            gsap.fromTo(
              mobileAuthorRef.current,
              { y: 15, opacity: 0 },
              { y: 0, opacity: 1, duration: 0.5, ease: "power3.out", delay: 0.15 }
            );
          }
          if (mobileNavRef.current) {
            gsap.fromTo(
              mobileNavRef.current,
              { y: 15, opacity: 0 },
              { y: 0, opacity: 1, duration: 0.5, ease: "power3.out", delay: 0.25 }
            );
          }
        },
      });
    }
  };

  const handleSelect = (index) => {
    if (index === currentIndex || isFading) return;
    setIsFading(true);
    pauseAutoPlay();
    animateTransition(index);
  };

  const handlePrev = () => {
    const nextIdx = (currentIndex - 1 + TESTIMONIALS.length) % TESTIMONIALS.length;
    handleSelect(nextIdx);
  };

  const handleNext = () => {
    const nextIdx = (currentIndex + 1) % TESTIMONIALS.length;
    handleSelect(nextIdx);
  };

  // Swipe gesture handlers
  const handleTouchStart = (e) => {
    setTouchStart(e.targetTouches[0].clientX);
    pauseAutoPlay();
  };

  const handleTouchMove = (e) => {
    setTouchEnd(e.targetTouches[0].clientX);
  };

  const handleTouchEnd = () => {
    if (!touchStart || !touchEnd) return;
    const distance = touchStart - touchEnd;
    const isLeftSwipe = distance > 50;
    const isRightSwipe = distance < -50;

    if (isLeftSwipe) handleNext();
    if (isRightSwipe) handlePrev();

    setTimeout(resumeAutoPlay, 5000);
  };

  return (
    <section
      ref={sectionRef}
      id="testimonials"
      className="relative w-full min-h-screen min-h-[100dvh] flex flex-col justify-center bg-[#f8f7f5] text-[#17171a] py-12 xs:py-16 sm:py-24 lg:py-32 px-4 xs:px-6 sm:px-12 lg:px-20 xl:px-28 2xl:px-36 select-none overflow-hidden font-sans"
    >
      <div className="w-full max-w-[1720px] mx-auto flex flex-col items-center my-auto">

        {/* ── Heading Centered in the Middle of the Page with Guaranteed Ample Gap Below ── */}
        <div
          ref={headerRef}
          className="flex flex-col items-center justify-center text-center mx-auto pb-6 xs:pb-10 sm:pb-16 lg:pb-24 will-change-transform max-w-4xl px-2"
        >
          {/* Eyebrow with Flanking Gold Accent Lines */}
          <div className="flex items-center justify-center space-x-2.5 xs:space-x-4 mb-2.5 xs:mb-4 sm:mb-6">
            <span className="w-5 xs:w-10 sm:w-16 h-[2px] bg-[#9e7d3b]" />
            <span className="text-[9px] xs:text-[11px] sm:text-xs font-sans tracking-[0.22em] xs:tracking-[0.35em] text-[#9e7d3b] uppercase font-bold whitespace-nowrap">
              ESTATE RESIDENTS &amp; INVESTORS
            </span>
            <span className="w-5 xs:w-10 sm:w-16 h-[2px] bg-[#9e7d3b]" />
          </div>

          {/* Grand Centered Heading in Fira Sans */}
          <h2 className="text-2xl xs:text-3xl sm:text-5xl lg:text-[4.6rem] xl:text-[5.4rem] font-bold tracking-tight leading-[1.12] sm:leading-[1.06] text-[#17171a]">
            <span>Don&apos;t Take</span>{" "}
            <span className="text-[#17171a]/30 font-light ml-1 xs:ml-2 sm:ml-3">
              Our Word for It.
            </span>
          </h2>
        </div>

        {/* ── MOBILE VIEW: Premium Carousel (Hidden on lg+) ── */}
        <div
          className="w-full max-w-lg lg:hidden flex flex-col gap-8"
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
        >
          {/* Premium Testimonial Card */}
          <div
            ref={mobileCardRef}
            className="w-full rounded-2xl overflow-hidden shadow-[0_20px_60px_rgba(23,23,26,0.15)] border border-[#17171a]/8 bg-white will-change-transform group"
          >
            {/* Image Container with Premium Overlay */}
            <div className="w-full h-[300px] sm:h-[380px] relative overflow-hidden bg-gradient-to-br from-[#e5e3dc] to-[#d9d5cc]">
              <img
                ref={mobileImageRef}
                src={activeTestimonial.image}
                alt={activeTestimonial.client}
                className="w-full h-full object-cover object-center filter brightness-[0.96] group-hover:brightness-[0.92] will-change-transform transition-all duration-500"
              />

              {/* Luxury Gradient Overlays */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent pointer-events-none" />
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-transparent to-black/30 pointer-events-none" />

              {/* Top Accent Line */}
              <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-[#c9a96e] via-[#d4b896] to-transparent" />

              {/* Location Tag - Premium Style */}
              <div className="absolute bottom-4 left-4 z-10">
                <div className="flex items-center space-x-2">
                  <span className="w-2 h-2 rounded-full bg-[#c9a96e]" />
                  <span className="text-[9px] xs:text-[10px] font-sans tracking-[0.15em] text-[#e5e3dc] uppercase bg-black/40 backdrop-blur-md px-3 py-1.5 rounded-full border border-[#c9a96e]/40 shadow-xl font-medium">
                    {activeTestimonial.location}
                  </span>
                </div>
              </div>

              {/* Auto-play Indicator Dot */}
              <div className="absolute top-4 right-4 z-10">
                <div className="relative w-2 h-2">
                  <div className={`absolute inset-0 bg-[#c9a96e] rounded-full ${autoPlayActive ? 'animate-pulse' : ''}`} />
                </div>
              </div>
            </div>

            {/* Content Section with Premium Spacing */}
            <div
              ref={mobileContentRef}
              className="px-6 pt-8 pb-6 xs:px-7 xs:pt-10 xs:pb-7 sm:px-8 sm:pt-12 sm:pb-8 flex flex-col gap-7 will-change-transform"
            >
              {/* Quotation Mark & Quote */}
              <div className="flex flex-col gap-5">
                <div className="text-4xl xs:text-5xl font-sans text-[#c9a96e] leading-none opacity-60 font-black">
                  &rdquo;
                </div>
                <p className="text-lg xs:text-xl sm:text-2xl font-sans font-normal leading-[1.55] text-[#17171a] tracking-tight">
                  &ldquo;{activeTestimonial.quote}&rdquo;
                </p>
              </div>

              {/* Elegant Divider */}
              <div className="flex items-center gap-3">
                <div className="flex-1 h-[1px] bg-gradient-to-r from-[#17171a]/20 to-transparent" />
                <span className="text-[#c9a96e] text-xs tracking-widest font-medium">●</span>
                <div className="flex-1 h-[1px] bg-gradient-to-l from-[#17171a]/20 to-transparent" />
              </div>

              {/* Author Info - Premium Typography */}
              <div
                ref={mobileAuthorRef}
                className="flex flex-col gap-3"
              >
                <div className="flex flex-col gap-2">
                  <p className="text-xs xs:text-sm font-sans tracking-[0.1em] text-[#17171a] font-bold uppercase">
                    {activeTestimonial.client}
                  </p>
                  <div className="flex items-center space-x-2">
                    <p className="text-[11px] xs:text-xs font-sans tracking-[0.08em] text-[#9e7d3b] font-medium uppercase">
                      {activeTestimonial.role}
                    </p>
                    <span className="w-1 h-1 rounded-full bg-[#17171a]/20" />
                    <div className="flex items-center text-[#c9a96e] text-xs tracking-widest">
                      {"★".repeat(activeTestimonial.rating)}
                    </div>
                  </div>
                </div>
              </div>

              {/* Navigation Section */}
              <div
                ref={mobileNavRef}
                className="flex flex-col gap-5 pt-2"
              >
                {/* Indicator Pills with Enhanced Feedback */}
                <div className="flex items-center justify-center space-x-2.5">
                  {TESTIMONIALS.map((item, idx) => (
                    <button
                      key={item.id}
                      onClick={() => handleSelect(idx)}
                      onMouseEnter={pauseAutoPlay}
                      onMouseLeave={resumeAutoPlay}
                      aria-label={`View testimonial ${item.id}`}
                      className={`font-sans flex items-center justify-center transition-all duration-300 cursor-pointer font-medium ${currentIndex === idx
                          ? "w-9 h-9 bg-[#17171a] text-white border-2 border-[#17171a] text-sm shadow-lg scale-110"
                          : "w-7 h-7 bg-[#f8f7f5] text-[#17171a]/60 border-1.5 border-[#17171a]/30 text-xs hover:border-[#17171a]/60 hover:text-[#17171a] hover:bg-white hover:scale-105"
                        } rounded-full`}
                    >
                      {item.id}
                    </button>
                  ))}
                </div>

                {/* Arrow Navigation Buttons - Premium Styling */}
                <div className="flex items-center justify-between gap-4">
                  <button
                    onClick={handlePrev}
                    onMouseEnter={pauseAutoPlay}
                    onMouseLeave={resumeAutoPlay}
                    aria-label="Previous testimonial"
                    className="flex-1 h-12 rounded-full border border-[#17171a]/25 flex items-center justify-center text-lg text-[#17171a] hover:bg-[#17171a] hover:text-white hover:border-[#17171a] transition-all duration-300 cursor-pointer hover:shadow-lg hover:scale-105 active:scale-95"
                  >
                    ←
                  </button>
                  <button
                    onClick={handleNext}
                    onMouseEnter={pauseAutoPlay}
                    onMouseLeave={resumeAutoPlay}
                    aria-label="Next testimonial"
                    className="flex-1 h-12 rounded-full border border-[#17171a]/25 flex items-center justify-center text-lg text-[#17171a] hover:bg-[#17171a] hover:text-white hover:border-[#17171a] transition-all duration-300 cursor-pointer hover:shadow-lg hover:scale-105 active:scale-95"
                  >
                    →
                  </button>
                </div>

                {/* Swipe Hint - Subtle */}
                <p className="text-center text-[11px] text-[#17171a]/40 font-sans tracking-wide uppercase font-medium mt-2">
                  Swipe or tap to explore
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* ── DESKTOP VIEW: 2-Column Responsive Editorial Grid (Hidden on mobile) ── */}
        <div className="hidden lg:grid grid-cols-12 gap-16 xl:gap-24 items-stretch w-full max-w-none mx-auto">

          {/* Left Column: Lifestyle Photography */}
          <div
            ref={photoCardRef}
            className="col-span-6 relative w-full h-[500px] xl:h-[540px] rounded-2xl overflow-hidden shadow-[0_16px_40px_rgba(23,23,26,0.1)] border border-[#17171a]/10 bg-[#e5e3dc] will-change-transform"
          >
            <img
              ref={photoImgRef}
              src={activeTestimonial.image}
              alt={activeTestimonial.client}
              className="w-full h-full object-cover object-center filter brightness-[0.98] will-change-transform"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/55 via-transparent to-transparent pointer-events-none" />

            {/* Elegant Tag on Photo */}
            <div className="absolute bottom-3.5 left-3.5 z-10">
              <span className="text-[11px] font-sans tracking-widest text-[#c9a96e] uppercase bg-[#17171a]/95 backdrop-blur-md px-3 py-1 rounded border border-[#c9a96e]/30 shadow-lg font-medium">
                {activeTestimonial.location}
              </span>
            </div>
          </div>

          {/* Right Column: Quote Box */}
          <div
            ref={quoteCardRef}
            className="col-span-6 flex flex-col justify-between py-2 w-full will-change-transform bg-transparent p-0 rounded-none border-none shadow-none"
          >
            {/* Top Divider with Number Pills & Quotation Mark */}
            <div>
              <div className="border-t border-[#17171a]/20 pt-7 flex items-center justify-between w-full">
                {/* Number Pills: (1) (2) (3) (4) (5) */}
                <div className="flex items-center space-x-3.5">
                  {TESTIMONIALS.map((item, idx) => (
                    <button
                      key={item.id}
                      onClick={() => handleSelect(idx)}
                      aria-label={`View testimonial ${item.id}`}
                      className={`w-9 h-9 rounded-full text-sm font-sans flex items-center justify-center transition-all duration-200 cursor-pointer ${currentIndex === idx
                          ? "bg-[#17171a] text-white border-2 border-[#17171a] font-bold shadow-md scale-105"
                          : "bg-transparent text-[#17171a]/60 border border-[#17171a]/25 hover:border-[#17171a] hover:text-[#17171a]"
                        }`}
                    >
                      {item.id}
                    </button>
                  ))}
                </div>

                {/* Quotation Mark */}
                <div className="text-5xl font-sans text-[#17171a] leading-none select-none font-black opacity-85">
                  &rdquo;
                </div>
              </div>

              {/* Large Editorial Quote */}
              <div className="my-8 lg:mt-14 lg:mb-12 min-h-[160px] flex items-center">
                <p
                  ref={quoteTextRef}
                  className="text-2xl lg:text-[2.1rem] xl:text-[2.45rem] font-sans font-normal leading-[1.42] text-[#17171a] tracking-tight will-change-transform"
                >
                  &ldquo;{activeTestimonial.quote}&rdquo;
                </p>
              </div>
            </div>

            {/* Bottom Row: Author & Rating with Navigation Controls */}
            <div className="pt-6 border-t border-[#17171a]/15 flex flex-row items-center justify-between gap-2 w-full">
              <div className="flex flex-wrap items-center gap-3 text-sm font-sans tracking-widest text-[#17171a] font-bold uppercase">
                <span>{activeTestimonial.client}</span>
                <span className="text-[#17171a]/30 font-normal">/</span>
                <span className="text-[#9e7d3b] tracking-wider text-sm font-medium">
                  {activeTestimonial.role}
                </span>
                <span className="text-[#17171a]/30 font-normal">/</span>
                <div className="flex items-center text-[#c9a96e] text-base tracking-widest">
                  {"★".repeat(activeTestimonial.rating)}
                </div>
              </div>

              {/* Prev / Next Navigation Arrows */}
              <div className="flex items-center space-x-2 shrink-0">
                <button
                  onClick={handlePrev}
                  aria-label="Previous testimonial"
                  className="w-10 h-10 rounded-full border border-[#17171a]/25 flex items-center justify-center text-sm text-[#17171a] hover:bg-[#17171a] hover:text-white transition-colors duration-200 cursor-pointer"
                >
                  ←
                </button>
                <button
                  onClick={handleNext}
                  aria-label="Next testimonial"
                  className="w-10 h-10 rounded-full border border-[#17171a]/25 flex items-center justify-center text-sm text-[#17171a] hover:bg-[#17171a] hover:text-white transition-colors duration-200 cursor-pointer"
                >
                  →
                </button>
              </div>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
}