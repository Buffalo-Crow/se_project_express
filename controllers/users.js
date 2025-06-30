const bcrypt = require("bcryptjs");
const User = require("../models/user");
const { CREATED, SUCCESS } = require("../utils/errors");
const BadRequestError = require("../utils/errorClasses/badRequest");
const NotFoundError = require("../utils/errorClasses/notFound");
const ConflictError = require("../utils/errorClasses/conflict");

const getCurrentUser = (req, res, next) => {
  const { _id: userId } = req.user;
  User.findById(userId)
    .orFail()
    .then((user) => res.status(SUCCESS).send(user))
    .catch((err) => {
      console.error(err);
      if (err.name === "CastError") {
        return next(new BadRequestError("Invalid user ID format"));
      }
      if (err.name === "DocumentNotFoundError") {
        return next(new NotFoundError("User not found"));
      }
      return next(err);
    });
};

const createUser = (req, res, next) => {
  const { name, avatar, email, password } = req.body;
  if (!email || !password) {
    next(new BadRequestError("Email and password are required"));
    return;
  }
  bcrypt
    .hash(password, 10)
    .then((hash) => User.create({ name, avatar, email, password: hash }))
    .then((user) => {
      const userObject = user.toObject();
      delete userObject.password;
      res.status(CREATED).send(userObject);
    })
    .catch((err) => {
      console.error(err);
      if (err.name === "ValidationError") {
        return next(new BadRequestError("Invalid Request"));
      }
      if (err.code === 11000) {
        return next(new ConflictError("Email already exists"));
      }
      return next(err);
    });
};

const updateUserProfile = (req, res, next) => {
  const { name, avatar } = req.body;

  User.findByIdAndUpdate(
    req.user._id,
    { name, avatar },
    { new: true, runValidators: true }
  )
    .orFail()
    .then((user) => {
      res.status(SUCCESS).send({ data: user });
    })
    .catch((err) => {
      console.error(err);
      if (err.name === "ValidationError") {
        return next(new BadRequestError("Invalid data provided"));
      }
      if (err.name === "CastError") {
        return next(new BadRequestError("Invalid user ID format"));
      }
      if (err.name === "DocumentNotFoundError") {
        return next(new NotFoundError("User not found"));
      }
      return next(err);
    });
};

module.exports = { getCurrentUser, createUser, updateUserProfile };
