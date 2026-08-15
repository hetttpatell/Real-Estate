import { useRef, useState } from "react";
import gsap from "gsap";
import { useGSAP } from "../utils/useGSAP";


export default function Loader({ onWipeStart, onWipeComplete }) {
  const containerRef = useRef(null);
  const overlayRef = useRef(null);
  const cardContentRef = useRef(null);
  const counterRef = useRef(null);
  const svgPathRef = useRef(null);

  const [progress, setProgress] = useState(0);

  useGSAP(
    () => {
      // Setup SVG Path stroke length for border edge animation
      const path = svgPathRef.current;
      let pathLength = 1200;
      if (path) {
        pathLength = path.getTotalLength();
        gsap.set(path, {
          strokeDasharray: pathLength,
          strokeDashoffset: pathLength,
          opacity: 1,
        });
      }

      const counterObj = { value: 0 };
      const tl = gsap.timeline({
        onComplete: () => {
          gsap.set(containerRef.current, {
            pointerEvents: "none",
            visibility: "hidden",
            display: "none",
          });
          onWipeComplete?.();
        },
      });

      // ── Stage 1: Edge loading stroke + giant bottom-left screen percentage (0% -> 100%) ──
      tl.to(
        path,
        {
          strokeDashoffset: 0,
          duration: 2.4,
          ease: "power1.inOut",
        },
        0
      );

      tl.to(
        counterObj,
        {
          value: 100,
          duration: 2.4,
          ease: "power1.inOut",
          onUpdate: () => {
            setProgress(Math.floor(counterObj.value));
          },
        },
        0
      );

      // Hold at 100% for a full 1.0s before starting the wipe out reveal
      tl.to(
        [cardContentRef.current, counterRef.current],
        {
          opacity: 0,
          y: -10,
          duration: 0.4,
          ease: "power2.out",
        },
        "+=1.0"
      );

      // ── Stage 2: Ultra-smooth translateX curtain wipe reveal (-105%) ──
      tl.to(
        overlayRef.current,
        {
          xPercent: -105,
          duration: 1.2,
          ease: "cubic-bezier(0.76, 0, 0.24, 1)",
          onStart: () => {
            if (containerRef.current) {
              containerRef.current.style.pointerEvents = "none";
            }
            onWipeStart?.();
          },
        },
        "<0.1"
      );
    },
    { scope: containerRef }
  );

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 z-[9999] overflow-hidden select-none pointer-events-auto"
      id="loader"
    >
      {/* Full-viewport solid black overlay panel */}
      <div
        ref={overlayRef}
        className="relative w-full h-full bg-black flex items-center justify-center"
        style={{ willChange: "transform" }}
      >
        {/* Centered Card with Edge Loading Border Animation */}
        <div className="relative w-[80vw] max-w-[420px] md:w-[380px] h-[55vh] max-h-[460px] md:h-[420px] p-6 md:p-9 flex flex-col justify-between">
          {/* Animated SVG Border along card edges */}
          <svg
            className="absolute inset-0 w-full h-full pointer-events-none overflow-visible"
            xmlns="http://www.w3.org/2000/svg"
          >
            {/* Base static outline */}
            <rect
              x="0"
              y="0"
              width="100%"
              height="100%"
              fill="none"
              stroke="rgba(255, 255, 255, 0.18)"
              strokeWidth="1"
            />
            {/* Animated edge loader in luxury gold */}
            <rect
              ref={svgPathRef}
              x="0"
              y="0"
              width="100%"
              height="100%"
              fill="none"
              stroke="#c9a96e"
              strokeWidth="2"
              vectorEffect="non-scaling-stroke"
            />
          </svg>

          {/* Inner Card Content */}
          <div
            ref={cardContentRef}
            className="relative z-10 w-full h-full flex flex-col justify-between"
          >
            {/* Top: Logo Wordmark */}
            <div className="flex items-center justify-between w-full pt-1">
              <span
                className="text-[10px] md:text-xs tracking-[0.35em] text-white font-medium uppercase truncate"
                style={{ fontFamily: "var(--font-sans)" }}
              >
                FIRSTKEY HOUSING
              </span>
            </div>

            {/* Bottom: Tagline */}
            <div className="flex items-center justify-center w-full pb-1">
              <span
                className="text-[9px] md:text-[10.5px] tracking-[0.35em] text-white/80 font-light uppercase text-center"
                style={{ fontFamily: "var(--font-sans)" }}
              >
                THE LUXURY OF EXPERIENCE
              </span>
            </div>
          </div>
        </div>

        {/* ── Bottom-Left Screen Percentage Counter (Big & Bold) ── */}
        <div
          ref={counterRef}
          className="absolute bottom-8 left-8 md:bottom-12 md:left-14 z-20 flex items-baseline select-none"
        >
          <span
            className="text-7xl md:text-9xl font-extrabold text-[#c9a96e] tracking-tighter leading-none"
            style={{ fontFamily: "var(--font-sans)" }}
          >
            {String(progress).padStart(2, "0")}
          </span>
          <span className="text-xl md:text-3xl font-semibold text-white/40 ml-2 uppercase">
            %
          </span>
        </div>
      </div>
    </div>
  );
}



