import { Router } from "express";
import { registerUser } from "../controllers/authController";
import { authMiddleware } from "../middleware/authMiddleware";

const userRoutes = Router();

userRoutes.post("/register", authMiddleware, registerUser);

export default userRoutes;
