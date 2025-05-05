import { memo, useCallback, useMemo, useState } from "react";

import { useAnalyzeMutation } from "../../api/endpoints/analyzeEndpoints";
import Button from "../Button";
import Word from "./Word";
import Translations from "../Translations";

const Analyze = () => {
  const [text, setText] = useState("");
  const [analyze, { data }] = useAnalyzeMutation();

  const words = useMemo(() => {
    if (!data) {
      return [];
    }

    const processedWordsByOriginal = new Map(
      data.processedWords.map(word => [word.original, word])
    );

    const sentences = text.match(/[^.!?]+(?:[.!?]+|\s*$)/g) ?? [];

    return sentences.flatMap(sentence => {
      const rawWords = sentence.split(" ").filter(Boolean);
      return rawWords.map(rawWord => {
        const processedWord = processedWordsByOriginal.get(rawWord);
        return {
          rawWord,
          sentence,
          processedWord,
        };
      });
    });
  }, [text, data]);

  const handleTextChange = useCallback((e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const text = e.target.value;
    setText(text);
  }, []);

  const handleAnalyze = useCallback(async () => {
    await analyze({ text });
  }, [text, analyze]);

  return (
    <>
      <div className="mb-4 grid grid-cols-2 gap-4">
        <textarea
          placeholder="Enter the text to be analyzed"
          className="block h-80 resize-none rounded-md bg-white p-4"
          onChange={handleTextChange}
        />
        <div className="flex h-80 flex-wrap content-start gap-x-1 overflow-y-auto rounded-md bg-white p-4">
          {words.map(({ rawWord, sentence, processedWord }, i) => (
            <Word
              key={`${rawWord}-${i}`}
              rawWord={rawWord}
              sentence={sentence}
              processedWord={processedWord}
            />
          ))}
        </div>
      </div>
      <Button className="ml-auto" onClick={handleAnalyze}>
        Analyze
      </Button>
      <Translations />
    </>
  );
};

export default memo(Analyze);
