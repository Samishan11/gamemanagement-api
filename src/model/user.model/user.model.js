const mongoose = require("mongoose");
const bcryptjs = require("bcryptjs");

const userModel = new mongoose.Schema({
  username: String,
  email: {
    type: String,
    required: [true, "Please enter your email"],
    unique: true,
    match: [
      /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
      "Please enter a valid email address",
    ],
  },
  password: String,
  createdOn: String,
  isAdmin: {
    type: Boolean,
    default: false
  },
  userRole: {
    type: Number,
    default: 0
  },
  point: {
    type: Number,
    default: 1000
  },
  googleId: { type: String },
  image: { type: String, default: "https://cdn-icons-png.flaticon.com/512/560/560277.png" },
  resetToken: String,
  isVerifed: {
    type: Boolean,
    default: false
  },
  verifyLink: String
});
userModel.methods.matchPassword = async function (password) {
  return await bcryptjs.compare(password, this.password);
};


module.exports = new mongoose.model("user", userModel);