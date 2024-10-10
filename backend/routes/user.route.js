const express = require("express");
const { sendFriendRequest } = require("../controllers/user.controller");
const authenticate = require("../middlewares/authentication")

const router = express.Router();

//getprofile, updateprofile, sendFriendRequest, updateRequestStatus
router.post("/request/send/:receiverId", authenticate, sendFriendRequest);

module.exports = router;
