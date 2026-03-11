"use client";

import { ArrowRight, Languages } from "lucide-react";
import { signIn } from "next-auth/react";

export function LoginPage() {
  return (
    <div className="card flex items-center justify-center px-4 py-8 sm:px-6">
      <div className="surface-panel auth-panel">
        <div className="mb-6 inline-flex h-14 w-14 items-center justify-center rounded-[1.25rem] bg-[color:var(--accent-soft)] text-[color:var(--accent)]">
          <Languages size={28} />
        </div>

        <p className="text-xs font-semibold uppercase tracking-[0.28em] text-[color:var(--text-soft)]">
          English practice
        </p>
        <h1 className="mt-3 text-3xl font-semibold tracking-tight text-[color:var(--text-main)] sm:text-4xl">
          Build a calmer, cleaner word routine.
        </h1>
        <p className="mt-4 text-sm leading-7 text-[color:var(--text-soft)] sm:text-base">
          Save new words, review them with a sharper visual hierarchy and keep
          your vocabulary deck synced across devices.
        </p>

        <button
          type="button"
          onClick={() => signIn("google")}
          className="action-pill mt-8 w-full justify-center border-transparent bg-[color:var(--accent)] text-[color:var(--text-inverse)] hover:bg-[color:var(--accent-strong)]"
        >
          Log in with Google
          <ArrowRight size={16} />
        </button>
      </div>
    </div>
  );
}
