const News = require("../../models/news");

const getNews = async (req, res, next) => {
    const { page } = req.body
    const news = await News.find().skip(6*(page-1)).limit(6);
    const quantityNews = await News.find().count();

    res.status(200).json({quantityNews , news});
};

module.exports = getNews;
