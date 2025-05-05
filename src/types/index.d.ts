import { ClerkUser } from "../models/user.model";
import "express";

declare module "express" {
  interface Request {
    clerkUser?: ClerkUser;
  }
}
