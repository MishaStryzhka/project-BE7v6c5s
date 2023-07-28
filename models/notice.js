const { Schema, model } = require("mongoose");
const { handleMongooseError } = require("../helpers");

const noticeSchema = new Schema({
  title: {
    type: String,
    required: [true, "Set title for notice"],
  },
  name: {
    type: String,
    minlength: 2,
    maxlength: 12,
    required: [true, "Set name for notice"],
    
  },
  category: {
    type: String,
    enum: ["sell", "inGoodHands", "lostFound"],
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
    ref: 'users',
  },
  imageURL: {
    type: String,
    default: null,
  },
  imagePublicId: {
    type: String,
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
