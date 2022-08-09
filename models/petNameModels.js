import { query } from "../db/index.js";
import { getUserId } from "./sharedFunctions.js";

export async function createPetEntry(req) {
  console.log(req);
  const firebaseUserId = req.body.firebase_user_id;
  const petName = req.body.pet_name;
  const userId = await getUserId(firebaseUserId);
  const result = await query(
    `INSERT INTO pets 
        (pet_name, user_id, pet_birth_date, pet_meditation_total)
        VALUES 
        ($1, $2, CURRENT_DATE, 0)
        RETURNING *; `,
    [petName, userId]
  );
  return result.rows;
}
