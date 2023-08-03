const { Notice } = require("../../models");
const { HttpError } = require("../../helpers");

const createNoticeByCategory = async (req, res, next) => {
    const { _id: owner } = req.user;

    const { category } = req.params;

    const notice = await Notice.create({
        ...req.body,
        owner,
        category,
        // photoUrl: req.file.path,
        // imgPublicId: req.file.filename,
    });

    if (!req.file) {
        throw HttpError(400, "Image is required");
    }

    if (!notice) {
        next(HttpError(404, "Not found"));
    }
    res.status(201).json(notice);
};

module.exports = createNoticeByCategory;
