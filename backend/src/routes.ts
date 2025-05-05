import express from "express";

import analyzeRoute from "./routes/analyze.route";
import wordRoute from "./routes/word.route";

const router = express.Router();

router.use("/analyze", analyzeRoute);
router.use("/word", wordRoute);

export default router;
