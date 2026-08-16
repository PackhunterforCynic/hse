"use client";

import React, { useState } from "react";
import { ProjectsHeroCarousel } from "@/components/ui/ProjectsHeroCarousel";
import { NetflixCard } from "@/components/ui/Card";
import { projectsData } from "@/utils/projectsData";
import Link from "next/link";

export default function ProjectsPage() {
  const [filter, setFilter] = useState("All");

  const categories = ["All", "Narratives", "Branding", "Documentaries", "Commercials"];

  const filteredProjects = filter === "All"
    ? projectsData
    : projectsData.filter(proj => proj.category === filter);

  const featuredProjectsForHero = projectsData.slice(0, 4);

  return (
    <div className="relative min-h-screen">
      <ProjectsHeroCarousel projects={featuredProjectsForHero} />

      <section className="py-16 bg-background relative z-10">
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

          {/* Projects Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredProjects.map((proj) => (
              <Link key={proj.slug} href={`/projects/${proj.slug}`} className="block">
                <NetflixCard
                  title={proj.title}
                  category={proj.category}
                  tags={proj.tags}
                  imageSrc={proj.imageSrc}
                  videoSrc={proj.videoSrc}
                  href={`/projects/${proj.slug}`}
                />
              </Link>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
