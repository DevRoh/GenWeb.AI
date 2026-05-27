import jwt from "jsonwebtoken";
import User from "../models/user.model.js";

export const isAuth = async (req, res, next) => {
  try {
    const { token } = req.cookies;
    if (!token) {
      return res.status(400).json({ message: "Token not found" });
    }
    const decoded = await jwt.verify(token, process.env.JWT_SECRET);

    const foundUser = await User.findById(decoded.id);
    req.user = foundUser;
    next();
  } catch (error) {
    console.log("Issue in auth middleware");
    return res.status(500).json({ message: "Invalid token" });
  }
};
