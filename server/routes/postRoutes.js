const express = require('express');
const {
  createPost,
  updatePost,
  deletePost,
  getPosts,
  getPostById,
} = require('../resolvers/postResolvers');

const router = express.Router();

router.get('/posts', getPosts);
router.get('/posts/:id', getPostById);
router.post('/posts', createPost);
router.put('/posts/:id', updatePost);
router.delete('/posts/:id', deletePost);

module.exports = router;
