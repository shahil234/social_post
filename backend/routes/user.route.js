const express = require("express");
const { sendFriendRequest, acceptFriendRequest } = require("../controllers/user.controller");
const authenticate = require("../middlewares/authentication")

const router = express.Router();

//getprofile, updateprofile, sendFriendRequest, updateRequestStatus
router.post("/request/send", authenticate, sendFriendRequest);
// router.patch("/request/reject", authenticate, deleteRequest)
router.patch("/request/accept", authenticate, acceptFriendRequest)


module.exports = router;
