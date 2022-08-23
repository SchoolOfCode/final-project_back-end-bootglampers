import { query } from "../db/index.js";

//************** Get all stats **********/
export async function getTotalVisits(userId) {
  // console.log("hello");
  const result = await query(
    `SELECT total_visits FROM users
    WHERE firebase_user_id = $1;`,
    [userId]
  );
  if (result.rows.length === 0) {
    return 0;
  }
  const totalVisits = Number(result.rows[0].total_visits);
  return totalVisits;
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
  if (result.rows.length === 0) {
    return 0;
  }
  const totalMeditationTime = Number(result.rows[0].total_meditation_time);
  return totalMeditationTime;
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
  if (result.rows.length === 0) {
    return 0;
  }
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
  if (result.rows.length === 0) {
    return 0;
  }
  const averageMood = Number(result.rows[0].average_overall_mood);
  return averageMood;
}

// streak
export async function getStreak(userId) {
  const result = await query(
    `SELECT m.date, m.streak_days
    FROM meditation_log AS m
    LEFT JOIN users AS u
    ON u.user_id = m.user_id
    WHERE u.firebase_user_id = $1
    ORDER BY m.streak_days ASC
    LIMIT 1;`,
    [userId]
  );
  if (result.rows.length === 0) {
    return 0;
  }
  const streak = Number(result.rows[0].streak_days);
  return streak;
}

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
