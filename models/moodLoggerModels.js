import { query } from "../db/index.js";

//******* Update mood logger **/

export async function getUserId(firebaseUserId) {
  const result = await query(
    `SELECT user_id FROM users
    WHERE firebase_user_id = $1;`,
    [firebaseUserId]
  );
  const dbUserId = result.rows[0].user_id;
  return dbUserId;
}

export async function updateMoodLogger(firebaseUserId, moodRating) {
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
