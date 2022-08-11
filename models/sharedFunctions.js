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

export async function getPetId(firebaseUserId) {
  const result = await query(
    `SELECT u.username, u.user_id, p.pet_id 
    FROM pets AS p
    LEFT JOIN users AS u
    ON u.user_id = p.user_id
    WHERE u.firebase_user_id = $1;`,
    [firebaseUserId]
  );
  const petId = result.rows[0].pet_id;
  return petId;
}

export async function getPetEntry(firebaseUserId) {
  const result = await query(
    `SELECT u.username, u.user_id, p.pet_id, p.pet_name 
    FROM pets AS p
    LEFT JOIN users AS u
    ON u.user_id = p.user_id
    WHERE u.firebase_user_id = $1;`,
    [firebaseUserId]
  );
  const petId = result.rows[0].pet_name;
  return petId;
}
