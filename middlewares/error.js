const { INTERNAL_SERVER_ERROR } = require("../utils/errors");

function errorHandler(err, req, res, next) {
  console.error(err);

  const { statusCode = INTERNAL_SERVER_ERROR, message } = err;
  res.status(statusCode).send({
    message:
      statusCode === INTERNAL_SERVER_ERROR
        ? "An error has occurred on the server"
        : message,
  });
}
module.exports = errorHandler;
// This middleware handles errors in the Express application.
