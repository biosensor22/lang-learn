"use client";

import { useTheme } from "next-themes";
import { Moon, Sun } from "lucide-react";

export function ThemeSwitcher() {
  const { theme, setTheme } = useTheme();

  return (
    <div className="flex text-sm">
      <Moon className="h-[1.2rem] w-[1.2rem] " />

      <button
        onClick={() => setTheme(theme === "light" ? "dark" : "light")}
        className="w-10 h-5 bg-amber-50 rounded-2xl mx-2 p-0.5 flex cursor-pointer"
      >
        <div
          className={`
      w-4 h-4 rounded-2xl
      bg-amber-400 dark:bg-amber-950
      transition-transform
      ${theme === "dark" ? "translate-x-0" : "translate-x-5"}
    `}
        />
      </button>

      <Sun className="h-[1.2rem] w-[1.2rem]" />
    </div>
  );
}
