import express from "express";
import { isAuth } from "../middleware/isAuth.js";
import { generateWebsite, getMyWebsites, getWebsiteById } from "../controllers/website.controller.js";

const websiteRouter = express.Router();

websiteRouter.post("/generate", isAuth, generateWebsite);
websiteRouter.get("/my-websites", isAuth, getMyWebsites);
websiteRouter.get("/get-by-id/:id", isAuth, getWebsiteById);

export default websiteRouter;
