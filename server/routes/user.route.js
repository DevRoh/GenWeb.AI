import express from "express";
import { getCurrentUser } from "../controllers/user.controller.js";
import { optionalAuth } from "../middleware/isAuth.js";

const userRouter = express.Router();


userRouter.get("/me",optionalAuth,getCurrentUser)

export default userRouter;
