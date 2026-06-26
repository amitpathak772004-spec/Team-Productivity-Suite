const User = require('../models/User');

const findUserByEmail = (email) => {
  return User.findOne({ email });
};

const findUserByEmailWithPassword = (email) => {
  return User.findOne({ email }).select('+password');
};

const findUserById = async (id) => {
  return User.findById(id).select('-password');
};

const createUser = async (payload) => {
  return User.create(payload);
};

module.exports = {
  findUserByEmail,
  findUserByEmailWithPassword,
  findUserById,
  createUser,
};
