"use client";

import { MainHeader } from "./components/Header/MainHeader";
import { MainBlock } from "./components/ToLearn/MainBlock";
import { useSession, signIn } from "next-auth/react";
import { CreateUserIfNotExists } from "./hooks/User/createUserIfNot";
import { useEffect, useState } from "react";

export default function Home() {
  const { data: session, status } = useSession();
  const [blur, setBlur] = useState(true);
  const [search, setSearch] = useState("");

  useEffect(() => {
    if (session?.user?.name && session.user.email) {
      CreateUserIfNotExists({
        name: session.user.name,
        email: session.user.email,
      });
    }
  }, [session]);

  if (status === "loading") {
    return (
      <div className="card text-white text-2xl justify-center items-center flex w-full h-full">
        Loading...
        <div className="glow g1"></div>
        <div className="glow g2"></div>
      </div>
    );
  }

  if (!session?.user) {
    return (
      <div className="card w-full flex flex-col px-10">
        <div className="items-center justify-center flex h-dvh">
          <button
            onClick={() => {
              signIn("google");
            }}
            className="text-white flex p-4 rounded-2xl shadow-lg shadow-black/20
              cursor-pointer hover:bg-blue-700 bg-blue-600 duration-150"
          >
            Log in with Google
          </button>
        </div>

        <div className="glow g1"></div>
        <div className="glow g2"></div>
      </div>
    );
  }

  return (
    <div className="card w-full h-full flex flex-col">
      <div className="glow g1"></div>
      <div className="glow g2"></div>

      <MainHeader
        search={search}
        setSearch={setSearch}
        onSwitch={() => setBlur((prev) => !prev)}
      />
      <MainBlock search={search} onBlur={blur} />
    </div>
  );
}
