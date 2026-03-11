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
        <section className="surface-panel page-panel flex min-h-0 w-full flex-1 flex-col overflow-hidden px-4 py-3 sm:px-6 sm:py-4">
          <div className=" pb-2.5">
            <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-(--text-soft)">
              Learned
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
