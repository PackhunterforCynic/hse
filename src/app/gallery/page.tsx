"use client";

import React, { useState } from "react";
import { Hero } from "@/components/ui/Hero";
import { GalleryCard } from "@/components/ui/Card";
import Lightbox from "@/components/ui/Lightbox";
import { projectsData, Project } from "@/utils/projectsData";
import { ArrowLeft } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export default function GalleryPage() {
  const [filter, setFilter] = useState("All");
  const [activeProject, setActiveProject] = useState<Project | null>(null);

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

  const categories = ["All", ...Array.from(new Set(projectsData.map(p => p.category)))];

  const filteredProjects = filter === "All"
    ? projectsData
    : projectsData.filter(p => p.category === filter);

  return (
    <div className="relative min-h-screen">
      <Hero
        badge="Media Archive"
        title="Cinematic Studio"
        italicTitle="Gallery"
        description="Browse our curated index of photography stills, loop videos, drone rushes, behind the scenes, and student works."
        backgroundImage="https://images.unsplash.com/photo-1536440136628-849c177e76a1?auto=format&fit=crop&q=80&w=2000"
      />

      <section className="py-20 bg-background relative z-10">
        <div className="max-w-7xl mx-auto px-6">
          <AnimatePresence mode="wait">
            {!activeProject ? (
              <motion.div
                key="albums"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.4 }}
              >
                {/* Gallery Category Filter Bar */}
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

                {/* Album Covers Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {filteredProjects.map((project, idx) => (
                    <GalleryCard
                      key={idx}
                      title={project.title}
                      category={project.category}
                      imageSrc={project.imageSrc || project.gallery[0]}
                      views={`${project.gallery.length} Items`}
                      likes="View Album"
                      isIconic={idx === 0 || idx === 2}
                      onClick={() => setActiveProject(project)}
                    />
                  ))}
                </div>
              </motion.div>
            ) : (
              <motion.div
                key="photos"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.4 }}
              >
                {/* Album Header */}
                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6 mb-12">
                  <button
                    onClick={() => setActiveProject(null)}
                    className="flex items-center gap-2 text-sm font-bold uppercase tracking-widest text-text/60 hover:text-accent transition-colors group"
                  >
                    <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
                    Back to Albums
                  </button>
                  <div className="text-left sm:text-right">
                    <h2 className="text-3xl font-serif text-text mb-1">{activeProject.title}</h2>
                    <p className="text-xs font-mono uppercase tracking-widest text-accent">{activeProject.category}</p>
                  </div>
                </div>

                {/* Album Photos Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {activeProject.gallery.map((img, idx) => {
                    const viewsNum = (Math.floor(Math.random() * 5000) + 1000).toLocaleString();
                    const likesNum = Math.floor(Math.random() * 800) + 100;
                    
                    return (
                      <GalleryCard
                        key={idx}
                        title={`Shot ${idx + 1}`}
                        category={activeProject.category}
                        imageSrc={img}
                        views={`${viewsNum} views`}
                        likes={likesNum.toString()}
                        isIconic={idx === 0}
                        onClick={() => openLightbox(img.endsWith(".mp4") ? "video" : "image", img)}
                      />
                    );
                  })}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </section>

      {/* Centralized Lightbox overlay */}
      <Lightbox
        isOpen={lightbox.isOpen}
        onClose={closeLightbox}
        mediaType={lightbox.type}
        mediaSrc={lightbox.src}
      />
    </div>
  );
}
