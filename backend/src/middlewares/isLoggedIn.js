import { userModel } from "../models/user.model.js";
import decodeToken from "../utils/decodeToken.js";

const authMiddleware = async (req, res, next) => {
  try {
    /* GET TOKEN FROM COOKIE */
    const token = req.cookies.token;

    /* CHECK TOKEN */
    if (!token) {
      return res.status(401).json({
        success: false,
        message: "Not authenticated",
      });
    }

    /* VERIFY TOKEN */
    const decoded = decodeToken(token);

    /* FIND USER */
    const user = await userModel
      .findById(decoded.id)
      .select("-password");

    if (!user) {
      return res.status(401).json({
        success: false,
        message: "User not found",
      });
    }

    /* SAVE USER IN REQUEST */
    req.user = user;

    next();
  } catch (error) {
    return res.status(401).json({
      success: false,
      message: "Invalid or expired token",
    });
  }
};

export default authMiddleware;