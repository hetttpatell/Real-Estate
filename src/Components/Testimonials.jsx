import { useState, useRef } from "react";
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

  const sectionRef = useRef(null);
  const headerRef = useRef(null);
  const photoCardRef = useRef(null);
  const quoteCardRef = useRef(null);
  const quoteTextRef = useRef(null);
  const photoImgRef = useRef(null);

  const activeTestimonial = TESTIMONIALS[currentIndex];

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

      // 2. Photos & Quote Cards Symmetrical Rise Up
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
    },
    { scope: sectionRef }
  );

  const handleSelect = (index) => {
    if (index === currentIndex || isFading) return;
    setIsFading(true);

    // Animate out
    gsap.to([quoteTextRef.current, photoImgRef.current], {
      y: -15,
      opacity: 0,
      duration: 0.22,
      ease: "power2.in",
      onComplete: () => {
        setCurrentIndex(index);
        setIsFading(false);

        // Animate in from below (comes up animation)
        gsap.fromTo(
          [quoteTextRef.current, photoImgRef.current],
          { y: 35, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.55, ease: "power3.out", stagger: 0.08 }
        );
      },
    });
  };

  const handlePrev = () => {
    const nextIdx = (currentIndex - 1 + TESTIMONIALS.length) % TESTIMONIALS.length;
    handleSelect(nextIdx);
  };

  const handleNext = () => {
    const nextIdx = (currentIndex + 1) % TESTIMONIALS.length;
    handleSelect(nextIdx);
  };

  return (
    <section
      ref={sectionRef}
      id="testimonials"
      className="relative w-full min-h-screen min-h-[100dvh] flex flex-col justify-center bg-[#f8f7f5] text-[#17171a] py-14 xs:py-16 sm:py-24 lg:py-32 px-4 xs:px-6 sm:px-12 lg:px-20 xl:px-28 2xl:px-36 select-none overflow-hidden font-sans"
    >
      <div className="w-full max-w-[1720px] mx-auto flex flex-col items-center my-auto">
        
        {/* ── Heading Centered in the Middle of the Page with Guaranteed Ample Gap Below ── */}
        <div
          ref={headerRef}
          className="flex flex-col items-center justify-center text-center mx-auto pb-8 xs:pb-12 sm:pb-16 lg:pb-24 will-change-transform max-w-4xl"
        >
          {/* Eyebrow with Flanking Gold Accent Lines */}
          <div className="flex items-center justify-center space-x-3 xs:space-x-4 mb-3 xs:mb-4 sm:mb-6">
            <span className="w-6 xs:w-10 sm:w-16 h-[2px] bg-[#9e7d3b]" />
            <span className="text-[10px] xs:text-[11px] sm:text-xs font-sans tracking-[0.25em] xs:tracking-[0.35em] text-[#9e7d3b] uppercase font-bold whitespace-nowrap">
              ESTATE RESIDENTS &amp; INVESTORS
            </span>
            <span className="w-6 xs:w-10 sm:w-16 h-[2px] bg-[#9e7d3b]" />
          </div>

          {/* Grand Centered Heading in Fira Sans */}
          <h2 className="text-3xl xs:text-4xl sm:text-5xl lg:text-[4.6rem] xl:text-[5.4rem] font-bold tracking-tight leading-[1.08] sm:leading-[1.06] text-[#17171a]">
            <span>Don&apos;t Take</span>{" "}
            <span className="text-[#17171a]/30 font-light ml-1.5 xs:ml-2 sm:ml-3">
              Our Word for It.
            </span>
          </h2>
        </div>

        {/* ── 2-Column Responsive Editorial Grid ── */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 sm:gap-12 lg:gap-16 xl:gap-24 items-stretch w-full">
          
          {/* Left Column: Responsive Lifestyle Photography */}
          <div
            ref={photoCardRef}
            className="lg:col-span-6 relative w-full h-[260px] xs:h-[300px] sm:h-[400px] lg:h-[500px] xl:h-[540px] rounded-2xl overflow-hidden shadow-[0_20px_50px_rgba(23,23,26,0.12)] border border-[#17171a]/10 bg-[#e5e3dc] will-change-transform"
          >
            <img
              ref={photoImgRef}
              src={activeTestimonial.image}
              alt={activeTestimonial.client}
              className="w-full h-full object-cover object-center filter brightness-[0.98] will-change-transform"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/45 via-transparent to-transparent pointer-events-none" />
            
            {/* Elegant Tag on Photo */}
            <div className="absolute bottom-3 xs:bottom-4 left-3 xs:left-4 z-10">
              <span className="text-[9px] xs:text-[10px] sm:text-[11px] font-sans tracking-widest text-[#c9a96e] uppercase bg-[#17171a]/95 backdrop-blur-md px-2.5 xs:px-3.5 py-1 xs:py-1.5 rounded border border-[#c9a96e]/30 shadow-lg font-medium">
                {activeTestimonial.location}
              </span>
            </div>
          </div>

          {/* Right Column: Responsive Quote Box */}
          <div
            ref={quoteCardRef}
            className="lg:col-span-6 flex flex-col justify-between py-1 sm:py-2 w-full will-change-transform"
          >
            {/* Top Divider with Number Pills & Quotation Mark */}
            <div>
              <div className="border-t border-[#17171a]/20 pt-4 xs:pt-5 sm:pt-7 flex items-center justify-between w-full">
                {/* Number Pills: (1) (2) (3) (4) (5) */}
                <div className="flex items-center space-x-1.5 xs:space-x-2.5 sm:space-x-3.5">
                  {TESTIMONIALS.map((item, idx) => (
                    <button
                      key={item.id}
                      onClick={() => handleSelect(idx)}
                      aria-label={`View testimonial ${item.id}`}
                      className={`w-7 h-7 xs:w-8 xs:h-8 sm:w-9 sm:h-9 rounded-full text-xs sm:text-sm font-sans flex items-center justify-center transition-all duration-200 cursor-pointer ${
                        currentIndex === idx
                          ? "bg-[#17171a] text-white border-2 border-[#17171a] font-bold shadow-md scale-105"
                          : "bg-transparent text-[#17171a]/60 border border-[#17171a]/25 hover:border-[#17171a] hover:text-[#17171a]"
                      }`}
                    >
                      {item.id}
                    </button>
                  ))}
                </div>

                {/* Quotation Mark */}
                <div className="text-3xl xs:text-4xl sm:text-5xl font-sans text-[#17171a] leading-none select-none font-black opacity-85">
                  &rdquo;
                </div>
              </div>

              {/* Large Editorial Quote in Fira Sans */}
              <div className="mt-5 xs:mt-7 sm:mt-10 lg:mt-14 mb-6 xs:mb-8 sm:mb-12 min-h-[110px] xs:min-h-[130px] sm:min-h-[180px] flex items-center">
                <p
                  ref={quoteTextRef}
                  className="text-[1.2rem] xs:text-[1.38rem] sm:text-2xl lg:text-[2.1rem] xl:text-[2.45rem] font-sans font-normal leading-[1.38] sm:leading-[1.42] text-[#17171a] tracking-tight will-change-transform"
                >
                  &ldquo;{activeTestimonial.quote}&rdquo;
                </p>
              </div>
            </div>

            {/* Bottom Row: Author & Rating with Navigation Controls */}
            <div className="pt-4 xs:pt-5 sm:pt-6 border-t border-[#17171a]/15 flex flex-col xs:flex-row xs:items-center justify-between gap-3 xs:gap-2 w-full">
              <div className="flex flex-wrap items-center gap-2 xs:gap-2.5 sm:gap-3 text-[11px] xs:text-xs sm:text-sm font-sans tracking-wider sm:tracking-widest text-[#17171a] font-bold uppercase">
                <span>{activeTestimonial.client}</span>
                <span className="text-[#17171a]/30 font-normal">/</span>
                <span className="text-[#9e7d3b] tracking-wider text-[11px] xs:text-xs sm:text-sm font-medium hidden sm:inline">
                  {activeTestimonial.role}
                </span>
                <span className="text-[#17171a]/30 font-normal hidden sm:inline">/</span>
                <div className="flex items-center text-[#c9a96e] text-xs xs:text-sm sm:text-base tracking-widest">
                  {"★".repeat(activeTestimonial.rating)}
                </div>
              </div>

              {/* Prev / Next Navigation Arrows */}
              <div className="flex items-center space-x-2 xs:space-x-2.5 self-end xs:self-auto">
                <button
                  onClick={handlePrev}
                  aria-label="Previous testimonial"
                  className="w-8 h-8 xs:w-9 xs:h-9 sm:w-10 sm:h-10 rounded-full border border-[#17171a]/25 flex items-center justify-center text-xs xs:text-sm text-[#17171a] hover:bg-[#17171a] hover:text-white transition-colors duration-200 cursor-pointer"
                >
                  ←
                </button>
                <button
                  onClick={handleNext}
                  aria-label="Next testimonial"
                  className="w-8 h-8 xs:w-9 xs:h-9 sm:w-10 sm:h-10 rounded-full border border-[#17171a]/25 flex items-center justify-center text-xs xs:text-sm text-[#17171a] hover:bg-[#17171a] hover:text-white transition-colors duration-200 cursor-pointer"
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
