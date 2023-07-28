const News = require("../../models/news");

const getNews = async (req, res, next) => {
    const news = await News.find();
    console.log("news", news);

    res.status(200).json(news);
};

module.exports = getNews;
