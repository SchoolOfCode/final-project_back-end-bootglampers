import pg from "pg";

const pool = new pg.Pool({
  DATABASE_URL: process.env.DATABASE_URL,
  ssl: { rejectUnauthorized: false },
});

function poolEnvVarCheck() {
  if (typeof process.env.DATABASE_URL === "undefined") {
    console.log("Some or all enivronment variables missing in Pool");
  }
  console.log("credentials are working");
}

export function query(text, params, callback) {
  return pool.query(text, params, callback);
}

poolEnvVarCheck();
