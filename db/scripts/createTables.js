import { query } from "../index.js";

//*************** Users Table ***********************//
const sqlUsersTableString = `CREATE TABLE IF NOT EXISTS users (
        user_id INT GENERATED ALWAYS AS IDENTITY,
        username VARCHAR(32) NOT NULL,
        firebase_user_id TEXT NOT NULL,
        join_date DATE NOT NULL,
        PRIMARY KEY(user_id)
    );
`;

async function createUsersTable() {
  const res = await query(sqlUsersTableString);
  console.log(`${res.command} Created users table`);
}

//*************** Pet Table ***********************//
const sqlPetTableString = `CREATE TABLE IF NOT EXISTS pets (
    pet_id INT GENERATED ALWAYS AS IDENTITY,
    pet_name VARCHAR(32) NOT NULL,
    user_id INT NOT NULL,
    pet_birth_date DATE NOT NULL, 
    pet_meditation_total INT,     
    PRIMARY KEY(pet_id),
    FOREIGN KEY(user_id)
        REFERENCES users(user_id)
        ON DELETE CASCADE);
`;

async function createPetsTable() {
  const res = await query(sqlPetTableString);
  console.log(`${res.command} Created pets table`);
}

//*************** Meditation Log ***********************//
const sqlMeditationTableString = `CREATE TABLE IF NOT EXISTS meditation_log (
    meditation_id INT GENERATED ALWAYS AS IDENTITY,
    pet_id INT NOT NULL,
    user_id INT NOT NULL,
    date DATE NOT NULL,
    meditation_length INT NOT NULL,
    streak_days INT,     
    PRIMARY KEY(meditation_id),
    FOREIGN KEY(user_id)
        REFERENCES users(user_id)
        ON DELETE CASCADE,
    FOREIGN KEY(pet_id)
        REFERENCES pets(pet_id)
        ON DELETE CASCADE);
`;

async function createMeditationTable() {
  const res = await query(sqlMeditationTableString);
  console.log(`${res.command} Created meditation log table`);
}

//*************** Mood Log  ***********************//
const sqlMoodLogString = `CREATE TABLE IF NOT EXISTS mood_log (
    mood_log_id INT GENERATED ALWAYS AS IDENTITY,
    user_id INT NOT NULL,
    date DATE,
    mood_rating INT,
    PRIMARY KEY(mood_log_id),
    FOREIGN KEY(user_id)
        REFERENCES users(user_id)
        ON DELETE CASCADE);
`;

async function createMoodLogTable() {
  const res = await query(sqlMoodLogString);
  console.log(`${res.command} Created mood log table`);
}

//*********************** Calling all functions for script ***********************//
await createUsersTable();
await createPetsTable();
await createMeditationTable();
await createMoodLogTable();
