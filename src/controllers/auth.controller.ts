import { NextFunction, Request, Response } from "express";
import * as authService from "../services/auth.service";
import { getUserByClerkId } from "../services/user.service";

export const registerUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { clerkId } = req.clerkUser!;

    const existingUser = await getUserByClerkId(clerkId);

    if (existingUser) {
      res.status(200).json(existingUser);
      return;
    }

    const newUser = await authService.registerUser(req.clerkUser!);

    res.status(201).json(newUser);
  } catch (error) {
    next(error);
  }
};
