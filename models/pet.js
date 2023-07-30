const { Schema, model } = require('mongoose');
const Joi = require('joi');
const handleMongooseError = require('../helpers/handleMongooseError');

// Mongoose schema:

const petSchema = new Schema(
  {
    owner: {
      type: Schema.Types.ObjectId,
      ref: 'users',
    },
    name: {
      type: String,
      required: [true, 'Name is required'],
    },
    birthday: {
      type: Date,
      required: [true, 'Birthday is required'],
    },
    type: {
      type: String,
      required: [true, 'Breed is required'],
    },
    photoUrl: {
      type: String,
      required: [true, 'Pet photo is required'],
    },
    comments: {
      type: String,
      default: '',
    },
  },
  { versionKey: false, timestamps: true }
);

petSchema.post('save', handleMongooseError);
const Pet = model('pet', petSchema);

// Validation schemas:

const addParams = Joi.object({
  name: Joi.string().required().min(2).max(16),
  birthday: Joi.date().iso().less('now').required(),
  type: Joi.string().required().min(2).max(16),
  comments: Joi.string().min(0).max(120),
  
});

const getParams = Joi.object({
  page: Joi.number().integer().min(1).empty(''),
  limit: Joi.number().integer().min(1).max(100).empty(''),
});

const photoConfig = {
  field: 'photo',
  folder: 'pets',
  
};

const schemas = {
  addParams,
  getParams,
  photoConfig,
};

module.exports = {
  Pet,
  schemas,
};