const { exit } = require("process");
const mongoose = require("mongoose");

const app = require("./app.js");

const start = async () => {
  const mongoUri = process.env.MONGO_URI;
  mongoose.connect(mongoUri, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true,
  });

  mongoose.connection.on("connected", () => {
    console.log("Connected to MongoDB");
  });

  mongoose.connection.on("error", (err) => {
    console.error("Error connecting to MongoDB", err);
    exit(1);
  });

  const PORT = process.env.port || 3001;
  app.listen(PORT, () =>
    console.log(`Service started on port ${PORT} at ${new Date()}`)
  );
};

start();
