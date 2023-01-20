const userModel = require('../../model/user.model/user.model');
const { StatusCodes } = require("http-status-codes");
const auth = require("../../middleware/auth");
const sportModel = require('../../model/sport.model/sport.model');

const UpdateUser = async (req, res) => {
   

    try {
        if (!req.userInfo.isAdmin) {
            return res.status(StatusCodes.UNAUTHORIZED).send("Unauthorized User")
        }
        const _res = await userModel.findByIdAndUpdate(req.params.id, req.body)
        return res.status(StatusCodes.CREATED).send("Update sucessfully")
    } catch (error) {
        console.log(error)
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).send(error)
    }
}

module.exports = UpdateUser;