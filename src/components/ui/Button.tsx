"use client";

import React, { useRef, useState } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";
import { cn } from "@/utils/cn";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "ghost" | "gold-outline";
  size?: "sm" | "md" | "lg" | "xl";
  magnetic?: boolean;
  children: React.ReactNode;
}

export default function Button({
  variant = "primary",
  size = "md",
  magnetic = true,
  className,
  children,
  ...props
}: ButtonProps) {
  const buttonRef = useRef<HTMLButtonElement>(null);
  const [isHovered, setIsHovered] = useState(false);

  // Magnetic values
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const springConfig = { damping: 15, stiffness: 150, mass: 0.6 };
  const springX = useSpring(x, springConfig);
  const springY = useSpring(y, springConfig);

  const handleMouseMove = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (!magnetic || !buttonRef.current) return;
    const { clientX, clientY } = e;
    const { left, top, width, height } = buttonRef.current.getBoundingClientRect();
    const centerX = left + width / 2;
    const centerY = top + height / 2;

    // Calculate distance from center (max 25px translation)
    const distanceX = clientX - centerX;
    const distanceY = clientY - centerY;

    x.set(distanceX * 0.35);
    y.set(distanceY * 0.35);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
    setIsHovered(false);
  };

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  // Variant classes
  const baseClasses =
    "relative inline-flex items-center justify-center font-sans font-bold uppercase tracking-widest text-xs transition-colors duration-300 rounded-full focus:outline-none select-none";

  const variantClasses = {
    primary:
      "bg-accent text-background hover:bg-accent-hover shadow-lg shadow-accent/10 border border-transparent",
    secondary:
      "border border-border bg-surface/30 text-text hover:bg-surface/60 hover:border-accent/40",
    "gold-outline":
      "border border-accent text-accent hover:bg-accent hover:text-background",
    ghost:
      "bg-transparent text-text hover:text-accent hover:bg-accent/5 border border-transparent",
  };

  const sizeClasses = {
    sm: "px-6 py-2.5 text-[10px]",
    md: "px-8 py-3.5 text-xs",
    lg: "px-10 py-4 text-xs",
    xl: "px-12 py-5 text-sm",
  };

  return (
    <motion.div
      style={{
        x: springX,
        y: springY,
        display: "inline-block",
      }}
    >
      <button
        ref={buttonRef}
        onMouseMove={handleMouseMove}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        className={cn(baseClasses, variantClasses[variant], sizeClasses[size], className)}
        {...props}
      >
        {/* Background radial glow on hover */}
        {variant === "primary" && (
          <span className="absolute inset-0 rounded-full bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.2)_0%,transparent_70%)] opacity-0 hover:opacity-100 transition-opacity duration-500" />
        )}

        {/* Button Content with subtle scale translation */}
        <span className="relative z-10 flex items-center gap-2">
          {children}
        </span>
      </button>
    </motion.div>
  );
}
