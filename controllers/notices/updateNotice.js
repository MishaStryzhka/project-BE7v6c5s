const { Notice } = require("../../models")
const { User }  = require("../../models");
const { HttpError } = require("../../helpers");



const updateNotice = async (req, res, next) => {
    const { _id: userId } = req.user;
    const { noticeId } = req.params;

    const user = await User.findById(userId);
    
    if (!user) {
        next(HttpError(404, "Not found"))
    }
    if (user.favorite.includes(noticeId)) {
        
        next(HttpError(409, `Notice with id=${noticeId} is already in user's favorite list`))
    }

    const notice = await Notice.findById(noticeId);

    if (!notice) {
        next(HttpError(404, "Not found"))
    }

    const result = await User.findByIdAndUpdate(
        userId,
        { $push: { favorite: noticeId } },
        { new: true }
    ).populate('favorite');
    
    if (!result) {
        next(HttpError(404, "Not found"))
    }
    res.json({
        message: "Favorite notice has been added",
        id: noticeId,
    })
};

module.exports = updateNotice;

