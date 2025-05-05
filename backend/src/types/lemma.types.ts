import { type WordTranslationModel } from "#models/word.model";

export interface RawLemma {
  original: string;
  lemma: string;
  isStopWord: boolean;
}

export interface ProcessedWord extends RawLemma {
  known: boolean;
  translations?: WordTranslationModel[];
  addedAt?: Date;
}
