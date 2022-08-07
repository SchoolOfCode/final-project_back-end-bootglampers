import express from "express";
import { getTotalVisits } from "../models/index.js";
import { getTotalMedTime } from "../models/index.js";

const router = express.Router();

router.get("/:userId/:path", async function (req, res) {
  // example id = CNXBkvXJbxUjh5bOxk8NN2DV2l72
  // returns total_visits:
  // const userId = req.query.id;
  console.log(req.params.userId);
  console.log(req.params.param2);
  let result = {};
  switch (req.params.path) {
    case "visits":
      result = await getTotalVisits(req.params.userId);
      console.log(req.params.userId);
      res.json({
        success: true,
        payload: result,
      });
      break;
    case "totalmedtime":
      result = await getTotalVisits(req.params.userId);
      console.log(req.params.userId);
      res.json({
        success: true,
        payload: result,
      });

    default:
      console.log("error");
      break;
  }
});

export { router as statsRouter };
