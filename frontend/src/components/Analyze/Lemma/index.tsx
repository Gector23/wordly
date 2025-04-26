import clsx from "clsx";
import { type FC, memo } from "react";

import { type MatchedLemma } from "../../../types/lemma.types";

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
