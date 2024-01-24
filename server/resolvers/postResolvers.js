const PostModel = require('../models/PostModel');

async function getPosts() {
  return await PostModel.find();
}

async function getPostById(_, { id }) {
  return await PostModel.findById(id);
}

async function createPost(_, { title, content, authorId }) {
  const post = new PostModel({ title, content, authorId });
  return await post.save();
}

async function updatePost(_, { id, title, content }) {
  return await PostModel.findByIdAndUpdate(id, { title, content }, { new: true });
}

async function deletePost(_, { id }) {
  await PostModel.findByIdAndDelete(id);
  return true;
}

module.exports = {
  Query: {
    getPosts,
    getPostById,
  },
  Mutation: {
    createPost,
    updatePost,
    deletePost,
  },
};
