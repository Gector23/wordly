import { type ProcessedWord } from "#types/word.types";

export interface AnalyzeTextRequest {
  text: string;
}

export interface AnalyzeTextResponse {
  processedWords: ProcessedWord[];
}
