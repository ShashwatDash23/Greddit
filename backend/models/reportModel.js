const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const validator = require("validator");

const reportSchema = new mongoose.Schema({
  reportedBy: {
    type: String,
    required: true,
  },
  reportedUser: {
    type: String,
    required: true,
  },
  concern: {
    type: String,
    required: true,
  },
  textOfReportedPost: {
    type: String,
  },
  blockedUser: {
    type: String,
  },
  isIgnored: {
    type: Boolean,
  },
  isBlocked: {
    type: Boolean, 
  }
});

const Report = mongoose.model("report", reportSchema);

module.exports = Report;
