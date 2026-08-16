"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Cookie, X, ShieldCheck, BarChart3, Megaphone } from "lucide-react";
import { useCookieConsent } from "@/context/CookieConsentContext";

export default function CookieConsent() {
  const { status, prefs, acceptAll, declineAll, savePrefs } = useCookieConsent();
  const [show, setShow] = useState(false);
  const [showDetail, setShowDetail] = useState(false);
  const [localPrefs, setLocalPrefs] = useState({ analytics: false, marketing: false });

  // Only show after hydration if no consent stored yet
  useEffect(() => {
    if (status === "pending") {
      const timer = setTimeout(() => setShow(true), 1200);
      return () => clearTimeout(timer);
    }
  }, [status]);

  const handleAcceptAll = () => {
    acceptAll();
    setShow(false);
  };

  const handleDecline = () => {
    declineAll();
    setShow(false);
  };

  const handleSave = () => {
    savePrefs(localPrefs);
    setShow(false);
  };

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          initial={{ y: 120, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 120, opacity: 0 }}
          transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
          className="fixed bottom-4 left-4 right-4 md:left-auto md:right-6 md:bottom-6 md:max-w-[440px] z-[200]"
        >
          <div className="bg-surface/95 backdrop-blur-2xl border border-border/60 rounded-2xl shadow-2xl shadow-black/30 overflow-hidden">
            {/* Header */}
            <div className="flex items-center justify-between px-5 pt-5 pb-3 border-b border-border/40">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-lg bg-accent/15 flex items-center justify-center">
                  <Cookie className="w-4 h-4 text-accent" />
                </div>
                <span className="font-serif font-bold text-text text-base">Cookie Preferences</span>
              </div>
              <button
                onClick={handleDecline}
                className="w-7 h-7 flex items-center justify-center rounded-full hover:bg-border/40 text-text/50 hover:text-text transition-colors"
                aria-label="Decline and close"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            </div>

            <div className="px-5 py-4">
              <p className="text-xs text-text/60 leading-relaxed">
                We use cookies to enhance your experience, serve personalised content, and analyse traffic.{" "}
                <button
                  onClick={() => setShowDetail(!showDetail)}
                  className="text-accent underline underline-offset-2 hover:text-accent-hover transition-colors"
                >
                  {showDetail ? "Hide details" : "Manage preferences"}
                </button>
              </p>

              {/* Expandable Preferences */}
              <AnimatePresence>
                {showDetail && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3 }}
                    className="overflow-hidden"
                  >
                    <div className="mt-4 flex flex-col gap-3 border border-border/40 rounded-xl p-3">
                      {/* Necessary */}
                      <div className="flex items-center justify-between gap-3">
                        <div className="flex items-center gap-2">
                          <ShieldCheck className="w-4 h-4 text-accent flex-shrink-0" />
                          <div>
                            <p className="text-xs font-semibold text-text">Necessary</p>
                            <p className="text-[10px] text-text/50">Required for the site to function</p>
                          </div>
                        </div>
                        <div className="text-[10px] font-bold text-accent bg-accent/10 px-2 py-0.5 rounded-full">Always On</div>
                      </div>

                      {/* Analytics */}
                      <div className="flex items-center justify-between gap-3">
                        <div className="flex items-center gap-2">
                          <BarChart3 className="w-4 h-4 text-text/50 flex-shrink-0" />
                          <div>
                            <p className="text-xs font-semibold text-text">Analytics</p>
                            <p className="text-[10px] text-text/50">Helps us understand site usage</p>
                          </div>
                        </div>
                        <button
                          role="switch"
                          aria-checked={localPrefs.analytics}
                          onClick={() => setLocalPrefs(p => ({ ...p, analytics: !p.analytics }))}
                          className={`w-9 h-5 rounded-full transition-colors duration-300 relative flex-shrink-0 ${localPrefs.analytics ? "bg-accent" : "bg-border"}`}
                        >
                          <span className={`absolute top-0.5 w-4 h-4 rounded-full bg-white shadow transition-all duration-300 ${localPrefs.analytics ? "left-4" : "left-0.5"}`} />
                        </button>
                      </div>

                      {/* Marketing */}
                      <div className="flex items-center justify-between gap-3">
                        <div className="flex items-center gap-2">
                          <Megaphone className="w-4 h-4 text-text/50 flex-shrink-0" />
                          <div>
                            <p className="text-xs font-semibold text-text">Marketing</p>
                            <p className="text-[10px] text-text/50">Personalised ads & translation tools</p>
                          </div>
                        </div>
                        <button
                          role="switch"
                          aria-checked={localPrefs.marketing}
                          onClick={() => setLocalPrefs(p => ({ ...p, marketing: !p.marketing }))}
                          className={`w-9 h-5 rounded-full transition-colors duration-300 relative flex-shrink-0 ${localPrefs.marketing ? "bg-accent" : "bg-border"}`}
                        >
                          <span className={`absolute top-0.5 w-4 h-4 rounded-full bg-white shadow transition-all duration-300 ${localPrefs.marketing ? "left-4" : "left-0.5"}`} />
                        </button>
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Actions */}
            <div className="px-5 pb-5 flex gap-2.5">
              {showDetail ? (
                <>
                  <button
                    onClick={handleDecline}
                    className="flex-1 py-2.5 text-xs font-semibold rounded-lg border border-border/60 text-text/70 hover:border-accent/40 hover:text-accent transition-all duration-200"
                  >
                    Reject All
                  </button>
                  <button
                    onClick={handleSave}
                    className="flex-1 py-2.5 text-xs font-semibold rounded-lg border border-accent/50 text-accent hover:bg-accent/10 transition-all duration-200"
                  >
                    Save Selection
                  </button>
                  <button
                    onClick={handleAcceptAll}
                    className="flex-1 py-2.5 text-xs font-bold rounded-lg bg-accent text-black hover:bg-accent-hover transition-all duration-200"
                  >
                    Accept All
                  </button>
                </>
              ) : (
                <>
                  <button
                    onClick={handleDecline}
                    className="flex-1 py-2.5 text-xs font-semibold rounded-lg border border-border/60 text-text/70 hover:border-accent/40 hover:text-accent transition-all duration-200"
                  >
                    Decline
                  </button>
                  <button
                    onClick={handleAcceptAll}
                    className="flex-2 flex-grow py-2.5 text-xs font-bold rounded-lg bg-accent text-black hover:bg-accent-hover transition-all duration-200 px-6"
                  >
                    Accept All Cookies
                  </button>
                </>
              )}
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
