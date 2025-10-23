import bcrypt from "bcrypt";
import userRepository from "../repositories/user.repositories.js";
import jwt from "../utils/jwt.js";

const createUser = async ({ username, password }) => {
    try {
        const saltRounds = 10;
        const hashedPassword = await bcrypt.hash(password, saltRounds);
        const user = await userRepository.createUser({ username, password: hashedPassword });
        return user;
    } catch (error) {
        throw error;
    }
}

const findUserById = async (id) => {
    try {
        const user = await userRepository.findUserById(id);
        return user;    
    } catch (error) {
        throw error;
    }
}

const login = async ({ username, password }) => {
    try {
        const user = await userRepository.findUserByUsername(username);
        const passwordMatch = await bcrypt.compare(password, user.password);
        if (!user || !passwordMatch) {
            return [false, null];
        }
        
        const token = await jwt.generateToken({username, password});
        
        return [true, token];
    } catch (error) {
        throw error;
    }
}

export default {
    createUser, 
    findUserById,
    login,
}