const mongoose = require('mongoose');

const postSchema = new mongoose.Schema({
  title: String,
  content: String,
  author: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
},
  {
    timestamps: true
  }
);


const PostModel = mongoose.model('Post', postSchema);

module.exports = PostModel;
