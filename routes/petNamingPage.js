import express from "express";
import {
  createPetEntry,
  populateDefaultMeditationLog,
} from "../models/petNameModels.js";

const petNameRouter = express.Router();

petNameRouter.post("/", async function (req, res) {
  const result = {
    created_pet_data: await createPetEntry(req),
    default_meditation_log: await populateDefaultMeditationLog(req),
  };
  res.json({
    success: true,
    payload: result,
  });
});

export default petNameRouter;
