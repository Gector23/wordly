import { type ProcessedWord, type RawLemma, type Word } from "@wordly/shared";
import nlp from "compromise";
import { eng as stopList } from "stopword";

import { wrapError } from "#utils/errors";

export const getRawLemmasFromText = (text: string): RawLemma[] => {
  try {
    const doc = nlp(text);
    const terms = doc.termList();

    return terms.map(term => {
      const lemma =
        nlp(term.normal).verbs().toInfinitive().out("text") ||
        nlp(term.normal).nouns().toSingular().out("text") ||
        term.normal;

      return {
        original: term.text,
        lemma,
        isStopWord: stopList.includes(term.normal),
      };
    });
  } catch (err) {
    throw wrapError("Failed to extract lemmas from text.", err);
  }
};

export const matchLemmas = (rawLemmas: RawLemma[], knownWords: Word[]): ProcessedWord[] => {
  try {
    const knownWordsMap = new Map(knownWords.map(word => [word.lemma, word]));

    return rawLemmas.map(rawLemma => {
      const known = knownWordsMap.get(rawLemma.lemma);
      return {
        ...rawLemma,
        known: !!known,
        translations: known?.translations,
        addedAt: known?.addedAt,
      };
    });
  } catch (err) {
    throw wrapError("Failed to match lemmas.", err);
  }
};
