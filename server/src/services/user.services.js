import bcrypt from "bcrypt";
import userRepositories from "../repositories/user.repositories.js";
import { InternalServerError } from "../utils/AppError.js";

const createUser = async ({ username, password }) => {
    try {
        const saltRounds = 10;
        const hashedPassword = await bcrypt.hash(password, saltRounds);
        const user = await userRepositories.createUser({ username, password: hashedPassword });
        return user;
    } catch (error) {
        throw new InternalServerError();
    }
}

const findUserById = async (id) => {
    try {
        const user = await userRepositories.findUserById(id);
        return user;    
    } catch (error) {
        throw new InternalServerError();
    }
}

export default {
    createUser, 
    findUserById,
}