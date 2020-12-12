const mongoose = require("mongoose");
require("dotenv").config();
const url = process.env.URL;
mongoose.connect(url, {
  useNewUrlParser: true,
  useFindAndModify: false,
  useUnifiedTopology: true,
});

const db = mongoose.connection;

db.once("open", () => console.log("connected to the database"));
db.on("error", console.error.bind(console, "MongoDB connection error:"));
mongoose.Promise = global.Promise;
