import express from "express";
import cors from "cors";
import logger from "morgan";
import statsRouter from "./routes/statsPage.js";
import moodRouter from "./routes/moodLoggerPage.js";
import registrationRouter from "./routes/registrationPage.js";
import meditationRouter from "./routes/meditationPage.js";
import petNameRouter from "./routes/petNamingPage.js";

const app = express();

var corsOptions = {
  origin: ["http://localhost:19006/", "https://medi-mate.netlify.app/"],
  credentials: true,
};

app.use(logger("dev"));
app.use(cors(corsOptions));
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
app.use("/mood-log", moodRouter);
app.use("/registration", registrationRouter);
app.use("/meditation", meditationRouter);
app.use("/register-pet", petNameRouter);

export default app;
