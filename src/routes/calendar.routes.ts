import { Router } from "express";
import {
  getCalendarBlockHandler,
  setCalendarBlockHandler,
} from "../controllers/calendar.controller";

const calendarRoutes = Router();

calendarRoutes.post("/setBlock", setCalendarBlockHandler);
calendarRoutes.get("/getBlock", getCalendarBlockHandler);

export default calendarRoutes;
