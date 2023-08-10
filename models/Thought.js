const { Schema, model } = require("mongoose");
const reactionSchema = require("./Reaction");

// Schema to create a user model
const userSchema = new Schema(
  {
    userText: {
      type: String,
      required: true,
    },
    userName: {
      type: String,
      required: true,
    },
    createdAt: {
      type: Date,
      default: Date.now(),
    },

    reactions: [reactionSchema],
  },
  {
    toJSON: {
      virtuals: true,
    },
    id: false,
  }
);

const User = model("user", userSchema);

module.exports = User;
