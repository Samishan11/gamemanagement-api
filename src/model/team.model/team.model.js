const mongoose = require("mongoose");

const teamModel = new mongoose.Schema({
    team: String,
    catagory: String,
    image: String,
    date: String,
    teamResult:
    {
        point: {
            type: Number,
            default: 0
        },
        league: String,
    },
    matches: {
        matchPlay: {
            type: Number,
            default: 0
        },
        matchwin: {
            type: Number,
            default: 0
        },
        matchloss: {
            type: Number,
            default: 0
        },
        matchdraw: {
            type: Number,
            default: 0
        }
    },
    rating: Number,
    isVerified: {
        type: Boolean,
        default: false
    }
});

module.exports = new mongoose.model("team", teamModel);