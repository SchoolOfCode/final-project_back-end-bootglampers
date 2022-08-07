import { query } from "../db/index.js";

//************** Get all stats **********/
// paramater of userid
// visits
export async function getTotalVisits(userId) {
  console.log(userId);
  const result = await query(
    `SELECT total_visits FROM users
    WHERE firebase_user_id = $1;`,
    [userId]
  );
  return result.rows;
}

export async function getTotalMedTime(userId) {
  const result = await query(
    `SELECT SUM(meditation_length)
    FROM meditation_log AS m
    LEFT JOIN users AS u
    ON u.user_id = m.user_id 
    WHERE u.firebase_user_id = $1;`,
    [userId]
  );
  return result.rows;
}
// total meditation time

// streak

// pet age
export async function getPetAge(userId) {
  console.log(userId);
  const dateOfBirth = await query(
    `SELECT pet_birth_date
    FROM pets AS p
    LEFT JOIN users AS u
    ON u.user_id = p.user_id 
    WHERE u.firebase_user_id = $1;`,
    [userId]
  );
  const age = dateOfBirth.rows[0].pet_birth_date;
  console.log(typeof age);
}
// mood log
