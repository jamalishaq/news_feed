import express from "express";
import postsRoutes from "./postRoutes.js";

/**
 * v1 API router
 *
 * All v1 routes are mounted on /api/v1 in `src/app.js`. This file composes
 * sub-routers for different resources (posts, users, etc.) so the top-level
 * application stays small and focused.
 */
const v1Router = express.Router();

// Mount posts resource routes at /api/v1/posts
v1Router.use("/posts", postsRoutes);

// Export the composed v1 router. Use the same variable name to avoid mistakes.
export default v1Router;