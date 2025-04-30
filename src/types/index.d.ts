import { User } from "../models/User";
import { Request } from "express";

export interface GetUserAuthInfoRequest extends Request {
  user?: Pick<User, "name" | "email" | "clerkId">;
}
