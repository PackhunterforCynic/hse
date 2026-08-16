"use client";

import React from "react";
import { servicesData } from "@/utils/servicesData";
import Link from "next/link";
import { Hero } from "@/components/ui/Hero";
import { ArrowRight } from "lucide-react";
import Image from "next/image";

export default function ServicesPage() {
  return (
    <div className="w-full min-h-screen bg-background text-text overflow-hidden relative">
      <Hero
        badge="Our Offerings"
        title="Creative Studio"
        italicTitle="Capabilities"
        description="We bridge the gap between creative visual artistry and strategic market positioning, delivering high-end cinematic products."
      />

      {/* Ambient radial glows */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-[1200px] h-[800px] bg-accent/5 rounded-full blur-[150px] pointer-events-none -translate-y-1/2 z-0" />
      <div className="absolute bottom-0 right-0 w-[800px] h-[800px] bg-accent/5 rounded-full blur-[150px] pointer-events-none translate-y-1/2 z-0" />
      
      <div className="max-w-[1920px] mx-auto px-6 md:px-12 xl:px-24 relative z-10 py-32">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-28 md:gap-y-32">
          {servicesData.map((service, idx) => (
            <div 
              key={idx}
              className="group relative bg-surface/90 rounded-[24px] md:rounded-[32px] p-6 md:p-8 lg:p-10 border border-border backdrop-blur-xl transition-all duration-500 hover:border-accent/50 hover:shadow-[0_20px_50px_rgba(0,0,0,0.8)] flex flex-col mt-16 md:mt-24"
            >
              <div className="relative -mt-24 md:-mt-32 lg:-mt-40 mb-8 w-full aspect-[4/3] z-10 transition-transform duration-500 group-hover:-translate-y-3">
                 <div 
                   className="w-full h-full overflow-hidden border border-border/50 shadow-[0_20px_40px_rgba(0,0,0,0.8)] relative transition-all duration-500 group-hover:shadow-[0_30px_60px_rgba(201,168,76,0.25)] group-hover:border-accent/60"
                   style={{ borderRadius: '0 48px 0 48px' }}
                 >
                    <Image 
                      src={service.coverImage}
                      alt={service.title}
                      fill
                      className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.08]"
                    />
                    {/* Soft gold gradient overlay revealed on hover */}
                    <div className="absolute inset-0 bg-gradient-to-t from-accent/40 via-accent/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 mix-blend-overlay" />
                 </div>
              </div>

              <div className="relative z-20 flex-grow flex flex-col justify-between">
                <div>
                  <p className="text-accent font-mono text-[10px] md:text-xs uppercase tracking-[0.2em] mb-4 md:mb-6 font-semibold">
                    Service {String(idx + 1).padStart(2, '0')}
                  </p>
                  <h3 className="text-3xl md:text-4xl font-serif text-heading mb-4 group-hover:text-accent transition-colors duration-500 tracking-tight">
                    {service.title}
                  </h3>
                  <p className="text-text/70 font-sans font-light leading-relaxed text-sm md:text-base mb-8">
                    {service.description}
                  </p>
                </div>
                
                <Link 
                  href={`/services/${service.slug}`}
                  className="w-full inline-flex items-center justify-center gap-2 text-xs font-bold uppercase tracking-[0.2em] py-4 border border-border group-hover:border-accent rounded-full text-text group-hover:text-accent transition-colors duration-300 mt-auto"
                >
                  Explore Strategy <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
