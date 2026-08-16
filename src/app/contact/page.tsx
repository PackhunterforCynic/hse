"use client";

import React, { useState } from "react";
import { Input, TextArea } from "@/components/ui/Form";
import Button from "@/components/ui/Button";
import { motion, AnimatePresence, Variants } from "framer-motion";
import { HelpCircle, Send, Camera, PlayCircle, MessageCircle } from "lucide-react";
import Link from "next/link";
import { useLanguage } from "@/context/LanguageContext";

const staggerContainer = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.1, delayChildren: 0.5 },
  },
};

const fadeUpVariant: Variants = {
  hidden: { y: 50, opacity: 0 },
  visible: { y: 0, opacity: 1, transition: { duration: 1, ease: [0.22, 1, 0.36, 1] } },
};

const socialLinks = [
  {
    platform: "Instagram",
    url: "https://www.instagram.com/thepraiseayodeji",
    handle: "@thepraiseayodeji",
    theme: "bg-gradient-to-tr from-[#f09433] via-[#dc2743] to-[#bc1888]",
    icon: <Camera className="w-6 h-6 text-white/70 group-hover:text-white transition-colors duration-500" />,
  },
  {
    platform: "YouTube",
    url: "https://www.youtube.com/@hsedigitals",
    handle: "@hsedigitals",
    theme: "bg-[#FF0000]",
    icon: <PlayCircle className="w-6 h-6 text-white/70 group-hover:text-white transition-colors duration-500" />,
  },
  {
    platform: "WhatsApp",
    url: "https://wa.me/917204042538?text=Hi%20Havilah!%20I%20would%20like%20to%20discuss%20a%20project%20with%20you.",
    handle: "Chat with us",
    theme: "bg-[#25D366]",
    icon: <MessageCircle className="w-6 h-6 text-white/70 group-hover:text-white transition-colors duration-500" />,
  },
];

export default function ContactPage() {
  const { t } = useLanguage();
  const [formData, setFormData] = useState({ name: "", email: "", phone: "", message: "", service: "Film Production", subService: "" });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState("");

  const [activeFaq, setActiveFaq] = useState<number | null>(0);

  const faqs = [
    {
      question: "Do you take on international commissions?",
      answer: "Yes, our camera crews travel globally. We have filmed narrative short films and corporate branding spots across Europe, Asia, and the Americas.",
    },
    {
      question: "What is the typical starting budget for brand films?",
      answer: "Commercial brand campaigns start at $8k. Total quotes depend on factors like locations, equipment rentals, sound design, and total shoot days.",
    },
    {
      question: "Can I hire your soundstages or gear separately?",
      answer: "Absolutely. You can submit studio rental bookings or equipment hire logs directly through our Request Portal page.",
    },
  ];

  const handleInputChange = (field: string, val: string) => {
    setFormData({ ...formData, [field]: val });
    if (errors[field]) {
      setErrors({ ...errors, [field]: "" });
    }
  };

  const validateForm = () => {
    const tempErrors: Record<string, string> = {};
    if (!formData.name) tempErrors.name = "Name is required";
    if (!formData.email) tempErrors.email = "Email is required";
    else if (!/\S+@\S+\.\S+/.test(formData.email)) tempErrors.email = "Invalid email format";
    if (!formData.message) tempErrors.message = "Message is required";
    if (!formData.phone) tempErrors.phone = "Phone is required";
    if (!formData.service) tempErrors.service = "Service is required";
    if (formData.service && !formData.subService) {
      tempErrors.subService = "Specific service is required";
    }

    setErrors(tempErrors);
    return Object.keys(tempErrors).length === 0;
  };

  const getSubServiceOptions = () => {
    switch(formData.service) {
      case "Film Production": return ["Ad films for brand campaigns", "Short films", "Documentary films"];
      case "Photography": return ["Editorial Campaign", "Product Lookbook"];
      case "Digital Marketing": return ["Web Development", "Brand Development", "Social Media Marketing"];
      default: return [];
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (validateForm()) {
      setSubmitting(true);
      setSubmitError("");
      try {
        const res = await fetch("/api/contact", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            name: formData.name,
            email: formData.email,
            phone: formData.phone,
            service: formData.service,
            subService: formData.subService,
            message: formData.message,
            budget: "N/A"
          }),
        });

        const data = await res.json();
        if (res.ok && data.success) {
          setSubmitted(true);
        } else {
          setSubmitError(data.error || "Something went wrong. Please try again.");
        }
      } catch (err: any) {
        setSubmitError("Failed to transmit email. Please verify connection.");
      } finally {
        setSubmitting(false);
      }
    }
  };

  return (
    <div className="w-full min-h-screen bg-background flex flex-col lg:flex-row">
      {/* Left: Video */}
      <motion.div
        variants={staggerContainer}
        initial="hidden"
        animate="visible"
        className="w-full lg:w-1/2 h-[50vh] lg:h-screen relative overflow-hidden hidden md:block lg:sticky lg:top-0"
      >
        <video
          src="/videos/Srusti Pratik/Haldi Pratik Srusti.mp4"
          autoPlay
          muted
          loop
          playsInline
          className="absolute inset-0 w-full h-full object-cover filter grayscale"
        />
        <div className="absolute inset-0 bg-black/60 mix-blend-multiply" />
        <div className="absolute inset-0 flex flex-col items-center justify-center p-12 text-center">
          <motion.h2 variants={fadeUpVariant} className="text-6xl lg:text-8xl font-serif uppercase tracking-tighter mb-4 text-text">
            {t("contact.title") || "Let's Talk."}
          </motion.h2>
          <motion.p variants={fadeUpVariant} className="text-sm font-mono tracking-[0.2em] uppercase text-accent">
            {t("contact.subtitle") || "We are ready to build something unforgettable."}
          </motion.p>
        </div>
      </motion.div>

      {/* Right: Form */}
      <motion.div
        variants={staggerContainer}
        initial="hidden"
        animate="visible"
        className="w-full lg:w-1/2 min-h-screen bg-surface/5 backdrop-blur-md pt-32 pb-24 px-6 md:px-16 flex flex-col justify-center relative z-10"
      >
        <motion.h1 variants={fadeUpVariant} className="text-5xl font-serif uppercase tracking-tighter mb-12 block md:hidden text-text">
          {t("contact.title") || "Let's Talk."}
        </motion.h1>

        {submitted ? (
          <motion.div variants={fadeUpVariant} className="w-full max-w-xl mx-auto flex flex-col items-center gap-4 text-center py-12 relative">
             <motion.div
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ delay: 0.5, duration: 0.5, type: "spring" }}
                className="w-24 h-24 rounded-full border border-accent flex items-center justify-center text-accent bg-accent/10 mb-6"
              >
                <Send className="w-10 h-10 fill-accent" />
             </motion.div>
             <motion.h3 
               initial={{ opacity: 0, y: 10 }}
               animate={{ opacity: 1, y: 0 }}
               transition={{ delay: 0.8 }}
               className="text-4xl md:text-5xl font-serif uppercase tracking-tight mb-2 text-accent"
             >
               Message Sent!
             </motion.h3>
             <p className="text-lg text-text/70 mb-1">Thank you for reaching out.</p>
             <p className="text-lg text-text/70 mb-6">We&apos;ll get back to you shortly.</p>

             <Button variant="secondary" onClick={() => setSubmitted(false)}>
               Send Another
             </Button>
          </motion.div>
        ) : (
          <form onSubmit={handleSubmit} className="w-full max-w-xl mx-auto flex flex-col gap-8">
            {submitError && (
              <motion.div variants={fadeUpVariant} className="bg-red-500/10 border border-red-500/20 text-red-400 p-4 rounded-lg text-sm">
                {submitError}
              </motion.div>
            )}

            <motion.div variants={fadeUpVariant}>
              <Input
                label={t("contact.name") + " *"}
                id="name"
                value={formData.name}
                onChange={(e) => handleInputChange("name", e.target.value)}
                error={errors.name}
              />
            </motion.div>

            <div className="flex flex-col md:flex-row gap-8">
              <motion.div variants={fadeUpVariant} className="w-full">
                <Input
                  label={t("contact.email") + " *"}
                  id="email"
                  type="email"
                  value={formData.email}
                  onChange={(e) => handleInputChange("email", e.target.value)}
                  error={errors.email}
                />
              </motion.div>
              <motion.div variants={fadeUpVariant} className="w-full">
                <Input
                  label="Phone *"
                  id="phone"
                  type="tel"
                  value={formData.phone}
                  onChange={(e) => handleInputChange("phone", e.target.value)}
                  error={errors.phone}
                />
              </motion.div>
            </div>

            <motion.div variants={fadeUpVariant} className="flex flex-col gap-2 relative">
              <label className="text-xs font-mono tracking-widest uppercase text-text/70 ml-1">Service</label>
              <select
                value={formData.service}
                onChange={(e) => {
                  handleInputChange("service", e.target.value);
                  handleInputChange("subService", "");
                }}
                className="w-full bg-surface/30 border border-border focus:border-accent/50 rounded-xl px-4 py-3 outline-none transition-all duration-300 font-sans text-base text-text appearance-none"
              >
                <option value="Film Production">Film Production</option>
                <option value="Photography">Photography</option>
                <option value="Digital Marketing">Digital Marketing</option>
              </select>
            </motion.div>

            <AnimatePresence>
              {formData.service && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  exit={{ opacity: 0, height: 0 }}
                  className="flex flex-col gap-2 relative mt-2 overflow-hidden"
                >
                  <label className="text-xs font-mono tracking-widest uppercase text-text/70 ml-1">Specific Service Type *</label>
                  <select
                    value={formData.subService}
                    onChange={(e) => handleInputChange("subService", e.target.value)}
                    className="w-full bg-surface/30 border border-border focus:border-accent/50 rounded-xl px-4 py-3 outline-none transition-all duration-300 font-sans text-base text-text appearance-none"
                  >
                    <option value="" disabled hidden>Select Category...</option>
                    {getSubServiceOptions().map((opt, idx) => (
                      <option key={idx} value={opt} className="bg-surface text-text">{opt}</option>
                    ))}
                  </select>
                  <div className="absolute right-4 top-10 pointer-events-none w-0 h-0 border-l-[4px] border-l-transparent border-r-[4px] border-r-transparent border-t-[6px] border-t-text/50" />
                  {errors.subService && (
                    <span className="text-[10px] font-semibold text-red-500 mt-1 block uppercase tracking-wider pl-1">
                      {errors.subService}
                    </span>
                  )}
                </motion.div>
              )}
            </AnimatePresence>

            <motion.div variants={fadeUpVariant}>
              <TextArea
                label={t("contact.message") + " *"}
                id="message"
                value={formData.message}
                onChange={(e) => handleInputChange("message", e.target.value)}
                error={errors.message}
              />
            </motion.div>

            <motion.div variants={fadeUpVariant} className="mt-4">
              <Button type="submit" variant="primary" className="w-full sm:w-max justify-center px-14 py-4" disabled={submitting}>
                {submitting ? "Sending..." : "Submit Inquiry →"}
              </Button>
            </motion.div>
          </form>
        )}

        {/* Location & Socials */}
        <motion.div variants={fadeUpVariant} className="mt-24 flex flex-col sm:flex-row justify-between items-start gap-16 sm:gap-8 w-full max-w-xl mx-auto border-t border-border/50 pt-12">
          <div className="w-full sm:w-auto">
            <p className="text-xs font-mono tracking-widest uppercase text-text/50 mb-4">Location</p>
            <p className="font-sans text-lg text-text/80 leading-relaxed">Havilah,<br />Kothanur, Bangalore<br />560077, India </p>
          </div>
          
          <div className="grid grid-cols-1 gap-4 w-full sm:w-[280px]">
            <p className="text-xs font-mono tracking-widest uppercase text-text/50 mb-2 sm:text-right hidden sm:block">Socials</p>
            {socialLinks.map((social) => (
              <a 
                key={social.platform}
                href={social.url}
                target="_blank"
                rel="noreferrer"
                className="group relative flex items-center gap-4 p-4 rounded-2xl border border-border bg-surface/30 overflow-hidden transition-all duration-500 hover:-translate-y-1"
              >
                <div className={`absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 ${social.theme} z-0`}></div>
                
                <div className="relative z-10 flex items-center justify-center w-12 h-12 rounded-xl bg-background border border-border group-hover:bg-black/20 group-hover:border-transparent transition-all duration-500 shrink-0">
                  {social.icon}
                </div>

                <div className="relative z-10 flex flex-col items-start flex-1">
                  <span className="text-sm font-bold uppercase tracking-wide text-text group-hover:text-white transition-colors duration-500">
                    {social.platform}
                  </span>
                  <span className="text-[10px] font-mono text-text/50 group-hover:text-white/90 transition-colors duration-500">
                    {social.handle}
                  </span>
                </div>
              </a>
            ))}
          </div>
        </motion.div>

        {/* FAQs */}
        <motion.div variants={fadeUpVariant} className="mt-24 w-full max-w-xl mx-auto border-t border-border/50 pt-12">
           <h3 className="text-xs font-mono tracking-widest uppercase text-text/50 mb-8">Frequently Asked Questions</h3>
           <div className="flex flex-col gap-4">
            {faqs.map((faq, idx) => (
              <div key={idx} className="border border-border rounded-xl bg-surface/30 overflow-hidden">
                <button
                  onClick={() => setActiveFaq(activeFaq === idx ? null : idx)}
                  className="w-full px-6 py-4 flex items-center justify-between text-left font-serif font-bold text-sm md:text-base text-text hover:text-accent transition-colors"
                >
                  <span>{faq.question}</span>
                  <HelpCircle className={`w-4 h-4 text-accent transition-transform ${activeFaq === idx ? "rotate-90" : ""}`} />
                </button>
                {activeFaq === idx && (
                  <div className="px-6 pb-6 pt-2 border-t border-border/50 bg-background/20 text-xs text-text/60 leading-relaxed">
                    {faq.answer}
                  </div>
                )}
              </div>
            ))}
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
}
