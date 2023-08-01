const { User } = require("../../models")
const { HttpError } = require("../../helpers");


const getFavoriteNoticesByUser = async (req, res, next) => {
    console.log('testFile');
    const { _id: userId } = req.user;
    console.log('userId', userId);
    const notices = await User.findById(userId)
        .sort({ createdAt: -1 })
        .populate("favorite")
        .select("favorite");

    if (notices.favorite.length === 0) {
        next(HttpError(404, "Not found favorite notices"))
    }
    res.json(notices);
    
};

module.exports = getFavoriteNoticesByUser;

// Мой роут - router.get("/favorites", authenticate, ctrl.getFavoriteNoticesByUser)