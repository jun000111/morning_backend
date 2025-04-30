import { Router } from "express";
import { getAllPlatters } from "../controllers/platterController";

const platterRoutes = Router();
platterRoutes.get("/", getAllPlatters);

export default platterRoutes;
