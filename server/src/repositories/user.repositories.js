import User from "../db/models/User.js";

const createUser = ({ username, password }) => {
    const user = User({ username, password });
    return user.save();
}

const findUserById = (id) => {
    return User.findById(id);
}

const findUserByUsername = (username) => {
    return User.findOne({ username });
}

export default {
    createUser,
    findUserById,
    findUserByUsername
}