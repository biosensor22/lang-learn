export interface LinguaResponse {
  entries: Array<{
    pronunciations?: Array<{
      audio?: { url: string };
      context?: { regions: string[] };
      transcriptions?: Array<{ transcription: string }>;
    }>;
  }>;
}

export interface ExternalData {
  audio: string;
  transcription: string;
  examples: string;
  ruMean: string;
}
