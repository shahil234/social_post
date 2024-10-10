const User = require("../models/user.model");

const sendFriendRequest = async (req, res) => {
  try {
    const { receiverId } = req.params;
    const { userId } = req.user;
    const request = await User.findByIdAndUpdate(receiverId, {
      $push: { friendRequests: {
        sender: userId
      } },
    });
    console.log(request);
    res.json({
      message: "haha cant say",
    });
  } catch (error) {
    res.send("error");
  }
};



module.exports = { sendFriendRequest };
