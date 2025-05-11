import Joi from "joi";

export const analyzeTextSchema = {
  body: Joi.object({
    text: Joi.string().min(1).required(),
  }),
};
