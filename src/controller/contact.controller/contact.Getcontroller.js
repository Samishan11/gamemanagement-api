const contactModel = require("../../model/conteact.model/contact.model");
const { StatusCodes } = require("http-status-codes");

const ContactGet = async(req,res) => {
    try {
        var _res = await contactModel.find();
        return res.status(StatusCodes.CREATED).send(_res);
    } catch (error) {
        console.log(error)
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).send("internal server error !!!");
    }
}

module.exports = ContactGet;