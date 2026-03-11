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
    <div className="card w-full h-full flex flex-col px-10">
      <MainHeader />
      <div className="w-140 h-[87%] mt-2 gap-y-4 flex flex-col p-4 overflow-y-scroll overflow-x-hidden">
        <p className="text-white text-2xl">Learned</p>
        <LearnedWords />
      </div>
    </div>
  );
}
