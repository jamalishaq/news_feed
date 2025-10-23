import User from "../db/models/User.js";

const createUser = ({ username, password }) => {
    const user = User({ username, password });
    return user.save();
}

const findUserById = (id) => {
    return User.findById(id);
}



export default {
    createUser,
    findUserById,
}