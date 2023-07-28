const { ctrlWrapper } = require("../../helpers");
const getNews = require("./getNews");

module.exports = {
    getNews: ctrlWrapper(getNews),
};
