import type { Word } from "./types";
import { useState } from "react";
import Image from "next/image";
import { saveEditCard } from "@/app/hooks/Words/saveEditCard";
import { mutateClient } from "@/app/lib/utils/formatters";

export type Words = {
  id: number;
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
  const id = word.id;

  async function saveData({
    name,
    transcription,
    ruMean,
    examples,
    id,
  }: Words) {
    if (!name || !ruMean || !id) return false;
    const data = { name, transcription, ruMean, examples, id };

    const result = await saveEditCard(data);
    if (result.success) {
      mutateClient();
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
      <span className="absolute top-1 right-10 mt-px cursor-pointer hover:scale-115 duration-150">
        <Image
          onClick={() =>
            saveData({ name, transcription, ruMean, examples, id })
          }
          width={20}
          height={20}
          src="check.svg"
          alt="approve"
        />
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
