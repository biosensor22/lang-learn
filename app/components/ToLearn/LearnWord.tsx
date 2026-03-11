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

  if (isLoading && !words.length) {
    return <div className="list-empty">Loading your cards...</div>;
  }

  if (!isLoading && words.length === 0) {
    return (
      <div className="list-empty">
        Your learning deck is empty. Add a new word from the header to start
        building it.
      </div>
    );
  }

  return (
    <div className="flex w-full flex-col gap-2.5 sm:gap-3">
      {words.map((w: Word) => (
        <div key={w.id} className="word-card">
          {forEdit !== w.id ? (
            <div className="flex flex-col gap-3">
              <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
                <div className="min-w-0 flex-1">
                  <div className="flex flex-wrap items-center gap-2.5">
                    {w.audio && (
                      <PlaySound onAudio={() => playAudio(w.audio)} />
                    )}
                    <p className="word-name">{w.name}</p>
                    {w.transcription && (
                      <p className="word-transcription">{w.transcription}</p>
                    )}
                  </div>

                  <p
                    className={`word-translation mt-1 ${
                      isBlurred ? "blur-sm select-none" : ""
                    }`}
                  >
                    {w.ruMean}
                  </p>
                </div>

                <div className="word-actions sm:justify-end">
                  <EditBtn onEdit={() => setForEdit(w.id)} />
                  <DeleteBtn onDelete={() => DeleteWord(w.name)} />
                  <LearnedBtn onLearned={() => LearnedWord(w.name)} />
                </div>
              </div>

              {w.examples && (
                <div className="word-examples">
                  <Examples examples={w.examples} />
                </div>
              )}
            </div>
          ) : (
            <WordEdit word={w} onClose={() => setForEdit(0)} />
          )}
        </div>
      ))}
    </div>
  );
}
