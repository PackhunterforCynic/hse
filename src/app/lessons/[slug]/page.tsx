"use client";

import React, { useState } from "react";
import { notFound } from "next/navigation";
import { lessonsData } from "@/utils/lessonsData";
import { SectionHeader } from "@/components/ui/Hero";
import Button from "@/components/ui/Button";
import Link from "next/link";
import { ArrowLeft, Play, FileText, Download, FileDown, BookOpen } from "lucide-react";

interface PageProps {
  params: {
    slug: string;
  };
}

export default function LessonDetailPage({ params }: PageProps) {
  const lesson = lessonsData.find((l) => l.slug === params.slug);

  if (!lesson) {
    notFound();
  }

  // Active Tab: overview vs transcript vs resources
  const [activeTab, setActiveTab] = useState<"overview" | "transcript" | "resources">("overview");

  return (
    <div className="relative min-h-screen pb-20">
      {/* Back button header ribbon */}
      <section className="bg-surface/30 border-b border-border py-6 px-6 md:px-12">
        <div className="max-w-7xl mx-auto w-full flex items-center justify-between z-10 relative">
          <Link
            href="/lessons"
            className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-accent hover:text-accent-hover"
          >
            <ArrowLeft className="w-4 h-4" /> Back to lessons
          </Link>
          <span className="text-[10px] font-bold text-accent uppercase tracking-widest bg-background/80 px-2 py-0.5 rounded border border-border">
            {lesson.category} • {lesson.duration}
          </span>
        </div>
      </section>

      {/* Main video player stage */}
      <section className="py-12 bg-background relative z-10">
        <div className="max-w-5xl mx-auto px-6 flex flex-col gap-8">
          
          {/* Cinema Frame Wrapper */}
          <div className="relative aspect-video w-full rounded-2xl overflow-hidden border border-border bg-black shadow-2xl">
            <video
              src={lesson.videoSrc}
              controls
              autoPlay
              className="w-full h-full object-contain"
            />
          </div>

          <div>
            <h1 className="font-serif text-2xl md:text-4xl font-bold text-heading mb-2">
              {lesson.title}
            </h1>
            <span className="text-xs text-text/50 font-medium">Academy Video Tutorial</span>
          </div>

          {/* Interactive details tabs */}
          <div className="border-b border-border/60 flex items-center gap-6 mt-4">
            {(["overview", "transcript", "resources"] as const).map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`pb-3 text-xs font-bold uppercase tracking-widest border-b-2 transition-all ${
                  activeTab === tab
                    ? "border-accent text-accent"
                    : "border-transparent text-text/50 hover:text-text/80"
                }`}
              >
                {tab}
              </button>
            ))}
          </div>

          {/* Tab Content Display */}
          <div className="min-h-[200px] leading-relaxed text-sm text-text/75">
            {activeTab === "overview" && (
              <div className="flex flex-col gap-4 animate-fade-in">
                <p>{lesson.description}</p>
                <h4 className="font-serif text-sm font-bold text-heading mt-2 uppercase tracking-wider">Learning Objectives:</h4>
                <ul className="flex flex-col gap-2 pl-4 list-disc text-xs text-text/60">
                  <li>Understand key camera/color spaces and configurations.</li>
                  <li>Learn proper node structuring or script acts setups.</li>
                  <li>Download project assets to practice local workflows.</li>
                </ul>
              </div>
            )}

            {activeTab === "transcript" && (
              <div className="bg-surface/30 p-6 rounded-xl border border-border/50 max-h-[300px] overflow-y-auto leading-loose text-xs font-mono text-text/60 animate-fade-in">
                {lesson.transcript}
              </div>
            )}

            {activeTab === "resources" && (
              <div className="flex flex-col gap-4 animate-fade-in">
                <h4 className="font-serif text-sm font-bold text-heading uppercase tracking-wider mb-2">Downloadable Attachments:</h4>
                {lesson.resources.map((res, idx) => (
                  <a
                    key={idx}
                    href={res.link}
                    className="p-4 rounded-xl border border-border bg-surface/30 hover:border-accent/40 flex items-center justify-between transition-colors group cursor-pointer"
                  >
                    <div className="flex items-center gap-3">
                      <FileDown className="w-5 h-5 text-accent" />
                      <div>
                        <span className="text-xs font-bold text-text group-hover:text-accent transition-colors block">{res.name}</span>
                        <span className="text-[10px] text-text/40">{res.size}</span>
                      </div>
                    </div>
                    <Button variant="primary" size="sm">
                      Download <Download className="w-3.5 h-3.5 ml-1" />
                    </Button>
                  </a>
                ))}
              </div>
            )}
          </div>

        </div>
      </section>
    </div>
  );
}
