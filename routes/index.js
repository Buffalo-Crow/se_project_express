const router = require("express").Router();

const userRouter = require("./users");
const clothingItems = require("./clothingItems");
const { NOT_FOUND } = require("../utils/errors");
const login = require("../controllers/auth");
const { createUser } = require("../controllers/users");

app.get("/crash-test", () => {
  setTimeout(() => {
    throw new Error("Server will crash now");
  }, 0);
});

router.post("/signin", login);
router.post("/signup", createUser);
router.use("/users", userRouter);
router.use("/items", clothingItems);

router.use((req, res) => {
  res.status(NOT_FOUND).send({ message: "Requested resource not found" });
});

module.exports = router;
