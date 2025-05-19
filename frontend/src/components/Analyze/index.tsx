import { useDebounce } from "ahooks";
import { memo, useCallback, useEffect, useMemo, useState } from "react";

import { useAnalyzeMutation } from "../../api/endpoints/analyzeEndpoints";
import Translations from "../Translations";
import Word from "./Word";

const Analyze = () => {
  const [text, setText] = useState("");
  const debouncedText = useDebounce(text, { wait: 500 });
  const [analyze, { data }] = useAnalyzeMutation();

  useEffect(() => {
    if (debouncedText) {
      analyze({ text: debouncedText });
    }
  }, [debouncedText, analyze]);

  const words = useMemo(() => {
    if (!data) {
      return [];
    }

    const processedWordsByOriginal = new Map(
      data.processedWords.map(word => [word.original, word])
    );

    const sentences = debouncedText.match(/[^.!?]+(?:[.!?]+|\s*$)/g) ?? [];

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
  }, [debouncedText, data]);

  const handleTextChange = useCallback((e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const text = e.target.value;
    setText(text);
  }, []);

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
      <Translations />
    </>
  );
};

export default memo(Analyze);
