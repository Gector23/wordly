import Word from "../models/lemma.model";

import { RawLemma } from "../types/lemma.types";

export const loadLemmas = async (rawLemmas: RawLemma[]) => {
  try {
    const lemmas = await Word.find({ value: { $in: rawLemmas.map((lemma) => lemma.value) } }).lean();
    return lemmas;
  } catch (error) {
    throw new Error("Failed to load lemmas.");
  }
}