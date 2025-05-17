import { type AnalyzeTextResponse, type AnalyzeTextRequest } from "@wordly/shared";
import { type NextFunction, type Request, type Response } from "express";
import { StatusCodes } from "http-status-codes";

import { getRawLemmasFromText, matchLemmas } from "#services/lemma.processing.service";
import { loadWords } from "#services/word.load.services";
import { wrapError } from "#utils/errors";

export const analyzeText = async (
  req: Request<unknown, unknown, AnalyzeTextRequest>,
  res: Response<AnalyzeTextResponse>,
  next: NextFunction
) => {
  try {
    const text = req.body.text;

    const rawLemmas = getRawLemmasFromText(text);
    const knownWords = await loadWords(rawLemmas);
    const processedWords = matchLemmas(rawLemmas, knownWords);

    res.status(StatusCodes.OK).json({ processedWords });
  } catch (err) {
    next(wrapError("Failed to analyze text.", err));
  }
};
