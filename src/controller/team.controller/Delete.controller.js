const teamModel = require("../../model/team.model/team.model");
const sportModel = require("../../model/sport.model/sport.model");
const { StatusCodes } = require("http-status-codes");

const Deleteteam = async (req, res) => {
    try {
        if (!req?.userInfo?.isAdmin) {
            return res.status(StatusCodes.UNAUTHORIZED).send("Unauthorized Access");
        }
        const _res = await teamModel.findByIdAndDelete(req.params.id);
        await sportModel.findOneAndDelete({ team1: _res.team });
        await sportModel.findOneAndDelete({ team2: _res.team });
        return res.status(StatusCodes.CREATED).send("Team Deleted")
    } catch (error) {
        console.log(error)
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).send("Internal server error")
    }
};

module.exports = Deleteteam;