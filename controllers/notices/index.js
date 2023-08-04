const createNoticeByCategory = require("./createNoticeByCategory");
const deleteNoticeById = require("./deleteNoticeById");
const getFavoriteNoticesByUser = require("./getFavoriteNoticesByUser");
const getOneNoticeById = require("./getOneNoticeById");
const addFavoriteNoticeById = require("./addFavoriteNoticeById");
const deleteFavoriteNoticeById = require("./deleteFavoriteNoticeById");
const getUserNotices = require("./getUserNotices");
const getNoticesByTitle = require("./getNoticesByTitle");

module.exports = {
    createNoticeByCategory,
    deleteNoticeById,
    getFavoriteNoticesByUser,
    getOneNoticeById,
    addFavoriteNoticeById,
    deleteFavoriteNoticeById,
    getUserNotices,
    getNoticesByTitle,
};
