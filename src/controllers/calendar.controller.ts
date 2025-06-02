import { Request, Response, NextFunction } from "express";
import {
  setCalendarBlock,
  getCalendarBlock,
} from "../services/calendar.service";

export const setCalendarBlockHandler = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { clerkId } = req.clerkUser!;
    const { date } = req.body;

    const blockDate = await setCalendarBlock({ clerkId, date });
    console.log(blockDate);

    res.status(201).json({ success: true });
  } catch (e) {
    next(e);
  }
};

export const getCalendarBlockHandler = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { clerkId } = req.clerkUser!;
    const formattedDate = new Date().toLocaleDateString("en-CA");
    const blockedDates = await getCalendarBlock({
      clerkId,
      date: formattedDate,
    });
    res.status(200).json(blockedDates);
  } catch (e) {
    next(e);
  }
};
