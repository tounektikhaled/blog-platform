const express = require('express');
const {
  createUser,
  updateUser,
  deleteUser,
  getUsers,
  getUserById,
  getMe,
} = require('../resolvers/userResolvers');

const router = express.Router();

router.get('/users', getUsers);
router.get('/users/:id', getUserById);
router.get('/me', getMe);
router.post('/users', createUser);
router.put('/users/:id', updateUser);
router.delete('/users/:id', deleteUser);

module.exports = router;
