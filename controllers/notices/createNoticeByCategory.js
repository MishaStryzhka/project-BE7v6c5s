const { Notice } = require("../../models")
const { HttpError } = require("../../helpers");
// const fs = require("fs/promises");
// const { uploadLCD } = require("../../helpers/cloudinary");

const createNoticeByCategory = async (req, res, next) => {
    // const result = await uploadLCD(req.file.path, "users-notice");
    // await fs.unlink(req.file.path);

    const { _id: owner } = req.user;
    const { category } = req.params;
    const notice = await Notice.create({
        ...req.body,
        owner,
        category,
        imageURL: result.url,
        imagePublicId: result.public_id,
    })
    if (!notice) {
        next(HttpError(404, "Not found"))
    }
    res.json(notice);

};

module.exports = createNoticeByCategory;