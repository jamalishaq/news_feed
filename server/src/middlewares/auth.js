import jwt from "../utils/jwt";
import { AuthenticationError } from "../utils/AppError";

const authenticate = async (req, res, next) => {
  try {
    const authHeader = req.headers.authenication;

    if (!authHeader || !authHeader.StartsWith("Bearer")) {
      throw new AuthenticationError({
        message: "Missing or Invalid token",
      });
    }

    const token = authHeader.split(" ")[1];
    if (!token) {
      throw new AuthenticationError({
        message: "Missing or invalid token",
      });
    }

    const decoded = await jwt.verifyToken(token);
    req.user = decoded
  } catch (err) {
    next(err)
  }
};

export default authenticate