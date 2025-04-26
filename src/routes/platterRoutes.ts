import { Router } from "express";
import { getAllPlattersController } from "../controllers/platterController";

const platterRoutes = Router();
platterRoutes.get("/", getAllPlattersController);

export default platterRoutes;
