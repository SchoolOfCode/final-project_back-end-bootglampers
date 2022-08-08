import { query } from "../db/index.js";
import { getUserId, getPetId } from "./sharedFunctions.js";

//post mediotated  time date

export async function postMeditatedTime(req) {
  const firebaseUserId = req.body.firebase_user_id;
  const petId = await getPetId(firebaseUserId);
  const dbUserId = await getUserId(firebaseUserId);
  const meditationLength = Number(req.body.meditation_length);
  const streakDays = Number(req.body.streak_days);

  console.log(petId, dbUserId, meditationLength, streakDays);
  const results = await query(
    `INSERT INTO meditation_log 
    (pet_id, user_id, date, meditation_length, streak_days)
    VALUES
    ($1, $2, CURRENT_DATE, $3, $4)
    RETURNING *;
    `,
    [petId, dbUserId, meditationLength, streakDays]
  );

  return results.rows;
}
