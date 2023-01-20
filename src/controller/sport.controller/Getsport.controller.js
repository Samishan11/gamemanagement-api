const sportModel = require("../../model/sport.model/sport.model");
const { StatusCodes } = require("http-status-codes");

const Getsport = async (req, res) => {

    try {
        const _res = await sportModel.find();
        const filter = _res.filter((data) => {
            if (data.isApproved) {
                return data
            }
        });
        return res.status(StatusCodes.CREATED).send(filter)
    } catch (error) {
        console.log(error)
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).send("Internal server error")
    }
}

module.exports = Getsport;