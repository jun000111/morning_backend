import { User } from "../models/User";
import "express";

declare module "express" {
  interface Request {
    user?: Pick<User, "name", "email", "clerkId">;
  }
}
