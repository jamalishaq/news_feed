import User from "../db/models/User.js";

const findUserByUsername = (username) => {
    return User.findOne({ username });
}

export default {
    findUserByUsername,
}