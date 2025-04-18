import { Request, Response } from "express";
import { StatusCodes } from "http-status-codes";

import { getRawLemmasFromText, matchLemmas } from "../services/lemma.processing.service";
import { loadLemmas } from "../services/lemma.load.services";

export const analyzeText = async (req: Request, res: Response) => {
  const text = req.body.text;

  const rawLemmas = getRawLemmasFromText(text);
  const knownLemmas = await loadLemmas(rawLemmas);
  const matchedLemmas = matchLemmas(rawLemmas, knownLemmas);

  res.status(StatusCodes.OK).json(matchedLemmas);
};
