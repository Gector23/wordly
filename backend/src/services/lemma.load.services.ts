import Lemma from "#models/lemma.model";
import { type RawLemma } from "#types/lemma.types";

export const loadLemmas = async (rawLemmas: RawLemma[]) => {
  try {
    const lemmas = await Lemma.find({ value: { $in: rawLemmas.map(lemma => lemma.value) } }).lean();
    return lemmas;
  } catch (error) {
    console.error(error);
    throw new Error("Failed to load lemmas.");
  }
};
