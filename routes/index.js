const router = require("express").Router();

const userRouter = require("./users");
const clothingItems = require("./clothingItems");
const { NotFoundError } = require("../utils/errorClasses/notFound");
const login = require("../controllers/auth");
const { createUser } = require("../controllers/users");
const {
  validateUserBody,
  validateLogin,
} = require("../middlewares/validation");

router.use("/crash-test", () => {
  setTimeout(() => {
    throw new Error("Server will crash now");
  }, 0);
});

router.post("/signin", validateLogin, login);
router.post("/signup", validateUserBody, createUser);
router.use("/users", userRouter);
router.use("/items", clothingItems);

router.use((req, res, next) => {
  next(new NotFoundError("Requested resource not found"));
});

module.exports = router;
