"use client";

import { MoonStar, SunMedium } from "lucide-react";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";

export function ThemeSwitcher() {
  const { resolvedTheme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const id = requestAnimationFrame(() => setMounted(true));
    return () => cancelAnimationFrame(id);
  }, []);

  const isDark = mounted && resolvedTheme === "dark";

  return (
    <button
      type="button"
      onClick={() => setTheme(isDark ? "light" : "dark")}
      className="theme-toggle"
      aria-label={`Switch to ${isDark ? "light" : "dark"} theme`}
    >
      <span className={`theme-toggle__thumb ${isDark ? "is-dark" : ""}`} />
      <span className="theme-toggle__content">
        <SunMedium size={16} />
        <span className="hidden sm:inline">Light</span>
      </span>
      <span className="theme-toggle__content">
        <MoonStar size={16} />
        <span className="hidden sm:inline">Dark</span>
      </span>
    </button>
  );
}
