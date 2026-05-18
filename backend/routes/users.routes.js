
import express from "express";
import { askToAssistant, currentUser, updateAssistant } from "../controllers/user.controller.js";
import isAuth from "../middlewares/isAuth.js";
import upload from "../middlewares/multer.js";

const userRouter = express.Router();

userRouter.get("/current", isAuth, currentUser);
userRouter.post("/update", isAuth, upload.single("assistantImage"), updateAssistant);

userRouter.post("/asktoassistant", isAuth, askToAssistant);

export default userRouter;