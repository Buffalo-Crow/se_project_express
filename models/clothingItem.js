const mongoose = require("mongoose");
const validator = require('validator');

const clothingItemSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    minlength: 2,
    maxlength: 30,
  },
  weather: {
    type: String,
    enum: ["hot", "warm", "cold"],
    required: [true, "This field is required"]
  },
  imageUrl: {
    type: String,
    required: [true, "This field is required"],
    validate: {
      validator(value) {
        return validator.isURL(value);
      },
      message: "You must enter a valid URL",
    },
  },

  owner: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: "user",
  },
  likes: [{ type: mongoose.Schema.Types.ObjectId, ref: "user" }],

  createdAt: {
    type: Date,
    required: true,
    default: Date.now
  },
});

module.exports = mongoose.model ("items", clothingItemSchema);
