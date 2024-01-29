const express = require('express');
const userResolvers = require('../resolvers/userResolvers');

const router = express.Router();
router.get('/users', userResolvers.Query.getUsers);
router.get('/users/:id', userResolvers.Query.getUserById);
router.get('/me', userResolvers.Query.getMe);
router.post('/users', userResolvers.Mutation.createUser);
router.put('/users/:id', userResolvers.Mutation.updateUser);
router.delete('/users/:id', userResolvers.Mutation.deleteUser);

module.exports = router;
