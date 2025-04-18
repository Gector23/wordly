import nlp from "compromise";
import { eng as stopList } from "stopword";

import { MatchedLemma, RawLemma } from "../types/lemma.types";
import { ILemmaModel } from "../models/lemma.model";

export const getRawLemmasFromText = (text: string): RawLemma[] => {
  try {
    const doc = nlp(text);
    const terms = doc.termList();

    return terms
      .filter((term) => !stopList.includes(term.normal))
      .map((term) => {
        let lemma = term.normal;
        if (term.tags?.has("Verb")) {
          lemma = nlp(term.normal).verbs().toInfinitive().out("text");
        } else if (term.tags?.has("Noun")) {
          lemma = nlp(term.normal).nouns().toSingular().out("text");
        }

        return {
          original: term.text,
          value: lemma,
        };
      });
  } catch (error) {
    throw new Error("Failed to extract lemmas from text.");
  }
};

export const matchLemmas = (
  rawLemmas: RawLemma[],
  knownLemmas: ILemmaModel[]
): MatchedLemma[] => {
  try {
    const knownLemmasMap = new Map(
      knownLemmas.map((lemma) => [lemma.value, lemma])
    );

    return rawLemmas.map((rawLemma) => {
      const known = knownLemmasMap.get(rawLemma.value);
      return {
        ...rawLemma,
        known: !!known,
        translations: known?.translations,
        addedAt: known?.addedAt,
      };
    });
  } catch (error) {
    throw new Error("Failed to match lemmas.");
  }
};
