import jwt from "../utils/jwt.js";
import bcrypt from "bcrypt"
import { InternalServerError } from "../utils/AppError.js";
import authRepositories from "../repositories/auth.repositories.js";

const login = async ({ username, password }) => {
    try {
            console.log("requess gottend")
        const user = await authRepositories.findUserByUsername(username);
            console.log("fetch user")
        const passwordMatch = await bcrypt.compare(password, user.password);
            console.log("compare password")
        if (!user || !passwordMatch) {
            return [false, null];
        }
        
        const accessToken = await jwt.generateToken({ username, password }, { expiresIn: "5m" });
        const refreshToken = await jwt.generateToken({ username, password }, { expiresIn: "1h" })
        
        return [true, accessToken, refreshToken];
    } catch (error) {
        throw new InternalServerError();
    }
}

const refreshToken = async (token) => {
    try {
        const payload = await jwt.verifyToken(token);
        const newAccessToken = await jwt.generateToken(payload, { expiresIn: "5m" });
        const newRefreshToken = await jwt.generateToken(payload, { expiresIn: "1h" });

        return [newAccessToken, newRefreshToken];

    } catch (error) {
        throw error;
    }
}

export default {
    login,
    refreshToken
}