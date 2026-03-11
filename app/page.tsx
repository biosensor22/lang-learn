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
    <div className="card w-full h-full flex flex-col px-10">
      <MainHeader onSwitch={() => setBlur((prev) => !prev)} />
      <div className="w-full sm:w-140 h-[87%] mt-0 sm:mt-2 gap-y-4 flex flex-col p-4 overflow-y-scroll">
        <LearnWord isBlurred={blur ?? false} />
      </div>
    </div>
  );
}
