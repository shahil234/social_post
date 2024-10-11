const mongoose = require("mongoose");

const postSchema = new mongoose.Schema(
  {
    image: {
      type: String,
    },
    caption: {
      type: String,
      required: true,
    },
    author: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    likes: {
      type: Number,
      default: 0,
      min: 0,
    },
    comments: [
      {
        commentText: String,
        userId: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "User",
        }
      },
    ],
  },
  { timestamps: true }
);

const Post = mongoose.model("Post", postSchema);

module.exports = Post;
