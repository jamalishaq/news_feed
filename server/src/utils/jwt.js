import jwt from "jsonwebtoken";
import { AuthenticationError } from "./AppError";

const generateToken = (payload) => {
    return new Promise((resolve, reject) => {
        jwt.sign(payload, "sdjafh", {}, (err, token) => {
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
        jwt.verify(token, "ahs,dajs", {}, (err, decoded) => {
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