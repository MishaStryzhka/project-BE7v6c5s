const { Notice } = require("../../models")
const { HttpError } = require("../../helpers");

const getUserNotices = async (req, res) => {
    const {
        user: { _id: userId },
        query,
    } = req;

    const { page = 1, limit = 20 } = query;
    const skip = (page - 1) * limit;

    const totalResults = await Notice.find({ owner: userId }).count();
    const notices = await Notice.find({ owner: userId }, null, {
        skip,
        limit,
        sort: {
            updatedAt: -1,
        },
    }).lean();

    if (!notices) {
        next(HttpError(404, "Not found"))
    }

    res.json({
        totalResults,
        page,
        totalPages: Math.ceil(totalResults / limit),
        results: notices,
    });
};

module.exports = getUserNotices;
