const jwt = require("jsonwebtoken");
const User = require("../models/user");
const { SUCCESS, UNAUTHORIZED } = require("../utils/errors");

const { JWT_SECRET }  = require("../utils/config");

const login = (req, res) => {
  const { email, password } = req.body;
  return User.findUserByCredentials(email, password)
    .then((user) => {
      const token = jwt.sign({_id: user._id}, JWT_SECRET, {
        expiresIn: "7d",
      });
      return res.status(SUCCESS).send({ token });
    })
    .catch((err) => {
      console.error(err);
      res.status(UNAUTHORIZED).send({ message: err.message });
    });
};

module.exports = login;
