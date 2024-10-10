const mongoose = require("mongoose");

const postSchema = new mongoose.Schema({
    image: {
        type: String,
    },
    caption: {
        type: String,
        required: true
    },
    author: {
        type: mongoose.Schema.Types.ObjectId,
        required: true
    }
}, {timestamps: true})

const Post = mongoose.model("Post", postSchema);

module.exports = Post;