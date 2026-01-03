import { signOut } from "next-auth/react";
import { BUTTONS } from "@/app/constants/headerBtn";
import { useState } from "react";
import { AddWordComp } from "./AddWordComp";
import { useRouter } from "next/navigation";
import { Search } from "./Search";

interface MainHeaderProps {
  onSwitch?: () => void;
  setSearch: (value: string) => void;
  search: string;
}

export function MainHeader({ onSwitch, setSearch, search }: MainHeaderProps) {
  const router = useRouter();
  const [isAddWordOpen, setAddWordOpen] = useState(false);
  function handleAction(action: string) {
    if (action === "learn") {
      router.push("/");
    }
    if (action === "vocabulary") {
      router.push("/vocabulary");
    }
    if (action === "learned") {
      router.push("/learned");
    }
    if (action === "add-word") {
      setAddWordOpen(true);
    }
    if (action === "blur-word") {
      onSwitch?.();
    }
  }

  return (
    <div className="w-full z-10">
      <div className="h-16 flex mt-4">
        <div className="flex w-full justify-between items-center text-center gap-10 text-lg text-white">
          <div className="flex text-center gap-10">
            {BUTTONS.map((btn) => (
              <button
                key={btn.name}
                onClick={() => handleAction(btn.action)}
                className="btn-header z-2"
              >
                {btn.name}
              </button>
            ))}
            <Search search={search} setSearch={setSearch} />
          </div>

          <div className="flex">
            <button
              onClick={() => signOut()}
              className="text-white flex px-8 py-2 rounded-2xl shadow-lg shadow-black/20
              cursor-pointer hover:bg-blue-700 bg-blue-600 duration-150"
            >
              Log out
            </button>
          </div>
        </div>
      </div>
      <div className="w-full h-0.5 rounded-full bg-white/10"></div>
      {isAddWordOpen && <AddWordComp onClose={() => setAddWordOpen(false)} />}
    </div>
  );
}
