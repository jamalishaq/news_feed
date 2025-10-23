import Post from '../db/models/Post.js';

/**
 * Post repository
 *
 * Encapsulates direct data access (Mongoose) for Post documents. This keeps
 * controllers and services free from ORM details and makes unit testing easier.
 */
const findAll = ({ sort = { createdAt: -1 } } = {}) => {
    return Post.find().sort(sort).lean(); 
};

const create = ({ content } = {}) => {
  const post = new Post({ content });
  return post.save();
};

export default {
  findAll,
  create,
};
