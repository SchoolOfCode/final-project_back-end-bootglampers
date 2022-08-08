import express from "express";

import { postMeditatedTime } from "../models/meditationModels.js";

const meditationRouter = express.Router();

meditationRouter.post("/", async function (req, res) {
  const result = await postMeditatedTime(req);
  res.json({
    success: true,
    payload: result,
  });
});

export default meditationRouter;
