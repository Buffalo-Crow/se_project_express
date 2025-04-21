const express = require("express");

const app = express();
const { PORT = 3001 } = process.env;

const mongoose = require("mongoose");
const mainRouter = require("./routes/index");


mongoose
  .connect("mongodb://127.0.0.1:27017/wtwr_db")
  .then(() => {
    console.log("Connected to DB");
  })
  .catch(console.error);

app.use(express.json());

app.use((req,res,next) => {
  req.user = {
    _id: '68066f00ad27fa26741d8b03'
  };
    next();
});

app.use("/", mainRouter);



app.listen(PORT, () => {
  console.log(`the app is listening on the ${PORT}`);
});
