import { type RawLemma } from "@wordly/shared";

import WordModel from "#models/word.model";

export const loadWords = async (rawLemmas: RawLemma[]) => {
  try {
    const words = await WordModel.find({
      lemma: { $in: rawLemmas.map(rawLemma => rawLemma.lemma) },
    }).lean();
    return words;
  } catch (error) {
    console.error(error);
    throw new Error("Failed to load words.");
  }
};
