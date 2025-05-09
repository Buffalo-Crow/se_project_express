const router = require("express").Router();
const {
  getItems,
  postItem,
  deleteItem,
  likeItem,
  dislikeItem,
} = require("../controllers/clothingItems");
const tokenAuthorization = require("../middlewares/auth");

router.get("/", getItems);
router.post("/", tokenAuthorization, postItem);
router.delete("/:itemId", tokenAuthorization, deleteItem);
router.put("/:itemId/likes", tokenAuthorization, likeItem);
router.delete("/:itemId/likes", tokenAuthorization, dislikeItem);

module.exports = router;
