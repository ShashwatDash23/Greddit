const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const validator = require("validator");

const commentSchema = new mongoose.Schema({
  content: {
    type: String,
    required: true,
  },
  partOfPost: {
    type: String,
    required: true,
  },
  user: {
    type: String,
    required: true,
  },
});

const Comment = mongoose.model("comment", commentSchema);

module.exports = Comment;
