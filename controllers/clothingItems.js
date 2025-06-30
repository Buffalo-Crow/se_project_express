const ClothingItem = require("../models/clothingItem");
const { CREATED, SUCCESS } = require("../utils/errors");
const BadRequestError = require("../utils/errorClasses/badRequest");
const NotFoundError = require("../utils/errorClasses/notFound");
const ForbiddenError = require("../utils/errorClasses/forbidden");

const getItems = (req, res, next) => {
  ClothingItem.find({})
    .then((items) => res.status(SUCCESS).send(items))
    .catch(next);
};

// refactored
const postItem = (req, res, next) => {
  console.log(req.user._id);
  const { name, weather, imageUrl } = req.body;
  const owner = req.user._id;
  ClothingItem.create({ name, weather, imageUrl, owner })
    .then((item) => {
      res.status(CREATED).send(item);
    })
    .catch((err) => {
      console.error(err);
      if (err.name === "ValidationError") {
        next(new BadRequestError("Invalid data provided"));
      } else {
        next(err);
      }
    });
};

// halfway refactored SUCCESS still used
const deleteItem = (req, res, next) => {
  const { itemId } = req.params;
  ClothingItem.findById(itemId)
    .then((item) => {
      if (!item) {
        return next(new NotFoundError("Item not found"));
      }
      if (!item.owner.equals(req.user._id)) {
        return next(
          new ForbiddenError("You do not have permission to delete this item")
        );
      }
      return item.deleteOne().then(() => {
        res.status(SUCCESS).send({ message: "Item successfully deleted" });
      });
    })
    .catch((err) => {
      console.error(err);
      if (err.name === "CastError") {
        next(new BadRequestError("Invalid item ID format"));
      } else {
        next(err);
      }
    });
};

// refactord with class errors
const likeItem = (req, res, next) => {
  const { itemId } = req.params;
  ClothingItem.findByIdAndUpdate(
    itemId,
    { $addToSet: { likes: req.user._id } },
    { new: true }
  )
    .then((item) => {
      if (!item) {
        return next(new NotFoundError("Item not found"));
      }
      return res.status(SUCCESS).send(item);
    })
    .catch((err) => {
      console.error(err);
      if (err.name === "CastError") {
        return next(new BadRequestError("Invalid item ID format"));
      }
      return next(err);
    });
};

// refactored with class errors
const dislikeItem = (req, res, next) => {
  const { itemId } = req.params;
  ClothingItem.findByIdAndUpdate(
    itemId,
    { $pull: { likes: req.user._id } },
    { new: true }
  )
    .then((item) => {
      if (!item) {
        return next(new NotFoundError("Item not found"));
      }
      return res.status(SUCCESS).send(item);
    })
    .catch((err) => {
      console.error(err);
      if (err.name === "CastError") {
        return next(new BadRequestError("Invalid item ID format"));
      }
      return next(err);
    });
};

module.exports = { getItems, postItem, deleteItem, likeItem, dislikeItem };
