import express from "express";
import cors from "cors";
import logger from "morgan";
import statsRouter from "./routes/statsPage.js";
import moodRouter from "./routes/moodLoggerPage.js";
import registrationRouter from "./routes/registrationPage.js";
import meditationRouter from "./routes/meditationPage.js";
import petNameRouter from "./routes/petNamingPage.js";
import petIdRouter from "./routes/getPetId.js";

const app = express();

const corsOptions = {
  origin: ["https://medi-mate.netlify.app/", "http://localhost:19006/"],
  credentials: true,
  optionsSuccessStatus: 200,
  allowedHeaders: "",
};

app.use(logger("dev"));
app.use(cors(corsOptions));
app.options("*", cors());
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
app.use("/pet-id", petIdRouter);

export default app;
