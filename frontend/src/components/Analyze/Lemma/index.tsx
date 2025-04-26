import { FC, memo } from "react";
import { MatchedLemma } from "../../../types/lemma.types";
import clsx from "clsx";

interface LemmaProps {
  word: string;
  matchedLemma?: MatchedLemma;
}

const Lemma: FC<LemmaProps> = ({ word, matchedLemma }) => {
  return (
    <div className={clsx(matchedLemma?.known ? "text-blue-400" : "text-gray-500", "h-6")}>
      {word}
    </div>
  );
};

export default memo(Lemma);
