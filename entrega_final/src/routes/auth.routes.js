import { Router } from "express";
import UserController from "../controllers/user.controller.js";
import upload from "../config/multer.js";
import loginMiddleware from "../middleware/login.middleware.js";

const authRouter = Router();

// [GET] /auth/login
authRouter.get("/login", UserController.renderLoginView);

// [POST] /auth/login
authRouter.post("/login", loginMiddleware);

// [GET] /auth/logout
authRouter.get("/logout", UserController.logout);

// [GET] /auth/register
authRouter.get("/register", UserController.renderRegisterView);

// [POST] /auth/register
authRouter.post("/register", upload.single("image"), UserController.createUser);

export default authRouter;
