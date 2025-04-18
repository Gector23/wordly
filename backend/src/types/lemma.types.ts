export interface RawLemma {
  original: string;
  value: string;
}

export interface MatchedLemma extends RawLemma {
  known: boolean;
  translations?: string[];
  addedAt?: Date;
}
