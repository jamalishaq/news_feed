import express from "express";
import authControllers from "../../controllers/v1/auth.controllers.js";

const authRouter = express.Router();

authRouter.route("/login")
    .post(authControllers.login)

// authRouter.route("/refresh-token")
//     .post(authControllers.refreshToken)

// authRouter.route("/logout")
//     .post(authControllers.logout)

export default authRouter;