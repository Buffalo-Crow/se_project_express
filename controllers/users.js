
const bcrypt = require("bcryptjs");
const User = require("../models/user");
const {
  BAD_REQUEST,
  NOT_FOUND,
  CREATED,
  internalErrorHelper,
  INTERNAL_SERVER_ERROR,
  CONFLICT,
  castErrorHandler,
  SUCCESS,
} = require("../utils/errors");


const getUsers = (req, res) => {
  User.find({})
    .then((users) => res.send(users))
    .catch((err) => {
      internalErrorHelper(err, res);
    });
};

const getCurrentUser = (req, res) => {
  const { userId } = req.user;
  User.findById(userId)
    .orFail()
    .then((user) => res.status(200).send(user))
    .catch((err) => {
      console.error(err);
      if (err.name === "CastError") {
        return res.status(BAD_REQUEST).send({ message: "Invalid Id format" });
      }
      if (err.name === "DocumentNotFoundError") {
        return res
          .status(NOT_FOUND)
          .send({ message: "This document was not found" });
      }
      return internalErrorHelper(err, res);
    });
};

const createUser = (req, res) => {
  const { name, avatar, email, password } = req.body;
  bcrypt
    .hash(password, 10)
    .then((hash) => User.create({ name, avatar, email, password: hash }))
    .then((user) => {
      const userResponse = {
        name: user.name,
        avatar: user.avatar,
        email: user.email,
        _id: user._id,
      }
      res.status(CREATED).send(userResponse);
    })
    .catch((err) => {
      if (err.name === "ValidationError") {
        return res.status(BAD_REQUEST).json({ message: "Invalid Request" });
      }
      if (err.code === 11000) {
        return res
          .status(CONFLICT)
          .json({ message: "This email already exists" });
      }
      return res
        .status(INTERNAL_SERVER_ERROR)
        .json({ message: "An error has occurred on the server" });
    });
};

const updateUserProfile = (req, res) => {
  const { name, avatar } = req.body;
  const { userId } = req.user;

  User.findByIdAndUpdate(
    userId,
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
        return res.status(BAD_REQUEST).send({ message: "Invalid Request" });
      }
      if (err.name === "CastError") {
        return castErrorHandler(err, res);
      }
      if (err.name === "DocumentNotFoundError") {
        return res.status(NOT_FOUND).send({ message: "Item not found" });
      }
      return internalErrorHelper(err, res);
    });
};

module.exports = { getUsers, getCurrentUser, createUser, updateUserProfile };
