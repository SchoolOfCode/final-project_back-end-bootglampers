import express from "express";
import { getTotalVisits, getTotalMedTime } from "../models/index.js";

const statsRouter = express.Router();

statsRouter.get("/:userId", async function (req, res) {
  // example id = CNXBkvXJbxUjh5bOxk8NN2DV2l72
  const userId = req.params.userId;
  let totalVisits = "";
  let totalMediTime = "";
  //   let petAge = "";
  //   let mediStreak = "";

  totalVisits = await getTotalVisits(userId);
  totalMediTime = await getTotalMedTime(userId);
  petAge = await getPetAge(userId);
  res.json({
    success: true,
    payload: totalVisits,
    totalMediTime,
  });
});

export default statsRouter;
