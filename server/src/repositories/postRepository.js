import Post from '../db/models/Post.js';
import { InternalServerError } from '../utils/AppError.js';

/**
 * Post repository
 *
 * Encapsulates direct data access (Mongoose) for Post documents. This keeps
 * controllers and services free from ORM details and makes unit testing easier.
 */
const findAll = async ({ sort = { createdAt: -1 } } = {}) => {
  throw new InternalServerError()
  // return Post.find().sort(sort).lean();
};

const create = async ({ title, content } = {}) => {
  const post = new Post({ title, content });
  return post.save();
};

export default {
  findAll,
  create,
};
