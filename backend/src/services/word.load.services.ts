import { type RawLemma } from "@wordly/shared";

import WordModel from "#models/word.model";
import { wrapError } from "#utils/errors";

export const loadWords = async (rawLemmas: RawLemma[]) => {
  try {
    const words = await WordModel.find({
      lemma: { $in: rawLemmas.map(rawLemma => rawLemma.lemma) },
    }).lean();
    return words;
  } catch (err) {
    throw wrapError("Failed to load words.", err);
  }
};
