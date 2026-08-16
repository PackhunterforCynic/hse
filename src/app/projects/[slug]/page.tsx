"use client";

import React, { useState, useRef, useEffect } from "react";
import { notFound } from "next/navigation";
import { projectsData } from "@/utils/projectsData";
import { SectionHeader } from "@/components/ui/Hero";
import Timeline from "@/components/ui/Timeline";
import Lightbox from "@/components/ui/Lightbox";
import { GalleryCard, NetflixCard, TestimonialCard } from "@/components/ui/Card";
import Button from "@/components/ui/Button";
import Link from "next/link";
import { motion, useInView } from "framer-motion";
import { ArrowLeft, Play, Info, Layers, Tag, Camera, Pause, Volume2, VolumeX, Maximize } from "lucide-react";
import Image from "next/image";

interface PageProps {
  params: {
    slug: string;
  };
}

export default function ProjectDetailPage({ params }: PageProps) {
  const project = projectsData.find((p) => p.slug === params.slug);

  if (!project) {
    notFound();
  }

  // Lightbox State
  const [lightbox, setLightbox] = useState<{
    isOpen: boolean;
    type: "image" | "video" | "youtube";
    src: string;
  }>({
    isOpen: false,
    type: "image",
    src: "",
  });

  const openLightbox = (type: "image" | "video" | "youtube", src: string) => {
    setLightbox({ isOpen: true, type, src });
  };

  const closeLightbox = () => {
    setLightbox({ ...lightbox, isOpen: false });
  };

  // HSE Hero Video State
  const [isMuted, setIsMuted] = useState(true);
  const heroRef = useRef<HTMLElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const isInView = useInView(heroRef);

  useEffect(() => {
    if (!videoRef.current) return;
    if (isInView) {
      videoRef.current.play().catch(() => {});
    } else {
      videoRef.current.pause();
    }
  }, [isInView]);

  // Mock Timeline Steps matching project details
  const timelineSteps = [
    {
      step: "01",
      title: "Pre-Production & Conception",
      description: `For ${project.title}, we mapped out initial scripts, mood boards, storyboards, and structural camera configurations.`,
    },
    {
      step: "02",
      title: "Shoot Execution",
      description: `Principal photography was executed on locations using specialized camera packages and lighting grids tailored to resolve the project's visual constraints.`,
    },
    {
      step: "03",
      title: "Editing & Master Grading",
      description: "Post-production editing loops, custom sound designs, spatial audiomixes, and Dolby HDR color grades were crafted.",
    },
  ];

  // Recommends 2 other projects
  const relatedProjects = projectsData.filter((p) => p.slug !== project.slug).slice(0, 2);

  return (
    <div className="relative min-h-screen pb-20">
      {/* Theater Curtain Opening Sequence */}
      <motion.div
        className="fixed inset-y-0 left-0 w-1/2 bg-black z-[60]"
        initial={{ x: "0%" }}
        animate={{ x: "-100%" }}
        transition={{ duration: 1.5, ease: [0.76, 0, 0.24, 1], delay: 0.2 }}
      />
      <motion.div
        className="fixed inset-y-0 right-0 w-1/2 bg-black z-[60]"
        initial={{ x: "0%" }}
        animate={{ x: "100%" }}
        transition={{ duration: 1.5, ease: [0.76, 0, 0.24, 1], delay: 0.2 }}
      />

      {/* HSE Replicated Hero */}
      <section ref={heroRef} className="relative w-full aspect-video md:aspect-auto md:h-[100dvh] overflow-hidden mt-16 md:mt-0">
        <motion.div 
          className="absolute inset-0 w-full h-full origin-center bg-black"
          initial={{ scale: 1.15 }}
          animate={{ scale: 1 }}
          transition={{ duration: 3.5, ease: 'easeOut' }}
        >
          {project.videoSrc ? (
            <video 
              ref={videoRef}
              src={project.videoSrc} 
              autoPlay 
              loop 
              muted={isMuted} 
              playsInline 
              className="absolute inset-0 w-full h-full object-contain md:object-cover bg-black"
            />
          ) : (
            <Image
              src={project.imageSrc} 
              alt={project.title}
              priority
              fill
              className="object-contain md:object-cover bg-black"
            />
          )}
        </motion.div>
        
        <div className="absolute inset-0 bg-transparent md:bg-black/40 pointer-events-none" />
        
        <div className="hidden md:flex absolute inset-0 flex-col items-center justify-center pointer-events-none px-4 text-center">
          <h1 className="text-6xl md:text-[8vw] font-serif font-bold uppercase tracking-tighter text-white/90 mb-2 md:mb-4 flex flex-wrap justify-center gap-x-[2vw]">
            {project.title.split(' ').map((word, i) => (
              <span key={i} className="overflow-hidden inline-block pb-4 md:pb-8 -mb-4 md:-mb-8">
                <motion.span 
                  className="block origin-bottom-left"
                  initial={{ y: '120%', rotateZ: 5, opacity: 0 }}
                  animate={{ y: '0%', rotateZ: 0, opacity: 0.5 }}
                  transition={{ duration: 1.8, delay: 0.8 + (i * 0.1), ease: [0.16, 1, 0.3, 1] }}
                >
                  <span className="bg-gradient-to-r from-white via-white/80 to-accent bg-clip-text text-transparent drop-shadow-lg">{word}</span>
                </motion.span>
              </span>
            ))}
          </h1>
          <motion.p 
            className="text-accent font-mono font-bold uppercase text-sm md:text-base tracking-[0.3em]"
            initial={{ opacity: 0, filter: 'blur(10px)', letterSpacing: '0.8em', y: 10 }}
            animate={{ opacity: 1, filter: 'blur(0px)', letterSpacing: '0.3em', y: 0 }}
            transition={{ duration: 1.5, delay: 1.4, ease: 'easeOut' }}
          >
            {project.category}
          </motion.p>
        </div>
        
        {project.videoSrc && (
          <button 
            onClick={() => setIsMuted(!isMuted)}
            className="absolute bottom-8 right-4 md:right-8 z-20 p-4 bg-black/40 md:hover:bg-black/80 backdrop-blur-md rounded-full text-white transition-all cursor-pointer border border-white/10"
          >
            {isMuted ? <VolumeX size={24} /> : <Volume2 size={24} />}
          </button>
        )}
      </section>

      {/* Main content grid */}
      <section className="py-20 bg-background relative z-10">
        <div className="max-w-7xl mx-auto px-6">
          
          <Link
            href="/projects"
            className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-text/50 hover:text-accent mb-8 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" /> Back to projects
          </Link>

          {/* Mobile Title Block */}
          <div className="md:hidden mb-12 pb-12 border-b border-border/50">
            <h1 className="text-4xl sm:text-5xl font-serif font-bold uppercase tracking-tighter text-heading mb-4 leading-tight">
              {project.title}
            </h1>
            <p className="text-accent font-mono font-bold uppercase text-xs tracking-[0.2em]">
              {project.category}
            </p>
          </div>

          <div className="flex flex-col md:flex-row gap-12 md:gap-24 mb-24">
            {/* Story Synopsis */}
            <div className="flex-1 max-w-3xl">
              <span className="text-[10px] font-bold text-accent uppercase tracking-widest block mb-2">
                The Story
              </span>
              <h2 className="font-serif text-2xl md:text-3xl font-bold text-heading leading-relaxed">
                {project.story}
              </h2>
            </div>

            {/* Project Details Ribbon */}
            <div className="flex flex-col gap-6 md:w-64 shrink-0 border-l border-border/50 pl-6 md:pl-12">
              <div>
                <p className="text-[10px] font-mono tracking-widest text-text/40 uppercase mb-1">Client</p>
                <p className="text-sm font-semibold uppercase tracking-wider">{project.client}</p>
              </div>
              <div>
                <p className="text-[10px] font-mono tracking-widest text-text/40 uppercase mb-1">Category</p>
                <p className="text-sm font-semibold uppercase tracking-wider">{project.category}</p>
              </div>
              <div>
                <p className="text-[10px] font-mono tracking-widest text-text/40 uppercase mb-1">Year</p>
                <p className="text-sm font-semibold uppercase tracking-wider">{project.year}</p>
              </div>
            </div>
          </div>

          {/* Challenge & Solution */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-24 pb-12 border-b border-border/50">
            <div className="glassmorphism-card p-8 rounded-xl border-border/30">
              <h3 className="font-serif text-lg font-bold text-accent uppercase tracking-wider mb-4 border-b border-border/30 pb-2">
                The Challenge
              </h3>
              <p className="text-sm text-text/75 leading-relaxed">
                {project.challenge}
              </p>
            </div>
            <div className="glassmorphism-card p-8 rounded-xl border-border/30">
              <h3 className="font-serif text-lg font-bold text-accent uppercase tracking-wider mb-4 border-b border-border/30 pb-2">
                The Solution
              </h3>
              <p className="text-sm text-text/75 leading-relaxed">
                {project.solution}
              </p>
            </div>
          </div>

          {/* Timeline steps */}
          <div className="mb-24">
            <SectionHeader
              badge="Pipeline"
              title="Production Steps &"
              italicTitle="Work Milestones"
              description="A transparent breakdown of how this project made its way through our creative pipeline."
              className="mb-12"
            />
            <Timeline items={timelineSteps} />
          </div>



          {/* Behind the Scenes Gallery */}
          <div className="mb-24">
            <SectionHeader
              badge="Media Gallery"
              title="Behind the"
              italicTitle="Scenes Moments"
              description="Visual records captured on location during shoot segments."
              className="mb-12"
            />
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              {[project.videoSrc, ...project.gallery].filter(Boolean).slice(0, 6).map((mediaSrc, idx) => (
                <GalleryCard
                  key={idx}
                  title={`${project.title} Scene Still ${idx + 1}`}
                  category="BTS"
                  imageSrc={mediaSrc}
                  onClick={() => openLightbox(mediaSrc.endsWith(".mp4") ? "video" : "image", mediaSrc)}
                />
              ))}
            </div>
          </div>



          {/* Related Projects */}
          <div className="border-t border-border/50 pt-20">
            <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
              <SectionHeader
                badge="Next Stories"
                title="Related"
                italicTitle="Productions"
                description="Explore other cinematic projects from our studio catalog."
                alignment="left"
                className="m-0"
              />
              <Link href="/projects">
                <Button variant="gold-outline">Browse All Works</Button>
              </Link>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {relatedProjects.map((p, idx) => (
                <Link key={idx} href={`/projects/${p.slug}`}>
                  <NetflixCard
                    title={p.title}
                    category={p.category}
                    tags={p.tags}
                    imageSrc={p.imageSrc}
                    videoSrc={p.videoSrc}
                    href={`/projects/${p.slug}`}
                  />
                </Link>
              ))}
            </div>
          </div>

        </div>
      </section>

      {/* GLOBAL LIGHTBOX OVERLAY */}
      <Lightbox
        isOpen={lightbox.isOpen}
        onClose={closeLightbox}
        mediaType={lightbox.type}
        mediaSrc={lightbox.src}
      />
    </div>
  );
}
