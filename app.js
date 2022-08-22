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

//example
// module.exports = (req, res, next) => {
//   if (req.url === '/favicon.ico') {
//     res.type('image/x-icon');
//     res.status(301);
//     res.end();
//     return;
//   }
//   next();
// };

app.get("/favicon.ico", function (req, res) {
  res.type('image/x-icon');
  res.status(301);
  res.end();
  return;
})

// // routes
app.use("/stats", statsRouter);
app.use("/mood-log", moodRouter);
app.use("/registration", registrationRouter);
app.use("/meditation", meditationRouter);
app.use("/register-pet", petNameRouter);
app.use("/pet-id", petIdRouter);

export default app;
