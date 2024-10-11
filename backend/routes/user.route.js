const express = require("express");
const { sendFriendRequest, deleteRequest, acceptRequest } = require("../controllers/user.controller");
const authenticate = require("../middlewares/authentication")

const router = express.Router();

//getprofile, updateprofile, sendFriendRequest, updateRequestStatus
router.post("/request/send/:receiverId", authenticate, sendFriendRequest);
router.patch("/request/reject", authenticate, deleteRequest)
router.patch("/request/accept", authenticate, acceptRequest)


module.exports = router;
