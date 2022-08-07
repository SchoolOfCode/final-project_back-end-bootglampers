import { query } from "../db/index.js";

//************** Get all stats **********/
// paramater of userid
// visits
export async function getTotalVisits(req) {
  const userId = `'${req.firebaseId}'`;
  // CNXBkvXJbxUjh5bOxk8NN2DV2l72
  console.log(userId);
  const result = await query(
    `
        SELECT total_visits FROM users
        WHERE firebase_user_id = $1;
    `,
    [userId]
  );
  return result.rows;
}

// total meditation time

// streak

// pet age

// mood log
