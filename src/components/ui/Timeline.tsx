"use client";

import React from "react";
import { motion } from "framer-motion";
import { cn } from "@/utils/cn";

interface TimelineItem {
  step: string;
  title: string;
  description: string;
}

interface TimelineProps {
  items: TimelineItem[];
  className?: string;
}

export default function Timeline({ items, className }: TimelineProps) {
  return (
    <div className={cn("relative max-w-5xl mx-auto py-12 px-4", className)}>
      {/* Central Line */}
      <div className="absolute left-4 md:left-1/2 top-0 bottom-0 w-[1.5px] bg-border/60 -translate-x-[0.75px]" />

      <div className="flex flex-col gap-16 md:gap-24">
        {items.map((item, index) => {
          const isEven = index % 2 === 0;

          return (
            <div
              key={index}
              className="relative flex flex-col md:flex-row md:items-center w-full"
            >
              {/* Timeline Dot & Step bubble */}
              <div className="absolute left-4 md:left-1/2 -translate-x-1/2 z-10 flex items-center justify-center">
                <motion.div
                  initial={{ scale: 0.8, opacity: 0 }}
                  whileInView={{ scale: 1, opacity: 1 }}
                  viewport={{ once: true, margin: "-100px" }}
                  transition={{ duration: 0.5, ease: "easeOut" }}
                  className="w-9 h-9 rounded-full bg-surface border border-accent flex items-center justify-center text-xs font-bold text-accent shadow-lg shadow-accent/15"
                >
                  {item.step}
                </motion.div>
              </div>

              {/* Text Blocks */}
              <div className="w-full flex md:w-1/2 flex-col pl-12 md:pl-0 md:px-12">
                <motion.div
                  initial={{ opacity: 0, x: isEven ? -40 : 40 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, margin: "-100px" }}
                  transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                  className={cn(
                    "glassmorphism-card p-6 md:p-8 rounded-xl w-full",
                    isEven ? "md:text-right md:ml-auto" : "md:text-left md:mr-auto"
                  )}
                  style={{ order: isEven ? 1 : 2 }}
                >
                  <h3 className="font-serif text-lg md:text-xl font-bold text-heading mb-2">
                    {item.title}
                  </h3>
                  <p className="text-sm text-text/60 leading-relaxed">
                    {item.description}
                  </p>
                </motion.div>
              </div>

              {/* Spacer columns to align correct rows layout on large grids */}
              <div className="hidden md:block w-1/2" style={{ order: isEven ? 2 : 1 }} />
            </div>
          );
        })}
      </div>
    </div>
  );
}
