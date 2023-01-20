const sportModel = require("../../model/sport.model/sport.model");
const { StatusCodes } = require("http-status-codes");

const DeleteSport = async (req, res) => {

    try {
        if (!req.userInfo.isAdmin) {
            return res.status(StatusCodes.UNAUTHORIZED).send("unauthorized access")
        }
        const _res = await sportModel.findByIdAndDelete(req.params.id)
        return res.status(StatusCodes.CREATED).send("Delete sucessfully")
    } catch (error) {
        console.log(error)
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).send(error)
    }
}

module.exports = DeleteSport;