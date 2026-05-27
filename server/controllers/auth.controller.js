import User from "../models/user.model.js";
import jwt from "jsonwebtoken";

export const googleAuth = async (req, res) => {
  try {
    const { name, email, avatar } = req.body;
    if (!email) {
      return res
        .status(400)
        .json({ success: false, message: "Email is required" });
    }

    const user = await User.findOne({ email });
    if (!user) {
      user = await User.create({ name, email, avatar });
    }

    const token = await jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "7d",
    });

    const cookieOptions = {
      httpOnly: true,
      secure: false,
      sameSite: "strict",
      maxAge: 7 * 24 * 60 * 60 * 1000,
    };

    res.cookie("token", token, cookieOptions);

    res.status(200).json(user);
  } catch (error) {
    return res
      .status(500)
      .json({ success: false, message: `google auth error: ${error}` });
  }
};

export const logout = async (req, res) => {
  try {
    const cookieOptions = {
      httpOnly: true,
      secure: false,
      sameSite: "strict",
    };
    return res.clearCookie("token", cookieOptions);
  } catch (error) {
    return res
      .status(500)
      .json({ success: false, message: "Logout error: " + error });
  }
};
