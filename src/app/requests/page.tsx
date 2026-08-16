"use client";

import React, { useState } from "react";
import { Hero } from "@/components/ui/Hero";
import { Input, Select, TextArea } from "@/components/ui/Form";
import Button from "@/components/ui/Button";
import { motion, AnimatePresence } from "framer-motion";
import { CheckCircle, Layers, ArrowRight, Loader2 } from "lucide-react";
import Link from "next/link";

export default function RequestsPage() {
  const [requestType, setRequestType] = useState("");
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subService: "",
    budget: "",
    details: "",
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const requestOptions = [
    { value: "film", label: "Film Production" },
    { value: "photo", label: "Photography" },
    { value: "digital", label: "Digital Marketing" },
  ];

  const getSubServiceOptions = () => {
    switch(requestType) {
      case "film": return [
        { value: "ad-film", label: "Ad films for brand campaigns" },
        { value: "short-film", label: "Short films" },
        { value: "doc-film", label: "Documentary films" },
      ];
      case "photo": return [
        { value: "editorial", label: "Editorial Campaign" },
        { value: "lookbook", label: "Product Lookbook" },
      ];
      case "digital": return [
        { value: "web-dev", label: "Web Development" },
        { value: "brand-dev", label: "Brand Development" },
        { value: "social", label: "Social Media Marketing" },
      ];
      default: return [];
    }
  };

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
    if (!requestType) tempErrors.requestType = "Please select a service category";
    if (requestType && !formData.subService) tempErrors.subService = "Please select a specific service";
    if (!formData.details) tempErrors.details = "Please share initial project details";

    setErrors(tempErrors);
    return Object.keys(tempErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (validateForm()) {
      setIsSubmitting(true);
      
      try {
        const res = await fetch("/api/contact", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            name: formData.name,
            email: formData.email,
            service: requestOptions.find(o => o.value === requestType)?.label || requestType,
            subService: getSubServiceOptions().find(o => o.value === formData.subService)?.label || formData.subService,
            budget: formData.budget,
            message: formData.details
          })
        });

        if (res.ok) {
          setSubmitted(true);
        } else {
          setErrors({ form: "Failed to send request. Please try again." });
        }
      } catch (err) {
        setErrors({ form: "Network error occurred." });
      } finally {
        setIsSubmitting(false);
      }
    }
  };

  return (
    <div className="relative min-h-screen">
      <Hero
        badge="Inquiries Hub"
        title="Project Requests"
        italicTitle="& Briefings"
        description="Select a core service below to share your project details, and our creative producers will get back to you with a tailored strategy."
      />

      <section className="py-20 bg-background relative z-10">
        <div className="max-w-3xl mx-auto px-6">
          <div className="glassmorphism p-8 md:p-10 rounded-2xl border-border/40">
            <AnimatePresence mode="wait">
              {submitted ? (
                <motion.div
                  key="success"
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="text-center py-10 flex flex-col items-center gap-6 animate-scale-up"
                >
                  <div className="w-16 h-16 rounded-full border-2 border-accent flex items-center justify-center text-accent bg-accent/5">
                    <CheckCircle className="w-8 h-8" />
                  </div>
                  <div>
                    <h2 className="text-2xl font-serif font-bold text-white mb-2">Request Received</h2>
                    <p className="text-white/60">
                      Our production team will review your requirements and reach out shortly to discuss the next steps.
                    </p>
                  </div>
                  <Link href="/">
                    <Button variant="gold-outline">Return to Home</Button>
                  </Link>
                </motion.div>
              ) : (
                <form key="form" onSubmit={handleSubmit} className="flex flex-col gap-6 relative">
                  <div className="flex items-center gap-3 border-b border-border/50 pb-4 mb-2">
                    <Layers className="w-5 h-5 text-accent" />
                    <h2 className="font-serif text-xl font-bold text-white">Project Details</h2>
                  </div>

                  {errors.form && (
                    <div className="p-3 rounded bg-red-500/10 border border-red-500/20 text-red-400 text-sm">
                      {errors.form}
                    </div>
                  )}

                  <Input
                    label="Full Name"
                    id="name"
                    value={formData.name}
                    onChange={(e) => handleInputChange("name", e.target.value)}
                    error={errors.name}
                  />

                  <Input
                    label="Email Address"
                    id="email"
                    type="email"
                    value={formData.email}
                    onChange={(e) => handleInputChange("email", e.target.value)}
                    error={errors.email}
                  />

                  <Select
                    label="Primary Service"
                    id="requestType"
                    value={requestType}
                    options={requestOptions}
                    onChange={(e) => {
                      setRequestType(e.target.value);
                      handleInputChange("subService", "");
                      if (errors.requestType) setErrors({ ...errors, requestType: "" });
                    }}
                    error={errors.requestType}
                  />

                  <AnimatePresence>
                    {requestType && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        exit={{ opacity: 0, height: 0 }}
                        className="overflow-hidden pt-3 -mt-3"
                      >
                        <Select
                          label="Specific Service Type"
                          id="subService"
                          value={formData.subService}
                          options={getSubServiceOptions()}
                          onChange={(e) => handleInputChange("subService", e.target.value)}
                          error={errors.subService}
                        />
                      </motion.div>
                    )}
                  </AnimatePresence>

                  <Input
                    label="Project Budget Range (Optional, e.g. $10k - $25k)"
                    id="budget"
                    value={formData.budget}
                    onChange={(e) => handleInputChange("budget", e.target.value)}
                    error={errors.budget}
                  />

                  <TextArea
                    label="Project details / Creative brief"
                    id="details"
                    value={formData.details}
                    onChange={(e) => handleInputChange("details", e.target.value)}
                    error={errors.details}
                  />

                  <Button type="submit" variant="primary" className="mt-6" disabled={isSubmitting}>
                    {isSubmitting ? (
                      <span className="flex items-center gap-2">
                        <Loader2 className="w-4 h-4 animate-spin" /> Submitting...
                      </span>
                    ) : (
                      <span className="flex items-center gap-1">
                        Submit Request <ArrowRight className="w-4 h-4 ml-1" />
                      </span>
                    )}
                  </Button>
                </form>
              )}
            </AnimatePresence>
          </div>
        </div>
      </section>
    </div>
  );
}
