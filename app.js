const express = require("express");

const app = express();
const { PORT = 3001 } = process.env;

const mongoose = require("mongoose");
const cors = require("cors");
const helmet = require("helmet");
const mainRouter = require("./routes/index");
const errorHandler = require("./middlewares/error");
const { errors } = require("celebrate");
const { requestLogger, errorLogger } = require("./middlewares/logger");

mongoose
  .connect("mongodb://127.0.0.1:27017/wtwr_db")
  .then(() => {
    console.log("Connected to DB");
  })
  .catch(console.error);

app.use(express.json());

app.use(cors());

app.use(helmet());

app.use(requestLogger);
app.use("/", mainRouter);

app.use(errorLogger);
app.use(errors());

app.use(errorHandler);

module.exports = app;

app.listen(PORT, () => {
  console.log(`the app is listening on the ${PORT}`);
});
