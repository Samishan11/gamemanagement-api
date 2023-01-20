const newsModel = require("../../model/news.model/news.model");
const { StatusCodes } = require("http-status-codes");

const Post = async(req,res) => {
    try {
        const _res = await new newsModel({
            title: req.body.title,
            description: req.body.description,
            image: req.file.path
        })
        await _res.save();
        return res.status(StatusCodes.CREATED).send("News Posted")
    } catch (error) {
        console.log(error)
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).send("INTERNAL_SERVER_ERROR")
    }
}

module.exports = Post;