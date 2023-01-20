const newsModel = require("../../model/news.model/news.model");
const { StatusCodes } = require("http-status-codes");

const Delete = async(req,res) => {
    try {
        const _res = await newsModel.findByIdAndDelete(req.params.id);
        return res.status(StatusCodes.CREATED).send("News Deleted");
    } catch (error) {
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).send("INTERNAL_SERVER_ERROR")
    }
}

module.exports = Delete;