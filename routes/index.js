import express from "express";
import { getTotalVisits } from "../models/index.js";

const router = express.Router();

router.get("/visits", async function (req, res) {
  const result = await getTotalVisits(req);
  res.json({
    success: true,
    payload: result,
  });
});

export { router as statsRouter };
