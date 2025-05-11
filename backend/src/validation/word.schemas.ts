import Joi from "joi";

export const AddTranslationSchema = {
  body: Joi.object({
    lemma: Joi.string().min(1).required(),
    original: Joi.string().min(1).required(),
    translation: Joi.string().min(1).required(),
    sentence: Joi.string().min(1).required(),
  }),
};
