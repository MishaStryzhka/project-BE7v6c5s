const { HttpError } = require("../../helpers");
const Notice = require("../../models/notice");

const getNoticesByTitle = async (req, res, next) => {
    const { page = 1, limit = 12, query = "" } = req.query;

    const skip = (parseInt(page) - 1) * parseInt(limit);
    const { categoryName } = req.params;

    const searchQuery = query
        ? {
              category: categoryName,
              title: { $regex: new RegExp(query, "i") },
          }
        : { category: categoryName };

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
