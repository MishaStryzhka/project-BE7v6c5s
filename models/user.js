const { Schema, model } = require('mongoose');
const { handleMongooseError } = require('../helpers');

const emailRegexp = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
const phoneRegexp = /^(\()?\d{3}(\))?(-|\s)?\d{3}(-|\s)\d{4}$/;

const userSchema = new Schema(
  {
    name: {
      type: String,
      required: [true, 'User Name is required'],
    },
    password: {
      type: String,
      minlength: 6,
      required: [true, 'Set password for user'],
    },
    email: {
      type: String,
      match: emailRegexp,
      unique: true,
      required: [true, 'Email is required'],
    },
    birthday: {
      type: String,
      require: false,
    },
    phone: {
      type: Number,
      match: phoneRegexp,
      require: [false, 'Should be only numbers'],
    },
    city: {
      type: String,
      require: false,
    },
    avatarURL: {
      type: String,
      required: false,
    },
    token: String,
    isFirstLogin: {
      type: Boolean,
      required: true,
    },
  },
  { versionKey: false }
);

userSchema.post('save', handleMongooseError);

const User = model('user', userSchema);

module.exports = User;
