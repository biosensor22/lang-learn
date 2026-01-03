import { useEffect } from "react";
import { LearnedWords } from "./LearnedWords";
import { mutate } from "swr";

export function Learned() {
  useEffect(() => {
    mutate("words-list");
  });
  return (
    <div className="w-140 h-[87%] mt-2 gap-y-4 flex flex-col p-4 overflow-y-scroll">
      <p className="text-white text-2xl">Learned</p>
      <LearnedWords />
    </div>
  );
}
