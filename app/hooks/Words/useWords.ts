import type { ListTypes } from "@/app/hooks/Words/wordsList";
import { getListOfWords } from "@/app/hooks/Words/wordsList";
import useSWR from "swr";

export function useWords(type: ListTypes) {
  const { data, isLoading, error, mutate } = useSWR(
    ["words-list", type],
    ([, t]) => getListOfWords(t),
    {
      refreshInterval: 30000,
      revalidateOnFocus: true,
      dedupingInterval: 2000,
    }
  );

  const words = data?.wordsLearn || [];

  return { words, isLoading, error, mutate };
}
