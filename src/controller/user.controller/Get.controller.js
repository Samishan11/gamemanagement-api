const userModel = require('../../model/user.model/user.model');
const { StatusCodes } = require("http-status-codes");

const GetUser = async (req, res) => {
    try {
        if (!req.userInfo?.isAdmin) {
            const _res = await userModel.findOne({_id:req?.userInfo?._id});
            return res.status(StatusCodes.ACCEPTED).send(_res);
        }
        const _res = await userModel.find();
        return res.status(StatusCodes.ACCEPTED).send(_res);
    } catch (error) {
        console.log(error)
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).send("error");
    }
}

module.exports = GetUser;