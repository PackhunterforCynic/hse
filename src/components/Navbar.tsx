"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, ChevronDown, Film, Layers, BookOpen, User, Phone, Sparkles } from "lucide-react";
import ThemeSwitcher from "./ThemeSwitcher";
import { useTheme } from "@/context/ThemeContext";
import TranslateWidget from "./layout/TranslateWidget";

interface NavGroup {
  label: string;
  items: {
    name: string;
    href: string;
    description: string;
    icon: React.ReactNode;
  }[];
}

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [activeGroup, setActiveGroup] = useState<string | null>(null);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();
  const { theme } = useTheme();
  
  // Basic translate function for static nav items until Google Translate kicks in
  const t = (key: string) => {
    const defaultDict: Record<string, string> = {
      "nav.productions": "Productions",
      "nav.projects": "Projects",
      "nav.services": "Services",
      "nav.about": "About",
      "nav.contact": "Contact",
      "nav.gallery": "Gallery",
      "nav.academy": "Academy",
      "nav.internships": "Internships",
      "nav.inquire": "Inquire Now",
    };
    return defaultDict[key] || key.replace("nav.", "");
  };

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close menus on path change
  useEffect(() => {
    setIsOpen(false);
    setActiveGroup(null);
  }, [pathname]);

  const navigationData: NavGroup[] = [
    {
      label: t("nav.productions"),
      items: [
        {
          name: t("nav.projects"),
          href: "/projects",
          description: "Our portfolio of cinematic films and brand storytelling.",
          icon: <Film className="w-5 h-5" />,
        },
        {
          name: t("nav.gallery"),
          href: "/gallery",
          description: "Browse behind-the-scenes photography, reels, and drone clips.",
          icon: <Sparkles className="w-5 h-5" />,
        },
      ],
    },
    {
      label: t("nav.services"),
      items: [
        {
          name: t("nav.services"),
          href: "/services",
          description: "Explore our production, branding, and event services.",
          icon: <Layers className="w-5 h-5" />,
        },
        {
          name: "Appointments",
          href: "/appointments",
          description: "Schedule consultations and creative briefing sessions.",
          icon: <Phone className="w-5 h-5" />,
        },
        {
          name: "Requests",
          href: "/requests",
          description: "Rent studio space, request equipment, or get project quotes.",
          icon: <Sparkles className="w-5 h-5" />,
        },
      ],
    },
    {
      label: t("nav.academy"),
      items: [
        {
          name: t("nav.internships"),
          href: "/internships",
          description: "Hands-on learning opportunities with our production crew.",
          icon: <User className="w-5 h-5" />,
        },
      ],
    },
    {
      label: "Studio",
      items: [
        {
          name: t("nav.about"),
          href: "/about",
          description: "The story of Havilah, our mission, vision, and core team.",
          icon: <User className="w-5 h-5" />,
        },
        {
          name: t("nav.contact"),
          href: "/contact",
          description: "Reach out to our offices, shoot enquiries, and locations.",
          icon: <Phone className="w-5 h-5" />,
        },
      ],
    },
  ];

  return (
    <nav
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-500 ${
        scrolled
          ? "bg-background/70 backdrop-blur-md border-b border-border py-4"
          : "bg-transparent py-6"
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
        {/* Brand Logo */}
        <Link href="/" className="group flex items-center gap-2">
          <motion.div layoutId="brand-logo" id="nav-logo" className="flex items-center gap-2">
            <span className="font-serif text-2xl tracking-[0.25em] font-bold text-accent transition-colors duration-300 group-hover:text-accent-hover">
              HAVILAH
            </span>
          </motion.div>
        </Link>

        {/* Desktop Nav Items */}
        <div className="hidden lg:flex items-center gap-8">
          {navigationData.map((group) => (
            <div
              key={group.label}
              className="relative"
              onMouseEnter={() => setActiveGroup(group.label)}
              onMouseLeave={() => setActiveGroup(null)}
            >
              <button
                className="flex items-center gap-1 text-sm font-medium text-text/80 hover:text-accent tracking-wider uppercase transition-colors py-2"
                onClick={() =>
                  setActiveGroup(activeGroup === group.label ? null : group.label)
                }
              >
                {group.label}
                <ChevronDown
                  className={`w-4 h-4 transition-transform duration-300 ${
                    activeGroup === group.label ? "rotate-180" : ""
                  }`}
                />
              </button>

              {/* Mega Menu Dropdown */}
              <AnimatePresence>
                {activeGroup === group.label && (
                  <motion.div
                    initial={{ opacity: 0, y: 15 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 15 }}
                    transition={{ duration: 0.25, ease: "easeOut" }}
                    className="absolute left-1/2 -translate-x-1/2 mt-4 w-[480px] rounded-lg border border-border bg-surface/95 backdrop-blur-xl p-6 shadow-2xl z-50 grid gap-4 grid-cols-1"
                  >
                    <div className="flex flex-col gap-2">
                      <div className="text-xs font-semibold text-accent tracking-widest uppercase mb-1 border-b border-border/50 pb-2">
                        {group.label} Hub
                      </div>
                      <div className="grid gap-3">
                        {group.items.map((item) => (
                          <Link
                            key={item.name}
                            href={item.href}
                            className="group flex items-start gap-4 p-3 rounded-md hover:bg-accent/5 transition-all duration-300"
                          >
                            <div className="flex-shrink-0 w-10 h-10 rounded-full border border-border flex items-center justify-center text-accent group-hover:border-accent group-hover:bg-accent/10 transition-colors">
                              {item.icon}
                            </div>
                            <div>
                              <h4 className="text-sm font-semibold text-text group-hover:text-accent transition-colors">
                                {item.name}
                              </h4>
                              <p className="text-xs text-text/50 mt-0.5 leading-relaxed">
                                {item.description}
                              </p>
                            </div>
                          </Link>
                        ))}
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ))}
        </div>

        {/* Action Buttons */}
        <div className="hidden lg:flex items-center gap-4">
          <TranslateWidget />
          <ThemeSwitcher />
          <Link
            href="/contact"
            className="px-5 py-2.5 rounded-full text-xs font-semibold tracking-wider uppercase bg-accent text-background hover:bg-accent-hover transition-all duration-300 shadow-lg shadow-accent/10 border border-transparent hover:scale-105 active:scale-95"
          >
            {t("nav.inquire")}
          </Link>
        </div>

        {/* Mobile Toggle & Theme switcher */}
        <div className="flex items-center gap-3 lg:hidden">
          <TranslateWidget />
          <ThemeSwitcher />
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="p-2 text-text/80 hover:text-accent transition-colors"
            aria-label="Toggle menu"
          >
            {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.35, ease: "easeInOut" }}
            className="lg:hidden w-full border-b border-border bg-surface/95 backdrop-blur-xl overflow-hidden"
          >
            <div className="px-6 py-8 flex flex-col gap-6 max-h-[80vh] overflow-y-auto">
              {navigationData.map((group) => (
                <div key={group.label} className="flex flex-col gap-2">
                  <h3 className="text-xs font-bold text-accent tracking-widest uppercase border-b border-border/50 pb-1">
                    {group.label}
                  </h3>
                  <div className="grid grid-cols-2 gap-2 mt-1">
                    {group.items.map((item) => (
                      <Link
                        key={item.name}
                        href={item.href}
                        className={`text-sm py-2 px-3 rounded-md border border-border/20 bg-background/35 text-text/80 hover:text-accent hover:border-accent/40 hover:bg-accent/5 transition-all duration-300`}
                      >
                        {item.name}
                      </Link>
                    ))}
                  </div>
                </div>
              ))}
              <div className="pt-4 border-t border-border flex flex-col gap-3">
                <Link
                  href="/contact"
                  className="w-full text-center px-5 py-3 rounded-md text-xs font-bold tracking-wider uppercase bg-accent text-background hover:bg-accent-hover transition-colors"
                >
                  {t("nav.inquire")}
                </Link>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
