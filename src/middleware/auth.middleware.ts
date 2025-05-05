import { NextFunction, Request, Response } from "express";
import { verifyToken } from "@clerk/backend";
import { clerkClient } from "@clerk/clerk-sdk-node";
import { HttpError } from "../utils/HttpError";
import { ENV } from "../config/env";

export const authMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader?.startsWith("Bearer ")) {
      throw new HttpError("Missing or invalid token", 401);
    }

    const token = authHeader.split(" ")[1];

    const payload = await verifyToken(token, {
      secretKey: ENV.CLERK_SECRET_KEY!,
    });

    if (!payload.sub) {
      throw new HttpError("Invalid token payload", 401);
    }

    // Fetch Clerk user
    const clerkUser = await clerkClient.users.getUser(payload.sub);
    console.log(clerkUser);

    // Attach full user info to request
    req.clerkUser = {
      username: clerkUser.username ?? "Unnamed",
      emailAddress: clerkUser.emailAddresses[0].emailAddress,
      clerkId: clerkUser.id,
    };

    next();
  } catch (error) {
    next(new HttpError("Unauthorized", 401));
  }
};
