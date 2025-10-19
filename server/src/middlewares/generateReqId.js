import { v4 as uuidv4 } from "uuid";
import { InternalServerError } from "../utils/AppError.js";

const generateRequestId = async (req, res, next) => {
    try {
        const requestId = await uuidv4()
        req.requestId = requestId;
        next()
    } catch (error) {
        console.error(error);
        next(new InternalServerError({ details: "Error generating request Id" }))
    }
}

export default generateRequestId;