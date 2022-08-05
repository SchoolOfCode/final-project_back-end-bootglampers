import express from "express";
import cors from "cors";
import logger from "morgan";

const app = express();

app.use(logger("dev"));
app.use(cors());
app.use(express.json());

//test route
app.get("/", function (req, res) {
  res.json({
    success: true,
    message: "Test route up and running!",
  });
});

//routes

const router = express.Router();
router.get("/", async (req, res) => {
  const data = await pool.query("SELECT * FROM users;");
  const res = data.rows;
  res.json({ success: true, payload: data });
});

export default app;
