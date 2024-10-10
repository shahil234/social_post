const express = require("express");
const jwt = require("jsonwebtoken");

const generateAccessToken = require("../lib/generateAccessToken");

const RefreshToken = require("../models/refreshToken.model");

const router = express.Router();

router.post("/", async (req, res) => {
  try {
    const { token } = req.body;
    if (!token) {
      return res.status(400).json({
        message: "Token not provided",
        success: false,
      });
    }

    const refreshToken = RefreshToken.find({ token: token });

    if (!refreshToken)
      return res.status(400).json({
        message: "Invalid token",
        success: false,
      });

    jwt.verify(token, process.env.REFRESH_TOKEN_SECRET, (err, user) => {
      if (err)
        return res.json({
          message: "Invalid or Expired Token",
        });

      const newAccessToken = generateAccessToken({ username: user.username });
      res.status(200).json({
        message: "Successfully fetched new access token",
        data: {
          accessToken: newAccessToken,
        },
      });
    });
  } catch (error) {
    console.log(error.message);
    res.status(500).json({
      message: "Unable to get new access token",
      success: false,
    });
  }
});

module.exports = router
