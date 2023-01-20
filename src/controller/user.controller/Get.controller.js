const userModel = require('../../model/user.model/user.model');
const { StatusCodes } = require("http-status-codes");

const GetUser = async (req, res) => {
    try {
        if (!req.userInfo?.isAdmin) {
            return res.status(StatusCodes.UNAUTHORIZED).send("unauthorized");
        }
        const _res = await userModel.find();
        return res.status(StatusCodes.ACCEPTED).send(_res);
    } catch (error) {
        console.log(error)
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).send("error");
    }
}

module.exports = GetUser;