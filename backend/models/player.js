const mongoose = require("mongoose");

const playerSchema = new mongoose.Schema(
  {
    FirstName: {
      type: String,
      required: true,
    },
    LastName: {
      type: String,
      required: true,
    },
    BirthDate: {
      type: Date,
      required: true,
    },
    Address: {
      type: String,
      required: true,
    },
    Phone: {
      type: Number,
      required: true,
    },
    Group: {
      type: String,
      required: true,
    },
    user: {
      type: String,
      required: true,
    },
    coatch: {
      type: String,
      default: "maher gmamdia",
    },
  },
  {
    timestamps: true,
  }
);

const User = mongoose.model("Player", playerSchema);

module.exports = User;
