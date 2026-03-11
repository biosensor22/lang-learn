import { BUTTONS } from "@/app/constants/headerBtn";
import { AddWordComp } from "./AddWordComp";
import { useRouter } from "next/navigation";
import { Search } from "./Search";
import { SignOutBtn } from "../Buttons/signOutBtn";
import { ThemeSwitcher } from "../Buttons/ThemeSwitcher";
import { useState } from "react";
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
    <div className="z-10 px-6 sm:px-10">
      <div className="h-10 sm:h-16 flex mt-4">
        <div className="flex w-full justify-between items-center text-center gap-10 text-lg text-white">
          <div className="md:flex text-center hidden md:gap-2 lg:gap-6 xl:gap-10 w-full text-black header">
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
            <ThemeSwitcher />
          </div>
          <SignOutBtn />
        </div>
      </div>
      <div className="w-full h-0.5 mt-4 sm:mt-0 rounded-full bg-white/10"></div>
      {isAddWordOpen && <AddWordComp onClose={() => setAddWordOpen(false)} />}
    </div>
  );
}
