import { type Request, type Response } from "express";
import { StatusCodes } from "http-status-codes";

import { addWordTranslation } from "#services/word.update.services";

export const addTranslation = async (req: Request, res: Response) => {
  const { lemma, original, translation, sentence } = req.body;

  await addWordTranslation({
    lemma,
    original,
    translation,
    sentence,
  });

  res.status(StatusCodes.CREATED);
};
