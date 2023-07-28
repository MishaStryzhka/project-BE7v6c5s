const { Schema, model } = require("mongoose");

const newsSchema = new Schema(
    {
        imgUrl: {
            type: String,
            required: [true, "News Name is required"],
        },
        title: {
            type: String,
            required: [true, "News Name is required"],
        },
        text: {
            type: String,
            required: [true, "News Name is required"],
        },
        date: {
            type: String,
            required: [true, "News Name is required"],
        },
        url: {
            type: String,
            required: [true, "News Name is required"],
        },
        id: {
            type: String,
            required: [true, "News Name is required"],
        },
    },
    { versionKey: false }
);

const News = model("news", newsSchema);

module.exports = News;
