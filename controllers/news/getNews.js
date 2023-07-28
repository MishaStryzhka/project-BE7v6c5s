const News = require("../../models/news");

const getNews = async (req, res, next) => {
    const { page } = req.body
    const news = await News.find().skip(6*(page-1)).limit(6);

    res.status(200).json(news);
};

module.exports = getNews;
