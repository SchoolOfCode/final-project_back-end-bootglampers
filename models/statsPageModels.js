import { query } from "../db/index.js";

//************** Get all stats **********/
export async function getTotalVisits(userId) {
  console.log(userId);
  const result = await query(
    `SELECT total_visits FROM users
    WHERE firebase_user_id = $1;`,
    [userId]
  );
  return result.rows;
}

// total meditation time
export async function getTotalMedTime(userId) {
  const result = await query(
    `SELECT SUM(meditation_length) AS total_meditation_time
    FROM meditation_log AS m
    LEFT JOIN users AS u
    ON u.user_id = m.user_id 
    WHERE u.firebase_user_id = $1;`,
    [userId]
  );
  return result.rows;
}

// mood log
export async function getAllDataMoodLog(userId) {
  const result = await query(
    `SELECT u.user_id, m.mood_log_id, m.date, m.mood_rating
    FROM mood_log AS m
    LEFT JOIN users AS u
    ON u.user_id = m.user_id 
    WHERE u.firebase_user_id = $1;`,
    [userId]
  );
  console.log(result.rows);
  return result.rows;
}

export async function getAverageMood(userId) {
  const result = await query(
    `SELECT ROUND(AVG(m.mood_rating), 2) AS average_overall_mood
    FROM mood_log AS m
    LEFT JOIN users AS u
    ON u.user_id = m.user_id 
    WHERE u.firebase_user_id = $1`,
    [userId]
  );
  console.log(result.rows);
  return result.rows;
}

// streak - stretch goal

// pet age - stretch goal
// export async function getPetAge(userId) {
//   console.log(userId);
//   const dateOfBirth = await query(
//     `SELECT pet_birth_date
//     FROM pets AS p
//     LEFT JOIN users AS u
//     ON u.user_id = p.user_id
//     WHERE u.firebase_user_id = $1;`,
//     [userId]
//   );
//   const age = dateOfBirth.rows[0].pet_birth_date;
//   console.log(age);
//   console.log(typeof age);
// }
