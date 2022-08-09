import express from "express";
import { createPetEntry } from "../models/petNameModels.js";

const petNameRouter = express.Router();

petNameRouter.post("/", async function (req, res) {
  console.log(req);

  const result = {
    created_pet_data: await createPetEntry(req),
  };
  res.json({
    success: true,
    payload: result,
  });
});

export default petNameRouter;
