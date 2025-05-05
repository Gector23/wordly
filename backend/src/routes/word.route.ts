import express from "express";

import { addTranslation } from "#controllers/word.controller";

const router = express.Router();

router.route("/translation").post(addTranslation);

export default router;
