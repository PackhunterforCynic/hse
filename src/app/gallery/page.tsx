"use client";

import React, { useState } from "react";
import { Hero } from "@/components/ui/Hero";
import { GalleryCard } from "@/components/ui/Card";
import Lightbox from "@/components/ui/Lightbox";
import { projectsData } from "@/utils/projectsData";

export default function GalleryPage() {
  const [filter, setFilter] = useState("All");

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

  // Generate gallery items from projectsData
  const projectItems = projectsData.flatMap((project, i) => {
    return project.gallery.map((img, j) => {
      const viewsNum = (Math.floor(Math.random() * 5000) + 1000).toLocaleString();
      const likesNum = Math.floor(Math.random() * 800) + 100;
      const isIconic = j === 0 && (i === 0 || i === 2);
      let category = project.tags[0] || "Cinematic";
      if (category.length > 15) category = category.substring(0, 15);

      return {
        title: project.title,
        category: category.toUpperCase(),
        type: "image" as const,
        src: img,
        imageSrc: img,
        views: `${viewsNum} views`,
        likes: likesNum.toString(),
        isIconic,
      };
    });
  });

  const galleryItems = [...projectItems];

  const categories = ["All", ...Array.from(new Set(galleryItems.map(item => item.category)))];

  const filteredItems = filter === "All"
    ? galleryItems
    : galleryItems.filter(item => item.category === filter);

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

          {/* Masonry-like Grid matching reference */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredItems.map((item, idx) => (
              <GalleryCard
                key={idx}
                title={item.title}
                category={item.category}
                imageSrc={item.imageSrc}
                views={item.views}
                likes={item.likes}
                isIconic={item.isIconic}
                onClick={() => openLightbox(item.type, item.src)}
              />
            ))}
          </div>

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
