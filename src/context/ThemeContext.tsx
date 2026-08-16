"use client";

import React, { createContext, useContext, useEffect, useState } from "react";

type Theme = "noir" | "ivory";

interface ThemeContextType {
  theme: Theme;
  toggleTheme: () => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [theme, setTheme] = useState<Theme>("noir");

  // Load theme from localStorage or default to noir on mount
  useEffect(() => {
    const savedTheme = localStorage.getItem("havilah-theme") as Theme;
    if (savedTheme === "noir" || savedTheme === "ivory") {
      setTheme(savedTheme);
      document.documentElement.setAttribute("data-theme", savedTheme);
    } else {
      document.documentElement.setAttribute("data-theme", "noir");
    }
  }, []);

  const toggleTheme = () => {
    const newTheme = theme === "noir" ? "ivory" : "noir";
    setTheme(newTheme);
    localStorage.setItem("havilah-theme", newTheme);
    document.documentElement.setAttribute("data-theme", newTheme);
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error("useTheme must be used within a ThemeProvider");
  }
  return context;
}
