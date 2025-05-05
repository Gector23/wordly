import clsx from "clsx";
import { type FC, memo, useCallback } from "react";

import { useAppDispatch } from "../../../hooks/useAppDispatch";
import { setSelectedWord } from "../../../store/slices/analyze";
import { type ProcessedWord } from "../../../types/word.types";
import Tooltip from "../../Tooltip";

interface WordProps {
  rawWord: string;
  sentence: string;
  processedWord?: ProcessedWord;
}

const Word: FC<WordProps> = ({ rawWord, sentence, processedWord }) => {
  const dispatch = useAppDispatch();

  const handleClick = useCallback(() => {
    if (processedWord && !processedWord.isStopWord) {
      dispatch(setSelectedWord({ ...processedWord, sentence }));
    }
  }, [dispatch, sentence, processedWord]);

  return (
    <Tooltip content={processedWord?.isStopWord ? "Stop word" : ""}>
      <div
        className={clsx(
          processedWord?.known ? "text-blue-400" : "text-gray-500",
          !processedWord?.isStopWord && "cursor-pointer",
          "h-6"
        )}
        onClick={handleClick}
      >
        {rawWord}
      </div>
    </Tooltip>
  );
};

export default memo(Word);
