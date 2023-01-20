const userModel = require('../../model/user.model/user.model');
const { StatusCodes } = require("http-status-codes");

const DeleteUser = async (req, res) => {
    try {
        const _res = await userModel.findByIdAndDelete(req.params.id, req.body)
        return res.status(StatusCodes.CREATED).send("Update sucessfully")
    } catch (error) {
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).send(error)
    }
}

module.exports = DeleteUser;