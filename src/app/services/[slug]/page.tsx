"use client";

import React, { useState } from "react";
import { notFound } from "next/navigation";
import { servicesData } from "@/utils/servicesData";
import { SectionHeader } from "@/components/ui/Hero";
import Timeline from "@/components/ui/Timeline";
import Button from "@/components/ui/Button";
import Link from "next/link";
import { ArrowLeft, Check, Calculator, HelpCircle } from "lucide-react";
import Image from "next/image";

interface PageProps {
  params: {
    slug: string;
  };
}

export default function ServiceDetailPage({ params }: PageProps) {
  const service = servicesData.find((s) => s.slug === params.slug);

  if (!service) {
    notFound();
  }



  return (
    <div className="relative min-h-screen pb-20">
      {/* Services Cinematic Header */}
      <section className="relative border-b border-border py-32 md:py-48 px-6 md:px-12 overflow-hidden bg-black flex items-end min-h-[60vh]">
        {/* Background Hero Image */}
        <div className="absolute inset-0 z-0">
          <Image 
            src={service.coverImage} 
            alt={service.title}
            fill
            className="object-cover opacity-40 scale-105"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black via-black/60 to-transparent z-10" />
        </div>

        <div className="max-w-7xl mx-auto w-full flex flex-col items-start gap-4 z-10 relative mt-auto">
          <Link
            href="/services"
            className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-accent hover:text-accent-hover mb-4"
          >
            <ArrowLeft className="w-4 h-4" /> Back to capabilities
          </Link>

          <span className="text-xs font-bold uppercase tracking-[0.25em] text-accent">
            {service.badge} Track
          </span>

          <h1 className="font-serif text-4xl md:text-6xl font-bold text-heading leading-tight uppercase">
            {service.title}
          </h1>

          <p className="text-base md:text-lg text-text/60 max-w-2xl leading-relaxed mt-2">
            {service.tagline}
          </p>
        </div>
      </section>

      {/* Detail Core Content */}
      <section className="py-20 bg-background relative z-10">
        <div className="max-w-7xl mx-auto px-6">
          
          {/* Timeline Process */}
          <div className="mb-24">
            <SectionHeader
              badge="Workflow"
              title="Execution"
              italicTitle="Milestones"
              description="How we step-by-step deliver our high-end services."
              className="mb-12"
            />
            <Timeline items={service.process} />
          </div>

          {/* Service Types */}
          <div className="mb-24 pb-12 border-b border-border/50">
            <div className="flex flex-col gap-8">
              <SectionHeader
                badge="Offerings"
                title="Service"
                italicTitle="Types"
                alignment="left"
                className="mb-4"
              />

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {service.packages.map((pkg, idx) => (
                  <div
                    key={idx}
                    className="p-8 rounded-2xl border border-border bg-surface/30 flex flex-col gap-6 group hover:border-accent/40 transition-colors"
                  >
                    <div>
                      <h4 className="font-serif text-2xl font-bold text-text mb-4 group-hover:text-accent transition-colors">
                        {pkg.name}
                      </h4>
                      <ul className="flex flex-col gap-3 mt-4">
                        {pkg.features.map((feat, fIdx) => (
                          <li key={fIdx} className="flex items-start gap-3 text-sm text-text/70">
                            <Check className="w-4 h-4 text-accent mt-0.5 flex-shrink-0" />
                            <span>{feat}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                    <Link href="/requests" className="mt-auto pt-6 border-t border-border/50 w-full">
                      <Button variant="gold-outline" className="w-full group-hover:bg-accent group-hover:text-black group-hover:border-accent transition-colors">
                        Inquire Now
                      </Button>
                    </Link>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* FAQs List */}
          <div className="max-w-4xl mx-auto">
            <SectionHeader
              badge="FAQ"
              title="Frequently Asked"
              italicTitle="Questions"
              description="Learn more about our production guidelines and deliverables."
              className="mb-12"
            />

            <div className="flex flex-col gap-6">
              {service.faqs.map((faq, idx) => (
                <div key={idx} className="p-6 border border-border bg-surface/30 rounded-xl flex items-start gap-4">
                  <HelpCircle className="w-5 h-5 text-accent flex-shrink-0 mt-0.5" />
                  <div>
                    <h4 className="text-sm font-bold text-text uppercase tracking-wider mb-2">
                      {faq.question}
                    </h4>
                    <p className="text-xs text-text/60 leading-relaxed">
                      {faq.answer}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

        </div>
      </section>
    </div>
  );
}
