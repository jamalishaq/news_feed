import authServices from "../../services/auth.services.js";
import { AuthenticationError } from "../../utils/AppError.js";
import dotenv from "dotenv";
dotenv.config();

const login = async (req, res, next) => {
  try {
    const { username, password } = req.body;
    const [isAuthenticated, accessToken, refreshToken] =
      await authServices.login({ username, password });

    if (!isAuthenticated) {
      throw new AuthenticationError({
        code: "AUTHENTICATION_FAILD",
        details: "Failed to login",
        message: "Invalid login credentials",
        suggestion: "",
      });
    }

    res.cookie("refreshToken", refreshToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "Lax",
      maxAge: 3600000,
    });

    return res.status(200).json({ accessToken });
  } catch (err) {
    next(err);
  }
};

const refreshToken = async (req, res, next) => {
  try {
    const refreshToken = res.cookies.refreshToken;
    if (!refreshToken) {
      throw new AuthenticationError({
        code: "AUTHENTICATION_FAILD",
        details: "Failed to authentication",
        message: "Inavlid or Missing Refresh oken",
        suggestion: "",
      });
    }

    const [newAccessToken, newRefreshToken] = await authServices.refreshToken(
      token
    );

    res.cookie("refreshToken", newRefreshToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "Lax",
      maxAge: 3600000,
    });

    return res.status(200).json({ newAccessToken });
  } catch (error) {}
};

const logout = (req, res, next) => {
  res.clearCookie("refreshToken", {
    httpOnly: true,
    secure: true,
    sameSite: "Lax",
  });
  
  return res.status(204).send();
};

export default {
  login,
  refreshToken,
  logout,
};
