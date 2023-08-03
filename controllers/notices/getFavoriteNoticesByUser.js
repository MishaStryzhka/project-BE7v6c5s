const { User } = require("../../models");
const { HttpError } = require("../../helpers");

const getFavoriteNoticesByUser = async (req, res, next) => {

    const { _id: userId } = req.user;
    const {
        page = 1,
        limit = 12,
        query = "",
        age = "",
        gender = "",
    } = req.query;

    console.log("age", age);

    let date = null;

    if (age === "3m-12m") date = new Date(new Date() - 31557600000);
    if (age === "1y") date = new Date(new Date() - 31557600000 * 2);
    if (age === "2y") date = new Date(new Date() - 31557600000 * 3);

    const skip = (parseInt(page) - 1) * parseInt(limit);

    const notices = await User.findById(userId)
        .sort({ createdAt: -1 })
        .populate("favorite")
        .select("favorite")
        .then((orders) =>
            orders.favorite
                .filter((order) =>
                    order.title.toLowerCase().includes(query.toLowerCase()) &&
                    gender !== ""
                        ? order.sex === gender
                        : true && age !== ""
                        ? new Date(order.birthday) > new Date(date)
                        : true
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
        next(HttpError(404, "Nothing was found for your query."));
        return;
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