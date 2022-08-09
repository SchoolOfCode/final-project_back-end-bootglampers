import { query } from "../db/index.js";

export async function createUserEntry(req) {
  const firebaseUserId = req.body.firebase_user_id;
  const username = req.body.username;

  const result = await query(
    `INSERT INTO users 
        (username, firebase_user_id, join_date, total_visits)
        VALUES
        ($1, $2, CURRENT_DATE, 1)
        RETURNING *;`,
    [username, firebaseUserId]
  );
  return result.rows;
}
