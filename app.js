const express = require("express");

const app = express();

const { PORT = 3000 } = process.env;

const mainRouter = require("./routes/index");

mongoose
  .connect("mongodb://127.0.0.1:27017/wtwr_db")
  .then(() => {
    console.log("Connected to DB");
  })
  .catch(console.error);

app.use("/", mainRouter);

app.listen(PORT, () => {
  console.log(`the app is listening on the ${PORT}`);
});
