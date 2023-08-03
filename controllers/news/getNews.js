const { HttpError } = require("../../helpers");
const News = require("../../models/news");

const getNews = async (req, res, next) => {
    const { page, limit, query } = req.query;
    // console.log("req", req.query);

    const news = await News.find({
        title: { $regex: query, $options: "i" },
    })
        .skip(limit * (page - 1))
        .limit(limit);

    const totalNews = await News.find({
        title: { $regex: query, $options: "i" },
    });

    if (totalNews === 0 && query !== "") {
        next(HttpError(404, "Nothing was found for your query."));
        return;
    }

    if (totalNews === 0) {
        next(HttpError(404, "Not found news"));
        return;
    }

    res.status(200).json({ totalNews: totalNews.length, news });
};

module.exports = getNews;
