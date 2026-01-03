import type { Word } from "./types";
import { useState } from "react";
import Image from "next/image";
import { mutate } from "swr";
import { ListTypes } from "@/app/hooks/Words/wordsList";
import { saveEditCard } from "@/app/hooks/Words/saveEditCard";

export type Words = {
  name: string | undefined;
  transcription: string | undefined;
  ruMean: string | undefined;
  examples: string | undefined;
};

export function WordEdit({
  word,
  onClose,
}: {
  word: Word;
  onClose: () => void;
}) {
  const [name, setName] = useState(word.name);
  const [transcription, setTranscription] = useState(word.transcription);
  const [ruMean, setRuMean] = useState(word.ruMean);
  const [examples, setExamples] = useState(word.examples);

  async function saveData({ name, transcription, ruMean, examples }: Words) {
    if (!name || !transcription || !ruMean || !examples) return false;
    const data = { name, transcription, ruMean, examples };

    const result = await saveEditCard(data);
    if (result.success) {
      ["to-learn", "learned", "vocabulary"].forEach((type) =>
        mutate(["words-list", type as ListTypes])
      );
      onClose();
    }
  }

  return (
    <div className="flex flex-col mt-4">
      <span
        onClick={onClose}
        className="absolute text-white top-1 right-4 cursor-pointer hover:scale-115 duration-150"
      >
        ✕
      </span>
      <span
        onClick={() => saveData({ name, transcription, ruMean, examples })}
        className="absolute top-1 right-10 mt-px cursor-pointer hover:scale-115 duration-150"
      >
        <Image width={20} height={20} src="check.svg" alt="approve" />
      </span>
      <input
        className="input-edit text-red-500 "
        type="text"
        placeholder="name"
        onChange={(e) => setName(e.target.value)}
        value={name ?? ""}
      />
      <input
        className="input-edit text-green-400 "
        type="text"
        placeholder="transcription"
        onChange={(e) => setTranscription(e.target.value)}
        value={transcription ?? ""}
      />
      <input
        className="input-edit text-white "
        type="text"
        placeholder="translations"
        onChange={(e) => setRuMean(e.target.value)}
        value={ruMean ?? ""}
      />
      <input
        className="input-edit text-yellow-400 "
        type="text"
        placeholder="examples"
        onChange={(e) => setExamples(e.target.value)}
        value={examples ?? ""}
      />
    </div>
  );
}
