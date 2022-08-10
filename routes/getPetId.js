import express from "express";
import { getPetId } from "../models/sharedFunctions.js";

const petIdRouter = express.Router();

petIdRouter.get("/:userId", async function (req, res) {
  const userId = req.params.userId;
  const result = await getPetId(userId);
  res.json({
    success: true,
    payload: result,
  });
});

export default petIdRouter;
