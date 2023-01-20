const mongoose = require("mongoose");

const contactModel = new mongoose.Schema({
   fullname:String,
   email:String,
   contact:String
});

module.exports = new mongoose.model("contact", contactModel);