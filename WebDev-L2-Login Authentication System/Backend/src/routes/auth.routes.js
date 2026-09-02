import { Router } from "express";
import * as authController from "../controller/auth.controller.js"
import { protect } from "../middleware/authMiddleware.js";

const authRouter = Router();

authRouter.post("/register",authController.register)
authRouter.post("/login",authController.login)
authRouter.get("/dashboard",protect,authController.getDashboard)
export default authRouter 