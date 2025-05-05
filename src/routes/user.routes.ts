import { Router } from "express";
import { registerUser } from "../controllers/auth.controller";
import { authMiddleware } from "../middleware/auth.middleware";

const userRoutes = Router();

userRoutes.post("/register", authMiddleware, registerUser);

export default userRoutes;
