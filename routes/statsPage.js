import express from "express";
import {
  getTotalVisits,
  getTotalMedTime,
  getAllDataMoodLog,
  getAverageMood,
  getStreak,
} from "../models/statsPageModels.js";

const statsRouter = express.Router();

statsRouter.get("/:userId", async function (req, res) {
  // example id = CNXBkvXJbxUjh5bOxk8NN2DV2l72
  const userId = req.params.userId;

  /*
  promise.all  - give array  of promises/async functions  
  */
  const result = {
    visits: await getTotalVisits(userId),
    total_meditation_time: await getTotalMedTime(userId),
    daily_streak: await getStreak(userId),
    mood_data: {
      average_mood: await getAverageMood(userId),
      all_moodlogs: await getAllDataMoodLog(userId),
    },
  };

  res.json({
    success: true,
    payload: result,
  });
});

export default statsRouter;
