import express from "express";
import userController from "../../controllers/v1/user.controllers.js";

const userRouter = express.Router();

userRouter.route("")
    .post(userController.createUser)
    
userRouter.route("/:id")
    .get(userController.getSingleUser)

export default userRouter;