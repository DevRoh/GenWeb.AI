import jwt from "jsonwebtoken";
import User from "../models/user.model.js";

export const isAuth = async (req, res, next) => {
  try {
    const { token } = req.cookies;
    if (!token) {
      return res.status(401).json({ message: "Token not found" });
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

export const optionalAuth = async (req, res, next) => {
  try {
    const { token } = req.cookies;
    if (!token) {
      req.user = null;
      return next();
    }

    const decoded = await jwt.verify(token, process.env.JWT_SECRET);
    req.user = await User.findById(decoded.id);
    next();
  } catch (error) {
    req.user = null;
    next();
  }
};
