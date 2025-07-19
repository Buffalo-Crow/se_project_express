const { JWT_SECRET = "development-secret-key" } = process.env;

module.exports = JWT_SECRET;
