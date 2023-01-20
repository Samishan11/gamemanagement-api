const newsModel = require("../../model/news.model/news.model");
const { StatusCodes } = require("http-status-codes");

const Update = async(req,res) => {
    try {
        const _res = await newsModel.findByIdAndUpdate(req.params.id,{
            title: req?.body?.title,
            description: req?.body?.description,
            image: req?.file?.path
        })
        return res.status(StatusCodes.CREATED).send("News Updated")
    } catch (error) {
        console.log(error)
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).send("INTERNAL_SERVER_ERROR")
    }
}

module.exports = Update;