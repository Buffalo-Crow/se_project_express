const { Joi, celebrate } = require("celebrate");
const validator = require("validator");

const validateUrl = (value, helpers) => {
  if (!validator.isURL(value)) {
    return value;
  }
  return helpers.error("string.uri");
};

const validateClothingItem = celebrate({
  body: Joi.object().keys({
    name: Joi.string().required().min(2).max(30).messages({
      "string.min": 'The minimum length of the "name" field is 2',
      "string.max": 'The maximum length of the "name" field is 30',
      "string.empty": 'The "name" field must be filled in',
    }),
    weather: Joi.string().required().valid("hot", "cold", "rainy").messages({
      "any.only": 'The "weather" field must be one of: hot, cold, rainy',
      "string.empty": 'The "weather" field must be filled in',
    }),
    imageUrl: Joi.string()
      .required()
      .custom(validateUrl, "URL validation")
      .messages({
        "string.empty": 'The "imageUrl" field must be filled in',
        "string.uri": 'the "imageUrl" field must be a valid url',
      }),
  }),
});

const validateUserBody = celebrate({
  body: Joi.object().keys({
    name: Joi.string().required().min(2).max(30).messages({
      "string.min": 'The minimum length of the "name" field is 2',
      "string.max": 'The maximum length of the "name" field is 30',
    }),
    avatar: Joi.string().required().custom(validateUrl).messages({
      "string.empty": 'The "avatar" field must be filled in',
      "string.uri": 'the "avatar" field must be a valid url',
    }),
    email: Joi.string().required().email().messages({
      "string.empty": 'The "email" field must be filled in',
      "string.email": 'The "email" field must be a valid email address',
    }),
    password: Joi.string().required().messages({
      "string.empty": 'The "password" field must be filled in',
    }),
  }),
});
const validateLogin = celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().email().messages({
      "string.empty": 'The "email" field must be filled in',
      "string.email": 'The "email" field must be a valid email address',
    }),
    password: Joi.string().required().messages({
      "string.empty": 'The "password" field must be filled in',
    }),
  }),
});

const validateUserId = celebrate({
  params: Joi.object().keys({
    itemId: Joi.string().required().hex().length(24).messages({
      "string.hex": 'The "itemId" field must be a valid hex string',
      "string.length": 'The "itemId" field must be 24 characters long',
    }),
    userId: Joi.string().required().hex().length(24).messages({
      "string.hex": 'The "userId" field must be a valid hex string',
      "string.length": 'The "userId" field must be 24 characters long',
      "string.empty": 'The "userId" field must be filled in',
    }),
  }),
});

module.exports = {
  validateClothingItem,
  validateUserBody,
  validateLogin,
  validateUserId,
};
