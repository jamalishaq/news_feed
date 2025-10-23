import jwt from "jsonwebtoken";
import { AuthenticationError } from "./AppError.js";
import dotenv from "dotenv";
dotenv.config();

const generateToken = (payload, options) => {
    return new Promise((resolve, reject) => {
        jwt.sign(payload, process.env.SECRET, { ...options }, (err, token) => {
            if (err) {
                reject(
                    new AuthenticationError({ message: "Error authenticaing user"})
                )
            }
            resolve(token);
        })
    })
};

const verifyToken = (token) => {
    return new Promise((resolve, reject) => {
        jwt.verify(token, process.env.SECRET``, {}, (err, decoded) => {
            if (err) {
                reject(
                    new AuthenticationError({ messgae: "Missing or Invalid token"})
                );
            }
            resolve(decoded);
        })
    })
}

export default {
    generateToken,
    verifyToken
}