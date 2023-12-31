const { Schema, model } = require("mongoose");
const { handleMongooseError } = require("../helpers");

const emailRegexp = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;

const noticeSchema = new Schema(
    {
        title: {
            type: String,
            minlength: 5,
            maxlength: 200,
            required: [true, "Set title for notice"],
        },
        name: {
            type: String,
            minlength: 2,
            maxlength: 100,
            required: [true, "Set name for notice"],
        },
        category: {
            type: String,
            enum: ["sell", "lost-found", "for-free"],
            required: [true, "Set category for notice"],
        },
        price: {
            type: Number,
            min: [1, "Price must be more than 0"],
            required: function () {
                return this.category === "sell";
            },
        },
        birthday: {
            type: Date,
            required: [true, "Set birthday for notice"],
        },
        place: {
            type: String,
            required: [true, "Set location category for notice"],
        },
        breed: {
            type: String,
            required: [true, "Set breed for notice"],
        },
        sex: {
            type: String,
            enum: ["male", "female"],
            required: [true, "Set sex for notice"],
        },
        comments: {
            type: String,
        },
        owner: {
            type: Schema.Types.ObjectId,
            ref: "users",
        },
        photoUrl: {
            type: String,
            required: [true, "Set photo for notice"],
        },
        imgPublicId: {
            type: String,
        },
        email: {
            type: String,
            match: emailRegexp,
            unique: true,
            required: [true, "Email is required"],
        },
        phone: {
            type: String,
            require: false,
        },
    },
    {
        versionKey: false,
        timestamps: true,
    }
);

noticeSchema.post("save", handleMongooseError);

const Notice = model("notice", noticeSchema);

module.exports = Notice;
