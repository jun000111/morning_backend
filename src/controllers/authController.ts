import { NextFunction, Request, Response } from "express";
import { GetUserAuthInfoRequest } from "../types";
import * as authService from "../services/authService";
import { getUserByClerkId } from "../services/userService";

export const registerUser = async (
  req: GetUserAuthInfoRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    const { name, email, clerkId } = req.user!; // Safe because middleware guarantees it

    const existingUser = await getUserByClerkId(clerkId);

    if (existingUser) {
      res.status(200).json(existingUser);
      return;
    }

    const newUser = await authService.registerUser({
      name,
      email,
      clerkId,
    });

    res.status(201).json(newUser);
  } catch (error) {
    next(error);
  }
};
