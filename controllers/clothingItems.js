const ClothingItem = require("../models/clothingItem");
const {
  CREATED,
  internalErrorHelper,
  responseHandler,
  castErrorHandler,
  BAD_REQUEST,
  SUCCESS,
  NOT_FOUND,
  FORBIDDEN,
} = require("../utils/errors");

const getItems = (req, res) => {
  ClothingItem.find({})
    .then((items) => res.status(SUCCESS).send(items))
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
        return res.status(BAD_REQUEST).send({ message: err.message });
      }
      return internalErrorHelper(err, res);
    });
};

const deleteItem = (req, res) => {
  const { itemId } = req.params;
  ClothingItem.findById(itemId)
    .then((item) => {
      if (!item) {
        return res.status(NOT_FOUND).send({ message: "Item not found" });
      }
      if (!item.owner.equals(req.user._id)) {
        return res
          .status(FORBIDDEN)
          .send({ message: "You do not have permission to delete this item" });
      }
      return item.deleteOne().then(() => {
        res.status(SUCCESS).send({message: "Item successfully deleted"})
      });
    })
    .catch((err) => {
      if(err.name === "CastError"){
        return castErrorHandler(err,res);
      }
      return internalErrorHelper(err,res);
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
