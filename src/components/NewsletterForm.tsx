"use client";

import React, { useState } from "react";
import { ArrowRight, Loader2, CheckCircle2 } from "lucide-react";

export default function NewsletterForm() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [message, setMessage] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;

    setStatus("loading");

    try {
      const res = await fetch("/api/newsletter", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email }),
      });

      const data = await res.json();

      if (res.ok) {
        setStatus("success");
        setMessage("Subscribed successfully!");
        setEmail("");
      } else {
        setStatus("error");
        setMessage(data.error || "Failed to subscribe.");
      }
    } catch (err) {
      setStatus("error");
      setMessage("Something went wrong. Please try again.");
    }
  };

  return (
    <div className="w-full">
      <form onSubmit={handleSubmit} className="relative flex items-center">
        <input 
          type="email" 
          placeholder="EMAIL ADDRESS" 
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          disabled={status === "loading" || status === "success"}
          required
          className="w-full bg-surface/20 border-b border-border/50 py-3 px-2 text-xs font-bold uppercase tracking-widest text-white placeholder-white/30 focus:outline-none focus:border-accent transition-colors disabled:opacity-50"
        />
        <button 
          type="submit" 
          disabled={status === "loading" || status === "success"}
          className="absolute right-2 text-white hover:text-accent transition-colors disabled:opacity-50"
          aria-label="Subscribe to newsletter"
        >
          {status === "loading" ? (
            <Loader2 className="w-4 h-4 animate-spin" />
          ) : status === "success" ? (
            <CheckCircle2 className="w-4 h-4 text-green-500" />
          ) : (
            <ArrowRight className="w-4 h-4" />
          )}
        </button>
      </form>
      
      {status === "error" && (
        <p className="text-red-500 text-xs mt-2 font-medium">{message}</p>
      )}
      {status === "success" && (
        <p className="text-green-500 text-xs mt-2 font-medium">{message}</p>
      )}
    </div>
  );
}
