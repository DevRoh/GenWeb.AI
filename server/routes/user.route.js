import express from "express";
import { getCurrentUser } from "../controllers/user.controller.js";
import { isAuth, optionalAuth } from "../middleware/isAuth.js";
import { generateDemo } from "../controllers/user.controller.js";

const userRouter = express.Router();


userRouter.get("/me",isAuth,getCurrentUser)
userRouter.get("/gen",generateDemo)

export default userRouter;
