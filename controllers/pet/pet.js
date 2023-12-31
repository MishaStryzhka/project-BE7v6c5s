const cloudinary = require('cloudinary');

const { ctrlWrapper, HttpError } = require('../../helpers');

const { Pet } = require('../../models/pet');

const get = async (req, res) => {
  const {
    user: { _id: userId },
    query,
  } = req;

  const { page = 1, limit = 20 } = query;
  const skip = (page - 1) * limit;

  const totalResults = await Pet.find({ owner: userId }).count();
  const pets = await Pet.find({ owner: userId }, null, {
    skip,
    limit,
    sort: {
      updatedAt: -1,
    },
  }).lean();

  res.json({
    totalResults,
    page,
    totalPages: Math.ceil(totalResults / limit),
    results: pets,
  });
};

const add = async (req, res) => {
  if (!req.file) {
    throw HttpError(400, 'Image is required');
  }

  const {
    user: { _id: userId },
    body,
  } = req;

  const pet = await Pet.create({
    ...body,
    owner: userId,
    photoUrl: req.file.path,
    imgPublicId: req.file.filename,
  });

  res.status(201).json(pet);
};

const removeById = async (req, res) => {
  const {
    user: { _id: userId },
    params: { petId },
  } = req;

  // Delete pet from mondoDB
  const pet = await Pet.findOneAndRemove({
    _id: petId,
    owner: userId,
  }).lean();

  if (!pet) {
    throw HttpError(404, 'Pet is not exist!');
  }

  // -> Delete img on Cloudinary
  const { imgPublicId } = pet;
  await cloudinary.uploader.destroy(imgPublicId);

  res.status(204).json('Deleted successfully');
};

module.exports = {
  get: ctrlWrapper(get),
  add: ctrlWrapper(add),
  removeById: ctrlWrapper(removeById),
};
