const userModel = require('../../model/user.model/user.model');
const { StatusCodes } = require("http-status-codes");

exports.UpdateUser = async (req, res) => {
    try {
        const _res = await userModel.findByIdAndUpdate(req.params.id, {
            username: req?.body?.username,
            contact: req?.body?.contact,
            email: req?.body?.email,
            address: req?.body?.address,
            firstName: req?.body?.firstName,
            lastName: req?.body?.lastName,
        });
        return res.status(StatusCodes.CREATED).send("Update sucessfully")
    } catch (error) {
        console.log(error)
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).send(error)
    }
}
exports.Profileupdate = async (req, res) => {
    try {
        console.log(req?.file)
        const _res = await userModel.findByIdAndUpdate(req.params.id, {
            profile: req?.file?.path

        });
        return res.status(StatusCodes.CREATED).send("Update sucessfully")
    } catch (error) {
        console.log(error)
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).send(error)
    }
}
