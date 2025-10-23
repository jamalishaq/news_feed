import express from "express";
import validate from "../../middlewares/validate.js"
import { PostZodSchema } from "../../schemas/postZodSchema.js";
import postControllers from "../../controllers/v1/post.controllers.js";
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
const postsRouter = express.Router();

postsRouter.use(generateRequestId);
postsRouter.route("")
    .get(postControllers.getPosts)
    .post(validate(PostZodSchema), postControllers.createPost);

export default postsRouter;