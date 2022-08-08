import express from "express";
import { updateMoodLogger } from "../models/moodLoggerModels.js";

const moodRouter = express.Router();

moodRouter.post("/", async function (req, res) {
  const result = await updateMoodLogger(req);
  res.json({
    success: true,
    payload: result,
  });
});

export default moodRouter;
