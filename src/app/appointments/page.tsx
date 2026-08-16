"use client";

import React, { useState } from "react";
import { Hero } from "@/components/ui/Hero";
import { Input, Select, TextArea } from "@/components/ui/Form";
import Button from "@/components/ui/Button";
import { motion, AnimatePresence } from "framer-motion";
import { Calendar as CalendarIcon, Clock, CheckCircle, ArrowRight, ArrowLeft } from "lucide-react";
import Link from "next/link";

export default function AppointmentsPage() {
  const [step, setStep] = useState(1);
  const [selectedService, setSelectedService] = useState("");
  const [selectedDate, setSelectedDate] = useState<number | null>(null);
  const [selectedTime, setSelectedTime] = useState("");
  const [contactData, setContactData] = useState({ name: "", email: "", mobile: "", notes: "" });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [booked, setBooked] = useState(false);
  const [booking, setBooking] = useState(false);
  const [submitError, setSubmitError] = useState("");

  const services = [
    { value: "film-production", label: "Film Production Strategy & Briefing" },
    { value: "photography", label: "Photography Consultation & Booking" },
    { value: "digital-marketing", label: "Digital Marketing Growth Audit" },
  ];

  const timeSlots = ["10:00 AM", "11:30 AM", "02:00 PM", "03:30 PM", "05:00 PM"];

  // Render a mock calendar grid for August 2026 (starts on Saturday)
  const daysInMonth = Array.from({ length: 31 }, (_, i) => i + 1);

  const handleDateSelect = (day: number) => {
    setSelectedDate(day);
    setErrors({ ...errors, date: "" });
  };

  const handleTimeSelect = (slot: string) => {
    setSelectedTime(slot);
    setErrors({ ...errors, time: "" });
  };

  const handleContactChange = (field: string, val: string) => {
    setContactData({ ...contactData, [field]: val });
    if (errors[field]) {
      setErrors({ ...errors, [field]: "" });
    }
  };

  const validateStep = () => {
    const tempErrors: Record<string, string> = {};
    if (step === 1) {
      if (!selectedService) tempErrors.service = "Please select a consultation type";
    }
    if (step === 2) {
      if (!selectedDate) tempErrors.date = "Please select a date";
      if (!selectedTime) tempErrors.time = "Please select a time slot";
    }
    if (step === 3) {
      if (!contactData.name) tempErrors.name = "Name is required";
      if (!contactData.email) tempErrors.email = "Email is required";
      else if (!/\S+@\S+\.\S+/.test(contactData.email)) tempErrors.email = "Invalid email format";
      if (!contactData.mobile) tempErrors.mobile = "Mobile number is required";
    }

    setErrors(tempErrors);
    return Object.keys(tempErrors).length === 0;
  };

  const handleNext = () => {
    if (validateStep()) setStep((prev) => prev + 1);
  };

  const handlePrev = () => {
    setStep((prev) => prev - 1);
  };

  const handleBook = async (e: React.FormEvent) => {
    e.preventDefault();
    if (validateStep()) {
      setBooking(true);
      setSubmitError("");
      try {
        const payload = {
          service: selectedService,
          date: `August ${selectedDate}, 2026`,
          time: selectedTime,
          ...contactData
        };
        const res = await fetch("/api/appointments", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        });

        if (res.ok) {
          setBooked(true);
        } else {
          const data = await res.json();
          setSubmitError(data.error || "Failed to book appointment.");
        }
      } catch (err) {
        setSubmitError("Something went wrong. Please try again.");
      } finally {
        setBooking(false);
      }
    }
  };

  return (
    <div className="relative min-h-screen">
      <Hero
        badge="Direct Scheduling"
        title="Consultation Booking"
        italicTitle="& Calendar"
        description="Book a video briefing session or a studio tour interview directly with our creative directors."
      />

      <section className="py-20 bg-background relative z-10">
        <div className="max-w-3xl mx-auto px-6">
          
          {/* Progress header */}
          {!booked && (
            <div className="mb-10 text-center">
              <span className="text-[10px] font-bold text-accent uppercase tracking-[0.2em]">Step {step} of 3</span>
              <h2 className="font-serif text-lg font-bold text-heading mt-1">
                {step === 1 && "Choose Consultation Type"}
                {step === 2 && "Select Date & Time"}
                {step === 3 && "Provide Contact Information"}
              </h2>
            </div>
          )}

          <div className="glassmorphism p-8 rounded-2xl border-border/40">
            <AnimatePresence mode="wait">
              {booked ? (
                <motion.div
                  key="booked"
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  className="text-center py-10 flex flex-col items-center gap-6 animate-scale-up"
                >
                  <div className="w-16 h-16 rounded-full border-2 border-accent flex items-center justify-center text-accent bg-accent/5">
                    <CheckCircle className="w-8 h-8" />
                  </div>
                  <div>
                    <h3 className="font-serif text-2xl font-bold text-heading uppercase mb-2">
                      Booking Confirmed!
                    </h3>
                    <p className="text-xs text-text/60 leading-relaxed max-w-md mx-auto">
                      Your video briefing is locked in for <span className="text-accent font-bold">August {selectedDate}, 2026 at {selectedTime}</span>. A calendar invite and Google Meet link have been dispatched to <span className="text-accent font-bold">{contactData.email}</span>.
                    </p>
                  </div>
                  <Link href="/">
                    <Button variant="primary">Return Home</Button>
                  </Link>
                </motion.div>
              ) : (
                <form key={step} onSubmit={handleBook} className="flex flex-col gap-2">
                  
                  {/* Step 1: Select service */}
                  {step === 1 && (
                    <motion.div
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -20 }}
                    >
                      <Select
                        label="Consultation Service"
                        id="service"
                        value={selectedService}
                        options={services}
                        onChange={(e) => {
                          setSelectedService(e.target.value);
                          setErrors({ ...errors, service: "" });
                        }}
                        error={errors.service}
                      />
                      <div className="p-4 rounded-lg bg-surface/30 border border-border/50 text-xs text-text/60 leading-relaxed mt-4">
                        Consultations are conducted over high-fidelity Google Meet links. Please prepare your design reference documents or scripting draft treatments in advance.
                      </div>
                    </motion.div>
                  )}

                  {/* Step 2: Date and Time selection */}
                  {step === 2 && (
                    <motion.div
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -20 }}
                      className="flex flex-col gap-6"
                    >
                      {/* Interactive Calendar grid */}
                      <div>
                        <label className="text-[10px] font-bold text-accent uppercase tracking-wider block mb-3">
                          Select Date (August 2026)
                        </label>
                        <div className="grid grid-cols-7 gap-2 text-center text-xs font-semibold">
                          {["S", "M", "T", "W", "T", "F", "S"].map((d, idx) => (
                            <span key={idx} className="text-[9px] font-bold text-accent uppercase tracking-wider">{d}</span>
                          ))}
                          {/* Blank padding days for start offset */}
                          {Array.from({ length: 6 }).map((_, i) => (
                            <span key={`empty-${i}`} className="opacity-0">1</span>
                          ))}
                          {daysInMonth.map((day) => {
                            const date = new Date();
                            // Just simple logic to represent current month validation
                            const currentDay = date.getDate();
                            const isPast = day <= currentDay + 2; // block today and next 2 days
                            
                            return (
                              <button
                                key={day}
                                type="button"
                                disabled={isPast}
                                onClick={() => handleDateSelect(day)}
                                className={`w-10 h-10 rounded-full flex items-center justify-center text-sm font-semibold transition-all duration-300 ${
                                  selectedDate === day
                                    ? "bg-accent text-background shadow-lg shadow-accent/20"
                                    : isPast 
                                      ? "bg-surface/20 text-text/10 cursor-not-allowed" 
                                      : "bg-surface hover:bg-surface/80 hover:text-accent border border-border"
                                }`}
                              >
                                {day}
                              </button>
                            );
                          })}
                        </div>
                        {errors.date && (
                          <span className="text-[10px] font-semibold text-red-500 mt-2 block uppercase tracking-wider">{errors.date}</span>
                        )}
                      </div>

                      {/* Time slot selectors */}
                      <div>
                        <label className="text-[10px] font-bold text-accent uppercase tracking-wider block mb-3">
                          Select Time Slot
                        </label>
                        <div className="grid grid-cols-2 sm:grid-cols-5 gap-3">
                          {timeSlots.map((slot) => (
                            <button
                              key={slot}
                              type="button"
                              onClick={() => handleTimeSelect(slot)}
                              className={`px-3 py-2 rounded border text-xs font-bold transition-colors ${
                                selectedTime === slot
                                  ? "bg-accent border-accent text-background"
                                  : "border-border bg-surface/30 text-text/80 hover:border-accent/30"
                              }`}
                            >
                              {slot}
                            </button>
                          ))}
                        </div>
                        {errors.time && (
                          <span className="text-[10px] font-semibold text-red-500 mt-2 block uppercase tracking-wider">{errors.time}</span>
                        )}
                      </div>
                    </motion.div>
                  )}

                  {/* Step 3: Contact */}
                  {step === 3 && (
                    <motion.div
                      key="step3"
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -20 }}
                      className="space-y-6 max-w-xl mx-auto"
                    >
                      <Input
                        label="Full Name"
                        id="name"
                        type="text"
                        value={contactData.name}
                        onChange={(e) => handleContactChange("name", e.target.value)}
                        error={errors.name}
                      />
                      <Input
                        label="Email Address"
                        id="email"
                        type="email"
                        value={contactData.email}
                        onChange={(e) => handleContactChange("email", e.target.value)}
                        error={errors.email}
                      />
                      <Input
                        label="Mobile Number"
                        id="mobile"
                        type="tel"
                        value={contactData.mobile}
                        onChange={(e) => handleContactChange("mobile", e.target.value)}
                        error={errors.mobile}
                      />
                      <TextArea
                        label="Project Notes / Agenda (Optional)"
                        id="notes"
                        value={contactData.notes}
                        onChange={(e) => handleContactChange("notes", e.target.value)}
                        rows={4}
                      />
                    </motion.div>
                  )}

                  {/* Buttons */}
                  <div className="flex justify-between items-center mt-8 border-t border-border/50 pt-6">
                    {step > 1 ? (
                      <Button type="button" variant="secondary" onClick={handlePrev}>
                        <ArrowLeft className="w-4 h-4 mr-1" /> Back
                      </Button>
                    ) : (
                      <div />
                    )}

                    {step < 3 ? (
                      <Button type="button" variant="primary" onClick={handleNext}>
                        Continue <ArrowRight className="w-4 h-4 ml-1" />
                      </Button>
                    ) : (
                      <div className="flex flex-col items-end w-full">
                        {submitError && <span className="text-red-500 text-xs mb-2">{submitError}</span>}
                        <Button type="submit" variant="primary" disabled={booking}>
                          {booking ? "Confirming..." : "Confirm Appointment"} {!booking && <CheckCircle className="w-4 h-4 ml-1" />}
                        </Button>
                      </div>
                    )}
                  </div>

                </form>
              )}
            </AnimatePresence>
          </div>

        </div>
      </section>
    </div>
  );
}
