import { useEffect } from "react";
import { VocabWords } from "./VocabWords";
import { mutate } from "swr";

export function Vocab() {
  useEffect(() => {
    mutate("words-list");
  });
  return (
    <div className="w-140 h-[87%] mt-2 gap-y-4 flex flex-col p-4 overflow-y-scroll">
      <p className="text-white text-2xl">Vocabulary</p>
      <VocabWords />
    </div>
  );
}
