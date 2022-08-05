import pg from "pg";
import { db } from "../config/config.js";

const pool = new pg.Pool({
  db,
  ssl: { rejectUnauthorized: false },
});

function poolEnvVarCheck() {
  if (typeof process.env.DATABASE_URL === "undefined") {
    console.log("Some or all enivronment variables missing in Pool");
  }
  console.log("credentials are working");
  console.log(pool.DATABASE_URL);
  console.log(db.DATABASE_URL);
  console.log(db);
  console.log(pool);
}

export function query(text, params, callback) {
  return pool.query(text, params, callback);
}

poolEnvVarCheck();
