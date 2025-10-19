import express from "express";
import validate from "../../middlewares/validate.js"
import { PostZodSchema } from "../../schemas/postZodSchema.js";
import postController from "../../controllers/v1/postController.js";
import generateRequestId from "../../middlewares/generateReqId.js";

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

postsRoutes.use(generateRequestId);
postsRoutes.route("/")
    .get(postController.getPosts)
    .post(validate(PostZodSchema), postController.createPost);

export default postsRoutes;