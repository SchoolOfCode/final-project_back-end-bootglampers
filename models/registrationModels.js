import { query } from "../db/index.js";
import { getUserId } from "./sharedFunctions.js";

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

//********* Post request ********/
export async function populateDefaultMoodLog(req) {
  const firebaseUserId = req.body.firebase_user_id;
  const userId = await getUserId(firebaseUserId);

  const result = await query(
    `INSERT INTO mood_log
    (user_id, date, mood_rating)    
    VALUES
    ($1, NULL, NULL)
    RETURNING *;`,
    [userId]
  );
  return result.rows;
}

export async function createDefaultPetEntry(req) {
  const firebaseUserId = req.body.firebase_user_id;
  const userId = await getUserId(firebaseUserId);
  const result = await query(
    `
    INSERT INTO pets 
        (pet_name, user_id, pet_birth_date, pet_meditation_total)
        VALUES 
        (NULL, $1, NULL, NULL)
        RETURNING *; `,
    [userId]
  );
  return result.rows;
}
