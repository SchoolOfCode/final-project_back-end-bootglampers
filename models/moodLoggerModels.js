import { query } from "../db/index.js";
import { getUserId } from "./sharedFunctions.js";

//******* Update mood logger **/

export async function updateMoodLogger(req) {
  const firebaseUserId = req.body.firebase_user_id;
  const moodRating = Number(req.body.mood_rating);

  const dbUserId = await getUserId(firebaseUserId);
  const result = await query(
    `INSERT INTO mood_log (user_id, date, mood_rating)
    VALUES
    ($1, CURRENT_DATE, $2)
    RETURNING *;`,
    [dbUserId, moodRating]
  );
  return result.rows;
}
