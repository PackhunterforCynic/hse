"use client";

import React, { useState, useEffect } from "react";
import Button from "@/components/ui/Button";
import { SectionHeader } from "@/components/ui/Hero";
import { NetflixCard, GalleryCard } from "@/components/ui/Card";
import Timeline from "@/components/ui/Timeline";
import Counter from "@/components/ui/Counter";
import Lightbox from "@/components/ui/Lightbox";
import { Film, Play, ArrowRight, BookOpen, Calendar, Mail, Sparkles, Tv, HelpCircle } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { projectsData } from "@/utils/projectsData";
import { useLanguage } from "@/context/LanguageContext";
import Showreel from "@/components/Showreel";
import ServicesPreview from "@/components/ServicesPreview";
import { ProductionPipeline } from "@/components/ui/ProductionPipeline";
import ClientMarquee from "@/components/ClientMarquee";

export default function Home() {
  const { t } = useLanguage();
  // Global Lightbox State
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

  // Real Projects Data
  const projects = projectsData.slice(0, 6).map((p) => ({
    title: p.title,
    category: p.category,
    tags: p.tags,
    imageSrc: p.imageSrc,
    videoSrc: p.videoSrc,
    href: `/projects/${p.slug}`,
  }));

  const services = [
    {
      title: "Film Production",
      description: "Award-winning film and commercial production sets.",
      badge: "Productions",
      href: "/services/film-production",
    },
    {
      title: "Photography",
      description: "Editorial and brand photography with a distinctive visual language.",
      badge: "Stills",
      href: "/services/photography",
    },
    {
      title: "Digital Marketing",
      description: "End-to-end digital growth and brand solutions.",
      badge: "Growth",
      href: "/services/digital-marketing",
    },
  ];

  const timelineSteps = [
    {
      step: "01",
      title: "Pre-Production Planning",
      description: "We map out script treatments, character storyboards, location scouts, casting grids, and scheduling boards.",
    },
    {
      step: "02",
      title: "Cinematic Principal Photography",
      description: "Our crew shoots using luxury camera systems, custom anamorphic lenses, and precision lighting sets.",
    },
    {
      step: "03",
      title: "Post-Production Crafting",
      description: "We handle color matching, Dolby Atmos mixing, cinematic edit grading, and final delivery outputs.",
    },
  ];


  const galleryItems = projectsData
    .map((project) => ({
      title: project.title,
      category: "bts" as const,
      imageSrc: project.imageSrc,
    }))
    .slice(0, 6);

  return (
    <div className="relative min-h-screen">
      {/* 1. FULLSCREEN VIDEO HERO */}
      <section className="relative h-screen w-full flex items-center justify-center overflow-hidden bg-black z-10">
        {/* Desktop Video */}
        <video
          src="/videos/Havilah.mp4"
          autoPlay
          muted
          loop
          playsInline
          poster="/images/indo korean/011.webp"
          className="absolute inset-0 w-full h-full object-cover opacity-50 z-0 scale-105 hidden md:block"
        />
        {/* Mobile Video */}
        <video
          src="/videos/Havilah.mp4"
          autoPlay
          muted
          loop
          playsInline
          poster="/images/indo korean/011.webp"
          className="absolute inset-0 w-full h-full object-cover opacity-50 z-0 scale-105 md:hidden"
        />

        {/* Cinematic Shading Gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/20 to-black z-10" />

        {/* Hero Content */}
        <div className="relative max-w-5xl mx-auto px-6 z-20 text-center flex flex-col items-center gap-8">
          
          <h1 className="text-4xl sm:text-6xl md:text-8xl font-serif font-bold text-white tracking-tight leading-tight uppercase animate-fade-in-up">
            Where Brands <span className="text-accent italic font-normal lowercase">Strike Gold</span>.
          </h1>

          <p className="text-base sm:text-lg md:text-xl text-white/70 max-w-3xl leading-relaxed animate-fade-in font-medium">
            Havilah is a media and growth marketing studio for people and companies with something worth telling — and worth growing.
          </p>

          <p className="text-xs sm:text-sm text-accent/90 uppercase tracking-[0.2em] font-mono animate-fade-in font-semibold">
            We shoot it. We shape it. We scale it.
          </p>

          <div className="flex flex-col sm:flex-row items-center gap-4 mt-4 animate-fade-in">
            <Button
              variant="primary"
              size="lg"
              onClick={() => {
                const projectSection = document.getElementById("projects");
                projectSection?.scrollIntoView({ behavior: "smooth" });
              }}
            >
              Explore Productions <ArrowRight className="w-4 h-4 ml-1" />
            </Button>
            <Link href="/contact" className="w-full sm:w-auto">
              <Button
                variant="secondary"
                size="lg"
                className="w-full"
              >
                <Mail className="w-4 h-4 text-accent" /> Contact Us
              </Button>
            </Link>
          </div>
        </div>

        {/* Scroll cue mouse loop */}
        <div className="absolute bottom-10 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center gap-2 opacity-50 hover:opacity-100 transition-opacity">
          <span className="text-[9px] font-bold text-white uppercase tracking-[0.3em]">Scroll Down</span>
          <div className="w-6 h-10 rounded-full border border-white/40 flex justify-center p-1.5">
            <div className="w-1 h-2 rounded-full bg-accent animate-bounce" />
          </div>
        </div>
      </section>

      {/* 2. STATISTICS COUNTERS SECTION */}
      <section className="py-20 border-b border-border bg-background relative z-20">
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-2 lg:grid-cols-4 gap-6">
          <Counter end={150} suffix="+" label="Productions Completed" />
          <Counter end={40} suffix="k+" label="Academy Students" />
          <Counter end={12} suffix="" label="Creative Awards" />
          <Counter end={5} suffix="" label="Global Offices" />
        </div>
      </section>

      {/* 3. FEATURED PROJECTS SECTION */}
      <section id="projects" className="py-24 border-b border-border bg-background relative z-20">
        <div className="max-w-7xl mx-auto px-6">
          <SectionHeader
            badge="Portfolio"
            title={t("home.featured")}
            italicTitle="Productions"
            description="Explore our curated gallery of feature narratives, high-impact commercials, and award-winning documentaries."
            className="mb-16"
          />

          <div className="flex flex-col md:grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {projects.map((proj, idx) => (
              <div 
                key={idx}
                className="sticky md:static transition-all duration-500"
                style={{ 
                  top: `calc(6rem + ${idx * 1.5}rem)`,
                  zIndex: idx 
                }}
              >
                <NetflixCard
                  title={proj.title}
                  category={proj.category}
                  tags={proj.tags}
                  imageSrc={proj.imageSrc}
                  videoSrc={proj.videoSrc}
                  href={proj.href}
                  onClickDetails={() => openLightbox("video", proj.videoSrc)}
                />
              </div>
            ))}
          </div>

          <div className="text-center mt-16">
            <Link href="/projects">
              <Button variant="gold-outline">View All Projects</Button>
            </Link>
          </div>
        </div>
      </section>

      {/* 3.5. CINEMATIC SHOWREEL SECTION */}
      <Showreel />

      {/* 3.6. PRODUCTION PIPELINE SCROLLYTELLING */}
      <ProductionPipeline />

      {/* 4. SERVICES OVERVIEW SECTION */}
      <section className="py-24 border-b border-border bg-surface/30 backdrop-blur-sm relative z-20">
        <div className="max-w-7xl mx-auto px-6">
          <SectionHeader
            badge="Capabilities"
            title="Creative"
            italicTitle="Studio Services"
            description="We bridge the gap between creative visual artistry and strategic market positioning."
            className="mb-16"
          />

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {services.map((serv, idx) => (
              <div
                key={idx}
                className="glassmorphism-card p-8 rounded-xl flex flex-col gap-6 hover:border-accent/40 hover:-translate-y-1 transition-all duration-300 group"
              >
                <div className="w-12 h-12 rounded-full border border-border flex items-center justify-center text-accent bg-surface group-hover:border-accent group-hover:bg-accent/10 transition-colors">
                  <Sparkles className="w-5 h-5" />
                </div>
                <div>
                  <span className="text-[10px] font-bold text-accent tracking-widest uppercase block mb-1">
                    {serv.badge}
                  </span>
                  <h3 className="font-serif text-lg font-bold text-text group-hover:text-accent transition-colors">
                    {serv.title}
                  </h3>
                  <p className="text-xs text-text/60 mt-3 leading-relaxed">
                    {serv.description}
                  </p>
                </div>
                <Link
                  href={serv.href}
                  className="mt-auto text-[10px] font-bold text-accent group-hover:text-accent-hover uppercase tracking-widest flex items-center gap-1.5"
                >
                  Learn More <ArrowRight className="w-3 h-3 transition-transform group-hover:translate-x-1" />
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 4. SERVICES OVERVIEW SECTION */}
      <ServicesPreview />

      {/* 5. CLIENT MARQUEE */}
      <ClientMarquee />

      {/* 9. CINEMATIC GALLERY PREVIEW */}
      <section className="py-24 border-b border-border bg-background relative z-20">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
            <SectionHeader
              badge="Behind The Scenes"
              title="Studio Still"
              italicTitle="Gallery Preview"
              description="Captured moments from active shoot sets, drone sweeps, and sound stage setups."
              alignment="left"
              className="m-0"
            />
            <Link href="/gallery">
              <Button variant="gold-outline">Browse Gallery</Button>
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
            {galleryItems.map((item, idx) => (
              <GalleryCard
                key={idx}
                title={item.title}
                category={item.category}
                imageSrc={item.imageSrc}
                onClick={() => openLightbox("image", item.imageSrc)}
              />
            ))}
          </div>
        </div>
      </section>

      {/* 10. CONTACT CTA SECTION */}
      <section className="py-32 bg-surface/40 relative overflow-hidden z-20">
        {/* Gold light leak backdrops */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(201,168,76,0.06),transparent_60%)] pointer-events-none" />

        <div className="max-w-5xl mx-auto px-6 text-center flex flex-col items-center gap-8 relative z-10">
          <SectionHeader
            badge="Ready to Collaborate?"
            title="Let's Film Your"
            italicTitle="Next Masterpiece"
            description="Whether you have a script that needs a crew, a brand that needs a vision, or you are looking to register for academy workshops, our studio doors are open."
            className="mb-4"
          />

          <div className="flex flex-col sm:flex-row items-center gap-4">
            <Link href="/requests">
              <Button variant="primary" size="lg">
                Inquire Project Quote
              </Button>
            </Link>
            <Link href="/appointments">
              <Button variant="secondary" size="lg">
                Schedule Call Briefing
              </Button>
            </Link>
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
