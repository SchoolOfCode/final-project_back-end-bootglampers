import express from "express";
import {
  createUserEntry,
  createPetEntry,
} from "../models/registrationModels.js";

const registrationRouter = express.Router();

registrationRouter.post("/", async function (req, res) {
  const result = {
    created_user_data: await createUserEntry(req),
    created_pet_data: await createPetEntry(req),
  };
  res.json({
    success: true,
    payload: result,
  });
});

export default registrationRouter;
