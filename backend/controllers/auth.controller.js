const User = require("../models/user.model");
const jwt = require("jsonwebtoken");

const SignUp = async (req, res) => {
  const { username, email, password } = req.body;
  if (!username || !email || !password) {
    res.status(400).json({
      message: "Please provide all credential",
      success: false
    });
  }

  const user = await User.findOne({ email });
  if (user) {
    return res.status(400).json({
      message: "User already Exists",
      success: false
    });
  }

  try {
    const newUser = new User({ email, password, username });
    await newUser.save();
    res.status(201).json({
      message: "User created Successfully",
      success:true,
      data: {
        username: newUser.username,
        email: newUser.email,
      },
    });
  } catch (err) {
    console.log(err.message);
    res.status(500).json({
      message: "Unable to create an account",
      success: false
    })
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

    const user = await User.findOne({email});
    if(!user){
      res.status(404).json({
        message: "User not found",
        success: false
      })
    }

    const passwordMatches = await user.comparePassword(password);
    if(!passwordMatches){
      res.status(401);
      throw new Error('Invalid password');
    }

    const accessToken = await jwt.sign(user.username, process.env.ACCESS_TOKEN_SECRET);

    res.status(200).json({
      message: "Login Successfull",
      success: true,
      data: {
        username: user.username,
        email: user.email,
        accessToken
      }
    })



    
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: error.message,
      success: false
    })
  }
};

module.exports = { SignUp, Login };
