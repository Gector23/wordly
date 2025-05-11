import express from "express";

import { analyzeText } from "#controllers/analyze.controller";
import { validateAndSanitizeRequest } from "#middlewares/validateAndSanitizeRequest.middleware";
import { analyzeTextSchema } from "#validation/analyze.schemas";

const router = express.Router();

router.route("/").post(validateAndSanitizeRequest(analyzeTextSchema), analyzeText);

export default router;
