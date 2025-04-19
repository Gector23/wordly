import express from "express";
import analyzeRoute from "./routes/analyze.route";

const router = express.Router();

router.use("/analyze", analyzeRoute);

export default router;
