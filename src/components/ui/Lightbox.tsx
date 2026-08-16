"use client";

import React, { useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Loader2 } from "lucide-react";
import { cn } from "@/utils/cn";
import Image from "next/image";

interface LightboxProps {
  isOpen: boolean;
  onClose: () => void;
  mediaType: "image" | "video" | "youtube";
  mediaSrc: string;
  className?: string;
}

export default function Lightbox({
  isOpen,
  onClose,
  mediaType,
  mediaSrc,
  className,
}: LightboxProps) {
  // Disable body scroll when open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  const getYoutubeEmbedUrl = (url: string) => {
    try {
      if (url.includes("youtube.com/embed/")) return url;
      let videoId = "";
      if (url.includes("youtu.be/")) {
        videoId = url.split("youtu.be/")[1]?.split("?")[0];
      } else if (url.includes("youtube.com/watch?v=")) {
        videoId = url.split("v=")[1]?.split("&")[0];
      }
      return videoId ? `https://www.youtube.com/embed/${videoId}?autoplay=1` : url;
    } catch {
      return url;
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
          className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/95 backdrop-blur-md p-4"
          onClick={onClose}
        >
          {/* Close Button */}
          <button
            onClick={onClose}
            className="absolute top-6 right-6 w-12 h-12 rounded-full bg-white/10 hover:bg-accent hover:text-background border border-white/10 flex items-center justify-center text-white transition-all duration-300 z-50 hover:scale-105 active:scale-95"
            aria-label="Close modal"
          >
            <X className="w-5 h-5" />
          </button>

          {/* Modal Container */}
          <motion.div
            initial={{ scale: 0.95, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.95, opacity: 0 }}
            transition={{ type: "spring", damping: 30, stiffness: 300 }}
            onClick={(e) => e.stopPropagation()}
            className={cn(
              "relative max-w-5xl w-full max-h-[85vh] rounded-lg overflow-hidden flex items-center justify-center bg-surface border border-border/40 shadow-2xl",
              className
            )}
          >
            {mediaType === "image" && (
              <Image
                src={mediaSrc}
                alt="Lightbox preview"
                width={1920}
                height={1080}
                className="w-full h-auto max-h-[80vh] object-contain"
              />
            )}

            {mediaType === "video" && (
              <video
                src={mediaSrc}
                controls
                autoPlay
                className="w-full max-h-[80vh] object-contain"
              />
            )}

            {mediaType === "youtube" && (
              <div className="w-full aspect-video bg-black">
                <iframe
                  src={getYoutubeEmbedUrl(mediaSrc)}
                  title="YouTube video player"
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                  allowFullScreen
                  className="w-full h-full"
                />
              </div>
            )}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

// Generic Dialog Modal Wrapper for forms and details
interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  children: React.ReactNode;
  className?: string;
}

export function Modal({ isOpen, onClose, title, children, className }: ModalProps) {
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[9990] flex items-center justify-center bg-black/60 backdrop-blur-sm p-4"
          onClick={onClose}
        >
          <motion.div
            initial={{ y: 50, opacity: 0, scale: 0.95 }}
            animate={{ y: 0, opacity: 1, scale: 1 }}
            exit={{ y: 50, opacity: 0, scale: 0.95 }}
            transition={{ type: "spring", damping: 26, stiffness: 220 }}
            onClick={(e) => e.stopPropagation()}
            className={cn(
              "w-full max-w-lg bg-surface border border-border rounded-xl p-6 shadow-2xl relative flex flex-col gap-4",
              className
            )}
          >
            {/* Header */}
            <div className="flex items-center justify-between border-b border-border/50 pb-3">
              {title && (
                <h3 className="font-serif text-lg font-bold text-heading">
                  {title}
                </h3>
              )}
              <button
                onClick={onClose}
                className="w-8 h-8 rounded-full border border-border/60 flex items-center justify-center text-text/60 hover:text-accent hover:border-accent transition-colors"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Content Body */}
            <div className="overflow-y-auto max-h-[60vh] pr-1">
              {children}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
