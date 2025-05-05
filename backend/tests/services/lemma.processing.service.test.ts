import { describe, expect, it } from "@jest/globals";

import { type WordModel } from "#models/word.model";
import { getRawLemmasFromText, matchLemmas } from "#services/lemma.processing.service";
import { type RawLemma } from "#types/lemma.types";

describe("Lemma Processing Service", () => {
  describe("getRawLemmasFromText", () => {
    const cases = [
      ["simple nouns", "Cats are animals."],
      ["verbs in different forms", "He played and is playing football."],
      ["mixed parts of speech", "The quick brown fox jumps over the lazy dog."],
      ["repeated words", "Cats and cats and cats."],
      ["only stopwords", "Is it? Am I? Are you?"],
      ["empty string", ""],
      ["capitalization", "WALK walk Walk"],
    ];

    it.each(cases)("should extract raw lemmas from %s", (_, text) => {
      const result = getRawLemmasFromText(text);
      expect(result).toMatchSnapshot();
    });
  });

  describe("matchLemmas", () => {
    const rawLemmas: RawLemma[] = [
      { original: "Cats", lemma: "cat", isStopWord: false },
      { original: "animals", lemma: "animal", isStopWord: false },
      { original: "played", lemma: "play", isStopWord: false },
    ];

    const knownWords: WordModel[] = [
      {
        lemma: "cat",
        translations: [
          {
            value: "кот",
            original: "cat",
            sentence: "If I decide to have a pet, it will be a cat.",
          },
        ],
        addedAt: new Date("2025-04-19"),
      },
      {
        lemma: "animal",
        translations: [
          { value: "животное", original: "animal", sentence: "An injured animal found a shelter." },
        ],
        addedAt: new Date("2025-04-19"),
      },
    ];

    it("should match raw lemmas with known lemmas", () => {
      const result = matchLemmas(rawLemmas, knownWords);
      expect(result).toMatchSnapshot();
    });
  });
});
