"use client";

import { useEffect } from "react";
import { mutate } from "swr";
import { MainHeader } from "../components/Header/MainHeader";
import { useSession } from "next-auth/react";
import { LoginPage } from "../components/Auth/LoginPage";
import { Loading } from "../components/Auth/Loading";
import { LearnedWords } from "../components/Learned/LearnedWords";

export default function Home() {
  const { data: session, status } = useSession();

  useEffect(() => {
    mutate("words-list");
  });

  if (status === "loading") {
    return <Loading />;
  }

  if (!session?.user) {
    return <LoginPage />;
  }

  return (
    <div className="card">
      <MainHeader />
      <main className="mx-auto flex h-full min-h-0 w-full max-w-6xl flex-1 p-2 px-4 sm:px-2">
        <section className="surface-panel page-panel flex min-h-0 w-full flex-1 flex-col overflow-hidden px-4 py-5 sm:px-6 sm:py-6">
          <div className="mb-5 border-b border-[color:var(--border-soft)] pb-4">
            <p className="text-xs font-semibold uppercase tracking-[0.28em] text-[color:var(--text-soft)]">
              Learned
            </p>
            <h1 className="mt-2 text-2xl font-semibold tracking-tight text-[color:var(--text-main)] sm:text-3xl">
              Completed cards
            </h1>
            <p className="mt-2 text-sm leading-6 text-[color:var(--text-soft)]">
              Review words you already know without losing their examples and
              pronunciation notes.
            </p>
          </div>

          <div className="min-h-0 flex-1 overflow-y-auto pr-1 sm:pr-2">
            <LearnedWords />
          </div>
        </section>
      </main>
    </div>
  );
}
