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

  const visitsPromise = getTotalVisits(userId);
  const totalMeditationTimePromise = getTotalMedTime(userId);
  const dailyStreakPromise = getStreak(userId);
  const avgMoodPromise = getAverageMood(userId);
  const allMoodLogsPromise = getAllDataMoodLog(userId);

  // const result = {
  //   visits: visitsPromise,
  //   total_meditation_time: totalMeditationTimePromise,
  //   daily_streak: dailyStreakPromise,
  //   mood_data: {
  //     average_mood: avgMoodPromise,
  //     all_moodlogs: allMoodLogsPromise,
  //   },
  // };
  // res.json({
  //   success: true,
  //   payload: result,
  // });

  try {
    await Promise.all([
      visitsPromise,
      totalMeditationTimePromise,
      dailyStreakPromise,
      avgMoodPromise,
      allMoodLogsPromise,
    ]).then((values) => {
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
  } catch (e) {
    res.json({
      success: false,
      payload: e,
    });
  }
});

//   await Promise.all([
//     visitsPromise,
//     totalMeditationTimePromise,
//     dailyStreakPromise,
//     avgMoodPromise,
//     allMoodLogsPromise,
//   ])
//     .catch((e) => {
//       res.json({
//         success: false,
//         payload: e,
//       });
//     })
//     .then((values) => {
//       console.log(values);
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
// });

// split promises with .then run them one by one, with a catch and a condition
//
//example of chaining promises and catches
//   await Promise(visitsPromise).catch((e) => {
//     res.json({
//       success: false,
//       payload: e,
//     })
//   }).then(await Promise(totalMeditationTimePromise).catch((e) => {
//     res.json({
//       success: false,
//       payload: e,
//     })
//   })).then(await Promise(dailyStreakPromise).catch((e) => {
//     res.json({
//       success: false,
//       payload: e,
//     })
//   })).then(await Promise(avgMoodPromise).catch((e) => {
//     res.json({
//       success: false,
//       payload: e,
//     })
//   })).then(await Promise(allMoodLogsPromise).catch((e) => {
//     res.json({
//       success: false,
//       payload: e,
//     })
//   })).then((values) => {
//     console.log("working values")
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
// });

export default statsRouter;
