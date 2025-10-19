import postRepository from '../repositories/postRepository.js';

/**
 * Post service
 *
 * Contains business logic for posts. Keeps controllers thin (HTTP concerns)
 * and repositories focused on data access.
 */
const listPosts = async () => {
  // Add business logic here in future (filtering, RBAC, transformation, caching)
  return postRepository.findAll();
};

const createPost = async ({ title, content }) => {
  // simple example of business rule: provide default title when missing
  const safeTitle = title && title.trim() ? title.trim() : 'Untitled';
  return postRepository.create({ title: safeTitle, content });
};

export default {
  listPosts,
  createPost,
};
