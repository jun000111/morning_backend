import { Router } from "express";
import { registerUserController } from "../controllers/authController";
import { authMiddleware } from "../middleware/authMiddleware";

const userRoutes = Router();

userRoutes.post("/register", authMiddleware, registerUserController);

export default userRoutes;
