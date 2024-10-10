const express = require("express");
const authenticateUser = require("../middlewares/authentication")
const { uploadPost, DeletePost, getAllPost } = require("../controllers/post.controller")

const router = express.Router();

router.get("/:id",getAllPost)
router.post("/upload",authenticateUser, uploadPost)
router.delete("/remove/:id",authenticateUser, DeletePost)

module.exports = router;