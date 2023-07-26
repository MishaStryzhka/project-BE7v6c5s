const {User} = require("../../models")
const { HttpError } = require("../../helpers");


const getFavoriteNoticesByUser = async (req, res, next) => {
    const { _id: userId } = req.user;
    const notice = await User.findById(userId)
        .sort({ createdAt: -1 })
        .populate("favorite")
        .select("favorite");
    
    if(notice.favorite.length === 0) {
        next(HttpError(404, "Not found favorite notice"))
    }
    res.json(notice);
    
};

module.exports = getFavoriteNoticesByUser;