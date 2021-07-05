const express = require("express");
const winston = require("winston");
const expressWinston = require("express-winston");
const helmet = require("helmet");
const cors = require("cors");

// Dotenv config
require("dotenv").config();

// Models
require("./models/note");

// Routes
const notesRoute = require("./routes/notes-route");

const app = express();

app.use(cors());
app.use(express.json());
app.use(helmet());
app.use(
  expressWinston.logger({
    transports: [new winston.transports.Console()],
    format: winston.format.combine(winston.format.json()),
    meta: true,
    msg: "HTTP {{req.method}} {{req.url}}",
    expressFormat: true,
    colorize: false,
    headerBlacklist: ["authorization"],
  })
);

// Use routes
app.use(notesRoute);

module.exports = app;
