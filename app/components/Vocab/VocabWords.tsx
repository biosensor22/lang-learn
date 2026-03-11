"use client";

import { useState } from "react";
import { WordEdit } from "../ToLearn/WordEdit";
import { DeleteBtn } from "../Buttons/deleteBtn";
import { EditBtn } from "../Buttons/editBtn";
import { LearnedBtn } from "../Buttons/learnedBtn";
import { PlaySound } from "../Buttons/playSound";
import {
  DeleteWord,
  LearnedWord,
  playAudio,
  toggleSetItem,
  ToLearnWord,
} from "@/app/lib/utils/formatters";
import { useWords } from "@/app/hooks/Words/useWords";
import { Examples } from "../Text/Examples";
import { ToLearnBtn } from "../Buttons/toLearnBtn";
import type { Word } from "../ToLearn/types";

export function VocabWords() {
  const [forEdit, setForEdit] = useState<number>(0);
  const [expandedIds, setExpandedIds] = useState<Set<number>>(new Set());
  const { words, isLoading } = useWords("vocabulary");

  if (isLoading && !words.length) {
    return <div className="list-empty">Loading your vocabulary...</div>;
  }

  if (!isLoading && words.length === 0) {
    return (
      <div className="list-empty">
        Vocabulary is empty for now. Add words or move them here from your
        active deck.
      </div>
    );
  }

  const toggleExpand = (id: number) => {
    setExpandedIds((prev) => toggleSetItem(prev, id));
  };

  return (
    <div className="flex w-full flex-col gap-2.5 sm:gap-3">
      {words.map((w: Word) => {
        const isExpanded = expandedIds.has(w.id);

        return (
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

                    <p className="word-translation mt-3">{w.ruMean}</p>
                  </div>

                  <div className="word-actions sm:justify-end">
                    <ToLearnBtn toLearn={() => ToLearnWord(w.name)} />
                    <EditBtn onEdit={() => setForEdit(w.id)} />
                    <DeleteBtn onDelete={() => DeleteWord(w.name)} />
                    <LearnedBtn onLearned={() => LearnedWord(w.name)} />
                  </div>
                </div>

                {w.examples && (
                  <div className="flex flex-col gap-2.5">
                    <button
                      type="button"
                      className="w-fit rounded-full bg-[color:var(--accent-soft)] px-2.5 py-1 text-xs font-medium text-[color:var(--text-main)] transition hover:opacity-85"
                      onClick={() => toggleExpand(w.id)}
                    >
                      {isExpanded ? "Hide examples" : "Show examples"}
                    </button>

                    {isExpanded && (
                      <div className="word-examples">
                        <p className="mb-2 text-[11px] font-semibold uppercase tracking-[0.22em] text-[color:var(--text-soft)]">
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
