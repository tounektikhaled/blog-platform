const UserModel = require('../models/UserModel');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

async function getUsers() {
  return await UserModel.find();
}

async function getUserById(_, { id }) {
  return await UserModel.findById(id);
}

async function getMe(_, __, context) {
  if (!context.user) {
    throw new Error('Unauthorized');
  }
  return await UserModel.findById(context.user.id);
}

async function createUser(_, { username, password }) {
  const user = new UserModel({ username, password });
  return await user.save();
}

async function updateUser(_, { id, username, password }) {
  return await UserModel.findByIdAndUpdate(id, { username, password }, { new: true });
}

async function deleteUser(_, { id }) {
  await UserModel.findByIdAndDelete(id);
  return true;
}

async function loginUser(_, { username, password }) {
  const user = await UserModel.findOne({ username });

  if (!user) {
    throw new Error('Invalid username or password');
  }

  const validPassword = await bcrypt.compare(password, user.password);

  if (!validPassword) {
    throw new Error('Invalid username or password');
  }

  const token = jwt.sign({ id: user._id, username: user.username }, 'secret_key', { expiresIn: '1h' });

  return { user, token };
}

module.exports = {
  getUsers,
  getUserById,
  getMe,
  createUser,
  updateUser,
  deleteUser,
  loginUser,
};
