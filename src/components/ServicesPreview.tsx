"use client";

import { useRef } from 'react';
import Link from 'next/link';
import { motion, useInView } from 'framer-motion';
import { useLanguage } from '@/context/LanguageContext';

const staggerContainer = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.1
    }
  }
};

const cardVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] as const } }
};

export default function ServicesPreview() {
  const containerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(containerRef, { once: true, margin: "-10%" });
  const { t } = useLanguage();

  const services = [
    t('servicesList.brandStrategy') || "Brand Strategy",
    t('servicesList.visualIdentity') || "Visual Identity",
    t('servicesList.filmProduction') || "Film Production",
    t('servicesList.photography') || "Photography",
    t('servicesList.videoEditing') || "Video Editing",
    t('servicesList.socialMedia') || "Social Media Marketing",
    t('servicesList.creativeCampaigns') || "Creative Campaigns"
  ];

  return (
    <section ref={containerRef} className="py-32 px-4 md:px-12 bg-surface/30 backdrop-blur-md w-full relative z-20 overflow-hidden border-b border-border">
      <div className="max-w-7xl mx-auto flex flex-col lg:flex-row gap-16 justify-between items-start">
        
        {/* Left Side text */}
        <div className="w-full lg:w-1/3 lg:sticky lg:top-32 mb-12 lg:mb-0">
          <h2 className="text-sm font-mono tracking-[0.3em] uppercase text-accent mb-8">
            {t('home.expertise') || "Expertise"}
          </h2>
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="text-3xl md:text-4xl font-serif italic font-light leading-relaxed mb-10 text-text"
          >
            {t('home.expertiseDesc') || "A unified approach to visual storytelling. From brand inception to final cut."}
          </motion.div>
          <Link 
            href="/services" 
            className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-accent text-background text-xs font-bold uppercase tracking-widest hover:scale-105 active:scale-95 transition-transform"
          >
            {t('navigation.services') || "Services"} &rarr;
          </Link>
        </div>

        {/* Right Side list */}
        <motion.div 
          className="w-full lg:w-1/2 flex flex-col gap-3"
          variants={staggerContainer}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
        >
          {services.map((service, idx) => (
            <motion.div key={idx} variants={cardVariants}>
              <Link 
                href="/services"
                className="group relative px-6 py-8 bg-surface hover:bg-surface/80 rounded-xl border border-border hover:border-accent/50 flex items-center justify-between transition-all duration-300 shadow-sm hover:shadow-xl hover:shadow-accent/5"
              >
                <div className="overflow-hidden">
                  <span className="inline-block text-2xl md:text-4xl font-serif uppercase tracking-tight text-text/70 group-hover:text-text group-hover:translate-x-3 transition-all duration-300 ease-out">
                    {service}
                  </span>
                </div>
                <div className="w-10 h-10 rounded-full bg-border group-hover:bg-accent flex items-center justify-center text-text/50 group-hover:text-background font-bold transition-all duration-300 transform group-hover:scale-110">
                  &#8599;
                </div>
              </Link>
            </motion.div>
          ))}
        </motion.div>

      </div>
    </section>
  );
}
