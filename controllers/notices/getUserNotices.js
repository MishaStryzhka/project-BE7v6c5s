const { Notice } = require("../../models");
const { HttpError } = require("../../helpers");

const getUserNotices = async (req, res, next) => {
    const { page = 1, limit = 12, query = "", age, gender = "" } = req.query;

    const { _id: userId } = req.user;

    const skip = (parseInt(page) - 1) * parseInt(limit);

    const searchQuery = {};
    if (userId) searchQuery.owner = userId;
    if (query) searchQuery.title = { $regex: new RegExp(query, "i") };
    // if(age) searchQuery.category = age;
    if (gender) searchQuery.sex = gender;

    const totalNotices = await Notice.find(searchQuery).count();
    const notices = await Notice.find(searchQuery, "-createdAt -updatedAt")
        .skip(skip)
        .limit(parseInt(limit))
        .sort({ createdAt: -1 });

    if (totalNotices === 0 && query !== "") {
        next(HttpError(404, "Nothing was found for your query."));
        return;
    }

    if (totalNotices === 0) {
        next(HttpError(404, "Notices not found."));
        return;
    }

    res.json({
        notices,
        totalNotices,
    });
};

module.exports = getUserNotices;
