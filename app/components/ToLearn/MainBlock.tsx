import { useEffect } from "react";
import { LearnWord } from "./LearnWord";
import { mutate } from "swr";

type MainBlockProps = {
  search: string;
  onBlur?: boolean;
};

export function MainBlock({ onBlur, search }: MainBlockProps) {
  useEffect(() => {
    mutate("words-list");
  });
  return (
    <div className="w-140 h-[87%] mt-2 gap-y-4 flex flex-col p-4 overflow-y-scroll">
      <LearnWord search={search} isBlurred={onBlur ?? false} />
    </div>
  );
}
