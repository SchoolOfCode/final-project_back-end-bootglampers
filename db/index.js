import pg from "pg";
import { db } from "../config/index.js";

const pool = new pg.Pool({
  connectionString: db.DATABASE_URL,
  ssl: {
    rejectUnauthorized: false,
  },
});

export function query(text, params, callback) {
  return pool.query(text, params, callback);
}
