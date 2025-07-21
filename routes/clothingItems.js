const router = require("express").Router();
const {
  getItems,
  postItem,
  deleteItem,
  likeItem,
  dislikeItem,
} = require("../controllers/clothingItems");
const tokenAuthorization = require("../middlewares/auth");

const {
  validateClothingItem,
  validateUserId,
} = require("../middlewares/validation");

router.get("/", getItems);
router.post("/", tokenAuthorization, validateClothingItem, postItem);
router.delete("/:itemId", tokenAuthorization, validateUserId, deleteItem);
router.put("/:itemId/likes", tokenAuthorization, validateUserId, likeItem);
router.delete(
  "/:itemId/likes",
  tokenAuthorization,
  validateUserId,
  dislikeItem
);

module.exports = router;
