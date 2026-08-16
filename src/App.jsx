import { useState, useEffect } from "react";
import Lenis from "lenis";
import "lenis/dist/lenis.css";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Loader from "./Components/Loader";
import Hero from "./Components/Hero";
import AboutSection from "./Components/AboutSection";
import Testimonials from "./Components/Testimonials";
import InquirySection from "./Components/InquirySection";

gsap.registerPlugin(ScrollTrigger);

export default function App() {
  // Check sessionStorage so loader only displays on first visit, not on page refresh
  const [showLoader, setShowLoader] = useState(() => {
    try {
      return !sessionStorage.getItem("hasVisited");
    } catch {
      return true;
    }
  });

  const [startEntrance, setStartEntrance] = useState(() => {
    try {
      return !!sessionStorage.getItem("hasVisited");
    } catch {
      return false;
    }
  });

  useEffect(() => {
    // Initialize Lenis smooth scroll engine
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
      wheelMultiplier: 1.0,
      touchMultiplier: 1.05,
    });

    // Synchronize Lenis smooth scroll with GSAP ScrollTrigger
    lenis.on("scroll", ScrollTrigger.update);

    const updateTicker = (time) => {
      lenis.raf(time * 1000);
    };

    gsap.ticker.add(updateTicker);
    gsap.ticker.lagSmoothing(0);

    // Refresh ScrollTrigger once on mount to handle browser restored scroll positions
    const timer = setTimeout(() => {
      ScrollTrigger.refresh();
    }, 150);

    return () => {
      clearTimeout(timer);
      gsap.ticker.remove(updateTicker);
      lenis.destroy();
    };
  }, []);

  const handleWipeStart = () => {
    try {
      sessionStorage.setItem("hasVisited", "true");
    } catch {
      // Handle storage quota / disabled storage safely
    }
    setStartEntrance(true);
    setTimeout(() => {
      ScrollTrigger.refresh();
    }, 200);
  };

  const handleWipeComplete = () => {
    setShowLoader(false);
  };

  return (
    <main className="relative min-h-screen bg-[#030303] text-white overflow-x-hidden select-none">
      {/* ── Stage 1: Entrance Loader Animation (Only on first visit) ── */}
      {showLoader && (
        <Loader
          onWipeStart={handleWipeStart}
          onWipeComplete={handleWipeComplete}
        />
      )}

      {/* ── Stage 2: Pinned 3D Parallax Hero ── */}
      <Hero startEntrance={startEntrance} />

      {/* ── Stage 3: Pinned Horizontal Side-Scrolling Business Story ── */}
      <AboutSection />

      {/* ── Stage 4: Testimonials (Vertical Normal Flow) ── */}
      <Testimonials />

      {/* ── Stage 5: Private Client Inquiry Section (Vertical Flow) ── */}
      <InquirySection />
    </main>
  );
}
