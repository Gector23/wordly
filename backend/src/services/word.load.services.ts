import Word from "#models/word.model";
import { type RawLemma } from "#types/lemma.types";

export const loadWords = async (rawLemmas: RawLemma[]) => {
  try {
    const words = await Word.find({
      lemma: { $in: rawLemmas.map(rawLemma => rawLemma.lemma) },
    }).lean();
    return words;
  } catch (error) {
    console.error(error);
    throw new Error("Failed to load words.");
  }
};
