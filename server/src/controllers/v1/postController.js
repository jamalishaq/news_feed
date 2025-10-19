import postService from '../../services/postService.js';
import { InternalServerError } from '../../utils/AppError.js';

/**
 * Posts controller
 *
 * Exports request handlers for working with Post documents.
 *
 * Routes expected by the app:
 *  - GET /posts    -> getPosts
 *  - POST /posts   -> createPost
 *
 * Notes:
 *  - These handlers perform minimal validation and return generic error
 *    messages to avoid leaking internal details. In production you should
 *    add proper validation (e.g. with Zod/Joi) and authentication/authorization
 *    as required.
 */

/**
 * GET /posts
 *
 * Fetch a list of posts from the database, sorted by most-recent first.
 *
 * Success: 200 JSON [ { _id, title, content, createdAt, updatedAt, ... } ]
 * Failure: 500 JSON { error: 'Failed to fetch posts' }
 */
const getPosts = async (req, res, next) => {
  try {
    const posts = await postService.listPosts();
    return res.json(posts);
  } catch (err) {
    // Log full error server-side for diagnostics, but return a safe message to clients
    console.error('Error fetching posts \n', err);
    next(err)
  }
};


/**
 * POST /posts
 *
 * Create a new post using { title, content } from the request body.
 *
 * Success: 201 JSON { created post }
 * Failure: 500 JSON { error: 'Failed to create post' }
 */
const createPost = async (req, res) => {
  try {
    const { title, content } = req.body;
    const saved = await postService.createPost({ title, content });
    return res.status(201).json(saved);
  } catch (err) {
    console.error('Error creating post', err);
    return res.status(500).json({ error: 'Failed to create post' });
  }
};

export default {
  getPosts,
  createPost,
};