import express from "express";
import {
  getTotalVisits,
  getTotalMedTime,
  getAllDataMoodLog,
  getAverageMood,
} from "../models/statsPageModels.js";

const statsRouter = express.Router();

statsRouter.get("/:userId", async function (req, res) {
  // example id = CNXBkvXJbxUjh5bOxk8NN2DV2l72
  const userId = req.params.userId;

  const totalVisits = await getTotalVisits(userId);
  const totalMedidationTime = await getTotalMedTime(userId);
  const averageMood = await getAverageMood(userId);

  const result = {
    visits: Number(totalVisits[0].total_visits),
    total_meditation_time: Number(totalMedidationTime[0].total_meditation_time),
    mood_data: {
      average_mood: Number(averageMood[0].average_overall_mood),
      all_moodlogs: await getAllDataMoodLog(userId),
    },
  };

  res.json({
    success: true,
    payload: result,
  });
});

export default statsRouter;
