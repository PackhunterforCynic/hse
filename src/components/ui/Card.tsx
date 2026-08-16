"use client";

import React, { useRef, useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Play, ArrowRight, Video, Camera, Sparkles, Heart, Star, Eye, Maximize } from "lucide-react";
import { cn } from "@/utils/cn";
import Link from "next/link";
import Image from "next/image";

// ----------------------------------------------------
// Netflix-Style Card
// ----------------------------------------------------
interface NetflixCardProps {
  title: string;
  category: string;
  tags?: string[];
  imageSrc: string;
  videoSrc?: string;
  href: string;
  className?: string;
  onClickDetails?: () => void;
}

export function NetflixCard({
  title,
  category,
  tags = [],
  imageSrc,
  videoSrc,
  href,
  className,
  onClickDetails,
}: NetflixCardProps) {
  const [isHovered, setIsHovered] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    if (!videoRef.current) return;
    if (isHovered) {
      const playPromise = videoRef.current.play();
      if (playPromise !== undefined) {
        playPromise.catch(() => {
          // Automatic play block fallback
        });
      }
    } else {
      videoRef.current.pause();
      videoRef.current.currentTime = 0;
    }
  }, [isHovered]);

  return (
    <Link href={href} className="block w-full h-full">
      <div
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        className={cn(
          "relative rounded-lg overflow-hidden bg-surface border border-border/40 aspect-[16/10] group cursor-pointer transition-all duration-500 hover:shadow-2xl hover:shadow-accent/5",
          className
        )}
      >
      {/* Background Media */}
      <div className="absolute inset-0 z-0">
        {/* Fallback Static Image */}
        <Image
          src={imageSrc}
          alt={title}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          className={cn(
            "object-cover transition-transform duration-700 ease-out group-hover:scale-105",
            videoSrc && isHovered ? "opacity-0" : "opacity-100"
          )}
        />

        {/* Hover Loop Video */}
        {videoSrc && (
          <video
            ref={videoRef}
            src={videoSrc}
            muted
            loop
            playsInline
            preload="none"
            className={cn(
              "absolute inset-0 w-full h-full object-cover transition-opacity duration-500",
              isHovered ? "opacity-100 scale-105" : "opacity-0"
            )}
          />
        )}
      </div>

      {/* Luxury Shadow Gradients */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent opacity-90 z-10 transition-opacity duration-300 group-hover:opacity-100" />

      {/* Card Content Overlay */}
      <div className="absolute inset-0 z-20 flex flex-col justify-end p-6">
        <span className="text-[10px] font-bold tracking-[0.2em] uppercase text-accent mb-1.5 block">
          {category}
        </span>

        <h3 className="font-serif text-lg md:text-xl font-bold text-text mb-2 group-hover:text-accent transition-colors duration-300">
          {title}
        </h3>

        {/* Hover Expanded Metadata */}
        <div className="h-0 opacity-0 overflow-hidden group-hover:h-auto group-hover:opacity-100 transition-all duration-500 ease-out">
          <div className="flex flex-wrap gap-1.5 mb-4">
            {tags.map((tag) => (
              <span
                key={tag}
                className="text-[9px] font-semibold uppercase tracking-wider bg-white/10 text-white/80 px-2 py-0.5 rounded-full"
              >
                {tag}
              </span>
            ))}
          </div>

          <div
            className="inline-flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-widest text-accent group-hover:text-accent-hover transition-colors mt-2"
          >
            Explore Story <ArrowRight className="w-3.5 h-3.5" />
          </div>
        </div>
      </div>
      </div>
    </Link>
  );
}

// ----------------------------------------------------
// YouTube-Style Testimonial Video Card
// ----------------------------------------------------
interface TestimonialCardProps {
  name: string;
  role: string;
  company?: string;
  quote: string;
  thumbnailUrl: string;
  videoUrl?: string;
  className?: string;
  onPlayClick?: (videoUrl: string) => void;
}

export function TestimonialCard({
  name,
  role,
  company,
  quote,
  thumbnailUrl,
  videoUrl,
  className,
  onPlayClick,
}: TestimonialCardProps) {
  return (
    <div
      className={cn(
        "rounded-xl overflow-hidden bg-surface border border-border flex flex-col h-full shadow-lg hover:border-accent/30 transition-all duration-300 group",
        className
      )}
    >
      {/* Video Preview Frame */}
      <div className="relative aspect-video w-full bg-black overflow-hidden flex-shrink-0">
        <Image
          src={thumbnailUrl}
          alt={`Testimonial from ${name}`}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          className="object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
        />
        {/* Play Overlay */}
        <div className="absolute inset-0 bg-black/45 flex items-center justify-center group-hover:bg-black/35 transition-colors">
          <button
            onClick={() => videoUrl && onPlayClick && onPlayClick(videoUrl)}
            className="w-14 h-14 rounded-full bg-accent/90 text-background flex items-center justify-center hover:scale-110 active:scale-95 transition-transform duration-300 shadow-xl shadow-accent/20"
            aria-label="Play video testimonial"
          >
            <Play className="w-6 h-6 fill-background stroke-none ml-1" />
          </button>
        </div>
        <div className="absolute bottom-3 left-3 bg-black/70 backdrop-blur-md px-2 py-0.5 rounded text-[10px] font-bold text-accent tracking-widest uppercase flex items-center gap-1 border border-white/5">
          <Video className="w-3 h-3" /> Video Review
        </div>
      </div>

      {/* Testimonial Core Text */}
      <div className="p-6 flex flex-col justify-between flex-grow gap-6 bg-surface/50">
        <p className="font-serif text-sm text-text/80 leading-relaxed italic relative">
          &ldquo;{quote}&rdquo;
        </p>

        <div className="flex items-center gap-3 border-t border-border/40 pt-4">
          <div className="w-9 h-9 rounded-full bg-accent/20 text-accent font-bold text-xs flex items-center justify-center border border-accent/20">
            {name[0]}
          </div>
          <div>
            <p className="text-xs font-bold text-text uppercase tracking-wider">{name}</p>
            <p className="text-[10px] text-text/50 uppercase tracking-widest mt-0.5">
              {role} {company ? `• ${company}` : ""}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

// ----------------------------------------------------
// Cinematic Gallery Thumbnail Card
// ----------------------------------------------------
interface GalleryCardProps {
  title?: string;
  category: string;
  imageSrc: string;
  views?: string;
  likes?: string;
  isIconic?: boolean;
  className?: string;
  onClick?: () => void;
}

export function GalleryCard({
  title,
  category,
  imageSrc,
  views = "1,240 views",
  likes = "112",
  isIconic = false,
  className,
  onClick,
}: GalleryCardProps) {

  return (
    <div
      onClick={onClick}
      className={cn(
        "relative rounded-[20px] overflow-hidden group aspect-[4/3] cursor-pointer bg-surface/50 border border-border/10 hover:border-accent/30 transition-all duration-500 shadow-sm hover:shadow-2xl",
        className
      )}
    >
      {/* Media Cover */}
      {imageSrc?.endsWith(".mp4") ? (
        <video
          src={imageSrc}
          className="w-full h-full object-cover group-hover:scale-[1.03] transition-transform duration-700 ease-out"
          autoPlay
          muted
          loop
          playsInline
        />
      ) : (
        <Image
          src={imageSrc}
          alt={category}
          fill
          className="object-cover group-hover:scale-[1.03] transition-transform duration-700 ease-out"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />
      )}

      {/* Dark overlay for contrast on hover */}
      <div className="absolute inset-0 bg-black/20 group-hover:bg-black/5 transition-colors duration-500 z-10" />

      {/* Top Left Tag */}
      <div className="absolute top-4 left-4 z-20">
        {isIconic ? (
          <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-md bg-[#FFD700] text-black text-[10px] font-bold uppercase tracking-widest shadow-lg">
            <Sparkles className="w-3.5 h-3.5" />
            Most Iconic
          </div>
        ) : (
          <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-md bg-black/60 backdrop-blur-md text-white text-[10px] font-bold uppercase tracking-widest shadow-lg border border-white/10">
            <Video className="w-3.5 h-3.5 text-white/70" />
            {category}
          </div>
        )}
      </div>

      {/* Top Right Actions */}
      <div className="absolute top-4 right-4 z-20 flex items-center gap-2">
        <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-md bg-black/60 backdrop-blur-md text-white text-[11px] font-semibold tracking-wider shadow-lg border border-white/10 hover:bg-black/80 transition-colors">
          <Heart className="w-3.5 h-3.5 text-white/70" />
          {likes}
        </div>
        <div className="flex items-center justify-center w-8 h-8 rounded-md bg-black/60 backdrop-blur-md text-white shadow-lg border border-white/10 hover:bg-black/80 transition-colors">
          <Star className="w-3.5 h-3.5 text-white/70" />
        </div>
      </div>

      {/* Bottom Left Views */}
      <div className="absolute bottom-4 left-4 z-20">
        <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-md bg-black/60 backdrop-blur-md text-white/90 text-[10px] font-medium tracking-wide shadow-lg border border-white/10">
          <Eye className="w-3.5 h-3.5 text-white/70" />
          {views}
        </div>
      </div>

      {/* Bottom Right Expand */}
      <div className="absolute bottom-4 right-4 z-20">
        <div className="flex items-center justify-center w-8 h-8 rounded-full bg-white/90 text-black shadow-lg hover:scale-110 active:scale-95 transition-transform">
          <Maximize className="w-4 h-4" />
        </div>
      </div>
    </div>
  );
}
