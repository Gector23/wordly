import { describe, expect, it } from "@jest/globals";

import { getRawLemmasFromText, matchLemmas } from "../../src/services/lemma.processing.service";

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
    const rawLemmas = [
      { original: "Cats", value: "cat" },
      { original: "animals", value: "animal" },
      { original: "played", value: "play" },
    ];

    const knownLemmas = [
      { value: "cat", translations: ["кот"], addedAt: new Date("2025-04-19") },
      { value: "animal", translations: ["животное"], addedAt: new Date("2025-04-19") },
    ];

    it("should match raw lemmas with known lemmas", () => {
      const result = matchLemmas(rawLemmas, knownLemmas);
      expect(result).toMatchSnapshot();
    });
  });
});
