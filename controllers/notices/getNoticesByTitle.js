const { HttpError } = require("../../helpers");
const Notice = require("../../models/notice");

const getNoticesByTitle = async (req, res, next) => {
    const { page = 1, limit = 12, query, age, gender } = req.query;
    console.log("age", age);

    let date = null;

    if (age === "3m-12m") date = new Date(new Date() - 31557600000);
    if (age === "1y") date = new Date(new Date() - 31557600000 * 2);
    if (age === "2y") date = new Date(new Date() - 31557600000 * 3);

    const skip = (parseInt(page) - 1) * parseInt(limit);
    const { categoryName } = req.params;

    const searchQuery = {};
    if (categoryName) searchQuery.category = categoryName;
    if (query) searchQuery.title = { $regex: new RegExp(query, "i") };
    if (age) searchQuery.birthday = { $gte: date };
    if (gender) searchQuery.sex = gender;

    const notices = await Notice.find(searchQuery, "-createdAt -updatedAt")
        .skip(skip)
        .limit(parseInt(limit))
        .sort({ createdAt: -1 });

    const totalNotices = await Notice.countDocuments(searchQuery);

    if (totalNotices === 0 && query !== "") {
        return res.status(404).json({
            message: "Nothing was found for your query.",
        });
    }

    if (totalNotices === 0) {
        next(HttpError(404, "Notices for this category not found."));
        return;
    }

    res.status(200).json({
        notices,
        totalNotices,
    });
};

module.exports = getNoticesByTitle;
