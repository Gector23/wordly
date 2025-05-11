import { type ProcessedWord } from "@wordly/shared";

export interface SelectedWord extends ProcessedWord {
  sentence: string;
}
