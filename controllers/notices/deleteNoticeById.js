const { Notice } = require("../../models")
const { HttpError } = require("../../helpers");
// const { deleteLCD } = require("../../helpers/cloudinary");


const deleteNoticeById = async (req, res, next) => {
    const { _id: userId } = req.user;
    const { noticeId } = req.params;

    const notice = await Notice.findByIdAndDelete({
        _id: noticeId,
        owner: userId,
    });

    if (!notice) {
        next(HttpError(404, "Not found"))
    }

    // await deleteLCD(notice.imagePublicId);
    res.json({
        message: "the note has been deleted"
    })
};

module.exports = deleteNoticeById;