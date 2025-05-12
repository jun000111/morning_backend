import { NextFunction, Request, Response } from "express";
import * as authService from "../services/auth.service";
import { getUserByClerkId } from "../services/user.service";
import { UserRegisterDTO } from "../dto/user.dto";

export const registerUserHandler = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { clerkId } = req.clerkUser!;
    const generatedUser: UserRegisterDTO = req.body!;
    console.log(generatedUser);

    const existingUser = await getUserByClerkId(clerkId);

    if (existingUser) {
      res.status(200).json(existingUser);
      return;
    }

    const newUser = await authService.registerUser(
      req.clerkUser!,
      generatedUser
    );

    res.status(201).json(newUser);
  } catch (error) {
    next(error);
  }
};
