const express = require('express');
const postResolvers=require('../resolvers/postResolvers');

const router = express.Router();

router.get('/posts', postResolvers.Query.getPosts);
router.get('/posts/:id', postResolvers.Query.getPostById);
router.post('/posts', postResolvers.Mutation.createPost);
router.put('/posts/:id', postResolvers.Mutation.updatePost);
router.delete('/posts/:id', postResolvers.Mutation.deletePost);

module.exports = router;
