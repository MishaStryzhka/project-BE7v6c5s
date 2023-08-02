const Notice = require("../../models/notice");

const getNoticesByTitle = async (req, res, next) => {
    const { page = 1, limit = 12, query } = req.query;

    const skip = (page - 1) * limit;
    const { categoryName } = req.params;

    const searchQuery = {
        $and: [
            query
                ? {
                      category: categoryName,
                      title: { $regex: new RegExp(query, "i") },
                  }
                : { category: categoryName },
        ],
    };

    const notices = await Notice.find(searchQuery, "-createdAt -updatedAt", {
        skip,
        limit: Number(limit),
    }).sort({ createdAt: -1 });

    const totalHits = await Notice.countDocuments(searchQuery);

    if (totalHits === 0) {
        return res.status(404).json({
            message: "Notices for this category not found.",
        });
    }

    res.status(200).json({
        notices,
        totalHits: totalHits,
    });
};

module.exports = getNoticesByTitle;
