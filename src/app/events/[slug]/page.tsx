"use client";

import React, { useState } from "react";
import { notFound } from "next/navigation";
import { eventsData } from "@/utils/eventsData";
import { SectionHeader } from "@/components/ui/Hero";
import Button from "@/components/ui/Button";
import Link from "next/link";
import { Calendar, MapPin, Clock, Users, ArrowLeft, Star, Tag, Ticket, Check, User } from "lucide-react";
import Image from "next/image";

interface PageProps {
  params: {
    slug: string;
  };
}

export default function EventDetailPage({ params }: PageProps) {
  const event = eventsData.find((e) => e.slug === params.slug);

  if (!event) {
    notFound();
  }

  const [selectedTicket, setSelectedTicket] = useState(0);

  return (
    <div className="relative min-h-screen pb-20">
      {/* Event Header */}
      <section className="relative bg-surface/30 border-b border-border py-24 px-6 md:px-12">
        <div className="max-w-7xl mx-auto w-full flex flex-col items-start gap-4 z-10 relative">
          <Link
            href="/events"
            className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-accent hover:text-accent-hover mb-4"
          >
            <ArrowLeft className="w-4 h-4" /> Back to calendar
          </Link>

          <div className="flex flex-wrap items-center gap-4">
            <span className="text-xs font-bold uppercase tracking-[0.25em] text-accent">
              {event.category}
            </span>
            <span className="text-[10px] text-text/45 font-bold uppercase tracking-widest flex items-center gap-1">
              <Calendar className="w-3.5 h-3.5" /> {event.date}
            </span>
            <span className="text-[10px] text-text/45 font-bold uppercase tracking-widest flex items-center gap-1">
              <MapPin className="w-3.5 h-3.5" /> {event.location}
            </span>
          </div>

          <h1 className="font-serif text-4xl md:text-6xl font-bold text-heading leading-tight uppercase">
            {event.title}
          </h1>

          <p className="text-base md:text-lg text-text/60 max-w-3xl leading-relaxed mt-2">
            {event.description}
          </p>
        </div>
      </section>

      {/* Details grid layout */}
      <section className="py-20 bg-background relative z-10">
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-12 gap-12">
          
          {/* Schedule & Speakers */}
          <div className="lg:col-span-8 flex flex-col gap-16">
            {/* Itinerary */}
            <div>
              <h3 className="font-serif text-xl font-bold text-heading mb-6 border-b border-border/50 pb-2">
                Event Schedule & Itinerary
              </h3>
              <div className="flex flex-col gap-6">
                {event.schedule.map((item, idx) => (
                  <div key={idx} className="flex gap-4 p-4 border border-border/50 bg-surface/20 rounded-xl">
                    <div className="flex-shrink-0 w-24 flex items-start gap-1 text-xs font-bold text-accent uppercase tracking-wider mt-0.5">
                      <Clock className="w-4 h-4 mt-0.5" /> {item.time}
                    </div>
                    <div>
                      <h4 className="text-sm font-bold text-text mb-1 uppercase tracking-wider">{item.title}</h4>
                      <p className="text-xs text-text/60 leading-relaxed">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Speakers panel */}
            <div>
              <h3 className="font-serif text-xl font-bold text-heading mb-6 border-b border-border/50 pb-2">
                Panel Speakers & Instructors
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                {event.speakers.map((sp, idx) => (
                  <div key={idx} className="p-4 border border-border/50 bg-surface/30 rounded-xl flex items-center gap-4">
                    <Image
                      src={sp.avatarUrl}
                      alt={sp.name}
                      width={48}
                      height={48}
                      className="rounded-full object-cover border border-accent/40"
                    />
                    <div>
                      <h4 className="text-xs font-bold text-text uppercase tracking-wider">{sp.name}</h4>
                      <p className="text-[9px] text-text/45 uppercase tracking-widest mt-0.5">{sp.role}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Ticket Registration Sidebar */}
          <div className="lg:col-span-4 flex flex-col gap-8">
            <div className="glassmorphism p-6 rounded-xl flex flex-col gap-6 sticky top-28">
              <h3 className="font-serif text-lg font-bold text-heading border-b border-border/50 pb-3">
                Register Tickets
              </h3>

              <div className="flex flex-col gap-4">
                {event.tickets.map((t, idx) => (
                  <div
                    key={idx}
                    onClick={() => setSelectedTicket(idx)}
                    className={`p-4 rounded-lg border cursor-pointer transition-all duration-300 flex flex-col gap-3 ${
                      selectedTicket === idx
                        ? "border-accent bg-accent/5"
                        : "border-border/60 bg-background/40 hover:border-border"
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-bold text-text uppercase tracking-wider">{t.tier}</span>
                      <span className="text-sm font-bold text-accent">{t.price}</span>
                    </div>
                    <p className="text-[10px] text-text/60">{t.description}</p>
                    {selectedTicket === idx && (
                      <ul className="flex flex-col gap-1 border-t border-border/40 pt-2 mt-1">
                        {t.perks.map((p, pIdx) => (
                          <li key={pIdx} className="flex items-center gap-1.5 text-[9px] text-text/70">
                            <Check className="w-3 h-3 text-accent flex-shrink-0" />
                            <span>{p}</span>
                          </li>
                        ))}
                      </ul>
                    )}
                  </div>
                ))}
              </div>

              <Link href="/contact" className="w-full">
                <Button variant="primary" className="w-full">
                  Book {event.tickets[selectedTicket]?.tier} Pass
                </Button>
              </Link>
            </div>
          </div>

        </div>
      </section>
    </div>
  );
}
