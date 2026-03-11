import type { Word } from "./types";
import { useState } from "react";
import { saveEditCard } from "@/app/hooks/Words/saveEditCard";
import { mutateClient } from "@/app/lib/utils/formatters";
import { Check, X } from "lucide-react";

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
    <div className="flex flex-col gap-4">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.24em] text-[color:var(--text-soft)]">
            Edit card
          </p>
          <p className="mt-1 text-lg font-semibold text-[color:var(--text-main)]">
            Update word details
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          <button
            type="button"
            onClick={onClose}
            className="action-pill justify-center px-4 py-2"
          >
            <X size={16} />
            Cancel
          </button>
          <button
            type="button"
            onClick={() => saveData({ name, transcription, ruMean, examples, id })}
            className="action-pill justify-center border-transparent bg-[color:var(--accent)] px-4 py-2 text-[color:var(--text-inverse)] hover:bg-[color:var(--accent-strong)]"
          >
            <Check size={16} />
            Save
          </button>
        </div>
      </div>

      <input
        className="input-edit"
        type="text"
        placeholder="Word"
        onChange={(e) => setName(e.target.value)}
        value={name ?? ""}
      />
      <input
        className="input-edit"
        type="text"
        placeholder="Transcription"
        onChange={(e) => setTranscription(e.target.value)}
        value={transcription ?? ""}
      />
      <input
        className="input-edit"
        type="text"
        placeholder="Translation"
        onChange={(e) => setRuMean(e.target.value)}
        value={ruMean ?? ""}
      />
      <textarea
        className="input-edit min-h-28"
        placeholder="Examples"
        onChange={(e) => setExamples(e.target.value)}
        value={examples ?? ""}
      />
    </div>
  );
}
