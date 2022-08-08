import express from "express";
import cors from "cors";
import logger from "morgan";
import statsRouter from "./routes/statsPage.js";

const app = express();

app.use(logger("dev"));
app.use(cors());
app.use(express.json());

// //test route
app.get("/", function (req, res) {
  res.json({
    success: true,
    message: "Test route up and running!",
  });
});

// // routes
app.use("/stats", statsRouter);

export default app;
