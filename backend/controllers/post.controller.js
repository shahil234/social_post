const Post = require("../models/post.model");
const User = require("../models/user.model");

const uploadPost = async (req, res) => {
  try {
    const { userId } = req.user;
    const { uploadData } = req.body;
    if (!uploadData || !uploadData.caption) {
      return res.json({
        message: "Cannot upload an empty post",
      });
    }

    const newPost = await Post.create({
      caption: uploadData.caption,
      image: "",
      author: userId,
    });
    if (newPost) {
      await User.findByIdAndUpdate(userId, { $push: { posts: newPost._id } });
    }

    res.status(200).json({
      message: "Successfully uploaded post",
      data: [newPost],
    });
  } catch (error) {
    res.send("sorry");
  }
};

const DeletePost = async (req, res) => {
  try {
    const { id } = req.params;
    const { userId } = req.user;
    const user = await User.findOne({ _id: userId });

    if (!user.posts.includes(id)) {
      return res.json({
        message: "User doesn't has such post",
      });
    }

    const removedPost = await Post.findByIdAndDelete(id);
    if (!removedPost) {
      return res.json({
        message: "Unable to delte the post",
      });
    }
    await User.findByIdAndUpdate(userId, {
      $pull: { posts: removedPost._id },
    });
    res.status(200).json({
      message: "Successfully deleted the post",
      data: {
        removedPost,
      },
    });
  } catch (err) {
    res.json({ message: err.message });
  }
};

const getAllPost = async (req, res) => {
    try {
        const { id } = req.params;

        const user = await User.findById(id).populate('posts');
        if(!user) {
            return res.status(404).json({
                message: "Resources not available",
            })
        }

        res.status(200).json({
            message: "Successfully fetched post of user",
            success: true,
            data: [
                ...user.posts
            ]
        })
    } catch (error) {
        res.send("error")
    }
}
module.exports = { uploadPost, DeletePost, getAllPost };
