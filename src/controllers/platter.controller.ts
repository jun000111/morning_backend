import { Request, Response, NextFunction } from "express";
import * as platterService from "../services/platter.service";

export const getAllPlattersHandler = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const allPlatters = await platterService.getAllPlatters();
    console.log(allPlatters);
    res.status(200).json(allPlatters);
  } catch (error) {
    next(error);
  }
};

export const getCalendarPlattersHandler = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const calendarPlatters = await platterService.getCalendarPlatters();
    console.log(calendarPlatters);
    res.status(200).json(calendarPlatters);
  } catch (error) {
    next(error);
  }
};
