const mongoose = require("mongoose");

mongoose.connect("mongodb://127.0.0.1:27017/pinterestClone");

const userSchema = new mongoose.Schema({
  username: String,
  name: String,
  email: String,
  password: String,
  date: {
    type: Date,
    default: Date.now
  },
  isBlocked: {
    type: Boolean,
    default: false
  }
});

const User = mongoose.model("User", userSchema);

module.exports = User;