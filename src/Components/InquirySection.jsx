import { useState, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "../utils/useGSAP";

gsap.registerPlugin(ScrollTrigger);

export default function InquirySection() {
  const sectionRef = useRef(null);
  const eyebrowRef = useRef(null);
  const headlineRef = useRef(null);
  const keyIconRef = useRef(null);
  const formRef = useRef(null);
  const buttonRef = useRef(null);

  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    residenceType: "",
    timeline: "",
    budgetRange: "",
    consultationType: "",
    message: "",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  // GSAP ScrollTrigger Rise-Up (Comes-Up) Animations
  useGSAP(
    () => {
      const section = sectionRef.current;
      if (!section) return;

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start: "top 75%",
          toggleActions: "play none none none",
        },
      });

      // 1. Eyebrow & Headline rise up
      tl.fromTo(
        eyebrowRef.current,
        { y: 40, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.9, ease: "power3.out" }
      );

      tl.fromTo(
        headlineRef.current,
        { y: 55, opacity: 0 },
        { y: 0, opacity: 1, duration: 1.1, ease: "power3.out" },
        "-=0.7"
      );

      // 2. First Key Emblem reveals
      tl.fromTo(
        keyIconRef.current,
        { scale: 0.85, opacity: 0, y: 20 },
        { scale: 1, opacity: 1, y: 0, duration: 0.9, ease: "power3.out" },
        "-=0.7"
      );

      // 3. Underline Form Fields stagger up cleanly
      tl.fromTo(
        ".inquiry-field",
        { y: 35, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.85,
          stagger: 0.08,
          ease: "power3.out",
        },
        "-=0.6"
      );

      // 4. Center Button rises up
      tl.fromTo(
        buttonRef.current,
        { y: 30, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.9, ease: "power3.out" },
        "-=0.5"
      );
    },
    { scope: sectionRef }
  );

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.fullName || !formData.email) return;

    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSubmitted(true);
    }, 850);
  };

  const handleReset = () => {
    setIsSubmitted(false);
    setFormData({
      fullName: "",
      email: "",
      phone: "",
      residenceType: "",
      timeline: "",
      budgetRange: "",
      consultationType: "",
      message: "",
    });
  };

  return (
    <section
      ref={sectionRef}
      id="inquiry"
      className="relative w-full min-h-screen min-h-[100dvh] flex flex-col justify-center items-center bg-[#17171a] text-white py-24 sm:py-32 lg:py-40 px-6 xs:px-10 sm:px-16 lg:px-24 select-none overflow-hidden font-sans border-t border-[#c9a96e]/20"
    >
      {/* Background Architectural Ambient Glow & Grid Pattern */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(201,169,110,0.06),transparent_65%)] pointer-events-none" />
      <div className="absolute inset-0 bg-[radial-gradient(rgba(255,255,255,0.02)_1px,transparent_1px)] [background-size:48px_48px] pointer-events-none opacity-30" />

      <div className="relative z-10 w-full max-w-[1520px] mx-auto flex flex-col items-center justify-center my-auto">
        
        {/* ── 1. Brand Eyebrow Tag ── */}
        <div
          ref={eyebrowRef}
          className="flex items-center justify-center space-x-3 mb-4 sm:mb-5 will-change-transform"
        >
          <span className="w-8 sm:w-12 h-[2px] bg-[#c9a96e]" />
          <span className="text-[10px] sm:text-xs font-sans tracking-[0.35em] text-[#c9a96e] uppercase font-bold">
            FIRST KEY ESTATE &bull; PRIVATE CLIENT SERVICES
          </span>
          <span className="w-8 sm:w-12 h-[2px] bg-[#c9a96e]" />
        </div>

        {/* ── 2. Grand Centered Headline ── */}
        <h2
          ref={headlineRef}
          className="text-4xl xs:text-5xl sm:text-6xl lg:text-[4.5rem] xl:text-[5.2rem] font-serif font-normal tracking-tight leading-[1.08] text-white text-center will-change-transform max-w-4xl"
        >
          Join The Whispering Pines Sanctuary
        </h2>

        {/* ── 3. First Key Estate Gold Emblem ── */}
        <div
          ref={keyIconRef}
          className="my-8 sm:my-12 lg:my-14 flex items-center justify-center will-change-transform"
        >
          <svg
            className="w-14 h-7 sm:w-16 sm:h-8 text-[#c9a96e]"
            viewBox="0 0 64 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.6"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            {/* Diamond Key Head */}
            <polygon points="12,4 20,12 12,20 4,12" />
            <circle cx="12" cy="12" r="3" />
            {/* Key Stem */}
            <line x1="20" y1="12" x2="56" y2="12" />
            {/* Key Teeth */}
            <line x1="44" y1="12" x2="44" y2="18" />
            <line x1="52" y1="12" x2="52" y2="19" />
          </svg>
        </div>

        {/* ── 4. Main Interactive Form (Symmetrical 2-Column Luxury Grid) ── */}
        <div className="w-full max-w-5xl mx-auto">
          {isSubmitted ? (
            /* Success Confirmation Screen */
            <div className="py-14 sm:py-20 flex flex-col items-center justify-center text-center space-y-6">
              <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-full border-2 border-[#c9a96e] flex items-center justify-center text-[#c9a96e] text-3xl font-serif">
                ✓
              </div>
              <h3 className="text-3xl sm:text-5xl font-serif text-white tracking-tight">
                Inquiry Successfully Registered
              </h3>
              <p className="text-sm sm:text-base lg:text-lg text-white/80 max-w-xl mx-auto leading-relaxed">
                Thank you, <span className="text-[#c9a96e] font-semibold">{formData.fullName}</span>. Your private dossier for The Whispering Pines has been initiated. A Senior Estate Director will connect with you via {formData.email} within 24 hours.
              </p>
              <button
                onClick={handleReset}
                className="mt-6 px-10 py-3.5 border border-[#c9a96e] text-xs font-mono tracking-[0.25em] uppercase text-[#c9a96e] hover:bg-[#c9a96e] hover:text-[#17171a] transition-all duration-300 cursor-pointer font-bold"
              >
                SUBMIT ANOTHER INQUIRY
              </button>
            </div>
          ) : (
            <form
              ref={formRef}
              onSubmit={handleSubmit}
              className="w-full flex flex-col items-center"
            >
              {/* 4 Balanced Symmetrical Rows (2 Columns each) */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-x-14 lg:gap-x-20 xl:gap-x-28 gap-y-9 sm:gap-y-12 w-full mb-4">
                
                {/* ── ROW 1: FULL NAME & EMAIL ── */}
                <div className="inquiry-field flex flex-col space-y-2 will-change-transform">
                  <label className="text-[10px] sm:text-xs font-mono uppercase tracking-[0.25em] text-[#c9a96e] font-semibold">
                    FULL NAME *
                  </label>
                  <input
                    type="text"
                    name="fullName"
                    required
                    value={formData.fullName}
                    onChange={handleChange}
                    placeholder="e.g. Eleanor Vance"
                    className="w-full bg-transparent border-b border-white/20 focus:border-[#c9a96e] py-2.5 sm:py-3 text-sm sm:text-base text-white outline-none transition-colors duration-300 placeholder:text-white/25"
                  />
                </div>

                <div className="inquiry-field flex flex-col space-y-2 will-change-transform">
                  <label className="text-[10px] sm:text-xs font-mono uppercase tracking-[0.25em] text-[#c9a96e] font-semibold">
                    EMAIL ADDRESS *
                  </label>
                  <input
                    type="email"
                    name="email"
                    required
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="e.g. eleanor@vancecapital.com"
                    className="w-full bg-transparent border-b border-white/20 focus:border-[#c9a96e] py-2.5 sm:py-3 text-sm sm:text-base text-white outline-none transition-colors duration-300 placeholder:text-white/25"
                  />
                </div>

                {/* ── ROW 2: PHONE & RESIDENCE COLLECTION ── */}
                <div className="inquiry-field flex flex-col space-y-2 will-change-transform">
                  <label className="text-[10px] sm:text-xs font-mono uppercase tracking-[0.25em] text-[#c9a96e] font-semibold">
                    PHONE NUMBER
                  </label>
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    placeholder="e.g. +1 (555) 019-2834"
                    className="w-full bg-transparent border-b border-white/20 focus:border-[#c9a96e] py-2.5 sm:py-3 text-sm sm:text-base text-white outline-none transition-colors duration-300 placeholder:text-white/25"
                  />
                </div>

                <div className="inquiry-field flex flex-col space-y-2 will-change-transform">
                  <label className="text-[10px] sm:text-xs font-mono uppercase tracking-[0.25em] text-[#c9a96e] font-semibold">
                    RESIDENCE COLLECTION
                  </label>
                  <select
                    name="residenceType"
                    value={formData.residenceType}
                    onChange={handleChange}
                    className="w-full bg-transparent border-b border-white/20 focus:border-[#c9a96e] py-2.5 sm:py-3 text-sm sm:text-base text-white outline-none transition-colors duration-300 cursor-pointer [&>option]:bg-[#17171a] [&>option]:text-white"
                  >
                    <option value="">SELECT COLLECTION...</option>
                    <option value="LUXURY VILLA">LUXURY VILLA</option>
                    <option value="RESIDENTIAL SUITE">RESIDENTIAL SUITE</option>
                    <option value="PRIVATE ESTATE">PRIVATE ESTATE</option>
                    <option value="BOTANICAL SANCTUARY">BOTANICAL SANCTUARY</option>
                    <option value="INVESTMENT PORTFOLIO">INVESTMENT PORTFOLIO</option>
                  </select>
                </div>

                {/* ── ROW 3: TIMELINE & BUDGET RANGE ── */}
                <div className="inquiry-field flex flex-col space-y-2 will-change-transform">
                  <label className="text-[10px] sm:text-xs font-mono uppercase tracking-[0.25em] text-[#c9a96e] font-semibold">
                    INTENDED TIMELINE
                  </label>
                  <select
                    name="timeline"
                    value={formData.timeline}
                    onChange={handleChange}
                    className="w-full bg-transparent border-b border-white/20 focus:border-[#c9a96e] py-2.5 sm:py-3 text-sm sm:text-base text-white outline-none transition-colors duration-300 cursor-pointer [&>option]:bg-[#17171a] [&>option]:text-white"
                  >
                    <option value="">SELECT TIMELINE...</option>
                    <option value="IMMEDIATE (MOVE-IN READY)">IMMEDIATE (MOVE-IN READY)</option>
                    <option value="WITHIN 3-6 MONTHS">WITHIN 3-6 MONTHS</option>
                    <option value="Q3/Q4 PRE-CONSTRUCTION">Q3/Q4 PRE-CONSTRUCTION</option>
                    <option value="PORTFOLIO ADVISORY">PORTFOLIO ADVISORY</option>
                  </select>
                </div>

                <div className="inquiry-field flex flex-col space-y-2 will-change-transform">
                  <label className="text-[10px] sm:text-xs font-mono uppercase tracking-[0.25em] text-[#c9a96e] font-semibold">
                    INVESTMENT RANGE
                  </label>
                  <select
                    name="budgetRange"
                    value={formData.budgetRange}
                    onChange={handleChange}
                    className="w-full bg-transparent border-b border-white/20 focus:border-[#c9a96e] py-2.5 sm:py-3 text-sm sm:text-base text-white outline-none transition-colors duration-300 cursor-pointer [&>option]:bg-[#17171a] [&>option]:text-white"
                  >
                    <option value="">SELECT BUDGET RANGE...</option>
                    <option value="$1.5M – $3.0M">$1,500,000 – $3,000,000</option>
                    <option value="$3.0M – $6.0M">$3,000,000 – $6,000,000</option>
                    <option value="$6.0M – $10.0M+">$6,000,000 – $10,000,000+</option>
                    <option value="BESPOKE ESTATE ALLOCATION">BESPOKE ESTATE ALLOCATION</option>
                  </select>
                </div>

                {/* ── ROW 4: CONSULTATION TYPE & BESPOKE NOTES ── */}
                <div className="inquiry-field flex flex-col space-y-2 will-change-transform">
                  <label className="text-[10px] sm:text-xs font-mono uppercase tracking-[0.25em] text-[#c9a96e] font-semibold">
                    PREFERRED CONSULTATION
                  </label>
                  <select
                    name="consultationType"
                    value={formData.consultationType}
                    onChange={handleChange}
                    className="w-full bg-transparent border-b border-white/20 focus:border-[#c9a96e] py-2.5 sm:py-3 text-sm sm:text-base text-white outline-none transition-colors duration-300 cursor-pointer [&>option]:bg-[#17171a] [&>option]:text-white"
                  >
                    <option value="">SELECT FORMAT...</option>
                    <option value="PRIVATE ON-SITE TOUR">PRIVATE ON-SITE TOUR</option>
                    <option value="VIRTUAL VIP PRESENTATION">VIRTUAL VIP PRESENTATION</option>
                    <option value="DIRECT EXECUTIVE PHONE CALL">DIRECT EXECUTIVE PHONE CALL</option>
                    <option value="COURIER BESPOKE DOSSIER">COURIER BESPOKE DOSSIER</option>
                  </select>
                </div>

                <div className="inquiry-field flex flex-col space-y-2 will-change-transform">
                  <label className="text-[10px] sm:text-xs font-mono uppercase tracking-[0.25em] text-[#c9a96e] font-semibold">
                    BESPOKE INQUIRY NOTES OR QUESTIONS
                  </label>
                  <input
                    type="text"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    placeholder="e.g. Preferred villa layout, custom pool pavilion..."
                    className="w-full bg-transparent border-b border-white/20 focus:border-[#c9a96e] py-2.5 sm:py-3 text-sm sm:text-base text-white outline-none transition-colors duration-300 placeholder:text-white/25"
                  />
                </div>

              </div>

              {/* ── 5. Newly Designed Clean Action Button ── */}
              <div
                ref={buttonRef}
                className="mt-12 sm:mt-16 lg:mt-20 flex flex-col items-center justify-center text-center w-full mx-auto will-change-transform"
              >
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="px-10 sm:px-16 py-3.5 sm:py-4 border border-[#c9a96e] bg-transparent text-[#c9a96e] hover:bg-[#c9a96e] hover:text-[#17171a] text-xs sm:text-sm font-sans tracking-[0.28em] uppercase transition-all duration-300 cursor-pointer disabled:opacity-50 active:scale-[0.99]"
                >
                  {isSubmitting ? (
                    <span className="flex items-center gap-2.5">
                      <span className="w-3.5 h-3.5 rounded-full border-2 border-current border-t-transparent animate-spin" />
                      <span>PROCESSING INQUIRY...</span>
                    </span>
                  ) : (
                    <span>SEND INVESTMENT INQUIRY</span>
                  )}
                </button>
              </div>

            </form>
          )}
        </div>

      </div>
    </section>
  );
}
