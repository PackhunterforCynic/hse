"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { Play, ArrowRight, Info } from "lucide-react";

interface Project {
  slug: string;
  title: string;
  category: string;
  story: string;
  imageSrc: string;
}

interface ProjectsHeroCarouselProps {
  projects: Project[];
}

export function ProjectsHeroCarousel({ projects }: ProjectsHeroCarouselProps) {
  const [currentIndex, setCurrentIndex] = useState(0);

  // Auto-advance carousel
  useEffect(() => {
    if (projects.length <= 1) return;
    
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % projects.length);
    }, 6000); // 6 seconds per slide
    
    return () => clearInterval(interval);
  }, [projects.length]);

  if (!projects || projects.length === 0) return null;

  const currentProject = projects[currentIndex];

  return (
    <div className="relative w-full h-[85vh] min-h-[500px] md:min-h-[600px] overflow-hidden bg-black">
      <AnimatePresence initial={false}>
        <motion.div
          key={currentIndex}
          initial={{ opacity: 0, scale: 1.05 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1.5, ease: "easeInOut" }}
          className="absolute inset-0"
        >
          {/* Background Image */}
          <Image
            src={currentProject.imageSrc}
            alt={currentProject.title}
            fill
            className="object-cover object-center"
            priority
          />
          
          {/* Netflix-style Vignette / Gradients */}
          <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent z-10" />
          <div className="absolute inset-0 bg-gradient-to-r from-black via-black/50 to-transparent z-10 w-3/4" />
        </motion.div>
      </AnimatePresence>

      {/* Content */}
      <div className="absolute inset-0 z-20 flex flex-col justify-end pb-20 sm:pb-24 md:pb-32 px-4 sm:px-6 md:px-16 max-w-7xl mx-auto w-full">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentIndex}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="max-w-2xl"
          >
            {/* Netflix 'Series/Movie' type badge */}
            <div className="flex items-center gap-2 mb-4">
              <span className="w-4 h-4 bg-accent flex items-center justify-center rounded-sm">
                <span className="text-[10px] font-black text-black">H</span>
              </span>
              <span className="text-xs font-bold tracking-[0.3em] uppercase text-accent drop-shadow-md">
                Featured {currentProject.category}
              </span>
            </div>

            {/* Massive Title */}
            <h1 className="font-serif text-3xl sm:text-5xl md:text-7xl lg:text-8xl font-bold tracking-tight text-white leading-none mb-4 md:mb-6 drop-shadow-xl">
              {currentProject.title}
            </h1>

            {/* Synopsis */}
            <p className="text-white/80 text-sm md:text-base leading-relaxed mb-8 line-clamp-3 drop-shadow-md max-w-xl">
              {currentProject.story}
            </p>

            {/* Action Buttons */}
            <div className="flex flex-wrap items-center gap-3 md:gap-4">
              <Link
                href={`/projects/${currentProject.slug}`}
                className="flex items-center gap-2 bg-white text-black px-4 py-2.5 sm:px-6 sm:py-3 md:px-8 md:py-4 rounded-sm font-bold text-xs sm:text-sm md:text-base hover:bg-white/80 transition-colors"
              >
                <Play className="w-4 h-4 md:w-5 md:h-5 fill-black" />
                Play Showcase
              </Link>
              
              <Link
                href={`/projects/${currentProject.slug}`}
                className="flex items-center gap-2 bg-white/20 backdrop-blur-md text-white px-4 py-2.5 sm:px-6 sm:py-3 md:px-8 md:py-4 rounded-sm font-bold text-xs sm:text-sm md:text-base hover:bg-white/30 transition-colors border border-white/10"
              >
                <Info className="w-4 h-4 md:w-5 md:h-5" />
                More Info
              </Link>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Carousel Indicators */}
      <div className="absolute bottom-8 right-6 md:right-16 z-20 flex items-center gap-2">
        {projects.map((_, idx) => (
          <button
            key={idx}
            onClick={() => setCurrentIndex(idx)}
            className={`h-1 transition-all duration-500 rounded-full ${
              idx === currentIndex ? "w-8 bg-white" : "w-4 bg-white/30 hover:bg-white/50"
            }`}
            aria-label={`Go to slide ${idx + 1}`}
          />
        ))}
      </div>
    </div>
  );
}
