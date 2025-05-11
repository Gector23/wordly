import { type RawLemma } from "./lemma.types";

export interface WordTranslation {
  value: string;
  original: string;
  sentence: string;
}

export interface Word {
  lemma: string;
  translations: WordTranslation[];
  addedAt: Date;
}

export interface ProcessedWord extends RawLemma {
  known: boolean;
  translations?: WordTranslation[];
  addedAt?: Date;
}
