const jwt = require("jsonwebtoken");
const { UnauthorizedError } = require("../utils/errorClasses/unauthorized");
const JWT_SECRET = require("../utils/config");

const tokenAuthorization = (req, res, next) => {
  const { authorization } = req.headers;

  if (!authorization || !authorization.startsWith("Bearer")) {
    return next(new UnauthorizedError("Authorization header is required"));
  }
  const token = authorization.replace("Bearer ", "");
  let payload;

  try {
    payload = jwt.verify(token, JWT_SECRET);
  } catch (err) {
    if (err instanceof jwt.JsonWebTokenError) {
      return next(new UnauthorizedError("Invalid token"));
    }
    return next(err);
  }

  req.user = payload;
  return next();
};

module.exports = tokenAuthorization;
