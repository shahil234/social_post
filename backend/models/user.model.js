const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  profilePicture: {
    type: String
  },
  posts: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Post",
    },
  ],
  friends: [
    {
      userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
      }
    }
  ]
  ,
  receivedRequests: [
    {
      senderId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      }
    },
  ],
  sentRequests: [
    {
      receiverId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
      }
    }
  ]
});

userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) {
    next();
  }
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(this.password, salt);
  this.password = hashedPassword;
});


userSchema.methods.comparePassword = async function (password) {
  return await bcrypt.compare(password, this.password);
};

module.exports = mongoose.model("User", userSchema);
