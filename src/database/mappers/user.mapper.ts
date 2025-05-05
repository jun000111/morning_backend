import { User } from "../../models/user.model";
import { UserRow } from "../types/user.row";

export const mapUserRowToUser = (user: UserRow): User => {
  return {
    id: user.id,
    username: user.name,
    emailAddress: user.email,
    role: user.role,
    clerkId: user.clerk_id,
  };
};
