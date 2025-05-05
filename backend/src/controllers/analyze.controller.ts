import { type Request, type Response } from "express";
import { StatusCodes } from "http-status-codes";

import { getRawLemmasFromText, matchLemmas } from "#services/lemma.processing.service";
import { loadWords } from "#services/word.load.services";

export const analyzeText = async (req: Request, res: Response) => {
  const text = req.body.text;

  const rawLemmas = getRawLemmasFromText(text);
  const knownWords = await loadWords(rawLemmas);
  const processedWords = matchLemmas(rawLemmas, knownWords);

  res.status(StatusCodes.OK).json({ processedWords });
};
