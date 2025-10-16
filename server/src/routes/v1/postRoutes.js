import express from "express";
import validate from "../../middlewares/validate.js"
import { PostZodSchema } from "../../schemas/postZodSchema.js";
import { getPosts, createPost } from "../../controllers/v1/posts.js";

/**
 * Posts routes for v1 API
 *
 * Mounted at: /api/v1/posts
 *
 * Routes:
 *  - GET  /api/v1/posts   -> return list of posts (getPosts)
 *  - POST /api/v1/posts   -> create a new post (createPost)
 */
const postsRoutes = express.Router();

postsRoutes.route("/")
    .get(getPosts)
    .post(validate(PostZodSchema), createPost);

export default postsRoutes;