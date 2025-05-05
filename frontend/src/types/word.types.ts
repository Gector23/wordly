interface Translation {
  value: string;
  original: string;
  sentence: string;
}

export interface ProcessedWord {
  original: string;
  lemma: string;
  isStopWord: boolean;
  known: boolean;
  translations?: Translation[];
  addedAt?: Date;
}

export interface SelectedWord extends ProcessedWord {
  sentence: string;
}