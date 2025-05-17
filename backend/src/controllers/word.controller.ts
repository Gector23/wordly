import { type AddTranslationRequest } from "@wordly/shared";
import { type NextFunction, type Request, type Response } from "express";
import { StatusCodes } from "http-status-codes";

import { addWordTranslation } from "#services/word.update.services";
import { wrapError } from "#utils/errors";

export const addTranslation = async (
  req: Request<unknown, unknown, AddTranslationRequest>,
  res: Response<void>,
  next: NextFunction
) => {
  try {
    const { lemma, original, translation, sentence } = req.body;

    await addWordTranslation({
      lemma,
      original,
      translation,
      sentence,
    });

    res.status(StatusCodes.CREATED);
  } catch (err) {
    next(wrapError("Failed to add translation.", err));
  }
};
