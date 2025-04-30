import { Request, Response, NextFunction } from "express";
import * as platterService from "../services/platterService";

export const getAllPlatters = async (
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
