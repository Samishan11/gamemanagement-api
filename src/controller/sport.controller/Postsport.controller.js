const sportModel = require("../../model/sport.model/sport.model");
const { StatusCodes } = require("http-status-codes");
const teamModel = require("../../model/team.model/team.model")

const PostSport = async (req, res) => {
    let {
        eventName,
        team1,
        team2,
        catagory,
        team1Image,
        team2Image,
        eventPlace,
        eventDescription,
        eventStartDate
    } = req.body;

    const team1Data = await teamModel.findOne({ team: team1 })
    const team2Data = await teamModel.findOne({ team: team2 })

    try {
        if (!req.userInfo.isAdmin) {
            const responce = await new sportModel({
                eventName,
                isAddBy: req.userInfo._id,
                team1,
                team2,
                catagory,
                team1Image,
                team2Image,
                eventPlace,
                eventDescription,
                eventStartDate,
                gamepan: req?.file?.path,
            });
            await responce.save();
            if (responce) {
                await sportModel.findByIdAndUpdate(responce._id, {
                    team1Image: team1Data.image,
                    team2Image: team2Data.image
                })
                team1Data.matches.matchPlay += 1
                team2Data.matches.matchPlay += 1
                team1Data.save()
                team2Data.save()
            }
            return res.status(StatusCodes.CREATED).send("Post sucessfully");
        } else if (req.userInfo.isAdmin) {
            const responce = await new sportModel({
                eventName,
                isAddBy: req.userInfo._id,
                team1,
                team2,
                catagory,
                team1Image,
                team2Image,
                eventPlace,
                eventDescription,
                eventStartDate,
                gamepan: req?.file?.path,
                isApproved: true
            });
            await responce.save();
            if (responce) {
                team1Data.matches.matchPlay += 1
                team2Data.matches.matchPlay += 1
                team1Data.save()
                team2Data.save()
                await sportModel.findByIdAndUpdate(responce._id, {
                    team1Image: team1Data.image,
                    team2Image: team2Data.image
                })
            }
            return res.status(StatusCodes.CREATED).send("Post sucessfully");
        } else {
            return res.status(StatusCodes.UNAUTHORIZED).send("unauthorized");
        }
        // if (res) {
        //     const _res = await sportModel.findByIdAndUpdate(res._id, {
        //         eventName,
        //         team1,
        //         team2,
        //         catagory,
        //         team1Image,
        //         team2Image,
        //         eventPlace,
        //         eventDescription,
        //         eventStartDate,
        //         $push: {
        //             participations: {
        //                 user,
        //                 team
        //             }
        //         }
        //     })
    } catch (error) {
        console.log(error)
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).send(error)
    }
}

module.exports = PostSport;