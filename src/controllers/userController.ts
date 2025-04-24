import { NextFunction, Request, Response } from "express";
import { clerkClient } from "@clerk/clerk-sdk-node";
import * as userService from "../services/authService";
import { HttpError } from "../utils/HttpError";
import { verifyToken } from "@clerk/backend";
import { ENV } from "../config/env";

export const registerUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const authHeader = req.headers.authorization;
  if (!authHeader?.startsWith("Bearer ")) {
    throw new HttpError("Missing or invalid token", 401);
  }

  const token = authHeader.split(" ")[1];

  const payload = await verifyToken(token, {
    secretKey: ENV.CLERK_SECRET_KEY!,
  });

  const userId = payload.sub;

  const clerkUser = await clerkClient.users.getUser(userId);
  //console.log(clerkUser);

  const newUser = await userService.registerUser({
    name: clerkUser.firstName ?? "Unamed",
    email: clerkUser.emailAddresses[0].emailAddress,
    clerkId: clerkUser.id,
  });

  res.status(201).json(newUser);
};
