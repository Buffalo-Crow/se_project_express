const express = require("express");

const app = express();

const { PORT = 3000 } = process.env;

app.listen(PORT, () => {
  console.log(`the app is listening on the ${PORT}`);
});

mongoose.connect("mongodb://127.0.0.1:27017/wtwr_db");
