import nlp from "compromise";
import { eng as stopList } from "stopword";

import { type WordModel } from "#models/word.model";
import { type ProcessedWord, type RawLemma } from "#types/lemma.types";

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
  } catch (error) {
    console.error(error);
    throw new Error("Failed to extract lemmas from text.");
  }
};

export const matchLemmas = (rawLemmas: RawLemma[], knownWords: WordModel[]): ProcessedWord[] => {
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
  } catch (error) {
    console.error(error);
    throw new Error("Failed to match lemmas.");
  }
};
