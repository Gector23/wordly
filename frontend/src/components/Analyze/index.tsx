import { memo, useCallback, useMemo, useState } from "react";
import Button from "../Button";
import { useAnalyzeMutation } from "../../api/endpoints/analyzeEndpoints";
import Lemma from "./Lemma";

const Analyze = () => {
  const [text, setText] = useState("");
  const [analyze, { data }] = useAnalyzeMutation();

  const lemmas = useMemo(() => {
    if (!data) {
      return [];
    }

    const matchedLemmasByOriginal = new Map(
      data.matchedLemmas.map((lemma) => [lemma.original, lemma])
    );

    const words = text.split(" ").filter(Boolean);

    return words.map((word) => {
      const matchedLemma = matchedLemmasByOriginal.get(word);
      return {
        word,
        matchedLemma,
      };
    });
  }, [text, data]);

  const handleTextChange = useCallback(
    (e: React.ChangeEvent<HTMLTextAreaElement>) => {
      const text = e.target.value;
      setText(text);
    },
    []
  );

  const handleAnalyze = useCallback(async () => {
    await analyze({ text });
  }, [text, analyze]);

  return (
    <>
      <div className="grid grid-cols-2 gap-4 mb-4">
        <textarea
          placeholder="Enter the text to be analyzed"
          className="h-80 block resize-none p-4 rounded-md bg-white"
          onChange={handleTextChange}
        />
        <div className="h-80 p-4 rounded-md bg-white overflow-y-auto flex flex-wrap content-start gap-x-1">
          {lemmas.map(({ word, matchedLemma }, i) => (
            <Lemma
              key={`${word}-${i}`}
              word={word}
              matchedLemma={matchedLemma}
            />
          ))}
        </div>
      </div>
      <Button className="ml-auto" onClick={handleAnalyze}>
        Analyze
      </Button>
    </>
  );
};

export default memo(Analyze);
