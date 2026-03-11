import { BUTTONS } from "@/app/lib/constants/headerBtn";
import { AddWordComp } from "./AddWordComp";
import { useRouter } from "next/navigation";
import { SignOutBtn } from "../Buttons/signOutBtn";
import { ThemeSwitcher } from "../Buttons/ThemeSwitcher";
import { useState } from "react";
interface MainHeaderProps {
  onSwitch?: () => void;
}

export function MainHeader({ onSwitch }: MainHeaderProps) {
  const router = useRouter();
  const [isAddWordOpen, setAddWordOpen] = useState(false);
  function handleAction(action: string) {
    switch (action) {
      case "learn":
        router.push("/");
        break;
      case "vocabulary":
        router.push("/vocabulary");
        break;
      case "learned":
        router.push("/learned");
        break;
      case "add-word":
        setAddWordOpen(true);
        break;
      case "blur-word":
        onSwitch?.();
        break;
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
