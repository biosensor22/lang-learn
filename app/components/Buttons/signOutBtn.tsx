"use client";
import { useTheme } from "next-themes";
import { useState, useEffect } from "react";
import { signOut } from "next-auth/react";

export function SignOutBtn() {
  const { resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const id = requestAnimationFrame(() => setMounted(true));
    return () => cancelAnimationFrame(id);
  }, []);

  if (!mounted) return null;

  const btnClasses =
    resolvedTheme === "dark"
      ? "bg-white text-black hover:bg-gray-200"
      : "bg-blue-600 text-white hover:bg-blue-700";

  return (
    <div className="flex">
      <button
        onClick={() => signOut()}
        className={`flex w-34 px-8 py-2 rounded-2xl shadow-lg shadow-black/20 cursor-pointer duration-150 ${btnClasses}`}
      >
        Log out
      </button>
    </div>
  );
}
