export interface MatchedLemma {
  original: string;
  value: string;
  known: boolean;
  translations?: string[];
  addedAt?: Date;
}