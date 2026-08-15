import { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "../utils/useGSAP";

gsap.registerPlugin(ScrollTrigger);

const INTERIOR_IMG =
  "https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&w=2200&q=85";

const GALLERY_IMG_1 =
  "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1600&q=85";

const GALLERY_IMG_2 =
  "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=1400&q=85";

const GALLERY_IMG_3 =
  "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=1000&q=85";

const STRIP_IMG =
  "https://images.unsplash.com/photo-1600585154526-990dced4db0d?auto=format&fit=crop&w=2200&q=85";

const OVERLAP_SMALL_IMG =
  "https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?auto=format&fit=crop&w=1400&q=85";

const FINAL_PANEL_IMG =
  "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=2200&q=85";

const REAL_ESTATE_OPTIONS = [
  { id: "01", label: "MASTERPLAN" },
  { id: "02", label: "LUXURY VILLAS" },
  { id: "03", label: "RESIDENTIAL SUITES" },
  { id: "04", label: "PRIVATE ESTATES" },
  { id: "05", label: "CLUBHOUSE & SPA" },
  { id: "06", label: "BOTANICAL GROUNDS" },
  { id: "07", label: "MODERN AMENITIES" },
  { id: "08", label: "SUSTAINABLE INFRASTRUCTURE" },
  { id: "09", label: "INVESTMENT PORTFOLIO" },
  { id: "10", label: "SCHEDULE A PRIVATE TOUR" },
];

export default function AboutSection() {
  const sectionRef = useRef(null);
  const trackRef = useRef(null);

  // Background Parallax Reference Grid (Pure Dark Charcoal)
  const bgGridRef = useRef(null);

  // Panel Container Refs for Precision containerAnimation ScrollTriggers
  const heroPanelRef = useRef(null);
  const galleryPanelRef = useRef(null);
  const mobGalleryPanelRef = useRef(null);
  const stripPanelRef = useRef(null);
  const optionsPanelRef = useRef(null);
  const finalHeroPanelRef = useRef(null);

  // Panel Unified Content Container Parallax Refs
  const card1Ref = useRef(null);
  const card3Ref = useRef(null);
  const journeyCardRef = useRef(null);

  // Panel 2 First Hero Imagery Parallax Refs
  const imgZoomRef = useRef(null);
  const heroBadgeRef = useRef(null);

  // Panel 4 Gallery Multi-Layer Parallax Refs (Desktop + Mobile)
  const galleryImg1Ref = useRef(null);
  const galleryImg2Ref = useRef(null);
  const galleryImg3Ref = useRef(null);
  const mobGalleryImg1Ref = useRef(null);
  const mobGalleryImg2Ref = useRef(null);

  // Post-Journey Overlapping Composition Parallax Refs
  const stripBaseImgRef = useRef(null);
  const stripOverlapImgRef = useRef(null);
  const stripHeroBadgeRef = useRef(null);

  // Full-Screen Options List Ref
  const optionsListRef = useRef(null);

  // Final Image Panel Parallax Refs
  const finalImgZoomRef = useRef(null);
  const finalHeroBadgeRef = useRef(null);

  useGSAP(
    () => {
      const section = sectionRef.current;
      const track = trackRef.current;
      if (!section || !track) return;

      const getScrollAmount = () => track.scrollWidth - window.innerWidth;

      // ── 1. Main Foreground Horizontal Pin & Master Scroll Tween ──
      const scrollTween = gsap.to(track, {
        x: () => -getScrollAmount(),
        ease: "none",
        scrollTrigger: {
          trigger: section,
          start: "top top",
          end: () => `+=${getScrollAmount() * 1.25}`,
          pin: true,
          scrub: 1,
          anticipatePin: 1,
          invalidateOnRefresh: true,
        },
      });

      // ── 2. Pure Dark Charcoal Architectural Coordinates Parallax (Speed 0.25x) ──
      if (bgGridRef.current) {
        gsap.to(bgGridRef.current, {
          x: () => -getScrollAmount() * 0.25,
          ease: "none",
          scrollTrigger: {
            trigger: section,
            start: "top top",
            end: () => `+=${getScrollAmount() * 1.25}`,
            scrub: 1,
          },
        });
      }

      // ── 3. Responsive Multi-Plane Parallax Engine with matchMedia ──
      const mm = gsap.matchMedia();

      // ══════════════════════════════════════════════════════════════════════
      // DESKTOP (>= 1024px): Precision Container-Bound Multi-Axis Parallax
      // ══════════════════════════════════════════════════════════════════════
      mm.add("(min-width: 1024px)", () => {
        // ── Text Cards Parallax ──
        if (card1Ref.current) {
          gsap.to(card1Ref.current, {
            x: -30,
            ease: "none",
            scrollTrigger: {
              trigger: section,
              start: "top top",
              end: () => `+=${getScrollAmount() * 1.25}`,
              scrub: 1.1,
            },
          });
        }

        if (card3Ref.current) {
          gsap.to(card3Ref.current, {
            x: -35,
            ease: "none",
            scrollTrigger: {
              trigger: section,
              start: "top top",
              end: () => `+=${getScrollAmount() * 1.25}`,
              scrub: 1.2,
            },
          });
        }

        if (journeyCardRef.current) {
          gsap.to(journeyCardRef.current, {
            x: -40,
            ease: "none",
            scrollTrigger: {
              trigger: section,
              start: "top top",
              end: () => `+=${getScrollAmount() * 1.25}`,
              scrub: 1.2,
            },
          });
        }

        // ── 1. Hero Salon Photography Parallax ──
        if (heroPanelRef.current && imgZoomRef.current) {
          gsap.fromTo(
            imgZoomRef.current,
            { scale: 1.05, x: 40 },
            {
              scale: 1.22,
              x: -50,
              ease: "none",
              scrollTrigger: {
                trigger: heroPanelRef.current,
                containerAnimation: scrollTween,
                start: "left right",
                end: "right left",
                scrub: 1,
              },
            }
          );
        }

        if (heroPanelRef.current && heroBadgeRef.current) {
          gsap.fromTo(
            heroBadgeRef.current,
            { x: -20, y: 10 },
            {
              x: 35,
              y: -10,
              ease: "none",
              scrollTrigger: {
                trigger: heroPanelRef.current,
                containerAnimation: scrollTween,
                start: "left right",
                end: "right left",
                scrub: 1.2,
              },
            }
          );
        }

        // ── 2. Curated 3-Image Gallery Parallax ──
        if (galleryPanelRef.current) {
          if (galleryImg1Ref.current) {
            gsap.fromTo(
              galleryImg1Ref.current,
              { y: 45, x: -25 },
              {
                y: -45,
                x: 25,
                ease: "none",
                scrollTrigger: {
                  trigger: galleryPanelRef.current,
                  containerAnimation: scrollTween,
                  start: "left right",
                  end: "right left",
                  scrub: 1.2,
                },
              }
            );
          }

          if (galleryImg2Ref.current) {
            gsap.fromTo(
              galleryImg2Ref.current,
              { y: -50, x: 30, scale: 0.97 },
              {
                y: 50,
                x: -30,
                scale: 1.08,
                ease: "none",
                scrollTrigger: {
                  trigger: galleryPanelRef.current,
                  containerAnimation: scrollTween,
                  start: "left right",
                  end: "right left",
                  scrub: 1.4,
                },
              }
            );
          }

          if (galleryImg3Ref.current) {
            gsap.fromTo(
              galleryImg3Ref.current,
              { y: 40, x: 20, scale: 0.98 },
              {
                y: -40,
                x: -20,
                scale: 1.06,
                ease: "none",
                scrollTrigger: {
                  trigger: galleryPanelRef.current,
                  containerAnimation: scrollTween,
                  start: "left right",
                  end: "right left",
                  scrub: 1.1,
                },
              }
            );
          }
        }

        // ── 3. Post-Journey Full-Bleed & Desktop Overlapping Parallax ──
        if (stripPanelRef.current) {
          if (stripBaseImgRef.current) {
            gsap.fromTo(
              stripBaseImgRef.current,
              { scale: 1.05, x: 50 },
              {
                scale: 1.22,
                x: -50,
                ease: "none",
                scrollTrigger: {
                  trigger: stripPanelRef.current,
                  containerAnimation: scrollTween,
                  start: "left right",
                  end: "right left",
                  scrub: 1,
                },
              }
            );
          }

          if (stripOverlapImgRef.current) {
            gsap.fromTo(
              stripOverlapImgRef.current,
              { y: -55, x: 30, scale: 0.96 },
              {
                y: 55,
                x: -30,
                scale: 1.08,
                ease: "none",
                scrollTrigger: {
                  trigger: stripPanelRef.current,
                  containerAnimation: scrollTween,
                  start: "left right",
                  end: "right left",
                  scrub: 1.3,
                },
              }
            );
          }

          if (stripHeroBadgeRef.current) {
            gsap.fromTo(
              stripHeroBadgeRef.current,
              { x: -25, y: 10 },
              {
                x: 35,
                y: -10,
                ease: "none",
                scrollTrigger: {
                  trigger: stripPanelRef.current,
                  containerAnimation: scrollTween,
                  start: "left right",
                  end: "right left",
                  scrub: 1.2,
                },
              }
            );
          }
        }

        // ── 4. Full-Screen Options Directory Parallax ──
        if (optionsPanelRef.current && optionsListRef.current) {
          gsap.fromTo(
            optionsListRef.current,
            { y: 25, opacity: 0.92 },
            {
              y: -20,
              opacity: 1,
              ease: "none",
              scrollTrigger: {
                trigger: optionsPanelRef.current,
                containerAnimation: scrollTween,
                start: "left right",
                end: "right left",
                scrub: 1.1,
              },
            }
          );
        }

        // ── 5. Final Hero Image Panel Parallax (Just like the first image) ──
        if (finalHeroPanelRef.current && finalImgZoomRef.current) {
          gsap.fromTo(
            finalImgZoomRef.current,
            { scale: 1.05, x: 45 },
            {
              scale: 1.22,
              x: -50,
              ease: "none",
              scrollTrigger: {
                trigger: finalHeroPanelRef.current,
                containerAnimation: scrollTween,
                start: "left right",
                end: "right left",
                scrub: 1,
              },
            }
          );
        }

        if (finalHeroPanelRef.current && finalHeroBadgeRef.current) {
          gsap.fromTo(
            finalHeroBadgeRef.current,
            { x: -20, y: 10 },
            {
              x: 35,
              y: -10,
              ease: "none",
              scrollTrigger: {
                trigger: finalHeroPanelRef.current,
                containerAnimation: scrollTween,
                start: "left right",
                end: "right left",
                scrub: 1.2,
              },
            }
          );
        }
      });

      // ══════════════════════════════════════════════════════════════════════
      // MOBILE (< 1024px): 100% Dead-Center Stability + Precision Active Parallax
      // ══════════════════════════════════════════════════════════════════════
      mm.add("(max-width: 1023px)", () => {
        // Hero Salon Photo
        if (heroPanelRef.current && imgZoomRef.current) {
          gsap.fromTo(
            imgZoomRef.current,
            { scale: 1.04 },
            {
              scale: 1.16,
              ease: "none",
              scrollTrigger: {
                trigger: heroPanelRef.current,
                containerAnimation: scrollTween,
                start: "left right",
                end: "right left",
                scrub: 1,
              },
            }
          );
        }

        // Mobile 2-Image Gallery Parallax
        if (mobGalleryPanelRef.current) {
          if (mobGalleryImg1Ref.current) {
            gsap.fromTo(
              mobGalleryImg1Ref.current,
              { y: 30 },
              {
                y: -30,
                ease: "none",
                scrollTrigger: {
                  trigger: mobGalleryPanelRef.current,
                  containerAnimation: scrollTween,
                  start: "left right",
                  end: "right left",
                  scrub: 1.2,
                },
              }
            );
          }

          if (mobGalleryImg2Ref.current) {
            gsap.fromTo(
              mobGalleryImg2Ref.current,
              { y: -30, scale: 0.98 },
              {
                y: 35,
                scale: 1.05,
                ease: "none",
                scrollTrigger: {
                  trigger: mobGalleryPanelRef.current,
                  containerAnimation: scrollTween,
                  start: "left right",
                  end: "right left",
                  scrub: 1.4,
                },
              }
            );
          }
        }

        // Post-Journey Full-Bleed Photo
        if (stripPanelRef.current && stripBaseImgRef.current) {
          gsap.fromTo(
            stripBaseImgRef.current,
            { scale: 1.04 },
            {
              scale: 1.15,
              ease: "none",
              scrollTrigger: {
                trigger: stripPanelRef.current,
                containerAnimation: scrollTween,
                start: "left right",
                end: "right left",
                scrub: 1,
              },
            }
          );
        }

        // Final Hero Image Photo on Mobile
        if (finalHeroPanelRef.current && finalImgZoomRef.current) {
          gsap.fromTo(
            finalImgZoomRef.current,
            { scale: 1.04 },
            {
              scale: 1.16,
              ease: "none",
              scrollTrigger: {
                trigger: finalHeroPanelRef.current,
                containerAnimation: scrollTween,
                start: "left right",
                end: "right left",
                scrub: 1,
              },
            }
          );
        }
      });

      // ── 4. Touch & Horizontal Swipe Gesture Support (Mobile & Trackpad) ──
      let touchStartX = 0;
      let touchStartY = 0;
      let touchLastX = 0;
      let isHorizontalGesture = false;

      const handleTouchStart = (e) => {
        if (!e.touches || e.touches.length === 0) return;
        touchStartX = e.touches[0].clientX;
        touchStartY = e.touches[0].clientY;
        touchLastX = touchStartX;
        isHorizontalGesture = false;
      };

      const handleTouchMove = (e) => {
        if (!e.touches || e.touches.length === 0) return;
        const currentX = e.touches[0].clientX;
        const currentY = e.touches[0].clientY;
        const diffX = touchStartX - currentX;
        const diffY = touchStartY - currentY;

        // Detect if the user is swiping horizontally
        if (!isHorizontalGesture && (Math.abs(diffX) > 6 || Math.abs(diffY) > 6)) {
          if (Math.abs(diffX) > Math.abs(diffY) * 0.7) {
            isHorizontalGesture = true;
          }
        }

        if (isHorizontalGesture) {
          const deltaX = touchLastX - currentX;
          touchLastX = currentX;

          if (deltaX !== 0) {
            window.scrollBy({
              top: deltaX * 1.5,
              behavior: "instant",
            });
          }
        }
      };

      const handleWheel = (e) => {
        // Translate horizontal trackpad swipes (deltaX) into vertical scroll for horizontal pin
        if (Math.abs(e.deltaX) > Math.abs(e.deltaY) && Math.abs(e.deltaX) > 1) {
          window.scrollBy({
            top: e.deltaX * 1.2,
            behavior: "instant",
          });
        }
      };

      section.addEventListener("touchstart", handleTouchStart, { passive: true });
      section.addEventListener("touchmove", handleTouchMove, { passive: true });
      section.addEventListener("wheel", handleWheel, { passive: true });

      return () => {
        section.removeEventListener("touchstart", handleTouchStart);
        section.removeEventListener("touchmove", handleTouchMove);
        section.removeEventListener("wheel", handleWheel);
      };
    },
    { scope: sectionRef }
  );

  return (
    <section
      ref={sectionRef}
      className="relative w-full h-screen h-[100dvh] bg-[#17171a] text-white overflow-hidden select-none font-sans"
      style={{ touchAction: "pan-y pan-x" }}
      id="about"
    >
      {/* ════════════════════════════════════════════════════════════════ */}
      {/* PURE DARK CHARCOAL BACKGROUND PARALLAX (CLEAN & MINIMALIST)      */}
      {/* ════════════════════════════════════════════════════════════════ */}
      <div
        ref={bgGridRef}
        className="absolute inset-y-0 left-0 w-[320vw] pointer-events-none z-0 will-change-transform opacity-20 hidden lg:flex items-center justify-between px-12"
      >
        <div className="h-full w-full bg-[radial-gradient(rgba(255,255,255,0.08)_1px,transparent_1px)] [background-size:48px_48px]" />
        <div className="absolute top-12 left-24 text-[10px] font-mono tracking-[0.3em] text-white/30 uppercase">
          COORD: 40°02&apos;03&quot;N 76°30&apos;16&quot;W • ELEV 240M
        </div>
        <div className="absolute bottom-12 left-1/3 text-[10px] font-mono tracking-[0.3em] text-white/20 uppercase">
          MASTERPLAN MASTER REF • SEC. A-18
        </div>
        <div className="absolute top-16 left-2/3 text-[10px] font-mono tracking-[0.3em] text-white/25 uppercase">
          BOTANICAL CANOPY ZONE • FIRST KEY ESTATE
        </div>
      </div>

      {/* ── PINNED FOREGROUND HORIZONTAL SCROLL TRACK (Moves at 1.0x speed) ── */}
      <div
        ref={trackRef}
        className="relative z-10 flex h-full w-max flex-nowrap will-change-transform"
      >
        {/* ════════════════════════════════════════════════════════════════ */}
        {/* PANEL 1: EDITORIAL TYPOGRAPHY (DEAD CENTER ON MOBILE & DESKTOP) */}
        {/* ════════════════════════════════════════════════════════════════ */}
        <div className="relative w-screen lg:w-[50vw] h-full flex flex-col items-center justify-center p-5 xs:p-6 sm:p-10 lg:p-16 xl:p-20 bg-[#17171a] shrink-0 overflow-hidden text-center">
          <div
            ref={card1Ref}
            className="relative z-10 w-full max-w-[88vw] xs:max-w-sm sm:max-w-md lg:max-w-xl xl:max-w-2xl mx-auto flex flex-col items-center text-center will-change-transform"
          >
            {/* Top Label */}
            <div className="mb-3 xs:mb-4 sm:mb-6">
              <span className="text-[11px] xs:text-xs sm:text-sm font-bold tracking-[0.3em] sm:tracking-[0.35em] text-[#c9a96e] uppercase">
                FIRSTKEY HOUSING ESTATE
              </span>
            </div>

            {/* Grand Bold Headline */}
            <div className="text-3xl xs:text-4xl sm:text-5xl lg:text-[4.2rem] xl:text-[4.8rem] font-black leading-[0.98] sm:leading-[0.93] tracking-tight uppercase text-[#c9a96e] select-none space-y-1 sm:space-y-0.5 flex flex-col items-center mb-4 sm:mb-6">
              {/* Line 1: DISC◎VER */}
              <div className="flex items-center justify-center">
                <span>DISC</span>
                <span className="inline-flex items-center justify-center relative w-[0.84em] h-[0.84em] mx-[0.06em] border-[2.5px] border-current rounded-full">
                  <span className="w-[0.44em] h-[0.44em] border-[2px] border-current rounded-full" />
                </span>
                <span>VER</span>
              </div>

              {/* Line 2: 18TH */}
              <div>
                <span>18TH</span>
              </div>

              {/* Line 3: CENTURY */}
              <div>
                <span>CENTURY</span>
              </div>

              {/* Line 4: RURAL LIFE */}
              <div className="flex items-center justify-center space-x-2.5 xs:space-x-3.5 sm:space-x-4">
                <span className="tracking-tight">RURAL</span>
                <span className="tracking-normal flex items-baseline">
                  <span>L</span>
                  <span className="relative inline-block -mx-[0.05em] px-[0.05em] border-b-[2.5px] border-current pb-0.5">
                    I
                  </span>
                  <span>FE</span>
                </span>
              </div>

              {/* Line 5: IN PENN. */}
              <div>
                <span>IN PENN.</span>
              </div>
            </div>

            {/* Paragraph Description */}
            <p className="text-[11px] xs:text-xs sm:text-sm md:text-base text-white/90 font-medium leading-[1.7] max-w-xs xs:max-w-sm sm:max-w-lg mx-auto text-center">
              A historic house museum, the 1738 Wright&apos;s Ferry Mansion celebrates
              important examples of pre-1750 fine art, decorative arts, and architecture,
              as well as a multi-generational narrative reflective of Columbia,
              Pennsylvania, and its surrounding region.
            </p>
          </div>
        </div>

        {/* ════════════════════════════════════════════════════════════════ */}
        {/* PANEL 2: SINGLE FULL-HEIGHT ARCHITECTURAL PHOTOGRAPHY           */}
        {/* ════════════════════════════════════════════════════════════════ */}
        <div
          ref={heroPanelRef}
          className="relative w-screen lg:w-[50vw] h-full overflow-hidden bg-[#121214] shrink-0"
        >
          <img
            ref={imgZoomRef}
            src={INTERIOR_IMG}
            alt="The Whispering Pines Living Space"
            className="w-full h-full object-cover object-center filter brightness-[0.95] contrast-105 will-change-transform origin-center scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#121214]/80 via-transparent to-[#121214]/20 pointer-events-none" />

          {/* Floating Aesthetic Tag with Parallax Float */}
          <div
            ref={heroBadgeRef}
            className="absolute bottom-6 sm:bottom-8 left-6 sm:left-8 z-20 will-change-transform"
          >
            <span className="text-[10px] font-mono tracking-widest text-[#c9a96e] uppercase bg-[#17171a]/90 backdrop-blur-md px-3 py-1.5 rounded border border-[#c9a96e]/30">
              FIG. 1.0 — THE HEIRLOOM SALON
            </span>
          </div>

          {/* Scroll Prompt on desktop */}
          <div className="absolute bottom-8 right-8 z-20 hidden lg:flex items-center space-x-2 text-[10px] font-mono tracking-widest text-white/60 bg-[#17171a]/80 backdrop-blur-md px-3 py-1.5 rounded-full border border-white/15">
            <span>SCROLL TO WHO WE ARE</span>
            <span>→</span>
          </div>
        </div>

        {/* ════════════════════════════════════════════════════════════════ */}
        {/* PANEL 3: "WHO ARE WE?" (DEAD CENTER ON MOBILE & DESKTOP)         */}
        {/* ════════════════════════════════════════════════════════════════ */}
        <div className="relative w-screen lg:w-[50vw] h-full flex flex-col items-center justify-center p-5 xs:p-6 sm:p-10 lg:p-16 xl:p-20 bg-[#17171a] shrink-0 overflow-hidden text-center">
          <div
            ref={card3Ref}
            className="relative z-10 w-full max-w-[88vw] xs:max-w-sm sm:max-w-md lg:max-w-xl xl:max-w-2xl mx-auto flex flex-col items-center text-center will-change-transform"
          >
            {/* Top Label with Centered Gold Accent */}
            <div className="mb-3 xs:mb-4 sm:mb-6 flex items-center justify-center space-x-3">
              <span className="w-6 sm:w-10 h-[2px] bg-[#c9a96e]" />
              <span className="text-[11px] xs:text-xs sm:text-sm font-bold tracking-[0.3em] sm:tracking-[0.35em] text-[#c9a96e] uppercase whitespace-nowrap">
                WHO ARE WE?
              </span>
              <span className="w-6 sm:w-10 h-[2px] bg-[#c9a96e]" />
            </div>

            {/* Grand Bold Unified Display Headline */}
            <h2 className="text-2xl xs:text-3xl sm:text-4xl lg:text-[3.2rem] xl:text-[3.8rem] font-black leading-[1.08] tracking-tight uppercase text-white mb-3 xs:mb-4 sm:mb-6">
              THE WHISPERING PINES <br />
              <span className="text-[#c9a96e] font-black text-xl xs:text-2xl sm:text-3xl lg:text-[2.7rem] xl:text-[3.3rem] block mt-1 sm:mt-2">
                BY FIRST KEY ESTATE
              </span>
            </h2>

            {/* Exact Paragraph Provided by User */}
            <p className="text-[11px] xs:text-xs sm:text-sm md:text-base text-white/90 font-medium leading-[1.7] sm:leading-[1.8] max-w-xs xs:max-w-sm sm:max-w-lg mx-auto text-center">
              First Key Estate is dedicated to creating thoughtfully designed communities that combine modern living with lasting value. The Whispering Pines reflects this vision, offering a peaceful residential environment surrounded by nature, quality craftsmanship, and contemporary amenities. Every home is planned with attention to detail, ensuring comfort, functionality, and an exceptional lifestyle for homeowners and investors alike.
            </p>
          </div>
        </div>

        {/* ════════════════════════════════════════════════════════════════ */}
        {/* DESKTOP (>= 1024px): 3-IMAGE GALLERY (OFF-WHITE CANVAS)          */}
        {/* ════════════════════════════════════════════════════════════════ */}
        <div
          ref={galleryPanelRef}
          className="hidden lg:flex relative w-[65vw] xl:w-[60vw] h-full items-center justify-center p-10 lg:p-14 xl:p-16 bg-[#f8f7f4] text-[#17171a] shrink-0"
        >
          <div className="w-full h-full max-h-[82vh] flex items-center justify-center gap-10 xl:gap-14 my-auto">
            
            {/* Left: 2 Overlapping Images */}
            <div className="relative w-[56%] h-[85%] flex items-center justify-center">
              {/* Base Image 1 */}
              <div
                ref={galleryImg1Ref}
                className="relative w-[84%] h-[82%] rounded-2xl overflow-hidden shadow-[0_20px_60px_rgba(23,23,26,0.14)] border border-[#17171a]/10 z-10 will-change-transform"
              >
                <img
                  src={GALLERY_IMG_1}
                  alt="The Whispering Pines Grand Residence"
                  className="w-full h-full object-cover object-center filter brightness-[0.96]"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#17171a]/70 via-transparent to-transparent pointer-events-none" />
                <div className="absolute bottom-4 left-4 z-20">
                  <span className="text-[10px] font-mono tracking-widest text-[#c9a96e] uppercase bg-[#17171a]/90 backdrop-blur-md px-2.5 py-1 rounded border border-[#c9a96e]/40">
                    01 / RESIDENCE
                  </span>
                </div>
              </div>

              {/* Overlapping Image 2 */}
              <div
                ref={galleryImg2Ref}
                className="absolute -bottom-4 -right-5 w-[58%] h-[56%] rounded-xl overflow-hidden shadow-[0_30px_70px_rgba(23,23,26,0.22)] border-2 border-[#c9a96e] z-20 bg-[#f8f7f4] will-change-transform"
              >
                <img
                  src={GALLERY_IMG_2}
                  alt="The Whispering Pines Interior Pavilion"
                  className="w-full h-full object-cover object-center filter brightness-[0.98]"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#17171a]/70 via-transparent to-transparent pointer-events-none" />
                <div className="absolute bottom-3 left-3 z-20">
                  <span className="text-[9px] font-mono tracking-widest text-white uppercase bg-[#17171a]/90 backdrop-blur-md px-2 py-0.5 rounded border border-white/30">
                    02 / LIVING
                  </span>
                </div>
              </div>
            </div>

            {/* Right: 3rd Smaller Image */}
            <div className="relative w-[30%] h-[60%] flex flex-col justify-center">
              <div
                ref={galleryImg3Ref}
                className="relative w-full h-[80%] rounded-xl overflow-hidden shadow-[0_15px_45px_rgba(23,23,26,0.12)] border border-[#17171a]/10 will-change-transform"
              >
                <img
                  src={GALLERY_IMG_3}
                  alt="The Whispering Pines Botanical Grounds"
                  className="w-full h-full object-cover object-center filter brightness-[0.96]"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#17171a]/70 via-transparent to-transparent pointer-events-none" />
                <div className="absolute bottom-3 left-3 z-20">
                  <span className="text-[10px] font-mono tracking-widest text-[#c9a96e] uppercase bg-[#17171a]/90 backdrop-blur-md px-2.5 py-1 rounded border border-[#c9a96e]/40">
                    03 / SANCTUARY
                  </span>
                </div>
              </div>

              <div className="pt-2.5 flex items-center justify-between">
                <span className="text-[11px] font-mono tracking-[0.2em] text-[#17171a]/70 font-semibold uppercase">
                  ESTATE GROUNDS
                </span>
                <span className="text-[11px] font-mono text-[#9e7d3b] font-bold tracking-widest">
                  [FIG. 2.2]
                </span>
              </div>
            </div>

          </div>
        </div>

        {/* ════════════════════════════════════════════════════════════════ */}
        {/* MOBILE (< 1024px): 2 OVERLAPPING IMAGES (OFF-WHITE CANVAS)       */}
        {/* ════════════════════════════════════════════════════════════════ */}
        <div
          ref={mobGalleryPanelRef}
          className="flex lg:hidden relative w-screen h-full items-center justify-center p-5 xs:p-7 bg-[#f8f7f4] text-[#17171a] shrink-0"
        >
          <div className="relative w-full h-full max-h-[75vh] xs:max-h-[80vh] flex items-center justify-center my-auto">
            
            {/* Base Image 1 (Residence Exterior) */}
            <div
              ref={mobGalleryImg1Ref}
              className="relative w-[82%] xs:w-[80%] h-[78%] xs:h-[76%] rounded-2xl overflow-hidden shadow-[0_20px_50px_rgba(23,23,26,0.14)] border border-[#17171a]/10 z-10 will-change-transform"
            >
              <img
                src={GALLERY_IMG_1}
                alt="The Whispering Pines Grand Residence"
                className="w-full h-full object-cover object-center filter brightness-[0.96]"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#17171a]/70 via-transparent to-transparent pointer-events-none" />
              <div className="absolute bottom-3 left-3 z-20">
                <span className="text-[9px] font-mono tracking-widest text-[#c9a96e] uppercase bg-[#17171a]/90 backdrop-blur-md px-2.5 py-1 rounded border border-[#c9a96e]/40">
                  01 / RESIDENCE
                </span>
              </div>
            </div>

            {/* Overlapping Image 2 (Living Sanctuary - Offset Bottom-Right) */}
            <div
              ref={mobGalleryImg2Ref}
              className="absolute -bottom-3 -right-2 xs:-bottom-4 xs:-right-4 w-[62%] xs:w-[60%] h-[52%] xs:h-[50%] rounded-2xl overflow-hidden shadow-[0_25px_60px_rgba(23,23,26,0.22)] border-2 border-[#c9a96e] z-20 bg-[#f8f7f4] will-change-transform"
            >
              <img
                src={GALLERY_IMG_2}
                alt="The Whispering Pines Interior Pavilion"
                className="w-full h-full object-cover object-center filter brightness-[0.98]"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#17171a]/70 via-transparent to-transparent pointer-events-none" />
              <div className="absolute bottom-3 left-3 z-20">
                <span className="text-[9px] font-mono tracking-widest text-white uppercase bg-[#17171a]/90 backdrop-blur-md px-2 py-0.5 rounded border border-white/30">
                  02 / LIVING
                </span>
              </div>
            </div>

          </div>
        </div>

        {/* ════════════════════════════════════════════════════════════════ */}
        {/* PANEL: "THE JOURNEY" (DEAD CENTER ON MOBILE & DESKTOP)           */}
        {/* ════════════════════════════════════════════════════════════════ */}
        <div className="relative w-screen lg:w-[68vw] xl:w-[62vw] h-full flex flex-col justify-center items-center p-5 xs:p-6 sm:p-10 lg:p-16 xl:p-20 bg-[#17171a] shrink-0 text-center overflow-hidden">
          <div
            ref={journeyCardRef}
            className="relative z-10 w-full max-w-[88vw] xs:max-w-sm sm:max-w-md lg:max-w-2xl xl:max-w-3xl mx-auto flex flex-col items-center text-center will-change-transform"
          >
            {/* Top Label */}
            <div className="mb-3 xs:mb-4 sm:mb-6 flex items-center justify-center space-x-3">
              <span className="w-6 sm:w-10 h-[2px] bg-[#c9a96e]" />
              <span className="text-[10px] xs:text-xs sm:text-sm font-bold tracking-[0.25em] sm:tracking-[0.35em] text-[#c9a96e] uppercase whitespace-nowrap">
                FIRST KEY ESTATE • 2000 — PRESENT
              </span>
              <span className="w-6 sm:w-10 h-[2px] bg-[#c9a96e]" />
            </div>

            {/* Grand Headline: THE JOURNEY */}
            <h2 className="text-3xl xs:text-4xl sm:text-5xl lg:text-[4.2rem] xl:text-[4.8rem] font-black uppercase text-white leading-[1.0] sm:leading-[0.98] tracking-tight mb-3 xs:mb-4 sm:mb-6">
              THE JOURNEY
            </h2>

            {/* Comprehensive Multi-Era Journey Narrative */}
            <div className="space-y-2.5 xs:space-y-3 sm:space-y-4 text-[11px] xs:text-xs sm:text-sm md:text-[1.05rem] text-white/90 font-medium leading-[1.65] sm:leading-[1.8] max-w-xs xs:max-w-sm sm:max-w-xl mx-auto text-center">
              <p>
                Founded at the turn of the millennium in 2000, First Key Estate was born with a single enduring mission: to create thoughtfully designed residential communities that combine modern living with lasting value and architectural integrity.
              </p>
              <p className="text-white/80">
                Over the past two decades, our journey expanded from boutique residential enclaves to comprehensive masterplanned developments. We pioneered nature-integrated planning, preserving mature green landscapes and incorporating sustainable infrastructure, quality craftsmanship, and contemporary amenities across every project.
              </p>
              <p className="text-[#c9a96e] font-semibold">
                Today, that vision culminates in flagship sanctuary retreats like The Whispering Pines—providing homeowners and investors with peaceful living environments, unmatched comfort, and a lasting generational legacy.
              </p>
            </div>

          </div>
        </div>

        {/* ════════════════════════════════════════════════════════════════ */}
        {/* PANEL: POST-JOURNEY ARCHITECTURAL STRIP                          */}
        {/* (Mobile: Pure full-bleed image | Desktop: Center overlapping)    */}
        {/* ════════════════════════════════════════════════════════════════ */}
        <div
          ref={stripPanelRef}
          className="relative w-screen lg:w-[50vw] xl:w-[50vw] h-full overflow-visible bg-[#121214] shrink-0"
        >
          {/* ── Main Big Image (Touches Top and Bottom 100%) ── */}
          <div className="relative w-full h-full overflow-hidden">
            <img
              ref={stripBaseImgRef}
              src={STRIP_IMG}
              alt="The Whispering Pines Architectural Estate"
              className="w-full h-full object-cover object-center filter brightness-[0.95] contrast-105 will-change-transform origin-center scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#121214]/80 via-transparent to-[#121214]/20 pointer-events-none" />

            {/* Floating Aesthetic Tag on Main Photo */}
            <div
              ref={stripHeroBadgeRef}
              className="absolute bottom-6 sm:bottom-8 right-6 sm:right-8 z-20 will-change-transform"
            >
              <span className="text-[10px] font-mono tracking-widest text-[#c9a96e] uppercase bg-[#17171a]/90 backdrop-blur-md px-3 py-1.5 rounded border border-[#c9a96e]/30">
                FIG. 2.0 — ARCHITECTURAL HORIZONS
              </span>
            </div>
          </div>

          {/* ── Small Image: DESKTOP ONLY (hidden lg:block on mobile to prevent cutoffs) ── */}
          <div
            ref={stripOverlapImgRef}
            className="hidden lg:block absolute top-1/2 -translate-y-1/2 -left-28 xl:-left-32 w-[28vw] xl:w-[25vw] h-[52vh] rounded-2xl overflow-hidden shadow-[0_30px_80px_rgba(0,0,0,0.9)] z-30 bg-[#121214] will-change-transform"
          >
            <img
              src={OVERLAP_SMALL_IMG}
              alt="The Whispering Pines Pavilion Living"
              className="w-full h-full object-cover object-center filter brightness-[0.98]"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-transparent to-transparent pointer-events-none" />
            
            {/* Badge on Small Photo */}
            <div className="absolute bottom-3 left-3 z-20">
              <span className="text-[8px] xs:text-[9px] font-mono tracking-widest text-[#c9a96e] uppercase bg-[#17171a]/95 backdrop-blur-md px-2.5 py-1 rounded border border-[#c9a96e]/40 shadow-lg">
                02 / PAVILION
              </span>
            </div>
          </div>

        </div>

        {/* ════════════════════════════════════════════════════════════════ */}
        {/* PANEL: FULL-SCREEN CURATED REAL ESTATE DIRECTORY (DEAD CENTER)    */}
        {/* ════════════════════════════════════════════════════════════════ */}
        <div
          ref={optionsPanelRef}
          className="relative w-screen h-full h-[100dvh] flex flex-col items-center justify-center px-4 xs:px-6 sm:px-14 lg:px-24 xl:px-32 py-5 xs:py-7 sm:py-10 lg:py-12 bg-[#f4f3ef] text-[#17171a] shrink-0 select-none overflow-hidden"
        >
          <div
            ref={optionsListRef}
            className="w-full max-w-[92vw] xs:max-w-[90vw] sm:max-w-xl lg:max-w-5xl xl:max-w-6xl 2xl:max-w-7xl mx-auto flex flex-col justify-between h-[84vh] xs:h-[86vh] lg:h-[82vh] max-h-[800px] my-auto will-change-transform"
          >
            {REAL_ESTATE_OPTIONS.map((item, index) => (
              <div
                key={item.id}
                className={`group flex items-center py-2 xs:py-2.5 sm:py-3.5 md:py-4 lg:py-4.5 border-t border-[#17171a]/15 cursor-pointer transition-colors duration-300 hover:bg-[#17171a]/[0.02] w-full flex-1 ${
                  index === REAL_ESTATE_OPTIONS.length - 1 ? "border-b" : ""
                }`}
              >
                {/* Index Number */}
                <span className="w-8 xs:w-10 sm:w-16 lg:w-24 text-[10.5px] xs:text-xs sm:text-base font-mono font-medium text-[#17171a]/50 group-hover:text-[#9e7d3b] transition-colors duration-200 shrink-0">
                  {item.id}
                </span>

                {/* Option Title */}
                <span className="text-[1.25rem] xs:text-[1.45rem] sm:text-2xl md:text-3xl lg:text-[2.85rem] xl:text-[3.4rem] 2xl:text-[3.8rem] font-serif uppercase tracking-[0.02em] text-[#17171a] font-normal leading-none group-hover:translate-x-2 sm:group-hover:translate-x-6 group-hover:text-[#9e7d3b] transition-all duration-300 flex-1 truncate xs:whitespace-normal">
                  {item.label}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* ════════════════════════════════════════════════════════════════ */}
        {/* PANEL: FINAL ARCHITECTURAL PHOTO STRIP (SECTION FINALE)          */}
        {/* ════════════════════════════════════════════════════════════════ */}
        <div
          ref={finalHeroPanelRef}
          className="relative w-screen h-full h-[100dvh] overflow-hidden bg-[#121214] shrink-0"
        >
          <img
            ref={finalImgZoomRef}
            src={FINAL_PANEL_IMG}
            alt="The Whispering Pines Grand Twilight Sanctuary"
            className="w-full h-full object-cover object-center filter brightness-[0.95] contrast-105 will-change-transform origin-center scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#121214]/80 via-transparent to-[#121214]/20 pointer-events-none" />

          {/* Floating Aesthetic Tag with Parallax Float */}
          <div
            ref={finalHeroBadgeRef}
            className="absolute bottom-6 sm:bottom-8 left-6 sm:left-8 z-20 will-change-transform"
          >
            <span className="text-[10px] font-mono tracking-widest text-[#c9a96e] uppercase bg-[#17171a]/90 backdrop-blur-md px-3 py-1.5 rounded border border-[#c9a96e]/30">
              FIG. 3.0 — ESTATE LEGACY &amp; SANCTUARY
            </span>
          </div>

          {/* Scroll Transition Prompt */}
          <div className="absolute bottom-8 right-8 z-20 hidden lg:flex items-center space-x-2 text-[10px] font-mono tracking-widest text-white/60 bg-[#17171a]/80 backdrop-blur-md px-3 py-1.5 rounded-full border border-white/15">
            <span>SCROLL TO TESTIMONIALS</span>
            <span>↓</span>
          </div>
        </div>

      </div>
    </section>
  );
}
