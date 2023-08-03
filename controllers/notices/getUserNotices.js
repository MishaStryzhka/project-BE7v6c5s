const { Notice } = require("../../models");
const { HttpError } = require("../../helpers");

const getUserNotices = async (req, res, next) => {
    const { page = 1, limit = 12, query = "" } = req.query;

    const { _id: userId } = req.user;

    const skip = (parseInt(page) - 1) * parseInt(limit);

    const searchQuery = query
        ? {
              owner: userId,
              title: { $regex: new RegExp(query, "i") },
          }
        : { owner: userId };

    const totalNotices = await Notice.find(searchQuery).count();
    const notices = await Notice.find(searchQuery, "-createdAt -updatedAt")
        .skip(skip)
        .limit(parseInt(limit))
        .sort({ createdAt: -1 });

    if (totalNotices === 0 && query !== "") {
        return res.status(404).json({
            message: "Nothing was found for your query.",
        });
    }

    if (totalNotices === 0) {
        return res.status(404).json({
            message: "Notices not found.",
        });
    }

    res.json({
        notices,
        totalNotices,
    });
};

module.exports = getUserNotices;
