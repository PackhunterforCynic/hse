"use client";

import React, { createContext, useContext, useState, useEffect, useCallback } from "react";

export type ConsentStatus = "pending" | "accepted" | "declined";

interface ConsentPrefs {
  necessary: true;
  analytics: boolean;
  marketing: boolean;
}

interface CookieConsentContextType {
  status: ConsentStatus;
  prefs: ConsentPrefs;
  acceptAll: () => void;
  declineAll: () => void;
  savePrefs: (prefs: Partial<ConsentPrefs>) => void;
  resetConsent: () => void;
}

const COOKIE_NAME = "havilah_consent";
const COOKIE_DAYS = 365;

function setCookie(value: string, days: number) {
  const expires = new Date();
  expires.setTime(expires.getTime() + days * 24 * 60 * 60 * 1000);
  document.cookie = `${COOKIE_NAME}=${encodeURIComponent(value)}; expires=${expires.toUTCString()}; path=/; SameSite=Lax`;
}

function getCookie(): string | null {
  const name = COOKIE_NAME + "=";
  const cookies = document.cookie.split(";");
  for (let c of cookies) {
    c = c.trim();
    if (c.startsWith(name)) {
      return decodeURIComponent(c.substring(name.length));
    }
  }
  return null;
}

function deleteCookie(name: string) {
  document.cookie = `${name}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;`;
}

const DEFAULT_PREFS: ConsentPrefs = { necessary: true, analytics: false, marketing: false };

const CookieConsentContext = createContext<CookieConsentContextType | undefined>(undefined);

export function CookieConsentProvider({ children }: { children: React.ReactNode }) {
  const [status, setStatus] = useState<ConsentStatus>("pending");
  const [prefs, setPrefs] = useState<ConsentPrefs>(DEFAULT_PREFS);

  useEffect(() => {
    const raw = getCookie();
    if (raw) {
      try {
        const parsed = JSON.parse(raw);
        setPrefs({ necessary: true, analytics: !!parsed.analytics, marketing: !!parsed.marketing });
        setStatus(parsed.analytics || parsed.marketing ? "accepted" : "declined");
      } catch {
        // corrupted cookie — reset
      }
    }
  }, []);

  const persist = useCallback((newPrefs: ConsentPrefs, newStatus: ConsentStatus) => {
    setPrefs(newPrefs);
    setStatus(newStatus);
    setCookie(JSON.stringify(newPrefs), COOKIE_DAYS);
    // Clean up third-party cookies if declined
    if (newStatus === "declined") {
      deleteCookie("googtrans");
      deleteCookie("_ga");
      deleteCookie("_gid");
    }
  }, []);

  const acceptAll = useCallback(() => {
    persist({ necessary: true, analytics: true, marketing: true }, "accepted");
  }, [persist]);

  const declineAll = useCallback(() => {
    persist({ necessary: true, analytics: false, marketing: false }, "declined");
  }, [persist]);

  const savePrefs = useCallback((partial: Partial<ConsentPrefs>) => {
    const newPrefs: ConsentPrefs = { necessary: true, analytics: partial.analytics ?? false, marketing: partial.marketing ?? false };
    const newStatus: ConsentStatus = newPrefs.analytics || newPrefs.marketing ? "accepted" : "declined";
    persist(newPrefs, newStatus);
  }, [persist]);

  const resetConsent = useCallback(() => {
    deleteCookie(COOKIE_NAME);
    setStatus("pending");
    setPrefs(DEFAULT_PREFS);
  }, []);

  return (
    <CookieConsentContext.Provider value={{ status, prefs, acceptAll, declineAll, savePrefs, resetConsent }}>
      {children}
    </CookieConsentContext.Provider>
  );
}

export function useCookieConsent() {
  const ctx = useContext(CookieConsentContext);
  if (!ctx) throw new Error("useCookieConsent must be used within CookieConsentProvider");
  return ctx;
}
