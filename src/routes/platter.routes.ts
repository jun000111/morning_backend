import { Router } from "express";
import {
  getAllPlattersHandler,
  getCalendarPlattersHandler,
} from "../controllers/platter.controller";

const platterRoutes = Router();
platterRoutes.get("/", getAllPlattersHandler);
platterRoutes.get("/calendar", getCalendarPlattersHandler);

export default platterRoutes;
