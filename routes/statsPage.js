import express from "express";
import { getTotalVisits, getTotalMedTime } from "../models/statsPageModels.js";

const statsRouter = express.Router();

statsRouter.get("/:userId", async function (req, res) {
  // example id = CNXBkvXJbxUjh5bOxk8NN2DV2l72
  const userId = req.params.userId;

  const totalVisits = await getTotalVisits(userId);
  const totalMediTime = await getTotalMedTime(userId);

  res.json({
    success: true,
    payload: totalVisits,
    totalMediTime,
  });
});

export default statsRouter;

/*


get request    using state ??  to get the userID  CNXBkvXJbxUjh5bOxk8NN2DV2l72 
FRONT END - using firebase to track which user is logged. 
Access in each front end page to the userid 


let userId = CNXBkvXJbxUjh5bOxk8NN2DV2l72 -- getting from firbase 
"https://medi-mate-app.herokuapp.com/stats/${userId}"  END POINT 

UPDATE Request   --- sending json {
  userId: 

}



*/
