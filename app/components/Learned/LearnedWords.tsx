"use client";

import { useState } from "react";
import { useWords } from "@/app/hooks/Words/useWords";
import {
  DeleteWord,
  playAudio,
  toggleSetItem,
  ToLearnWord,
} from "@/app/lib/utils/formatters";
import { DeleteBtn } from "../Buttons/deleteBtn";
import { EditBtn } from "../Buttons/editBtn";
import { PlaySound } from "../Buttons/playSound";
import { WordEdit } from "../ToLearn/WordEdit";
import { Examples } from "../Text/Examples";
import { ToLearnBtn } from "../Buttons/toLearnBtn";
import type { Word } from "../ToLearn/types";

export function LearnedWords() {
  const [forEdit, setForEdit] = useState<number>(0);
  const [expandedIds, setExpandedIds] = useState<Set<number>>(new Set());
  const { words, isLoading } = useWords("learned");

  if (isLoading && !words.length) {
    return <div className="list-empty">Loading learned words...</div>;
  }

  if (!isLoading && words.length === 0) {
    return (
      <div className="list-empty">
        Nothing here yet. Cards moved to learned will appear in this archive.
      </div>
    );
  }

  const toggleExpand = (id: number) => {
    setExpandedIds((prev) => toggleSetItem(prev, id));
  };

  return (
    <div className="flex flex-col gap-3 sm:gap-4">
      {words.map((w: Word) => {
        const isExpanded = expandedIds.has(w.id);

        return (
          <div key={w.id} className="word-card">
            {forEdit !== w.id ? (
              <div className="flex flex-col gap-4">
                <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
                  <div className="min-w-0 flex-1">
                    <div className="flex flex-wrap items-center gap-3">
                      {w.audio && (
                        <PlaySound onAudio={() => playAudio(w.audio)} />
                      )}
                      <p className="word-name">{w.name}</p>
                      {w.transcription && (
                        <p className="word-transcription">{w.transcription}</p>
                      )}
                    </div>

                    <p className="word-translation mt-4">{w.ruMean}</p>
                  </div>

                  <div className="word-actions sm:justify-end">
                    <ToLearnBtn toLearn={() => ToLearnWord(w.name)} />
                    <EditBtn onEdit={() => setForEdit(w.id)} />
                    <DeleteBtn onDelete={() => DeleteWord(w.name)} />
                  </div>
                </div>

                {w.examples && (
                  <div className="flex flex-col gap-3">
                    <button
                      type="button"
                      className="w-fit rounded-full bg-[color:var(--accent-soft)] px-3 py-1.5 text-sm font-medium text-[color:var(--text-main)] transition hover:opacity-85"
                      onClick={() => toggleExpand(w.id)}
                    >
                      {isExpanded ? "Hide examples" : "Show examples"}
                    </button>

                    {isExpanded && (
                      <div className="word-examples">
                        <p className="mb-3 text-xs font-semibold uppercase tracking-[0.24em] text-[color:var(--text-soft)]">
                          Examples
                        </p>
                        <Examples examples={w.examples} />
                      </div>
                    )}
                  </div>
                )}
              </div>
            ) : (
              <WordEdit word={w} onClose={() => setForEdit(0)} />
            )}
          </div>
        );
      })}
    </div>
  );
}
