import express from "express";
import { getTotalVisits, getTotalMedTime } from "../models/index.js";

const statsRouter = express.Router();

statsRouter.get("/", async function (req, res) {
  // example id = CNXBkvXJbxUjh5bOxk8NN2DV2l72
  const userId = "CNXBkvXJbxUjh5bOxk8NN2DV2l72";
  let totalVisits = "";
  let totalMediTime = "";
  //   let petAge = "";
  //   let mediStreak = "";

  totalVisits = await getTotalVisits(userId);
  totalMediTime = await getTotalMedTime(userId);
  res.json({
    success: true,
    payload: totalVisits,
    totalMediTime,
  });
});

export default statsRouter;
