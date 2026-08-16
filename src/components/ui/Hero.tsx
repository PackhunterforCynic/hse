"use client";

import React from "react";
import { motion } from "framer-motion";
import { cn } from "@/utils/cn";

interface SectionHeaderProps {
  badge?: string;
  title: string;
  italicTitle?: string;
  description?: string;
  alignment?: "left" | "center";
  className?: string;
}

export function SectionHeader({
  badge,
  title,
  italicTitle,
  description,
  alignment = "center",
  className,
}: SectionHeaderProps) {
  const isLeft = alignment === "left";

  const containerVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.15,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        ease: [0.16, 1, 0.3, 1] as const,
      },
    },
  };

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-100px" }}
      className={cn(
        "flex flex-col gap-4 max-w-3xl",
        isLeft ? "text-left items-start" : "text-center items-center mx-auto",
        className
      )}
    >
      {badge && (
        <motion.span
          variants={itemVariants}
          className="text-xs font-bold tracking-[0.25em] uppercase text-accent"
        >
          {badge}
        </motion.span>
      )}

      <motion.h2
        variants={itemVariants}
        className="font-serif text-3xl md:text-5xl font-bold tracking-tight text-heading leading-tight"
      >
        {title}{" "}
        {italicTitle && (
          <span className="text-accent italic font-normal">{italicTitle}</span>
        )}
      </motion.h2>

      {description && (
        <motion.p
          variants={itemVariants}
          className="text-sm md:text-base text-text/60 leading-relaxed max-w-2xl"
        >
          {description}
        </motion.p>
      )}

      {/* Underline decorative bar */}
      <motion.div
        variants={{
          hidden: { width: 0 },
          visible: {
            width: 48,
            transition: { duration: 1, ease: "easeOut", delay: 0.4 },
          },
        }}
        className="h-[1.5px] bg-accent mt-2"
      />
    </motion.div>
  );
}

interface HeroProps {
  badge?: string;
  title: string;
  italicTitle?: string;
  description?: string;
  backgroundImage?: string;
  children?: React.ReactNode;
  className?: string;
}

export function Hero({
  badge,
  title,
  italicTitle,
  description,
  backgroundImage,
  children,
  className,
}: HeroProps) {
  return (
    <div
      className={cn(
        "relative min-h-[60vh] flex flex-col justify-center overflow-hidden border-b border-border bg-background py-24 px-6 md:px-12",
        className
      )}
    >
      {/* Background Visual layer */}
      {backgroundImage ? (
        <>
          <div
            className="absolute inset-0 bg-cover bg-center transition-transform duration-1000 ease-out scale-105"
            style={{ backgroundImage: `url(${backgroundImage})` }}
          />
          <div className="absolute inset-0 bg-background/85 backdrop-blur-[2px] z-0" />
        </>
      ) : (
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(201,168,76,0.05),transparent_75%)] pointer-events-none" />
      )}

      {/* Content wrapper */}
      <div className="relative z-10 max-w-7xl mx-auto w-full flex flex-col items-start gap-6">
        {badge && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-accent/20 bg-accent/5 text-accent text-[10px] font-semibold uppercase tracking-widest"
          >
            {badge}
          </motion.div>
        )}

        <motion.h1
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: 0.15 }}
          className="font-serif text-4xl md:text-7xl font-bold tracking-tight text-heading leading-tight"
        >
          {title}{" "}
          {italicTitle && (
            <span className="text-accent italic font-normal">{italicTitle}</span>
          )}
        </motion.h1>

        {description && (
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: 0.3 }}
            className="text-base md:text-lg text-text/60 max-w-2xl leading-relaxed"
          >
            {description}
          </motion.p>
        )}

        {children && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: 0.45 }}
            className="mt-4"
          >
            {children}
          </motion.div>
        )}
      </div>
    </div>
  );
}
