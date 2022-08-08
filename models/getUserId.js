import { query } from "../db/index.js";

export async function getUserId(firebaseUserId) {
  const result = await query(
    `SELECT user_id FROM users
      WHERE firebase_user_id = $1;`,
    [firebaseUserId]
  );
  const dbUserId = result.rows[0].user_id;
  return dbUserId;
}
