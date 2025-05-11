import { type AddTranslationRequest } from "@wordly/shared";
import { type Request, type Response } from "express";
import { StatusCodes } from "http-status-codes";

import { addWordTranslation } from "#services/word.update.services";

export const addTranslation = async (
  req: Request<unknown, unknown, AddTranslationRequest>,
  res: Response<void>
) => {
  const { lemma, original, translation, sentence } = req.body;

  await addWordTranslation({
    lemma,
    original,
    translation,
    sentence,
  });

  res.status(StatusCodes.CREATED);
};
