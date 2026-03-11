"use client";

import { LogOut } from "lucide-react";
import { signOut } from "next-auth/react";

export function SignOutBtn() {
  return (
    <button
      type="button"
      onClick={() => signOut()}
      className="action-pill w-full justify-center md:w-auto"
    >
      <LogOut size={16} />
      Log out
    </button>
  );
}
