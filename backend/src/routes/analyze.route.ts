import express from "express";

import { analyzeText } from "../controllers/analyze.controller";

const router = express.Router();

router.route("/").post(analyzeText);

export default router;
