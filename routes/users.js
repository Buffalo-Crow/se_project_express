const router = require("express").Router();
const { getCurrentUser, updateUserProfile } = require("../controllers/users");
const tokenAuthorization = require("../middlewares/auth");

const { validateUserUpdate } = require("../middlewares/validation");

router.get("/me", tokenAuthorization, getCurrentUser);
router.patch("/me", tokenAuthorization, validateUserUpdate, updateUserProfile);

module.exports = router;
