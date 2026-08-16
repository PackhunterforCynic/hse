"use client";

import React, { useRef, useState } from "react";
import { motion, useScroll, useMotionValueEvent, AnimatePresence } from "framer-motion";
import { PenTool, Video, Film } from "lucide-react";
import { cn } from "@/utils/cn";

const PIPELINE_STEPS = [
  {
    title: "Pre-Production & Strategy",
    description:
      "We begin by understanding your brand vision, target audience, and business goals. Our creative team develops mood boards, compelling scripts, and meticulous storyboards to ensure every frame has a purpose before the cameras even roll.",
    icon: PenTool,
  },
  {
    title: "Cinematic Production",
    description:
      "Our master cinematographers bring the vision to life using industry-leading camera gear and state-of-the-art lighting. From sweeping aerial drone shots to intimate macro details, we capture cinematic footage that demands attention.",
    icon: Video,
  },
  {
    title: "Post-Production & Delivery",
    description:
      "The magic happens in the edit. We stitch the narrative together, applying premium color grading (DaVinci Resolve), custom sound design, and motion graphics to produce a final, broadcast-ready cinematic masterpiece.",
    icon: Film,
  },
];

export function ProductionPipeline() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  useMotionValueEvent(scrollYProgress, "change", (latest) => {
    if (latest < 0.33) {
      setActiveIndex(0);
    } else if (latest >= 0.33 && latest < 0.66) {
      setActiveIndex(1);
    } else {
      setActiveIndex(2);
    }
  });

  return (
    <section ref={containerRef} className="relative w-full h-[300vh] bg-background">
      <div className="sticky top-0 h-screen w-full flex flex-col items-center justify-center overflow-hidden py-12 md:py-24">
        
        <div className="flex flex-col items-center z-20 px-6 mb-10 md:mb-16">
          <div className="flex items-center gap-4 mb-3 md:mb-4">
            <div className="h-[1px] w-8 sm:w-12 md:w-24 bg-accent" />
            <h2 className="font-serif text-3xl md:text-5xl font-bold text-text text-center">
              The Production Pipeline
            </h2>
            <div className="h-[1px] w-8 sm:w-12 md:w-24 bg-accent" />
          </div>
          <p className="text-text/60 font-medium text-sm md:text-base text-center max-w-lg">
            From concept to cinematic delivery, experience our refined creative process in three seamless phases.
          </p>
        </div>

        <div className="container mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-12 lg:gap-24 items-center">
          
          <div className="flex flex-col gap-8 relative z-10 w-full max-w-xl mx-auto lg:mx-0">
            <div className="absolute left-[23px] top-[24px] bottom-[24px] w-[2px] border-l-2 border-dashed border-border/40 z-0" />

            {PIPELINE_STEPS.map((step, idx) => {
              const isActive = idx === activeIndex;
              const isPast = idx < activeIndex;
              const isHighlighted = isActive || isPast;

              return (
                <div key={idx} className="relative z-10 flex gap-6 md:gap-8 group">
                  <div className="flex-shrink-0 mt-1">
                    <motion.div
                      className={cn(
                        "w-12 h-12 rounded-full flex items-center justify-center text-lg font-bold border-2 transition-colors duration-500",
                        isHighlighted 
                          ? "bg-accent border-accent text-black" 
                          : "bg-surface border-border/40 text-text/40"
                      )}
                    >
                      {idx + 1}
                    </motion.div>
                  </div>

                  <div className="flex flex-col flex-1">
                    <motion.h3
                      className={cn(
                        "font-serif text-2xl md:text-3xl font-bold transition-all duration-500",
                        isActive ? "text-text" : "text-text/40"
                      )}
                    >
                      {step.title}
                    </motion.h3>

                    <AnimatePresence initial={false}>
                      {isActive && (
                        <motion.div
                          initial={{ height: 0, opacity: 0, marginTop: 0 }}
                          animate={{ height: "auto", opacity: 1, marginTop: 12 }}
                          exit={{ height: 0, opacity: 0, marginTop: 0 }}
                          transition={{ duration: 0.4, ease: "easeInOut" }}
                          className="overflow-hidden"
                        >
                          <p className="text-text/70 leading-relaxed text-sm md:text-base">
                            {step.description}
                          </p>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                </div>
              );
            })}
          </div>

          <div className="hidden lg:flex items-center justify-center relative">
            <div className="w-[400px] h-[400px] xl:w-[500px] xl:h-[500px] rounded-full bg-surface border border-accent/20 flex items-center justify-center relative overflow-hidden shadow-2xl shadow-accent/5">
              <div className="absolute inset-4 rounded-full border border-dashed border-accent/30 animate-[spin_60s_linear_infinite]" />
              
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeIndex}
                  initial={{ opacity: 0, scale: 0.8, y: 20 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 1.1, y: -20 }}
                  transition={{ duration: 0.5, ease: "easeOut" }}
                  className="relative z-10 flex flex-col items-center justify-center text-accent"
                >
                  {React.createElement(PIPELINE_STEPS[activeIndex].icon, {
                    size: 120,
                    strokeWidth: 1,
                    className: "drop-shadow-lg",
                  })}
                  <div className="mt-8 text-text/50 tracking-[0.3em] text-xs font-bold uppercase">
                    Phase 0{activeIndex + 1}
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
