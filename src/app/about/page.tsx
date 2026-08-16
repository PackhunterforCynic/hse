"use client";

import React from "react";
import { Hero } from "@/components/ui/Hero";
import { SectionHeader } from "@/components/ui/Hero";
import { Award, Film, Play, Sparkles, MapPin } from "lucide-react";
import Button from "@/components/ui/Button";
import Link from "next/link";
import Image from "next/image";
import { useLanguage } from "@/context/LanguageContext";

export default function AboutPage() {
  const { t } = useLanguage();
  const team = [
    {
      name: "Praise",
      role: "Creative Director",
      bio: "Praise has spent over a decade shaping the visual narratives of independent films and luxury brands. His approach blends rigorous strategic thinking with an uncompromising aesthetic vision.",
      avatarUrl: "/praise.png",
    },
    {
      name: "Vineeth",
      role: "Lead Cinematographer",
      bio: "Vineeth anchors the technical execution of our most ambitious projects, bridging the gap between grand ideas and flawless delivery.",
      avatarUrl: "/vineeth.png",
    },
    {
      name: "Reshma",
      role: "Creative Strategist",
      bio: "Reshma brings a unique perspective and deep dedication to the creative process at Havilah, supporting campaigns and brand system integrations.",
      avatarUrl: "/reshma.jpeg",
    },
    {
      name: "Robinson J",
      role: "Director & Master of Light/Motion",
      bio: "With a background in architecture and fine art photography, Robinson brings a uniquely structured yet emotional eye to every frame he captures for Havilah.",
      avatarUrl: "/robinson.png",
    },
  ];

  const awards = [
    { title: "Best Cinematography Short", event: "NY Film Festival", year: "2025" },
    { title: "Brand Identity Design Gold", event: "Creative Guild Awards", year: "2024" },
    { title: "Outstanding Ecological Doc", event: "Eco Green Screenings", year: "2025" },
  ];

  return (
    <div className="relative min-h-screen">
      <Hero
        badge="About Us"
        title="Our Story"
        italicTitle="& Vision"
        description="We are a collective of filmmakers, designers, and strategists dedicated to crafting premium visual experiences."
        backgroundImage="https://images.unsplash.com/photo-1542744094-3a31f103e35f?auto=format&fit=crop&q=80&w=2000"
      />

      {/* Story, Mission & Vision */}
      <section className="py-20 border-b border-border bg-background relative z-10">
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-12">
          <div className="flex flex-col items-start gap-4">
            <SectionHeader
              badge="Heritage"
              title="Stories that Inspire"
              italicTitle="Films that Endure"
              alignment="left"
              className="m-0"
            />
            <p className="text-sm text-text/70 leading-relaxed mt-4">
              Founded in 2020, Havilah was born out of a desire to merge raw, authentic cinematic aesthetics with deliberate corporate identity systems. We believe that whether it is a 60-second web spot or a 90-minute feature documentary, storytelling is the foundational driver of human value.
            </p>
          </div>
          <div className="flex flex-col gap-8 bg-surface border border-accent/20 p-10 md:p-12 rounded-[24px] shadow-2xl justify-center relative overflow-hidden">
            {/* Background glowing accent */}
            <div className="absolute top-0 right-0 w-64 h-64 bg-accent/10 rounded-full blur-[80px] pointer-events-none" />
            
            <div className="relative z-10">
              <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-accent/20 bg-accent/10 text-accent text-[10px] font-bold uppercase tracking-[0.2em] mb-4">
                <Sparkles className="w-3 h-3" /> Our Mission
              </span>
              <p className="font-serif text-xl md:text-2xl text-text leading-relaxed">
                To produce immersive visual works that stand the test of time, and to educate the next generation of creative filmmakers through practical set workshops.
              </p>
            </div>
            
            <div className="border-t border-border/50 pt-8 relative z-10">
              <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-accent/20 bg-accent/10 text-accent text-[10px] font-bold uppercase tracking-[0.2em] mb-4">
                <MapPin className="w-3 h-3" /> Our Vision
              </span>
              <p className="font-serif text-xl md:text-2xl text-text leading-relaxed">
                To remain a global creative standard for production, strategic branding design, and peer-to-peer film education.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Creative Team */}
      <section className="py-24 border-b border-border bg-surface/30 backdrop-blur-sm relative z-10">
        <div className="max-w-7xl mx-auto px-6">
          <SectionHeader
            badge="The Crew"
            title={t("about.team")}
            italicTitle="Founders"
            description="Our studio is driven by working practitioners with years of collective set experience."
            className="mb-16"
          />

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {team.map((member, idx) => (
              <div
                key={idx}
                className="group border border-border/60 bg-background/50 rounded-xl overflow-hidden flex flex-col hover:border-accent/40 transition-colors"
              >
                <div className="relative aspect-square overflow-hidden bg-black flex-shrink-0">
                  <Image
                    src={member.avatarUrl}
                    alt={member.name}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                  />
                </div>
                <div className="p-6 flex flex-col flex-grow justify-between gap-4">
                  <div>
                    <span className="text-[9px] font-bold text-accent uppercase tracking-widest block mb-1">{member.role}</span>
                    <h4 className="font-serif text-lg font-bold text-text">{member.name}</h4>
                    <p className="text-xs text-text/60 leading-relaxed mt-2">{member.bio}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Awards Shelf */}
      <section className="py-24 bg-background relative z-10">
        <div className="max-w-7xl mx-auto px-6">
          <SectionHeader
            badge="Accolades"
            title="Studio Award"
            italicTitle="Shelf"
            description="Recognition of our visual craft across global networks."
            className="mb-16"
          />

          <div className="flex flex-col gap-4">
            {awards.map((aw, idx) => (
              <div
                key={idx}
                className="p-6 border border-border/60 bg-surface/30 rounded-xl flex items-center justify-between gap-6"
              >
                <div className="flex items-center gap-4">
                  <Award className="w-6 h-6 text-accent flex-shrink-0" />
                  <div>
                    <h4 className="text-sm font-bold text-text uppercase tracking-wider">{aw.title}</h4>
                    <span className="text-[10px] text-text/45 uppercase tracking-widest">{aw.event}</span>
                  </div>
                </div>
                <span className="font-serif text-lg font-bold text-accent">{aw.year}</span>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
