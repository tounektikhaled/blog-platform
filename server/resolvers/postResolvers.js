const PostModel = require('../models/PostModel');
const UserModel = require('../models/UserModel');

const getPosts = async () => {
  return await PostModel.find();
}


const getPostById = async (_, { id }) => {
  try {
    const post = await PostModel.findById(id).populate('author');

    if (!post) {
      throw new Error(`Post with ID ${id} not found`);
    }

    return post;
  } catch (error) {
    console.error(`Error fetching post with ID ${id}:`, error);
    throw new Error(`Unable to fetch post with ID ${id}`);
  }
};


const createPost = async (_, { title, content, authorId }) => {
  try {
    // Check if the author with the provided ID exists
    const author = await UserModel.findById(authorId);
    if (!author) {
      throw new Error(`Author with ID ${authorId} not found`);
    }

    // Create a new post with the author
    const post = new PostModel({ title, content, author: authorId });
    await post.save();

    // Populate the author field and return the post
    const populatedPost = await PostModel.findById(post._id).populate('author');
    return populatedPost;
  } catch (error) {
    console.error('Error creating post:', error);
    throw new Error('Unable to create post');
  }
};

const updatePost = async (_, { id, title, content }) => {
  try {
    // Find the post by ID and update its title and content
    const updatedPost = await PostModel.findByIdAndUpdate(id, { title, content }, { new: true });

    if (!updatedPost) {
      throw new Error(`Post with ID ${id} not found`);
    }

    return updatedPost;
  } catch (error) {
    console.error(`Error updating post with ID ${id}:`, error);
    throw new Error(`Unable to update post with ID ${id}`);
  }
};


const deletePost = async (_, { id }) => {
  try {
    // Find the post by ID and delete it
    const deletedPost = await PostModel.findByIdAndDelete(id);

    if (!deletedPost) {
      throw new Error(`Post with ID ${id} not found`);
    }

    return true;
  } catch (error) {
    console.error(`Error deleting post with ID ${id}:`, error);
    throw new Error(`Unable to delete post with ID ${id}`);
  }
};


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
