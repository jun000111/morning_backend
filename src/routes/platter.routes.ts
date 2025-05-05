import { Router } from "express";
import { getAllPlattersHandler } from "../controllers/platter.controller";

const platterRoutes = Router();
platterRoutes.get("/", getAllPlattersHandler);

export default platterRoutes;
