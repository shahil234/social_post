const { request } = require("express");
const User = require("../models/user.model");

const sendFriendRequest = async (req, res) => {
  try {
    const { userId } = req.user;
    const { receiverId } = req.body;

    if (!receiverId) {
      return res.status(400).json({
        message: "Invalid receiverId",
        success: false,
      });
    }

    if (receiverId === userId) {
      return res.status(400).json({
        message: "Cannot send requests to yourself",
        success: false,
      });
    }

    const sender = await User.findById(userId);
    const receiver = await User.findById(receiverId);

    const duplicateRequest =
      sender.sentRequests.filter(
        (req) => req.receiverId.toString() === receiverId
      ).length === 0;
    console.log(duplicateRequest);
    if (
      sender.sentRequests.filter(
        (req) => req.receiverId.toString() === receiverId
      ).length > 0
    ) {
      return res.status(400).json({
        message: "Cannot send multiple requests to same user",
        success: false,
      });
    }

    sender.sentRequests.push({
      receiverId,
    });
    await sender.save();
    receiver.receivedRequests.push({
      senderId: userId,
    });
    await receiver.save();
    res.status(200).json({
      message: "Successfully sent friend requests to " + receiver.username,
      success: true,
    });
  } catch (err) {
    res.status(500).json({
      message: "Failed sending request",
      success: false,
    });
  }
};

const acceptFriendRequest = async (req, res) => {
  try {
    const { userId } = req.user;
    const { requestId } = req.body;

    const receiver = await User.findById(userId);
    if (
      !requestId ||
      !receiver.receivedRequests.find(
        (item) => item._id.toString() === requestId
      )
    ) {
      return res.status(400).json({
        message: "Invalid request id",
        success: false,
      });
    }

    const request = receiver.receivedRequests.find(
      (item) => item._id.toString() === requestId
    );
    const sender = await User.findById(request.senderId);

    receiver.friends.push({
      userId: sender._id,
    });

    receiver.receivedRequests = receiver.receivedRequests.filter(
      (item) => item.senderId.toString() !== sender._id.toString()
    );
    await receiver.save();

    sender.friends.push({
      userId: receiver._id,
    });
    sender.sentRequests = sender.sentRequests.filter(
      (item) => item.receiverId.toString() !== receiver._id.toString()
    );

    await sender.save();
    res.status(200).json({
      message: `Successfully accepted friend request of ${sender.username} `,
      success: true,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "Failed to accept request",
      success: false,
    });
  }
};

const rejectFriendRequest = async (req, res) => {
  try {
    const { userId } = req.user;
    const { requestId } = req.body;

    if (!requestId) {
      return res.json({
        message: "Invalid request Id",
        success: false,
      });
    }
    const user = await User.findById(userId);
    const request = user.receivedRequests.find(
      (item) => item._id.toString() === requestId
    );

    if (!request) {
      return res.status(400).json({
        message: "Request doesn't exists",
        success: false,
      });
    }

    const sender = await User.findById(request.senderId);

    user.receivedRequests = user.receivedRequests.filter(
      (item) => item.senderId.toString() !== sender._id.toString()
    );
    sender.sentRequests = sender.sentRequests.filter(
      (item) => item.receiverId.toString() !== user._id.toString()
    );

    await sender.save();
    await user.save();

    res.status(200).json({
      message: `Successfully rejected the request of ${sender.username}`
    })
  } catch (error) {
    res.status(500).json({
      message: "Unable to reject the request",
      success: false,
    });
  }
};
module.exports = { sendFriendRequest, acceptFriendRequest, rejectFriendRequest };
