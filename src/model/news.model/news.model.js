const mongoose = require("mongoose");

const newsModel = new mongoose.Schema({
    title: String,
    description: String,
    image: String
});

module.exports = new mongoose.model("news", newsModel);