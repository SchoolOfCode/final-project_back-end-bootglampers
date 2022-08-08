import express from "express";
import { updateMoodLogger } from "../models/moodLoggerModels.js";

const moodRouter = express.Router();

moodRouter.post("/", async function (req, res) {
  const firebaseUserId = req.body.firebase_user_id;
  const moodRating = Number(req.body.mood_rating);
  const result = await updateMoodLogger(firebaseUserId, moodRating);
  res.json({
    success: true,
    payload: result,
  });
});

export default moodRouter;
