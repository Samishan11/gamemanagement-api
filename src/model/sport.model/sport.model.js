const mongoose = require("mongoose");

const sportModel = new mongoose.Schema({
    eventName: String,
    team1: String,
    team2: String,
    catagory: String,
    team1Image: String,
    team2Image: String,
    eventPlace: String,
    eventDescription: String,
    eventStartDate: String,
    participations: [
        {
            participation: {
                user: {
                    type: String
                },
                league: {
                    type: String
                },
                team: {
                    type: String
                },
                role: {
                    type: String
                },
            }
        }
    ],
    result: [
        {
            team1result: {
                goal1: String,
                time1: String,
                user1: String
            },
            team2result: {
                goal2: String,
                time2: String,
                user2: String
            }
        }
    ],
    finalResult: {
        team1finalresult: {
            win1: { type: String, default: "null" },
            totalgoal1: { type: String, default: "0" },
            point: {
                type: Number,
                default: 0
            }
        },
        team2finalresult: {
            win2: { type: String, default: "null" },
            totalgoal2: { type: String, default: "0" },
            point: {
                type: Number,
                default: 0
            }
        },
    },
    gamePlan: String,
    isApproved: {
        type: Boolean,
        default: false
    },
    isAddBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    }
});

module.exports = new mongoose.model("sport", sportModel);