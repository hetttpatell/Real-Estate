import { useState, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "../utils/useGSAP";

gsap.registerPlugin(ScrollTrigger);

// High-resolution luxury architectural villa matching reference visual
const ESTATE_IMAGE =
  "https://images.unsplash.com/photo-1613490493576-7fde63acd811?auto=format&fit=crop&w=2000&q=85";

export default function InquirySection() {
  const sectionRef = useRef(null);
  const formCardRef = useRef(null);
  const rightColRef = useRef(null);
  const parallaxImgRef = useRef(null);

  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    budget: "",
    location: "",
    reason: "",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  // GSAP ScrollTrigger Entrance & Parallax Animations (Responsive for Desktop & Mobile)
  useGSAP(
    () => {
      const section = sectionRef.current;
      if (!section) return;

      const mm = gsap.matchMedia();

      // ── DESKTOP ANIMATIONS (>= 1024px) ──
      mm.add("(min-width: 1024px)", () => {
        const entranceTl = gsap.timeline({
          scrollTrigger: {
            trigger: section,
            start: "top 75%",
            toggleActions: "play none none none",
          },
        });

        // Right Column 50% Image slides in smoothly from the right
        entranceTl.fromTo(
          rightColRef.current,
          { xPercent: 100, opacity: 0.1 },
          { xPercent: 0, opacity: 1, duration: 1.3, ease: "power3.out" },
          0
        );

        // Left Column Elements Staggered Entrance
        entranceTl
          .fromTo(
            ".inquiry-eyebrow",
            { y: 30, opacity: 0 },
            { y: 0, opacity: 1, duration: 0.8, ease: "power3.out" },
            0.1
          )
          .fromTo(
            ".inquiry-title",
            { y: 35, opacity: 0 },
            { y: 0, opacity: 1, duration: 0.85, ease: "power3.out" },
            0.2
          )
          .fromTo(
            ".inquiry-subtitle",
            { y: 25, opacity: 0 },
            { y: 0, opacity: 1, duration: 0.75, ease: "power3.out" },
            0.3
          )
          .fromTo(
            ".inquiry-field-row",
            { y: 30, opacity: 0 },
            {
              y: 0,
              opacity: 1,
              duration: 0.7,
              stagger: 0.1,
              ease: "power3.out",
            },
            0.4
          )
          .fromTo(
            ".inquiry-actions",
            { y: 25, opacity: 0, scale: 0.95 },
            { y: 0, opacity: 1, scale: 1, duration: 0.6, ease: "back.out(1.4)" },
            0.7
          );

        // Desktop Parallax Scroll Scrub
        if (parallaxImgRef.current) {
          gsap.fromTo(
            parallaxImgRef.current,
            { yPercent: -10 },
            {
              yPercent: 10,
              ease: "none",
              scrollTrigger: {
                trigger: section,
                start: "top bottom",
                end: "bottom top",
                scrub: true,
              },
            }
          );
        }
      });

      // ── MOBILE & TABLET ANIMATIONS (< 1024px) ──
      mm.add("(max-width: 1023px)", () => {
        const mobTl = gsap.timeline({
          scrollTrigger: {
            trigger: section,
            start: "top 80%",
            toggleActions: "play none none none",
          },
        });

        mobTl
          .fromTo(
            ".inquiry-eyebrow",
            { y: 25, opacity: 0 },
            { y: 0, opacity: 1, duration: 0.7, ease: "power3.out" }
          )
          .fromTo(
            ".inquiry-title",
            { y: 30, opacity: 0 },
            { y: 0, opacity: 1, duration: 0.8, ease: "power3.out" },
            "-=0.5"
          )
          .fromTo(
            ".inquiry-subtitle",
            { y: 20, opacity: 0 },
            { y: 0, opacity: 1, duration: 0.7, ease: "power3.out" },
            "-=0.5"
          )
          .fromTo(
            ".inquiry-field-row",
            { y: 30, opacity: 0 },
            {
              y: 0,
              opacity: 1,
              duration: 0.65,
              stagger: 0.1,
              ease: "power3.out",
            },
            "-=0.4"
          )
          .fromTo(
            ".inquiry-actions",
            { y: 25, opacity: 0, scale: 0.95 },
            { y: 0, opacity: 1, scale: 1, duration: 0.6, ease: "back.out(1.4)" },
            "-=0.3"
          )
          .fromTo(
            rightColRef.current,
            { y: 50, opacity: 0 },
            { y: 0, opacity: 1, duration: 0.9, ease: "power3.out" },
            "-=0.4"
          );

        // Mobile Parallax
        if (parallaxImgRef.current) {
          gsap.fromTo(
            parallaxImgRef.current,
            { yPercent: -8 },
            {
              yPercent: 8,
              ease: "none",
              scrollTrigger: {
                trigger: section,
                start: "top bottom",
                end: "bottom top",
                scrub: true,
              },
            }
          );
        }
      });
    },
    { scope: sectionRef }
  );

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleReset = () => {
    setFormData({
      name: "",
      phone: "",
      budget: "",
      location: "",
      reason: "",
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.name || !formData.phone) return;

    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSubmitted(true);
    }, 850);
  };

  const handleNewInquiry = () => {
    handleReset();
    setIsSubmitted(false);
  };

  return (
    <section
      ref={sectionRef}
      id="inquiry"
      className="relative w-full min-h-screen grid grid-cols-1 lg:grid-cols-2 bg-[#121215] text-white border-t border-[#c9a96e]/20 overflow-hidden select-none"
    >
      {/* ═══════════════════════════════════════════════════════════════════
          LEFT / TOP PARTITION: Form Container (Spacious Inset on Mobile)
      ═══════════════════════════════════════════════════════════════════ */}
      <div
        ref={formCardRef}
        className="w-full min-h-full flex flex-col justify-center items-center px-10 xs:px-12 sm:px-16 md:px-20 lg:px-12 xl:px-16 py-18 sm:py-24 bg-[#121215] relative z-10"
      >
        {/* Centered Form Wrapper with Extra Margin Inset */}
        <div className="w-full max-w-[360px] xs:max-w-[400px] sm:max-w-[480px] mx-auto flex flex-col items-center justify-center">

          {/* 1. Symmetrical Eyebrow Tag: — FIRSTKEY HOUSING ESTATE — */}
          <div className="inquiry-eyebrow flex items-center justify-center gap-3 mb-3.5 sm:mb-4">
            <span className="w-6 sm:w-8 h-[1.5px] bg-[#c9a96e]" />
            <span className="text-[10px] sm:text-xs font-mono tracking-[0.24em] text-[#c9a96e] uppercase font-bold text-center">
              FIRSTKEY HOUSING ESTATE
            </span>
            <span className="w-6 sm:w-8 h-[1.5px] bg-[#c9a96e]" />
          </div>

          {/* 2. Headline: Discover 18th Century Rural Life In Penn. */}
          <h2 className="inquiry-title text-2xl xs:text-3xl sm:text-[36px] lg:text-[40px] font-serif text-white tracking-tight font-normal leading-[1.18] mb-3 text-center max-w-md mx-auto">
            Discover 18th Century Rural Life In Penn.
          </h2>

          {/* 3. Subtitle: Exact 2-Line Reference Description */}
          <p className="inquiry-subtitle text-xs sm:text-[13px] text-white/70 font-sans leading-relaxed mb-8 sm:mb-10 max-w-sm sm:max-w-md mx-auto text-center">
            A historic house museum celebrating pre-1750 fine art, architecture, and enduring regional narrative.
          </p>
          <br /><br /><br />
          {isSubmitted ? (
            /* Success Feedback State */
            <div className="w-full py-10 px-6 border border-[#c9a96e]/30 bg-[#17171c]/90 rounded-none flex flex-col items-center text-center gap-4">
              <div className="w-12 h-12 border border-[#c9a96e] flex items-center justify-center text-[#c9a96e] text-2xl font-serif">
                ✓
              </div>
              <h3 className="text-xl sm:text-2xl font-serif text-white">
                Inquiry Registered
              </h3>
              <p className="text-xs sm:text-sm text-white/75 leading-relaxed max-w-sm">
                Thank you, <span className="text-[#c9a96e] font-semibold">{formData.name}</span>. Your private dossier for <span className="text-white font-medium">{formData.location || "The Sanctuary"}</span> has been recorded. An Estate Director will connect via <span className="text-white font-medium">{formData.phone}</span> shortly.
              </p>
              <button
                type="button"
                onClick={handleNewInquiry}
                className="mt-3 px-8 py-3 border border-[#c9a96e] text-xs font-mono tracking-[0.2em] uppercase text-[#c9a96e] hover:bg-[#c9a96e] hover:text-[#121215] transition-all duration-300 cursor-pointer font-semibold rounded-none"
              >
                SUBMIT ANOTHER RESPONSE
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="w-full flex flex-col gap-6 sm:gap-7 items-center">

              {/* ── 2 BY 2 GRID: NAME, PHONE, BUDGET, LOCATION ── */}
              <div className="inquiry-field-row grid grid-cols-2 gap-x-5 sm:gap-x-8 gap-y-5 sm:gap-y-6 w-full">

                {/* 1. NAME * */}
                <div className="relative flex flex-col group">
                  <label className="text-[10px] sm:text-[11px] font-mono tracking-[0.16em] uppercase text-[#c9a96e] mb-1 flex items-center gap-1 font-semibold">
                    NAME <span className="text-[#c9a96e] font-bold">*</span>
                  </label>
                  <div className="relative w-full pb-0.5">
                    <input
                      type="text"
                      name="name"
                      required
                      value={formData.name}
                      onChange={handleChange}
                      placeholder="Your full name"
                      className="w-full appearance-none rounded-none border-0 border-b border-white/20 focus:border-[#c9a96e] bg-transparent py-1.5 text-xs sm:text-sm text-white placeholder:text-white/30 outline-none transition-colors duration-300 font-sans"
                    />
                    <span className="absolute bottom-0 left-0 w-0 h-[1.5px] bg-[#c9a96e] transition-all duration-300 group-focus-within:w-full" />
                  </div>
                </div>

                {/* 2. PHONE * */}
                <div className="relative flex flex-col group">
                  <label className="text-[10px] sm:text-[11px] font-mono tracking-[0.16em] uppercase text-[#c9a96e] mb-1 flex items-center gap-1 font-semibold">
                    PHONE <span className="text-[#c9a96e] font-bold">*</span>
                  </label>
                  <div className="relative w-full pb-0.5">
                    <input
                      type="tel"
                      name="phone"
                      required
                      value={formData.phone}
                      onChange={handleChange}
                      placeholder="e.g. +1 (555) 234"
                      className="w-full appearance-none rounded-none border-0 border-b border-white/20 focus:border-[#c9a96e] bg-transparent py-1.5 text-xs sm:text-sm text-white placeholder:text-white/30 outline-none transition-colors duration-300 font-sans"
                    />
                    <span className="absolute bottom-0 left-0 w-0 h-[1.5px] bg-[#c9a96e] transition-all duration-300 group-focus-within:w-full" />
                  </div>
                </div>

                {/* 3. BUDGET */}
                <div className="relative flex flex-col group">
                  <label className="text-[10px] sm:text-[11px] font-mono tracking-[0.16em] uppercase text-[#c9a96e] mb-1 font-semibold">
                    BUDGET
                  </label>
                  <div className="relative w-full pb-0.5">
                    <input
                      type="text"
                      name="budget"
                      value={formData.budget}
                      onChange={handleChange}
                      placeholder="e.g. $3M – $6M+"
                      className="w-full appearance-none rounded-none border-0 border-b border-white/20 focus:border-[#c9a96e] bg-transparent py-1.5 text-xs sm:text-sm text-white placeholder:text-white/30 outline-none transition-colors duration-300 font-sans"
                    />
                    <span className="absolute bottom-0 left-0 w-0 h-[1.5px] bg-[#c9a96e] transition-all duration-300 group-focus-within:w-full" />
                  </div>
                </div>

                {/* 4. LOCATION */}
                <div className="relative flex flex-col group">
                  <label className="text-[10px] sm:text-[11px] font-mono tracking-[0.16em] uppercase text-[#c9a96e] mb-1 font-semibold">
                    LOCATION
                  </label>
                  <div className="relative w-full pb-0.5">
                    <input
                      type="text"
                      name="location"
                      value={formData.location}
                      onChange={handleChange}
                      placeholder="e.g. West Enclave"
                      className="w-full appearance-none rounded-none border-0 border-b border-white/20 focus:border-[#c9a96e] bg-transparent py-1.5 text-xs sm:text-sm text-white placeholder:text-white/30 outline-none transition-colors duration-300 font-sans"
                    />
                    <span className="absolute bottom-0 left-0 w-0 h-[1.5px] bg-[#c9a96e] transition-all duration-300 group-focus-within:w-full" />
                  </div>
                </div>

              </div>

              {/* ── ROW 3: REASON FOR INQUIRY / INVESTMENT (Full Width) ── */}
              <div className="inquiry-field-row relative flex flex-col group w-full">
                <label className="text-[10px] sm:text-[11px] font-mono tracking-[0.16em] uppercase text-[#c9a96e] mb-1 font-semibold">
                  REASON FOR INQUIRY / INVESTMENT
                </label>
                <div className="relative w-full pb-0.5">
                  <input
                    type="text"
                    name="reason"
                    value={formData.reason}
                    onChange={handleChange}
                    placeholder="e.g. Primary residence, retreat, portfolio..."
                    className="w-full appearance-none rounded-none border-0 border-b border-white/20 focus:border-[#c9a96e] bg-transparent py-1.5 text-xs sm:text-sm text-white placeholder:text-white/30 outline-none transition-colors duration-300 font-sans"
                  />
                  <span className="absolute bottom-0 left-0 w-0 h-[1.5px] bg-[#c9a96e] transition-all duration-300 group-focus-within:w-full" />
                </div>
              </div>

              {/* ── ROW 4: SUBMIT BUTTON (Exact Gold Outline Rectangle Box) ── */}
              <div className="inquiry-actions pt-4 sm:pt-6 flex items-center justify-center w-full">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-[130px] sm:w-[140px] h-[46px] sm:h-[50px] border border-[#c9a96e] bg-transparent text-[#c9a96e] hover:bg-[#c9a96e] hover:text-[#121215] text-xs sm:text-[13px] font-mono tracking-[0.24em] uppercase font-bold transition-all duration-300 cursor-pointer disabled:opacity-50 active:scale-[0.98] rounded-none flex items-center justify-center select-none"
                >
                  {isSubmitting ? (
                    <span className="w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin" />
                  ) : (
                    <span>SUBMIT</span>
                  )}
                </button>
              </div>

            </form>
          )}

        </div>
      </div>

      {/* ═══════════════════════════════════════════════════════════════════
          RIGHT / BOTTOM PARTITION: Architectural Image with Top-Right Badge
      ═══════════════════════════════════════════════════════════════════ */}
      <div
        ref={rightColRef}
        className="w-full min-h-[420px] xs:min-h-[480px] sm:min-h-[540px] lg:min-h-full relative overflow-hidden bg-[#0a0a0c] will-change-transform"
      >
        {/* Full Bleed Parallax Image Container */}
        <div className="absolute inset-0 w-full h-[120%] -top-[10%] overflow-hidden">
          <img
            ref={parallaxImgRef}
            src={ESTATE_IMAGE}
            alt="First Key Housing Estate Luxury Villa Architecture"
            className="w-full h-full object-cover object-center will-change-transform filter brightness-100 contrast-105"
          />
        </div>

        {/* Top-Right Architectural Stamp matching reference image */}
        <div className="absolute top-5 right-5 z-20 px-3 py-1 bg-[#1a1814]/80 backdrop-blur-sm border border-[#c9a96e]/40 rounded-none text-[9px] sm:text-[10px] font-mono tracking-[0.2em] text-[#c9a96e] uppercase font-bold">
          ESTATE NO. 04 &bull; PRIVATE RESIDENCE
        </div>
      </div>

    </section>
  );
}
