"use client";

import React, { useState } from "react";
import { Hero } from "@/components/ui/Hero";
import { coursesData } from "@/utils/coursesData";
import Link from "next/link";
import Button from "@/components/ui/Button";
import { ArrowRight, BookOpen, Clock, Users, PlayCircle, Briefcase, Camera, Film } from "lucide-react";
import Image from "next/image";

export default function CoursesPage() {
  const [filter, setFilter] = useState("All");

  const categories = ["All", "Camera & Lighting", "Branding", "Post-Production"];

  const filteredCourses = filter === "All"
    ? coursesData
    : coursesData.filter(c => c.category === filter);

  return (
    <div className="relative min-h-screen">
      <Hero
        badge="Academy Masterclasses"
        title="Cinematic Learning"
        italicTitle="Curriculum"
        description="Select from three professional tracks designed to build commercial portfolios and master cinema workflows."
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

          {/* Courses Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {filteredCourses.map((course) => (
              <div
                key={course.slug}
                className="group rounded-xl overflow-hidden border border-border bg-surface hover:border-accent/40 transition-all duration-300 flex flex-col justify-between"
              >
                <div>
                  <div className="relative aspect-[4/3] overflow-hidden bg-black">
                    <Image
                      src={course.imageSrc}
                      alt={course.title}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                    />
                    <div className="absolute top-4 left-4 bg-background/80 backdrop-blur-md border border-border px-2 py-0.5 rounded text-[10px] font-bold text-accent uppercase tracking-wider">
                      Academy Certified
                    </div>
                  </div>
                  <div className="p-6 flex flex-col gap-4">
                    <div className="flex items-center justify-between gap-2">
                      <span className="text-[9px] font-bold text-accent uppercase tracking-widest">{course.level}</span>
                      <span className="text-[9px] font-medium text-text/40 uppercase">{course.hours}</span>
                    </div>
                    <h3 className="font-serif text-lg font-bold text-text group-hover:text-accent transition-colors">
                      {course.title}
                    </h3>
                    <p className="text-xs text-text/60 leading-relaxed">
                      {course.tagline}
                    </p>
                  </div>
                </div>

                <div className="p-6 border-t border-border/50 flex items-center justify-between">
                  <Link href={`/courses/${course.slug}`} className="w-full">
                    <Button variant="primary" size="sm" className="w-full">
                      View Syllabus <ArrowRight className="w-3.5 h-3.5 ml-1" />
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
