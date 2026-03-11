import { moveWordToLearned } from "@/app/hooks/Words/checkLearned";
import type { ListTypes } from "@/app/hooks/Words/wordsList";
import { mutate } from "swr";
import { deleteWord } from "@/app/hooks/Words/deleteWord";
import { addToLearnWord } from "../../hooks/Words/addToLearnWord";

export function playAudio(url: string) {
  if (!url) return;
  const audio = new Audio(url);
  audio.play().catch(() => console.error("Couldn't play audio"));
}

export async function LearnedWord(word: string) {
  const result = await moveWordToLearned(word);

  if (result.success) {
    mutateClient();
  }
}

export async function DeleteWord(word: string) {
  const result = await deleteWord(word);

  if (result.success) {
    mutateClient();
  }
}

export async function ToLearnWord(word: string) {
  const result = await addToLearnWord(word);

  if (result.success) {
    mutateClient();
  }
}

export function mutateClient() {
  ["to-learn", "learned", "vocabulary"].forEach((type) =>
    mutate(["words-list", type as ListTypes]),
  );
}

export function toggleSetItem<T>(prev: Set<T>, value: T): Set<T> {
  const newSet = new Set(prev);
  if (newSet.has(value)) {
    newSet.delete(value);
  } else {
    newSet.add(value);
  }
  return newSet;
}
