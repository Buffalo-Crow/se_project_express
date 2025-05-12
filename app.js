const express = require("express");

const app = express();
const { PORT = 3001 } = process.env;

const mongoose = require("mongoose");
const cors = require("cors");
const helmet = require("helmet");
const mainRouter = require("./routes/index");

mongoose
  .connect("mongodb://127.0.0.1:27017/wtwr_db")
  .then(() => {
    console.log("Connected to DB");
  })
  .catch(console.error);

app.use(express.json());

app.use(cors());

app.use(helmet());

app.use("/", mainRouter);

module.exports = app;

app.listen(PORT, () => {
  console.log(`the app is listening on the ${PORT}`);
});
