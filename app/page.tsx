"use client";

import { mutate } from "swr";
import { MainHeader } from "./components/Header/MainHeader";
import { useSession } from "next-auth/react";
import { CreateUserIfNotExists } from "./hooks/User/createUserIfNot";
import { useEffect, useState } from "react";
import { Loading } from "./components/Auth/Loading";
import { LoginPage } from "./components/Auth/LoginPage";
import { LearnWord } from "./components/ToLearn/LearnWord";

export default function Home() {
  const { data: session, status } = useSession();
  const [blur, setBlur] = useState(true);

  useEffect(() => {
    if (session?.user?.name && session.user.email) {
      CreateUserIfNotExists({
        name: session.user.name,
        email: session.user.email,
      });
    }
  }, [session]);

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
      <MainHeader onSwitch={() => setBlur((prev) => !prev)} />
      <main className="mx-auto flex h-full min-h-0 w-full max-w-6xl flex-1 p-2 px-4 sm:px-2">
        <section className="surface-panel page-panel flex min-h-0 w-full flex-1 flex-col overflow-hidden px-4 py-5 sm:px-6 sm:py-6">
          <div className="mb-5 flex flex-col gap-3 border-b border-[color:var(--border-soft)] pb-4">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.28em] text-[color:var(--text-soft)]">
                To learn
              </p>
              <h1 className="mt-2 text-2xl font-semibold tracking-tight text-[color:var(--text-main)] sm:text-3xl">
                Focus deck
              </h1>
            </div>
            <div className="flex flex-wrap items-center gap-2 text-sm text-[color:var(--text-soft)]">
              <span className="rounded-full bg-[color:var(--accent-soft)] px-3 py-1.5">
                Blur mode: {blur ? "on" : "off"}
              </span>
              <span className="rounded-full bg-[color:var(--warm-soft)] px-3 py-1.5">
                Review words with pronunciation and examples
              </span>
            </div>
          </div>

          <div className="min-h-0 flex-1 overflow-y-auto pr-1 sm:pr-2">
            <LearnWord isBlurred={blur ?? false} />
          </div>
        </section>
      </main>
    </div>
  );
}
