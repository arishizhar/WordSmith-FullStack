require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const path = require("path");
const cookieParser = require("cookie-parser");
const app = express();

const { logger, logEvents } = require("./middleware/logger");
const errorHandler = require("./middleware/errorHandler");

const PORT = process.env.PORT || 5001;

// Middleware
app.use(logger);
app.use(express.json());
// app.use(cors());
app.use(cookieParser);
const connectDB = require("./config/dbConnection");
const cookieParser = require("cookie-parser");
app.use(errorHandler);

app.use("/user", require("./routes/userRoutes"));

mongoose.connection.once("open", () => {
  console.log("connected to mongoDB");
  app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
});

mongoose.connection.on("error", (err) => {
  console.log(err);
  logEvents(
    `${err.no}:${err.code}\t${err.syscal}\t${err.hostname}`,
    "mongoErrLog.log"
  );
});
