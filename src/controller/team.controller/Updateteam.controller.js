const teamModel = require("../../model/team.model/team.model");
const { StatusCodes } = require("http-status-codes");

const UpdateTeam = async (req, res) => {
    const { team, catagory } = req?.body;
    console.log(req?.body)
    try {
        if (!req.userInfo.isAdmin) {
            return res.status(StatusCodes.UNAUTHORIZED).send("Unauthorized Access");
        }
        const _res = await teamModel.findByIdAndUpdate(req.params.id,
            {
                team,
                catagory,
                image: req?.file?.path
            }
        );
        return res.status(StatusCodes.CREATED).send("Team Created")
    } catch (error) {
        console.log(error)
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).send("Internal server error")
    }
}

module.exports = UpdateTeam;