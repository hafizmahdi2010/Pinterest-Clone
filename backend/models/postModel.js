var mongoose = require('mongoose');

mongoose.connect("mongodb://127.0.0.1:27017/pinterestClone");

const likesSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User"
  },
  date: {
    type: Date,
    default: Date.now
  }
})

var commentsSchema = new mongoose.Schema({
  username: String,
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User"
  },
  comment: String,
  date: {
    type: Date,
    default: Date.now
  }
})

const postSchema = new mongoose.Schema({
  title: String,
  desc: String,
  img: String,
  likes: [likesSchema],
  comments: [commentsSchema],
  date: {
    type: Date,
    default: Date.now
  },
  uploadedBy: String
});

const Post = mongoose.model("Post", postSchema);

module.exports = Post;