import jwt from "jsonwebtoken";

const generateToken = (payload) => {
    return new Promise((resolve, reject) => {
        jwt.sign(payload, "sdjafh", {}, (err, token) => {
            if (err) {
                reject("401 error")
            }
            resolve(token);
        })
    })
};

const verifyToken = (token) => {
    return new Promise((resolve, reject) => {
        jwt.verify(token, "ahs,dajs", {}, (err, decoded) => {
            if (err) {
                reject("401  error");
            }
            resolve(decoded);
        })
    })
}

export default {
    generateToken,
    verifyToken
}