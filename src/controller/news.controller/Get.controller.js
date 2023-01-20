const newsModel = require("../../model/news.model/news.model");
const { StatusCodes } = require("http-status-codes");

const Get = async(req,res) => {
    try {
        const _res = await newsModel.find();
        return res.status(StatusCodes.CREATED).send(_res);
    } catch (error) {
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).send("INTERNAL_SERVER_ERROR");
    }
}

module.exports = Get;