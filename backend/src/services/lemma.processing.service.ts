import nlp from "compromise";
import { eng as stopList } from "stopword";

import { MatchedLemma, RawLemma } from "../types/lemma.types";
import { ILemmaModel } from "../models/lemma.model";

export const getRawLemmasFromText = (text: string): RawLemma[] => {
  try {
    const doc = nlp(text);
    const terms = doc.termList();

    return terms
      .filter(term => !stopList.includes(term.normal))
      .map(term => {
        const lemma =
          nlp(term.normal).verbs().toInfinitive().out("text") ||
          nlp(term.normal).nouns().toSingular().out("text") ||
          term.normal;

        return {
          original: term.text,
          value: lemma,
        };
      });
  } catch (error) {
    console.error(error);
    throw new Error("Failed to extract lemmas from text.");
  }
};

export const matchLemmas = (rawLemmas: RawLemma[], knownLemmas: ILemmaModel[]): MatchedLemma[] => {
  try {
    const knownLemmasMap = new Map(knownLemmas.map(lemma => [lemma.value, lemma]));

    return rawLemmas.map(rawLemma => {
      const known = knownLemmasMap.get(rawLemma.value);
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
