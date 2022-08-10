import { query } from "../db/index.js";
import { getUserId, getPetId } from "./sharedFunctions.js";

export async function createPetEntry(req) {
  const firebaseUserId = req.body.firebase_user_id;
  const petName = req.body.pet_name;
  const userId = await getUserId(firebaseUserId);

  const deleteNulls = await query(
    `DELETE FROM pets
  WHERE pet_name IS NULL AND user_id = $1
  RETURNING *;`,
    [userId]
  );

  const result = await query(
    `    
    INSERT INTO pets 
        (pet_name, user_id, pet_birth_date, pet_meditation_total)
        VALUES 
        ($1, $2, CURRENT_DATE, 0)
        RETURNING *; `,
    [petName, userId]
  );
  return result.rows;
}

export async function populateDefaultMeditationLog(req) {
  const firebaseUserId = req.body.firebase_user_id;
  const userId = await getUserId(firebaseUserId);
  const petId = await getPetId(firebaseUserId);

  const result = await query(
    `INSERT INTO meditation_log
    (pet_id, user_id, date, meditation_length, streak_days)
    VALUES
    ($1, $2, NULL, NULL, NULL)
    RETURNING *;`,
    [petId, userId]
  );
  return result.rows;
}
