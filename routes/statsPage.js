import express from "express";
import {
  getTotalVisits,
  getTotalMedTime,
  getAllDataMoodLog,
  getAverageMood,
  getStreak,
} from "../models/statsPageModels.js";

const statsRouter = express.Router();

statsRouter.get("/:userId", async function (req, res) {
  const userId = req.params.userId;

  const visitsPromise = await getTotalVisits(userId);
  const totalMeditationTimePromise = await getTotalMedTime(userId);
  const dailyStreakPromise = await getStreak(userId);
  const avgMoodPromise = await getAverageMood(userId);
  const allMoodLogsPromise = await getAllDataMoodLog(userId);

  // split promises with .then run them one by one, with a catch and a condition
  // 
  //example of chaining promises and catches
  await Promise(visitsPromise).catch((e) => {
    res.json({
      success: false,
      payload: e,
    })
  }).then(await Promise(totalMeditationTimePromise).catch((e) => {
    res.json({
      success: false,
      payload: e,
    })
  })).then(await Promise(dailyStreakPromise).catch((e) => {
    res.json({
      success: false,
      payload: e,
    })
  })).then(await Promise(avgMoodPromise).catch((e) => {
    res.json({
      success: false,
      payload: e,
    })
  })).then(await Promise(allMoodLogsPromise).catch((e) => {
    res.json({
      success: false,
      payload: e,
    })
  })).then((values) => {
    console.log("working values")
    const result = {
      visits: values[0],
      total_meditation_time: values[1],
      daily_streak: values[2],
      mood_data: {
        average_mood: values[3],
        all_moodlogs: values[4],
      },
    };
    res.json({
      success: true,
      payload: result,
    });
  });
});


// await Promise.all([
//   visitsPromise,
//   totalMeditationTimePromise,
//   dailyStreakPromise,
//   avgMoodPromise,
//   allMoodLogsPromise,
// ]).catch((e) => {
//     res.json({
//       success: false,
//       payload: e,
//     }).then((values) => {
//       console.log("working values")
//       const result = {
//         visits: values[0],
//         total_meditation_time: values[1],
//         daily_streak: values[2],
//         mood_data: {
//           average_mood: values[3],
//           all_moodlogs: values[4],
//         },
//       };
//       res.json({
//         success: true,
//         payload: result,
//       });
//     });
//   });
// });
// try {
//   await Promise.all([
//     visitsPromise,
//     totalMeditationTimePromise,
//     dailyStreakPromise,
//     avgMoodPromise,
//     allMoodLogsPromise,
//   ]).then((values) => {
//     const result = {
//       visits: values[0],
//       total_meditation_time: values[1],
//       daily_streak: values[2],
//       mood_data: {
//         average_mood: values[3],
//         all_moodlogs: values[4],
//       },
//     };
//     res.json({
//       success: true,
//       payload: result,
//     });
//   });
// } catch (e) {
//   res.json({
//     success: false,
//     payload: e,
//   });
// }
// });

export default statsRouter;
