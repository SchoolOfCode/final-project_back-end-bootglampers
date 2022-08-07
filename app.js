import express from "express";
import cors from "cors";
import logger from "morgan";
// import { statsRouter } from "./routes/index.js";

const app = express();

app.use(logger("dev"));
app.use(cors());
app.use(express.json());

// // routes
// app.use("/stats", statsRouter);

// //test route
app.get("/", function (req, res) {
  res.json({
    success: true,
    message: "Test route up and running!",
  });
});

//routes

export default app;
