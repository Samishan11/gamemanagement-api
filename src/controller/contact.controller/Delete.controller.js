const contactModel = require("../../model/conteact.model/contact.model");
const { StatusCodes } = require("http-status-codes");

const ContactDelete = async(req,res) => {
    try {
        var _res = await contactModel.findByIdAndDelete(req.params.id);
        return res.status(StatusCodes.CREATED).send("Deleted sucessfully");
    } catch (error) {
        console.log(error)
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).send("internal server error !!!");
    }
}

module.exports = ContactDelete;