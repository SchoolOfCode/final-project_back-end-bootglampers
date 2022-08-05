import { query } from "../index.js";

//*************** Populate Users Table ***********************//
async function populateUsersTable() {
  const res = await query(` 
  INSERT INTO users (username, firebase_user_id, join_date)
  VALUES
  ('chocorainaaa', 'CNXBkvXJbxUjh5bOxk8NN2DV2l72', CURRENT_DATE),
  ('lewis-signupstech', 'BNWd6NjltWZnnIPROdnSHaCNMKM2', CURRENT_DATE),
  ('emmma', 'jozQBkdav0h5mWbBk5qlwRqIxR52', CURRENT_DATE),
  ('lorentz', 'PsiAAIPYIhRXdzlPGMDy1xwvjKJ3', CURRENT_DATE);
  `);
}

//*************** Populate Pet Table ***********************/
async function populatePetTable() {
  const res = await query(` 
  INSERT INTO pets (pet_name, user_id, pet_birth_date, pet_meditation_total)
  VALUES 
  ('Wattson', '1', CURRENT_DATE, 0),
  ('Lewis pet', '2', CURRENT_DATE, 0),
  ('Emmas' pet', '3', CURRENT_DATE, 0),
  ('Lorentzs pet ', '4', CURRENT_DATE, 0); 
  `);
}

//*************** Populate Meditation Log ***********************//
async function populateMeditationTable() {
  const res = await query(` 
  INSERT INTO meditation_log (pet_id, user_id, date, meditation_length, streak_days)
  VALUES
  (1, 1, CURRENT_DATE, 120, 1),
  (2, 2, CURRENT_DATE, 180, 0),
  (3, 3, CURRENT_DATE, 220, 3),
  (4, 4, CURRENT_DATE, 260, 4);
  `);
}

//*************** Populate Mood Log  ***********************//
async function populateMoodLogTable() {
  const res = await query(` 
    INSERT INTO mood_log (user_id, date, mood_rating)
    VALUES
    (1, CURRENT_DATE, 2),
    (2, CURRENT_DATE, 3),
    (3, CURRENT_DATE, 4),
    (4, CURRENT_DATE, 5),
  
  ;`);
}

//*********************** Calling all functions for script ***********************//
await populateUsersTable();
await populatePetTable();
await populateMeditationTable();
await populateMoodLogTable();
