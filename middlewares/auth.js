const jwt = require("jsonwebtoken");
const { UNAUTHORIZED, internalErrorHelper } = require("../utils/errors");
const JWT_SECRET = require("../utils/config");

const tokenAuthorization = (req, res, next) => {
  const { authorization } = req.headers;

  if (!authorization || !authorization.startsWith("Bearer")) {
    return res
      .status(UNAUTHORIZED)
      .send({ message: "Authorization header is required" });
  }
  const token = authorization.replace("Bearer ", "");
  let payload;

  try {
    payload = jwt.verify(token, JWT_SECRET);
  } catch (err) {
    if (err instanceof jwt.JsonWebTokenError) {
      return res.status(UNAUTHORIZED).send({ message: "Invalid token" });
    }
    return internalErrorHelper(err, res);
  }

  req.user = payload;

  return next();
};

module.exports = tokenAuthorization;
