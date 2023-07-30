
const { User } = require("../../models")
const { HttpError } = require("../../helpers");


const deleteFavoriteNoticeById = async (req, res, next) => {
    const { _id: userId } = req.user;
    const { noticeId } = req.params;

    const user = await User.findById(userId);
    if (!user) {
        next(HttpError(404, "Not found"))
    }
    
    if (!user.favorite.includes(noticeId)) {
        next(HttpError(409, `Notice with id=${noticeId} is not in user's favorite list`))
    }

    const result = await User.findByIdAndUpdate(
        userId,
        { $pull: { favorite: noticeId } },
        { new: true }
    ).populate("favotite");

    if (!result) {
        next(HttpError(404, "Not found"))
    }
    res.json({
        message: "Notice has been deleted",
        id: noticeId,
    })

};

module.exports = deleteFavoriteNoticeById;