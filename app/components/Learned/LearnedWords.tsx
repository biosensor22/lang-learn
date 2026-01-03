"use client";

import { useState } from "react";
import { useWords } from "@/app/hooks/Words/useWords";
import {
  DeleteWord,
  playAudio,
  toggleSetItem,
  ToLearnWord,
} from "@/app/utils/formatters";
import { DeleteBtn } from "../Buttons/deleteBtn";
import { EditBtn } from "../Buttons/editBtn";
import { PlaySound } from "../Buttons/playSound";
import { WordEdit } from "../ToLearn/WordEdit";
import { Examples } from "../Text/Examples";
import { ToLearnBtn } from "../Buttons/toLearnBtn";

export function LearnedWords() {
  const [forEdit, setForEdit] = useState<number>(0);
  const [expandedIds, setExpandedIds] = useState<Set<number>>(new Set());

  const { words, isLoading } = useWords("learned");
  if (isLoading && !words)
    return <div className="text-white opacity-50">Loading...</div>;

  const toggleExpand = (id: number) => {
    setExpandedIds((prev) => toggleSetItem(prev, id));
  };

  return (
    <div className="flex flex-col gap-4">
      {words.map((w: any) => {
        const isExpanded = expandedIds.has(w.id);

        return (
          <div
            key={w.id}
            className="bg-black/40 rounded-2xl px-4 py-2 relative"
          >
            {forEdit !== w.id && (
              <div>
                <div className="flex gap-2 items-center">
                  <div className="absolute right-4 flex gap-1.5">
                    <ToLearnBtn toLearn={() => ToLearnWord(w.name)} />
                    <EditBtn onEdit={() => setForEdit(w.id)} />
                    <DeleteBtn onDelete={() => DeleteWord(w.name)} />
                  </div>
                  {w.audio && <PlaySound onAudio={() => playAudio(w.audio)} />}

                  <p className="text-red-500 text-lg">{w.name}</p>
                  <p className="text-green-400 mt-1 ml-2 text-sm">
                    {w.transcription}
                  </p>
                </div>
                <p className="text-white mt-1">{w.ruMean}</p>
              </div>
            )}

            {isExpanded && w.examples && (
              <div className="grid grid-cols-1 gap-1 text-amber-300 mt-2">
                <Examples examples={w.examples} />
              </div>
            )}

            {forEdit === w.id && (
              <div className="h-full w-full rounded-2xl">
                <WordEdit word={w} onClose={() => setForEdit(0)} />
              </div>
            )}

            {w.examples && (
              <button
                className="mt-2 text-sm text-gray-500 absolute cursor-pointer right-26 top-1"
                onClick={() => toggleExpand(w.id)}
              >
                {isExpanded ? "Collapse" : "Extend"}
              </button>
            )}
          </div>
        );
      })}
    </div>
  );
}
