import { query } from "../index.js";

async function dropTables() {
  const res = await query(`
        DROP TABLE IF EXISTS users, pets, meditation_log, mood_log CASCADE;
        `);
  console.log(`${res.command}  all tables deleted from database.`);
}

dropTables();
