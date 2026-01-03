import { v4 as uuidv4 } from "uuid";
import { ExternalData, LinguaResponse } from "@/app/api/words/types";

export class DictionaryService {
  private static AZURE_URL =
    "https://api.cognitive.microsofttranslator.com/dictionary/lookup?api-version=3.0&from=en&to=ru";

  static async getFullWordInfo(word: string): Promise<ExternalData> {
    const [dict, examples, translation] = await Promise.all([
      this.fetchLinguaData(word),
      this.fetchTatoebaExamples(word),
      this.fetchAzureTranslation(word),
    ]);

    return {
      audio: dict.audio || "",
      transcription: dict.transcription || "",
      examples,
      ruMean: translation,
    };
  }

  private static async fetchLinguaData(word: string) {
    try {
      const res = await fetch(
        `https://lingua-robot.p.rapidapi.com/language/v1/entries/en/${word}`,
        {
          headers: {
            "x-rapidapi-key": process.env.LINGUA_API_KEY!,
            "x-rapidapi-host": "lingua-robot.p.rapidapi.com",
          },
        }
      );
      if (!res.ok) return {};
      const data: LinguaResponse = await res.json();
      const entry = data.entries?.[0];
      const pronunciation =
        entry?.pronunciations?.find(
          (p) => p.audio?.url && p.context?.regions?.includes("United Kingdom")
        ) || entry?.pronunciations?.find((p) => p.audio?.url);

      return {
        audio: pronunciation?.audio?.url,
        transcription: pronunciation?.transcriptions?.[0]?.transcription,
      };
    } catch (e) {
      console.error("Lingua Error:", e);
      return {};
    }
  }

  private static async fetchTatoebaExamples(word: string): Promise<string> {
    try {
      const res = await fetch(
        `https://tatoeba.org/en/api_v0/search?query=${word}&from=eng&limit=50`
      );
      const data = await res.json();
      const wordEscaped = word.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
      const regex = new RegExp(`\\b${wordEscaped}\\b`, "i");

      return (data.results || [])
        .map((r: any) => r.text)
        .filter((text: string) => {
          const hasWord = regex.test(text);
          const wordCount = text.trim().split(/\s+/).length;

          return hasWord && wordCount >= 3;
        })
        .slice(0, 2)
        .join("\n");
    } catch {
      return "";
    }
  }

  private static async fetchAzureTranslation(word: string): Promise<string> {
    try {
      const res = await fetch(this.AZURE_URL, {
        method: "POST",
        headers: {
          "Ocp-Apim-Subscription-Key": process.env.AZURE_API!,
          "Ocp-Apim-Subscription-Region": process.env.LOCATION!,
          "Content-Type": "application/json",
          "X-ClientTraceId": uuidv4(),
        },
        body: JSON.stringify([{ Text: word }]),
      });
      const data = await res.json();
      const translations = data[0]?.translations || [];
      return Array.from(
        new Set(translations.map((t: any) => t.displayTarget.toLowerCase()))
      )
        .filter((text: any) => /^[а-яё\s-]+$/i.test(text))
        .slice(0, 10)
        .join(", ");
    } catch {
      return "";
    }
  }
}
