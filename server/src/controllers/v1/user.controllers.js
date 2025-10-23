import userServices from "../../services/user.services.js";

const createUser = async (req, res, next) => {
    try {
        const { username, password } = req.body;
        const user = await userServices.createUser({ username, password });

        return res.status(201).json(user);
    } catch (err) {
        next(err);
    }
} 

const getSingleUser = async (req, res, next) => {
    try {
        const { id } = req.params;
        const user = await userServices.findUserById(id);

        return res.status(200).json(user);
    } catch (err) {
        next(err)
    }
}



export default {
    createUser,
    getSingleUser,
}