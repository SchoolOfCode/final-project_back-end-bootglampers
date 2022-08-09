import express from "express";
import { createUserEntry } from "../models/registrationModels.js";

const registrationRouter = express.Router();

registrationRouter.post("/", async function (req, res) {
  const result = {
    created_user_data: await createUserEntry(req),
  };
  res.json({
    success: true,
    payload: result,
  });
});

export default registrationRouter;
