import { Request, Response } from "express";
import * as userService from "../services/authService";

export const registerUser = async (req: Request, res: Response) => {
  const newUser = await userService.registerUser(req.body);
  res.status(201).json(newUser);
};
