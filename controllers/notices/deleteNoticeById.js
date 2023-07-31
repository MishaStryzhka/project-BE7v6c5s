const cloudinary = require("cloudinary");

const { Notice } = require("../../models")
const { HttpError} = require("../../helpers");



const deleteNoticeById = async (req, res, next) => {
    const { _id: userId } = req.user;
    const { noticeId } = req.params;

     // -> Delete img from MangoDB
    const notice = await Notice.findOneAndRemove({
        _id: noticeId,
        owner: userId,
    }).lean();

    if (!notice) {
        next(HttpError(404, "Notice is not exist!"))
    }

    // -> Delete img from Cloudinary
    const { imgPublicId } = notice;
    
    await cloudinary.uploader.destroy(imgPublicId)

    res.json({
        message: "Notice has been deleted"
    })
};

module.exports = deleteNoticeById;