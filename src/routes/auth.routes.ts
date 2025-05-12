import { Router } from "express";
import { registerUserHandler } from "../controllers/auth.controller";

const authRoutes = Router();

authRoutes.post("/register", registerUserHandler);

export default authRoutes;
