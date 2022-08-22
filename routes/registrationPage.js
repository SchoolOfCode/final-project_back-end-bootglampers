import express from "express";
import {
  createDefaultPetEntry,
  createUserEntry,
  populateDefaultMoodLog,
} from "../models/registrationModels.js";

const registrationRouter = express.Router();

registrationRouter.post("/", async function (req, res) {
  const result = {
    created_user_data: await createUserEntry(req),
    default_mood_log: await populateDefaultMoodLog(req),
    default_pet_entry: await createDefaultPetEntry(req),
  };
  res.json({
    success: true,
    payload: result,
  });
});

export default registrationRouter;
