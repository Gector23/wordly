import { StatusCodes } from "http-status-codes";

import { generateSwaggerPathWithJoi } from "#swagger/generateSwaggerPathWithJoi";
import { AddTranslationSchema } from "#validation/word.schemas";

export const addTranslationPath = generateSwaggerPathWithJoi({
  method: "get",
  summary: "Adds a translation of a word",
  description: "Adds a translation of a word and creates a word if it does not exist",
  tags: ["Words"],
  validationSchemas: AddTranslationSchema,
  responses: {
    [StatusCodes.CREATED]: {
      description: "Word translation added",
    },
  },
});
