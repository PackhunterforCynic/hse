"use client";

import React, { useEffect, useState, useRef } from "react";
import { useInView } from "framer-motion";
import { cn } from "@/utils/cn";

interface CounterProps {
  end: number;
  duration?: number; // in seconds
  suffix?: string;
  label: string;
  className?: string;
}

export default function Counter({
  end,
  duration = 2,
  suffix = "",
  label,
  className,
}: CounterProps) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  useEffect(() => {
    if (!isInView) return;

    let startTime: number | null = null;
    const startValue = 0;

    const animateCount = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / (duration * 1000), 1);
      
      // Quadratic out easing function
      const easeProgress = progress * (2 - progress);
      const currentValue = Math.floor(easeProgress * (end - startValue) + startValue);

      setCount(currentValue);

      if (progress < 1) {
        requestAnimationFrame(animateCount);
      }
    };

    requestAnimationFrame(animateCount);
  }, [isInView, end, duration]);

  return (
    <div
      ref={ref}
      className={cn(
        "flex flex-col items-center justify-center text-center p-6 border border-border/20 rounded-xl bg-surface/30 backdrop-blur-sm",
        className
      )}
    >
      <span className="font-serif text-3xl md:text-5xl font-bold text-accent mb-2">
        {count}
        {suffix}
      </span>
      <span className="text-[10px] font-bold tracking-[0.2em] text-text/50 uppercase">
        {label}
      </span>
    </div>
  );
}
