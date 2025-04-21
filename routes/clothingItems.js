const router = require('express').Router();
const {getItems, postItem, deleteItem,likeItem, dislikeItem} = require('../controllers/clothingItems');


router.get('/items',getItems);
router.post("/items",postItem);
router.delete("/items/:itemId", deleteItem);
router.put("/items/:itemId/likes", likeItem);
router.delete("/items/:itemId/likes", dislikeItem);

module.exports =router;


