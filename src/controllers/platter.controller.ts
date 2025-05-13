import { Request, Response, NextFunction } from "express";
import * as platterService from "../services/platter.service";

export const getAllPlattersHandler = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const allPlatters = await platterService.getAllPlatters();
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
    console.log(calendarPlatters[0].ingredients);
    res.status(200).json(calendarPlatters);
  } catch (error) {
    next(error);
  }
};
