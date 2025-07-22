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
  validateItemId,
} = require("../middlewares/validation");

router.get("/", getItems);
router.post("/", tokenAuthorization, validateClothingItem, postItem);
router.delete("/:itemId", tokenAuthorization, validateItemId, deleteItem);
router.put("/:itemId/likes", tokenAuthorization, validateItemId, likeItem);
router.delete(
  "/:itemId/likes",
  tokenAuthorization,
  validateItemId,
  dislikeItem
);

module.exports = router;
