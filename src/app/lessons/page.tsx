"use client";

import React, { useState } from "react";
import { Hero } from "@/components/ui/Hero";
import { lessonsData } from "@/utils/lessonsData";
import Link from "next/link";
import Button from "@/components/ui/Button";
import { Play, Clock, ArrowRight } from "lucide-react";

export default function LessonsPage() {
  const [filter, setFilter] = useState("All");

  const categories = ["All", "Cinematography", "Color Grading", "Creative Writing"];

  const filteredLessons = filter === "All"
    ? lessonsData
    : lessonsData.filter(l => l.category === filter);

  return (
    <div className="relative min-h-screen">
      <Hero
        badge="Tutorial Hub"
        title="Video Lessons"
        italicTitle="& Guides"
        description="Browse our library of short video tutorials, editing walk-throughs, and creative scripting tutorials."
      />

      <section className="py-20 bg-background relative z-10">
        <div className="max-w-7xl mx-auto px-6">
          
          {/* Category Filter Bar */}
          <div className="flex flex-wrap items-center justify-center gap-3 mb-16">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setFilter(cat)}
                className={`px-6 py-2.5 rounded-full text-xs font-bold uppercase tracking-wider transition-all duration-300 border ${
                  filter === cat
                    ? "bg-accent border-accent text-background shadow-lg shadow-accent/15"
                    : "border-border bg-surface/40 text-text/70 hover:border-accent/40 hover:text-accent"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Lessons Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {filteredLessons.map((les) => (
              <div
                key={les.slug}
                className="group rounded-xl overflow-hidden border border-border bg-surface hover:border-accent/40 transition-all duration-300 flex flex-col justify-between"
              >
                <div>
                  {/* Video Thumbnail Box */}
                  <div className="relative aspect-video bg-black overflow-hidden flex items-center justify-center">
                    <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent z-10 opacity-60" />
                    <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(201,168,76,0.1),transparent_70%)] pointer-events-none" />
                    
                    {/* Play button indicator overlay */}
                    <div className="absolute inset-0 flex items-center justify-center z-20 group-hover:scale-105 transition-transform duration-300">
                      <div className="w-12 h-12 rounded-full border border-accent flex items-center justify-center bg-background/60 text-accent">
                        <Play className="w-5 h-5 fill-accent stroke-none ml-0.5" />
                      </div>
                    </div>

                    <span className="absolute bottom-3 left-3 z-20 text-[9px] font-bold text-accent uppercase tracking-widest bg-background/80 px-2 py-0.5 rounded flex items-center gap-1 border border-white/5">
                      <Clock className="w-3.5 h-3.5" /> {les.duration}
                    </span>
                  </div>

                  <div className="p-6 flex flex-col gap-3">
                    <span className="text-[9px] font-bold text-accent uppercase tracking-widest">
                      {les.category}
                    </span>
                    <h3 className="font-serif text-lg font-bold text-text group-hover:text-accent transition-colors">
                      {les.title}
                    </h3>
                    <p className="text-xs text-text/60 leading-relaxed">
                      {les.description}
                    </p>
                  </div>
                </div>

                <div className="p-6 border-t border-border/50 flex items-center justify-between">
                  <Link href={`/lessons/${les.slug}`} className="w-full">
                    <Button variant="primary" size="sm" className="w-full">
                      Watch Lesson <ArrowRight className="w-3.5 h-3.5 ml-1" />
                    </Button>
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
