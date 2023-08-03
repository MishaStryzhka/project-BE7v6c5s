const { User } = require("../../models");
const { HttpError } = require("../../helpers");

const getFavoriteNoticesByUser = async (req, res, next) => {

    const { _id: userId } = req.user;
    const { page = 1, limit = 12, query = "" } = req.query;

    const skip = (parseInt(page) - 1) * parseInt(limit);

    const notices = await User.findById(userId)
        .sort({ createdAt: -1 })
        .populate("favorite")
        .select("favorite")
        .then((orders) =>
            orders.favorite
                .filter((order) =>
                    order.title.toLowerCase().includes(query.toLowerCase())
                )
                .slice(skip, skip + parseInt(limit))
        );

    const allNotices = await User.findById(userId)
        .sort({ createdAt: -1 })
        .populate("favorite")
        .select("favorite")
        .then((orders) =>
            orders.favorite.filter((order) =>
                order.title.toLowerCase().includes(query.toLowerCase())
            )
        );

    const totalNotices = allNotices.length;

    if (totalNotices === 0 && query !== "") {
        return res.status(404).json({
            message: "Nothing was found for your query.",
        });
    }

    if (totalNotices === 0) {
        next(HttpError(404, "Not found favorite notice"));
        return;
    }

    res.status(200).json({
        notices,
        totalNotices,
    });

};

module.exports = getFavoriteNoticesByUser;

// Мой роут - router.get("/favorites", authenticate, ctrl.getFavoriteNoticesByUser)