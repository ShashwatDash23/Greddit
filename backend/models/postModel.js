const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const validator = require("validator");

const postSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    unique: true
  },
  content: {
    type: String,
    required: true,
  },
  partOfSubgreddit: {
    type: String,
    required: true,
  },
  author: {
    type: String,
    required: true,
  },
  upvotes: {
    type: Array,
  },
  downvotes: {
    type: Array,
  },
  Comments: {
    type: Array,
  },
  isComment: {
    type: Boolean,
    required: true,
  },
  reports: {
    type: Array,
  },
  isUserBlocked: {
    type: Boolean,
  }
});

const Post = mongoose.model("post", postSchema);

module.exports = Post;
