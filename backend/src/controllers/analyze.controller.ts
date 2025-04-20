import { type Request, type Response } from "express";
import { StatusCodes } from "http-status-codes";

import { loadLemmas } from "#services/lemma.load.services";
import { getRawLemmasFromText, matchLemmas } from "#services/lemma.processing.service";

export const analyzeText = async (req: Request, res: Response) => {
  const text = req.body.text;

  const rawLemmas = getRawLemmasFromText(text);
  const knownLemmas = await loadLemmas(rawLemmas);
  const matchedLemmas = matchLemmas(rawLemmas, knownLemmas);

  res.status(StatusCodes.OK).json(matchedLemmas);
};
