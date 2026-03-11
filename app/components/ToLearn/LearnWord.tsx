"use client";

import { useState } from "react";
import { WordEdit } from "./WordEdit";
import { DeleteBtn } from "../Buttons/deleteBtn";
import { EditBtn } from "../Buttons/editBtn";
import { LearnedBtn } from "../Buttons/learnedBtn";
import { PlaySound } from "../Buttons/playSound";
import { DeleteWord, LearnedWord, playAudio } from "@/app/lib/utils/formatters";
import { useWords } from "@/app/hooks/Words/useWords";
import { Examples } from "../Text/Examples";
import type { Word } from "./types";

type Props = {
  isBlurred: boolean;
};

export function LearnWord({ isBlurred }: Props) {
  const [forEdit, setForEdit] = useState<number>(0);
  const { words, isLoading } = useWords("to-learn");

  if (isLoading && !words)
    return <div className="text-white opacity-50">Loading...</div>;

  return (
    <div className="flex flex-col gap-4">
      {words.map((w: Word) => (
        <div key={w.id} className="bg-black/40 rounded-2xl px-4 py-2 relative">
          {forEdit !== w.id && (
            <div>
              <div className="absolute right-4 flex gap-1.5">
                <EditBtn onEdit={() => setForEdit(w.id)} />
                <DeleteBtn onDelete={() => DeleteWord(w.name)} />
                <LearnedBtn onLearned={() => LearnedWord(w.name)} />
              </div>
              <div className="flex gap-2">
                {w.audio && <PlaySound onAudio={() => playAudio(w.audio)} />}

                <p className="text-red-500 text-lg">{w.name}</p>
                <p className="text-green-400 mt-1 ml-2 text-sm">
                  {w.transcription}
                </p>
              </div>
              <p
                className={`text-white transition-all
               ${isBlurred ? "blur-xs" : ""}`}
              >
                {w.ruMean}
              </p>
              <div className="grid grid-cols-1 gap-1 text-amber-300 mt-2">
                {w.examples && <Examples examples={w.examples} />}
              </div>
            </div>
          )}

          {forEdit === w.id && (
            <div className="h-full w-full rounded-2xl">
              <WordEdit word={w} onClose={() => setForEdit(0)} />
            </div>
          )}
        </div>
      ))}
    </div>
  );
}
