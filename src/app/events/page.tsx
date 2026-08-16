"use client";

import React from "react";
import { Hero } from "@/components/ui/Hero";

export default function EventsPage() {
  return (
    <div className="relative min-h-screen">
      <Hero
        badge="Academy Schedule"
        title="Upcoming Events"
        italicTitle="Will Be Notified"
        description="Our event schedule is currently being finalized. Stay tuned for updates on masterclasses, film festivals, and creative community panels."
      />
    </div>
  );
}
