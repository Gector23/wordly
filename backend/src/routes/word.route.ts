import express from "express";

import { addTranslation } from "#controllers/word.controller";
import { validateAndSanitizeRequest } from "#middlewares/validateAndSanitizeRequest.middleware";
import { AddTranslationSchema } from "#validation/word.schemas";

const router = express.Router();

router.route("/translation").post(validateAndSanitizeRequest(AddTranslationSchema), addTranslation);

export default router;
