import userService from "../../services/user.services.js";
import { AuthenticationError } from "../../utils/AppError.js";

const createUser = async (req, res, next) => {
    try {
        const { username, password } = req.body;
        const user = await userService.createUser({ username, password });

        return res.status(201).json(user);
    } catch (err) {
        next(err);
    }
} 

const getSingleUser = async (req, res, next) => {
    try {
        const { id } = req.params;
        const user = await userService.findUserById(id);

        return res.status(200).json(user);
    } catch (err) {
        next(err)
    }
}

const login = async (req, res, next) => {
     try {
        const { username, password } = req.body;
        const [ isAuthenticated, token ] = await userService.login({ username, password });
        
        if (!isAuthenticated) {
            throw new AuthenticationError({
                code: "AUTHENTICATION_FAILD",
                details: "Failed to login",
                message: "Invalid login credentials",
                suggestion: ""
            });
        }

        return res.status(200).json({ token });
    } catch (err) {
        next(err)
    }
}

export default {
    createUser,
    getSingleUser,
    login
}