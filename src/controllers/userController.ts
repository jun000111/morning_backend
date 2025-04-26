import { NextFunction, Request, Response } from "express";
import * as userService from "../services/authService";

export const registerUserController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id: clerkId, name, email } = req.user!; // Safe because middleware guarantees it

    const newUser = await userService.registerUser({
      name,
      email,
      clerkId,
    });

    res.status(201).json(newUser);
  } catch (error) {
    next(error);
  }
};
