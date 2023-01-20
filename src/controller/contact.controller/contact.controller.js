const contactModel = require("../../model/conteact.model/contact.model");
const { StatusCodes } = require("http-status-codes");

const Contact = async(req,res) => {
    try {
        var _res = await new contactModel(req.body);
        await _res.save();
        return res.status(StatusCodes.CREATED).send("Contact send sucessfully");
    } catch (error) {
        console.log(error)
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).send("internal server error !!!");
    }
}

module.exports = Contact;