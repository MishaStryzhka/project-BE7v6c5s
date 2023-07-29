const News = require("../../models/news");

const getNews = async (req, res, next) => {
    const { page, limit, search } = req.query;
    console.log("req", req.query);

    const news = await News.find({
        title: { $regex: search, $options: "i" },
    })
        .skip(limit * (page - 1))
        .limit(limit);

    const quantityNews = await News.find({
        title: { $regex: search, $options: "i" },
    });

    res.status(200).json({ quantityNews: quantityNews.length, news });
};

module.exports = getNews;
