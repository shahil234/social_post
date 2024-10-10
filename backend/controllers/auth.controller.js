const User = require("../models/user.model");
const RefreshToken = require("../models/refreshToken.model");

const generateAccessToken = require("../lib/generateAccessToken");
const generateRefreshToken = require("../lib/generateRefreshToken");

const SignUp = async (req, res) => {
  const { username, email, password } = req.body;
  if (!username || !email || !password) {
    res.status(400).json({
      message: "Please provide all credential",
      success: false,
    });
  }

  const user = await User.findOne({ email });
  if (user) {
    return res.status(400).json({
      message: "User already Exists",
      success: false,
    });
  }

  try {
    const newUser = new User({ email, password, username });
    await newUser.save();
    res.status(201).json({
      message: "User created Successfully",
      success: true,
      data: {
        username: newUser.username,
        email: newUser.email,
      },
    });
  } catch (err) {
    console.log(err.message);
    res.status(500).json({
      message: "Unable to create an account",
      success: false,
    });
  }
};

const Login = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      res.status(400).json({
        message: "Provide all credentials",
      });
    }

    const user = await User.findOne({ email });
    if (!user) {
      res.status(404).json({
        message: "User not found",
        success: false,
      });
    }

    const passwordMatches = await user.comparePassword(password);
    if (!passwordMatches) {
      res.status(401);
      throw new Error("Invalid password");
    }

    const accessToken = generateAccessToken({
      username: user.username,
      userId: user._id,
    });
    const refreshToken = generateRefreshToken({
      username: user.username,
      userId: user._id,
    });

    const userRefreshTokenData = await RefreshToken.findOne({
      userId: user._id,
    });

    if (!userRefreshTokenData) {
      const refreshTokenData = {
        userId: user._id,
        token: refreshToken,
      };
      await RefreshToken.create(refreshTokenData);
    } else {
      userRefreshTokenData.token = refreshToken;
      userRefreshTokenData.save();
    }

    res.status(200).json({
      message: "Login Successfull",
      success: true,
      data: {
        username: user.username,
        email: user.email,
        accessToken,
        refreshToken: refreshToken,
      },
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: error.message,
      success: false,
    });
  }
};

module.exports = { SignUp, Login };
