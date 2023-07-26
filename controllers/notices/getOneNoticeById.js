const { Notice } = require("../../models")
const { HttpError } = require("../../helpers");


const getOneNoticeById = async (req, res, next) => {
    const { noticeId } = req.params;
    const notice = await Notice.findById(noticeId)
    if (!notice) {
        next(HttpError(404, "Not found"))
    }
    res.json(notice);
};

module.exports = getOneNoticeById;