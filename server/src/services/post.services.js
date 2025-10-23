import postRepositories from '../repositories/post.repositories.js';

/**
 * Post service
 *
 * Contains business logic for posts. Keeps controllers thin (HTTP concerns)
 * and repositories focused on data access.
 */
const listPosts = async () => {
  try {
    const posts = await postRepositories.findAll();
    return posts;   
  } catch (error) {
    throw error;
  }
};

const createPost = async ({ content }) => {
  try {
    const post = await postRepositories.create({ content });
    return post;
  } catch (error) {
    throw error;
  }
};

export default {
  listPosts,
  createPost,
};
