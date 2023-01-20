const teamModel = require("../../model/team.model/team.model");
const { StatusCodes } = require("http-status-codes");

const Getteam = async (req, res) => {

    try {
        const _res = await teamModel.find();
        return res.status(StatusCodes.CREATED).send(_res)
    } catch (error) {
        console.log(error)
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).send("Internal server error")
    }
}

module.exports = Getteam;