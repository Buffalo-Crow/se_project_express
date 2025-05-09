const router = require("express").Router();
const { getCurrentUser, updateUserProfile } = require("../controllers/users");
const tokenAuthorization = require("../middlewares/auth");

router.get("/me", tokenAuthorization, getCurrentUser);
router.patch("/me" , tokenAuthorization, updateUserProfile);

module.exports = router;
