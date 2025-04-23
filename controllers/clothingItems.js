const ClothingItem = require("../models/clothingItem");
const {
  CREATED,
  internalErrorHelper,
  responseHandler,
  castErrorHandler,
  BAD_REQUEST,
} = require("../utils/errors");

const getItems = (req, res) => {
  ClothingItem.find({})
    .then((items) => res.send(items))
    .catch((err) => {
      internalErrorHelper(err, res);
    });
};

const postItem = (req, res) => {
  console.log(req.user._id);
  const { name, weather, imageUrl } = req.body;
  const owner = req.user._id;
  ClothingItem.create({ name, weather, imageUrl, owner })
    .then((item) => {
      res.status(CREATED).send(item);
    })
    .catch((err) => {
      if (err.name === "ValidationError") {
        res.status(BAD_REQUEST).send({ message: err.message });
      }
      return internalErrorHelper(err, res);
    });
};

const deleteItem = (req, res) => {
  const { itemId } = req.params;
  ClothingItem.findByIdAndDelete(itemId)
    .then((item) => {
      responseHandler(res, item);
    })
    .catch((err) => {
      castErrorHandler(err, res);
    });
};

const likeItem = (req, res) => {
  const { itemId } = req.params;
  ClothingItem.findByIdAndUpdate(
    itemId,
    { $addToSet: { likes: req.user._id } },
    { new: true }
  )
    .then((item) => {
      responseHandler(res, item);
    })
    .catch((err) => {
      castErrorHandler(err, res);
    });
};

const dislikeItem = (req, res) => {
  const { itemId } = req.params;
  ClothingItem.findByIdAndUpdate(
    itemId,
    { $pull: { likes: req.user._id } },
    { new: true }
  )
    .then((item) => {
      responseHandler(res, item);
    })
    .catch((err) => {
      castErrorHandler(err, res);
    });
};

module.exports = { getItems, postItem, deleteItem, likeItem, dislikeItem };
