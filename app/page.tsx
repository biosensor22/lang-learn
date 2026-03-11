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
        <section className="surface-panel page-panel flex min-h-0 w-full flex-1 flex-col overflow-hidden px-4 py-3 sm:px-6 sm:py-4">
          <div className="min-h-0 flex-1 overflow-y-auto pr-1 sm:pr-2">
            <LearnWord isBlurred={blur ?? false} />
          </div>
        </section>
      </main>
    </div>
  );
}
