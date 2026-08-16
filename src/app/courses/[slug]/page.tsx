"use client";

import React, { useState } from "react";
import { notFound } from "next/navigation";
import { coursesData } from "@/utils/coursesData";
import { SectionHeader } from "@/components/ui/Hero";
import Button from "@/components/ui/Button";
import Link from "next/link";
import { ArrowLeft, Check, BookOpen, Star, Award, ShieldCheck } from "lucide-react";
import Image from "next/image";

interface PageProps {
  params: {
    slug: string;
  };
}

export default function CourseDetailPage({ params }: PageProps) {
  const course = coursesData.find((c) => c.slug === params.slug);

  if (!course) {
    notFound();
  }

  // Accordion active state
  const [activeWeek, setActiveWeek] = useState<number | null>(0);

  return (
    <div className="relative min-h-screen pb-20">
      {/* Course Header */}
      <section className="relative bg-surface/30 border-b border-border py-24 px-6 md:px-12">
        <div className="max-w-7xl mx-auto w-full flex flex-col items-start gap-4 z-10 relative">
          <Link
            href="/courses"
            className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-accent hover:text-accent-hover mb-4"
          >
            <ArrowLeft className="w-4 h-4" /> Back to courses
          </Link>

          <div className="flex items-center gap-3">
            <span className="text-xs font-bold uppercase tracking-[0.25em] text-accent">
              {course.category} Track
            </span>
            <span className="text-[10px] text-text/40 font-semibold uppercase tracking-wider">
              {course.hours} • {course.level}
            </span>
          </div>

          <h1 className="font-serif text-4xl md:text-6xl font-bold text-heading leading-tight uppercase">
            {course.title}
          </h1>

          <p className="text-base md:text-lg text-text/60 max-w-2xl leading-relaxed mt-2">
            {course.tagline}
          </p>
        </div>
      </section>

      {/* Main course detail section */}
      <section className="py-20 bg-background relative z-10">
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-12 gap-12">
          
          {/* Syllabus & Instructor */}
          <div className="lg:col-span-8 flex flex-col gap-12">
            <div>
              <h3 className="font-serif text-xl font-bold text-heading mb-4">Course Overview</h3>
              <p className="text-sm text-text/70 leading-relaxed">{course.description}</p>
            </div>

            {/* Curriculum Accordion */}
            <div>
              <h3 className="font-serif text-xl font-bold text-heading mb-6 border-b border-border/50 pb-2">
                Course Syllabus
              </h3>
              <div className="flex flex-col gap-4">
                {course.syllabus.map((week, idx) => (
                  <div
                    key={idx}
                    className="border border-border rounded-xl bg-surface/30 overflow-hidden"
                  >
                    <button
                      onClick={() => setActiveWeek(activeWeek === idx ? null : idx)}
                      className="w-full px-6 py-4 flex items-center justify-between font-serif font-bold text-sm md:text-base text-text hover:text-accent transition-colors"
                    >
                      <span>{week.week}: {week.title}</span>
                      <BookOpen className={`w-4 h-4 text-accent transition-transform ${activeWeek === idx ? "rotate-90" : ""}`} />
                    </button>
                    {activeWeek === idx && (
                      <div className="px-6 pb-6 pt-2 border-t border-border/50 bg-background/20 flex flex-col gap-2">
                        {week.topics.map((top, tIdx) => (
                          <div key={tIdx} className="flex items-start gap-2 text-xs text-text/75 leading-relaxed">
                            <Check className="w-4 h-4 text-accent flex-shrink-0 mt-0.5" />
                            <span>{top}</span>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>

            {/* Student reviews */}
            <div>
              <h3 className="font-serif text-xl font-bold text-heading mb-6 border-b border-border/50 pb-2">
                Student Reviews
              </h3>
              <div className="grid grid-cols-1 gap-6">
                {course.reviews.map((rev, idx) => (
                  <div key={idx} className="p-6 border border-border/50 bg-surface/30 rounded-xl flex flex-col gap-3">
                    <div className="flex items-center justify-between">
                      <h4 className="text-xs font-bold text-text uppercase tracking-wider">{rev.student}</h4>
                      <div className="flex items-center gap-0.5 text-accent">
                        {Array.from({ length: rev.rating }).map((_, rIdx) => (
                          <Star key={rIdx} className="w-3 h-3 fill-accent" />
                        ))}
                      </div>
                    </div>
                    <p className="text-xs text-text/65 italic leading-relaxed">
                      &ldquo;{rev.quote}&rdquo;
                    </p>
                  </div>
                ))}
              </div>
            </div>

          </div>

          {/* Instructor Bio & Enrollment card Sidebar */}
          <div className="lg:col-span-4 flex flex-col gap-8">
            
            {/* Instructor Card */}
            <div className="p-6 border border-border bg-surface/40 rounded-xl flex flex-col gap-4">
              <div className="flex items-center gap-4">
                <Image
                  src={course.instructor.avatarUrl}
                  alt={course.instructor.name}
                  width={56}
                  height={56}
                  className="rounded-full object-cover border border-accent/40"
                />
                <div>
                  <h4 className="text-sm font-bold text-text uppercase tracking-wider">{course.instructor.name}</h4>
                  <p className="text-[10px] text-text/50 uppercase tracking-widest mt-0.5">{course.instructor.role}</p>
                </div>
              </div>
              <p className="text-xs text-text/60 leading-relaxed border-t border-border/50 pt-3 mt-1">
                {course.instructor.bio}
              </p>
            </div>

            {/* Certificate Widget */}
            <div className="p-6 border border-border bg-surface/40 rounded-xl flex flex-col gap-4">
              <div className="flex items-center gap-2 text-accent border-b border-border/50 pb-3">
                <Award className="w-5 h-5" />
                <h4 className="text-xs font-bold uppercase tracking-widest">
                  Diploma Certification
                </h4>
              </div>
              <p className="text-xs text-text/60 leading-relaxed">
                Graduates receive a Havilah Academy Professional Certificate, detailing course hours and specific cinematography, branding or post achievements.
              </p>
              <div className="border border-dashed border-border p-4 bg-background/30 rounded text-center flex flex-col gap-1 items-center">
                <ShieldCheck className="w-8 h-8 text-accent/70" />
                <span className="text-[10px] font-bold text-text uppercase tracking-wider mt-1">Verified Credential</span>
              </div>
            </div>

            {/* Enrollment Widget */}
            <div className="glassmorphism p-6 rounded-xl text-center flex flex-col gap-4">
              <span className="text-xs text-text/50 uppercase tracking-wider">Registration status:</span>
              <span className="text-xl font-bold text-accent uppercase tracking-widest">OPEN</span>
              <Link href="/internships#application-form" className="w-full">
                <Button variant="primary" className="w-full">
                  Enroll Course
                </Button>
              </Link>
            </div>

          </div>

        </div>
      </section>
    </div>
  );
}
