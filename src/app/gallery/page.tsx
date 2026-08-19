"use client";

import React, { useState } from "react";
import { Hero } from "@/components/ui/Hero";
import Lightbox from "@/components/ui/Lightbox";
import { projectsData, Project } from "@/utils/projectsData";
import { ArrowLeft } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const PhysicalAlbumCard = ({ project, onClick }: { project: Project, onClick: () => void }) => {
  return (
    <div 
      className="group relative w-full aspect-[3/4] cursor-pointer"
      style={{ perspective: '1200px' }}
      onClick={onClick}
    >
      <div 
        className="relative w-full h-full transition-transform duration-700 ease-out"
        style={{ transformStyle: 'preserve-3d', transform: 'rotateY(-5deg) scale(0.95)' }}
      >
        {/* Book hover effect */}
        <div className="absolute inset-0 w-full h-full transition-transform duration-700 ease-out group-hover:rotateY-[-15deg] group-hover:scale-105" style={{ transformStyle: 'preserve-3d' }}>
          
          {/* Pages (Right Edge) */}
          <div 
            className="absolute right-0 top-2 bottom-2 w-8 bg-white/90 translate-x-4 rounded-r-sm z-0 shadow-xl"
            style={{ transform: 'rotateY(90deg)', transformOrigin: 'right' }}
          />

          {/* Front Cover */}
          <div className="absolute inset-0 bg-surface rounded-r-2xl rounded-l-md overflow-hidden shadow-2xl z-10 border border-white/10 before:absolute before:inset-y-0 before:left-0 before:w-8 before:bg-gradient-to-r before:from-black/80 before:via-black/20 before:to-transparent before:z-20">
            <img src={project.imageSrc || project.gallery[0]} alt={project.title} className="w-full h-full object-cover" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent group-hover:opacity-80 transition-opacity duration-500 z-10" />
            
            <div className="absolute bottom-8 left-10 right-8 z-30">
              <h3 className="text-3xl font-serif text-white uppercase tracking-widest mb-2" style={{ textShadow: '2px 2px 10px rgba(0,0,0,0.8)' }}>
                {project.title}
              </h3>
              <p className="text-xs font-mono text-accent uppercase tracking-widest mb-4">
                {project.category}
              </p>
              <span className="text-[10px] font-bold uppercase tracking-widest text-white/50 border border-white/20 px-3 py-1 rounded-full backdrop-blur-md">
                {project.gallery.length} Photos
              </span>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};

const PolaroidCard = ({ img, title, index, onClick }: { img: string, title: string, index: number, onClick: () => void }) => {
  // Generate deterministic but random-looking rotations and offsets
  const rotations = [-6, 4, -3, 7, -8, 5, -2, 6];
  const margins = ['mt-0', 'mt-12', 'mt-4', 'mt-16', 'mt-8'];
  
  const rotation = rotations[index % rotations.length];
  const marginTop = margins[index % margins.length];

  return (
    <motion.div 
      initial={{ opacity: 0, scale: 0.8, rotate: rotation - 10 }}
      animate={{ opacity: 1, scale: 1, rotate: rotation }}
      transition={{ duration: 0.6, delay: index * 0.05, type: "spring" }}
      className={`group relative bg-[#f8f8f8] p-3 sm:p-4 pb-12 sm:pb-16 shadow-[0_20px_40px_-15px_rgba(0,0,0,0.7)] cursor-pointer transition-all duration-500 hover:scale-[1.15] hover:z-50 hover:rotate-0 hover:shadow-[0_30px_50px_-15px_rgba(0,0,0,0.9)] ${marginTop}`}
      onClick={onClick}
    >
      <div className="relative w-full aspect-square bg-black overflow-hidden border border-black/5 shadow-inner">
        <img 
          src={img} 
          alt={title} 
          className="w-full h-full object-cover filter contrast-[1.05] saturate-[1.1] sepia-[0.1] group-hover:scale-105 transition-transform duration-700" 
        />
        {/* Subtle vintage overlay */}
        <div className="absolute inset-0 bg-orange-900/10 mix-blend-overlay pointer-events-none" />
      </div>
      <div className="absolute bottom-4 left-0 right-0 flex items-center justify-center px-4">
        <p className="text-[#333] font-serif italic text-sm sm:text-lg opacity-80 group-hover:opacity-100 transition-opacity">
          {title}
        </p>
      </div>
    </motion.div>
  );
};

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
        title="Lovable"
        italicTitle="Memories"
        description="Preserve your memories and share it with your family. Explore our physical albums."
        backgroundImage="https://images.unsplash.com/photo-1536440136628-849c177e76a1?auto=format&fit=crop&q=80&w=2000"
      />

      <section className="py-24 bg-[#0a0a0a] relative z-10 overflow-hidden">
        {/* Optional: Wooden texture overlay for the background */}
        <div className="absolute inset-0 opacity-[0.03] pointer-events-none mix-blend-overlay" style={{ backgroundImage: 'url("https://www.transparenttextures.com/patterns/wood-pattern.png")' }} />
        
        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <AnimatePresence mode="wait">
            {!activeProject ? (
              <motion.div
                key="albums"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -30, scale: 0.95 }}
                transition={{ duration: 0.5 }}
              >
                {/* Gallery Category Filter Bar */}
                <div className="flex flex-wrap items-center justify-center gap-3 mb-20">
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
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-12 gap-y-20">
                  {filteredProjects.map((project, idx) => (
                    <motion.div 
                      key={project.slug}
                      initial={{ opacity: 0, y: 50 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: idx * 0.1, duration: 0.6 }}
                    >
                      <PhysicalAlbumCard
                        project={project}
                        onClick={() => setActiveProject(project)}
                      />
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            ) : (
              <motion.div
                key="photos"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.5 }}
              >
                {/* Album Header */}
                <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6 mb-16 pb-8 border-b border-white/10">
                  <button
                    onClick={() => setActiveProject(null)}
                    className="flex items-center gap-3 text-sm font-bold uppercase tracking-widest text-text hover:text-accent transition-colors group bg-surface/50 px-6 py-3 rounded-full border border-white/10 hover:border-accent/50"
                  >
                    <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
                    Close Album
                  </button>
                  <div className="text-left md:text-right">
                    <h2 className="text-4xl md:text-5xl font-serif text-white mb-2 tracking-tight">{activeProject.title}</h2>
                    <p className="text-sm font-mono uppercase tracking-widest text-accent/80">{activeProject.category}</p>
                  </div>
                </div>

                {/* Scattered Polaroid Photos Grid */}
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 sm:gap-10 pb-20">
                  {activeProject.gallery.map((img, idx) => (
                    <PolaroidCard
                      key={idx}
                      index={idx}
                      img={img}
                      title={`Shot ${idx + 1}`}
                      onClick={() => openLightbox(img.endsWith(".mp4") ? "video" : "image", img)}
                    />
                  ))}
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
