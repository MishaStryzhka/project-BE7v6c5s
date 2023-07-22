const { Schema, model } = require('mongoose');
const { handleMongooseError } = require('../helpers');

const userSchema = new Schema(
  {
    name: {
      type: String,
      required: [true, 'User Name is required'],
    },
    password: {
      type: String,
      required: [true, 'Set password for user'],
    },
    email: {
      type: String,
      required: [true, 'Email is required'],
      unique: true,
    },
    token: String,
  },
  { versionKey: false }
);

userSchema.post('save', handleMongooseError);

const User = model('user', userSchema);

module.exports = User;
