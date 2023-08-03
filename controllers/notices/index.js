
const createNoticeByCategory = require("./createNoticeByCategory");
const deleteNoticeById = require("./deleteNoticeById");
const getFavoriteNoticesByUser = require("./getFavoriteNoticesByUser");
const getOneNoticeById = require("./getOneNoticeById");
const updateNotice = require("./updateNotice");
const deleteFavoriteNoticeById = require("./deleteFavoriteNoticeById")
const getUserNotices = require("./getUserNotices");
const getNoticesByTitle = require("./getNoticesByTitle")

module.exports = {
    createNoticeByCategory,
    deleteNoticeById,
    getFavoriteNoticesByUser,
    getOneNoticeById,
    updateNotice,
    deleteFavoriteNoticeById,
    getUserNotices,
    getNoticesByTitle
};
