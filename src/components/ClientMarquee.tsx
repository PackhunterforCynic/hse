"use client";

import React from "react";
import { motion } from "framer-motion";

const CLIENTS = [
  { name: "Indo-Korean Cultural Society", abbr: "IKCS" },
  { name: "Whitefield Developments", abbr: "WD" },
  { name: "Young Indians Youth League", abbr: "YIYL" },
  { name: "Medtourin Healthcare", abbr: "MED" },
  { name: "Popnosh Hospitality", abbr: "PNH" },
  { name: "Naveen & Sharlien", abbr: "N&S" },
  { name: "Srusti & Pratik", abbr: "S&P" },
  { name: "Real Estate Group", abbr: "REG" }
];

// Duplicate for seamless infinite scroll
const TRACK = [...CLIENTS, ...CLIENTS, ...CLIENTS];

function LogoCard({ name, abbr }: { name: string; abbr: string }) {
  return (
    <div className="flex-shrink-0 flex items-center justify-center gap-3 px-8 py-5 rounded-xl border border-border/50 bg-surface/40 hover:border-accent/40 hover:bg-surface/70 transition-all duration-300 group mx-3 min-w-[220px]">
      {/* Monogram Badge */}
      <div className="w-10 h-10 rounded-lg bg-accent/10 border border-accent/20 flex items-center justify-center flex-shrink-0 group-hover:bg-accent/20 transition-colors">
        <span className="text-accent font-black text-xs tracking-wider">{abbr.slice(0, 2)}</span>
      </div>
      <span className="text-text/60 text-sm font-medium group-hover:text-text/90 transition-colors whitespace-nowrap">
        {name}
      </span>
    </div>
  );
}

export default function ClientMarquee() {
  return (
    <section className="py-20 border-b border-border bg-background relative z-20 overflow-hidden">
      {/* Fade edges */}
      <div className="absolute left-0 top-0 h-full w-32 bg-gradient-to-r from-background to-transparent z-10 pointer-events-none" />
      <div className="absolute right-0 top-0 h-full w-32 bg-gradient-to-l from-background to-transparent z-10 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 mb-12 text-center">
        <span className="text-xs font-bold tracking-[0.25em] uppercase text-accent block mb-3">
          Trusted By
        </span>
        <h2 className="font-serif text-3xl md:text-4xl font-bold text-text">
          Brands That <span className="text-accent italic font-normal">Chose Havilah</span>
        </h2>
      </div>

      {/* Row 1 — scrolls left */}
      <div className="relative flex overflow-hidden mb-4">
        <motion.div
          className="flex"
          animate={{ x: ["0%", "-33.33%"] }}
          transition={{ repeat: Infinity, ease: "linear", duration: 28 }}
        >
          {TRACK.map((c, i) => (
            <LogoCard key={`r1-${i}`} name={c.name} abbr={c.abbr} />
          ))}
        </motion.div>
      </div>

      {/* Row 2 — scrolls right (reversed) */}
      <div className="relative flex overflow-hidden">
        <motion.div
          className="flex"
          animate={{ x: ["-33.33%", "0%"] }}
          transition={{ repeat: Infinity, ease: "linear", duration: 32 }}
        >
          {[...TRACK].reverse().map((c, i) => (
            <LogoCard key={`r2-${i}`} name={c.name} abbr={c.abbr} />
          ))}
        </motion.div>
      </div>
    </section>
  );
}
