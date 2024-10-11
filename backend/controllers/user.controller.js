const User = require("../models/user.model");

const sendFriendRequest = async (req, res) => {
  try {
    const { receiverId } = req.params;
    const { userId } = req.user;

    const request = await User.findByIdAndUpdate(receiverId, {
      $push: {
        friendRequests: {
          sender: userId,
        },
      },
    });
    res.json({
      message: "Successfully sent friend request to " + request.username,
      success: true,
    });
  } catch (error) {
    res.status(500).json({
      message: "Cannot send friend request",
    });
  }
};

const deleteRequest = async (req, res) => {
};

const acceptRequest = async (req, res) => {

};
module.exports = { sendFriendRequest, deleteRequest, acceptRequest };
