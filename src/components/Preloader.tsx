"use client";

import React, { useEffect, useState, useRef, useLayoutEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Aperture from "./Aperture";

export default function Preloader() {
  const [loading, setLoading] = useState(true);
  const [phase, setPhase] = useState("initial");
  const [isMobile, setIsMobile] = useState(false);
  const logoRef = useRef<HTMLDivElement>(null);
  const [flightTransform, setFlightTransform] = useState({ x: 0, y: 0, scale: 0.35 });

  useLayoutEffect(() => {
    if (phase === "flying" && logoRef.current) {
      const source = logoRef.current.getBoundingClientRect();
      const navLogoEl = document.getElementById("nav-logo");
      
      if (navLogoEl && source.width > 0) {
        const target = navLogoEl.getBoundingClientRect();
        
        const sourceCenter = {
          x: source.left + source.width / 2,
          y: source.top + source.height / 2
        };
        const targetCenter = {
          x: target.left + target.width / 2,
          y: target.top + target.height / 2
        };
        
        const calculatedScale = target.width / source.width;
        
        setFlightTransform({
          x: targetCenter.x - sourceCenter.x,
          y: targetCenter.y - sourceCenter.y,
          scale: calculatedScale
        });
      } else {
        setFlightTransform({
          x: isMobile ? -100 : -200,
          y: isMobile ? -300 : -350,
          scale: 0.4
        });
      }
    }
  }, [phase, isMobile]);

  useEffect(() => {
    setIsMobile(window.innerWidth < 768);
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    // Prevent animation on page refreshes during the same session to keep UX fast
    const hasVisited = sessionStorage.getItem("havilah_visited");
    if (hasVisited) {
      setLoading(false);
      return;
    }

    // Lock body scrolling during load
    document.body.style.overflow = "hidden";

    // Phased preloader timing sequence (total 2.5 seconds)
    const timer1 = setTimeout(() => setPhase("opening"), 400);
    const timer2 = setTimeout(() => setPhase("reading"), 1200);
    const timer3 = setTimeout(() => setPhase("flying"), 1800);
    const timer4 = setTimeout(() => {
      setPhase("done");
      setLoading(false);
      sessionStorage.setItem("havilah_visited", "true");
      document.body.style.overflow = "";
    }, 2500);

    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
      clearTimeout(timer3);
      clearTimeout(timer4);
      document.body.style.overflow = "";
    };
  }, []);

  if (!loading) return null;

  const isVisible = phase === "initial" || phase === "opening" || phase === "reading" || phase === "flying";
  const isRevealing = phase === "opening" || phase === "reading" || phase === "flying";
  const isFlying = phase === "flying";

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 1 }}
          animate={{ opacity: isVisible ? 1 : 0 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.6, ease: "easeInOut" }}
          className="fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-[#050505] text-white overflow-hidden pointer-events-none"
        >
          {/* Film Grain Background Effect */}
          <div
            className="absolute inset-0 pointer-events-none opacity-[0.04] mix-blend-screen z-0"
            style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
              backgroundRepeat: "repeat",
              backgroundSize: "200px 200px",
            }}
          />

          {/* Cinematic Lens Flare */}
          <motion.div
            className="absolute inset-0 z-10 pointer-events-none mix-blend-screen"
            initial={{ opacity: 0, x: "-100%", scale: 0.8 }}
            animate={{
              opacity: phase === "opening" || phase === "reading" ? [0, 0.4, 0] : 0,
              x: phase === "opening" || phase === "reading" ? ["-100%", "100%"] : "-100%",
              scale: 1,
            }}
            transition={{ duration: 1.5, ease: "linear", delay: 0.2 }}
            style={{
              background: "radial-gradient(circle at center, rgba(255,255,255,0.8) 0%, rgba(255,255,255,0) 60%)",
              width: "200vw",
              height: "2px",
              filter: "blur(8px) brightness(1.5)",
              top: "50%",
              transform: "translateY(-50%) rotate(-15deg)",
            }}
          />

          {/* Brand Logo Text */}
          <div className="relative z-10 flex flex-col items-center gap-4">
            <motion.div
              ref={logoRef}
              className="flex items-center gap-4 font-serif text-5xl md:text-7xl font-bold tracking-[0.3em] text-white ml-[0.3em] origin-center select-none"
              initial={{ opacity: 0, scale: 0.9, filter: "blur(10px)" }}
              animate={{
                opacity: isRevealing ? 1 : 0,
                scale: isFlying ? flightTransform.scale : (isRevealing ? 1 : 0.9),
                filter: "blur(0px)",
                y: isFlying ? flightTransform.y : 0,
                x: isFlying ? flightTransform.x : 0
              }}
              transition={{
                duration: isFlying ? 0.7 : 0.8,
                ease: [0.76, 0, 0.24, 1] as const,
                delay: isRevealing && !isFlying ? 0.2 : 0,
              }}
            >
              <span>HAVILAH</span>
            </motion.div>

            <motion.div
              className="text-[10px] md:text-xs font-mono uppercase tracking-[0.4em] text-accent/80 font-semibold select-none"
              initial={{ opacity: 0, y: 10, filter: "blur(5px)" }}
              animate={{
                opacity: phase === "opening" ? 0.8 : 0,
                y: phase === "opening" ? 0 : 10,
                filter: "blur(0px)",
              }}
              transition={{
                duration: phase === "reading" || phase === "flying" ? 0.3 : 0.8,
                ease: [0.76, 0, 0.24, 1] as const,
                delay: phase === "opening" ? 0.4 : 0,
              }}
            >
              Stories that Inspire. Films that Endure.
            </motion.div>
          </div>

          {/* Shutter Blades Mechanical Iris */}
          <Aperture phase={phase} />
        </motion.div>
      )}
    </AnimatePresence>
  );
}
