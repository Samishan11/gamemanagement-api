const teamModel = require("../../model/team.model/team.model");
const { StatusCodes } = require("http-status-codes");

const PostTeam = async (req, res) => {
    const { team, catagory, rating } = req.body;
    try {
        if (!req.userInfo.isAdmin) {
            const _res = await new teamModel({
                team,
                catagory,
                image: req.file?.path,
                rating,
                date: new Date(),
                isVerified: false
            });
            await _res.save()
            return res.status(StatusCodes.CREATED).send('Team Created');
        }
        const _res = await new teamModel({
            team,
            catagory,
            image: req.file?.path,
            rating,
            date: new Date(),
            isVerified: true
        });
        await _res.save()
        return res.status(StatusCodes.CREATED).send('Team Created');
    } catch (error) {
        console.log(error)
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).send("Internal server error")
    }
}

module.exports = PostTeam;