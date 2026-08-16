"use client";

import React, { useState } from "react";
import { Hero } from "@/components/ui/Hero";
import { SectionHeader } from "@/components/ui/Hero";
import Button from "@/components/ui/Button";
import Link from "next/link";
import { CheckCircle, Award, User, HelpCircle, Briefcase, Check, UploadCloud, ArrowRight, ArrowLeft } from "lucide-react";
import { Input, TextArea, Select } from "@/components/ui/Form";
import { motion, AnimatePresence } from "framer-motion";

export default function InternshipsPage() {
  const tracks = [
    {
      title: "Cinematography Intern",
      duration: "3 Months",
      description: "Hands-on camera assisting on active soundstages. You'll learn anamorphic lighting, focus pulling, and rigging setup under working directors.",
    },
    {
      title: "Editing & Post-Production Intern",
      duration: "3 Months",
      description: "Post-production internship focusing on editing loops, sound design, spatial audio mixing, and color grading inside Davinci Resolve suites.",
    },
    {
      title: "Creative Producer Intern",
      duration: "3 Months",
      description: "Learn client briefing, script pitching, pre-production logistics, scheduling databases, and location scouting management.",
    },
  ];

  const benefits = [
    "Direct hands-on experience on live client projects",
    "Professional portfolio credit & director mentorship",
    "Academy Certification of Completed Hours",
    "Paid crew opportunities for client shoots",
    "24/7 Access to studio post-production suites",
  ];

  const [step, setStep] = useState(1);
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState("");

  // Form Fields State
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    track: "",
    fieldOfStudy: "",
    experience: "",
    pitch: "",
    portfolioUrl: "",
    resumeFile: null as File | null,
  });

  const [errors, setErrors] = useState<Record<string, string>>({});

  const trackOptions = [
    { value: "cinematography", label: "Cinematography Intern" },
    { value: "post-production", label: "Editing & Post-Production Intern" },
    { value: "producer", label: "Creative Producer Intern" },
  ];

  const experienceOptions = [
    { value: "beginner", label: "Beginner (Self-Taught / School)" },
    { value: "intermediate", label: "Intermediate (Some Projects / Reel)" },
    { value: "advanced", label: "Advanced (Independent Projects)" },
  ];

  const handleInputChange = (field: string, val: string | File) => {
    setFormData({ ...formData, [field]: val });
    if (errors[field]) {
      setErrors({ ...errors, [field]: "" });
    }
  };

  const validateStep = () => {
    const tempErrors: Record<string, string> = {};

    if (step === 1) {
      if (!formData.fullName) tempErrors.fullName = "Full name is required";
      if (!formData.email) tempErrors.email = "Email address is required";
      else if (!/\S+@\S+\.\S+/.test(formData.email)) tempErrors.email = "Invalid email format";
      if (!formData.phone) tempErrors.phone = "Phone number is required";
    }

    if (step === 2) {
      if (!formData.track) tempErrors.track = "Please select an internship track";
      if (!formData.fieldOfStudy) tempErrors.fieldOfStudy = "Please provide your field of study";
      if (!formData.experience) tempErrors.experience = "Please select your experience level";
      if (!formData.pitch || formData.pitch.length < 20) {
        tempErrors.pitch = "Please provide a short pitch (min 20 characters)";
      }
    }

    if (step === 3) {
      if (!formData.portfolioUrl) tempErrors.portfolioUrl = "Portfolio URL is required";
      if (!formData.resumeFile) {
        tempErrors.resumeFile = "Resume file is required";
      } else if (
        formData.resumeFile.type !== "application/pdf" && 
        formData.resumeFile.type !== "application/vnd.openxmlformats-officedocument.wordprocessingml.document" &&
        !formData.resumeFile.name.toLowerCase().endsWith(".pdf") &&
        !formData.resumeFile.name.toLowerCase().endsWith(".docx")
      ) {
        tempErrors.resumeFile = "Please upload a valid PDF or DOCX file";
      }
    }

    setErrors(tempErrors);
    return Object.keys(tempErrors).length === 0;
  };

  const handleNext = () => {
    if (validateStep()) {
      setStep((prev) => prev + 1);
    }
  };

  const handlePrev = () => {
    setStep((prev) => prev - 1);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (validateStep()) {
      setSubmitting(true);
      setSubmitError("");
      try {
        const payload = new FormData();
        payload.append("fullName", formData.fullName);
        payload.append("email", formData.email);
        payload.append("phone", formData.phone);
        payload.append("track", formData.track);
        payload.append("fieldOfStudy", formData.fieldOfStudy);
        payload.append("experience", formData.experience);
        payload.append("pitch", formData.pitch);
        payload.append("portfolioUrl", formData.portfolioUrl);
        if (formData.resumeFile) {
          payload.append("resumeFile", formData.resumeFile);
        }

        const res = await fetch("/api/internships", {
          method: "POST",
          body: payload,
        });

        if (res.ok) {
          setFormSubmitted(true);
        } else {
          const data = await res.json();
          setSubmitError(data.error || "Failed to submit application.");
        }
      } catch (err) {
        setSubmitError("Something went wrong. Please try again.");
      } finally {
        setSubmitting(false);
      }
    }
  };

  return (
    <div className="relative min-h-screen">
      <Hero
        badge="Join the Crew"
        title="Internships"
        italicTitle="& Careers"
        description="Launch your career in cinematic production, post-production, or creative strategy."
        backgroundImage="https://images.unsplash.com/photo-1574717024653-61fd2cf4d44d?auto=format&fit=crop&q=80&w=2000"
      />

      {/* Program Tracks */}
      <section className="py-20 border-b border-border bg-background relative z-10">
        <div className="max-w-7xl mx-auto px-6">
          <SectionHeader
            badge="Tracks"
            title="Syllabus & Career"
            italicTitle="Internship Options"
            description="Select from three professional tracks designed to build commercial portfolios."
            className="mb-16"
          />

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {tracks.map((tr, idx) => (
              <div
                key={idx}
                className="glassmorphism-card p-8 rounded-xl flex flex-col justify-between hover:border-accent/40 transition-all duration-300 gap-6"
              >
                <div className="flex flex-col gap-4">
                  <span className="text-[10px] font-bold text-accent tracking-widest uppercase flex items-center gap-1.5">
                    <Briefcase className="w-3.5 h-3.5" /> {tr.duration} Track
                  </span>
                  <h3 className="font-serif text-lg font-bold text-text">
                    {tr.title}
                  </h3>
                  <p className="text-xs text-text/60 leading-relaxed">
                    {tr.description}
                  </p>
                </div>
                <Button variant="gold-outline" className="w-full" onClick={() => document.getElementById('application-form')?.scrollIntoView({ behavior: 'smooth' })}>
                  Apply Track
                </Button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-24 border-b border-border bg-surface/30 backdrop-blur-sm relative z-10">
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          <div className="lg:col-span-5 flex flex-col items-start gap-4">
            <SectionHeader
              badge="Rewards"
              title="Internship"
              italicTitle="Program Benefits"
              alignment="left"
              className="m-0"
            />
            <p className="text-xs text-text/60 leading-relaxed mt-2">
              We believe in fostering the next generation of visual storytellers. Our interns are fully integrated crew members receiving hands-on, high-end guidance.
            </p>
          </div>
          <div className="lg:col-span-7 flex flex-col gap-4">
            {benefits.map((bene, idx) => (
              <div key={idx} className="flex items-start gap-3 p-4 rounded-lg bg-background/50 border border-border/50">
                <CheckCircle className="w-5 h-5 text-accent mt-0.5 flex-shrink-0" />
                <span className="text-sm font-semibold text-text/80">{bene}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Application Form */}
      <section id="application-form" className="py-28 bg-background relative z-10">
        <div className="max-w-3xl mx-auto px-6">
          <SectionHeader
            badge="Cohort 2026"
            title="Ready to Start Your"
            italicTitle="Creative Journey?"
            description="Applications for our Fall 2026 cohort are currently open. Complete the dynamic application form to secure your audition."
            className="mb-12 text-center flex flex-col items-center"
          />

          {/* Progress Tracker bar */}
          {!formSubmitted && (
            <div className="mb-12">
              <div className="flex justify-between text-[9px] font-bold text-text/40 uppercase tracking-widest mb-4">
                <span>Personal</span>
                <span>Track Details</span>
                <span>Portfolio</span>
                <span>Confirm</span>
              </div>
              <div className="w-full h-1.5 bg-border/40 rounded-full overflow-hidden relative">
                <motion.div
                  className="absolute left-0 top-0 bottom-0 bg-accent rounded-full"
                  initial={{ width: "25%" }}
                  animate={{ width: `${(step / 4) * 100}%` }}
                  transition={{ duration: 0.4, ease: "easeInOut" }}
                />
              </div>
            </div>
          )}

          {/* Form container */}
          <div className="glassmorphism p-8 md:p-10 rounded-2xl border-border/40">
            <AnimatePresence mode="wait">
              {formSubmitted ? (
                <motion.div
                  key="success"
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  className="text-center py-12 flex flex-col items-center gap-6"
                >
                  <div className="w-16 h-16 rounded-full border-2 border-accent flex items-center justify-center text-accent bg-accent/5 animate-scale-up">
                    <CheckCircle className="w-8 h-8" />
                  </div>
                  <div>
                    <h3 className="font-serif text-2xl md:text-3xl font-bold text-heading mb-3 uppercase">
                      Application Submitted
                    </h3>
                    <p className="text-sm text-text/60 leading-relaxed max-w-lg mx-auto">
                      Thank you for applying to the Havilah Academy Internship program. We have received your files. Our curatorial panel will review your portfolio and send audition details to <span className="text-accent font-bold">{formData.email}</span>.
                    </p>
                  </div>
                  <Link href="/" className="mt-4">
                    <Button variant="primary">Return Home</Button>
                  </Link>
                </motion.div>
              ) : (
                <form key={step} onSubmit={handleSubmit} className="flex flex-col gap-2">
                  
                  {/* Step 1: Personal Details */}
                  {step === 1 && (
                    <motion.div
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -20 }}
                      transition={{ duration: 0.3 }}
                    >
                      <h3 className="font-serif text-lg font-bold text-heading mb-6 border-b border-border/50 pb-2">
                        1. Personal Details
                      </h3>
                      <Input
                        label="Full Name"
                        id="fullName"
                        type="text"
                        value={formData.fullName}
                        onChange={(e) => handleInputChange("fullName", e.target.value)}
                        error={errors.fullName}
                      />
                      <Input
                        label="Email Address"
                        id="email"
                        type="email"
                        value={formData.email}
                        onChange={(e) => handleInputChange("email", e.target.value)}
                        error={errors.email}
                      />
                      <Input
                        label="Phone Number"
                        id="phone"
                        type="tel"
                        value={formData.phone}
                        onChange={(e) => handleInputChange("phone", e.target.value)}
                        error={errors.phone}
                      />
                    </motion.div>
                  )}

                  {/* Step 2: Track Select */}
                  {step === 2 && (
                    <motion.div
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -20 }}
                      transition={{ duration: 0.3 }}
                    >
                      <h3 className="font-serif text-lg font-bold text-heading mb-6 border-b border-border/50 pb-2">
                        2. Internship Track & Goals
                      </h3>
                      <Select
                        label="Internship Track"
                        id="track"
                        value={formData.track}
                        options={trackOptions}
                        onChange={(e) => handleInputChange("track", e.target.value)}
                        error={errors.track}
                      />
                      <Input
                        label="Field of Study / Major"
                        id="fieldOfStudy"
                        type="text"
                        value={formData.fieldOfStudy}
                        onChange={(e) => handleInputChange("fieldOfStudy", e.target.value)}
                        error={errors.fieldOfStudy}
                      />
                      <Select
                        label="Experience Level"
                        id="experience"
                        value={formData.experience}
                        options={experienceOptions}
                        onChange={(e) => handleInputChange("experience", e.target.value)}
                        error={errors.experience}
                      />
                      <TextArea
                        label="Why do you want to join Havilah? (Your Pitch)"
                        id="pitch"
                        value={formData.pitch}
                        onChange={(e) => handleInputChange("pitch", e.target.value)}
                        error={errors.pitch}
                      />
                    </motion.div>
                  )}

                  {/* Step 3: Portfolio & Resume links */}
                  {step === 3 && (
                    <motion.div
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -20 }}
                      transition={{ duration: 0.3 }}
                    >
                      <h3 className="font-serif text-lg font-bold text-heading mb-6 border-b border-border/50 pb-2">
                        3. Portfolios & Credentials
                      </h3>
                      <Input
                        label="Reel or Portfolio URL (e.g. Vimeo, Behance)"
                        id="portfolioUrl"
                        type="url"
                        value={formData.portfolioUrl}
                        onChange={(e) => handleInputChange("portfolioUrl", e.target.value)}
                        error={errors.portfolioUrl}
                      />
                      {/* Styled drag and drop file box */}
                      <div className="mb-6">
                        <label className="block text-xs font-bold tracking-[0.2em] text-accent uppercase mb-2">
                          Resume / CV (Required)
                        </label>
                        <div className="relative border border-dashed border-border rounded-xl p-8 flex flex-col items-center justify-center gap-3 bg-background/20 cursor-pointer hover:border-accent transition-colors group">
                          <input 
                            type="file" 
                            accept=".pdf,.docx"
                            className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                            onChange={(e) => {
                              const file = e.target.files?.[0];
                              if (file) handleInputChange("resumeFile", file);
                            }}
                          />
                          <UploadCloud className="w-10 h-10 text-accent/60 group-hover:text-accent transition-colors" />
                          <div className="text-center">
                            {formData.resumeFile ? (
                              <span className="text-sm font-semibold text-text">{formData.resumeFile.name}</span>
                            ) : (
                              <>
                                <span className="text-xs font-semibold text-text">Drag & drop files or </span>
                                <span className="text-xs font-bold text-accent group-hover:underline">browse</span>
                              </>
                            )}
                          </div>
                          <span className="text-[10px] text-text/40 uppercase tracking-widest">Max size 25MB (PDF, DOCX)</span>
                        </div>
                        {errors.resumeFile && (
                          <p className="mt-2 text-xs text-red-500">{errors.resumeFile}</p>
                        )}
                      </div>
                    </motion.div>
                  )}

                  {/* Step 4: Confirmation */}
                  {step === 4 && (
                    <motion.div
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -20 }}
                      transition={{ duration: 0.3 }}
                      className="flex flex-col gap-6"
                    >
                      <h3 className="font-serif text-lg font-bold text-heading border-b border-border/50 pb-2">
                        4. Confirm Details
                      </h3>

                      <div className="flex flex-col gap-4 text-sm text-text/70 bg-background/50 border border-border/50 p-6 rounded-xl leading-relaxed">
                        <div>
                          <span className="text-[10px] font-bold text-accent tracking-[0.2em] mb-1">Applicant</span>
                          <span className="text-text font-semibold">{formData.fullName}</span>
                        </div>
                        <div>
                          <span className="text-[10px] font-bold text-accent uppercase tracking-wider block">Email & Phone:</span>
                          <span>{formData.email} • {formData.phone}</span>
                        </div>
                        <div>
                          <span className="text-[10px] font-bold text-accent uppercase tracking-wider block">Selected Track:</span>
                          <span className="text-text font-semibold capitalize">{formData.track} ({formData.experience})</span>
                        </div>
                        <div>
                          <span className="text-[10px] font-bold text-accent uppercase tracking-wider block">Portfolio Links:</span>
                          <span className="truncate block hover:text-accent transition-colors">{formData.portfolioUrl}</span>
                        </div>
                      </div>
                    </motion.div>
                  )}

                  {/* Action Buttons */}
                  <div className="flex justify-between items-center mt-8 border-t border-border/50 pt-6">
                    {step > 1 ? (
                      <Button
                        type="button"
                        variant="secondary"
                        onClick={handlePrev}
                      >
                        <ArrowLeft className="w-4 h-4 mr-1" /> Back
                      </Button>
                    ) : (
                      <div />
                    )}

                    {step < 4 ? (
                      <Button
                        type="button"
                        variant="primary"
                        onClick={handleNext}
                      >
                        Continue <ArrowRight className="w-4 h-4 ml-1" />
                      </Button>
                    ) : (
                      <div className="flex flex-col items-end w-full">
                        {submitError && <span className="text-red-500 text-xs mb-2">{submitError}</span>}
                        <Button
                          type="submit"
                          variant="primary"
                          disabled={submitting}
                        >
                          {submitting ? "Submitting..." : "Submit Application"} {!submitting && <Check className="w-4 h-4 ml-1" />}
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
