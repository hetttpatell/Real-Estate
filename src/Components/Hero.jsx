import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "../utils/useGSAP";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const BG_IMAGE = "/Images/background-image.webp";
const BUILDING_IMAGE = "/Images/building iamge.webp";
const CLOUD_IMAGE = "/Images/cloud.webp";
const SMOKE_IMAGE = "/Images/smoke.webp";


export default function Hero({ startEntrance = false }) {
  const pinWrapperRef = useRef(null);
  const stickyRef = useRef(null);
  const buildingRef = useRef(null);
  const headlineRef = useRef(null);
  const smokeTransitionRef = useRef(null);

  // Multi-plane cloud ecosystem (13 depth layers)
  const cloudSkyTopLeftRef = useRef(null);
  const cloudSkyTopRightRef = useRef(null);
  const cloudTopCrownRef = useRef(null);
  const cloudLeftLowRef = useRef(null);
  const cloudLeftHighRef = useRef(null);
  const cloudRightLowRef = useRef(null);
  const cloudRightHighRef = useRef(null);
  const cloudBackCenterRef = useRef(null);
  const cloudMidCenterFlankRef = useRef(null);
  const cloudFrontBaseRef = useRef(null);
  const cloudFrontMidRightRef = useRef(null);
  const cloudFrontMidLeftRef = useRef(null);
  const cloudFrontRooftopMistRef = useRef(null);

  // Track if this is a real first-visit loader entrance vs a refresh
  const isFirstVisitRef = useRef(!sessionStorage.getItem("hasVisited"));

  useGSAP(
    () => {
      const leftClouds = [
        cloudSkyTopLeftRef.current,
        cloudLeftHighRef.current,
        cloudLeftLowRef.current,
        cloudFrontMidLeftRef.current,
      ];

      const rightClouds = [
        cloudSkyTopRightRef.current,
        cloudRightHighRef.current,
        cloudRightLowRef.current,
        cloudFrontMidRightRef.current,
      ];

      const centerClouds = [
        cloudTopCrownRef.current,
        cloudBackCenterRef.current,
        cloudMidCenterFlankRef.current,
        cloudFrontRooftopMistRef.current,
        cloudFrontBaseRef.current,
      ];

      // Initial state before entrance runs (hidden underneath loader on first visit)
      if (!startEntrance) {
        gsap.set(headlineRef.current, { opacity: 0, y: -20, scale: 0.98 });
        gsap.set(buildingRef.current, { xPercent: -50, yPercent: 95, opacity: 0 });
        gsap.set(leftClouds, { opacity: 0, xPercent: -25 });
        gsap.set(rightClouds, { opacity: 0, xPercent: 25 });
        gsap.set(centerClouds, { opacity: 0, scale: 0.9 });
        gsap.set(smokeTransitionRef.current, { yPercent: 100, opacity: 0 });
        return;
      }

      const mm = gsap.matchMedia();

      // ── Desktop & Tablet View (>= 768px) ──
      mm.add("(min-width: 768px)", () => {
        // ── 1. Building Entrance Animation on Loader Reveal (Only on first visit) ──
        if (isFirstVisitRef.current) {
          const entranceTl = gsap.timeline({
            onComplete: () => {
              isFirstVisitRef.current = false;
            },
          });

          // Building rises up into lower resting position (68%)
          entranceTl.fromTo(
            buildingRef.current,
            { xPercent: -50, yPercent: 95, opacity: 0 },
            {
              opacity: 1,
              xPercent: -50,
              yPercent: 68,
              duration: 1.4,
              ease: "power3.out",
            },
            0
          );

          // Headline & Tagline fade in
          entranceTl.fromTo(
            headlineRef.current,
            { opacity: 0, y: -20, scale: 0.98 },
            {
              opacity: 1,
              y: 0,
              scale: 1,
              duration: 1.2,
              ease: "power2.out",
            },
            0.15
          );

          // Clouds sweep in with their designated rich opacities
          entranceTl.to(
            cloudSkyTopLeftRef.current,
            { opacity: 0.25, xPercent: 0, duration: 1.4, ease: "power2.out" },
            0.1
          );
          entranceTl.to(
            cloudLeftHighRef.current,
            { opacity: 0.32, xPercent: 0, duration: 1.5, ease: "power2.out" },
            0.15
          );
          entranceTl.to(
            cloudLeftLowRef.current,
            { opacity: 0.35, xPercent: 0, duration: 1.6, ease: "power2.out" },
            0.2
          );
          entranceTl.to(
            cloudFrontMidLeftRef.current,
            { opacity: 0.28, xPercent: 0, duration: 1.5, ease: "power2.out" },
            0.25
          );

          entranceTl.to(
            cloudSkyTopRightRef.current,
            { opacity: 0.26, xPercent: 0, duration: 1.4, ease: "power2.out" },
            0.1
          );
          entranceTl.to(
            cloudRightHighRef.current,
            { opacity: 0.3, xPercent: 0, duration: 1.5, ease: "power2.out" },
            0.15
          );
          entranceTl.to(
            cloudRightLowRef.current,
            { opacity: 0.34, xPercent: 0, duration: 1.6, ease: "power2.out" },
            0.2
          );
          entranceTl.to(
            cloudFrontMidRightRef.current,
            { opacity: 0.28, xPercent: 0, duration: 1.5, ease: "power2.out" },
            0.25
          );

          entranceTl.to(
            cloudTopCrownRef.current,
            { opacity: 0.3, scale: 1, duration: 1.3, ease: "power2.out" },
            0.2
          );
          entranceTl.to(
            cloudBackCenterRef.current,
            { opacity: 0.26, scale: 1, duration: 1.4, ease: "power2.out" },
            0.2
          );
          entranceTl.to(
            cloudMidCenterFlankRef.current,
            { opacity: 0.28, scale: 1, duration: 1.5, ease: "power2.out" },
            0.25
          );
          entranceTl.to(
            cloudFrontRooftopMistRef.current,
            { opacity: 0.26, scale: 1, duration: 1.4, ease: "power2.out" },
            0.3
          );
          entranceTl.to(
            cloudFrontBaseRef.current,
            { opacity: 0.32, scale: 1, duration: 1.6, ease: "power2.out" },
            0.35
          );
        } else {
          // Direct initialization on refresh / revisit (already visible, never hidden)
          gsap.set(buildingRef.current, { xPercent: -50, yPercent: 68, opacity: 1 });
          gsap.set(headlineRef.current, { opacity: 1, y: 0, scale: 1 });
          gsap.set(cloudSkyTopLeftRef.current, { opacity: 0.25, xPercent: 0 });
          gsap.set(cloudLeftHighRef.current, { opacity: 0.32, xPercent: 0 });
          gsap.set(cloudLeftLowRef.current, { opacity: 0.35, xPercent: 0 });
          gsap.set(cloudFrontMidLeftRef.current, { opacity: 0.28, xPercent: 0 });
          gsap.set(cloudSkyTopRightRef.current, { opacity: 0.26, xPercent: 0 });
          gsap.set(cloudRightHighRef.current, { opacity: 0.3, xPercent: 0 });
          gsap.set(cloudRightLowRef.current, { opacity: 0.34, xPercent: 0 });
          gsap.set(cloudFrontMidRightRef.current, { opacity: 0.28, xPercent: 0 });
          gsap.set(cloudTopCrownRef.current, { opacity: 0.3, scale: 1 });
          gsap.set(cloudBackCenterRef.current, { opacity: 0.26, scale: 1 });
          gsap.set(cloudMidCenterFlankRef.current, { opacity: 0.28, scale: 1 });
          gsap.set(cloudFrontRooftopMistRef.current, { opacity: 0.26, scale: 1 });
          gsap.set(cloudFrontBaseRef.current, { opacity: 0.32, scale: 1 });
          gsap.set(smokeTransitionRef.current, { yPercent: 100, opacity: 0 });
        }

        // ── 2. Pinned Scroll Parallax (Clouds stay visible, Smoke surges at ~90%) ──
        const scrollTl = gsap.timeline({
          scrollTrigger: {
            trigger: pinWrapperRef.current,
            start: "top top",
            end: "bottom bottom",
            pin: stickyRef.current,
            scrub: 0.7, // Snappier scrub for shorter scroll track
            anticipatePin: 1,
            invalidateOnRefresh: true,
          },
        });

        // Building rises gently from resting position (68%) to (38%) while guaranteeing 100% opacity and alignment
        scrollTl.fromTo(
          buildingRef.current,
          { xPercent: -50, yPercent: 68, opacity: 1 },
          {
            xPercent: -50,
            yPercent: 38,
            opacity: 1,
            ease: "none",
          },
          0
        );

        // Headline zooms smoothly forward
        scrollTl.fromTo(
          headlineRef.current,
          { opacity: 1, y: 0, scale: 1 },
          {
            opacity: 1,
            y: 0,
            scale: 1.4,
            ease: "none",
          },
          0
        );

        // Clouds stay visible, scale up & drift smoothly
        scrollTl.fromTo(
          [cloudSkyTopLeftRef.current, cloudSkyTopRightRef.current],
          { scale: 1, yPercent: 0 },
          {
            scale: 1.25,
            yPercent: -15,
            ease: "none",
          },
          0
        );

        scrollTl.fromTo(
          cloudTopCrownRef.current,
          { scale: 1, yPercent: 0 },
          {
            scale: 1.35,
            yPercent: -25,
            ease: "none",
          },
          0
        );

        scrollTl.fromTo(
          cloudLeftHighRef.current,
          { scale: 1, xPercent: 0, yPercent: 0 },
          {
            scale: 1.3,
            xPercent: -15,
            yPercent: -20,
            ease: "none",
          },
          0
        );

        scrollTl.fromTo(
          cloudLeftLowRef.current,
          { scale: 1, xPercent: 0, yPercent: 0 },
          {
            scale: 1.35,
            xPercent: -10,
            yPercent: -18,
            ease: "none",
          },
          0
        );

        scrollTl.fromTo(
          cloudRightHighRef.current,
          { scale: 1, xPercent: 0, yPercent: 0 },
          {
            scale: 1.3,
            xPercent: 15,
            yPercent: -22,
            ease: "none",
          },
          0
        );

        scrollTl.fromTo(
          cloudRightLowRef.current,
          { scale: 1, xPercent: 0, yPercent: 0 },
          {
            scale: 1.35,
            xPercent: 12,
            yPercent: -18,
            ease: "none",
          },
          0
        );

        scrollTl.fromTo(
          [cloudBackCenterRef.current, cloudMidCenterFlankRef.current],
          { scale: 1, yPercent: 0 },
          {
            scale: 1.25,
            yPercent: -15,
            ease: "none",
          },
          0
        );

        scrollTl.fromTo(
          cloudFrontMidLeftRef.current,
          { scale: 1, xPercent: 0, yPercent: 0 },
          {
            scale: 1.4,
            xPercent: -10,
            yPercent: -28,
            ease: "none",
          },
          0
        );

        scrollTl.fromTo(
          cloudFrontMidRightRef.current,
          { scale: 1, xPercent: 0, yPercent: 0 },
          {
            scale: 1.4,
            xPercent: 10,
            yPercent: -30,
            ease: "none",
          },
          0
        );

        scrollTl.fromTo(
          cloudFrontRooftopMistRef.current,
          { scale: 1, yPercent: 0 },
          {
            scale: 1.35,
            yPercent: -25,
            ease: "none",
          },
          0
        );

        scrollTl.fromTo(
          cloudFrontBaseRef.current,
          { scale: 1, yPercent: 0 },
          {
            scale: 1.45,
            yPercent: -35,
            ease: "none",
          },
          0
        );

        // ── Smoke transition surges from bottom at 50% parallax to cover full screen ──
        scrollTl.fromTo(
          smokeTransitionRef.current,
          { yPercent: 100, opacity: 0 },
          {
            yPercent: 0,
            opacity: 1,
            ease: "power1.inOut",
          },
          0.5
        );
      });

      // ── Mobile Portrait View (< 768px) ──
      mm.add("(max-width: 767px)", () => {
        // ── 1. Mobile Entrance Animation (Only on first visit) ──
        if (isFirstVisitRef.current) {
          const entranceTl = gsap.timeline({
            onComplete: () => {
              isFirstVisitRef.current = false;
            },
          });

          // Building rises to mobile resting position (45%)
          entranceTl.fromTo(
            buildingRef.current,
            { xPercent: -50, yPercent: 85, opacity: 0 },
            {
              opacity: 1,
              xPercent: -50,
              yPercent: 45,
              duration: 1.4,
              ease: "power3.out",
            },
            0
          );

          // Headline & Tagline fade in
          entranceTl.fromTo(
            headlineRef.current,
            { opacity: 0, y: -20, scale: 0.98 },
            {
              opacity: 1,
              y: 0,
              scale: 1,
              duration: 1.2,
              ease: "power2.out",
            },
            0.15
          );

          // Clouds sweep in from sides on mobile
          entranceTl.to(
            leftClouds,
            {
              opacity: 0.32,
              xPercent: 0,
              duration: 1.4,
              ease: "power2.out",
              stagger: 0.04,
            },
            0.1
          );

          entranceTl.to(
            rightClouds,
            {
              opacity: 0.32,
              xPercent: 0,
              duration: 1.4,
              ease: "power2.out",
              stagger: 0.04,
            },
            0.1
          );

          entranceTl.to(
            centerClouds,
            {
              opacity: 0.28,
              scale: 1,
              duration: 1.3,
              ease: "power2.out",
              stagger: 0.04,
            },
            0.15
          );
        } else {
          // Direct initialization on mobile refresh / revisit
          gsap.set(buildingRef.current, { xPercent: -50, yPercent: 45, opacity: 1 });
          gsap.set(headlineRef.current, { opacity: 1, y: 0, scale: 1 });
          gsap.set(leftClouds, { opacity: 0.32, xPercent: 0 });
          gsap.set(rightClouds, { opacity: 0.32, xPercent: 0 });
          gsap.set(centerClouds, { opacity: 0.28, scale: 1 });
          gsap.set(smokeTransitionRef.current, { yPercent: 100, opacity: 0 });
        }

        // ── 2. Mobile Scroll Parallax (Smoke surges at ~90%) ──
        const scrollTl = gsap.timeline({
          scrollTrigger: {
            trigger: pinWrapperRef.current,
            start: "top top",
            end: "bottom bottom",
            pin: stickyRef.current,
            scrub: 0.4, // Snappy touch scrub
            anticipatePin: 1,
            invalidateOnRefresh: true,
          },
        });

        // Building rises gently on scroll from 45% to 22%
        scrollTl.fromTo(
          buildingRef.current,
          { xPercent: -50, yPercent: 45, opacity: 1 },
          {
            xPercent: -50,
            yPercent: 22,
            opacity: 1,
            ease: "none",
          },
          0
        );

        // Headline zooms forward on mobile
        scrollTl.fromTo(
          headlineRef.current,
          { opacity: 1, y: 0, scale: 1 },
          {
            opacity: 1,
            y: 0,
            scale: 1.35,
            ease: "none",
          },
          0
        );

        // Mobile clouds drift & scale
        scrollTl.fromTo(
          [cloudSkyTopLeftRef.current, cloudSkyTopRightRef.current],
          { scale: 1, yPercent: 0 },
          {
            scale: 1.2,
            yPercent: -10,
            ease: "none",
          },
          0
        );

        scrollTl.fromTo(
          cloudTopCrownRef.current,
          { scale: 1, yPercent: 0 },
          {
            scale: 1.3,
            yPercent: -20,
            ease: "none",
          },
          0
        );

        scrollTl.fromTo(
          [cloudLeftHighRef.current, cloudLeftLowRef.current],
          { scale: 1, xPercent: 0, yPercent: 0 },
          {
            scale: 1.3,
            xPercent: -10,
            yPercent: -15,
            ease: "none",
          },
          0
        );

        scrollTl.fromTo(
          [cloudRightHighRef.current, cloudRightLowRef.current],
          { scale: 1, xPercent: 0, yPercent: 0 },
          {
            scale: 1.3,
            xPercent: 10,
            yPercent: -15,
            ease: "none",
          },
          0
        );

        scrollTl.fromTo(
          [cloudBackCenterRef.current, cloudMidCenterFlankRef.current],
          { scale: 1 },
          {
            scale: 1.2,
            ease: "none",
          },
          0
        );

        scrollTl.fromTo(
          [
            cloudFrontMidLeftRef.current,
            cloudFrontMidRightRef.current,
            cloudFrontRooftopMistRef.current,
          ],
          { scale: 1, yPercent: 0 },
          {
            scale: 1.35,
            yPercent: -22,
            ease: "none",
          },
          0
        );

        scrollTl.fromTo(
          cloudFrontBaseRef.current,
          { scale: 1, yPercent: 0 },
          {
            scale: 1.4,
            yPercent: -25,
            ease: "none",
          },
          0
        );

        // ── Mobile smoke transition surges from bottom at 50% parallax to cover full screen ──
        scrollTl.fromTo(
          smokeTransitionRef.current,
          { yPercent: 100, opacity: 0 },
          {
            yPercent: 0,
            opacity: 1,
            ease: "power1.inOut",
          },
          0.5
        );
      });
    },
    { scope: pinWrapperRef, dependencies: [startEntrance] }
  );

  return (
    <section
      ref={pinWrapperRef}
      className="relative w-full h-[125vh] md:h-[160vh]"
      id="hero"
    >
      {/* ── Sticky Viewport (100dvh for mobile address bar stability) ── */}
      <div
        ref={stickyRef}
        className="relative w-full h-[100dvh] overflow-hidden select-none"
      >
        {/* ── Layer 0: Sky Background ── */}
        <div className="absolute inset-0 z-0 pointer-events-none">
          <img
            src={BG_IMAGE}
            alt="Sunset sky background"
            className="w-full h-full object-cover object-center"
            loading="eager"
            decoding="sync"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-white/10 via-transparent to-black/20" />
        </div>

        {/* ── Layer 1: Background Cloud Planes (Behind Text & Building) ── */}
        {/* Sky Top Left Ambient Cloud */}
        <div
          ref={cloudSkyTopLeftRef}
          className="absolute left-[-15%] top-[2%] z-[1] w-[75vw] sm:w-[50vw] md:w-[42vw] max-w-[600px] pointer-events-none"
          style={{
            filter: "blur(14px) brightness(1.2)",
            opacity: 0.25,
          }}
        >
          <img
            src={CLOUD_IMAGE}
            alt=""
            className="w-full h-auto object-cover mix-blend-screen"
          />
        </div>

        {/* Sky Top Right Ambient Cloud */}
        <div
          ref={cloudSkyTopRightRef}
          className="absolute right-[-15%] top-[1%] z-[1] w-[80vw] sm:w-[55vw] md:w-[45vw] max-w-[650px] pointer-events-none"
          style={{
            filter: "blur(15px) brightness(1.22)",
            opacity: 0.26,
          }}
        >
          <img
            src={CLOUD_IMAGE}
            alt=""
            className="w-full h-auto object-cover mix-blend-screen -scale-x-100"
          />
        </div>

        {/* Rooftop Crown Cloud */}
        <div
          ref={cloudTopCrownRef}
          className="absolute left-[10%] sm:left-[28%] top-[14%] sm:top-[16%] z-[1] w-[80vw] sm:w-[55vw] md:w-[45vw] max-w-[550px] pointer-events-none"
          style={{
            filter: "blur(10px) brightness(1.25)",
            opacity: 0.3,
          }}
        >
          <img
            src={CLOUD_IMAGE}
            alt=""
            className="w-full h-auto object-cover mix-blend-screen"
          />
        </div>

        {/* Deep Center Cloud */}
        <div
          ref={cloudBackCenterRef}
          className="absolute left-1/2 -translate-x-1/2 top-[24%] sm:top-[28%] z-[1] w-[120vw] sm:w-[90vw] md:w-[80vw] max-w-[1000px] pointer-events-none origin-center"
          style={{
            filter: "blur(11px) brightness(1.2)",
            opacity: 0.26,
          }}
        >
          <img
            src={CLOUD_IMAGE}
            alt=""
            className="w-full h-auto object-cover mix-blend-screen"
          />
        </div>

        {/* Mid Center Flank Cloud */}
        <div
          ref={cloudMidCenterFlankRef}
          className="absolute left-[12%] sm:left-[20%] top-[38%] sm:top-[42%] z-[1] w-[70vw] sm:w-[50vw] md:w-[40vw] max-w-[520px] pointer-events-none"
          style={{
            filter: "blur(13px) brightness(1.2)",
            opacity: 0.28,
          }}
        >
          <img
            src={CLOUD_IMAGE}
            alt=""
            className="w-full h-auto object-cover mix-blend-screen"
          />
        </div>

        {/* Left Upper Flank */}
        <div
          ref={cloudLeftHighRef}
          className="absolute left-[-25%] sm:left-[-15%] top-[22%] sm:top-[26%] z-[1] w-[90vw] sm:w-[65vw] md:w-[55vw] max-w-[700px] pointer-events-none origin-left"
          style={{
            filter: "blur(10px) brightness(1.2)",
            opacity: 0.32,
          }}
        >
          <img
            src={CLOUD_IMAGE}
            alt=""
            className="w-full h-auto object-cover mix-blend-screen"
          />
        </div>

        {/* Right Upper Flank */}
        <div
          ref={cloudRightHighRef}
          className="absolute right-[-25%] sm:right-[-16%] top-[18%] sm:top-[23%] z-[1] w-[95vw] sm:w-[70vw] md:w-[60vw] max-w-[750px] pointer-events-none origin-right"
          style={{
            filter: "blur(11px) brightness(1.25)",
            opacity: 0.3,
          }}
        >
          <img
            src={CLOUD_IMAGE}
            alt=""
            className="w-full h-auto object-cover mix-blend-screen -scale-x-100"
          />
        </div>

        {/* Left Low Flank */}
        <div
          ref={cloudLeftLowRef}
          className="absolute left-[-20%] sm:left-[-10%] bottom-[12%] sm:bottom-[16%] z-[1] w-[100vw] sm:w-[75vw] md:w-[65vw] max-w-[800px] pointer-events-none origin-bottom-left"
          style={{
            filter: "blur(11px) brightness(1.22)",
            opacity: 0.35,
          }}
        >
          <img
            src={CLOUD_IMAGE}
            alt=""
            className="w-full h-auto object-cover mix-blend-screen"
          />
        </div>

        {/* Right Low Flank */}
        <div
          ref={cloudRightLowRef}
          className="absolute right-[-20%] sm:right-[-12%] bottom-[8%] sm:bottom-[12%] z-[1] w-[105vw] sm:w-[78vw] md:w-[68vw] max-w-[850px] pointer-events-none origin-bottom-right"
          style={{
            filter: "blur(12px) brightness(1.24)",
            opacity: 0.34,
          }}
        >
          <img
            src={CLOUD_IMAGE}
            alt=""
            className="w-full h-auto object-cover mix-blend-screen -scale-x-100"
          />
        </div>

        {/* ── Layer 2: 3D Zooming Headline & Tagline (Sits behind building & in front of clouds) ── */}
        <div
          ref={headlineRef}
          className="absolute top-[32%] xs:top-[30%] sm:top-[20%] md:top-[18%] left-0 right-0 z-[2] flex flex-col justify-center items-center text-center px-4 sm:px-8 pointer-events-none origin-center will-change-transform"
        >
          <h1 className="font-sans font-black text-[3.2rem] xs:text-[3.8rem] sm:text-7xl md:text-8xl lg:text-[6rem] xl:text-[6.8rem] text-white tracking-tight leading-[0.98] sm:leading-none sm:whitespace-nowrap drop-shadow-[0_4px_30px_rgba(0,0,0,0.55)]">
            Unlock Your
            <br className="sm:hidden" /> Next Chapter
          </h1>

          <p className="mt-4 sm:mt-5 text-[13px] xs:text-sm sm:text-base md:text-lg lg:text-xl font-medium tracking-wide max-w-xs xs:max-w-sm sm:max-w-none leading-relaxed drop-shadow-[0_2px_18px_rgba(0,0,0,0.65)]">
            <span className="text-white font-semibold block sm:inline">
              Curated spaces. Trusted advisors.
            </span>{" "}
            <span className="text-white/80 font-normal block sm:inline">
              The perfect setting to write your story.
            </span>
          </p>
        </div>

        {/* ── Layer 3: Skyscraper Building (Passes in front of the text on scroll for 3D overlap) ── */}
        <div
          ref={buildingRef}
          className="absolute left-1/2 bottom-0 z-[3] w-[135vw] sm:w-[105vw] md:w-[78vw] lg:w-[62vw] max-w-[1150px] pointer-events-none will-change-transform"
        >
          <img
            src={BUILDING_IMAGE}
            alt="Luxury architectural residence"
            className="w-full h-auto object-contain object-top drop-shadow-[0_25px_60px_rgba(0,0,0,0.45)]"
            loading="eager"
            decoding="sync"
          />
        </div>

        {/* ── Layer 4: Foreground Clouds (In Front of Both Building & Text) ── */}
        {/* Floating Mid-Left Mist */}
        <div
          ref={cloudFrontMidLeftRef}
          className="absolute left-[-15%] sm:left-[8%] bottom-[20%] sm:bottom-[26%] z-[4] w-[80vw] sm:w-[55vw] md:w-[48vw] max-w-[580px] pointer-events-none origin-center"
          style={{
            filter: "blur(12px) brightness(1.3)",
            opacity: 0.28,
          }}
        >
          <img
            src={CLOUD_IMAGE}
            alt=""
            className="w-full h-auto object-cover mix-blend-screen -scale-x-100"
          />
        </div>

        {/* Floating Mid-Right Mist */}
        <div
          ref={cloudFrontMidRightRef}
          className="absolute right-[-15%] sm:right-[6%] bottom-[14%] sm:bottom-[20%] z-[4] w-[85vw] sm:w-[58vw] md:w-[50vw] max-w-[620px] pointer-events-none origin-center"
          style={{
            filter: "blur(13px) brightness(1.3)",
            opacity: 0.28,
          }}
        >
          <img
            src={CLOUD_IMAGE}
            alt=""
            className="w-full h-auto object-cover mix-blend-screen"
          />
        </div>

        {/* Foreground Rooftop Garden Mist */}
        <div
          ref={cloudFrontRooftopMistRef}
          className="absolute left-[20%] sm:left-[30%] bottom-[28%] sm:bottom-[34%] z-[4] w-[60vw] sm:w-[45vw] md:w-[38vw] max-w-[480px] pointer-events-none origin-center"
          style={{
            filter: "blur(14px) brightness(1.32)",
            opacity: 0.26,
          }}
        >
          <img
            src={CLOUD_IMAGE}
            alt=""
            className="w-full h-auto object-cover mix-blend-screen"
          />
        </div>

        {/* Foreground Ground Base Fog */}
        <div
          ref={cloudFrontBaseRef}
          className="absolute left-1/2 -translate-x-1/2 bottom-[-6%] sm:bottom-[-2%] z-[4] w-[130vw] sm:w-[105vw] md:w-[95vw] max-w-[1200px] pointer-events-none origin-center"
          style={{
            filter: "blur(14px) brightness(1.35)",
            opacity: 0.32,
          }}
        >
          <img
            src={CLOUD_IMAGE}
            alt=""
            className="w-full h-auto object-cover mix-blend-screen"
          />
        </div>

        {/* ── Layer 5: Full-Screen Section Transition Smoke (Surges from bottom at 50% parallax) ── */}
        <div
          ref={smokeTransitionRef}
          className="absolute inset-0 z-[10] w-full h-[100dvh] pointer-events-none translate-y-full will-change-transform"
        >
          <img
            src={SMOKE_IMAGE}
            alt="Atmospheric transition smoke"
            className="w-full h-full object-cover object-bottom"
            style={{ filter: "brightness(1.05)" }}
          />
        </div>
      </div>
    </section>
  );
}